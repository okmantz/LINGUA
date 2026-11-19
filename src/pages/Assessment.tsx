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
import { Btn, Card, H1, Note, Progress } from '../components/ui';

export default function Assessment() {
  const { store, state, content, cfg, ui, rnd, rate } = useCtx(); const [run, setRun] = useState(0); const [started, setStarted] = useState(false);
  const [i, setI] = useState(0); const [res, setRes] = useState<{ skill: Skill; ok: boolean }[]>([]); const [done, setDone] = useState(false);
  const set = useMemo(() => {
    const prog = resolveProgram(content); const seen = new Set(store.cards.filter((c) => c.reps > 0).map((c) => c.itemId));
    const words = shuffle(content.vocab.filter((v) => seen.has(v.id) || prog.some((d) => d.words.includes(v))), rnd).slice(0, 8);
    const out: { ex: Exercise; skill: Skill; speak?: string }[] = [];
    words.forEach((w, k) => { const ce = makeExercise(w, k % 2 ? 'produce' : 'rev', content.vocab, rnd); out.push({ ex: ce.ex, skill: 'vocabulary', speak: ce.speak }); });
    shuffle(prog.flatMap((d) => d.grammar).flatMap((g) => g.exercises), rnd).slice(0, 6).forEach((ex) => out.push({ ex, skill: 'grammar' }));
    shuffle(content.reading.filter((r) => r.level === 'A1' || r.level === 'A2').flatMap((r) => r.questions), rnd).slice(0, 3).forEach((ex) => out.push({ ex, skill: 'reading' }));
    shuffle(content.listening.filter((r) => r.level === 'A1' || r.level === 'A2'), rnd).slice(0, 3).forEach((l) => out.push({ ex: l.questions[0], skill: 'listening', speak: l.lines.map((x) => x.t).join(' ') }));
    return out; // eslint-disable-next-line
  }, [content, run]);
  const finished = state.programDay > PROGRAM_LENGTH;
  if (!started) return (
    <div><H1 sub="A mixed check of vocabulary, grammar, reading and listening from the programme.">Final assessment</H1>
      <Card>{state.finalAssessment && <p className="mb-3">Last result: <b>{Math.round(state.finalAssessment.score * 100)}%</b> — {state.finalAssessment.passed ? 'passed' : 'not passed'} ({new Date(state.finalAssessment.at).toLocaleDateString()}).</p>}
        {!finished && <Note tone="warn">You haven't finished all {PROGRAM_LENGTH} programme days yet. You can still try it, but it covers later material.</Note>}
        <p className="my-3 text-sm text-muted">{set.length} questions, about 8 minutes. Pass mark: 70%. It's low-stakes: you can retake it after reviewing.</p>
        <Btn size="lg" onClick={() => setStarted(true)}>Start</Btn></Card></div>
  );
  if (done) {
    const by = (s: Skill) => { const r = res.filter((x) => x.skill === s); return r.length ? r.filter((x) => x.ok).length / r.length : null; };
    const score = res.filter((x) => x.ok).length / res.length; const pass = score >= 0.7;
    return (
      <Card className="pop"><h1 className="text-2xl font-bold">{pass ? 'Passed 🎉' : 'Not quite yet'} — {Math.round(score * 100)}%</h1>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">{(['vocabulary', 'grammar', 'reading', 'listening'] as Skill[]).map((s) => <div key={s} className="rounded-xl bg-surface2 p-3"><p className="capitalize text-muted">{s}</p><p className="text-xl font-semibold">{by(s) === null ? '—' : `${Math.round((by(s) as number) * 100)}%`}</p></div>)}</div>
        <p className="mt-3 text-sm text-muted">{pass ? 'Your beginner foundation is solid. The pathway now continues at A2 and above, driven by your weakest skills.' : 'Review your weakest skill for a few days (your daily sessions will do that automatically), then retake.'}</p>
        <Note>This shows you can handle the programme's beginner material. It does not make you fluent, and it is not an official CEFR certificate.</Note>
        <div className="mt-4 flex gap-2"><Link to="/"><Btn>Dashboard</Btn></Link><Btn variant="ghost" onClick={() => { setRun((r) => r + 1); setStarted(false); setI(0); setRes([]); setDone(false); }}>Retake</Btn></div></Card>
    );
  }
  const cur = set[i];
  const onDone = (r: ExResult) => {
    const nr = [...res, { skill: cur.skill, ok: r.correct }]; setRes(nr);
    store.logEvent({ type: 'assessment', skill: cur.skill, correct: r.correct, ms: r.ms });
    if (i + 1 >= set.length) { const score = nr.filter((x) => x.ok).length / nr.length; store.patchLang(state.code, (s) => ({ ...s, finalAssessment: { at: Date.now(), score, passed: score >= 0.7, cefr: 'A1' }, xp: s.xp + (score >= 0.7 ? 30 : 10) })); setDone(true); setTimeout(store.evaluate, 80); } else setI(i + 1);
  };
  return <div><Progress value={i / set.length} className="mb-5" label="Assessment progress" /><ExerciseView key={i} ex={cur.ex} cfg={cfg} ui={ui} speakText={cur.speak} autoSpeak={cur.skill === 'listening'} rate={rate} onDone={onDone} /></div>;
}
