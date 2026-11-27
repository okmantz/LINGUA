// Free-practice libraries for grammar, conversations, listening, reading, writing and pronunciation.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFocusMode, useGuide } from '../state/hooks';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { passedCount, PASS, recommendedItem, currentLevel } from '../core/guide';
import { levelDistance } from '../core/curriculum';
import { LevelPicker } from '../components/LevelPicker';
import { reviewComment } from '../core/teacher';
import { GrammarBlock, ListeningBlock, ReadingBlock } from '../components/blocksA';
import { ConversationBlock, PronBlock, WritingBlock, type ConvMode } from '../components/blocksB';
import { convModeFor } from '../components/BlockRunner';
import { Icon, type IconName } from '../components/Icon';
import { TeacherNote } from '../components/Teacher';
import { Btn, Card, Chip, H1, IconBadge, LEVEL_NAME as LVN, LevelBadge, Note, Progress, Tabs, cx } from '../components/ui';


type Kind = 'grammar' | 'conversations' | 'listening' | 'reading' | 'writing' | 'pronunciation';
const META: Record<Kind, { title: string; sub: string; icon: IconName; key: (id: string) => string }> = {
  grammar: { title: 'Grammar', sub: 'Learn a pattern, see it in use, then pass a short mastery check.', icon: 'puzzle', key: (id) => `grammar:${id}` },
  conversations: { title: 'Conversations', sub: 'Practise real exchanges: guided, then semi-open, then open.', icon: 'chat', key: (id) => `conv:${id}` },
  listening: { title: 'Listening', sub: 'Comprehensible input: listen first, then answer.', icon: 'headphones', key: (id) => `listening:${id}` },
  reading: { title: 'Reading', sub: 'Short texts at your level with comprehension questions.', icon: 'book', key: (id) => `reading:${id}` },
  writing: { title: 'Writing', sub: 'Short tasks with a checklist and a model answer.', icon: 'pen', key: (id) => `writing:${id}` },
  pronunciation: { title: 'Pronunciation', sub: 'Sounds, minimal pairs and speaking drills.', icon: 'mic', key: (id) => `pron:${id}` },
};

export default function Library({ kind }: { kind: Kind }) {
  const { content, state, store } = useGuide(); const m = META[kind]; const [open, setOpen] = useState<string | null>(null);
  const [lvlOpen, setLvlOpen] = useState(false); const [mode, setMode] = useState<ConvMode>(convModeFor(state)); const [result, setResult] = useState<{ id: string; title: string; score: number } | null>(null);
  useFocusMode(!!open);
  const items: { id: string; title: string; level: Cefr; extra?: string }[] =
    kind === 'grammar' ? content.grammar.map((g) => ({ id: g.id, title: g.title, level: g.level, extra: g.summary }))
    : kind === 'conversations' ? content.conversations.map((c) => ({ id: c.id, title: c.title, level: c.level, extra: c.scenario }))
    : kind === 'listening' ? content.listening.map((l) => ({ id: l.id, title: l.title, level: l.level }))
    : kind === 'reading' ? content.reading.map((r) => ({ id: r.id, title: r.title, level: r.level }))
    : kind === 'writing' ? content.writing.map((w) => ({ id: w.id, title: w.title, level: w.level, extra: w.task }))
    : content.pronunciation.map((p) => ({ id: p.id, title: p.title, level: p.level }));
  const titleOf = (id: string) => items.find((i) => i.id === id)?.title ?? '';
  const done = (score: number) => { const id = open!; store.completeBlock(m.key(id), score); setResult({ id, title: titleOf(id), score }); setOpen(null); window.scrollTo(0, 0); };

  if (open) {
    return (
      <div>
        <button className="mb-5 inline-flex min-h-9 items-center gap-1.5 rounded-lg pr-3 text-sm font-semibold text-muted transition hover:text-ink" onClick={() => setOpen(null)}><Icon name="back" size={16} />Back to {m.title}</button>
        {kind === 'grammar' && <GrammarBlock id={open} onDone={done} />}
        {kind === 'conversations' && <ConversationBlock key={open + mode} id={open} mode={mode} onDone={done} />}
        {kind === 'listening' && <ListeningBlock id={open} onDone={done} />}
        {kind === 'reading' && <ReadingBlock id={open} onDone={done} />}
        {kind === 'writing' && <WritingBlock id={open} onDone={done} />}
        {kind === 'pronunciation' && <PronBlock id={open} onDone={done} />}
      </div>
    );
  }

  const rec = recommendedItem(kind, state, content, result?.id); const recItem = items.find((i) => i.id === rec); const prog = passedCount(kind, state, content);
  if (result) {
    const c = reviewComment(result.score, 'lesson'); const passed = result.score >= PASS;
    return (
      <div className="pop mx-auto max-w-lg space-y-4">
        <Card className="py-8 text-center"><div className={cx('celebrate mx-auto grid h-20 w-20 place-items-center rounded-full', passed ? 'bg-good/14 text-good' : 'bg-warn/14 text-warn')}><Icon name={passed ? 'check' : 'repeat'} size={38} strokeWidth={2.4} /></div>
          <p className="mt-4 text-sm font-semibold text-muted">{result.title}</p><h1 className="tabular mt-1 text-5xl font-extrabold tracking-tight">{Math.round(result.score * 100)}%</h1><p className="mx-auto mt-2 max-w-xs text-sm text-muted">{passed ? 'Passed. This lesson counts toward your progress.' : `Pass mark is ${Math.round(PASS * 100)}%. You can retry any time.`}</p></Card>
        <TeacherNote mood={c.mood} title={c.title}>{c.text}</TeacherNote>
        <Card className="!p-4"><p className="eyebrow">What next?</p>
          <div className="mt-3 flex flex-col gap-2">
            {!passed && <Btn size="lg" onClick={() => { setOpen(result.id); setResult(null); }}>Retry this lesson</Btn>}
            {recItem ? <Btn size="lg" variant={passed ? 'primary' : 'ghost'} onClick={() => { setOpen(recItem.id); setResult(null); }}>Next: {recItem.title}<Icon name="arrow" size={17} /></Btn> : <Note>You've done everything available here. Nice! Try another skill.</Note>}
            <Btn variant="quiet" onClick={() => setResult(null)}>Back to {m.title}</Btn>
            <Link to="/" className="text-center text-sm font-bold text-accent-strong hover:underline">Back to Home</Link>
          </div></Card>
      </div>
    );
  }
  const lvlNow = currentLevel(state); const atLevel = items.filter((i) => i.level === lvlNow); const passedHere = atLevel.filter((i) => (state.lessons[m.key(i.id)]?.best ?? 0) >= PASS).length;
  // The learner's own level first, then the next one up, then the one below. Everything else is tucked into "Other levels" so it never crowds the screen.
  const order = [...CEFR_ORDER].sort((a, b) => levelDistance(a, lvlNow) - levelDistance(b, lvlNow));
  const mainLevels = order.slice(0, 3); const otherLevels = order.slice(3).sort((a, b) => CEFR_ORDER.indexOf(a) - CEFR_ORDER.indexOf(b));
  const section = (lvl: Cefr) => {
    const here = items.filter((i) => i.level === lvl);
    if (!here.length) return levelDistance(lvl, lvlNow) > 1 ? null : <div key={lvl} className="mb-6 flex items-center gap-3 rounded-2xl border border-dashed border-line-strong px-4 py-3.5"><LevelBadge level={lvl} /><p className="text-sm text-muted">No {kind} material at {lvl} yet. See docs/ADDING_CONTENT.md to add some.</p></div>;
    const passedN = here.filter((i) => (state.lessons[m.key(i.id)]?.best ?? 0) >= PASS).length;
    return (
      <section key={lvl} className="mb-8" aria-label={`Level ${lvl}`}>
        <div className="mb-3 flex items-center gap-2.5 px-0.5"><LevelBadge level={lvl} solid={lvl === lvlNow} /><h2 className="font-extrabold tracking-tight">{LVN[lvl]}</h2>{lvl === lvlNow && <Chip tone="accent">Your level</Chip>}<span className="tabular ml-auto text-xs font-semibold text-muted">{passedN}/{here.length}</span></div>
        <Card className="divide-y divide-line !p-0">{here.map((i) => { const r = state.lessons[m.key(i.id)]; const passed = (r?.best ?? 0) >= PASS; return (
          <button key={i.id} className={cx('flex w-full items-center gap-3.5 p-3.5 text-left transition first:rounded-t-[1.25rem] last:rounded-b-[1.25rem] hover:bg-surface2/60 sm:px-4', i.id === rec && 'bg-accent/[.06]')} onClick={() => setOpen(i.id)}>
            <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-full', passed ? 'bg-good/14 text-good' : i.id === rec ? 'bg-accent/18 text-accent-strong' : 'bg-surface2 text-muted')}><Icon name={passed ? 'check' : m.icon} size={18} strokeWidth={passed ? 2.6 : 1.8} /></span>
            <div className="min-w-0 flex-1"><p className="font-semibold leading-snug">{i.title}</p>{i.extra && <p className="mt-0.5 line-clamp-1 text-sm text-muted">{i.extra}</p>}</div>
            {r ? <Chip tone={passed ? 'good' : 'warn'}><span className="tabular">{Math.round(r.best * 100)}%</span></Chip> : i.id === rec ? <Chip tone="accent">Next</Chip> : <Chip>New</Chip>}<Icon name="right" size={16} className="shrink-0 text-faint" /></button>); })}</Card>
      </section>);
  };
  return (
    <div>
      <H1 eyebrow="Practise" sub={m.sub} right={<IconBadge name={m.icon} size={48} />}>{m.title}</H1>
      <Card className="mb-5 flex items-center gap-4 !p-4"><LevelBadge level={lvlNow} size="lg" solid /><div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-2 text-sm"><span className="font-bold">{LVN[lvlNow]} {m.title.toLowerCase()}</span><span className="tabular text-xs font-semibold text-muted">{atLevel.length ? `${passedHere} of ${atLevel.length} passed` : `${prog.done} of ${prog.total} passed`}</span></div><Progress value={atLevel.length ? passedHere / atLevel.length : prog.total ? prog.done / prog.total : 0} className="mt-2.5" label="Passed lessons" /></div><Btn size="sm" variant="ghost" onClick={() => setLvlOpen(true)}>Change level</Btn></Card>
      <LevelPicker open={lvlOpen} onClose={() => setLvlOpen(false)} current={lvlNow} language={store.profile ? (store.lang ?? '') : ''} onChoose={(lv) => store.chooseLevel(state.code, lv)} />
      {recItem && (
        <section className="hero mb-7 p-5 sm:p-6" aria-label="Recommended next">
          <div className="relative"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1 text-xs font-bold backdrop-blur"><Icon name="sparkles" size={13} />Recommended next</span><p className="mt-3 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">{recItem.title}</p>{recItem.extra && <p className="mt-1 line-clamp-2 max-w-xl text-sm muted">{recItem.extra}</p>}
            <Btn className="mt-5" size="lg" onClick={() => setOpen(recItem.id)}>Start<Icon name="arrow" size={17} /></Btn></div>
        </section>
      )}
      {kind === 'conversations' && <><Tabs value={mode} onChange={setMode} items={[{ id: 'guided', label: 'Guided' }, { id: 'semi', label: 'Semi-open' }, { id: 'open', label: 'Open' }]} />
        <p className="-mt-2 mb-5 text-sm text-muted">{mode === 'guided' ? 'Pick the best reply from options.' : mode === 'semi' ? 'Type your own reply with key words suggested.' : 'Type your reply with no hints. Checked by key words, not by AI.'}{mode === convModeFor(state) && <b className="text-accent-strong"> Recommended for you right now.</b>}</p></>}
      {kind === 'pronunciation' && <div className="mb-5"><Note>Example audio is browser text-to-speech (synthetic). Speech recognition, when supported, comes from your browser and is only a rough guide.</Note></div>}
      {mainLevels.map(section)}
      {otherLevels.some((l) => items.some((i) => i.level === l)) && (
        <details className="group mb-8 rounded-2xl border border-line bg-surface2/40 open:bg-transparent open:p-0">
          <summary className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-bold text-muted transition hover:text-ink group-open:mb-4 group-open:px-0.5"><Icon name="down" size={16} className="transition-transform group-open:rotate-180" />Other levels ({otherLevels.filter((l) => items.some((i) => i.level === l)).join(', ')})<span className="ml-auto text-xs font-medium">Refreshers and higher levels</span></summary>
          {otherLevels.map(section)}
        </details>
      )}
    </div>
  );
}
