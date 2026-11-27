import { useMemo, useState } from 'react';
import { useCtx, useFocusMode } from '../state/hooks';
import { VOCAB_CATEGORIES } from '../core/categories';
import { stageOf, STAGE_LABEL, STAGE_RULE, STAGES, type Stage } from '../core/mastery';
import { fold } from '../core/text';
import { CEFR_ORDER, type Cefr } from '../core/types';
import { currentLevel } from '../core/guide';
import { rankForLevel } from '../core/curriculum';
import { ReviewBlock, WordCard } from '../components/blocksA';
import { StageBar } from '../components/Charts';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, Empty, H1, LEVEL_NAME, LevelBadge, Note, SearchInput, Select, Tabs, cx } from '../components/ui';

const TONE: Record<Stage, 'plain' | 'accent' | 'good' | 'warn'> = { unseen: 'plain', encountered: 'plain', recognized: 'accent', recalled: 'accent', retained: 'good', mastered: 'good' };

export default function Vocabulary() {
  const { store, content, rate, state } = useCtx(); const [tab, setTab] = useState<'browse' | 'review' | 'stages'>(() => (store.cards.some((c) => c.kind === 'vocab' && c.due <= Date.now()) ? 'review' : 'browse'));
  // Browsing starts at the learner's own level (a B2 learner no longer opens a list that begins with "hello").
  const lvlNow = currentLevel(state); const [lvl, setLvl] = useState<'all' | Cefr>(lvlNow);
  const [q, setQ] = useState(''); const [cat, setCat] = useState('all'); const [stage, setStage] = useState<'all' | Stage>('all'); const [open, setOpen] = useState<string | null>(null); const [rev, setRev] = useState<string[] | null>(null);
  useFocusMode(!!rev);
  const now = Date.now(); const stats = store.stats!;
  const due = store.cards.filter((c) => c.kind === 'vocab' && c.due <= now).sort((a, b) => a.due - b.due);
  const rows = useMemo(() => rankForLevel(content.vocab.filter((v) => (lvl === 'all' || v.level === lvl) && (cat === 'all' || v.cat === cat) && (!q || fold(`${v.t} ${v.n}`).includes(fold(q))) && (stage === 'all' || stageOf(store.cardMap.get(`${state.code}:${v.id}`), now) === stage)), lvlNow), [content, q, cat, stage, lvl, lvlNow, store.cardMap]); // eslint-disable-line
  const perLevel = useMemo(() => Object.fromEntries(CEFR_ORDER.map((l) => [l, content.vocab.filter((v) => v.level === l).length])) as Record<Cefr, number>, [content]);
  const cats = VOCAB_CATEGORIES.filter((c) => content.vocab.some((v) => v.cat === c.id));
  if (rev) return <div><button className="mb-5 inline-flex min-h-9 items-center gap-1.5 rounded-lg pr-3 text-sm font-semibold text-muted transition hover:text-ink" onClick={() => setRev(null)}><Icon name="back" size={16} />Back to vocabulary</button><ReviewBlock ids={rev} onDone={() => { setRev(null); store.evaluate(); }} /></div>;
  return (
    <div>
      <H1 eyebrow="Vocabulary academy" sub={<><b className="tabular text-ink">{content.vocab.length}</b> words in this course · <b className="tabular text-ink">{stats.retainedPlus}</b> retained · <b className="tabular text-ink">{due.length}</b> due now</>}>Vocabulary</H1>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'browse', label: 'Browse' }, { id: 'review', label: `Review (${due.length})` }, { id: 'stages', label: 'How mastery works' }]} />
      {tab === 'browse' && <>
        <div className="no-scrollbar -mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Level">
          {(['all', ...CEFR_ORDER] as const).map((l) => (l !== 'all' && !perLevel[l] ? null : <button key={l} role="tab" aria-selected={lvl === l} onClick={() => setLvl(l)} className={cx('flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-semibold transition', lvl === l ? 'border-accent bg-accent/15 text-accent-strong' : 'border-line-strong bg-surface text-muted hover:bg-surface2 hover:text-ink')}>{l === 'all' ? 'All levels' : <>{l}{l === lvlNow && <span className="rounded-full bg-accent/20 px-1.5 text-[10px] font-bold uppercase">you</span>}<span className="tabular text-xs font-medium opacity-70">{perLevel[l]}</span></>}</button>))}
        </div>
        <div className="mb-4 grid gap-2.5 sm:grid-cols-[1fr_auto_auto]">
          <SearchInput value={q} onChange={setQ} placeholder="Search words or meanings…" label="Search vocabulary" />
          <Select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category"><option value="all">All categories</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</Select>
          <Select value={stage} onChange={(e) => setStage(e.target.value as any)} aria-label="Mastery stage"><option value="all">Any stage</option>{STAGES.map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}</Select>
        </div>
        <p className="tabular mb-3 px-0.5 text-sm font-semibold text-muted">{rows.length} words</p>
        <div className="space-y-2">{rows.slice(0, 150).map((v) => { const c = store.cardMap.get(`${state.code}:${v.id}`); const sg = stageOf(c, now); const isOpen = open === v.id; return (
          <Card key={v.id} className={cx('!p-0 transition', isOpen && 'border-accent/40')}><button className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left" onClick={() => setOpen(isOpen ? null : v.id)} aria-expanded={isOpen}>
            <LevelBadge level={v.level} size="sm" className="hidden sm:inline-grid" /><div className="min-w-0 flex-1"><span className="text-lg font-bold tracking-tight">{v.t}</span> <span className="text-muted">· {v.n}</span></div><Chip tone={TONE[sg]}>{sg === 'unseen' ? 'New' : STAGE_LABEL[sg]}</Chip><Icon name="down" size={16} className={cx('shrink-0 text-faint transition-transform', isOpen && 'rotate-180')} /></button>
            {isOpen && <div className="border-t border-line p-4"><WordCard e={v} rate={rate} />{c && c.reps > 0 && <p className="tabular mt-3 text-xs text-muted">{c.reps} reviews · {c.lapses} lapses · memory stability ≈ {c.stability.toFixed(1)} days · next due {new Date(c.due).toLocaleDateString()}</p>}</div>}</Card>); })}
          {rows.length > 150 && <p className="py-2 text-center text-sm text-muted">Showing the first 150. Narrow the level, category or search to see more.</p>}{!rows.length && <Empty icon="search" title="No words match">Try a different search or clear the filters.</Empty>}</div>
      </>}
      {tab === 'review' && (due.length ? <section className="hero p-6 sm:p-8"><div className="relative"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1 text-xs font-bold"><Icon name="repeat" size={13} />Spaced review</span><h2 className="tabular mt-3 text-3xl font-extrabold tracking-tight">{due.length} word{due.length === 1 ? ' is' : 's are'} due</h2><p className="mt-1.5 max-w-lg muted">Reviewing right when you are about to forget is the most efficient way to build long-term memory.</p><div className="mt-5 flex flex-wrap gap-2.5">{[10, 20, 40].filter((n) => n < due.length).concat([Math.min(due.length, 60)]).filter((v, i, a) => a.indexOf(v) === i).map((n, k) => <Btn key={n} size="lg" variant={k === 0 ? 'primary' : 'ghost'} className={k === 0 ? '' : '!border-white/25 !bg-white/10 !text-white hover:!bg-white/20'} onClick={() => setRev(due.slice(0, n).map((c) => c.itemId))}>Review {n}</Btn>)}</div></div></section> : <Empty icon="check" title="Nothing is due right now">New reviews appear automatically as your memory needs them. Come back later, or browse words you want to look at again.</Empty>)}
      {tab === 'stages' && <div className="space-y-4"><Card><h2 className="mb-4 text-lg font-extrabold tracking-tight">Your vocabulary</h2><StageBar counts={stats.stages} /></Card>
        <Card><h2 className="mb-3 text-lg font-extrabold tracking-tight">What each stage means</h2><dl className="divide-y divide-line">{STAGES.map((s) => <div key={s} className="py-3 first:pt-0 last:pb-0"><dt className="font-bold">{STAGE_LABEL[s]}</dt><dd className="mt-0.5 text-sm text-muted">{STAGE_RULE[s]}</dd></div>)}</dl></Card>
        <Note>A word never becomes "mastered" from one correct answer. Spaced repetition (FSRS) schedules each word just before you'd forget it, and the stage rises only when you keep recalling it across days.</Note></div>}
    </div>
  );
}
