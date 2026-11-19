import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { CHARACTERS, isUnlocked, type UnlockCtx } from '../core/cosmetics';
import { cx } from './ui';

/** Pick one of a few designed characters. Two are earned through mastery, so there is something to look forward to. */
export function CharacterPicker({ value, onChange, ctx }: { value: string; onChange: (id: string) => void; ctx: UnlockCtx }) {
  const cur = CHARACTERS.find((c) => c.id === value) ?? CHARACTERS[0];
  return (
    <div>
      <div className="mb-4 flex items-center gap-4 rounded-2xl bg-surface2 p-3.5">
        <Avatar cfg={{ char: cur.id }} size={76} tier={ctx.tier} />
        <div className="min-w-0"><p className="text-lg font-bold leading-tight">{cur.name}</p><p className="text-sm text-muted">{cur.blurb}</p></div>
      </div>
      <div className="grid grid-cols-4 gap-2.5" role="radiogroup" aria-label="Choose your character">
        {CHARACTERS.map((c) => {
          const ok = isUnlocked(c, ctx); const on = value === c.id;
          return (
            <button key={c.id} role="radio" aria-checked={on} disabled={!ok} onClick={() => onChange(c.id)} title={ok ? c.name : `Locked: ${c.unlock?.label}`}
              className={cx('relative flex flex-col items-center gap-1 rounded-2xl border-2 p-1.5 pb-2 transition', on ? 'border-accent bg-accent/10' : 'border-transparent hover:bg-surface2', !ok && 'opacity-60')}>
              <span className="relative"><Avatar cfg={{ char: c.id }} size={64} className={cx(!ok && 'grayscale')} />{!ok && <span className="absolute inset-0 grid place-items-center rounded-full bg-black/35 text-white"><Icon name="lock" size={20} /></span>}</span>
              <span className="text-xs font-semibold">{c.name}</span>
              {!ok && <span className="text-[10px] leading-tight text-muted">{c.unlock?.label}</span>}
              {on && <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-ink"><Icon name="check" size={13} strokeWidth={3} /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
