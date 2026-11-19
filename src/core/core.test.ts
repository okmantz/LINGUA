import { describe, it, expect } from 'vitest';
import { checkAnswer, coreWord, sentenceSimilarity, fold } from './text';
import { stageOf } from './mastery';
import { newCard, review, DAY } from './fsrs';
import { initPlacement, nextItem, submit, placementResult } from './placement';
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

describe('placement staircase', () => {
  const mk = (level: any, n: number): PlacementItem[] => Array.from({ length: n }, (_, i) => ({
    id: `${level}${i}`, skill: (['grammar', 'vocabulary', 'reading', 'grammar'] as const)[i % 4], level,
    ex: { kind: 'mcq', prompt: 'p', choices: ['a', 'b'], answer: 0 },
  }));
  const pool = [...mk('A1', 4), ...mk('A2', 4), ...mk('B1', 4), ...mk('B2', 4)];
  const run = (knows: (lvl: string) => boolean) => {
    const rnd = mulberry32(5); let st = initPlacement(); let guard = 0;
    while (!st.done && guard++ < 40) { const it = nextItem(pool, st, rnd, true); if (!it) break; st = submit(pool, st, it, knows(it.level), true); }
    return placementResult(st, 0);
  };
  it('absolute beginner places A1 and starts day 1', () => { const r = run(() => false); expect(r.overall).toBe('A1'); expect(r.startDay).toBe(1); expect(r.skipProgram).toBe(false); });
  it('knows everything → B2 and skips the programme', () => { const r = run(() => true); expect(r.overall).toBe('B2'); expect(r.skipProgram).toBe(true); });
  it('knows A1–A2 only → A2', () => { const r = run((l) => l === 'A1' || l === 'A2'); expect(r.overall).toBe('A2'); expect(r.startDay).toBe(11); });
});
