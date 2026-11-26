// Conversation, pronunciation and writing blocks. Checks here are keyword/checklist/recognition based — labelled as such in the UI.
import { SignFigure } from './SignFigure';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fold, sentenceSimilarity, shuffle, countWords } from '../core/text';
import { speak, hasTTS, hasRecognition, hasRecorder, listenOnce, startRecording } from '../core/speech';
import { Btn, Card, Chip, Note, Progress, Speak, cx } from './ui';
import { Finish } from './blocksA';
import { useCtx, useStudyClock } from '../state/hooks';
import { Icon } from './Icon';
import { TeacherAvatar } from './Avatar';

export type ConvMode = 'guided' | 'semi' | 'open';
const hit = (text: string, alts: string[]) => { const f = fold(text); return alts.some((a) => f.includes(fold(a))); };

export function ConversationBlock({ id, mode, onDone }: { id: string; mode: ConvMode; onDone: (score: number) => void }) {
  const { content, store, cfg, rate, flags, ui, rnd } = useCtx(); const stop = useStudyClock();
  const conv = content.conversations.find((c) => c.id === id)!;
  const [i, setI] = useState(0); const [log, setLog] = useState<{ who: 'npc' | 'me'; t: string; n?: string; ok?: boolean }[]>([]);
  const [scores, setScores] = useState<number[]>([]); const [stepDone, setStepDone] = useState(false); const [text, setText] = useState('');
  const [picked, setPicked] = useState<number | null>(null); const [feedback, setFeedback] = useState<string>('');
  const step = conv.steps[i]; const bottom = useRef<HTMLDivElement>(null);
  const opts = useMemo(() => (step ? shuffle(step.options, rnd) : []), [step, rnd]);
  const sayNpc = (t: string) => { if (hasTTS()) void speak(t, cfg.tts, rate); };
  useEffect(() => { if (step) { setLog((l) => [...l, { who: 'npc', t: step.npc.t, n: step.npc.n }]); sayNpc(step.npc.t); } /* eslint-disable-next-line */ }, [i]);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [log, stepDone]);
  const showN = flags.translations === 'always';

  const finishConv = (all: number[]) => {
    const sc = all.reduce((a, b) => a + b, 0) / all.length;
    store.logEvent({ type: 'conversation', skill: 'conversation', itemId: conv.id, score: sc, meta: mode });
    return sc;
  };
  const advance = (s: number) => { const all = [...scores, s]; setScores(all); setStepDone(false); setText(''); setPicked(null); setFeedback(''); if (i + 1 >= conv.steps.length) { setI(i + 1); finishConv(all); } else setI(i + 1); };

  if (!step) { const sc = scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length); return <Finish title="Conversation complete" score={sc} detail={mode === 'guided' ? 'Next time, try Semi-open or Open mode to produce the sentences yourself.' : 'Checked by keywords — compare with the model replies above.'} onDone={() => { stop(); onDone(sc); }} />; }

  const chooseOpt = (k: number) => { const o = opts[k]; setPicked(k); setStepDone(true); setLog((l) => [...l, { who: 'me', t: o.t, n: o.n, ok: o.good }]); setFeedback(o.good ? ui.well : o.why ?? ui.wrong); store.logEvent({ type: 'exercise', skill: 'conversation', itemId: conv.id, correct: o.good }); };
  const submitText = () => {
    if (!text.trim()) return; const groups = step.keywords; const got = groups.filter((g) => hit(text, g)).length; const sc = groups.length ? got / groups.length : 0;
    setStepDone(true); setLog((l) => [...l, { who: 'me', t: text, ok: sc >= 0.5 }]); setScores((s) => s); setFeedback(sc >= 0.99 ? `${ui.correct} You covered every key point.` : sc >= 0.5 ? 'Good — you covered most key points.' : 'Missing key words — compare with the model reply.');
    store.logEvent({ type: 'exercise', skill: 'conversation', itemId: conv.id, correct: sc >= 0.5 }); setPicked(Math.round(sc * 100));
  };
  const hints = step.keywords.map((g) => g[0]);
  return (
    <div>
      <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center gap-2"><Chip tone="accent">{conv.level}</Chip><Chip>{mode === 'guided' ? 'Guided' : mode === 'semi' ? 'Semi-open' : 'Open'}</Chip><span className="text-sm text-muted">{conv.scenario}</span></div>
      <div className="mb-5 flex items-center gap-3"><Progress value={i / conv.steps.length} className="flex-1" label="Conversation progress" /><span className="tabular text-xs font-bold text-muted">{Math.min(i + 1, conv.steps.length)}/{conv.steps.length}</span></div>
      <div className="mb-5 space-y-3" aria-live="polite">
        {log.map((m, k) => (
          <div key={k} className={cx('flex items-end gap-2.5', m.who === 'me' ? 'justify-end' : 'justify-start')}>
            {m.who === 'npc' && <TeacherAvatar size={32} className="mb-0.5 rounded-full" />}
            <div className={cx('max-w-[82%] rounded-2xl px-4 py-2.5 text-[1.02rem] leading-snug shadow-[var(--shadow-xs)]', m.who === 'me' ? cx('rounded-br-md', m.ok === false ? 'bg-bad/15' : 'bg-accent text-accent-ink') : 'rounded-bl-md border border-line bg-surface')}>
              <p>{m.t}</p>{(showN || (flags.translations === 'tap' && false)) && m.n && <p className={cx('mt-0.5 text-xs', m.who === 'me' && m.ok !== false ? 'opacity-75' : 'text-muted')}>{m.n}</p>}
            </div>
          </div>
        ))}
        <div ref={bottom} />
      </div>
      {!stepDone && mode === 'guided' && <div className="grid gap-2.5">{opts.map((o, k) => <button key={k} onClick={() => chooseOpt(k)} className="rounded-2xl border-2 border-line bg-surface px-4 py-3.5 text-left font-medium transition hover:border-accent hover:bg-accent/[.06] active:scale-[.99]"><span>{o.t}</span>{flags.translations !== 'never' && flags.translations !== 'after' && <span className="block text-xs text-muted">{o.n}</span>}</button>)}</div>}
      {!stepDone && mode !== 'guided' && (
        <div>
          {mode === 'semi' && <p className="mb-2.5 flex flex-wrap items-center gap-1.5 text-sm text-muted"><Icon name="bulb" size={15} className="text-warn" />Useful words: {hints.map((h) => <Chip key={h} tone="accent">{h}</Chip>)}</p>}
          <div className="flex gap-2"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitText()} placeholder="Type your reply…" autoCapitalize="off" spellCheck={false} aria-label="Your reply" className="h-12 min-w-0 flex-1 rounded-2xl border-2 border-line-strong bg-surface px-4 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" /><Btn className="h-12 !rounded-2xl" onClick={submitText}>Send<Icon name="arrow" size={16} /></Btn></div>
          {cfg.accents.length > 0 && <div className="mt-2.5 flex flex-wrap gap-1.5">{cfg.accents.map((a) => <button key={a} className="h-9 min-w-9 rounded-xl border border-line-strong bg-surface px-2 font-medium transition hover:bg-surface2 active:scale-95" onClick={() => setText((t) => t + a)}>{a}</button>)}</div>}
          <p className="mt-3 text-xs text-muted">Checked against key words, not by AI — there are many correct ways to answer. Always compare with the model reply.</p>
        </div>
      )}
      {stepDone && (
        <div className={cx('pop sticky bottom-3 z-20 rounded-2xl border-2 p-4 shadow-[var(--shadow-lg)] backdrop-blur-md', mode === 'guided' ? (opts[picked ?? 0]?.good ? 'border-good/60 bg-good/[.12]' : 'border-bad/60 bg-bad/[.12]') : (picked ?? 0) >= 50 ? 'border-good/60 bg-good/[.12]' : 'border-bad/60 bg-bad/[.12]')}>
          <p className="font-extrabold tracking-tight">{feedback}</p>
          {(mode !== 'guided' || !opts[picked ?? 0]?.good) && <p className="mt-1 text-sm">Model reply: <b>{step.model.t}</b>{flags.translations !== 'never' && <span className="text-muted"> — {step.model.n}</span>}</p>}
          <Btn size="lg" className="mt-3 w-full" onClick={() => advance(mode === 'guided' ? (opts[picked ?? 0]?.good ? 1 : 0) : (picked ?? 0) / 100)}>{ui.next}<Icon name="arrow" size={18} /></Btn>
        </div>
      )}
      </div>
    </div>
  );
}

export function PronBlock({ id, onDone }: { id: string; onDone: (score: number) => void }) {
  const { content, cfg, rate, store } = useCtx(); const stop = useStudyClock();
  const p = content.pronunciation.find((x) => x.id === id)!;
  const [phase, setPhase] = useState<'learn' | 'pairs' | 'drill'>('learn'); const [d, setD] = useState(0);
  const [heard, setHeard] = useState<Record<number, { transcript: string; sim: number } | { error: string } | undefined>>({}); const [audioUrl, setAudioUrl] = useState<Record<number, string>>({});
  const [rec, setRec] = useState<{ stop: () => Promise<string> } | null>(null); const [busy, setBusy] = useState(false);
  const [pairI, setPairI] = useState(0); const [pairOk, setPairOk] = useState<boolean[]>([]); const [pairAns, setPairAns] = useState<number | null>(null);
  const pairPick = useMemo(() => p.minimalPairs.map(() => (Math.random() < 0.5 ? 0 : 1)), [p]);
  if (!p) return <Note tone="warn">Lesson not found.</Note>;
  if (cfg.sign) return (
    <div className="space-y-4">
      <Card><div className="mb-2 flex gap-2"><Chip tone="accent">{p.level}</Chip><Chip>Handshapes</Chip></div><h2 className="text-2xl font-bold">{p.title}</h2><p className="mt-2 text-muted">{p.intro}</p>
        <Note>These figures are schematic diagrams of a right-handed signer facing you (their dominant hand is on your left). Read the written description as well, and check new signs against a Deaf teacher or video.</Note></Card>
      <Card><div className="grid gap-4 sm:grid-cols-2">{p.sounds.map((s, i) => <div key={i} className="flex items-start gap-3 border-b border-line pb-3 last:border-0"><div className="shrink-0">{/^(fs|h|nm|num)=/.test(s.sym) ? <SignFigure spec={s.sym} size={120} /> : /^[A-Z0-9]$/.test(s.sym) ? <SignFigure spec={`fs=${s.sym}`} size={120} /> : null}</div><div><b>{/^(fs|h|nm|num)=/.test(s.sym) ? '' : s.sym}</b><p className="text-sm text-muted">{s.tip}</p>{s.examples.length > 0 && <p className="mt-1 text-sm">{s.examples.map((e) => e[0]).join(" · ")}</p>}</div></div>)}</div></Card>
      <Card><h3 className="mb-2 font-semibold">Common mistakes</h3><ul className="list-disc space-y-1 pl-5 text-sm">{p.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul></Card>
      <Finish title="Handshape lesson read" score={1} detail="Now practise these shapes with your own hands in front of a mirror." onDone={() => { stop(); onDone(1); }} />
    </div>
  );
  const say = (t: string) => { if (hasTTS()) void speak(t, cfg.tts, rate); };

  if (phase === 'learn') return (
    <div className="space-y-4">
      <Card><div className="mb-2 flex gap-2"><Chip tone="accent">{p.level}</Chip><Chip>Pronunciation</Chip></div><h2 className="text-2xl font-bold">{p.title}</h2><p className="mt-2 text-muted">{p.intro}</p>
        <Note>Example audio is your browser's synthetic voice, not a native speaker. Use it as a guide, and trust the written descriptions for how to shape the sound.</Note></Card>
      <Card><div className="space-y-3">{p.sounds.map((s, i) => <div key={i} className="border-b border-line pb-3 last:border-0 last:pb-0"><div className="flex items-baseline gap-2"><b className="text-lg">{s.sym}</b><span className="text-muted">{s.tip}</span></div><div className="mt-1 flex flex-wrap gap-2">{s.examples.map(([w, m]) => <button key={w} onClick={() => say(w)} className="inline-flex items-center gap-1.5 rounded-xl bg-surface2 px-3 py-1.5 text-sm font-semibold transition hover:bg-accent/15 active:scale-95"><Icon name="volume" size={15} className="text-accent-strong" />{w} <span className="font-normal text-muted">({m})</span></button>)}</div></div>)}</div></Card>
      <Card><h3 className="mb-2 font-semibold">Common mistakes</h3><ul className="list-disc space-y-1 pl-5 text-sm">{p.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul></Card>
      <Btn size="lg" className="w-full" onClick={() => setPhase(p.minimalPairs.length && hasTTS() ? 'pairs' : 'drill')}>{p.minimalPairs.length && hasTTS() ? 'Train your ear: minimal pairs' : 'Practise saying it'}</Btn>
    </div>
  );
  if (phase === 'pairs') {
    const pr = p.minimalPairs[pairI]; const target = pairPick[pairI];
    if (!pr) { const sc = pairOk.filter(Boolean).length / Math.max(1, pairOk.length); return <Finish title="Ear training done" score={sc} detail="Hearing the difference comes before producing it." cta="Practise saying it" onDone={() => setPhase('drill')} />; }
    return (
      <Card>
        <p className="text-sm text-muted">Pair {pairI + 1} of {p.minimalPairs.length} — {pr[2]}</p>
        <p className="my-3 text-lg">Which word do you hear?</p>
        <Btn variant="soft" onClick={() => say(pr[target])}><Icon name="volume" size={17} />Play</Btn>
        <div className="mt-4 grid grid-cols-2 gap-3">{[0, 1].map((k) => <button key={k} disabled={pairAns !== null} onClick={() => { setPairAns(k); store.logEvent({ type: 'exercise', skill: 'listening', itemId: p.id, correct: k === target }); }} className={cx('rounded-2xl border-2 px-4 py-5 text-xl font-bold transition', pairAns === null ? 'border-line hover:border-accent hover:bg-accent/[.06]' : k === target ? 'border-good bg-good/10' : pairAns === k ? 'border-bad bg-bad/10' : 'border-line opacity-60')}>{pr[k]}</button>)}</div>
        {pairAns !== null && <Btn className="mt-4" onClick={() => { setPairOk((o) => [...o, pairAns === target]); setPairAns(null); setPairI((x) => x + 1); }}>Next</Btn>}
      </Card>
    );
  }
  const drill = p.drills[d];
  if (!drill) { const sims = Object.values(heard).filter((h): h is { transcript: string; sim: number } => !!h && 'sim' in h).map((h) => h.sim); const sc = sims.length ? sims.reduce((a, b) => a + b, 0) / sims.length : 1; return <Finish title="Speaking practice done" score={sc} detail={sims.length ? 'Score = how closely the browser\'s speech recogniser matched your target sentences.' : 'No automatic scoring was available here, so this counts as completed practice only.'} onDone={() => { stop(); onDone(sc); }} />; }
  const startRec = async () => { try { setBusy(true); setRec(await startRecording()); } catch { setHeard((h) => ({ ...h, [d]: { error: 'Microphone unavailable or permission denied.' } })); } finally { setBusy(false); } };
  const stopRec = async () => { if (!rec) return; const url = await rec.stop(); setRec(null); setAudioUrl((a) => ({ ...a, [d]: url })); store.logEvent({ type: 'speaking', skill: 'speaking', itemId: p.id, meta: 'recorded' }); };
  const recognise = async () => {
    setBusy(true); const r = await listenOnce(cfg.tts); setBusy(false);
    if ('error' in r) { setHeard((h) => ({ ...h, [d]: { error: r.error } })); return; }
    const sim = sentenceSimilarity(drill, r.transcript); setHeard((h) => ({ ...h, [d]: { transcript: r.transcript, sim } }));
    store.logEvent({ type: 'speaking', skill: 'speaking', itemId: p.id, score: sim, meta: 'recognised' });
  };
  const h = heard[d];
  return (
    <Card>
      <Progress value={d / p.drills.length} className="mb-4" label="Drills" />
      <p className="text-sm text-muted">Sentence {d + 1} of {p.drills.length}</p>
      <div className="my-3 flex items-center gap-3"><p className="flex-1 text-2xl font-semibold">{drill}</p><Speak onClick={() => say(drill)} /></div>
      <div className="flex flex-wrap gap-2">
        {hasRecorder() && (rec ? <Btn variant="danger" onClick={() => void stopRec()}><Icon name="stop" size={16} />Stop recording</Btn> : <Btn variant="soft" disabled={busy} onClick={() => void startRec()}><Icon name="record" size={17} className="text-bad" />Record yourself</Btn>)}
        {hasRecognition() && <Btn variant="soft" disabled={busy || !!rec} onClick={() => void recognise()}><Icon name="mic" size={17} />{busy ? 'Listening…' : 'Check with speech recognition'}</Btn>}
      </div>
      {audioUrl[d] && <div className="mt-3"><p className="mb-1 text-sm text-muted">Play yours, then the voice above, and compare:</p><audio controls src={audioUrl[d]} className="w-full" /></div>}
      {h && ('error' in h ? <Note tone="warn">{h.error}</Note> : <div className="mt-3 rounded-xl bg-surface2 p-3"><p className="text-sm text-muted">Recogniser heard:</p><p className="text-lg">"{h.transcript}"</p><p className={cx('text-sm font-medium', h.sim >= 0.8 ? 'text-good' : h.sim >= 0.5 ? 'text-warn' : 'text-bad')}>{Math.round(h.sim * 100)}% match with the target</p></div>)}
      {!hasRecorder() && !hasRecognition() && <Note tone="warn">This browser can't record or recognise speech. Read the sentence aloud, listen to the voice, and self-check.</Note>}
      {hasRecognition() && <p className="mt-3 text-xs text-muted">Speech recognition is provided by your browser. In Chrome it sends your audio to Google's servers; in other browsers it may be unavailable. It is a rough guide, not a pronunciation expert.</p>}
      <div className="mt-4 flex justify-between"><Btn variant="ghost" disabled={d === 0} onClick={() => setD(d - 1)}>Back</Btn><Btn onClick={() => setD(d + 1)}>{d + 1 < p.drills.length ? 'Next sentence' : 'Finish'}</Btn></div>
    </Card>
  );
}

export function WritingBlock({ id, onDone }: { id: string; onDone: (score: number) => void }) {
  const { content, store, flags, cfg } = useCtx(); const stop = useStudyClock();
  const w = content.writing.find((x) => x.id === id)!;
  const [text, setText] = useState(''); const [res, setRes] = useState<{ items: { label: string; ok: boolean }[]; words: number; score: number } | null>(null);
  const check = () => {
    const words = countWords(text); const items = w.requires.map((r) => ({ label: r.label, ok: hit(text, r.any) }));
    const cover = items.filter((x) => x.ok).length / items.length; const score = Math.round((cover * (words >= w.minWords ? 1 : 0.7)) * 100) / 100;
    setRes({ items, words, score }); store.logEvent({ type: 'writing', skill: 'writing', itemId: w.id, score });
  };
  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-2 flex gap-2"><Chip tone="accent">{w.level}</Chip><Chip>Writing</Chip></div>
        <h2 className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">{w.title}</h2><p className="mt-2.5 text-[1.02rem]">{w.task}</p><p className="mt-1 text-sm text-muted">Aim for at least {w.minWords} {cfg.script === 'han' || cfg.script === 'kana' ? 'characters' : 'words'}.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={!!res} rows={6} spellCheck={false} aria-label="Your writing" className="mt-4 w-full rounded-2xl border-2 border-line-strong bg-surface p-4 text-lg outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" placeholder={`Write in ${cfg.name}…`} />
        <div className="mt-2 flex flex-wrap items-center gap-1.5">{cfg.accents.map((a) => <button key={a} disabled={!!res} className="h-8 min-w-8 rounded-lg border border-line bg-surface px-2 hover:bg-surface2" onClick={() => setText((t) => t + a)}>{a}</button>)}<span className="ml-auto text-sm text-muted">{countWords(text)} words</span></div>
        {!res && <Btn className="mt-3" disabled={countWords(text) < 3} onClick={check}>Check my writing</Btn>}
      </Card>
      {res && (
        <Card className="pop">
          <h3 className="font-extrabold tracking-tight">Checklist</h3>
          <ul className="mt-3 space-y-2">{res.items.map((it) => <li key={it.label} className="flex items-center gap-2.5"><span className={cx('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', it.ok ? 'bg-good' : 'bg-bad')}><Icon name={it.ok ? 'check' : 'x'} size={12} strokeWidth={3.2} /></span>{it.label}</li>)}<li className="flex items-center gap-2.5"><span className={cx('grid h-5 w-5 shrink-0 place-items-center rounded-full text-white', res.words >= w.minWords ? 'bg-good' : 'bg-warn')}><Icon name={res.words >= w.minWords ? 'check' : 'alert'} size={12} strokeWidth={3.2} /></span>{res.words} words (target {w.minWords}+)</li></ul>
          <Note>This is a keyword and length checklist, <b>not</b> a grammar or style grader — it can't tell whether your sentences are correct. Compare yours with the model below and fix anything that differs.</Note>
          <div className="mt-3 rounded-xl bg-surface2 p-3"><p className="text-sm text-muted">Model answer</p><p>{w.model}</p>{flags.translations !== 'never' && <p className="text-sm text-muted">{w.modelN}</p>}</div>
          <p className="mt-3 text-sm font-medium">Self-edit: check verb endings, noun gender/articles, word order and accents.</p>
          <Btn className="mt-3" onClick={() => { stop(); onDone(res.score); }}>Done</Btn>
        </Card>
      )}
    </div>
  );
}
