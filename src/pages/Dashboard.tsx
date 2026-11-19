import { Link } from 'react-router-dom';
import { useCtx } from '../state/hooks';
import { dailyMinutes, tierFor } from '../core/analytics';
import { planSession } from '../core/session';
import { PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { LANGUAGES } from '../content/registry';
import { dayKey } from '../core/fsrs';
import { Avatar } from '../components/Avatar';
import { BarChart } from '../components/Charts';
import { Btn, Card, Chip, Note, Progress } from '../components/ui';

export default function Dashboard() {
  const { store, state, content, cfg } = useCtx(); const { profile, stats } = store; const p = profile!;
  if (!stats) return null;
  const plan = planSession({ minutes: state.dailyMinutes, state, content, cards: store.cards, events: store.events, now: Date.now() });
  const todayMin = (state.studyMs[dayKey(Date.now())] ?? 0) / 60000; const goal = state.dailyMinutes;
  const progActive = state.programDay <= PROGRAM_LENGTH && !state.placement?.skipProgram;
  const day = progActive ? PROGRAM[state.programDay - 1] : null; const tier = tierFor(stats.masteryPoints);
  const week = dailyMinutes(state, 7).map((d) => ({ label: d.day.slice(5), value: d.min }));
  const finished = state.programDay > PROGRAM_LENGTH && !state.placement?.skipProgram;
  const backupOld = (stats.vocabTotal > 0 && Object.keys(state.programDone).length + stats.retainedPlus > 3) && (!p.lastBackup || Date.now() - p.lastBackup > 14 * 86_400_000);
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4"><Avatar cfg={p.avatar} size={64} /><div><h1 className="text-2xl font-bold sm:text-3xl">Hello, {p.username}</h1><p className="text-muted">{cfg.endonym} · {tier.name} · {state.xp} XP</p></div></div>

      <Card className="border-accent/40 bg-gradient-to-br from-accent/10 to-transparent">
        <div className="flex flex-wrap items-center gap-2"><Chip tone="accent">Today</Chip><Chip>{plan.focus}</Chip>{plan.dueTotal > 0 && <Chip tone="warn">{plan.dueTotal} due</Chip>}</div>
        <h2 className="mt-2 text-xl font-semibold">{plan.blocks.length ? `${plan.minutes}-minute session: ${plan.blocks.map((b) => b.type === 'newvocab' ? 'new words' : b.type).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).join(' → ')}` : 'Nothing planned — add a language or check your settings'}</h2>
        <div className="mt-3"><Progress value={todayMin / goal} label="Today's goal" /><p className="mt-1 text-sm text-muted">{Math.round(todayMin)} of {goal} min today</p></div>
        <div className="mt-4 flex flex-wrap gap-2"><Link to="/daily"><Btn size="lg">Start today's session</Btn></Link><Link to="/daily?m=5"><Btn size="lg" variant="ghost">Quick 5 min</Btn></Link></div>
      </Card>

      {finished && !state.finalAssessment && <Card><h3 className="font-semibold">30 days complete 🎉</h3><p className="text-sm text-muted">Take the final assessment to see how your beginner foundation holds up.</p><Link to="/assessment"><Btn className="mt-3">Take final assessment</Btn></Link></Card>}
      {state.finalAssessment && <Note>Final assessment: {Math.round(state.finalAssessment.score * 100)}% — {state.finalAssessment.passed ? 'passed' : 'not yet passed (you can retake it)'}. <Link className="underline" to="/assessment">Details</Link></Note>}
      {backupOld && <Note tone="warn">You haven't exported a backup in a while. Your data only lives in this browser — <Link className="underline" to="/settings">export a backup</Link>.</Note>}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-muted">Streak</p><p className="text-3xl font-bold">🔥 {state.streak.current}</p><p className="text-xs text-muted">best {state.streak.best} days</p></Card>
        <Card><p className="text-sm text-muted">Estimated level</p><p className="text-3xl font-bold">{stats.estimate.level}</p><p className="text-xs text-muted">{stats.estimate.confidence} confidence · estimate</p><Progress value={stats.estimate.progressToNext} className="mt-2" label="Progress to next level" /></Card>
        <Card><p className="text-sm text-muted">Words retained</p><p className="text-3xl font-bold">{stats.retainedPlus}</p><p className="text-xs text-muted">of {stats.vocabTotal} in the course · {stats.stages.mastered} mastered</p></Card>
      </div>

      {progActive && day && (
        <Card><div className="flex items-center justify-between"><h3 className="font-semibold">30-day programme</h3><Chip>{day.phase}</Chip></div>
          <p className="mt-1 text-lg">Day {state.programDay}: {day.title}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted">{day.canDo.map((c) => <li key={c}>By the end: {c.toLowerCase()}</li>)}</ul>
          <Progress value={Object.keys(state.programDone).length / PROGRAM_LENGTH} className="mt-3" label="Programme progress" /><p className="mt-1 text-xs text-muted">{Object.keys(state.programDone).length} of {PROGRAM_LENGTH} days complete</p></Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card><h3 className="mb-2 font-semibold">Last 7 days (minutes)</h3><BarChart data={week} unit=" min" /></Card>
        <Card><h3 className="mb-2 font-semibold">Skills</h3>
          {(['vocabulary', 'grammar', 'reading', 'listening', 'conversation', 'writing', 'speaking'] as const).map((s) => <div key={s} className="mb-1.5 flex items-center gap-2 text-sm"><span className="w-24 capitalize text-muted">{s}</span><Progress value={stats.skills[s].score ?? 0} className="flex-1" label={s} /><span className="w-10 text-right">{stats.skills[s].score === null ? '—' : `${Math.round((stats.skills[s].score as number) * 100)}%`}</span></div>)}
          <p className="mt-2 text-xs text-muted">Recent-weighted accuracy from your real answers. "—" = no data yet.</p></Card>
      </div>

      {Object.keys(p.languages).length < LANGUAGES.length && <Card><p className="text-sm text-muted">Add another language any time — each has independent progress.</p><Link to="/languages"><Btn variant="ghost" size="sm" className="mt-2">My Languages</Btn></Link></Card>}
    </div>
  );
}
