import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { planSession, type Block, type SessionPlan } from '../core/session';
import { PROGRAM_LENGTH } from '../core/program';
import { reviewComment } from '../core/teacher';
import { useFocusMode, useGuide } from '../state/hooks';
import { BlockView, convModeFor } from '../components/BlockRunner';
import { Icon, type IconName } from '../components/Icon';
import { TeacherNote } from '../components/Teacher';
import { Btn, Card, Chip, Empty, H1, IconBadge, Progress, cx } from '../components/ui';

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
        <H1 eyebrow={progActive ? `Programme day ${p.day} of ${PROGRAM_LENGTH}` : 'Adaptive practice at your level'} sub="A guided session built from what you need most right now.">Today's session</H1>
        <Card className="mb-8 !p-5">
          <div className="flex flex-wrap items-center gap-2"><Chip tone="accent">{p.focus}</Chip><Chip><Icon name="clock" size={12} />{p.minutes} min</Chip>{p.dueTotal > 0 && <Chip tone="warn"><Icon name="repeat" size={12} />{p.dueTotal} words due</Chip>}</div>
          <p className="mb-2.5 mt-5 text-sm font-bold">How much time do you have?</p>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">{[5, 10, 15, 20, 30, 45, 60, 90, 120].map((m) => <Link key={m} to={`/daily?m=${m}`} replace aria-current={m === minutes} className={cx('tabular grid h-11 min-w-[4.25rem] shrink-0 place-items-center whitespace-nowrap rounded-xl px-3 text-sm font-bold transition', m === minutes ? 'btn-primary' : 'bg-surface2 text-muted hover:bg-surface3 hover:text-ink')}>{m} min</Link>)}</div>
          <Btn size="lg" className="mt-5 w-full" disabled={!p.blocks.length} onClick={start}>Start session<Icon name="arrow" size={18} /></Btn>
        </Card>
        {p.blocks.length > 0 && <>
          <p className="eyebrow mb-3 px-0.5">What we'll do, in order</p>
          <ol className="relative space-y-2.5 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-0.5 before:rounded-full before:bg-line-strong">{p.blocks.map((b, i) => (
            <li key={b.key} className="relative"><Card className="flex items-center gap-3.5 !p-3.5"><span className="relative z-10 grid shrink-0 place-items-center rounded-xl ring-4 ring-surface"><IconBadge name={ICON[b.type] ?? 'check'} size={42} /></span><div className="min-w-0 flex-1"><p className="font-semibold leading-snug"><span className="tabular mr-1.5 text-faint">{i + 1}</span>{b.title}</p><p className="text-sm text-muted">{b.why}</p></div><span className="tabular shrink-0 rounded-full bg-surface2 px-2.5 py-1 text-xs font-semibold text-muted">{b.minutes} min</span></Card></li>
          ))}</ol></>}
        {!p.blocks.length && <Empty icon="sparkles" title="Nothing is scheduled yet">Add a language or finish onboarding to get a session.</Empty>}
      </div>
    );
  }

  const block: Block | undefined = plan.blocks[idx];
  if (!block) {
    const total = Object.values(state.studyMs).reduce((a, b) => a + b, 0) - startMs; const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 1;
    const c = reviewComment(avg, 'session'); const dayDone = plan.day && state.programDay > plan.day;
    return (
      <div className="pop mx-auto max-w-lg space-y-4">
        <Card className="py-8 text-center">
          <div className="celebrate mx-auto grid h-20 w-20 place-items-center rounded-full bg-good/14 text-good"><Icon name="check" size={40} strokeWidth={2.6} /></div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Session complete</h1>
          <div className="mt-6 grid grid-cols-3 gap-3"><div className="rounded-2xl bg-surface2 px-2 py-3.5"><p className="tabular text-2xl font-extrabold leading-none">{Math.round(avg * 100)}%</p><p className="mt-1.5 text-xs font-semibold text-muted">accuracy</p></div><div className="rounded-2xl bg-surface2 px-2 py-3.5"><p className="tabular text-2xl font-extrabold leading-none">+{state.xp - startXp}</p><p className="mt-1.5 text-xs font-semibold text-muted">XP</p></div><div className="rounded-2xl bg-surface2 px-2 py-3.5"><p className="tabular flex items-center justify-center gap-1 text-2xl font-extrabold leading-none"><Icon name="flame" size={20} className="text-warn" />{state.streak.current}</p><p className="mt-1.5 text-xs font-semibold text-muted">day streak</p></div></div>
          <p className="mt-4 text-sm text-muted">{Math.max(1, Math.round(total / 60000))} min of active study logged.</p>
          {state.programDay <= PROGRAM_LENGTH && !state.placement?.skipProgram && <p className="mt-4 rounded-xl bg-accent/10 px-3.5 py-2.5 text-sm">{dayDone ? <>Day {plan.day} is complete. <b>Day {state.programDay} is unlocked.</b></> : `Programme: day ${state.programDay} of ${PROGRAM_LENGTH}. Finish the required steps to unlock the next day.`}</p>}
        </Card>
        <TeacherNote mood={c.mood} title={c.title}>{c.text}</TeacherNote>
        <Card className="!p-4"><p className="eyebrow">What next?</p><p className="mt-1.5 font-bold tracking-tight">{g.next.title}</p><p className="text-sm text-muted">{g.next.body}</p>
          <div className="mt-4 flex flex-wrap gap-2"><Link to={g.next.to === '/daily' ? '/' : g.next.to}><Btn>{g.next.to === '/daily' ? 'Back to Home' : g.next.cta}</Btn></Link>{g.next.to === '/daily' && <Btn variant="ghost" onClick={() => { setPlan(null); setIdx(-1); }}>Another session</Btn>}<Link to="/path"><Btn variant="ghost">See my path</Btn></Link></div></Card>
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
      <div className="mb-6 flex items-center gap-3">
        <IconBadge name={ICON[block.type] ?? 'check'} size={42} />
        <div className="min-w-0 flex-1"><p className="truncate font-bold leading-tight tracking-tight">{block.title}</p><div className="mt-2 flex items-center gap-2.5"><Progress value={idx / plan.blocks.length} label="Session progress" className="flex-1" /><span className="tabular text-xs font-bold text-muted">{idx + 1}/{plan.blocks.length}</span></div></div>
        <button aria-label="Quit session" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface2 text-muted transition hover:bg-surface3 hover:text-ink" onClick={() => { if (confirm('Leave this session? Progress on finished blocks is saved.')) { setPlan(null); setIdx(-1); } }}><Icon name="x" size={18} /></button>
      </div>
      <BlockView block={block} convMode={convModeFor(state)} onDone={finish} />
    </div>
  );
}
