// FSRS-4.5 scheduler (Free Spaced Repetition Scheduler) — pure functions, no I/O.
// Reference: open-spaced-repetition/fsrs4anki wiki, "The Algorithm" (FSRS-4.5 default parameters).
import type { Card, Grade } from './types';

export const W = [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755];
export const DECAY = -0.5;
export const FACTOR = 19 / 81;
export const DAY = 86_400_000;
export const REQUEST_RETENTION = 0.9;
export const MAX_INTERVAL_DAYS = 365;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clampD = (d: number) => clamp(d, 1, 10);

/** Probability of recall after t days with stability s. */
export const retrievability = (t: number, s: number) => Math.pow(1 + (FACTOR * t) / s, DECAY);
/** Days until retrievability falls to r. */
export const nextIntervalDays = (s: number, r = REQUEST_RETENTION) =>
  clamp(Math.round((s / FACTOR) * (Math.pow(r, 1 / DECAY) - 1)), 1, MAX_INTERVAL_DAYS);

const initS = (g: Grade) => Math.max(W[g - 1], 0.1);
const initD = (g: Grade) => clampD(W[4] - (g - 3) * W[5]);
const nextD = (d: number, g: Grade) => {
  const nd = d - W[6] * (g - 3);
  return clampD(W[7] * initD(3) + (1 - W[7]) * nd);
};
const recallS = (d: number, s: number, r: number, g: Grade) => {
  const hard = g === 2 ? W[15] : 1;
  const easy = g === 4 ? W[16] : 1;
  return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.exp(W[10] * (1 - r)) - 1) * hard * easy);
};
const forgetS = (d: number, s: number, r: number) =>
  Math.min(s, W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r)));

export const newCard = (lang: string, itemId: string, kind: Card['kind'], now: number): Card => ({
  key: `${lang}:${itemId}`, lang, itemId, kind, state: 0, due: now, stability: 0, difficulty: 0,
  reps: 0, lapses: 0, last: 0, firstSeen: now, days: [], modes: {},
});

export const dayKey = (ts: number) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** Pure update: returns the new card after a review with grade g at time `now`. */
export function review(card: Card, g: Grade, now: number): Card {
  const c: Card = { ...card, days: [...card.days] };
  if (c.state === 0 || c.stability === 0) {
    c.stability = initS(g);
    c.difficulty = initD(g);
  } else {
    const t = Math.max(0, (now - c.last) / DAY);
    const r = retrievability(t, c.stability);
    if (g === 1) {
      c.stability = forgetS(c.difficulty, c.stability, r);
      c.lapses += 1;
    } else {
      c.stability = recallS(c.difficulty, c.stability, r, g);
    }
    c.difficulty = nextD(c.difficulty, g);
  }
  c.reps += 1;
  c.last = now;
  const dk = dayKey(now);
  if (!c.days.includes(dk)) c.days = [...c.days, dk].slice(-60);
  if (g === 1) {
    c.state = c.state === 0 ? 1 : 3;
    c.due = now + 10 * 60_000; // re-see within the session / 10 min
  } else if (c.state === 0 || c.state === 1 || c.state === 3) {
    // Graduate after a success; "Hard" on a brand-new card stays in learning for a short step.
    if (g === 2 && c.state === 0) { c.state = 1; c.due = now + 30 * 60_000; }
    else { c.state = 2; c.due = now + nextIntervalDays(c.stability) * DAY; }
  } else {
    c.state = 2;
    const iv = nextIntervalDays(c.stability);
    c.due = now + (g === 2 ? Math.max(1, Math.round(iv * 0.8)) : iv) * DAY;
  }
  return c;
}

export const isDue = (c: Card, now: number) => c.due <= now;
/** Current predicted recall probability. */
export const currentRecall = (c: Card, now: number) =>
  c.stability > 0 ? retrievability(Math.max(0, (now - c.last) / DAY), c.stability) : 0;
