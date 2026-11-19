// Character art (illustrated profile pictures) and the Teacher. Images live in src/assets/characters and are bundled by Vite.
import { useId } from 'react';
import type { AvatarConfig } from '../core/types';
import { normalizeAvatar, TIER_RING } from '../core/cosmetics';
import type { Mood } from '../core/teacher';
import alex from '../assets/characters/alex.webp';
import camille from '../assets/characters/camille.webp';
import leo from '../assets/characters/leo.webp';
import mei from '../assets/characters/mei.webp';
import marco from '../assets/characters/marco.webp';
import bolt from '../assets/characters/bolt.webp';
import ollie from '../assets/characters/ollie.webp';
import milo from '../assets/characters/milo.webp';
import pip from '../assets/characters/pip.webp';
import finn from '../assets/characters/finn.webp';
import lina from '../assets/characters/lina.webp';

export type { Mood };

const ART: Record<string, string> = { alex, camille, leo, mei, marco, bolt, ollie, milo, pip, finn };

/** Round character picture. When `tier` is given, a ring shows the learner's mastery tier. */
export function Avatar({ cfg, size = 64, label, tier, className = '' }: { cfg?: AvatarConfig | null; size?: number; label?: string; tier?: number; className?: string }) {
  const a = normalizeAvatar(cfg); const src = ART[a.char] ?? ART.alex;
  const ring = tier === undefined ? null : TIER_RING[Math.min(tier, TIER_RING.length - 1)];
  const pad = ring ? Math.max(2, Math.round(size * 0.04)) : 0;
  return (
    <span className={`relative inline-block shrink-0 rounded-full ${className}`} style={{ width: size, height: size, padding: pad, background: ring ?? undefined }} role="img" aria-label={label ?? 'Your character'}>
      <img src={src} alt="" draggable={false} width={size} height={size} className="h-full w-full rounded-full bg-surface2 object-cover" style={ring ? { boxShadow: '0 0 0 2px var(--surface)' } : undefined} />
    </span>
  );
}

const BADGE: Partial<Record<Mood, { emoji: string; bg: string }>> = {
  cheer: { emoji: '🎉', bg: '#fde047' }, think: { emoji: '💡', bg: '#a5f3fc' }, wave: { emoji: '👋', bg: '#fbcfe8' },
};

/** Teacher Lina. The mood adds a small badge so she still reacts to what is happening. */
export function TeacherAvatar({ size = 56, mood = 'happy', className = '' }: { size?: number; mood?: Mood; className?: string }) {
  useId(); const b = BADGE[mood]; const bs = Math.max(16, Math.round(size * 0.36));
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size }} role="img" aria-label="Teacher Lina">
      <img src={lina} alt="" draggable={false} width={size} height={size} className="h-full w-full rounded-full object-cover" />
      {b && <span aria-hidden className="absolute -right-0.5 -top-0.5 grid place-items-center rounded-full shadow ring-2 ring-surface" style={{ width: bs, height: bs, background: b.bg, fontSize: bs * 0.6, lineHeight: 1 }}>{b.emoji}</span>}
    </span>
  );
}
