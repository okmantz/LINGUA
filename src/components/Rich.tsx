import type { ReactNode } from 'react';
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((p, i) => (p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>))}</>;
}
export const Table = ({ rows, caption }: { rows: string[][]; caption?: string }) => (
  <div className="overflow-x-auto rounded-xl border border-line">
    <table className="w-full min-w-max border-collapse text-left text-sm">
      {caption && <caption className="p-2 text-left text-muted">{caption}</caption>}
      <thead><tr className="bg-surface2">{rows[0].map((c, i) => <th key={i} className="px-3 py-2 font-semibold">{c}</th>)}</tr></thead>
      <tbody>{rows.slice(1).map((r, i) => <tr key={i} className="border-t border-line">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 font-medium' : 'px-3 py-2'}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);
export const Row = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-center gap-2">{children}</div>;
