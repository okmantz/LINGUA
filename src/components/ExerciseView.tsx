import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise, Grade, LanguageConfig, LanguageUI, Mode } from '../core/types';
import { checkAnswer, shuffle, type Verdict } from '../core/text';
import { speak, hasTTS } from '../core/speech';
import { Btn, Speak, cx } from './ui';
import { Icon } from './Icon';
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
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement)) { e.preventDefault(); if (res) onDone(res); else check(); return; }
      // 1–9 picks a multiple-choice answer (never while typing in a field).
      if (ex.kind === 'mcq' && !res && /^[1-9]$/.test(e.key) && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const k = Number(e.key) - 1; if (k < ex.choices.length) { setPicked(k); finish(k === ex.answer, 'choice', ex.choices[k]); }
      }
    };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  });

  const correctText = ex.kind === 'mcq' ? ex.choices[ex.answer] : ex.kind === 'order' ? ex.answer : ex.answers[0];
  const showAns = !!res && (!res.correct || res.verdict === 'accent' || res.verdict === 'close');
  return (
    <div className="pop mx-auto w-full max-w-2xl">
      {fig && <div className="mb-5 flex justify-center"><SignFigure spec={fig} size={230} /></div>}
      <div className="mb-5 flex items-start gap-3">
        <p className="flex-1 text-[1.4rem] font-extrabold leading-snug tracking-[-0.02em] sm:text-[1.7rem]">{ex.prompt}</p>
        {speakText && hasTTS() && <Speak size={44} onClick={() => say(speakText)} />}
      </div>
      {ex.kind === 'fill' && ex.hint && !immersive && <p className="mb-4 flex items-center gap-2 text-sm text-muted"><Icon name="bulb" size={16} className="text-warn" />Hint: {ex.hint}</p>}

      {ex.kind === 'mcq' && (
        <div className={cx('grid gap-2.5', ex.choices.some((c) => c.startsWith(SIGN_PREFIX)) && 'grid-cols-2')} role="group" aria-label={ui.choose}>
          {ex.choices.map((c, i) => {
            const show = res && (i === ex.answer || i === picked); const good = !!show && i === ex.answer; const bad = !!show && i !== ex.answer;
            return (
              <button key={i} disabled={!!res} onClick={() => { setPicked(i); finish(i === ex.answer, 'choice', c); }}
                className={cx('group flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-[1.02rem] font-medium transition duration-150 active:scale-[.99] disabled:opacity-100', !res && 'border-line bg-surface hover:border-accent hover:bg-accent/[.06]',
                  good && 'border-good bg-good/10', bad && 'border-bad bg-bad/10', res && !show && 'border-line bg-surface opacity-50')}>
                <span className={cx('tabular grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-xs font-bold transition', !res && 'border-line-strong text-muted group-hover:border-accent group-hover:text-accent-strong', good && 'border-good bg-good text-white', bad && 'border-bad bg-bad text-white', res && !show && 'border-line text-faint')}>{good ? <Icon name="check" size={15} strokeWidth={3} /> : bad ? <Icon name="x" size={15} strokeWidth={3} /> : i + 1}</span>
                {c.startsWith(SIGN_PREFIX) ? <SignFigure spec={c.slice(SIGN_PREFIX.length)} size={150} compact /> : <span className="min-w-0 flex-1">{c}</span>}
              </button>
            );
          })}
        </div>
      )}

      {(ex.kind === 'fill' || ex.kind === 'type') && (
        <div>
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} disabled={!!res} autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck={false}
            aria-label={ui.answer} placeholder={ui.answer} className={cx('h-14 w-full rounded-2xl border-2 bg-surface px-4 text-xl outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15', res ? (res.correct ? 'border-good' : 'border-bad') : 'border-line-strong')} />
          {cfg.accents.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">
            {cfg.accents.map((a) => <button key={a} type="button" disabled={!!res} onClick={() => { setText((t) => t + a); inputRef.current?.focus(); }} className="h-10 min-w-10 rounded-xl border border-line-strong bg-surface px-2.5 text-base font-medium shadow-[var(--shadow-xs)] transition hover:bg-surface2 active:scale-95">{a}</button>)}
          </div>}
        </div>
      )}

      {ex.kind === 'order' && (
        <div>
          <div className="mb-4 flex min-h-16 flex-wrap content-start gap-2 rounded-2xl border-2 border-dashed border-line-strong bg-surface2/40 p-3" aria-label="Your sentence">
            {bank.length === 0 && <span className="self-center px-1 text-sm text-faint">Tap the words below to build the sentence</span>}
            {bank.map((i) => <button key={i} disabled={!!res} onClick={() => setBank((b) => b.filter((x) => x !== i))} className="min-h-10 rounded-xl border border-accent/40 bg-accent/15 px-3.5 py-1.5 font-semibold shadow-[var(--shadow-xs)] transition active:scale-95">{bankWords.find((b) => b.i === i)!.w}</button>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {bankWords.filter((b) => !bank.includes(b.i)).map((b) => <button key={b.i} disabled={!!res} onClick={() => setBank((x) => [...x, b.i])} className="min-h-10 rounded-xl border border-line-strong bg-surface px-3.5 py-1.5 font-semibold shadow-[var(--shadow-xs)] transition hover:border-accent hover:bg-surface2 active:scale-95">{b.w}</button>)}
          </div>
        </div>
      )}

      {!res && ex.kind !== 'mcq' && <div className="mt-6"><Btn size="lg" className="w-full sm:w-auto sm:min-w-44" onClick={check}>{ui.check}</Btn></div>}

      {res && (
        <div role="status" aria-live="polite" className={cx('pop sticky bottom-3 z-20 mt-6 rounded-2xl border-2 p-4 shadow-[var(--shadow-lg)] backdrop-blur-md sm:p-5', res.correct ? 'border-good/60 bg-good/[.12]' : 'border-bad/60 bg-bad/[.12]')}>
          <div className="flex items-start gap-3">
            <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-full text-white', res.correct ? 'bg-good' : 'bg-bad')}><Icon name={res.correct ? 'check' : 'x'} size={18} strokeWidth={3} /></span>
            <div className="min-w-0 flex-1">
              <p className={cx('text-lg font-extrabold leading-tight tracking-tight', res.correct ? 'text-good' : 'text-bad')}>
                {res.correct ? (res.verdict === 'accent' ? `${ui.correct} Mind the accents.` : res.verdict === 'close' ? `${ui.correct} Small typo: check the spelling.` : ui.correct) : ui.wrong}
              </p>
              {showAns && (correctText.startsWith(SIGN_PREFIX) ? <div className="mt-1 flex items-center gap-3"><span>Answer:</span><SignFigure spec={correctText.slice(SIGN_PREFIX.length)} size={130} compact /></div> : <p className="mt-1">Answer: <b>{correctText}</b></p>)}
              {answerLabel && <p className="mt-1 text-sm text-muted">{answerLabel}</p>}
              {ex.explain && <p className="mt-2 text-sm text-muted">{ex.explain}</p>}
            </div>
          </div>
          <Btn size="lg" className="mt-4 w-full" onClick={() => onDone(res)}>{ui.next}<Icon name="arrow" size={18} /></Btn>
        </div>
      )}
    </div>
  );
}
