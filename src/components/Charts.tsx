import { STAGES, STAGE_LABEL, type Stage } from '../core/mastery';

const AX = 'var(--faint)';

/** Plain HTML bars (crisp at any width). Few bars: every label is shown. Many bars: only the first, middle and last. */
export function BarChart({ data, height = 140, unit = '' }: { data: { label: string; value: number }[]; height?: number; unit?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value)); const dense = data.length > 12;
  const edge = (i: number) => i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2);
  return (
    <div role="img" aria-label={`Bar chart: ${data.map((d) => `${d.label} ${Math.round(d.value * 10) / 10}${unit}`).join(', ')}`}>
      <div className="flex items-end gap-[3px] border-b border-line-strong sm:gap-1.5" style={{ height }}>
        {data.map((d, i) => (
          <div key={i} className="group relative flex h-full min-w-0 flex-1 items-end" title={`${d.label}: ${Math.round(d.value * 10) / 10}${unit}`}>
            <div className="w-full rounded-t-md transition-[height,filter] duration-500 group-hover:brightness-110" style={{ height: `${d.value > 0 ? Math.max(5, (d.value / max) * 100) : 3}%`, background: d.value > 0 ? 'linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 70%, #6366f1))' : 'var(--surface3)', borderRadius: d.value > 0 ? undefined : 2 }} />
            <span className="tabular pointer-events-none absolute -top-5 left-1/2 hidden -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-bg group-hover:block">{Math.round(d.value * 10) / 10}{unit}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-[3px] sm:gap-1.5">{data.map((d, i) => <span key={i} className={`min-w-0 flex-1 truncate text-center text-[10px] font-medium text-faint ${dense && !edge(i) ? 'invisible' : ''}`}>{d.label}</span>)}</div>
    </div>
  );
}
export function LineChart({ data, height = 140 }: { data: { label: string; value: number | null }[]; height?: number }) {
  const H = height / 2; const top = 6; const bottom = H - 12; const span = bottom - top;
  const pts = data.map((d, i) => ({ x: (i / Math.max(1, data.length - 1)) * 88 + 6, y: d.value === null ? null : top + (1 - d.value) * span, d }));
  const live = pts.filter((p) => p.y !== null) as { x: number; y: number; d: (typeof data)[number] }[];
  const path = live.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
  const area = live.length > 1 ? `${path} L${live[live.length - 1].x},${bottom} L${live[0].x},${bottom} Z` : '';
  return (
    <svg viewBox={`0 0 100 ${H}`} className="w-full" style={{ height }} role="img" aria-label="Accuracy over time">
      <defs><linearGradient id="lcfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".28" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
      {[0, 0.5, 1].map((g) => <g key={g}><line x1="6" x2="94" y1={top + (1 - g) * span} y2={top + (1 - g) * span} stroke="var(--line-strong)" strokeWidth="0.25" strokeDasharray="1 1.2" /><text x="3.5" y={top + (1 - g) * span + 1} fontSize="2.8" textAnchor="end" fill={AX}>{g * 100}</text></g>)}
      {area && <path d={area} fill="url(#lcfill)" />}
      {path && <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />}
      {pts.map((p, i) => <g key={i}>{p.y !== null && <circle cx={p.x} cy={p.y} r="1.6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1"><title>{`${p.d.label}: ${Math.round((p.d.value as number) * 100)}%`}</title></circle>}<text x={p.x} y={H - 2.5} fontSize="3" textAnchor="middle" fill={AX}>{p.d.label}</text></g>)}
    </svg>
  );
}
export function Radar({ data, size = 240 }: { data: { label: string; value: number | null }[]; size?: number }) {
  const c = 50, r = 33, n = data.length; const ang = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, v: number) => [c + Math.cos(ang(i)) * r * v, c + Math.sin(ang(i)) * r * v];
  const poly = data.map((d, i) => pt(i, d.value ?? 0).join(',')).join(' ');
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Skill radar" className="mx-auto max-w-full">
      {[0.25, 0.5, 0.75, 1].map((g) => <polygon key={g} points={data.map((_, i) => pt(i, g).join(',')).join(' ')} fill={g === 1 ? 'var(--surface2)' : 'none'} fillOpacity=".55" stroke="var(--line-strong)" strokeWidth="0.25" />)}
      {data.map((_, i) => <line key={i} x1={c} y1={c} x2={pt(i, 1)[0]} y2={pt(i, 1)[1]} stroke="var(--line-strong)" strokeWidth="0.2" />)}
      <polygon points={poly} fill="var(--accent)" fillOpacity="0.24" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" />
      {data.map((d, i) => { const [x, y] = pt(i, d.value ?? 0); return d.value === null ? null : <circle key={i} cx={x} cy={y} r="1.3" fill="var(--accent)" />; })}
      {data.map((d, i) => { const [x, y] = pt(i, 1.25); return <text key={i} x={x} y={y} fontSize="3.8" fontWeight="600" textAnchor="middle" dominantBaseline="middle" fill="var(--ink)" opacity={d.value === null ? 0.4 : 1}>{d.label}</text>; })}
    </svg>
  );
}
const SHORT: Record<Stage, string> = { unseen: 'New', encountered: 'Seen', recognized: 'Recognised', recalled: 'Recalled', retained: 'Retained', mastered: 'Mastered' };
const STAGE_COLOR: Record<Stage, string> = { unseen: 'var(--surface3)', encountered: '#94a3b8', recognized: '#60a5fa', recalled: '#a78bfa', retained: '#34d399', mastered: '#fbbf24' };
export function StageBar({ counts }: { counts: Record<Stage, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return (
    <div>
      <div className="flex h-3.5 w-full gap-0.5 overflow-hidden rounded-full bg-surface2" role="img" aria-label="Vocabulary mastery stages">
        {STAGES.map((s) => <div key={s} className="first:rounded-l-full last:rounded-r-full" style={{ width: `${(counts[s] / total) * 100}%`, background: STAGE_COLOR[s] }} title={`${STAGE_LABEL[s]}: ${counts[s]}`} />)}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted sm:grid-cols-3">
        {STAGES.map((s) => <span key={s} className="inline-flex items-center gap-2"><i className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: STAGE_COLOR[s] }} /><span className="truncate">{SHORT[s]}</span><b className="tabular ml-auto text-ink">{counts[s]}</b></span>)}
      </div>
    </div>
  );
}
