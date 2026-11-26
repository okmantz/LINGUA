import { useId } from 'react';

/** Speech bubble + globe on a gradient tile. */
export function LogoMark({ size = 36, flat = false }: { size?: number; flat?: boolean }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="LINGUA" className="shrink-0">
      <defs>
        <linearGradient id={`lg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2dd4bf" /><stop offset=".55" stopColor="#3b82f6" /><stop offset="1" stopColor="#6366f1" /></linearGradient>
        <linearGradient id={`lh${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      {!flat && <><rect width="64" height="64" rx="17" fill={`url(#lg${id})`} /><rect width="64" height="64" rx="17" fill={`url(#lh${id})`} /></>}
      <path d="M15 12H49a6 6 0 0 1 6 6V38a6 6 0 0 1-6 6H29L19 53V44H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z" fill="#fff" />
      <g fill="none" stroke="#2563eb" strokeWidth="2.3" strokeLinecap="round"><circle cx="32" cy="28" r="10.5" /><ellipse cx="32" cy="28" rx="4.6" ry="10.5" /><path d="M21.500 28h21" /></g>
    </svg>
  );
}
export function Logo({ size = 34, tagline = false, className = '' }: { size?: number; tagline?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <div className="leading-none"><div className="text-[1.3rem] font-extrabold tracking-[-0.03em]">Lingua</div>{tagline && <div className="mt-1 text-[11px] font-medium text-muted">Learn. <span className="text-accent-strong">Speak.</span> Belong.</div>}</div>
    </div>
  );
}
