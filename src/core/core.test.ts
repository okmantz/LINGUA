import { describe, it, expect } from 'vitest';
import { checkAnswer, coreWord, sentenceSimilarity, fold } from './text';
import { stageOf } from './mastery';
import { newCard, review, DAY } from './fsrs';
import { initPlacement, nextItem, submit, placementResult, MARGIN, MAX_ITEMS, difficulty, guessRate } from './placement';
import { cefrIndex } from './types';
import { mulberry32 } from './text';
import type { PlacementItem } from './types';

describe('answer checking', () => {
  it('distinguishes exact / accent / close / wrong', () => {
    expect(checkAnswer('el niño', ['el niño'])).toBe('exact');
    expect(checkAnswer('el nino', ['el niño'])).toBe('accent');
    expect(checkAnswer('el niñoo', ['el niño'])).toBe('close');
    expect(checkAnswer('la casa', ['el niño'])).toBe('wrong');
    expect(checkAnswer('', ['x'])).toBe('wrong');
  });
  it('handles German digraphs and eszett', () => {
    expect(checkAnswer('schoen', ['schön'])).toBe('accent');
    expect(checkAnswer('strasse', ['Straße'])).toBe('accent');
  });
  it('strips articles and compares sentences', () => {
    expect(coreWord("l'eau")).toBe('eau'); expect(coreWord('la casa')).toBe('casa'); expect(coreWord('der Hund')).toBe('Hund');
    expect(sentenceSimilarity('me llamo Ana', 'me llamo ana')).toBe(1);
    expect(sentenceSimilarity('me llamo Ana', 'hola')).toBe(0);
    expect(fold('¿Cómo estás?')).toBe('como estas');
  });
});

describe('mastery', () => {
  it('a single correct answer never means mastered', () => {
    const t0 = 1_700_000_000_000;
    let c = review(newCard('es', 'a', 'vocab', t0), 3, t0);
    c.modes = { recog: { ok: 1, fail: 0 } };
    expect(stageOf(c, t0)).toBe('recognized');
    c.modes = { recog: { ok: 1, fail: 0 }, produce: { ok: 1, fail: 0 } };
    expect(stageOf(c, t0)).toBe('recalled');
  });
  it('mastered needs long stability, several days and production', () => {
    let t = 1_700_000_000_000; let c = newCard('es', 'a', 'vocab', t);
    for (let i = 0; i < 5; i++) { c = review(c, 3, t); t = c.due; }
    c.modes = { recog: { ok: 2, fail: 0 }, rev: { ok: 1, fail: 0 }, produce: { ok: 2, fail: 0 } };
    expect(c.stability).toBeGreaterThan(21);
    expect(stageOf(c, c.last)).toBe('mastered');
    // forgotten for a long time → no longer "retained"
    expect(['recalled', 'recognized']).toContain(stageOf(c, c.last + 3000 * DAY));
  });
  it('unseen without a card', () => expect(stageOf(undefined)).toBe('unseen'));
});

describe('adaptive placement (A1–C2)', () => {
  // A synthetic pool: 14 items per level, mixed skills, 4-choice and typed.
  const SK = ['grammar', 'vocabulary', 'reading', 'listening'] as const;
  const LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
  const pool: PlacementItem[] = LV.flatMap((level) => Array.from({ length: 14 }, (_, i): PlacementItem => ({
    id: `${level}${i}`, skill: SK[i % 4], level,
    ex: i % 5 === 4 ? { kind: 'fill', prompt: 'p', answers: ['x'] } : { kind: 'mcq', prompt: 'p', choices: ['a', 'b', 'c', 'd'], answer: 0 },
  })));
  const trueLevel = (theta: number) => Math.max(0, Math.min(5, Math.floor(theta - MARGIN + 1e-9)));
  /** A learner with a true ability: knows an item with probability logistic, else guesses (never skips unless told to). */
  const simulate = (theta: number, seed: number, skipper = false) => {
    const rnd = mulberry32(seed); let st = initPlacement(); let guard = 0;
    while (!st.done && guard++ < 60) {
      const it = nextItem(pool, st, rnd, true); if (!it) break;
      const know = rnd() < 1 / (1 + Math.exp(-1.7 * (theta - difficulty(it))));
      const g = guessRate(it.ex);
      if (!know && skipper && rnd() < 0.7) { st = submit(pool, st, it, 'skip', true); continue; }
      st = submit(pool, st, it, know || rnd() < g, true);
    }
    return { r: placementResult(st, 0), n: st.served.length };
  };
  it('recovers the true level: within one level ≥ 95 % of the time and exactly right most of the time', () => {
    let exact = 0, within1 = 0, over2 = 0, runs = 0, items = 0;
    for (let lvl = 0; lvl <= 5; lvl++) for (let k = 0; k < 40; k++) {
      const theta = lvl + MARGIN + 0.1 + (k / 40) * 0.7 - 0.35;   // spread across the band
      const { r, n } = simulate(theta, 1000 + lvl * 100 + k); runs++; items += n;
      const d = cefrIndex(r.overall) - trueLevel(theta);
      if (d === 0) exact++; if (Math.abs(d) <= 1) within1++; if (d >= 2) over2++;
    }
    expect(within1 / runs).toBeGreaterThanOrEqual(0.95);
    expect(exact / runs).toBeGreaterThanOrEqual(0.6);
    expect(over2).toBe(0);
    expect(items / runs).toBeLessThan(MAX_ITEMS);
  });
  it('a pure guesser is placed A1 (guessing is not rewarded)', () => {
    let a1 = 0; for (let k = 0; k < 30; k++) { const { r } = simulate(-1.5, 7000 + k); if (r.overall === 'A1') a1++; }
    expect(a1).toBeGreaterThanOrEqual(29);
  });
  it('an absolute beginner finishes quickly and starts day 1', () => {
    const { r, n } = simulate(-1.5, 3, true); expect(r.overall).toBe('A1'); expect(r.startDay).toBe(1); expect(r.skipProgram).toBe(false); expect(n).toBeLessThanOrEqual(14);
  });
  it('knowing everything → C2 with high confidence and skips the beginner programme', () => {
    const { r } = simulate(6.2, 11); expect(r.overall).toBe('C2'); expect(r.skipProgram).toBe(true); expect(r.confidence).not.toBe('low');
  });
  it('"I don\'t know" is never worth less than a wrong guess and a skip gives no guess credit', () => {
    const it = pool.find((p) => p.level === 'B2' && p.ex.kind === 'mcq')!;
    const a = submit(pool, initPlacement(), it, false), b = submit(pool, initPlacement(), it, 'skip');
    expect(b.theta).toBeLessThanOrEqual(a.theta + 1e-9);
  });
  it('reports a level range and per-skill levels', () => {
    const { r } = simulate(3.0, 5); expect(r.range).toBeTruthy(); expect(Object.keys(r.bySkill).length).toBeGreaterThanOrEqual(2);
    expect(cefrIndex(r.range![0])).toBeLessThanOrEqual(cefrIndex(r.range![1]));
  });
  it('audio items are skipped when no voice is available', () => {
    const p2: PlacementItem[] = [{ id: 'au', skill: 'listening', level: 'A1', audio: 'hola', ex: { kind: 'mcq', prompt: 'p', choices: ['a', 'b'], answer: 0 } }, ...pool];
    for (let i = 0; i < 5; i++) expect(nextItem(p2, initPlacement(), mulberry32(i), false)?.audio).toBeUndefined();
  });
});
