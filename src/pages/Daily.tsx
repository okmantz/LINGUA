import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { planSession, type Block, type SessionPlan } from '../core/session';
import { PROGRAM_LENGTH } from '../core/program';
import { reviewComment } from '../core/teacher';
import { useFocusMode, useGuide } from '../state/hooks';
import { BlockView, convModeFor } from '../components/BlockRunner';
import { Icon, type IconName } from '../components/Icon';
import { TeacherNote } from '../components/Teacher';
import { Btn, Card, Chip, H1, IconBadge, Progress, cx } from '../components/ui';

const ICON: Record<string, IconName> = { review: 'repeat', newvocab: 'sparkles', grammar: 'puzzle', conversation: 'chat', reading: 'book', listening: 'headphones', pronunciation: 'mic', writing: 'pen', recap: 'check' };

export default function Daily() {
  const g = useGuide(); const { store, state, content } = g; const [sp] = useSearchParams();
  const minutes = Number(sp.get('m')) || state.dailyMinutes;
  const [plan, setPlan] = useState<SessionPlan | null>(null); const [idx, setIdx] = useState(-1); const [scores, setScores] = useState<number[]>([]); const [startXp, setStartXp] = useState(state.xp);
  const [startMs, setStartMs] = useState(0);
  useFocusMode(!!plan && idx >= 0 && idx < plan.blocks.length);
  const preview = (minutes === state.dailyMinutes ? g.plan : planSession({ minutes, state, content, cards: store.cards, events: store.events, now: Date.now() }));
  const start = () => { const p = planSession({ minutes, state, content, cards: store.cards, events: store.events, now: Date.now() }); setPlan(p); setIdx(0); setScores([]); setStartXp(state.xp); setStartMs(Object.values(state.studyMs).reduce((a, b) => a + b, 0)); };

  if (!plan) {
    const p = preview; const progActive = p.day !== null;
    return (
      <div>
        <H1 sub={progActive ? `Programme day ${p.day} of ${PROGRAM_LENGTH}` : 'Adaptive practice at your level'}>Today's session</H1>
        <Card className="mb-4 !p-4">
          <div className="flex flex-wrap items-center gap-2"><Chip tone="accent">{p.focus}</Chip><Chip><Icon name="clock" size={12} />{p.minutes} min</Chip>{p.dueTotal > 0 && <Chip tone="warn">{p.dueTotal} words due</Chip>}</div>
          <p className="mb-2 mt-4 text-sm font-medium">How much time do you have?</p>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">{[5, 10, 15, 20, 30, 45, 60].map((m) => <Link key={m} to={`/daily?m=${m}`} replace className={cx('grid h-11 min-w-16 shrink-0 place-items-center whitespace-nowrap rounded-xl px-3 text-sm font-semibold transition', m === minutes ? 'bg-accent text-accent-ink shadow-sm' : 'bg-surface2 text-muted hover:text-ink')}>{m} min</Link>)}</div>
          <Btn size="lg" className="mt-4 w-full" disabled={!p.blocks.length} onClick={start}>Start session<Icon name="arrow" size={18} /></Btn>
        </Card>
        {p.blocks.length > 0 && <>
          <p className="mb-2 px-0.5 text-[0.8rem] font-bold uppercase tracking-wider text-muted">What we'll do, in order</p>
          <ol className="space-y-2">{p.blocks.map((b, i) => (
            <li key={b.key}><Card className="flex items-center gap-3 !p-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface2 text-xs font-bold text-muted">{i + 1}</span><IconBadge name={ICON[b.type] ?? 'check'} size={38} /><div className="min-w-0 flex-1"><p className="font-semibold leading-snug">{b.title}</p><p className="text-sm text-muted">{b.why}</p></div><span className="text-xs font-medium text-muted">{b.minutes} min</span></Card></li>
          ))}</ol></>}
        {!p.blocks.length && <Card>Nothing is scheduled yet. Add a language or finish onboarding.</Card>}
      </div>
    );
  }

  const block: Block | undefined = plan.blocks[idx];
  if (!block) {
    const total = Object.values(state.studyMs).reduce((a, b) => a + b, 0) - startMs; const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 1;
    const c = reviewComment(avg, 'session'); const dayDone = plan.day && state.programDay > plan.day;
    return (
      <div className="pop mx-auto max-w-lg space-y-4">
        <Card className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-good/15 text-good"><Icon name="check" size={34} strokeWidth={2.6} /></div>
          <h1 className="mt-3 text-2xl font-extrabold">Session complete</h1>
          <div className="mt-4 grid grid-cols-3 gap-3"><div><p className="text-2xl font-extrabold">{Math.round(avg * 100)}%</p><p className="text-xs text-muted">accuracy</p></div><div><p className="text-2xl font-extrabold">+{state.xp - startXp}</p><p className="text-xs text-muted">XP</p></div><div><p className="text-2xl font-extrabold">{state.streak.current}</p><p className="text-xs text-muted">day streak</p></div></div>
          <p className="mt-3 text-sm text-muted">{Math.max(1, Math.round(total / 60000))} min of active study logged.</p>
          {state.programDay <= PROGRAM_LENGTH && !state.placement?.skipProgram && <p className="mt-3 rounded-xl bg-surface2 px-3 py-2 text-sm">{dayDone ? <>Day {plan.day} is complete. <b>Day {state.programDay} is unlocked.</b></> : `Programme: day ${state.programDay} of ${PROGRAM_LENGTH}. Finish the required steps to unlock the next day.`}</p>}
        </Card>
        <TeacherNote mood={c.mood} title={c.title}>{c.text}</TeacherNote>
        <Card className="!p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted">What next?</p><p className="mt-1 font-semibold">{g.next.title}</p><p className="text-sm text-muted">{g.next.body}</p>
          <div className="mt-3 flex flex-wrap gap-2"><Link to={g.next.to === '/daily' ? '/' : g.next.to}><Btn>{g.next.to === '/daily' ? 'Back to Home' : g.next.cta}</Btn></Link>{g.next.to === '/daily' && <Btn variant="ghost" onClick={() => { setPlan(null); setIdx(-1); }}>Another session</Btn>}<Link to="/path"><Btn variant="ghost">See my path</Btn></Link></div></Card>
      </div>
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
      <div className="mb-5 flex items-center gap-3">
        <IconBadge name={ICON[block.type] ?? 'check'} size={40} />
        <div className="min-w-0 flex-1"><p className="truncate font-semibold leading-tight">{block.title}</p><div className="mt-1.5 flex items-center gap-2"><Progress value={idx / plan.blocks.length} label="Session progress" className="flex-1" /><span className="text-xs font-medium text-muted">{idx + 1}/{plan.blocks.length}</span></div></div>
        <button aria-label="Quit session" className="grid h-10 w-10 place-items-center rounded-full bg-surface2 text-muted hover:text-ink" onClick={() => { if (confirm('Leave this session? Progress on finished blocks is saved.')) { setPlan(null); setIdx(-1); } }}><Icon name="x" size={18} /></button>
      </div>
      <BlockView block={block} convMode={convModeFor(state)} onDone={finish} />
    </div>
  );
}
