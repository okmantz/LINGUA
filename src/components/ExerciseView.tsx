import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise, Grade, LanguageConfig, LanguageUI, Mode } from '../core/types';
import { checkAnswer, shuffle, type Verdict } from '../core/text';
import { speak, hasTTS } from '../core/speech';
import { Btn, Speak, cx } from './ui';
import { SignFigure } from './SignFigure';
import { SIGN_PREFIX } from '../core/exercises';

export interface ExResult { correct: boolean; verdict: Verdict | 'choice'; ms: number; answer: string }
export const gradeFor = (r: ExResult, mode: Mode): Grade => {
  if (!r.correct) return 1;
  if (r.verdict === 'accent' || r.verdict === 'close') return 2;
  return r.ms < 3500 && (mode === 'produce' || mode === 'cloze' || mode === 'listen') ? 4 : 3;
};

export function ExerciseView({ ex, cfg, ui, speakText, autoSpeak, rate = 0.9, onDone, answerLabel, immersive, fig }: {
  ex: Exercise; cfg: LanguageConfig; ui: LanguageUI; speakText?: string; autoSpeak?: boolean; rate?: number;
  onDone: (r: ExResult) => void; answerLabel?: string; immersive?: boolean; fig?: string;
}) {
  const t0 = useRef(Date.now());
  const [picked, setPicked] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [bank, setBank] = useState<number[]>([]);
  const [res, setRes] = useState<ExResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bankWords = useMemo(() => (ex.kind === 'order' ? shuffle(ex.words.map((w, i) => ({ w, i }))) : []), [ex]);
  const say = (s?: string) => { if (s && hasTTS()) void speak(s, cfg.tts, rate); };
  useEffect(() => { t0.current = Date.now(); if (autoSpeak) say(speakText); inputRef.current?.focus(); /* eslint-disable-next-line */ }, [ex]);

  const finish = (correct: boolean, verdict: ExResult['verdict'], answer: string) => setRes({ correct, verdict, ms: Date.now() - t0.current, answer });
  const check = () => {
    if (res) return;
    if (ex.kind === 'fill' || ex.kind === 'type') {
      if (!text.trim()) return; const v = checkAnswer(text, ex.answers);
      finish(v !== 'wrong', v, text);
    } else if (ex.kind === 'order') {
      if (bank.length !== ex.words.length) return; const joined = bank.map((i) => bankWords.find((b) => b.i === i)!.w).join(' ');
      const v = checkAnswer(joined, [ex.answer]); finish(v === 'exact' || v === 'accent', v, joined);
    }
  };
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement)) { e.preventDefault(); if (res) onDone(res); else check(); } };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  });

  const correctText = ex.kind === 'mcq' ? ex.choices[ex.answer] : ex.kind === 'order' ? ex.answer : ex.answers[0];
  return (
    <div className="pop">
      {fig && <div className="mb-4 flex justify-center"><SignFigure spec={fig} size={230} /></div>}
      <div className="mb-4 flex items-start gap-3">
        <p className="flex-1 text-xl font-semibold leading-snug sm:text-2xl">{ex.prompt}</p>
        {speakText && hasTTS() && <Speak onClick={() => say(speakText)} />}
      </div>
      {ex.kind === 'fill' && ex.hint && !immersive && <p className="mb-3 text-sm text-muted">Hint: {ex.hint}</p>}

      {ex.kind === 'mcq' && (
        <div className={cx('grid gap-2.5', ex.choices.some((c) => c.startsWith(SIGN_PREFIX)) && 'grid-cols-2')} role="group" aria-label={ui.choose}>
          {ex.choices.map((c, i) => {
            const show = res && (i === ex.answer || i === picked);
            return (
              <button key={i} disabled={!!res} onClick={() => { setPicked(i); finish(i === ex.answer, 'choice', c); }}
                className={cx('rounded-xl border px-4 py-3 text-left text-base transition', !res && 'border-line bg-surface hover:border-accent hover:bg-surface2',
                  show && i === ex.answer && 'border-good bg-good/10', show && i !== ex.answer && 'border-bad bg-bad/10', res && !show && 'border-line opacity-60')}>
                {c.startsWith(SIGN_PREFIX) ? <span className="flex flex-col items-center"><span className="self-start text-muted">{i + 1}.</span><SignFigure spec={c.slice(SIGN_PREFIX.length)} size={150} compact /></span> : <><span className="mr-2 text-muted">{i + 1}.</span>{c}</>}
              </button>
            );
          })}
        </div>
      )}

      {(ex.kind === 'fill' || ex.kind === 'type') && (
        <div>
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} disabled={!!res} autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck={false}
            aria-label={ui.answer} placeholder={ui.answer} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-lg outline-none focus:border-accent" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cfg.accents.map((a) => <button key={a} type="button" disabled={!!res} onClick={() => { setText((t) => t + a); inputRef.current?.focus(); }} className="h-9 min-w-9 rounded-lg border border-line bg-surface px-2 text-base hover:bg-surface2">{a}</button>)}
          </div>
        </div>
      )}

      {ex.kind === 'order' && (
        <div>
          <div className="mb-3 flex min-h-14 flex-wrap gap-2 rounded-xl border border-dashed border-line p-2.5" aria-label="Your sentence">
            {bank.map((i) => <button key={i} disabled={!!res} onClick={() => setBank((b) => b.filter((x) => x !== i))} className="rounded-lg bg-accent/20 px-3 py-1.5">{bankWords.find((b) => b.i === i)!.w}</button>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {bankWords.filter((b) => !bank.includes(b.i)).map((b) => <button key={b.i} disabled={!!res} onClick={() => setBank((x) => [...x, b.i])} className="rounded-lg border border-line bg-surface px-3 py-1.5 hover:bg-surface2">{b.w}</button>)}
          </div>
        </div>
      )}

      {!res && ex.kind !== 'mcq' && <div className="mt-5"><Btn size="lg" className="w-full sm:w-auto" onClick={check}>{ui.check}</Btn></div>}

      {res && (
        <div role="status" aria-live="polite" className={cx('pop mt-5 rounded-2xl border p-4', res.correct ? 'border-good/50 bg-good/10' : 'border-bad/50 bg-bad/10')}>
          <p className="font-semibold">
            {res.correct ? (res.verdict === 'accent' ? `${ui.correct} Mind the accents.` : res.verdict === 'close' ? `${ui.correct} Small typo — check the spelling.` : ui.correct) : ui.wrong}
          </p>
          {(!res.correct || res.verdict === 'accent' || res.verdict === 'close') && (correctText.startsWith(SIGN_PREFIX) ? <div className="mt-1 flex items-center gap-3"><span>Answer:</span><SignFigure spec={correctText.slice(SIGN_PREFIX.length)} size={130} compact /></div> : <p className="mt-1">Answer: <b>{correctText}</b></p>)}
          {answerLabel && <p className="mt-1 text-sm text-muted">{answerLabel}</p>}
          {ex.explain && <p className="mt-2 text-sm text-muted">{ex.explain}</p>}
          <Btn className="mt-3" onClick={() => onDone(res)}>{ui.next}</Btn>
        </div>
      )}
    </div>
  );
}
