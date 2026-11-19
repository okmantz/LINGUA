import { STAGES, STAGE_LABEL, type Stage } from '../core/mastery';

const AX = 'var(--muted)';
export function BarChart({ data, height = 140, unit = '' }: { data: { label: string; value: number }[]; height?: number; unit?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value)); const w = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height / 2}`} preserveAspectRatio="none" className="w-full" style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d, i) => { const h = (d.value / max) * (height / 2 - 8); return (
        <g key={i}><rect x={i * w + w * 0.15} y={height / 2 - 6 - h} width={w * 0.7} height={Math.max(h, d.value > 0 ? 0.8 : 0)} rx="1" fill="var(--accent)" opacity={d.value > 0 ? 1 : 0.2}><title>{`${d.label}: ${Math.round(d.value * 10) / 10}${unit}`}</title></rect></g>
      ); })}
      <line x1="0" x2="100" y1={height / 2 - 6} y2={height / 2 - 6} stroke={AX} strokeWidth="0.3" />
    </svg>
  );
}
export function LineChart({ data, height = 140 }: { data: { label: string; value: number | null }[]; height?: number }) {
  const pts = data.map((d, i) => ({ x: (i / Math.max(1, data.length - 1)) * 92 + 4, y: d.value === null ? null : 6 + (1 - d.value) * (height / 2 - 18), d }));
  const path = pts.filter((p) => p.y !== null).map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
  return (
    <svg viewBox={`0 0 100 ${height / 2}`} className="w-full" style={{ height }} role="img" aria-label="Accuracy over time">
      {[0, 0.5, 1].map((g) => <line key={g} x1="4" x2="96" y1={6 + (1 - g) * (height / 2 - 18)} y2={6 + (1 - g) * (height / 2 - 18)} stroke={AX} strokeWidth="0.2" strokeDasharray="1 1" />)}
      {path && <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round" />}
      {pts.map((p, i) => <g key={i}>{p.y !== null && <circle cx={p.x} cy={p.y} r="1.4" fill="var(--accent)"><title>{`${p.d.label}: ${Math.round((p.d.value as number) * 100)}%`}</title></circle>}<text x={p.x} y={height / 2 - 3} fontSize="3.2" textAnchor="middle" fill={AX}>{p.d.label}</text></g>)}
    </svg>
  );
}
export function Radar({ data, size = 220 }: { data: { label: string; value: number | null }[]; size?: number }) {
  const c = 50, r = 34, n = data.length; const ang = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, v: number) => [c + Math.cos(ang(i)) * r * v, c + Math.sin(ang(i)) * r * v];
  const poly = data.map((d, i) => pt(i, d.value ?? 0).join(',')).join(' ');
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Skill radar" className="mx-auto">
      {[0.25, 0.5, 0.75, 1].map((g) => <polygon key={g} points={data.map((_, i) => pt(i, g).join(',')).join(' ')} fill="none" stroke={AX} strokeWidth="0.2" />)}
      {data.map((_, i) => <line key={i} x1={c} y1={c} x2={pt(i, 1)[0]} y2={pt(i, 1)[1]} stroke={AX} strokeWidth="0.15" />)}
      <polygon points={poly} fill="var(--accent)" fillOpacity="0.28" stroke="var(--accent)" strokeWidth="0.9" />
      {data.map((d, i) => { const [x, y] = pt(i, 1.22); return <text key={i} x={x} y={y} fontSize="4" textAnchor="middle" dominantBaseline="middle" fill="var(--ink)" opacity={d.value === null ? 0.4 : 1}>{d.label}</text>; })}
    </svg>
  );
}
const STAGE_COLOR: Record<Stage, string> = { unseen: 'var(--surface2)', encountered: '#94a3b8', recognized: '#60a5fa', recalled: '#a78bfa', retained: '#34d399', mastered: '#fbbf24' };
export function StageBar({ counts }: { counts: Record<Stage, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full border border-line" role="img" aria-label="Vocabulary mastery stages">
        {STAGES.map((s) => <div key={s} style={{ width: `${(counts[s] / total) * 100}%`, background: STAGE_COLOR[s] }} title={`${STAGE_LABEL[s]}: ${counts[s]}`} />)}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {STAGES.map((s) => <span key={s} className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: STAGE_COLOR[s] }} />{STAGE_LABEL[s].split(' ')[0]} {counts[s]}</span>)}
      </div>
    </div>
  );
}
