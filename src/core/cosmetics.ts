// Avatar parts, themes and unlock rules. Unlocks reward demonstrated mastery, not lesson counts.
export interface Part { id: number; name: string; unlock?: { tier?: number; ach?: string; label: string } }
export const SKINS = ['#f6d5b8', '#eab98f', '#d29a6a', '#b0764a', '#8a5634', '#5f3b24'];
export const HAIR_COLORS = ['#1b1b1f', '#4a2f1d', '#7a4a24', '#c58b3a', '#d9d4c7', '#8f2d2d', '#2f5d8a', '#4b3a7a'];
export const HAIR: Part[] = [
  { id: 0, name: 'Short' }, { id: 1, name: 'Wavy' }, { id: 2, name: 'Bun' }, { id: 3, name: 'Long' }, { id: 4, name: 'Buzz' },
  { id: 5, name: 'Curly', unlock: { tier: 1, label: 'Reach Novice' } }, { id: 6, name: 'Side sweep', unlock: { tier: 2, label: 'Reach Apprentice' } }, { id: 7, name: 'Bald' },
];
export const EYES: Part[] = [{ id: 0, name: 'Round' }, { id: 1, name: 'Calm' }, { id: 2, name: 'Bright' }, { id: 3, name: 'Sleepy' }];
export const MOUTHS: Part[] = [{ id: 0, name: 'Smile' }, { id: 1, name: 'Soft' }, { id: 2, name: 'Grin' }, { id: 3, name: 'Neutral' }];
export const ACCESSORIES: Part[] = [
  { id: 0, name: 'None' }, { id: 1, name: 'Glasses' }, { id: 2, name: 'Headphones' },
  { id: 3, name: 'Scarf', unlock: { tier: 1, label: 'Reach Novice' } },
  { id: 4, name: 'Beret', unlock: { ach: 'first-conversation', label: 'Complete a conversation' } },
  { id: 5, name: 'Earrings', unlock: { ach: 'words-retained-25', label: 'Retain 25 words' } },
  { id: 6, name: 'Round specs', unlock: { ach: 'streak-7', label: '7-day streak' } },
  { id: 7, name: 'Laurel', unlock: { tier: 5, label: 'Reach Expert' } },
];
export const OUTFITS: Part[] = [
  { id: 0, name: 'Slate' }, { id: 1, name: 'Teal' }, { id: 2, name: 'Amber' }, { id: 3, name: 'Rose' },
  { id: 4, name: 'Indigo', unlock: { tier: 2, label: 'Reach Apprentice' } }, { id: 5, name: 'Forest', unlock: { tier: 3, label: 'Reach Practitioner' } },
];
export const OUTFIT_COLORS = ['#334155', '#0f766e', '#b45309', '#be123c', '#4338ca', '#166534'];
export const BACKGROUNDS: Part[] = [
  { id: 0, name: 'Dusk' }, { id: 1, name: 'Mist' }, { id: 2, name: 'Sand' },
  { id: 3, name: 'Aurora', unlock: { ach: 'program-10', label: 'Finish programme day 10' } },
  { id: 4, name: 'Sunrise', unlock: { ach: 'program-30', label: 'Finish the 30-day programme' } },
  { id: 5, name: 'Ink', unlock: { tier: 4, label: 'Reach Adept' } },
  { id: 6, name: 'Gold hour', unlock: { tier: 6, label: 'Reach Master' } },
];
export const BG_GRADIENTS: [string, string][] = [['#1e293b', '#334155'], ['#dbeafe', '#e0e7ff'], ['#fde68a', '#fed7aa'], ['#0f766e', '#6d28d9'], ['#fb923c', '#f472b6'], ['#0b1020', '#1e1b4b'], ['#f59e0b', '#fde047']];
export const ACCENTS: { id: string; name: string; hex: string; unlock?: { tier: number; label: string } }[] = [
  { id: 'teal', name: 'Teal', hex: '#14b8a6' }, { id: 'indigo', name: 'Indigo', hex: '#6366f1' }, { id: 'amber', name: 'Amber', hex: '#f59e0b' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e' }, { id: 'emerald', name: 'Emerald', hex: '#10b981' },
  { id: 'violet', name: 'Violet', hex: '#8b5cf6', unlock: { tier: 2, label: 'Reach Apprentice' } },
  { id: 'sky', name: 'Sky', hex: '#0ea5e9', unlock: { tier: 3, label: 'Reach Practitioner' } },
];
export interface UnlockCtx { tier: number; ach: Record<string, number> }
export const isUnlocked = (p: { unlock?: { tier?: number; ach?: string } }, ctx: UnlockCtx) =>
  !p.unlock || (p.unlock.tier !== undefined && ctx.tier >= p.unlock.tier) || (p.unlock.ach !== undefined && !!ctx.ach[p.unlock.ach]);
