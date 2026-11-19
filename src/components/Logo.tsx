import { useId } from 'react';

/** Globe + speech bubble mark. */
export function LogoMark({ size = 36 }: { size?: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="LINGUA" className="shrink-0">
      <defs><linearGradient id={`lg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#2563eb" /></linearGradient></defs>
      <circle cx="32" cy="32" r="26" fill={`url(#lg${id})`} />
      <path d="M17 22c4-5 10-7 15-6 1 3-2 5-4 7s-1 4-4 5-6-1-7-6zM36 36c4-2 9-1 12 2-1 6-6 10-11 10-2-3-1-9-1-12z" fill="#4ade80" opacity=".95" />
      <path d="M6 38c0-14 11-26 26-26" fill="none" stroke="#fde047" strokeWidth="3.4" strokeLinecap="round" opacity=".95" />
      <path d="M26 30h25a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H40l-7 6v-6h-7a5 5 0 0 1-5-5v-8a5 5 0 0 1 5-5z" fill="#fff" />
      <circle cx="31" cy="39" r="2" fill="#1d4ed8" /><circle cx="38.5" cy="39" r="2" fill="#1d4ed8" /><circle cx="46" cy="39" r="2" fill="#1d4ed8" />
    </svg>
  );
}
export function Logo({ size = 34, tagline = false }: { size?: number; tagline?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div className="leading-none"><div className="text-[1.35rem] font-extrabold tracking-tight">Lingua</div>{tagline && <div className="mt-1 text-[11px] font-medium text-muted">Learn. <span className="text-accent">Speak.</span> Belong.</div>}</div>
    </div>
  );
}
