import { beforeAll, describe, expect, it } from 'vitest';
import { levelDistance, rankForLevel, pathwayItems } from './curriculum';
import { manualPlacement } from './placement';
import { currentLevel } from './guide';
import { planSession } from './session';
import { loadDraft, saveDraft, clearDraft } from './drafts';
import { newLangState } from '../state/store';
import { loadContent } from '../content/registry';
import type { LanguageContent } from './types';

let de: LanguageContent;
beforeAll(async () => { de = await loadContent('de'); });

describe('training starts at the placed level', () => {
  it('ranks the learner level first', () => {
    expect(levelDistance('B2', 'B2')).toBe(0);
    const ranked = rankForLevel(de.vocab, 'B2');
    expect(ranked[0].level).toBe('B2');
    expect(pathwayItems(de, 'B2').vocab[0].level).toBe('B2');
  });
  it('manual B2 skips the beginner programme and trains at B2', () => {
    const r = manualPlacement('B2'); expect(r.skipProgram).toBe(true); expect(r.startDay).toBe(31); expect(r.manual).toBe(true);
    const s = { ...newLangState('de', 15), placement: r, pathLevel: 'B2' as const, programDay: 31 };
    expect(currentLevel(s)).toBe('B2');
  });
  it('new words in a B2 session are B2, never "hello/goodbye"', () => {
    const r = manualPlacement('B2');
    const s = { ...newLangState('de', 20), placement: r, pathLevel: 'B2' as const, programDay: 31 };
    const plan = planSession({ minutes: 20, state: s, content: de, cards: [], events: [], now: Date.now() });
    const nv = plan.blocks.find((x) => x.type === 'newvocab');
    expect(nv).toBeTruthy();
    const byId = new Map(de.vocab.map((v) => [v.id, v.level]));
    const lv = nv!.ids.map((id) => byId.get(id));
    expect(lv.length).toBeGreaterThan(0); expect(lv.every((l) => l === 'B2')).toBe(true);
  });
  it('A1 placement still starts the programme', () => { const r = manualPlacement('A1'); expect(r.skipProgram).toBe(false); expect(r.startDay).toBe(1); });
});

describe('drafts', () => {
  it('round-trips and clears', () => { saveDraft('t', { a: 1 }); expect(loadDraft<{ a: number }>('t')).toEqual({ a: 1 }); clearDraft('t'); expect(loadDraft('t')).toBeNull(); });
});
