import { useMemo, useState } from 'react';
import { useCtx } from '../state/hooks';
import { fold } from '../core/text';
import { Table } from '../components/Rich';
import { Card, Empty, H1 } from '../components/ui';

const HEAD = new Set(['', 'person', 'subject', 'verb', 'infinitive', 'tense', 'case', 'conj.']);
export default function Cheats() {
  const { content, cfg } = useCtx(); const [q, setQ] = useState('');
  const list = useMemo(() => content.cheats.filter((c) => !q || fold(`${c.title} ${c.tags.join(' ')} ${c.rows.flat().join(' ')} ${c.note ?? ''}`).includes(fold(q))), [content, q]);
  return (
    <div>
      <H1 sub={`Quick reference for ${cfg.name} — works offline.`}>Cheat sheets</H1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: verbs, numbers, cases, prepositions…" aria-label="Search cheat sheets" className="mb-5 w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent" />
      <div className="space-y-4">{list.map((c) => {
        const hasHead = HEAD.has(c.rows[0]?.[0]?.toLowerCase() ?? 'x');
        const rows = hasHead ? c.rows : [c.rows[0].map(() => ''), ...c.rows];
        return <Card key={c.id}><h2 className="mb-2 text-lg font-semibold">{c.title}</h2>
          {hasHead ? <Table rows={rows} /> : <div className="overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-max text-left text-sm"><tbody>{c.rows.map((r, i) => <tr key={i} className="border-t border-line first:border-0">{r.map((cell, j) => <td key={j} className={j === 0 ? 'px-3 py-2 font-medium' : 'px-3 py-2'}>{cell}</td>)}</tr>)}</tbody></table></div>}
          {c.note && <p className="mt-2 text-sm text-muted">{c.note}</p>}</Card>; })}
        {!list.length && <Empty>No sheet matches "{q}".</Empty>}</div>
    </div>
  );
}
