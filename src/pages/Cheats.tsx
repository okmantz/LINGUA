import { useMemo, useState } from 'react';
import { useCtx } from '../state/hooks';
import { fold } from '../core/text';
import { Table } from '../components/Rich';
import { Card, Empty, H1, SearchInput } from '../components/ui';

const HEAD = new Set(['', 'person', 'subject', 'verb', 'infinitive', 'tense', 'case', 'conj.']);
export default function Cheats() {
  const { content, cfg } = useCtx(); const [q, setQ] = useState('');
  const list = useMemo(() => content.cheats.filter((c) => !q || fold(`${c.title} ${c.tags.join(' ')} ${c.rows.flat().join(' ')} ${c.note ?? ''}`).includes(fold(q))), [content, q]);
  return (
    <div>
      <H1 eyebrow="Quick reference" sub={`${cfg.name} cheat sheets. They work offline.`}>Cheat sheets</H1>
      <SearchInput value={q} onChange={setQ} placeholder="Search: verbs, numbers, cases, prepositions…" label="Search cheat sheets" className="mb-6" />
      <div className="space-y-4">{list.map((c) => {
        const hasHead = HEAD.has(c.rows[0]?.[0]?.toLowerCase() ?? 'x');
        const rows = hasHead ? c.rows : [c.rows[0].map(() => ''), ...c.rows];
        return <Card key={c.id}><h2 className="mb-3 text-lg font-extrabold tracking-tight">{c.title}</h2>
          {hasHead ? <Table rows={rows} /> : <div className="overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-max text-left text-sm"><tbody>{c.rows.map((r, i) => <tr key={i} className="border-t border-line first:border-0 odd:bg-surface2/40">{r.map((cell, j) => <td key={j} className={j === 0 ? 'px-3.5 py-2.5 font-semibold' : 'px-3.5 py-2.5'}>{cell}</td>)}</tr>)}</tbody></table></div>}
          {c.note && <p className="mt-3 text-sm text-muted">{c.note}</p>}</Card>; })}
        {!list.length && <Empty icon="search" title="No sheet matches">Nothing found for "{q}". Try a shorter search.</Empty>}</div>
    </div>
  );
}
