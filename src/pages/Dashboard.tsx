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
import { Btn, Card, Chip, IconBadge, Note, Progress, Ring, SectionTitle, cx } from '../components/ui';

const ICON: Record<string, IconName> = { review: 'repeat', newvocab: 'sparkles', grammar: 'puzzle', conversation: 'chat', reading: 'book', listening: 'headphones', pronunciation: 'mic', writing: 'pen', recap: 'check' };
const greet = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
const SKILLS = ['vocabulary', 'grammar', 'reading', 'listening', 'conversation', 'writing', 'speaking'] as const;

export default function Dashboard() {
  const { store, state, cfg, plan, next, todayMin, due } = useGuide(); const { profile, stats } = store; const p = profile!;
  if (!stats) return null;
  const goal = state.dailyMinutes; const active = programActive(state); const day = active ? PROGRAM[state.programDay - 1] : null; const done = Object.keys(state.programDone).length;
  const week = dailyMinutes(state, 7).map((d) => ({ label: new Date(d.day + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), value: d.min }));
  const backupOld = (stats.vocabTotal > 0 && done + stats.retainedPlus > 3) && (!p.lastBackup || Date.now() - p.lastBackup > 14 * 86_400_000);
  const goalMet = todayMin >= goal; const leftMin = Math.max(0, Math.ceil(goal - todayMin));
  return (
    <div className="stagger space-y-5">
      {/* Hero: one clear next step */}
      <section className="hero p-5 sm:p-8" aria-label="Your next step">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <Avatar cfg={p.avatar} size={44} tier={stats.tier.index} />
              <div className="min-w-0 flex-1 leading-tight"><p className="truncate text-[0.95rem] font-semibold">{greet()}, {p.username}</p><p className="truncate text-xs muted">{cfg.endonym} · {stats.tier.name}</p></div>
            </div>
            <p className="eyebrow !text-white/65 mt-7">{next.kind === 'rest' || next.kind === 'extra' ? 'Nice work' : 'Your next step'}</p>
            <h1 className="mt-1.5 text-[1.75rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.15rem]">{next.title}</h1>
            <p className="mt-2.5 max-w-xl text-[0.97rem] leading-relaxed muted">{next.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Link to={next.to}><Btn size="lg">{next.cta}<Icon name="arrow" size={18} /></Btn></Link>
              {next.kind === 'session' && <Link to="/daily?m=5"><Btn size="lg" variant="ghost" className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20">Only 5 minutes</Btn></Link>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-white/[.08] p-4 ring-1 ring-white/12 backdrop-blur md:w-52 md:flex-col md:justify-center md:gap-3 md:p-5">
            <Ring value={goal ? todayMin / goal : 0} size={96} stroke={9} tone={goalMet ? '#4ade80' : '#fff'} track="rgb(255 255 255 / .16)"><span className="tabular text-2xl font-extrabold leading-none">{Math.round(todayMin)}</span><span className="text-[10px] font-medium text-white/70">of {goal} min</span></Ring>
            <div className="min-w-0 md:text-center"><p className="text-sm font-bold">{goalMet ? 'Daily goal reached' : `${leftMin} min to go`}</p><p className="text-xs muted">Today's goal</p></div>
          </div>
        </div>
      </section>

      {backupOld && <Note tone="warn">Your data only lives in this browser, and you haven't backed it up in a while. <Link className="font-semibold text-accent-strong underline" to="/settings">Export a backup</Link>.</Note>}
      {state.finalAssessment && <Note>Final assessment: {Math.round(state.finalAssessment.score * 100)}%, {state.finalAssessment.passed ? 'passed' : 'not passed yet (you can retake it)'}. <Link className="font-semibold text-accent-strong underline" to="/assessment">Details</Link></Note>}

      {/* Key numbers */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon="clock" label="Today" value={`${Math.round(todayMin)}`} unit={`/ ${goal} min`}><Progress value={goal ? todayMin / goal : 0} tone={goalMet ? 'good' : 'accent'} className="mt-3" label="Daily goal" /></StatTile>
        <StatTile icon="target" label="Estimated level" value={stats.estimate.level} unit={stats.estimate.confidence === 'high' ? '' : 'estimate'}><Progress value={stats.estimate.progressToNext} className="mt-3" label="Progress to next level" /></StatTile>
        <StatTile icon="cards" label="Words kept" value={`${stats.retainedPlus}`} unit={`of ${stats.vocabTotal}`}><Progress value={stats.vocabTotal ? stats.retainedPlus / stats.vocabTotal : 0} tone="good" className="mt-3" label="Words retained" /></StatTile>
        <StatTile icon="repeat" label="Due now" value={`${due}`} unit={due === 1 ? 'review' : 'reviews'}>{due > 0 ? <Link to="/vocabulary" className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-accent-strong hover:underline">Review now<Icon name="arrow" size={13} /></Link> : <p className="mt-2.5 text-xs text-muted">All caught up</p>}</StatTile>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="min-w-0 space-y-5 lg:col-span-3">
          {/* Today's plan */}
          {plan.blocks.length > 0 && (
            <section>
              <SectionTitle right={<Link to="/daily" className="text-sm font-bold text-accent-strong hover:underline">Open session</Link>}>Today's plan · {plan.minutes} min</SectionTitle>
              <Card className="divide-y divide-line !p-0">
                {plan.blocks.slice(0, 5).map((b, i) => (
                  <Link key={b.key} to="/daily" className="flex items-center gap-3.5 p-3.5 transition first:rounded-t-[1.25rem] last:rounded-b-[1.25rem] hover:bg-surface2/60">
                    <IconBadge name={ICON[b.type] ?? 'check'} size={42} /><div className="min-w-0 flex-1"><p className="truncate font-semibold leading-snug"><span className="tabular mr-1.5 text-faint">{i + 1}</span>{b.title}</p><p className="truncate text-sm text-muted">{b.why}</p></div><span className="tabular shrink-0 rounded-full bg-surface2 px-2.5 py-1 text-xs font-semibold text-muted">{b.minutes} min</span>
                  </Link>
                ))}
                {plan.blocks.length > 5 && <p className="p-3 text-center text-sm text-muted">+ {plan.blocks.length - 5} more steps</p>}
              </Card>
            </section>
          )}

          {/* Programme */}
          {active && day && (
            <section>
              <SectionTitle right={<Link to="/path" className="text-sm font-bold text-accent-strong hover:underline">Full path</Link>}>30-day programme</SectionTitle>
              <Card>
                <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Day {state.programDay} of {PROGRAM_LENGTH}</p><p className="mt-1 text-lg font-extrabold leading-snug tracking-tight">{day.title}</p></div><Chip>{day.phase}</Chip></div>
                <p className="mt-3 text-sm font-semibold text-muted">By the end of today you can:</p>
                <ul className="mt-2 space-y-1.5">{day.canDo.map((c) => <li key={c} className="flex items-start gap-2.5 text-[0.93rem]"><Icon name="target" size={16} className="mt-1 shrink-0 text-accent-strong" />{c}</li>)}</ul>
                <div className="mt-5 flex flex-wrap gap-1" aria-label={`${done} of ${PROGRAM_LENGTH} days complete`}>{PROGRAM.map((d) => <span key={d.day} title={`Day ${d.day}`} className={cx('h-2 flex-1 basis-2 rounded-full', state.programDone[d.day] ? 'bg-accent' : d.day === state.programDay ? 'bg-accent/40 ring-2 ring-accent/50' : 'bg-surface3')} />)}</div>
                <p className="mt-2 text-xs text-muted">{done} of {PROGRAM_LENGTH} days complete</p>
              </Card>
            </section>
          )}
        </div>

        <div className="min-w-0 space-y-5 lg:col-span-2">
          <TeacherNote mood={goalMet ? 'cheer' : due > 0 ? 'think' : 'happy'} title={goalMet ? 'You hit your goal!' : due > 0 ? `${due} word${due === 1 ? '' : 's'} due for review` : 'Keep it small and steady'} action={{ label: next.cta, to: next.to }}>
            {goalMet ? 'That is exactly how a language gets learned: a little, every day. Anything extra is a bonus.' : due > 0 ? 'Reviewing right before you forget makes memories last. Today\'s session starts with these.' : 'Ten focused minutes a day beats a two-hour cram once a week. Tap the big button whenever you are ready.'}
          </TeacherNote>
          <Card>
            <div className="mb-3 flex items-center justify-between"><h3 className="font-extrabold tracking-tight">This week</h3><span className="tabular text-xs font-semibold text-muted">{Math.round(stats.study7Min)} min</span></div>
            <BarChart data={week} unit=" min" height={120} />
          </Card>
          <Card>
            <h3 className="mb-3 font-extrabold tracking-tight">Skills</h3>
            <div className="space-y-2.5">{SKILLS.map((s) => <div key={s} className="flex items-center gap-3 text-sm"><span className="w-[5.5rem] capitalize text-muted">{s}</span><Progress value={stats.skills[s].score ?? 0} className="flex-1" label={s} /><span className="tabular w-9 text-right text-xs font-semibold">{stats.skills[s].score === null ? '—' : `${Math.round((stats.skills[s].score as number) * 100)}%`}</span></div>)}</div>
            <p className="mt-3 text-xs text-muted">Based on your real answers. A dash means no data yet.</p>
          </Card>
        </div>
      </div>

      {Object.keys(p.languages).length < LANGUAGES.length && <Card className="flex items-center gap-3.5 !p-4"><IconBadge name="globe" size={44} /><div className="min-w-0 flex-1"><p className="font-bold leading-tight">Learn another language</p><p className="text-sm text-muted">Each one keeps its own progress.</p></div><Link to="/languages"><Btn variant="ghost" size="sm">Add</Btn></Link></Card>}
    </div>
  );
}

function StatTile({ icon, label, value, unit, children }: { icon: IconName; label: string; value: string; unit?: string; children?: React.ReactNode }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center gap-2"><IconBadge name={icon} size={28} /><span className="text-[0.8rem] font-semibold text-muted">{label}</span></div>
      <p className="mt-3 flex items-baseline gap-1.5"><span className="tabular text-[1.9rem] font-extrabold leading-none tracking-tight">{value}</span>{unit && <span className="text-xs font-medium text-muted">{unit}</span>}</p>
      {children}
    </Card>
  );
}
