import { useMemo, useState } from 'react';
import { useCtx } from '../state/hooks';
import { VOCAB_CATEGORIES } from '../core/categories';
import { stageOf, STAGE_LABEL, STAGE_RULE, STAGES, type Stage } from '../core/mastery';
import { fold } from '../core/text';
import { ReviewBlock, WordCard } from '../components/blocksA';
import { StageBar } from '../components/Charts';
import { Btn, Card, Chip, Empty, H1, Note, Tabs } from '../components/ui';

const TONE: Record<Stage, 'plain' | 'accent' | 'good' | 'warn'> = { unseen: 'plain', encountered: 'plain', recognized: 'accent', recalled: 'accent', retained: 'good', mastered: 'good' };

export default function Vocabulary() {
  const { store, content, rate, state } = useCtx(); const [tab, setTab] = useState<'browse' | 'review' | 'stages'>('browse');
  const [q, setQ] = useState(''); const [cat, setCat] = useState('all'); const [stage, setStage] = useState<'all' | Stage>('all'); const [open, setOpen] = useState<string | null>(null); const [rev, setRev] = useState<string[] | null>(null);
  const now = Date.now(); const stats = store.stats!;
  const due = store.cards.filter((c) => c.kind === 'vocab' && c.due <= now).sort((a, b) => a.due - b.due);
  const rows = useMemo(() => content.vocab.filter((v) => (cat === 'all' || v.cat === cat) && (!q || fold(`${v.t} ${v.n}`).includes(fold(q))) && (stage === 'all' || stageOf(store.cardMap.get(`${state.code}:${v.id}`), now) === stage)), [content, q, cat, stage, store.cardMap]); // eslint-disable-line
  const cats = VOCAB_CATEGORIES.filter((c) => content.vocab.some((v) => v.cat === c.id));
  if (rev) return <div><button className="mb-3 text-sm underline text-muted" onClick={() => setRev(null)}>← Back to vocabulary</button><ReviewBlock ids={rev} onDone={() => { setRev(null); store.evaluate(); }} /></div>;
  return (
    <div>
      <H1 sub={`${content.vocab.length} words in this course · ${stats.retainedPlus} retained · ${due.length} due now`}>Vocabulary academy</H1>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'browse', label: 'Browse' }, { id: 'review', label: `Review (${due.length})` }, { id: 'stages', label: 'How mastery works' }]} />
      {tab === 'browse' && <>
        <div className="mb-4 flex flex-wrap gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search words or meanings…" aria-label="Search vocabulary" className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2 outline-none focus:border-accent" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category" className="rounded-xl border border-line bg-surface px-2 py-2"><option value="all">All categories</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
          <select value={stage} onChange={(e) => setStage(e.target.value as any)} aria-label="Mastery stage" className="rounded-xl border border-line bg-surface px-2 py-2"><option value="all">Any stage</option>{STAGES.map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}</select>
        </div>
        <p className="mb-2 text-sm text-muted">{rows.length} words</p>
        <div className="space-y-2">{rows.slice(0, 150).map((v) => { const c = store.cardMap.get(`${state.code}:${v.id}`); const sg = stageOf(c, now); return (
          <Card key={v.id} className="!p-3"><button className="flex w-full items-center gap-3 text-left" onClick={() => setOpen(open === v.id ? null : v.id)} aria-expanded={open === v.id}>
            <div className="flex-1"><span className="text-lg font-semibold">{v.t}</span> <span className="text-muted">— {v.n}</span></div><Chip tone={TONE[sg]}>{STAGE_LABEL[sg].split(' ')[0]}</Chip></button>
            {open === v.id && <div className="mt-3"><WordCard e={v} rate={rate} />{c && c.reps > 0 && <p className="mt-2 text-xs text-muted">{c.reps} reviews · {c.lapses} lapses · memory stability ≈ {c.stability.toFixed(1)} days · next due {new Date(c.due).toLocaleDateString()}</p>}</div>}</Card>); })}
          {rows.length > 150 && <p className="text-sm text-muted">Showing the first 150 — refine your search.</p>}{!rows.length && <Empty>No words match.</Empty>}</div>
      </>}
      {tab === 'review' && (due.length ? <Card><h2 className="text-lg font-semibold">{due.length} words are due</h2><p className="mt-1 text-sm text-muted">Reviewing right when you are about to forget is the most efficient way to build long-term memory.</p><div className="mt-3 flex flex-wrap gap-2">{[10, 20, 40].filter((n) => n < due.length).concat([Math.min(due.length, 60)]).filter((v, i, a) => a.indexOf(v) === i).map((n) => <Btn key={n} onClick={() => setRev(due.slice(0, n).map((c) => c.itemId))}>Review {n}</Btn>)}</div></Card> : <Empty>Nothing is due right now. 🎉 New reviews appear automatically as your memory needs them.</Empty>)}
      {tab === 'stages' && <div className="space-y-4"><Card><h2 className="mb-2 text-lg font-semibold">Your vocabulary</h2><StageBar counts={stats.stages} /></Card>
        <Card><h2 className="mb-2 text-lg font-semibold">What each stage means</h2><dl className="space-y-2.5">{STAGES.map((s) => <div key={s}><dt className="font-medium">{STAGE_LABEL[s]}</dt><dd className="text-sm text-muted">{STAGE_RULE[s]}</dd></div>)}</dl></Card>
        <Note>A word never becomes "mastered" from one correct answer. Spaced repetition (FSRS) schedules each word just before you'd forget it, and the stage rises only when you keep recalling it across days.</Note></div>}
    </div>
  );
}
