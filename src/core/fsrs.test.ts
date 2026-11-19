import { describe, it, expect } from 'vitest';
import { newCard, review, retrievability, nextIntervalDays, DAY, currentRecall } from './fsrs';

describe('FSRS', () => {
  it('retrievability is 0.9 when t == S (definition of stability)', () => {
    for (const s of [0.5, 1, 7, 100]) expect(retrievability(s, s)).toBeCloseTo(0.9, 6);
  });
  it('interval at 90% retention ≈ stability', () => {
    expect(nextIntervalDays(10)).toBe(10);
    expect(nextIntervalDays(30)).toBe(30);
  });
  it('first review sets stability from grade; Easy > Good > Hard > Again', () => {
    const t0 = 1_700_000_000_000;
    const s = ([1, 2, 3, 4] as const).map((g) => review(newCard('es', 'x', 'vocab', t0), g, t0).stability);
    expect(s[0]).toBeLessThan(s[1]); expect(s[1]).toBeLessThan(s[2]); expect(s[2]).toBeLessThan(s[3]);
  });
  it('successful review at due date increases stability; lapse reduces it', () => {
    const t0 = 1_700_000_000_000;
    const c1 = review(newCard('es', 'x', 'vocab', t0), 3, t0);
    const t1 = c1.due;
    const good = review(c1, 3, t1);
    const lapse = review(c1, 1, t1);
    expect(good.stability).toBeGreaterThan(c1.stability);
    expect(lapse.stability).toBeLessThan(c1.stability);
    expect(lapse.lapses).toBe(1);
    expect(lapse.due - t1).toBeLessThan(DAY);
  });
  it('Again on a new card keeps it in learning and due soon', () => {
    const t0 = 1_700_000_000_000;
    const c = review(newCard('es', 'x', 'vocab', t0), 1, t0);
    expect(c.state).toBe(1);
    expect(c.due - t0).toBe(10 * 60_000);
  });
  it('spacing grows over repeated Good reviews', () => {
    let t = 1_700_000_000_000; let c = newCard('es', 'x', 'vocab', t);
    const gaps: number[] = [];
    for (let i = 0; i < 6; i++) { c = review(c, 3, t); gaps.push(c.due - t); t = c.due; }
    // strictly growing until the 365-day cap, never shrinking
    for (let i = 1; i < 4; i++) expect(gaps[i]).toBeGreaterThan(gaps[i - 1]);
    for (let i = 1; i < gaps.length; i++) expect(gaps[i]).toBeGreaterThanOrEqual(gaps[i - 1]);
    expect(Math.max(...gaps)).toBeLessThanOrEqual(365 * DAY);
  });
  it('recall probability decays with time', () => {
    const t0 = 1_700_000_000_000;
    const c = review(newCard('es', 'x', 'vocab', t0), 3, t0);
    expect(currentRecall(c, t0)).toBeGreaterThan(currentRecall(c, t0 + 10 * DAY));
  });
});
