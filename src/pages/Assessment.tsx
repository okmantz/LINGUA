// Final assessment after the 30-day programme: mixed-skill, scored per skill, honest about what it shows.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCtx } from '../state/hooks';
import { resolveProgram } from '../core/curriculum';
import { makeExercise } from '../core/exercises';
import { shuffle } from '../core/text';
import { PROGRAM_LENGTH } from '../core/program';
import type { Exercise, Skill } from '../core/types';
import { ExerciseView, type ExResult } from '../components/ExerciseView';
import { Icon } from '../components/Icon';
import { Btn, Card, H1, Note, Progress, cx } from '../components/ui';

export default function Assessment() {
  const { store, state, content, cfg, ui, rnd, rate } = useCtx(); const [run, setRun] = useState(0); const [started, setStarted] = useState(false);
  const [i, setI] = useState(0); const [res, setRes] = useState<{ skill: Skill; ok: boolean }[]>([]); const [done, setDone] = useState(false);
  const set = useMemo(() => {
    const prog = resolveProgram(content); const seen = new Set(store.cards.filter((c) => c.reps > 0).map((c) => c.itemId));
    const words = shuffle(content.vocab.filter((v) => seen.has(v.id) || prog.some((d) => d.words.includes(v))), rnd).slice(0, 8);
    const out: { ex: Exercise; skill: Skill; speak?: string; passage?: string[] }[] = [];
    words.forEach((w, k) => { const ce = makeExercise(w, k % 2 ? 'produce' : 'rev', content.vocab, rnd); out.push({ ex: ce.ex, skill: 'vocabulary', speak: ce.speak }); });
    shuffle(prog.flatMap((d) => d.grammar).flatMap((g) => g.exercises), rnd).slice(0, 6).forEach((ex) => out.push({ ex, skill: 'grammar' }));
    // A reading question is meaningless without its text, so each one carries the passage it is about.
    shuffle(content.reading.filter((r) => r.level === 'A1' || r.level === 'A2'), rnd).slice(0, 3).forEach((r) => out.push({ ex: shuffle(r.questions, rnd)[0], skill: 'reading', passage: r.paragraphs }));
    shuffle(content.listening.filter((r) => r.level === 'A1' || r.level === 'A2'), rnd).slice(0, 3).forEach((l) => out.push({ ex: l.questions[0], skill: 'listening', speak: l.lines.map((x) => x.t).join(' ') }));
    return out; // eslint-disable-next-line
  }, [content, run]);
  const finished = state.programDay > PROGRAM_LENGTH;
  if (!started) return (
    <div><H1 eyebrow="Check-up" sub="A mixed check of vocabulary, grammar, reading and listening from the programme.">Final assessment</H1>
      <Card>{state.finalAssessment && <p className="mb-4 rounded-xl bg-surface2 px-3.5 py-2.5">Last result: <b>{Math.round(state.finalAssessment.score * 100)}%</b> — {state.finalAssessment.passed ? 'passed' : 'not passed'} ({new Date(state.finalAssessment.at).toLocaleDateString()}).</p>}
        {!finished && <Note tone="warn">You haven't finished all {PROGRAM_LENGTH} programme days yet. You can still try it, but it covers later material.</Note>}
        <p className="my-3 text-sm text-muted">{set.length} questions, about 8 minutes. Pass mark: 70%. It's low-stakes: you can retake it after reviewing.</p>
        <Btn size="lg" onClick={() => setStarted(true)}>Start assessment<Icon name="arrow" size={18} /></Btn></Card></div>
  );
  if (done) {
    const by = (s: Skill) => { const r = res.filter((x) => x.skill === s); return r.length ? r.filter((x) => x.ok).length / r.length : null; };
    const score = res.filter((x) => x.ok).length / res.length; const pass = score >= 0.7;
    return (
      <Card className="pop mx-auto max-w-xl py-7"><div className={cx('celebrate mx-auto grid h-20 w-20 place-items-center rounded-full', pass ? 'bg-good/14 text-good' : 'bg-warn/14 text-warn')}><Icon name={pass ? 'trophy' : 'repeat'} size={38} /></div>
        <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight">{pass ? 'Passed' : 'Not quite yet'} <span className="text-muted">·</span> <span className="tabular">{Math.round(score * 100)}%</span></h1>
        <div className="mt-5 grid grid-cols-2 gap-2.5 text-sm">{(['vocabulary', 'grammar', 'reading', 'listening'] as Skill[]).map((s) => <div key={s} className="rounded-2xl bg-surface2 p-3.5"><p className="text-xs font-semibold capitalize text-muted">{s}</p><p className="tabular mt-0.5 text-2xl font-extrabold tracking-tight">{by(s) === null ? '—' : `${Math.round((by(s) as number) * 100)}%`}</p></div>)}</div>
        <p className="mt-4 text-sm text-muted">{pass ? 'Your beginner foundation is solid. The pathway now continues at A2 and above, driven by your weakest skills.' : 'Review your weakest skill for a few days (your daily sessions will do that automatically), then retake.'}</p>
        <div className="mt-4"><Note>This shows you can handle the programme's beginner material. It does not make you fluent, and it is not an official CEFR certificate.</Note></div>
        <div className="mt-4 flex gap-2"><Link to="/"><Btn>Dashboard</Btn></Link><Btn variant="ghost" onClick={() => { setRun((r) => r + 1); setStarted(false); setI(0); setRes([]); setDone(false); }}>Retake</Btn></div></Card>
    );
  }
  const cur = set[i];
  const onDone = (r: ExResult) => {
    const nr = [...res, { skill: cur.skill, ok: r.correct }]; setRes(nr);
    store.logEvent({ type: 'assessment', skill: cur.skill, correct: r.correct, ms: r.ms });
    if (i + 1 >= set.length) { const score = nr.filter((x) => x.ok).length / nr.length; store.patchLang(state.code, (s) => ({ ...s, finalAssessment: { at: Date.now(), score, passed: score >= 0.7, cefr: 'A1' }, xp: s.xp + (score >= 0.7 ? 30 : 10) })); setDone(true); setTimeout(store.evaluate, 80); } else setI(i + 1);
  };
  return <div><div className="mx-auto mb-6 flex max-w-2xl items-center gap-3"><Progress value={i / set.length} className="flex-1" label="Assessment progress" /><span className="tabular text-xs font-bold text-muted">{i + 1}/{set.length}</span></div>{cur.passage && <Card className="mx-auto mb-5 max-w-2xl">{cur.passage.map((p, k) => <p key={k} className="mb-2 last:mb-0">{p}</p>)}</Card>}<ExerciseView key={i} ex={cur.ex} cfg={cfg} ui={ui} speakText={cur.speak} autoSpeak={cur.skill === 'listening'} rate={rate} onDone={onDone} /></div>;
}
