import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { stopSpeaking, useSpeechState } from '../core/speech';
import { Icon, type IconName } from './Icon';

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');

/* ───────────── Surfaces ───────────── */
export function Card({ children, className, hover, ...r }: { children: ReactNode; className?: string; hover?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...r} className={cx('card p-4 sm:p-5', hover && 'card-hover', className)}>{children}</div>;
}

/* ───────────── Buttons ───────────── */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'soft' | 'danger' | 'quiet'; size?: 'sm' | 'md' | 'lg' };
export function Btn({ variant = 'primary', size = 'md', className, type = 'button', ...r }: BtnProps) {
  const v = {
    primary: 'btn-primary',
    ghost: 'border border-line-strong bg-surface text-ink font-semibold shadow-[var(--shadow-xs)] hover:bg-surface2',
    soft: 'bg-surface2 text-ink font-semibold hover:bg-surface3',
    quiet: 'text-muted font-semibold hover:bg-surface2 hover:text-ink',
    danger: 'bg-bad text-white font-semibold shadow-[var(--shadow-xs)] hover:brightness-110',
  }[variant];
  const s = { sm: 'min-h-9 rounded-lg px-3 py-1.5 text-sm', md: 'min-h-11 rounded-xl px-4 py-2.5 text-[0.95rem]', lg: 'min-h-13 rounded-2xl px-6 py-3.5 text-base' }[size];
  return <button {...r} type={type} className={cx('inline-flex select-none items-center justify-center gap-2 whitespace-nowrap transition duration-150 active:scale-[.98]', v, s, className)} />;
}

/* ───────────── Small pieces ───────────── */
export const Chip = ({ children, tone = 'plain', className }: { children: ReactNode; tone?: 'plain' | 'accent' | 'good' | 'warn' | 'bad'; className?: string }) => (
  <span className={cx('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold', tone === 'plain' && 'bg-surface2 text-muted', tone === 'accent' && 'bg-accent/15 text-accent-strong', tone === 'good' && 'bg-good/12 text-good', tone === 'warn' && 'bg-warn/12 text-warn', tone === 'bad' && 'bg-bad/12 text-bad', className)}>{children}</span>
);
export const Progress = ({ value, className, label, tone = 'accent' }: { value: number; className?: string; label?: string; tone?: 'accent' | 'good' | 'warn' }) => (
  <div role="progressbar" aria-label={label} aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100} className={cx('h-2 w-full overflow-hidden rounded-full bg-surface2', className)}>
    <div className={cx('h-full rounded-full transition-[width] duration-700 ease-out', tone === 'accent' && 'bg-[linear-gradient(90deg,var(--accent),color-mix(in_oklab,var(--accent)_72%,#6366f1))]', tone === 'good' && 'bg-good', tone === 'warn' && 'bg-warn')} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
  </div>
);

/** Page header. `eyebrow` is the small label above the title. */
export const H1 = ({ children, sub, right, eyebrow }: { children: ReactNode; sub?: ReactNode; right?: ReactNode; eyebrow?: ReactNode }) => (
  <header className="mb-6 flex items-start gap-3">
    <div className="min-w-0 flex-1">
      {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
      <h1 className="text-[1.65rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-[2rem]">{children}</h1>
      {sub && <p className="mt-1.5 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{sub}</p>}
    </div>
    {right && <div className="shrink-0">{right}</div>}
  </header>
);
export const SectionTitle = ({ children, right }: { children: ReactNode; right?: ReactNode }) => (
  <div className="mb-3 mt-8 flex items-center justify-between gap-3 px-0.5 first:mt-0"><h2 className="eyebrow">{children}</h2>{right}</div>
);
export const Empty = ({ children, icon = 'sparkles', title }: { children: ReactNode; icon?: IconName; title?: string }) => (
  <div className="rounded-2xl border border-dashed border-line-strong bg-surface/50 px-6 py-10 text-center">
    <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-surface2 text-muted"><Icon name={icon} size={22} /></span>
    {title && <p className="font-semibold">{title}</p>}
    <div className="mx-auto max-w-sm text-sm text-muted">{children}</div>
  </div>
);
export const Note = ({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) => (
  <div className={cx('flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-relaxed', tone === 'warn' ? 'border-warn/30 bg-warn/8 text-ink' : 'border-line bg-surface2/70 text-muted')}>
    <Icon name={tone === 'warn' ? 'alert' : 'info'} size={17} className={cx('mt-0.5 shrink-0', tone === 'warn' ? 'text-warn' : 'text-faint')} /><div className="min-w-0 flex-1">{children}</div>
  </div>
);

/** Segmented control (scrolls sideways on narrow screens). */
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { id: T; label: string }[] }) {
  return (
    <div className="no-scrollbar -mx-4 mb-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div role="tablist" className="inline-flex gap-1 rounded-xl bg-surface2 p-1">
        {items.map((i) => (
          <button key={i.id} role="tab" aria-selected={value === i.id} onClick={() => onChange(i.id)} className={cx('min-h-9 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-semibold transition', value === i.id ? 'bg-surface text-ink shadow-[var(--shadow-xs)] ring-1 ring-line' : 'text-muted hover:text-ink')}>{i.label}</button>
        ))}
      </div>
    </div>
  );
}
/** Equal-width choice group, used for settings such as the theme. */
export function Segmented<T extends string>({ value, onChange, items, label }: { value: T; onChange: (v: T) => void; items: { id: T; label: string; icon?: IconName }[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-1 rounded-xl bg-surface2 p-1" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((i) => <button key={i.id} role="radio" aria-checked={value === i.id} onClick={() => onChange(i.id)} className={cx('flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold transition', value === i.id ? 'bg-surface text-ink shadow-[var(--shadow-xs)] ring-1 ring-line' : 'text-muted hover:text-ink')}>{i.icon && <Icon name={i.icon} size={16} />}{i.label}</button>)}
    </div>
  );
}
export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={cx('relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200', on ? 'bg-accent' : 'bg-surface3')}>
      <span className={cx('absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-200', on ? 'left-[22px]' : 'left-0.5')} />
    </button>
  );
}
/** Text input with a leading icon. */
export function SearchInput({ value, onChange, placeholder, label, className }: { value: string; onChange: (v: string) => void; placeholder: string; label: string; className?: string }) {
  return (
    <label className={cx('relative block', className)}>
      <span className="sr-only">{label}</span>
      <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 w-full rounded-xl border border-line-strong bg-surface pl-10 pr-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" />
    </label>
  );
}
export const Select = ({ className, children, ...r }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <span className={cx('relative inline-flex', className)}><select {...r} className="h-11 w-full appearance-none rounded-xl border border-line-strong bg-surface pl-3 pr-9 text-sm font-medium outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15">{children}</select><Icon name="down" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint" /></span>
);
export const Skeleton = ({ className }: { className?: string }) => <div className={cx('skeleton', className)} aria-hidden />;
export const Kbd = ({ children }: { children: ReactNode }) => <kbd className="inline-grid h-5 min-w-5 place-items-center rounded-md border border-line-strong bg-surface2 px-1 text-[11px] font-semibold text-muted">{children}</kbd>;

/** Speaker button. Shows a pulsing "playing" state while its own audio is on, and stops it when tapped again. */
export function Speak({ onClick, label = 'Play audio', size = 40, wide = false }: { onClick: () => void; label?: string; size?: number; wide?: boolean }) {
  const { playing } = useSpeechState(); const [mine, setMine] = useState(false); const live = useRef(playing); live.current = playing;
  useEffect(() => { if (!playing) setMine(false); }, [playing]);
  const on = mine && playing;
  const tap = () => {
    if (on) { stopSpeaking(); setMine(false); return; }
    setMine(true); onClick();
    setTimeout(() => { if (!live.current) setMine(false); }, 1800);
  };
  return (
    <button type="button" onClick={tap} aria-label={on ? 'Stop audio' : label} title={on ? 'Stop audio' : label} aria-pressed={on} style={wide ? { minHeight: size } : { width: size, height: size }}
      className={cx('relative shrink-0 transition active:scale-95', wide ? 'inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 text-base font-bold' : 'inline-grid place-items-center rounded-full', on ? 'bg-accent text-accent-ink' : 'bg-accent/15 text-accent-strong hover:bg-accent/25')}>
      {on && !wide && <span className="ping-soft absolute inset-0 rounded-full bg-accent/50" aria-hidden />}
      <Icon name={on ? 'stop' : 'volume'} size={wide ? 22 : Math.round(size * 0.48)} className="relative" />
      {wide && <span className="relative">{on ? 'Playing… tap to stop' : label}</span>}
    </button>
  );
}

/** Rounded icon tile used on list rows. */
export const IconBadge = ({ name, tone = 'accent', size = 40 }: { name: IconName; tone?: 'accent' | 'plain' | 'good' | 'warn' | 'solid'; size?: number }) => (
  <span className={cx('grid shrink-0 place-items-center rounded-xl', tone === 'accent' && 'bg-accent/14 text-accent-strong', tone === 'plain' && 'bg-surface2 text-muted', tone === 'good' && 'bg-good/12 text-good', tone === 'warn' && 'bg-warn/12 text-warn', tone === 'solid' && 'bg-accent text-accent-ink')} style={{ width: size, height: size }}><Icon name={name} size={Math.round(size * 0.5)} /></span>
);

/** Big-number tile. */
export function Stat({ icon, label, value, sub, tone = 'accent', children }: { icon: IconName; label: string; value?: ReactNode; sub?: ReactNode; tone?: 'accent' | 'good' | 'warn' | 'plain'; children?: ReactNode }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center gap-2 text-muted"><IconBadge name={icon} tone={tone} size={28} /><span className="text-[0.8rem] font-semibold">{label}</span></div>
      {value !== undefined && <p className="tabular mt-2.5 text-[1.9rem] font-extrabold leading-none tracking-tight">{value}</p>}
      {sub && <p className="mt-1.5 text-xs text-muted">{sub}</p>}{children}
    </Card>
  );
}

/** Circular progress (daily goal). */
export function Ring({ value, size = 84, stroke = 8, children, tone = 'var(--accent)', track = 'var(--ring-track)' }: { value: number; size?: number; stroke?: number; children?: ReactNode; tone?: string; track?: string }) {
  const r = (size - stroke) / 2; const c = 2 * Math.PI * r; const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)' }} /></svg>
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
      <div className="fade-in absolute inset-0 bg-[#060a14]/55 backdrop-blur-[2px]" onClick={onClose} />
      <div ref={ref} tabIndex={-1} className="sheet-in absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-[1.75rem] border-t border-line bg-surface px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[var(--shadow-lg)] outline-none">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line-strong" />
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-extrabold tracking-tight">{title}</h2><button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-surface2 text-muted hover:text-ink"><Icon name="x" size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}
