import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');

export function Card({ children, className, ...r }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div {...r} className={cx('rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-sm', className)}>{children}</div>;
}
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'soft' | 'danger'; size?: 'sm' | 'md' | 'lg' };
export function Btn({ variant = 'primary', size = 'md', className, ...r }: BtnProps) {
  const v = { primary: 'bg-accent text-accent-ink font-semibold hover:brightness-110', ghost: 'border border-line text-ink hover:bg-surface2', soft: 'bg-surface2 text-ink hover:brightness-95', danger: 'bg-bad text-white font-semibold hover:brightness-110' }[variant];
  const s = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-[0.95rem]', lg: 'px-6 py-3.5 text-base' }[size];
  return <button {...r} className={cx('inline-flex items-center justify-center gap-2 rounded-xl transition active:scale-[.98]', v, s, className)} />;
}
export const Chip = ({ children, tone = 'plain', className }: { children: ReactNode; tone?: 'plain' | 'accent' | 'good' | 'warn' | 'bad'; className?: string }) => (
  <span className={cx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', tone === 'plain' && 'bg-surface2 text-muted', tone === 'accent' && 'bg-accent/15 text-ink', tone === 'good' && 'bg-good/15 text-good', tone === 'warn' && 'bg-warn/15 text-warn', tone === 'bad' && 'bg-bad/15 text-bad', className)}>{children}</span>
);
export const Progress = ({ value, className, label }: { value: number; className?: string; label?: string }) => (
  <div role="progressbar" aria-label={label} aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100} className={cx('h-2 w-full overflow-hidden rounded-full bg-surface2', className)}>
    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
  </div>
);
export const H1 = ({ children, sub }: { children: ReactNode; sub?: ReactNode }) => (
  <div className="mb-5"><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h1>{sub && <p className="mt-1 text-muted">{sub}</p>}</div>
);
export const Empty = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">{children}</div>;
export const Note = ({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) => (
  <div className={cx('rounded-xl border px-3.5 py-2.5 text-sm', tone === 'warn' ? 'border-warn/40 bg-warn/10' : 'border-line bg-surface2 text-muted')}>{children}</div>
);
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { id: T; label: string }[] }) {
  return (
    <div role="tablist" className="mb-4 inline-flex flex-wrap gap-1 rounded-xl bg-surface2 p-1">
      {items.map((i) => (
        <button key={i.id} role="tab" aria-selected={value === i.id} onClick={() => onChange(i.id)} className={cx('rounded-lg px-3 py-1.5 text-sm font-medium', value === i.id ? 'bg-surface shadow-sm' : 'text-muted hover:text-ink')}>{i.label}</button>
      ))}
    </div>
  );
}
export const Speak = ({ onClick, label = 'Play audio' }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick} aria-label={label} title={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface2 text-lg hover:brightness-95">🔊</button>
);
