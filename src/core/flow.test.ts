import { describe, expect, it, beforeEach } from 'vitest';
import { LANGUAGES, loadContent } from '../content/registry';
import { newLangState } from '../state/store';
import { planSession, dayComplete } from './session';
import { applyCompletion } from './progression';
import { resolveProgram } from './curriculum';
import { PROGRAM_LENGTH } from './program';
import { newCard, review, DAY } from './fsrs';
import { computeStats, tierFor } from './analytics';
import { exportBackup, importBackup, saveProfile, saveCard, addEvent, loadCards, loadEvents, loadProfile, wipeAll, validateBackup, migrateProfile, SCHEMA_VERSION } from './storage';
import { DEFAULT_AVATAR, DEFAULT_SETTINGS } from '../state/store';
import type { Card, EventRec, Profile } from './types';

for (const lang of LANGUAGES) {
  describe(`programme flow — ${lang.name}`, () => {
    it('day 1 session starts with new words, a conversation and grammar', async () => {
      const c = await loadContent(lang.code); const st = newLangState(lang.code, 15);
      const plan = planSession({ minutes: 15, state: st, content: c, cards: [], events: [], now: Date.now() });
      const types = plan.blocks.map((b) => b.type);
      expect(types).toContain('newvocab'); expect(types).toContain('conversation'); expect(types).toContain('grammar');
      expect(plan.blocks.every((b) => b.minutes >= 1)).toBe(true); expect(plan.day).toBe(1);
    });
    it('completing every required block of every day finishes the programme in order', async () => {
      const c = await loadContent(lang.code); let st = newLangState(lang.code, 15); const days = resolveProgram(c);
      for (const d of days) {
        expect(st.programDay).toBe(d.def.day);
        const keys: string[] = []; if (d.words.length) keys.push('words'); if (d.conv) keys.push(`conv:${d.conv.id}`); d.grammar.forEach((g) => keys.push(`grammar:${g.id}`));
        keys.forEach((k, i) => { expect(dayComplete(st, c, d.def.day) && i < keys.length).toBe(false); st = applyCompletion(st, c, k, 0.9, d.def.day).state; });
        expect(st.programDone[d.def.day]).toBeTruthy();
      }
      expect(st.programDay).toBe(PROGRAM_LENGTH + 1); expect(st.pathLevel).toBe('A2');
    });
    it('a day does not complete if a required block is missing', async () => {
      const c = await loadContent(lang.code); let st = newLangState(lang.code, 15);
      st = applyCompletion(st, c, 'words', 1, 1).state;
      expect(st.programDay).toBe(1); expect(st.programDone[1]).toBeUndefined();
    });
    it('due reviews come first in the plan and respect the time budget', async () => {
      const c = await loadContent(lang.code); const st = newLangState(lang.code, 10); const now = Date.now();
      const cards: Card[] = c.vocab.slice(0, 40).map((v) => ({ ...review(newCard(lang.code, v.id, 'vocab', now - 3 * DAY), 3, now - 3 * DAY), due: now - 1000 }));
      const plan = planSession({ minutes: 10, state: st, content: c, cards, events: [], now });
      expect(plan.blocks[0].type).toBe('review'); expect(plan.minutes).toBeLessThanOrEqual(12);
    });
  });
}

describe('mastery needs time, not one answer', () => {
  it('a word answered correctly many times in one day is not retained', async () => {
    const c = await loadContent('es'); const st = newLangState('es', 10); const t0 = Date.now() - 40 * DAY;
    let card = newCard('es', c.vocab[0].id, 'vocab', t0);
    for (let i = 0; i < 8; i++) { card = review(card, 4, t0 + i * 60_000); card.modes = { produce: { ok: i + 1, fail: 0 } }; }
    const s1 = computeStats(st, c, [card], [], t0 + 10 * 60_000);
    expect(s1.stages.retained + s1.stages.mastered).toBe(0);
  });
  it('the same word recalled across spaced days becomes retained', async () => {
    const c = await loadContent('es'); const st = newLangState('es', 10); const t0 = Date.now() - 60 * DAY; let card = newCard('es', c.vocab[0].id, 'vocab', t0); let t = t0;
    for (let i = 0; i < 6; i++) { card = review(card, 3, t); card.modes = { produce: { ok: i + 1, fail: 0 }, recog: { ok: 2, fail: 0 } }; t += Math.max(1, Math.round((card.due - t) / DAY)) * DAY; }
    const s = computeStats(st, c, [card], [], t - DAY);
    expect(s.retainedPlus + s.stages.recalled + s.stages.recognized).toBeGreaterThan(0);
    expect(tierFor(0).name).toBe('Beginner'); expect(tierFor(1300).name).toBe('Master');
  });
});

describe('storage: versioned backup round-trip', () => {
  beforeEach(async () => { await wipeAll(); });
  const profile = (): Profile => ({ schema: SCHEMA_VERSION, id: 'p1', username: 'Owen', avatar: DEFAULT_AVATAR, createdAt: 1, activeLang: 'de', languages: { de: newLangState('de', 20), es: newLangState('es', 10) }, achievements: { 'streak-3': 5 }, settings: DEFAULT_SETTINGS, unlockedCosmetics: [] });
  it('exports and restores profile, cards and events exactly, per language', async () => {
    await saveProfile(profile());
    const a = newCard('de', 'x1', 'vocab', 1), b = newCard('es', 'x1', 'vocab', 1); await saveCard(a); await saveCard(b);
    const ev: EventRec = { ts: 5, lang: 'de', type: 'review', skill: 'vocabulary', itemId: 'x1', correct: true }; await addEvent(ev);
    const backup = JSON.parse(JSON.stringify(await exportBackup()));
    await wipeAll(); expect(await loadProfile()).toBeNull();
    await importBackup(backup);
    expect((await loadProfile())!.languages.de.dailyMinutes).toBe(20);
    expect((await loadCards('de')).length).toBe(1); expect((await loadCards('es')).length).toBe(1);
    expect((await loadEvents('de'))[0].itemId).toBe('x1'); expect((await loadEvents('es')).length).toBe(0);
  });
  it('rejects non-LINGUA and incomplete files, and newer schemas', () => {
    expect(() => validateBackup({ app: 'other' })).toThrow(/Not a LINGUA/); expect(() => validateBackup({ app: 'lingua', schema: 1, profile: {} })).toThrow(/incomplete/);
    expect(() => migrateProfile({ schema: SCHEMA_VERSION + 1 })).toThrow(/newer/);
  });
  it('migrates a pre-versioned profile', () => { const m = migrateProfile({ id: 'old', username: 'x', languages: {} }); expect(m.schema).toBe(1); expect(m.achievements).toEqual({}); });
});
