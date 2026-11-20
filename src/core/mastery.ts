// Mastery model: a word is never "mastered" because it was answered correctly once.
import type { Card, Mode } from './types';
import { currentRecall } from './fsrs';

export type Stage = 'unseen' | 'encountered' | 'recognized' | 'recalled' | 'retained' | 'mastered';
export const STAGES: Stage[] = ['unseen', 'encountered', 'recognized', 'recalled', 'retained', 'mastered'];
export const STAGE_LABEL: Record<Stage, string> = {
  unseen: 'Not yet seen', encountered: 'Encountered', recognized: 'Recognized', recalled: 'Recalled', retained: 'Retained', mastered: 'Mastered',
};
export const STAGE_RULE: Record<Stage, string> = {
  unseen: 'No exposure yet.',
  encountered: 'Shown to you, but no successful test yet.',
  recognized: 'Correctly picked from choices (recognition or listening).',
  recalled: 'Correctly produced from memory (recall, cloze or typed) at least once.',
  retained: 'Recalled on ≥2 different days, ≥3 successful reviews, memory stability ≥ 7 days, and predicted recall still ≥ 70%.',
  mastered: 'Retained, stability ≥ 21 days, reviewed on ≥3 days, ≤ 1/3 lapses, and recalled in production (typed/cloze).',
};
const ok = (c: Card, ...ms: Mode[]) => ms.reduce((n, m) => n + (c.modes[m]?.ok ?? 0), 0);
const successes = (c: Card) => (Object.keys(c.modes) as Mode[]).reduce((n, m) => n + (c.modes[m]?.ok ?? 0), 0);

export function stageOf(c: Card | undefined, now = Date.now()): Stage {
  if (!c) return 'unseen';
  if (successes(c) === 0) return 'encountered';
  const recalled = ok(c, 'rev', 'cloze', 'produce', 'dictate') > 0;
  if (!recalled) return 'recognized';
  const retained = c.state === 2 && c.reps >= 3 && c.days.length >= 2 && c.stability >= 7 && currentRecall(c, now) >= 0.7;
  if (!retained) return 'recalled';
  const produced = ok(c, 'cloze', 'produce') > 0;
  if (c.stability >= 21 && c.days.length >= 3 && produced && c.lapses * 3 <= c.reps) return 'mastered';
  return 'retained';
}

export const stageCounts = (cards: Card[], total: number, now = Date.now()) => {
  const out: Record<Stage, number> = { unseen: 0, encountered: 0, recognized: 0, recalled: 0, retained: 0, mastered: 0 };
  for (const c of cards) out[stageOf(c, now)]++;
  out.unseen = Math.max(0, total - cards.length);
  return out;
};
/** Cumulative: how many words have reached at least this stage. */
export const reached = (counts: Record<Stage, number>, s: Stage) => STAGES.slice(STAGES.indexOf(s)).reduce((n, k) => n + counts[k], 0);
