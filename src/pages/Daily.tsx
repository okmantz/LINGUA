import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { planSession, type Block, type SessionPlan } from '../core/session';
import { PROGRAM_LENGTH } from '../core/program';
import { useCtx } from '../state/hooks';
import { BlockView, convModeFor } from '../components/BlockRunner';
import { Btn, Card, Chip, H1, Progress } from '../components/ui';

const ICON: Record<string, string> = { review: '🔁', newvocab: '✨', grammar: '🧩', conversation: '💬', reading: '📖', listening: '🎧', pronunciation: '🗣', writing: '✍️', recap: '🏁' };

export default function Daily() {
  const { store, state, content } = useCtx(); const [sp] = useSearchParams();
  const minutes = Number(sp.get('m')) || state.dailyMinutes;
  const [plan, setPlan] = useState<SessionPlan | null>(null); const [idx, setIdx] = useState(-1); const [scores, setScores] = useState<number[]>([]); const [startXp, setStartXp] = useState(state.xp);
  const [startMs, setStartMs] = useState(0);
  const preview = useMemo(() => planSession({ minutes, state, content, cards: store.cards, events: store.events, now: Date.now() }), [minutes, state.programDay, store.cards.length]); // eslint-disable-line
  const start = () => { const p = planSession({ minutes, state, content, cards: store.cards, events: store.events, now: Date.now() }); setPlan(p); setIdx(0); setScores([]); setStartXp(state.xp); setStartMs(Object.values(state.studyMs).reduce((a, b) => a + b, 0)); };

  if (!plan) {
    const p = preview; const progActive = p.day !== null;
    return (
      <div>
        <H1 sub={progActive ? `Programme day ${p.day} of ${PROGRAM_LENGTH}` : 'Adaptive practice at your level'}>Today's session</H1>
        <Card className="mb-4">
          <div className="flex flex-wrap items-center gap-2"><Chip tone="accent">{p.focus}</Chip><Chip>{p.minutes} min planned</Chip>{p.dueTotal > 0 && <Chip tone="warn">{p.dueTotal} words due</Chip>}</div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm"><span className="text-muted">Time available:</span>{[5, 10, 15, 20, 30, 45, 60].map((m) => <Link key={m} to={`/daily?m=${m}`} className={`rounded-lg px-2.5 py-1 ${m === minutes ? 'bg-accent text-accent-ink font-semibold' : 'bg-surface2'}`}>{m}</Link>)}</div>
        </Card>
        <div className="space-y-2.5">{p.blocks.map((b, i) => (
          <Card key={b.key} className="flex items-center gap-3 !p-3.5"><span className="text-2xl" aria-hidden>{ICON[b.type]}</span><div className="flex-1"><p className="font-medium">{b.title}</p><p className="text-sm text-muted">{b.why}</p></div><span className="text-sm text-muted">{b.minutes} min</span><span className="sr-only">Step {i + 1}</span></Card>
        ))}</div>
        {!p.blocks.length && <Card>Nothing is scheduled yet. Add a language or finish onboarding.</Card>}
        <Btn size="lg" className="mt-5 w-full sm:w-auto" disabled={!p.blocks.length} onClick={start}>Start session</Btn>
      </div>
    );
  }

  const block: Block | undefined = plan.blocks[idx];
  if (!block) {
    const total = Object.values(state.studyMs).reduce((a, b) => a + b, 0) - startMs; const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 1;
    return (
      <Card className="pop mx-auto max-w-lg text-center">
        <div className="text-5xl" aria-hidden>🏁</div><h1 className="mt-2 text-2xl font-bold">Session complete</h1>
        <div className="mt-4 grid grid-cols-3 gap-3"><div><p className="text-2xl font-bold">{Math.round(avg * 100)}%</p><p className="text-xs text-muted">average</p></div><div><p className="text-2xl font-bold">+{state.xp - startXp}</p><p className="text-xs text-muted">XP</p></div><div><p className="text-2xl font-bold">{state.streak.current}</p><p className="text-xs text-muted">day streak</p></div></div>
        <p className="mt-3 text-sm text-muted">{Math.round(total / 60000)} min of active study logged.</p>
        {state.programDay <= PROGRAM_LENGTH && !state.placement?.skipProgram && <p className="mt-3 text-sm">Programme: day {state.programDay} of {PROGRAM_LENGTH}{plan.day && state.programDay > plan.day ? ' — today is complete!' : ' — finish the required items to unlock the next day.'}</p>}
        <div className="mt-5 flex flex-wrap justify-center gap-2"><Link to="/"><Btn>Dashboard</Btn></Link><Btn variant="ghost" onClick={() => { setPlan(null); setIdx(-1); }}>Another session</Btn></div>
      </Card>
    );
  }
  const finish = (score: number) => {
    setScores((s) => [...s, score]);
    const pd = block.programDay;
    if (block.type === 'newvocab') store.completeBlock(pd ? 'words' : block.key, score, pd);
    else if (block.type !== 'review') store.completeBlock(block.key, score, pd && (block.type === 'grammar' || block.type === 'conversation' ? score >= 0.6 : true) ? pd : undefined);
    else setTimeout(store.evaluate, 50);
    setIdx((i) => i + 1);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-3"><span className="text-xl" aria-hidden>{ICON[block.type]}</span><div className="flex-1"><p className="font-semibold">{block.title}</p><Progress value={idx / plan.blocks.length} label="Session progress" className="mt-1.5" /></div><span className="text-sm text-muted">{idx + 1}/{plan.blocks.length}</span>
        <button className="text-sm text-muted underline" onClick={() => { if (confirm('Leave this session? Progress on finished blocks is saved.')) { setPlan(null); setIdx(-1); } }}>Quit</button></div>
      <BlockView block={block} convMode={convModeFor(state)} onDone={finish} />
    </div>
  );
}
