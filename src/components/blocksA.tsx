// Learning blocks: review, new words, grammar, reading, listening. Each reports a 0..1 score via onDone.
import { useMemo, useRef, useState } from 'react';
import type { Exercise, VocabEntry } from '../core/types';
import { makeExercise, pickMode, type CardExercise } from '../core/exercises';
import { speak, hasTTS, hasVoiceFor, stopSpeaking } from '../core/speech';
import { ExerciseView, gradeFor, type ExResult } from './ExerciseView';
import { Btn, Card, Chip, Note, Progress, Speak } from './ui';
import { Rich, Table } from './Rich';
import { useCtx, useStudyClock } from '../state/hooks';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ReviewBlock({ ids, onDone }: { ids: string[]; onDone: (score: number) => void }) {
  const { store, cfg, content, ui, rate, rnd, flags } = useCtx(); const stop = useStudyClock();
  const [queue, setQueue] = useState<CardExercise[]>(() => ids.map((id) => content.vocab.find((v) => v.id === id)).filter(Boolean).map((v) => makeExercise(v as VocabEntry, pickMode(store.cardMap.get(`${cfg.code}:${v!.id}`), rnd, hasTTS() && hasVoiceFor(cfg.tts)), content.vocab, rnd)));
  const [i, setI] = useState(0); const [first, setFirst] = useState<Record<string, boolean>>({});
  const total = ids.length;
  const cur = queue[i];
  if (!cur) { const sc = Object.values(first).length ? Object.values(first).filter(Boolean).length / Object.values(first).length : 1; return <Finish title="Review complete" score={sc} detail={`${Object.values(first).filter(Boolean).length} of ${Object.values(first).length} recalled first time`} onDone={() => { stop(); onDone(sc); }} />; }
  const done = (r: ExResult) => {
    const grade = gradeFor(r, cur.mode); store.reviewCard(cur.entry.id, { grade, correct: r.correct, mode: cur.mode, ms: r.ms });
    if (first[cur.entry.id] === undefined) setFirst((f) => ({ ...f, [cur.entry.id]: r.correct }));
    if (!r.correct && queue.filter((q) => q.entry.id === cur.entry.id).length < 2) setQueue((q) => [...q, makeExercise(cur.entry, 'recog', content.vocab, rnd)]);
    setI((x) => x + 1);
  };
  return (
    <div>
      <Progress value={i / Math.max(total, queue.length)} className="mb-5" label="Block progress" />
      <ExerciseView key={i} ex={cur.ex} cfg={cfg} ui={ui} speakText={cur.speak} autoSpeak={cur.mode === 'listen' || cur.mode === 'dictate'} rate={rate} onDone={done} immersive={flags.hideHints}
        answerLabel={`${cur.entry.t} = ${cur.entry.n}${cur.entry.note ? ' · ' + cur.entry.note : ''}`} />
    </div>
  );
}

export function WordCard({ e, rate, showRoman = true }: { e: VocabEntry; rate: number; showRoman?: boolean }) {
  const { cfg } = useCtx();
  return (
    <Card className="text-center">
      <div className="flex items-center justify-center gap-3"><h2 className="text-3xl font-bold sm:text-4xl">{e.t}</h2>{hasTTS() && <Speak onClick={() => void speak(e.t, cfg.tts, rate)} />}</div>
      {showRoman && <p className="mt-1 text-muted">{cfg.romanLabel ? <><span className="text-xs uppercase tracking-wide">{cfg.romanLabel}</span> <b className="font-semibold text-ink">{e.pron}</b></> : <>/{e.pron}/</>} · {e.pos}{e.gender ? `.${e.gender}` : ''}</p>}
      <p className="mt-3 text-xl">{e.n}</p>
      <div className="mt-4 rounded-xl bg-surface2 p-3 text-left"><p>{e.ex}</p><p className="text-sm text-muted">{e.exn}</p></div>
      {e.note && <p className="mt-3 text-sm text-muted">{e.note}</p>}
    </Card>
  );
}

export function NewVocabBlock({ ids, onDone }: { ids: string[]; onDone: (score: number) => void }) {
  const { store, cfg, content, ui, rate, rnd, flags } = useCtx(); const stop = useStudyClock();
  const words = useMemo(() => ids.map((id) => content.vocab.find((v) => v.id === id)!).filter(Boolean), [ids, content]);
  const [phase, setPhase] = useState<'learn' | 'test'>('learn'); const [i, setI] = useState(0);
  const [tests, setTests] = useState<CardExercise[]>([]); const [first, setFirst] = useState<Record<string, boolean>>({}); const [t, setT] = useState(0);
  const begin = () => { setTests(words.map((w) => makeExercise(w, 'recog', content.vocab, rnd))); setPhase('test'); };
  if (phase === 'learn') {
    const w = words[i];
    return (
      <div>
        <Progress value={i / words.length} className="mb-4" label="Words introduced" />
        <p className="mb-2 text-sm text-muted">New word {i + 1} of {words.length}. Say it aloud, then continue — you'll be tested on it straight away.</p>
        <WordCard e={w} rate={rate} showRoman={!flags.hideRoman && (store.profile?.settings.showRomanization ?? true)} />
        <div className="mt-4 flex gap-2">{i > 0 && <Btn variant="ghost" onClick={() => setI(i - 1)}>Back</Btn>}<Btn className="flex-1" onClick={() => (i + 1 < words.length ? setI(i + 1) : begin())}>{i + 1 < words.length ? 'Next word' : 'Start the quick test'}</Btn></div>
      </div>
    );
  }
  const cur = tests[t];
  if (!cur) { const vals = Object.values(first); const sc = vals.length ? vals.filter(Boolean).length / vals.length : 1; return <Finish title="Words introduced" score={sc} detail="They'll come back for review on a spaced schedule — that's what makes them stick." onDone={() => { stop(); onDone(sc); }} />; }
  const done = (r: ExResult) => {
    store.reviewCard(cur.entry.id, { grade: gradeFor(r, 'recog') === 1 ? 1 : 3, correct: r.correct, mode: 'recog', ms: r.ms });
    if (first[cur.entry.id] === undefined) setFirst((f) => ({ ...f, [cur.entry.id]: r.correct }));
    if (!r.correct) setTests((q) => [...q, makeExercise(cur.entry, 'recog', content.vocab, rnd)]);
    setT((x) => x + 1);
  };
  return (<div><Progress value={t / tests.length} className="mb-5" label="Test progress" /><ExerciseView key={t} ex={cur.ex} cfg={cfg} ui={ui} speakText={cur.speak} rate={rate} onDone={done} answerLabel={`${cur.entry.t} = ${cur.entry.n}`} /></div>);
}

export function Finish({ title, score, detail, onDone, cta = 'Continue' }: { title: string; score: number; detail?: string; onDone: () => void; cta?: string }) {
  return (
    <Card className="pop text-center">
      <div className="text-4xl" aria-hidden>{score >= 0.8 ? '🎉' : score >= 0.5 ? '👍' : '🌱'}</div>
      <h2 className="mt-2 text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-lg">{Math.round(score * 100)}%</p>
      {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
      <Btn size="lg" className="mt-5" onClick={onDone}>{cta}</Btn>
    </Card>
  );
}

/** Runs a list of exercises in order, logging each result as an event for `skill`. */
export function ExerciseSeries({ exercises, skill, itemId, onFinish, header }: { exercises: Exercise[]; skill: 'grammar' | 'reading' | 'listening'; itemId: string; onFinish: (score: number) => void; header?: React.ReactNode }) {
  const { store, cfg, ui, rate, flags } = useCtx();
  const [i, setI] = useState(0); const [ok, setOk] = useState(0);
  const done = (r: ExResult) => { store.logEvent({ type: 'exercise', skill, itemId, correct: r.correct, ms: r.ms }); const n = ok + (r.correct ? 1 : 0); setOk(n); if (i + 1 >= exercises.length) onFinish(n / exercises.length); else setI(i + 1); };
  return (<div>{header}<Progress value={i / exercises.length} className="mb-5" label="Questions" /><ExerciseView key={i} ex={exercises[i]} cfg={cfg} ui={ui} rate={rate} onDone={done} immersive={flags.hideHints} /></div>);
}

export function GrammarBlock({ id, onDone }: { id: string; onDone: (score: number) => void }) {
  const { content, cfg, rate } = useCtx(); const stop = useStudyClock();
  const g = content.grammar.find((x) => x.id === id)!;
  const [phase, setPhase] = useState<'learn' | 'practice' | 'result'>('learn'); const [score, setScore] = useState(0); const [round, setRound] = useState(0);
  if (!g) return <Note tone="warn">Lesson not found.</Note>;
  if (phase === 'learn') return (
    <div className="space-y-4">
      <Card>
        <div className="mb-2 flex flex-wrap items-center gap-2"><Chip tone="accent">{g.level}</Chip><Chip>Grammar</Chip></div>
        <h2 className="text-2xl font-bold">{g.title}</h2><p className="mt-1 text-muted">{g.summary}</p>
        <div className="prose-l mt-4">{g.body.map((p, i) => <p key={i}><Rich text={p} /></p>)}</div>
        {g.table && <div className="mt-2"><Table rows={g.table.rows} caption={g.table.caption} /></div>}
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">See it in use</h3>
        <ul className="space-y-2">{g.examples.map(([t, n], i) => <li key={i} className="flex items-start gap-2">{hasTTS() && <Speak onClick={() => void speak(t.replace(/\*\*/g, ''), cfg.tts, rate)} />}<div><div><Rich text={t} /></div><div className="text-sm text-muted">{n}</div></div></li>)}</ul>
      </Card>
      <Card>
        <h3 className="mb-2 font-semibold">Common mistakes</h3>
        <ul className="list-disc space-y-1.5 pl-5 text-sm">{g.mistakes.map((m, i) => <li key={i}><Rich text={m} /></li>)}</ul>
      </Card>
      <Btn size="lg" className="w-full" onClick={() => setPhase('practice')}>Practise it ({g.exercises.length} questions)</Btn>
    </div>
  );
  if (phase === 'practice') return <ExerciseSeries key={round} exercises={g.exercises} skill="grammar" itemId={g.id} onFinish={(s) => { setScore(s); setPhase('result'); }} header={<p className="mb-3 text-sm text-muted">{g.title} — mastery check (pass mark 80%)</p>} />;
  const pass = score >= 0.8;
  return (
    <Card className="pop text-center">
      <div className="text-4xl" aria-hidden>{pass ? '✅' : '🔁'}</div>
      <h2 className="mt-2 text-2xl font-bold">{pass ? 'Mastery check passed' : 'Not yet — one more look'}</h2>
      <p className="mt-1 text-lg">{Math.round(score * 100)}%</p>
      <p className="mt-1 text-sm text-muted">{pass ? 'This pattern will be tested again in review so it stays.' : 'Re-read the pattern and try again. A score above 60% still lets you continue.'}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {!pass && <Btn variant="ghost" onClick={() => setPhase('learn')}>Re-read the lesson</Btn>}
        <Btn variant={pass ? 'primary' : 'soft'} onClick={() => { setRound((r) => r + 1); setPhase('practice'); }}>Try again</Btn>
        {(pass || score >= 0.6) && <Btn onClick={() => { stop(); onDone(score); }}>Continue</Btn>}
      </div>
    </Card>
  );
}

export function ReadingBlock({ id, onDone }: { id: string; onDone: (score: number) => void }) {
  const { content, flags, cfg, rate } = useCtx(); const stop = useStudyClock();
  const r = content.reading.find((x) => x.id === id)!;
  const [phase, setPhase] = useState<'read' | 'quiz' | 'after'>('read'); const [open, setOpen] = useState<Record<number, boolean>>({}); const [score, setScore] = useState(0);
  const showTr = (i: number) => flags.translations === 'always' || open[i] || (phase === 'after' && flags.translations !== 'never');
  const text = (
    <Card>
      <div className="mb-2 flex items-center gap-2"><Chip tone="accent">{r.level}</Chip><Chip>Reading</Chip></div>
      <h2 className="mb-3 text-xl font-bold">{r.title}</h2>
      {r.paragraphs.map((p, i) => (
        <div key={i} className="mb-3">
          <p className="flex items-start gap-2 text-lg leading-relaxed">{hasTTS() && phase !== 'quiz' && <Speak onClick={() => void speak(p, cfg.tts, rate)} />}<span>{p}</span></p>
          {flags.translations !== 'never' && flags.translations !== 'after' && <button className="mt-1 text-sm text-muted underline" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>{showTr(i) ? 'Hide translation' : 'Show translation'}</button>}
          {showTr(i) && <p className="mt-1 text-sm text-muted">{r.translation[i]}</p>}
        </div>
      ))}
      {phase !== 'quiz' && r.glossary.length > 0 && flags.translations !== 'never' && <div className="mt-3 flex flex-wrap gap-2">{r.glossary.map(([a, b]) => <Chip key={a}>{a} = {b}</Chip>)}</div>}
    </Card>
  );
  if (phase === 'read') return <div className="space-y-4">{text}<Btn size="lg" className="w-full" onClick={() => setPhase('quiz')}>I've read it — questions</Btn></div>;
  if (phase === 'quiz') return <ExerciseSeries exercises={r.questions} skill="reading" itemId={r.id} onFinish={(s) => { setScore(s); setPhase('after'); }} header={<details className="mb-4 rounded-xl border border-line p-3"><summary className="cursor-pointer text-sm text-muted">Look at the text again</summary><div className="mt-2">{r.paragraphs.map((p, i) => <p key={i} className="mb-2">{p}</p>)}</div></details>} />;
  return <div className="space-y-4">{text}<Finish title="Reading complete" score={score} onDone={() => { stop(); onDone(score); }} /></div>;
}

export function ListeningBlock({ id, onDone }: { id: string; onDone: (score: number) => void }) {
  const { content, flags, cfg, rate, store } = useCtx(); const stop = useStudyClock();
  const l = content.listening.find((x) => x.id === id)!;
  const audio = hasTTS() && hasVoiceFor(cfg.tts);
  const [phase, setPhase] = useState<'listen' | 'quiz' | 'after'>('listen'); const [score, setScore] = useState(0); const [slow, setSlow] = useState(false); const [playing, setPlaying] = useState(false); const [plays, setPlays] = useState(0);
  const [showT, setShowT] = useState(!audio); const cancel = useRef(false);
  const play = async () => { if (playing) { cancel.current = true; stopSpeaking(); setPlaying(false); return; } cancel.current = false; setPlaying(true); setPlays((p) => p + 1); for (const ln of l.lines) { if (cancel.current) break; await speak(ln.t, cfg.tts, slow ? Math.min(rate, 0.7) : rate); await sleep(280); } setPlaying(false); };
  const transcript = (
    <ul className="space-y-1.5">{l.lines.map((ln, i) => <li key={i}><b>{ln.spk}:</b> {ln.t}{(flags.translations === 'always' || phase === 'after') && flags.translations !== 'never' && <span className="block text-sm text-muted">{ln.n}</span>}</li>)}</ul>
  );
  if (phase === 'listen') return (
    <div className="space-y-4">
      <Card>
        <div className="mb-2 flex items-center gap-2"><Chip tone="accent">{l.level}</Chip><Chip>Listening</Chip></div>
        <h2 className="text-xl font-bold">{l.title}</h2>
        {audio ? <p className="mt-1 text-sm text-muted">Listen first without reading. Replay as often as you like — the questions come next.</p> : <Note tone="warn">This browser has no {cfg.name} voice installed, so there is no audio. You can read the transcript, but that is reading practice, not listening — it will be logged as reading.</Note>}
        {audio && <div className="mt-4 flex flex-wrap items-center gap-3"><Btn size="lg" onClick={() => void play()}>{playing ? '⏹ Stop' : plays ? '🔊 Play again' : '🔊 Play dialogue'}</Btn><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> Slower</label></div>}
        <p className="mt-3 text-xs text-muted">Audio is your browser's text-to-speech voice (synthetic, not a native speaker).</p>
        {(showT || flags.translations === 'always') ? <div className="mt-4 rounded-xl bg-surface2 p-3">{transcript}</div> : audio && <button className="mt-3 text-sm underline text-muted" onClick={() => setShowT(true)}>Show transcript (makes it easier)</button>}
      </Card>
      <Btn size="lg" className="w-full" onClick={() => { cancel.current = true; stopSpeaking(); setPlaying(false); setPhase('quiz'); }}>Answer the questions</Btn>
    </div>
  );
  if (phase === 'quiz') return <ExerciseSeries exercises={l.questions} skill={audio ? 'listening' : 'reading'} itemId={l.id} onFinish={(s) => { setScore(s); setPhase('after'); }} header={audio ? <div className="mb-4"><Btn size="sm" variant="ghost" onClick={() => void play()}>{playing ? '⏹ Stop' : '🔊 Replay'}</Btn></div> : undefined} />;
  void store;
  return <div className="space-y-4"><Card><h3 className="mb-2 font-semibold">Transcript</h3>{transcript}</Card><Finish title="Listening complete" score={score} detail={audio ? undefined : 'Counted as reading practice — no audio was available.'} onDone={() => { stop(); onDone(score); }} /></div>;
}
