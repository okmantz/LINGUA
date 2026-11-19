// Free-practice libraries for grammar, conversations, listening, reading, writing and pronunciation.
import { useState } from 'react';
import { useCtx } from '../state/hooks';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { GrammarBlock, ListeningBlock, ReadingBlock } from '../components/blocksA';
import { ConversationBlock, PronBlock, WritingBlock, type ConvMode } from '../components/blocksB';
import { Card, Chip, H1, Note, Tabs } from '../components/ui';

type Kind = 'grammar' | 'conversations' | 'listening' | 'reading' | 'writing' | 'pronunciation';
const META: Record<Kind, { title: string; sub: string; key: (id: string) => string }> = {
  grammar: { title: 'Grammar academy', sub: 'Learn a pattern, see it in use, then pass a short mastery check.', key: (id) => `grammar:${id}` },
  conversations: { title: 'Conversations', sub: 'Practise real exchanges: guided → semi-open → open.', key: (id) => `conv:${id}` },
  listening: { title: 'Listening academy', sub: 'Comprehensible input: listen first, then answer.', key: (id) => `listening:${id}` },
  reading: { title: 'Reading academy', sub: 'Short texts at your level with comprehension questions.', key: (id) => `reading:${id}` },
  writing: { title: 'Writing academy', sub: 'Short tasks with a checklist and a model answer.', key: (id) => `writing:${id}` },
  pronunciation: { title: 'Pronunciation academy', sub: 'Sounds, minimal pairs and speaking drills.', key: (id) => `pron:${id}` },
};

export default function Library({ kind }: { kind: Kind }) {
  const { content, state, store } = useCtx(); const m = META[kind]; const [open, setOpen] = useState<string | null>(null); const [mode, setMode] = useState<ConvMode>('guided');
  const items: { id: string; title: string; level: Cefr; extra?: string }[] =
    kind === 'grammar' ? content.grammar.map((g) => ({ id: g.id, title: g.title, level: g.level, extra: g.summary }))
    : kind === 'conversations' ? content.conversations.map((c) => ({ id: c.id, title: c.title, level: c.level, extra: c.scenario }))
    : kind === 'listening' ? content.listening.map((l) => ({ id: l.id, title: l.title, level: l.level }))
    : kind === 'reading' ? content.reading.map((r) => ({ id: r.id, title: r.title, level: r.level }))
    : kind === 'writing' ? content.writing.map((w) => ({ id: w.id, title: w.title, level: w.level, extra: w.task }))
    : content.pronunciation.map((p) => ({ id: p.id, title: p.title, level: p.level }));
  const done = (score: number) => { store.completeBlock(m.key(open!), score); setOpen(null); };
  if (open) {
    return (
      <div>
        <button className="mb-3 text-sm text-muted underline" onClick={() => setOpen(null)}>← Back to {m.title}</button>
        {kind === 'grammar' && <GrammarBlock id={open} onDone={done} />}
        {kind === 'conversations' && <ConversationBlock key={open + mode} id={open} mode={mode} onDone={done} />}
        {kind === 'listening' && <ListeningBlock id={open} onDone={done} />}
        {kind === 'reading' && <ReadingBlock id={open} onDone={done} />}
        {kind === 'writing' && <WritingBlock id={open} onDone={done} />}
        {kind === 'pronunciation' && <PronBlock id={open} onDone={done} />}
      </div>
    );
  }
  return (
    <div>
      <H1 sub={m.sub}>{m.title}</H1>
      {kind === 'conversations' && <><Tabs value={mode} onChange={setMode} items={[{ id: 'guided', label: 'Guided' }, { id: 'semi', label: 'Semi-open' }, { id: 'open', label: 'Open' }]} />
        <p className="mb-4 text-sm text-muted">{mode === 'guided' ? 'Pick the best reply from options.' : mode === 'semi' ? 'Type your own reply with key words suggested.' : 'Type your reply with no hints. Checked by key words, not by AI.'}</p></>}
      {kind === 'pronunciation' && <div className="mb-4"><Note>Example audio is browser text-to-speech (synthetic). Speech recognition, when supported, comes from your browser and is only a rough guide.</Note></div>}
      {CEFR_ORDER.map((lvl) => {
        const here = items.filter((i) => i.level === lvl);
        if (!here.length) return lvl === 'A1' || lvl === 'A2' ? null : <div key={lvl} className="mb-5"><h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">{lvl}<Chip>No material yet</Chip></h2><p className="text-sm text-muted">This starter core has no {kind} content at {lvl} yet. It will not pretend otherwise — see docs/ADDING_CONTENT.md to add some.</p></div>;
        return (
          <div key={lvl} className="mb-6"><h2 className="mb-2 text-lg font-semibold">{lvl}</h2>
            <div className="grid gap-2.5">{here.map((i) => { const r = state.lessons[m.key(i.id)]; return (
              <Card key={i.id} className="!p-3.5"><button className="flex w-full items-center gap-3 text-left" onClick={() => setOpen(i.id)}>
                <div className="flex-1"><p className="font-medium">{i.title}</p>{i.extra && <p className="line-clamp-2 text-sm text-muted">{i.extra}</p>}</div>
                {r ? <Chip tone={r.best >= 0.8 ? 'good' : 'warn'}>best {Math.round(r.best * 100)}%</Chip> : <Chip>New</Chip>}<span aria-hidden className="rounded-xl bg-surface2 px-3 py-1.5 text-sm">Open</span></button></Card>); })}</div></div>);
      })}
    </div>
  );
}
