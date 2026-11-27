// "Your Path": the whole plan on one screen, so the learner always knows where they are, what's next and why.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGuide } from '../state/hooks';
import { PHASES, PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { resolveProgram } from '../core/curriculum';
import { LIB_KEY, PASS, programActive, type LibKind } from '../core/guide';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { levelProgress, LEVEL_UP_AT } from '../core/progression';
import { Icon } from '../components/Icon';
import { LevelPicker } from '../components/LevelPicker';
import { Btn, Card, Chip, H1, IconBadge, LEVEL_CAN, LEVEL_NAME, LevelBadge, LevelLadder, Progress, Ring, cx } from '../components/ui';

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

/** After the programme (or after placing above A1): progress by CEFR level, with the next lesson to take. Training always starts at the learner's own level. */
function PathwayView() {
  const { state, content, cfg, next, store } = useGuide(); const [pick, setPick] = useState(false);
  const lp = levelProgress(state, content, state.pathLevel);
  const KINDS: [LibKind, string, string][] = [['grammar', 'Grammar', '/grammar'], ['conversations', 'Conversations', '/conversations'], ['listening', 'Listening', '/listening'], ['reading', 'Reading', '/reading'], ['writing', 'Writing', '/writing'], ['pronunciation', 'Pronunciation', '/pronunciation']];
  const listOf = (k: LibKind): { id: string; level: Cefr }[] => (k === 'pronunciation' ? content.pronunciation : content[k]);
  const levels = CEFR_ORDER.filter((l) => KINDS.some(([k]) => listOf(k).some((x) => x.level === l)));
  const ladder = Object.fromEntries(levels.map((l) => [l, levelProgress(state, content, l).ratio])) as Partial<Record<Cefr, number>>;
  return (
    <div>
      <H1 eyebrow={`${cfg.name} pathway`} sub="Your lessons start at your level. Finish most of them and the next level opens up.">Your path</H1>
      <Card className="mb-6 overflow-hidden !p-0">
        <div className={cx(state.pathLevel[0] === 'A' ? 'lv-a' : state.pathLevel[0] === 'B' ? 'lv-b' : 'lv-c', 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--lv)_14%,transparent),transparent_65%)] p-5 sm:p-6')}>
          <div className="flex items-start gap-4"><LevelBadge level={state.pathLevel} size="lg" solid className="!h-14 !min-w-16 !text-2xl" /><div className="min-w-0 flex-1"><p className="eyebrow">You are training at</p><p className="text-2xl font-extrabold leading-tight tracking-tight">{LEVEL_NAME[state.pathLevel]}</p><p className="mt-1 text-sm text-muted">{LEVEL_CAN[state.pathLevel]}</p></div><Btn size="sm" variant="ghost" onClick={() => setPick(true)}>Change level</Btn></div>
          <p className="mt-4 text-sm text-muted"><b className="text-ink">{next.title}.</b> {next.body}</p><Link to={next.to}><Btn className="mt-4">{next.cta}<Icon name="arrow" size={17} /></Btn></Link>
          {lp.total > 0 && <><Progress value={lp.ratio} className="mt-5" label="Level progress" /><p className="mt-1.5 text-xs text-muted">{lp.passed} of {lp.total} {state.pathLevel} lessons passed. At {Math.round(LEVEL_UP_AT * 100)}% you move up to the next level automatically.</p></>}
        </div>
        <div className="border-t border-line px-5 py-4 sm:px-6"><LevelLadder level={state.pathLevel} done={ladder} compact /></div>
      </Card>
      <LevelPicker open={pick} onClose={() => setPick(false)} current={state.pathLevel} language={cfg.name} onChoose={(l) => store.chooseLevel(state.code, l)} />
      <div className="space-y-4">{levels.map((lvl) => {
        const here = lvl === state.pathLevel;
        const body = KINDS.map(([k, label, to]) => {
          const list = listOf(k).filter((x) => x.level === lvl); if (!list.length) return null;
          const passed = list.filter((x) => (state.lessons[LIB_KEY[k](x.id)]?.best ?? 0) >= PASS).length;
          return <Link key={k} to={to} className="block rounded-xl px-2 py-1.5 transition hover:bg-surface2/70"><div className="flex items-center justify-between text-sm"><span className="font-medium">{label}</span><span className="tabular text-xs font-semibold text-muted">{passed}/{list.length}</span></div><Progress value={passed / list.length} className="mt-1.5" label={label} /></Link>;
        });
        return here ? (
          <Card key={lvl}><div className="mb-4 flex items-center gap-2.5"><LevelBadge level={lvl} solid /><h2 className="text-lg font-extrabold tracking-tight">{LEVEL_NAME[lvl]}</h2><Chip tone="accent">You are here</Chip></div><div className="space-y-2.5">{body}</div></Card>
        ) : (
          <details key={lvl} className="group card !p-0"><summary className="flex min-h-14 cursor-pointer items-center gap-3 px-4 py-3 sm:px-5"><LevelBadge level={lvl} /><span className="font-bold tracking-tight">{LEVEL_NAME[lvl]}</span>{(ladder[lvl] ?? 0) >= 1 && <Chip tone="good"><Icon name="check" size={12} strokeWidth={3} />Done</Chip>}<Icon name="down" size={16} className="ml-auto text-faint transition-transform group-open:rotate-180" /></summary><div className="space-y-2.5 border-t border-line p-4 sm:px-5">{body}<button onClick={() => store.chooseLevel(state.code, lvl)} className="mt-2 text-sm font-bold text-accent-strong hover:underline">Train at {lvl}</button></div></details>
        );
      })}</div>
    </div>
  );
}
