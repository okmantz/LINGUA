import { Link } from 'react-router-dom';
import { useGuide } from '../state/hooks';
import { dailyMinutes } from '../core/analytics';
import { PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { programActive } from '../core/guide';
import { LANGUAGES } from '../content/registry';
import { Avatar } from '../components/Avatar';
import { BarChart } from '../components/Charts';
import { Icon, type IconName } from '../components/Icon';
import { TeacherNote } from '../components/Teacher';
import { Btn, Card, Chip, IconBadge, Note, Progress, Ring, SectionTitle } from '../components/ui';

const ICON: Record<string, IconName> = { review: 'repeat', newvocab: 'sparkles', grammar: 'puzzle', conversation: 'chat', reading: 'book', listening: 'headphones', pronunciation: 'mic', writing: 'pen', recap: 'check' };
const greet = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default function Dashboard() {
  const { store, state, cfg, plan, next, todayMin, due } = useGuide(); const { profile, stats } = store; const p = profile!;
  if (!stats) return null;
  const goal = state.dailyMinutes; const active = programActive(state); const day = active ? PROGRAM[state.programDay - 1] : null; const done = Object.keys(state.programDone).length;
  const week = dailyMinutes(state, 7).map((d) => ({ label: d.day.slice(5), value: d.min }));
  const backupOld = (stats.vocabTotal > 0 && done + stats.retainedPlus > 3) && (!p.lastBackup || Date.now() - p.lastBackup > 14 * 86_400_000);
  const goalMet = todayMin >= goal;
  return (
    <div className="space-y-4">
      {/* Hero: one clear next step */}
      <section className="hero p-5 sm:p-7" aria-label="Your next step">
        <div className="relative z-10 flex items-start gap-3.5">
          <Avatar cfg={p.avatar} size={52} tier={stats.tier.index} />
          <div className="min-w-0 flex-1"><p className="text-sm muted">{greet()}, {p.username}</p><p className="truncate text-xs muted">{cfg.endonym} · {stats.tier.name}</p></div>
          <Chip className="!bg-white/15 !text-white"><Icon name="flame" size={13} />{state.streak.current} day{state.streak.current === 1 ? '' : 's'}</Chip>
        </div>
        <div className="relative z-10 mt-5">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] muted">{next.kind === 'rest' || next.kind === 'extra' ? 'Nice work' : 'Your next step'}</p>
          <h1 className="mt-1 text-[1.65rem] font-extrabold leading-tight tracking-tight sm:text-3xl">{next.title}</h1>
          <p className="mt-1.5 max-w-xl text-[0.97rem] leading-relaxed muted">{next.body}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link to={next.to}><Btn size="lg" className="shadow-lg">{next.cta}<Icon name="arrow" size={18} /></Btn></Link>
            {next.kind === 'session' && <Link to="/daily?m=5"><Btn size="lg" variant="ghost" className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20">Only 5 minutes</Btn></Link>}
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="flex flex-col items-center !p-3 text-center sm:!p-4">
          <Ring value={todayMin / goal} size={76} stroke={7} tone={goalMet ? 'var(--good)' : 'var(--accent)'}><span className="text-lg font-extrabold leading-none">{Math.round(todayMin)}</span><span className="text-[10px] text-muted">/ {goal} min</span></Ring>
          <p className="mt-1.5 text-xs font-medium text-muted">{goalMet ? 'Goal reached' : 'Today'}</p>
        </Card>
        <Card className="flex flex-col justify-center !p-3 text-center sm:!p-4"><p className="text-3xl font-extrabold leading-none sm:text-4xl">{stats.estimate.level}</p><Progress value={stats.estimate.progressToNext} className="mx-auto mt-2.5 max-w-20" label="Progress to next level" /><p className="mt-1.5 text-xs font-medium text-muted">Est. level</p></Card>
        <Card className="flex flex-col justify-center !p-3 text-center sm:!p-4"><p className="text-3xl font-extrabold leading-none sm:text-4xl">{stats.retainedPlus}</p><p className="mt-2.5 text-[11px] leading-tight text-muted">of {stats.vocabTotal}</p><p className="mt-0.5 text-xs font-medium text-muted">Words kept</p></Card>
      </div>

      {backupOld && <Note tone="warn">Your data only lives in this browser, and you haven't backed it up in a while. <Link className="font-semibold underline" to="/settings">Export a backup</Link>.</Note>}
      {state.finalAssessment && <Note>Final assessment: {Math.round(state.finalAssessment.score * 100)}%, {state.finalAssessment.passed ? 'passed' : 'not passed yet (you can retake it)'}. <Link className="font-semibold underline" to="/assessment">Details</Link></Note>}

      {/* Today's plan */}
      {plan.blocks.length > 0 && (
        <>
          <SectionTitle right={<Link to="/daily" className="text-sm font-semibold text-accent">Open</Link>}>Today's plan · {plan.minutes} min</SectionTitle>
          <Card className="divide-y divide-line !p-0">
            {plan.blocks.slice(0, 5).map((b, i) => (
              <Link key={b.key} to="/daily" className="flex items-center gap-3 p-3.5 transition hover:bg-surface2/60 first:rounded-t-2xl last:rounded-b-2xl">
                <IconBadge name={ICON[b.type] ?? 'check'} /><div className="min-w-0 flex-1"><p className="truncate font-semibold leading-snug"><span className="mr-1.5 text-muted">{i + 1}.</span>{b.title}</p><p className="truncate text-sm text-muted">{b.why}</p></div><span className="text-xs font-medium text-muted">{b.minutes} min</span>
              </Link>
            ))}
            {plan.blocks.length > 5 && <p className="p-3 text-center text-sm text-muted">+ {plan.blocks.length - 5} more steps</p>}
          </Card>
        </>
      )}

      {/* The Teacher's note of the day */}
      <TeacherNote mood={goalMet ? 'cheer' : due > 0 ? 'think' : 'happy'} title={goalMet ? 'You hit your goal!' : due > 0 ? `${due} word${due === 1 ? '' : 's'} due for review` : 'Keep it small and steady'} action={{ label: next.cta, to: next.to }}>
        {goalMet ? 'That is exactly how a language gets learned: a little, every day. Anything extra is a bonus.' : due > 0 ? 'Reviewing right before you forget makes memories last. Today\'s session starts with these.' : 'Ten focused minutes a day beats a two-hour cram once a week. Tap the big button whenever you are ready.'}
      </TeacherNote>

      {/* Programme */}
      {active && day && (
        <>
          <SectionTitle right={<Link to="/path" className="text-sm font-semibold text-accent">Full path</Link>}>30-day programme</SectionTitle>
          <Card>
            <div className="flex items-center justify-between gap-2"><p className="text-lg font-bold">Day {state.programDay}: {day.title}</p><Chip>{day.phase}</Chip></div>
            <p className="mt-2 text-sm font-medium text-muted">By the end of today you can:</p>
            <ul className="mt-1.5 space-y-1">{day.canDo.map((c) => <li key={c} className="flex items-start gap-2 text-[0.93rem]"><Icon name="target" size={16} className="mt-0.5 shrink-0 text-accent" />{c}</li>)}</ul>
            <Progress value={done / PROGRAM_LENGTH} className="mt-4" label="Programme progress" /><p className="mt-1.5 text-xs text-muted">{done} of {PROGRAM_LENGTH} days complete</p>
          </Card>
        </>
      )}

      <SectionTitle>This week</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><h3 className="mb-2 font-semibold">Minutes studied</h3><BarChart data={week} unit=" min" /></Card>
        <Card><h3 className="mb-2.5 font-semibold">Skills</h3>
          {(['vocabulary', 'grammar', 'reading', 'listening', 'conversation', 'writing', 'speaking'] as const).map((s) => <div key={s} className="mb-1.5 flex items-center gap-2 text-sm"><span className="w-24 capitalize text-muted">{s}</span><Progress value={stats.skills[s].score ?? 0} className="flex-1" label={s} /><span className="w-10 text-right text-xs">{stats.skills[s].score === null ? '—' : `${Math.round((stats.skills[s].score as number) * 100)}%`}</span></div>)}
          <p className="mt-2 text-xs text-muted">Based on your real answers. A dash means no data yet.</p></Card>
      </div>

      {Object.keys(p.languages).length < LANGUAGES.length && <Card className="flex items-center gap-3"><IconBadge name="globe" /><p className="flex-1 text-sm text-muted">Add another language any time. Each has its own progress.</p><Link to="/languages"><Btn variant="ghost" size="sm">Add</Btn></Link></Card>}
    </div>
  );
}
