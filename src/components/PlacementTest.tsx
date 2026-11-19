import { useEffect, useMemo, useState } from 'react';
import type { LanguageContent, PlacementItem, PlacementResult } from '../core/types';
import { loadContent, getLang } from '../content/registry';
import { buildPlacementPool, initPlacement, nextItem, placementResult, submit, type PState } from '../core/placement';
import { hasTTS, hasVoiceFor, speak } from '../core/speech';
import { mulberry32 } from '../core/text';
import { ExerciseView } from './ExerciseView';
import { Btn, Card, Chip, Note, Progress, Speak } from './ui';

const BASE_UI = { choose: 'Choose the correct answer', check: 'Check', next: 'Continue', correct: 'Correct', wrong: 'Not quite', listen: 'Listen', translate: 'Translate', fill: 'Fill in the blank', order: 'Put the words in order', answer: 'Your answer', well: 'Well done', again: 'Try again', read: 'Read', speak: 'Speak' };

export function PlacementTest({ code, onFinish, onCancel }: { code: string; onFinish: (r: PlacementResult) => void; onCancel: () => void }) {
  const cfg = getLang(code)!; const [content, setContent] = useState<LanguageContent | null>(null);
  const rnd = useMemo(() => mulberry32((Date.now() ^ 0x9e3779b9) >>> 0), []);
  const canSpeak = hasTTS() && hasVoiceFor(cfg.tts);
  const [pool, setPool] = useState<PlacementItem[]>([]); const [st, setSt] = useState<PState>(initPlacement()); const [item, setItem] = useState<PlacementItem | null>(null); const [result, setResult] = useState<PlacementResult | null>(null);
  useEffect(() => { loadContent(code).then((c) => { setContent(c); const p = buildPlacementPool(c.placement, c.vocab, rnd); setPool(p); setItem(nextItem(p, initPlacement(), rnd, canSpeak)); }); /* eslint-disable-next-line */ }, [code]);
  if (!content) return <p className="text-muted">Loading test…</p>;
  const finishWith = (s: PState) => setResult(placementResult(s, Date.now()));
  if (result) return <PlacementSummary r={result} onUse={() => onFinish(result)} />;
  if (!item) return <Card><p>No more questions available.</p><Btn className="mt-3" onClick={() => finishWith(st)}>See my result</Btn></Card>;
  const answered = st.served.length;
  return (
    <div>
      <div className="mb-3 flex items-center gap-2"><Chip tone="accent">Placement test · {cfg.name}</Chip><span className="text-sm text-muted">Question {answered + 1} · gets harder as you go</span><button className="ml-auto text-sm text-muted underline" onClick={onCancel}>Cancel</button></div>
      <Progress value={Math.min(1, answered / 14)} className="mb-5" label="Placement progress" />
      {item.audio && <div className="mb-3 flex items-center gap-2"><Speak label="Play the audio" onClick={() => void speak(item.audio!, cfg.tts, 0.9)} /><span className="text-sm text-muted">Listen, then answer.</span></div>}
      <ExerciseView key={item.id} ex={item.ex} cfg={cfg} ui={BASE_UI} speakText={item.audio} autoSpeak={!!item.audio} onDone={(r) => {
        const ns = submit(pool, st, item, r.correct, canSpeak); setSt(ns);
        if (ns.done) { finishWith(ns); return; }
        const nx = nextItem(pool, ns, rnd, canSpeak); if (!nx) finishWith(ns); else setItem(nx);
      }} />
    </div>
  );
}

function PlacementSummary({ r, onUse }: { r: PlacementResult; onUse: () => void }) {
  return (
    <Card className="pop">
      <h2 className="text-2xl font-bold">Your starting point: {r.overall}{r.overall === 'B2' ? ' or above' : ''}</h2>
      <p className="mt-1 text-muted">{r.correct} of {r.answered} correct.</p>
      <div className="mt-3 flex flex-wrap gap-2">{Object.entries(r.bySkill).map(([s, l]) => <Chip key={s}>{s}: {l}</Chip>)}</div>
      {r.weaknesses.length > 0 && <p className="mt-3 text-sm">Weaker areas to focus on: <b>{r.weaknesses.join(', ')}</b>.</p>}
      <p className="mt-3 text-sm">{r.skipProgram ? 'You placed above beginner, so we will skip the 30-day beginner programme and go straight to a level-based pathway.' : r.startDay > 1 ? `You can start the 30-day programme at day ${r.startDay} — earlier days will be covered by review.` : 'You will start the 30-day programme at day 1.'}</p>
      <Note>A short adaptive test is an estimate, not a certificate. It only measures A1–B2, so "B2" means "B2 or above". Your level estimate on the dashboard keeps updating from real review results.</Note>
      <Btn size="lg" className="mt-4" onClick={onUse}>Use this result</Btn>
    </Card>
  );
}
