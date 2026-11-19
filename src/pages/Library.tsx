// Free-practice libraries for grammar, conversations, listening, reading, writing and pronunciation.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFocusMode, useGuide } from '../state/hooks';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { passedCount, PASS, recommendedItem } from '../core/guide';
import { reviewComment } from '../core/teacher';
import { GrammarBlock, ListeningBlock, ReadingBlock } from '../components/blocksA';
import { ConversationBlock, PronBlock, WritingBlock, type ConvMode } from '../components/blocksB';
import { convModeFor } from '../components/BlockRunner';
import { Icon, type IconName } from '../components/Icon';
import { TeacherNote } from '../components/Teacher';
import { Btn, Card, Chip, H1, IconBadge, Note, Progress, Tabs, cx } from '../components/ui';

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
  const [mode, setMode] = useState<ConvMode>(convModeFor(state)); const [result, setResult] = useState<{ id: string; title: string; score: number } | null>(null);
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
        <button className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink" onClick={() => setOpen(null)}><Icon name="back" size={16} />Back to {m.title}</button>
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
        <Card className="text-center"><div className={cx('mx-auto grid h-16 w-16 place-items-center rounded-full', passed ? 'bg-good/15 text-good' : 'bg-warn/15 text-warn')}><Icon name={passed ? 'check' : 'repeat'} size={32} strokeWidth={2.4} /></div>
          <p className="mt-3 text-sm text-muted">{result.title}</p><h1 className="text-3xl font-extrabold">{Math.round(result.score * 100)}%</h1><p className="text-sm text-muted">{passed ? 'Passed. This lesson counts toward your progress.' : `Pass mark is ${Math.round(PASS * 100)}%. You can retry any time.`}</p></Card>
        <TeacherNote mood={c.mood} title={c.title}>{c.text}</TeacherNote>
        <Card className="!p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted">What next?</p>
          <div className="mt-2 flex flex-col gap-2">
            {!passed && <Btn onClick={() => { setOpen(result.id); setResult(null); }}>Retry this lesson</Btn>}
            {recItem ? <Btn variant={passed ? 'primary' : 'ghost'} onClick={() => { setOpen(recItem.id); setResult(null); }}>Next: {recItem.title}<Icon name="arrow" size={17} /></Btn> : <Note>You've done everything available here. Nice! Try another skill.</Note>}
            <Btn variant="ghost" onClick={() => setResult(null)}>Back to {m.title}</Btn>
            <Link to="/" className="text-center text-sm font-medium text-accent">Back to Home</Link>
          </div></Card>
      </div>
    );
  }
  return (
    <div>
      <H1 sub={m.sub} right={<IconBadge name={m.icon} size={46} />}>{m.title}</H1>
      <Card className="mb-4 !p-3.5"><div className="flex items-center justify-between text-sm"><span className="font-medium">Your progress</span><span className="text-muted">{prog.done} of {prog.total} passed</span></div><Progress value={prog.total ? prog.done / prog.total : 0} className="mt-2" label="Passed lessons" /></Card>
      {recItem && (
        <Card className="mb-5 border-accent/50 bg-gradient-to-br from-accent/10 to-transparent">
          <Chip tone="accent"><Icon name="sparkles" size={12} />Recommended next</Chip><p className="mt-2 text-lg font-bold leading-snug">{recItem.title}</p>{recItem.extra && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{recItem.extra}</p>}
          <Btn className="mt-3" onClick={() => setOpen(recItem.id)}>Start<Icon name="arrow" size={17} /></Btn>
        </Card>
      )}
      {kind === 'conversations' && <><Tabs value={mode} onChange={setMode} items={[{ id: 'guided', label: 'Guided' }, { id: 'semi', label: 'Semi-open' }, { id: 'open', label: 'Open' }]} />
        <p className="mb-4 text-sm text-muted">{mode === 'guided' ? 'Pick the best reply from options.' : mode === 'semi' ? 'Type your own reply with key words suggested.' : 'Type your reply with no hints. Checked by key words, not by AI.'}{mode === convModeFor(state) && <b className="text-accent"> Recommended for you right now.</b>}</p></>}
      {kind === 'pronunciation' && <div className="mb-4"><Note>Example audio is browser text-to-speech (synthetic). Speech recognition, when supported, comes from your browser and is only a rough guide.</Note></div>}
      {CEFR_ORDER.map((lvl) => {
        const here = items.filter((i) => i.level === lvl);
        if (!here.length) return lvl === 'A1' || lvl === 'A2' ? null : <div key={lvl} className="mb-5"><h2 className="mb-1 flex items-center gap-2 text-lg font-bold">{lvl}<Chip>No material yet</Chip></h2><p className="text-sm text-muted">This starter core has no {kind} content at {lvl} yet. It will not pretend otherwise. See docs/ADDING_CONTENT.md to add some.</p></div>;
        return (
          <div key={lvl} className="mb-6"><h2 className="mb-2 text-[0.8rem] font-bold uppercase tracking-wider text-muted">Level {lvl}</h2>
            <div className="grid gap-2.5">{here.map((i) => { const r = state.lessons[m.key(i.id)]; const passed = (r?.best ?? 0) >= PASS; return (
              <Card key={i.id} className={cx('!p-0', i.id === rec && 'border-accent/60')}><button className="flex w-full items-center gap-3 p-3.5 text-left" onClick={() => setOpen(i.id)}>
                <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-full', passed ? 'bg-good/15 text-good' : 'bg-surface2 text-muted')}><Icon name={passed ? 'check' : m.icon} size={17} strokeWidth={passed ? 2.6 : 1.8} /></span>
                <div className="min-w-0 flex-1"><p className="font-semibold leading-snug">{i.title}</p>{i.extra && <p className="line-clamp-2 text-sm text-muted">{i.extra}</p>}</div>
                {r ? <Chip tone={passed ? 'good' : 'warn'}>{Math.round(r.best * 100)}%</Chip> : i.id === rec ? <Chip tone="accent">Next</Chip> : <Chip>New</Chip>}<Icon name="right" size={17} className="text-muted" /></button></Card>); })}</div></div>);
      })}
    </div>
  );
}
