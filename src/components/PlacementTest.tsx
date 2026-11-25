import { useEffect, useMemo, useState } from 'react';
import type { LanguageContent, PlacementItem, PlacementResult } from '../core/types';
import { loadContent, getLang } from '../content/registry';
import { buildPlacementPool, initPlacement, nextItem, placementResult, submit, MAX_ITEMS, type PState } from '../core/placement';
import { cefrIndex } from '../core/types';
import { SignFigure } from './SignFigure';
import { hasTTS, hasVoiceFor, speak } from '../core/speech';
import { mulberry32 } from '../core/text';
import { ExerciseView } from './ExerciseView';
import { Btn, Card, Chip, Note, Progress, Speak } from './ui';

const BASE_UI = { choose: 'Choose the correct answer', check: 'Check', next: 'Continue', correct: 'Correct', wrong: 'Not quite', listen: 'Listen', translate: 'Translate', fill: 'Fill in the blank', order: 'Put the words in order', answer: 'Your answer', well: 'Well done', again: 'Try again', read: 'Read', speak: 'Speak' };

export function PlacementTest({ code, onFinish, onCancel }: { code: string; onFinish: (r: PlacementResult) => void; onCancel: () => void }) {
  const cfg = getLang(code)!; const [content, setContent] = useState<LanguageContent | null>(null);
  const rnd = useMemo(() => mulberry32((Date.now() ^ 0x9e3779b9) >>> 0), []);
  const canSpeak = !cfg.sign && hasTTS() && hasVoiceFor(cfg.tts);
  const [pool, setPool] = useState<PlacementItem[]>([]); const [st, setSt] = useState<PState>(initPlacement()); const [item, setItem] = useState<PlacementItem | null>(null); const [result, setResult] = useState<PlacementResult | null>(null);
  useEffect(() => { loadContent(code).then((c) => { setContent(c); const p = buildPlacementPool(c.placement, c.vocab, rnd, { sign: cfg.sign }); setPool(p); setItem(nextItem(p, initPlacement(), rnd, canSpeak)); }); /* eslint-disable-next-line */ }, [code]);
  if (!content) return <p className="text-muted">Loading test…</p>;
  const finishWith = (s: PState) => setResult(placementResult(s, Date.now()));
  if (result) return <PlacementSummary r={result} lang={cfg.name} onUse={() => onFinish(result)} />;
  if (!item) return <Card><p>No more questions available.</p><Btn className="mt-3" onClick={() => finishWith(st)}>See my result</Btn></Card>;
  const answered = st.served.length;
  const advance = (outcome: boolean | 'skip') => {
    const ns = submit(pool, st, item, outcome, canSpeak); setSt(ns);
    if (ns.done) { finishWith(ns); return; }
    const nx = nextItem(pool, ns, rnd, canSpeak); if (!nx) finishWith(ns); else setItem(nx);
  };
  // Progress is "how sure are we", not just how many questions: it fills as the estimate sharpens.
  const sure = answered < 4 ? answered / 16 : Math.min(0.97, Math.max(answered / MAX_ITEMS, 1 - (st.sd - 0.36) / 1.7));
  return (
    <div>
      <div className="mb-3 flex items-center gap-2"><Chip tone="accent">Placement test · {cfg.name}</Chip><span className="text-sm text-muted">Question {answered + 1} · adapts to you</span><button className="ml-auto text-sm text-muted underline" onClick={onCancel}>Cancel</button></div>
      <Progress value={sure} className="mb-3" label="Placement progress" />
      {answered === 0 && <Note>Answer what you know. <b>Don't guess</b>: if you aren't sure, press "I don't know". Guesses make the result less accurate, and not knowing is useful information. Expect about 15–25 questions that get harder as you succeed and easier if you struggle.</Note>}
      {item.audio && <div className="mb-3 flex items-center gap-2"><Speak label="Play the audio" onClick={() => void speak(item.audio!, cfg.tts, 0.9)} /><span className="text-sm text-muted">Listen, then answer.</span></div>}
      {item.fig && <div className="mb-3 flex justify-center"><SignFigure spec={item.fig} size={200} /></div>}
      <ExerciseView key={item.id} ex={item.ex} cfg={cfg} ui={BASE_UI} speakText={item.audio} autoSpeak={!!item.audio} onDone={(r) => advance(r.correct)} />
      <div className="mt-4 text-center"><button className="rounded-full border border-line px-4 py-2 text-sm text-muted hover:bg-surface2" onClick={() => advance('skip')}>I don't know</button></div>
    </div>
  );
}

const SKILL_LABEL: Record<string, string> = { vocabulary: 'Vocabulary', grammar: 'Grammar', reading: 'Reading', listening: 'Listening', writing: 'Writing', conversation: 'Conversation', speaking: 'Speaking' };
function PlacementSummary({ r, lang, onUse }: { r: PlacementResult; lang: string; onUse: () => void }) {
  const [lo, hi] = r.range ?? [r.overall, r.overall];
  const conf = r.confidence === 'high' ? 'High confidence' : r.confidence === 'medium' ? 'Medium confidence: a retake after some study will sharpen it' : 'Low confidence: treat this as a rough guide';
  return (
    <Card className="pop">
      <h2 className="text-2xl font-bold">Your {lang} starting point: {r.overall}{r.overall === 'C2' ? '' : ''}</h2>
      <p className="mt-1 text-muted">{r.correct} of {r.answered} correct{r.skipped ? ` · ${r.skipped} marked "I don't know"` : ''}. {conf}.{lo !== hi && ` Likely range: ${lo}–${hi}.`}</p>
      <div className="mt-3 flex flex-wrap gap-2">{Object.entries(r.bySkill).map(([s, l]) => <Chip key={s}>{SKILL_LABEL[s] ?? s}: {l}</Chip>)}</div>
      {r.weaknesses.length > 0 && <p className="mt-3 text-sm">Weaker areas to focus on: <b>{r.weaknesses.map((w) => SKILL_LABEL[w] ?? w).join(', ')}</b>.</p>}
      <p className="mt-3 text-sm">{r.skipProgram ? 'You placed above beginner, so we will skip the 30-day beginner programme and go straight to a level-based pathway. You can still open any earlier lesson from Practice.' : r.startDay > 1 ? `You can start the 30-day programme at day ${r.startDay}; earlier days will be covered by review.` : 'You will start the 30-day programme at day 1.'}</p>
      <Note>This is an estimate from what the app can test: vocabulary in context, grammar, reading{' '}{r.bySkill.listening ? 'and listening' : ''}. It cannot test speaking or writing. {cefrIndex(r.overall) >= 4 ? 'C1 and C2 results need a human examiner to confirm. ' : ''}Your level on the dashboard keeps updating from your real review results, and you can move up or down on the Path page at any time.</Note>
      <Btn size="lg" className="mt-4" onClick={onUse}>Use this result</Btn>
    </Card>
  );
}
