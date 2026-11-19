import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');

export function Card({ children, className, ...r }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...r} className={cx('rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-5', className)}>{children}</div>;
}
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'soft' | 'danger'; size?: 'sm' | 'md' | 'lg' };
export function Btn({ variant = 'primary', size = 'md', className, ...r }: BtnProps) {
  const v = {
    primary: 'bg-accent text-accent-ink font-semibold shadow-sm hover:brightness-110',
    ghost: 'border border-line bg-surface text-ink hover:bg-surface2',
    soft: 'bg-surface2 text-ink hover:brightness-95',
    danger: 'bg-bad text-white font-semibold hover:brightness-110',
  }[variant];
  const s = { sm: 'min-h-9 px-3 py-1.5 text-sm', md: 'min-h-11 px-4 py-2.5 text-[0.95rem]', lg: 'min-h-12 px-6 py-3 text-base' }[size];
  return <button {...r} className={cx('inline-flex select-none items-center justify-center gap-2 rounded-xl transition active:scale-[.98]', v, s, className)} />;
}
export const Chip = ({ children, tone = 'plain', className }: { children: ReactNode; tone?: 'plain' | 'accent' | 'good' | 'warn' | 'bad'; className?: string }) => (
  <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', tone === 'plain' && 'bg-surface2 text-muted', tone === 'accent' && 'bg-accent/15 text-ink', tone === 'good' && 'bg-good/15 text-good', tone === 'warn' && 'bg-warn/15 text-warn', tone === 'bad' && 'bg-bad/15 text-bad', className)}>{children}</span>
);
export const Progress = ({ value, className, label }: { value: number; className?: string; label?: string }) => (
  <div role="progressbar" aria-label={label} aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100} className={cx('h-2 w-full overflow-hidden rounded-full bg-surface2', className)}>
    <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
  </div>
);
export const H1 = ({ children, sub, right }: { children: ReactNode; sub?: ReactNode; right?: ReactNode }) => (
  <div className="mb-5 flex items-start gap-3"><div className="min-w-0 flex-1"><h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h1>{sub && <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{sub}</p>}</div>{right}</div>
);
export const SectionTitle = ({ children, right }: { children: ReactNode; right?: ReactNode }) => (
  <div className="mb-2.5 mt-6 flex items-center justify-between px-0.5"><h2 className="text-[0.8rem] font-bold uppercase tracking-wider text-muted">{children}</h2>{right}</div>
);
export const Empty = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">{children}</div>;
export const Note = ({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) => (
  <div className={cx('rounded-xl border px-3.5 py-2.5 text-sm leading-relaxed', tone === 'warn' ? 'border-warn/40 bg-warn/10' : 'border-line bg-surface2 text-muted')}>{children}</div>
);
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { id: T; label: string }[] }) {
  return (
    <div className="no-scrollbar -mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div role="tablist" className="inline-flex gap-1 rounded-xl bg-surface2 p-1">
        {items.map((i) => (
          <button key={i.id} role="tab" aria-selected={value === i.id} onClick={() => onChange(i.id)} className={cx('min-h-9 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition', value === i.id ? 'bg-surface shadow-sm' : 'text-muted hover:text-ink')}>{i.label}</button>
        ))}
      </div>
    </div>
  );
}
export const Speak = ({ onClick, label = 'Play audio' }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick} aria-label={label} title={label} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface2 text-lg transition hover:brightness-95 active:scale-95">🔊</button>
);

/** Round icon badge used on list rows and tiles. */
export const IconBadge = ({ name, tone = 'accent', size = 40 }: { name: IconName; tone?: 'accent' | 'plain' | 'good' | 'warn'; size?: number }) => (
  <span className={cx('grid shrink-0 place-items-center rounded-xl', tone === 'accent' && 'bg-accent/15 text-accent', tone === 'plain' && 'bg-surface2 text-muted', tone === 'good' && 'bg-good/15 text-good', tone === 'warn' && 'bg-warn/15 text-warn')} style={{ width: size, height: size }}><Icon name={name} size={Math.round(size * 0.5)} /></span>
);

/** Circular progress (daily goal). */
export function Ring({ value, size = 84, stroke = 8, children, tone = 'var(--accent)' }: { value: number; size?: number; stroke?: number; children?: ReactNode; tone?: string }) {
  const r = (size - stroke) / 2; const c = 2 * Math.PI * r; const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity=".14" strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: 'stroke-dashoffset .6s ease' }} /></svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

/** Bottom sheet for mobile menus. */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return; const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', h);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; ref.current?.focus();
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fade-in absolute inset-0 bg-black/50" onClick={onClose} />
      <div ref={ref} tabIndex={-1} className="sheet-in safe-bottom absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface p-4 pb-6 shadow-[var(--shadow-lg)] outline-none">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line" />
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-surface2"><Icon name="x" size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}
