import { useEffect, useState } from 'react';
import type { Cefr } from '../core/types';
import { CEFR_ORDER } from '../core/types';
import { Btn, LEVEL_CAN, LEVEL_NAME, LevelBadge, Modal, levelBand, cx } from './ui';
import { Icon } from './Icon';

/** A plain list of the six levels, each with what it means, for choosing where to train. Used in onboarding, the dashboard and the placement result. */
export function LevelList({ value, onChange, hint }: { value: Cefr; onChange: (l: Cefr) => void; hint?: Partial<Record<Cefr, string>> }) {
  return (
    <div role="radiogroup" aria-label="Level" className="space-y-2">
      {CEFR_ORDER.map((l) => {
        const on = l === value;
        return (
          <button key={l} type="button" role="radio" aria-checked={on} onClick={() => onChange(l)} className={cx(levelBand(l), 'flex w-full items-center gap-3.5 rounded-2xl border-2 p-3 text-left transition active:scale-[.995]', on ? 'border-[color:var(--lv)] bg-[color-mix(in_srgb,var(--lv)_9%,var(--surface))]' : 'border-line bg-surface hover:border-line-strong hover:bg-surface2/60')}>
            <LevelBadge level={l} size="lg" solid={on} />
            <span className="min-w-0 flex-1"><span className="block font-bold leading-tight">{LEVEL_NAME[l]}{hint?.[l] && <span className="ml-2 text-xs font-semibold text-accent-strong">{hint[l]}</span>}</span><span className="mt-0.5 block text-sm leading-snug text-muted">{LEVEL_CAN[l]}</span></span>
            <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition', on ? 'border-[color:var(--lv)] bg-[color:var(--lv)] text-white' : 'border-line-strong')}>{on && <Icon name="check" size={14} strokeWidth={3} />}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Dialog: "Where do you want to train?" Changing it restarts the daily plan, lessons and word lists at that level. Nothing already learned is deleted. */
export function LevelPicker({ open, onClose, current, language, onChoose }: { open: boolean; onClose: () => void; current: Cefr; language: string; onChoose: (l: Cefr) => void }) {
  const [sel, setSel] = useState<Cefr>(current);
  useEffect(() => { if (open) setSel(current); }, [open, current]);
  return (
    <Modal open={open} onClose={onClose} title={`Your ${language} level`} wide>
      <p className="-mt-2 mb-4 text-sm text-muted">Daily sessions, words, grammar and conversations all start at the level you pick. You can change it any time, and nothing you have learned is lost.</p>
      <LevelList value={sel} onChange={setSel} hint={{ [current]: 'Current' } as Partial<Record<Cefr, string>>} />
      <div className="sticky bottom-0 -mx-1 mt-4 flex gap-2.5 bg-surface/90 px-1 pb-1 pt-3 backdrop-blur"><Btn variant="ghost" size="lg" onClick={onClose}>Cancel</Btn><Btn size="lg" className="flex-1" disabled={sel === current} onClick={() => { onChoose(sel); onClose(); }}>{sel === current ? 'Already here' : `Train at ${sel}`}</Btn></div>
    </Modal>
  );
}
