// Adaptive placement test, A1 → C2.
//
// Why this replaced the old 4-questions-per-level staircase:
//  • A four-choice question is answered correctly 25 % of the time by guessing, so a short staircase over-places people.
//  • A staircase throws away everything except "how many right at this level".
//
// How it works now (a small item-response-theory model, no server needed):
//  • Every item has a difficulty b on the CEFR scale (A1 = 0 … C2 = 5; `shift` fine-tunes it, e.g. typing a word is harder than recognising it).
//  • P(correct | ability θ) = g + (1 − g) · logistic(a · (θ − b)), where g is the chance of guessing (1 / number of choices; ≈0 for typed answers).
//  • After every answer we update a posterior over θ on a grid, pick the next item that tells us the most about the current estimate,
//    and stop when the estimate is precise (or after MAX_ITEMS).
//  • "I don't know" is treated as evidence of *not knowing* (no guess credit), which is more informative than a random guess.
//  • The reported level is conservative: a level counts as reached when the learner would know about three quarters of its items
//    (θ ≥ level + MARGIN), shaded down slightly while the estimate is still uncertain.
// Honest limits: it only measures what this app's items measure (vocabulary in context, grammar, reading, listening), not speaking or
// writing; C1/C2 results need a human examiner to confirm.
import type { Cefr, Exercise, PlacementItem, PlacementResult, Skill, VocabEntry } from './types';
import { CEFR_ORDER, SKILLS, cefrIndex } from './types';
import { clozeOf, makeExercise } from './exercises';
import { coreWord, shuffle } from './text';

export const PLACEMENT_LEVELS: Cefr[] = CEFR_ORDER;
export const MIN_ITEMS = 12;
export const MAX_ITEMS = 32;
export const MARGIN = 0.65;       // θ above a level's difficulty at which ~75 % of that level's items are known
const A = 1.7;                    // discrimination (same for every item)
const GRID = Array.from({ length: 81 }, (_, i) => -1.5 + i * 0.1);   // θ from -1.5 to 6.5
const PRIOR_MEAN = 1.0, PRIOR_SD = 2.0;

export interface Served { item: PlacementItem; correct: boolean; skipped?: boolean }
export interface PState { served: Served[]; done: boolean; theta: number; sd: number }

const logistic = (x: number) => 1 / (1 + Math.exp(-x));
export const difficulty = (it: PlacementItem) => cefrIndex(it.level) + (it.shift ?? 0);
/** Chance of getting the item right without knowing anything. */
export const guessRate = (ex: Exercise): number =>
  ex.kind === 'mcq' ? 1 / ex.choices.length : ex.kind === 'order' ? 0.04 : 0.02;
const pKnow = (theta: number, b: number) => logistic(A * (theta - b));
const pCorrect = (theta: number, it: PlacementItem) => { const g = guessRate(it.ex); return g + (1 - g) * pKnow(theta, difficulty(it)); };

function posterior(served: Served[], prior: { mean: number; sd: number } = { mean: PRIOR_MEAN, sd: PRIOR_SD }): { theta: number; sd: number; w: number[] } {
  const logw = GRID.map((t) => -0.5 * ((t - prior.mean) / prior.sd) ** 2);
  for (const s of served) {
    GRID.forEach((t, i) => {
      const p = s.skipped ? 1 - pKnow(t, difficulty(s.item)) : s.correct ? pCorrect(t, s.item) : 1 - pCorrect(t, s.item);
      logw[i] += Math.log(Math.max(1e-9, p));
    });
  }
  const m = Math.max(...logw); const w = logw.map((l) => Math.exp(l - m)); const z = w.reduce((a, b) => a + b, 0);
  const pw = w.map((x) => x / z);
  const theta = GRID.reduce((a, t, i) => a + t * pw[i], 0);
  const sd = Math.sqrt(GRID.reduce((a, t, i) => a + (t - theta) ** 2 * pw[i], 0));
  return { theta, sd, w: pw };
}

export const initPlacement = (): PState => ({ served: [], done: false, theta: PRIOR_MEAN, sd: PRIOR_SD });

// ── Item pool ────────────────────────────────────────────────────────────────
const isLatin = (s: string) => !/[^\u0000-ɏḀ-ỿЀ-ӿ]/.test(s);

/** Add generated vocabulary items at every level so no level is ever empty and retakes differ.
 *  Three kinds, in rising difficulty: recognise the meaning, choose the word that fits a sentence, type the missing word. */
export function buildPlacementPool(hand: PlacementItem[], vocab: VocabEntry[], rnd: () => number, opts: { sign?: boolean } = {}): PlacementItem[] {
  const gen: PlacementItem[] = [];
  for (const lvl of CEFR_ORDER) {
    const words = shuffle(vocab.filter((v) => v.level === lvl && v.pos !== 'phrase' && v.pos !== 'phr'), rnd);
    const nRecog = lvl === 'A1' ? 5 : 4, nCloze = lvl === 'A1' ? 4 : 5, nType = 3;
    words.slice(0, nRecog).forEach((v) => {
      const ce = makeExercise(v, 'recog', vocab, rnd);
      gen.push({ id: `gen-r-${v.id}`, skill: 'vocabulary', level: lvl, ex: ce.ex, fig: opts.sign ? v.fig : undefined });
    });
    if (opts.sign) continue;                       // sign vocabulary is tested by recognising figures (above)
    let made = 0;
    for (const v of words.slice(nRecog)) {
      if (made >= nCloze + nType) break;
      const c = clozeOf(v); if (!c) continue;
      const mcqKind = made < nCloze || !isLatin(v.t);
      if (mcqKind) {
        const same = vocab.filter((o) => o.id !== v.id && o.pos === v.pos && o.t !== v.t && clozeOf(o));
        const near = shuffle(same.filter((o) => Math.abs(cefrIndex(o.level) - cefrIndex(lvl)) <= 1), rnd);
        const wrong = [...new Set([...near, ...shuffle(same, rnd)].map((o) => coreWord(o.t)).filter((t) => t && t !== c.answer))].slice(0, 3);
        if (wrong.length < 3) continue;
        const choices = shuffle([c.answer, ...wrong], rnd);
        gen.push({ id: `gen-c-${v.id}`, skill: 'vocabulary', level: lvl, shift: 0.2, ex: { kind: 'mcq', prompt: `${c.prompt}  (${v.exn})`, choices, answer: choices.indexOf(c.answer), skill: 'vocabulary', level: lvl } });
      } else {
        gen.push({ id: `gen-t-${v.id}`, skill: 'vocabulary', level: lvl, shift: 0.5, ex: { kind: 'fill', prompt: c.prompt, answers: [c.answer], hint: `${v.exn}  ·  ${v.n}`, skill: 'vocabulary', level: lvl } });
      }
      made++;
    }
  }
  return [...hand, ...gen];
}

/** Fisher information of an item at θ (3-parameter logistic). */
function information(theta: number, it: PlacementItem): number {
  const g = guessRate(it.ex), pk = pKnow(theta, difficulty(it)), p = g + (1 - g) * pk;
  return (A * A) * ((1 - p) / p) * ((p - g) / (1 - g)) ** 2;
}

export function nextItem(pool: PlacementItem[], st: PState, rnd: () => number, canSpeak: boolean): PlacementItem | null {
  if (st.done || st.served.length >= MAX_ITEMS) return null;
  const seen = new Set(st.served.map((s) => s.item.id));
  const avail = pool.filter((p) => !seen.has(p.id) && (canSpeak || !p.audio));
  if (!avail.length) return null;
  // Balance skills: lightly penalise a skill that is already over-represented so the result is not just a vocabulary test.
  const used = new Map<Skill, number>(); st.served.forEach((s) => used.set(s.item.skill, (used.get(s.item.skill) ?? 0) + 1));
  const skillsInPool = new Set(avail.map((a) => a.skill)).size || 1;
  const fair = (st.served.length + 1) / skillsInPool;
  const scored = avail.map((it) => ({ it, score: information(st.theta, it) * (1 / (1 + Math.max(0, (used.get(it.skill) ?? 0) - fair) * 0.35)) * (0.85 + rnd() * 0.3) }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].it;
}

export function submit(pool: PlacementItem[], st: PState, item: PlacementItem, outcome: boolean | 'skip', canSpeak = true): PState {
  const served = [...st.served, { item, correct: outcome === true, skipped: outcome === 'skip' }];
  const { theta, sd } = posterior(served);
  const n = served.length;
  // Certainly below A1's bar after a fair number of misses → no point asking harder questions.
  const certainBeginner = n >= 8 && posteriorProb(served, MARGIN) < 0.04;
  const precise = n >= MIN_ITEMS && sd <= 0.36;
  const exhausted = !pool.some((p) => !served.some((s) => s.item.id === p.id) && (canSpeak || !p.audio));
  return { served, theta, sd, done: certainBeginner || precise || n >= MAX_ITEMS || exhausted };
}

/** P(θ ≥ x) under the current posterior. */
function posteriorProb(served: Served[], x: number): number {
  const { w } = posterior(served); return GRID.reduce((a, t, i) => a + (t >= x ? w[i] : 0), 0);
}

export const levelFromTheta = (theta: number, sd = 0): Cefr =>
  CEFR_ORDER[Math.max(0, Math.min(5, Math.floor(theta - MARGIN - 0.25 * sd + 1e-9)))];

export function placementResult(st: PState, now: number): PlacementResult {
  const { theta, sd } = posterior(st.served);
  let overall = levelFromTheta(theta, sd);
  // A top-end claim must be backed by real evidence at that level: at least three C1/C2-ish items attempted.
  const evidence = (lvl: Cefr) => st.served.filter((s) => cefrIndex(s.item.level) >= cefrIndex(lvl) - 0).length;
  while (cefrIndex(overall) >= 4 && evidence(overall) < 3) overall = CEFR_ORDER[cefrIndex(overall) - 1];
  const lo = levelFromTheta(theta - 1.28 * sd), hi = levelFromTheta(theta + 1.28 * sd);
  const bySkill: Partial<Record<Skill, Cefr>> = {};
  const skillN: Partial<Record<Skill, number>> = {};
  for (const sk of SKILLS) {
    const items = st.served.filter((s) => s.item.skill === sk);
    if (items.length < 2) continue;
    const p = posterior(items, { mean: theta, sd: 1.1 });          // shrink towards the overall estimate
    bySkill[sk] = levelFromTheta(p.theta, p.sd); skillN[sk] = items.length;
  }
  const weaknesses = (Object.entries(bySkill) as [Skill, Cefr][]).filter(([s, l]) => (skillN[s] ?? 0) >= 3 && cefrIndex(l) < cefrIndex(overall)).map(([s]) => s);
  const confidence: PlacementResult['confidence'] = sd <= 0.4 && st.served.length >= MIN_ITEMS ? 'high' : sd <= 0.6 ? 'medium' : 'low';
  // The 30-day programme is a beginner (A1) course. Anyone who places above A1 goes straight to a pathway that starts at THEIR level.
  const startDay = overall === 'A1' ? 1 : 31;
  return {
    takenAt: now, overall, bySkill, weaknesses, startDay, skipProgram: cefrIndex(overall) >= 1,
    answered: st.served.length, correct: st.served.filter((s) => s.correct).length,
    theta, sd, confidence, range: [lo, hi], skipped: st.served.filter((s) => s.skipped).length,
  };
}

/** The same result, but starting at a level the learner picked (e.g. "my result looks too low, I am a native speaker"). */
export function withLevel(r: PlacementResult, level: Cefr): PlacementResult {
  const skip = cefrIndex(level) >= 1;
  return { ...r, overall: level, skipProgram: skip, startDay: skip ? 31 : 1 };
}
/** A placement the learner chose by hand, without taking the test. */
export function manualPlacement(level: Cefr, now = Date.now()): PlacementResult {
  return withLevel({ takenAt: now, overall: level, bySkill: {}, weaknesses: [], startDay: 1, skipProgram: false, answered: 0, correct: 0, confidence: 'low', manual: true }, level);
}
