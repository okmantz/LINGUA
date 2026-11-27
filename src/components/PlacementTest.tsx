import { useEffect, useRef, useState } from 'react';
import type { Cefr, LanguageContent, PlacementItem, PlacementResult, Skill } from '../core/types';
import { loadContent, getLang } from '../content/registry';
import { buildPlacementPool, initPlacement, nextItem, placementResult, submit, withLevel, MAX_ITEMS, type PState } from '../core/placement';
import { cefrIndex } from '../core/types';
import { SignFigure } from './SignFigure';
import { canSpeakLang, loadVoices, useSpeechState } from '../core/speech';
import { mulberry32 } from '../core/text';
import { clearDraft, loadDraft, saveDraft } from '../core/drafts';
import { ExerciseView } from './ExerciseView';
import { LevelList } from './LevelPicker';
import { Btn, Card, Chip, LEVEL_CAN, LEVEL_NAME, LevelBadge, LevelLadder, Note, Progress, levelBand } from './ui';
import { Icon } from './Icon';

const BASE_UI = { choose: 'Choose the correct answer', check: 'Check', next: 'Continue', correct: 'Correct', wrong: 'Not quite', listen: 'Listen', translate: 'Translate', fill: 'Fill in the blank', order: 'Put the words in order', answer: 'Your answer', well: 'Well done', again: 'Try again', read: 'Read', speak: 'Speak' };

/** What is saved while a test is under way, so a reload, a killed tab or an app update resumes exactly where the learner was. */
interface Draft { seed: number; ids: string[]; a: ('t' | 'f' | 's')[]; cur?: string; noAudio?: boolean; result?: PlacementResult }
const newSeed = () => (Date.now() ^ 0x9e3779b9) >>> 0;

export function PlacementTest({ code, onFinish, onCancel }: { code: string; onFinish: (r: PlacementResult) => void; onCancel: () => void }) {
  const cfg = getLang(code)!; const key = `placement.${code}`;
  const draftRef = useRef<Draft | null>(loadDraft<Draft>(key, 3 * 86_400_000));
  const [seed, setSeed] = useState<number>(() => draftRef.current?.seed ?? newSeed());
  const [content, setContent] = useState<LanguageContent | null>(null);
  useSpeechState();   // re-render when voices arrive or a play attempt fails
  const [noAudio, setNoAudio] = useState(!!draftRef.current?.noAudio);                 // the learner (or a failed play) switched listening questions off
  const canSpeak = !cfg.sign && !noAudio && canSpeakLang(cfg.tts);
  const [pool, setPool] = useState<PlacementItem[]>([]); const [st, setSt] = useState<PState>(initPlacement()); const [item, setItem] = useState<PlacementItem | null>(null);
  const [result, setResult] = useState<PlacementResult | null>(null); const [resumedAt, setResumedAt] = useState(0);
  const pick = useRef(mulberry32(seed ^ 0x5bd1e995));

  const persist = (s: PState, cur: PlacementItem | null, extra: Partial<Draft> = {}) => saveDraft<Draft>(key, { seed, ids: s.served.map((x) => x.item.id), a: s.served.map((x) => (x.skipped ? 's' : x.correct ? 't' : 'f')), cur: cur?.id, noAudio, ...extra });

  // Wait for the browser's voice list (empty for the first moments on Android) before deciding whether listening questions can be asked.
  useEffect(() => {
    let alive = true; setContent(null);
    Promise.all([loadContent(code), loadVoices(2500)]).then(([c]) => {
      if (!alive) return;
      const speakable = !cfg.sign && canSpeakLang(cfg.tts);
      const p = buildPlacementPool(c.placement, c.vocab, mulberry32(seed), { sign: cfg.sign });   // same seed → same questions after a reload
      pick.current = mulberry32(seed ^ 0x5bd1e995);
      let s = initPlacement(); let ok = false; const d = draftRef.current && draftRef.current.seed === seed ? draftRef.current : null;
      if (d && d.ids.length) {
        ok = true;
        for (let i = 0; i < d.ids.length && ok; i++) { const it = p.find((x) => x.id === d.ids[i]); if (!it) { ok = false; break; } s = submit(p, s, it, d.a[i] === 't' ? true : d.a[i] === 'f' ? false : 'skip', speakable); }
        if (!ok) s = initPlacement();
      }
      setPool(p); setSt(s); setResumedAt(ok ? s.served.length : 0);
      if (ok && d?.result) { setResult(d.result); setContent(c); return; }
      setResult(null); setContent(c);
      if (s.done) { const r = placementResult(s, Date.now()); setResult(r); saveDraft<Draft>(key, { seed, ids: s.served.map((x) => x.item.id), a: s.served.map((x) => (x.skipped ? 's' : x.correct ? 't' : 'f')), result: r }); return; }
      const cur = ok && d?.cur ? p.find((x) => x.id === d.cur) ?? null : null;
      setItem(cur ?? nextItem(p, s, pick.current, speakable && !d?.noAudio));
    });
    return () => { alive = false; };
    /* eslint-disable-next-line */
  }, [code, seed]);

  const restart = () => { clearDraft(key); draftRef.current = null; setNoAudio(false); setItem(null); setSeed(newSeed()); };
  const cancel = () => { if (st.served.length < 3 || confirm('Leave the test? Your answers are saved, so you can pick up where you stopped.')) onCancel(); };

  if (!content) return <div className="flex items-center gap-3 py-10 text-muted"><span className="h-5 w-5 animate-spin rounded-full border-2 border-line-strong border-t-accent" />Loading test…</div>;
  const finishWith = (s: PState) => { const r = placementResult(s, Date.now()); setResult(r); persist(s, null, { result: r }); };
  if (result) return <PlacementSummary r={result} lang={cfg.name} onUse={(lvl) => { clearDraft(key); onFinish(lvl === result.overall ? result : withLevel(result, lvl)); }} onRestart={restart} />;
  if (!item) return <Card><p>No more questions available.</p><Btn className="mt-3" onClick={() => finishWith(st)}>See my result</Btn></Card>;
  const answered = st.served.length;
  const advance = (outcome: boolean | 'skip') => {
    const ns = submit(pool, st, item, outcome, canSpeak); setSt(ns);
    if (ns.done) { finishWith(ns); return; }
    const nx = nextItem(pool, ns, pick.current, canSpeak); if (!nx) { finishWith(ns); return; }
    setItem(nx); persist(ns, nx);
  };
  // Progress is "how sure are we", not just how many questions: it fills as the estimate sharpens.
  const sure = answered < 4 ? answered / 16 : Math.min(0.97, Math.max(answered / MAX_ITEMS, 1 - (st.sd - 0.36) / 1.7));
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex flex-wrap items-center gap-2"><Chip tone="accent"><Icon name="target" size={12} />Placement · {cfg.name}</Chip><span className="tabular text-sm text-muted">Question {answered + 1} · adapts to you</span><button className="ml-auto rounded-lg px-2.5 py-1.5 text-sm font-semibold text-muted transition hover:bg-surface2 hover:text-ink" onClick={cancel}>Cancel</button></div>
      <Progress value={sure} className="mb-5" label="Placement progress" />
      {resumedAt > 0 && answered === resumedAt && <div className="mb-4"><Note>Picked up where you left off ({resumedAt} answered). <button onClick={restart} className="font-semibold text-accent-strong underline">Start over</button></Note></div>}
      {answered === 0 && <div className="mb-5"><Note>Answer what you know. <b>Don't guess</b>: if you aren't sure, press "I don't know". Guesses make the result less accurate, and not knowing is useful information. Expect about 15–25 questions that get harder as you succeed and easier if you struggle. Your answers are saved as you go.</Note></div>}
      {item.fig && <div className="mb-3 flex justify-center"><SignFigure spec={item.fig} size={200} /></div>}
      {item.audio && <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent-strong"><Icon name="headphones" size={16} />Listening question: tap the speaker to hear it, then answer. You can replay it as often as you like.</p>}
      <ExerciseView key={item.id} ex={item.ex} cfg={cfg} ui={BASE_UI} speakText={item.audio} autoSpeak={!!item.audio} onDone={(r) => advance(r.correct)} />
      {item.audio && <div className="mt-4 text-center"><button className="text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline" onClick={() => { setNoAudio(true); const nx = nextItem(pool, st, pick.current, false); if (nx) { setItem(nx); persist(st, nx, { noAudio: true }); } else finishWith(st); }}>I can't hear anything: skip listening questions</button></div>}
      <div className="mt-5 text-center"><button className="min-h-11 rounded-full border border-line-strong bg-surface px-6 text-sm font-semibold text-muted shadow-[var(--shadow-xs)] transition hover:bg-surface2 hover:text-ink" onClick={() => advance('skip')}>I don't know</button></div>
    </div>
  );
}

const SKILL_LABEL: Record<string, string> = { vocabulary: 'Vocabulary', grammar: 'Grammar', reading: 'Reading', listening: 'Listening', writing: 'Writing', conversation: 'Conversation', speaking: 'Speaking' };
function PlacementSummary({ r, lang, onUse, onRestart }: { r: PlacementResult; lang: string; onUse: (level: Cefr) => void; onRestart: () => void }) {
  const [lo, hi] = r.range ?? [r.overall, r.overall];
  const [lvl, setLvl] = useState<Cefr>(r.overall); const [choosing, setChoosing] = useState(false);
  const conf = r.confidence === 'high' ? 'High confidence.' : r.confidence === 'medium' ? 'Medium confidence: a retake after some study will sharpen it.' : 'Low confidence: treat this as a rough guide.';
  const lower = cefrIndex(r.overall) > 0 ? (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as Cefr[])[cefrIndex(r.overall) - 1] : null;
  return (
    <div className="pop mx-auto max-w-2xl space-y-4">
      <Card className={`${levelBand(r.overall)} overflow-hidden !p-0`}>
        <div className="bg-[linear-gradient(135deg,color-mix(in_srgb,var(--lv)_16%,transparent),transparent_70%)] px-5 pb-5 pt-6 sm:px-7">
          <p className="eyebrow">Placement result · {lang}</p>
          <div className="mt-3 flex items-center gap-4"><LevelBadge level={r.overall} size="lg" solid className="!h-16 !min-w-[4.5rem] !text-3xl" /><div className="min-w-0"><h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem]">{LEVEL_NAME[r.overall]}</h2><p className="text-sm text-muted">{r.correct} of {r.answered} correct{r.skipped ? ` · ${r.skipped} marked "I don't know"` : ''}{lo !== hi && ` · likely range ${lo}–${hi}`}</p></div></div>
          <p className="mt-4 text-[0.95rem]">{LEVEL_CAN[r.overall]}</p>
        </div>
        <div className="px-5 pb-5 sm:px-7"><LevelLadder level={r.overall} compact /></div>
      </Card>

      <Card>
        <p className="eyebrow">Where your training starts</p>
        <p className="mt-1.5 text-lg font-extrabold tracking-tight">{lvl === 'A1' ? 'Day 1 of the 30-day programme' : `${lvl} · ${LEVEL_NAME[lvl]}`}</p>
        <p className="mt-1 text-sm text-muted">{lvl === 'A1' ? 'You will begin with the beginner programme: first words, sounds and simple sentences.' : `Your words, lessons, readings and conversations start at ${lvl}, not at the beginner basics. Easier material stays available whenever you want a refresher.`}</p>
        {lvl !== r.overall && <p className="mt-2 text-sm font-semibold text-accent-strong">You chose {lvl} instead of {r.overall}.</p>}
        {Object.keys(r.bySkill).length > 0 && <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{Object.entries(r.bySkill).map(([s, l]) => <div key={s} className="flex items-center gap-2.5 rounded-xl bg-surface2 px-3 py-2"><LevelBadge level={l as Cefr} size="sm" /><span className="truncate text-sm font-semibold">{SKILL_LABEL[s] ?? s}</span></div>)}</div>}
        {r.weaknesses.length > 0 && <p className="mt-3 text-sm">Weaker areas to focus on: <b>{r.weaknesses.map((w: Skill) => SKILL_LABEL[w] ?? w).join(', ')}</b>.</p>}
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><Btn size="lg" className="sm:flex-1" onClick={() => onUse(lvl)}>Start at {lvl}<Icon name="arrow" size={18} /></Btn>
          {!choosing && <Btn size="lg" variant="ghost" onClick={() => setChoosing(true)}>This doesn't look right</Btn>}</div>
        {choosing && <div className="mt-5 border-t border-line pt-4"><p className="mb-1 font-bold">Choose where to start</p><p className="mb-3 text-sm text-muted">A short test cannot be perfect. Pick the level that fits you best{lower ? `, for example ${lower} if it felt too hard` : ''}, or a higher one if you are a native or near-native speaker.</p><LevelList value={lvl} onChange={setLvl} hint={{ [r.overall]: 'Test result' } as Partial<Record<Cefr, string>>} /></div>}
      </Card>
      <Note>{conf} This is an estimate from what the app can test: vocabulary in context, grammar, reading{r.bySkill.listening ? ' and listening' : ''}. It cannot test speaking or writing. {cefrIndex(r.overall) >= 4 ? 'C1 and C2 results need a human examiner to confirm. ' : ''}Your level keeps updating from your real review results, and you can change it any time from Home or My Languages.</Note>
      <div className="text-center"><button onClick={onRestart} className="text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline">Take the test again</button></div>
    </div>
  );
}
