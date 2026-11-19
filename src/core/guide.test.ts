import { describe, expect, it } from 'vitest';
import { nextStep, recommendedItem, passedCount, programActive, programFinished } from './guide';
import { reviewComment, tipsFor, TOUR } from './teacher';
import { normalizeAvatar, CHARACTERS, isUnlocked, inkFor } from './cosmetics';
import { migrateProfile } from './storage';
import { newLangState } from '../state/store';
import { planSession } from './session';
import { PROGRAM_LENGTH } from './program';
import { loadContent } from '../content/registry';
import type { LangState, LanguageContent } from './types';

let content: LanguageContent;
const plan = (s: LangState, min = 15) => planSession({ minutes: min, state: s, content, cards: [], events: [], now: Date.now() });

describe('guided next step', () => {
  it('loads content', async () => { content = await loadContent('es'); expect(content.grammar.length).toBeGreaterThan(5); });

  it('day 1 beginner is told to start Day 1', () => {
    const s = newLangState('es', 15); const n = nextStep({ state: s, plan: plan(s), todayMin: 0 });
    expect(n.kind).toBe('session'); expect(n.title).toMatch(/^Day 1/); expect(n.to).toBe('/daily'); expect(n.cta).toBe('Start Day 1');
  });
  it('after the daily goal is met and the day has no required steps left, suggests the weakest skill (or rest)', () => {
    const s = { ...newLangState('es', 10), placement: { skipProgram: true, overall: 'A2' } as any, programDay: PROGRAM_LENGTH + 1, pathLevel: 'A2' as const };
    expect(nextStep({ state: s, plan: plan(s, 10), todayMin: 12, weakest: 'listening' })).toMatchObject({ kind: 'extra', to: '/listening' });
    expect(nextStep({ state: s, plan: plan(s, 10), todayMin: 12 }).kind).toBe('rest');
  });
  it('programme finished without assessment points to the assessment', () => {
    const s = { ...newLangState('es', 10), programDay: PROGRAM_LENGTH + 1 };
    expect(programFinished(s)).toBe(true); expect(programActive(s)).toBe(false);
    expect(nextStep({ state: s, plan: plan(s), todayMin: 0 }).kind).toBe('assessment');
  });
  it('keeps going past the time goal while required programme steps remain', () => {
    const s = newLangState('es', 5); const n = nextStep({ state: s, plan: { ...plan(s), blocks: [{ key: 'x', type: 'grammar', title: 't', why: '', minutes: 4, skill: 'grammar', ids: ['a'], required: true }] }, todayMin: 9 });
    expect(n.kind).toBe('session');
  });
});

describe('recommended library item', () => {
  it('recommends today\'s programme lesson first, then moves on once it is passed', () => {
    const s = newLangState('es', 15); const first = recommendedItem('grammar', s, content); expect(first).toBeTruthy();
    const done: LangState = { ...s, lessons: { [`grammar:${first}`]: { best: 0.9, count: 1, last: 1 } } };
    const second = recommendedItem('grammar', done, content); expect(second).not.toBe(first);
    expect(recommendedItem('grammar', s, content, first!)).not.toBe(first);
  });
  it('counts passed items', () => {
    const s = newLangState('es', 15); const id = content.grammar[0].id;
    expect(passedCount('grammar', { ...s, lessons: { [`grammar:${id}`]: { best: 0.85, count: 1, last: 1 } } }, content)).toEqual({ done: 1, total: content.grammar.length });
    expect(passedCount('grammar', { ...s, lessons: { [`grammar:${id}`]: { best: 0.5, count: 1, last: 1 } } }, content).done).toBe(0);
  });
});

describe('Teacher', () => {
  const base = () => { const s = newLangState('es', 15); return { path: '/', name: 'Owen', langName: 'Spanish', state: s, stats: null, due: 0, next: nextStep({ state: s, plan: plan(s), todayMin: 0 }), todayMin: 0, hour: 10, today: '2026-01-01', programme: true, newcomer: false }; };
  it('has a tip for every page, with unique ids', () => {
    const ids = new Set<string>();
    for (const path of ['/', '/path', '/daily', '/vocabulary', '/grammar', '/conversations', '/listening', '/reading', '/writing', '/pronunciation', '/cheats', '/progress', '/achievements', '/languages', '/settings', '/assessment']) {
      const t = tipsFor({ ...base(), path }); expect(t.length, path).toBeGreaterThan(0);
      for (const x of t) { expect(x.text.length).toBeGreaterThan(10); expect(ids.has(x.id)).toBe(false); ids.add(x.id); }
    }
  });
  it('welcomes newcomers with the tour and reminds about due reviews', () => {
    expect(tipsFor({ ...base(), newcomer: true })[0].id).toBe('tour-v1'); expect(TOUR.length).toBeGreaterThan(2);
    expect(tipsFor({ ...base(), due: 12 }).some((t) => t.id.startsWith('due-'))).toBe(true);
    expect(tipsFor({ ...base(), due: 90 }).some((t) => t.id.startsWith('backlog-'))).toBe(true);
  });
  it('nudges a streak at risk only in the evening and only if nothing was studied', () => {
    const s = { ...newLangState('es', 15), streak: { current: 5, best: 5, lastDay: 'x' } };
    expect(tipsFor({ ...base(), state: s, hour: 19 }).some((t) => t.id.startsWith('streak-'))).toBe(true);
    expect(tipsFor({ ...base(), state: s, hour: 9 }).some((t) => t.id.startsWith('streak-'))).toBe(false);
    expect(tipsFor({ ...base(), state: s, hour: 19, todayMin: 5 }).some((t) => t.id.startsWith('streak-'))).toBe(false);
  });
  it('reacts kindly to every score', () => {
    expect(reviewComment(0.95).mood).toBe('cheer'); expect(reviewComment(0.8).mood).toBe('happy'); expect(reviewComment(0.6).mood).toBe('think');
    expect(reviewComment(0.2).title).toMatch(/okay/); expect(reviewComment(0.2).text).not.toMatch(/fail|bad|wrong/i);
  });
});

describe('characters', () => {
  it('maps old custom avatars to a character and keeps valid ones', () => {
    expect(normalizeAvatar({ char: 'ollie' }).char).toBe('ollie');
    expect(normalizeAvatar({ char: 'nope' }).char).toBe('alex'); expect(normalizeAvatar(undefined).char).toBe('alex');
    expect(normalizeAvatar({ skin: 2, hair: 3, accessory: 0 } as any).char).toBe('camille'); expect(normalizeAvatar({ skin: 1, hair: 0, accessory: 2 } as any).char).toBe('mei');
  });
  it('old profiles migrate without losing data', () => {
    const m = migrateProfile({ schema: 1, id: 'x', username: 'Owen', avatar: { skin: 1, hair: 3, hairColor: 1, eyes: 0, mouth: 0, accessory: 0, outfit: 0, bg: 0 }, languages: {}, achievements: { a: 1 }, unlockedCosmetics: [], settings: {} });
    expect(m.avatar.char).toBe('camille'); expect(m.achievements).toEqual({ a: 1 });
  });
  it('two characters are earned, six are free', () => {
    expect(CHARACTERS.filter((c) => !isUnlocked(c, { tier: 0, ach: {} })).map((c) => c.id)).toEqual(['finn', 'bolt']);
    expect(CHARACTERS.every((c) => isUnlocked(c, { tier: 6, ach: {} }))).toBe(true);
  });
  it('picks readable text colours for accents', () => { expect(inkFor('#f59e0b')).toBe('#06201c'); expect(inkFor('#6366f1')).toBe('#ffffff'); });
});
