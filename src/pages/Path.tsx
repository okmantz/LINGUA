// "Your Path": the whole plan on one screen, so the learner always knows where they are, what's next and why.
import { Link } from 'react-router-dom';
import { useGuide } from '../state/hooks';
import { PHASES, PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { resolveProgram } from '../core/curriculum';
import { LIB_KEY, PASS, programActive, type LibKind } from '../core/guide';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { levelProgress, LEVEL_UP_AT } from '../core/progression';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, H1, IconBadge, Progress, Ring, cx } from '../components/ui';

export default function Path() {
  const { state, content, cfg, plan } = useGuide();
  const active = programActive(state); const done = Object.keys(state.programDone).length;
  if (!active) return <PathwayView />;
  const days = resolveProgram(content);
  return (
    <div>
      <H1 eyebrow={`${cfg.name} · ${PROGRAM_LENGTH}-day programme`} sub="From first words to simple conversations. It builds a beginner foundation; it doesn't promise fluency.">Your path</H1>
      <Card className="mb-8 flex items-center gap-5"><Ring value={done / PROGRAM_LENGTH} size={78} stroke={8}><span className="tabular text-lg font-extrabold leading-none">{done}</span><span className="text-[10px] font-semibold text-muted">/ {PROGRAM_LENGTH}</span></Ring><div className="min-w-0 flex-1"><p className="text-lg font-extrabold leading-tight tracking-tight">{done === 0 ? 'Ready when you are' : done >= PROGRAM_LENGTH ? 'Programme complete' : `Day ${state.programDay} is next`}</p><p className="mt-0.5 text-sm text-muted">{done} of {PROGRAM_LENGTH} days complete</p><Progress value={done / PROGRAM_LENGTH} className="mt-2.5" label="Programme progress" /></div></Card>
      {PHASES.map((ph) => {
        const inPhase = PROGRAM.filter((d) => d.day >= ph.days[0] && d.day <= ph.days[1]); const phDone = inPhase.filter((d) => state.programDone[d.day]).length;
        return (
          <section key={ph.id} className="mb-8">
            <div className="mb-3 flex items-center justify-between gap-3 px-0.5"><h2 className="eyebrow">{ph.label}</h2><Chip tone={phDone === inPhase.length ? 'good' : 'plain'}><span className="tabular">{phDone}/{inPhase.length}</span></Chip></div>
            <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-0.5 before:rounded-full before:bg-line-strong">
              {inPhase.map((d) => {
                const finished = !!state.programDone[d.day]; const current = state.programDay === d.day; const dc = days[d.day - 1];
                const status = finished ? 'done' : current ? 'now' : 'later';
                return (
                  <li key={d.day} className="relative flex gap-3">
                    <span className={cx('tabular z-10 mt-3.5 grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ring-4 ring-bg', status === 'done' && 'bg-good text-white', status === 'now' && 'btn-primary', status === 'later' && 'bg-surface3 text-muted')}>{status === 'done' ? <Icon name="check" size={18} strokeWidth={3} /> : d.day}</span>
                    <Card className={cx('min-w-0 flex-1 !p-4', status === 'now' && 'border-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_14%,transparent),var(--shadow)]', status === 'later' && 'bg-surface/70')}>
                      <div className="flex items-start gap-2"><div className="min-w-0 flex-1"><p className="font-bold leading-snug tracking-tight">{d.title}</p>{status === 'done' && <p className="tabular mt-0.5 text-xs font-semibold text-good">Done · {Math.round((state.programDone[d.day].score ?? 1) * 100)}%</p>}{status === 'now' && <Chip tone="accent" className="mt-1.5">Today</Chip>}</div>{d.check && <Chip tone="warn">Check-in</Chip>}</div>
                      <ul className="mt-2.5 space-y-1.5">{d.canDo.map((c) => <li key={c} className="flex items-start gap-2 text-sm text-muted"><Icon name="target" size={14} className="mt-[3px] shrink-0 text-faint" />{c}</li>)}</ul>
                      {status === 'now' && dc && (
                        <div className="mt-3 border-t border-line pt-3">
                          <p className="eyebrow mb-2">Today's steps</p>
                          <div className="flex flex-wrap gap-1.5">
                            {dc.words.length > 0 && <Chip tone="accent">{dc.words.length} new words</Chip>}
                            {dc.grammar.map((g) => <Chip key={g.id}>Grammar: {g.title}</Chip>)}
                            {dc.conv && <Chip>Conversation: {dc.conv.title}</Chip>}
                            {dc.listening && <Chip>Listening</Chip>}{dc.reading && <Chip>Reading</Chip>}{dc.pron && <Chip>Pronunciation</Chip>}{dc.writing && <Chip>Writing</Chip>}
                          </div>
                          <Link to="/daily"><Btn className="mt-4 w-full sm:w-auto">Start Day {d.day}<Icon name="arrow" size={17} /></Btn></Link>
                          {plan.dueTotal > 0 && <p className="mt-2 text-xs text-muted">Starts with {plan.dueTotal} review{plan.dueTotal === 1 ? '' : 's'}.</p>}
                        </div>
                      )}
                    </Card>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
      <Card className="flex items-center gap-4"><IconBadge name="award" size={44} /><div className="flex-1"><p className="font-bold">Final assessment</p><p className="text-sm text-muted">{state.finalAssessment ? `Last score ${Math.round(state.finalAssessment.score * 100)}%` : 'Unlocks as a check-up once you finish the programme.'}</p></div><Link to="/assessment"><Btn variant="ghost" size="sm">Open</Btn></Link></Card>
    </div>
  );
}

/** After the programme (or after skipping it): progress by CEFR level, with the next lesson to take. */
function PathwayView() {
  const { state, content, cfg, next, store } = useGuide();
  const lp = levelProgress(state, content, state.pathLevel);
  const KINDS: [LibKind, string, string][] = [['grammar', 'Grammar', '/grammar'], ['conversations', 'Conversations', '/conversations'], ['listening', 'Listening', '/listening'], ['reading', 'Reading', '/reading'], ['writing', 'Writing', '/writing'], ['pronunciation', 'Pronunciation', '/pronunciation']];
  const listOf = (k: LibKind): { id: string; level: Cefr }[] => (k === 'pronunciation' ? content.pronunciation : content[k]);
  const levels = CEFR_ORDER.filter((l) => KINDS.some(([k]) => listOf(k).some((x) => x.level === l)));
  return (
    <div>
      <H1 eyebrow={`${cfg.name} pathway`} sub="Finish what's available at your level, then move up.">Your path</H1>
      <Card className="mb-6 border-accent/40 bg-gradient-to-br from-accent/[.07] to-surface"><p className="eyebrow">Current level</p><p className="mt-1 text-4xl font-extrabold tracking-tight">{state.pathLevel}</p><p className="mt-2 text-sm text-muted"><b className="text-ink">{next.title}.</b> {next.body}</p><Link to={next.to}><Btn className="mt-4">{next.cta}<Icon name="arrow" size={17} /></Btn></Link>
        {lp.total > 0 && <><Progress value={lp.ratio} className="mt-4" label="Level progress" /><p className="mt-1 text-xs text-muted">{lp.passed} of {lp.total} {state.pathLevel} lessons passed. At {Math.round(LEVEL_UP_AT * 100)}% you move up to the next level automatically.</p></>}
        <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-line pt-4 text-sm"><span className="mr-1 text-muted">Not the right level?</span>{CEFR_ORDER.map((l) => <button key={l} aria-pressed={l === state.pathLevel} onClick={() => store.patchLang(state.code, (s) => ({ ...s, pathLevel: l }))} className={cx('tabular h-8 min-w-10 rounded-full border px-3 text-[0.82rem] font-bold transition', l === state.pathLevel ? 'border-accent bg-accent/15 text-accent-strong' : 'border-line-strong text-muted hover:bg-surface2 hover:text-ink')}>{l}</button>)}</div></Card>
      <div className="space-y-4">{levels.map((lvl) => (
        <Card key={lvl}><div className="mb-4 flex items-center gap-2"><h2 className="text-xl font-extrabold tracking-tight">{lvl}</h2>{lvl === state.pathLevel && <Chip tone="accent">You are here</Chip>}</div>
          <div className="space-y-2.5">{KINDS.map(([k, label, to]) => {
            const list = listOf(k).filter((x) => x.level === lvl); if (!list.length) return null;
            const passed = list.filter((x) => (state.lessons[LIB_KEY[k](x.id)]?.best ?? 0) >= PASS).length;
            return <Link key={k} to={to} className="block rounded-xl px-2 py-1.5 transition hover:bg-surface2/70"><div className="flex items-center justify-between text-sm"><span className="font-medium">{label}</span><span className="tabular text-xs font-semibold text-muted">{passed}/{list.length}</span></div><Progress value={passed / list.length} className="mt-1.5" label={label} /></Link>;
          })}</div></Card>
      ))}</div>
    </div>
  );
}
