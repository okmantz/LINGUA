// Characters, accent colours and unlock rules. Unlocks reward demonstrated mastery, not lesson counts.
import type { AvatarConfig } from './types';

export interface Unlock { tier?: number; ach?: string; label: string }
export interface Part { id: number; name: string; unlock?: Unlock }

export interface Character { id: string; name: string; kind: 'person' | 'mascot'; blurb: string; unlock?: Unlock }
/** A short, curated cast instead of a full avatar builder: six are free, two are earned. */
export const CHARACTERS: Character[] = [
  { id: 'alex', name: 'Alex', kind: 'person', blurb: 'Curious and always on the move' },
  { id: 'camille', name: 'Camille', kind: 'person', blurb: 'Café conversations, any language' },
  { id: 'mei', name: 'Mei', kind: 'person', blurb: 'Learns best with headphones on' },
  { id: 'omar', name: 'Omar', kind: 'person', blurb: 'Thoughtful, patient, well read' },
  { id: 'ollie', name: 'Ollie', kind: 'mascot', blurb: 'The wise owl of vocabulary' },
  { id: 'pip', name: 'Pip', kind: 'mascot', blurb: 'Calm panda, steady progress' },
  { id: 'finn', name: 'Finn', kind: 'mascot', blurb: 'Quick fox, quick learner', unlock: { tier: 1, label: 'Reach Novice' } },
  { id: 'bolt', name: 'Bolt', kind: 'mascot', blurb: 'Friendly robot, zero downtime', unlock: { tier: 2, label: 'Reach Apprentice' } },
];
export const DEFAULT_CHARACTER = 'alex';

/** Old saves stored a custom face. Map it to the closest character so nobody lands on a stranger. */
export function normalizeAvatar(a: Partial<AvatarConfig> | null | undefined): AvatarConfig {
  if (a && typeof a.char === 'string' && CHARACTERS.some((c) => c.id === a.char)) return a as AvatarConfig;
  const old = a ?? {};
  const char = old.hair === 3 ? 'camille' : old.accessory === 2 ? 'mei' : old.accessory === 1 || old.accessory === 6 ? 'omar' : DEFAULT_CHARACTER;
  return { char };
}

export const ACCENTS: { id: string; name: string; hex: string; unlock?: { tier: number; label: string } }[] = [
  { id: 'teal', name: 'Teal', hex: '#14b8a6' }, { id: 'indigo', name: 'Indigo', hex: '#6366f1' }, { id: 'amber', name: 'Amber', hex: '#f59e0b' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e' }, { id: 'emerald', name: 'Emerald', hex: '#10b981' },
  { id: 'violet', name: 'Violet', hex: '#8b5cf6', unlock: { tier: 2, label: 'Reach Apprentice' } },
  { id: 'sky', name: 'Sky', hex: '#0ea5e9', unlock: { tier: 3, label: 'Reach Practitioner' } },
];

/** Readable text colour for a given accent background (WCAG relative luminance). */
export function inkFor(hex: string): string {
  const n = parseInt(hex.slice(1), 16); const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  const L = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  return L > 0.32 ? '#06201c' : '#ffffff';
}

export interface UnlockCtx { tier: number; ach: Record<string, number> }
export const isUnlocked = (p: { unlock?: { tier?: number; ach?: string } }, ctx: UnlockCtx) =>
  !p.unlock || (p.unlock.tier !== undefined && ctx.tier >= p.unlock.tier) || (p.unlock.ach !== undefined && !!ctx.ach[p.unlock.ach]);

/** Tier ring colours around the avatar: a quiet, visible sign of mastery. */
export const TIER_RING = ['#94a3b8', '#34d399', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fbbf24'];
