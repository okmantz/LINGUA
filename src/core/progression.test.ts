import { describe, it, expect } from 'vitest';
import { loadContent } from '../content/registry';
import { newLangState } from '../state/store';
import { advanceLevel, levelProgress, LEVEL_UP_AT } from './progression';
import { LIB_KEY, PASS } from './guide';
import type { Cefr, LangState } from './types';

/** A post-programme learner who has passed every lesson at the given levels. */
async function learnerWho(passedLevels: Cefr[], code = 'es') {
  const c = await loadContent(code);
  let st: LangState = newLangState(code, 15, { overall: 'A1', skipProgram: true } as never);
  st = { ...st, pathLevel: 'A1', lessons: { ...st.lessons } };
  const groups: [keyof typeof LIB_KEY, { id: string; level: Cefr }[]][] = [['grammar', c.grammar], ['conversations', c.conversations], ['reading', c.reading], ['listening', c.listening], ['writing', c.writing], ['pronunciation', c.pronunciation]];
  for (const [k, list] of groups) for (const it of list) if (passedLevels.includes(it.level)) st.lessons[LIB_KEY[k](it.id)] = { best: 1, attempts: 1, last: Date.now() } as never;
  return { c, st };
}

describe('level advancement', () => {
  it('stays put when little of the level is done', async () => {
    const { c, st } = await learnerWho([]);
    expect(advanceLevel(st, c).pathLevel).toBe('A1');
  });
  it('moves up through every fully passed level and stops at the first unfinished one', async () => {
    const { c, st } = await learnerWho(['A1', 'A2', 'B1']);
    const out = advanceLevel(st, c);
    expect(out.pathLevel).toBe('B2');
    expect(levelProgress(out, c, 'B2').ratio).toBeLessThan(LEVEL_UP_AT);
  });
  it('can reach C2 and never goes past it', async () => {
    const { c, st } = await learnerWho(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
    expect(advanceLevel(st, c).pathLevel).toBe('C2');
  });
  it('never moves a learner down', async () => {
    const { c, st } = await learnerWho([]);
    expect(advanceLevel({ ...st, pathLevel: 'B2' }, c).pathLevel).toBe('B2');
  });
  it('does nothing while the 30-day programme is still running', async () => {
    const c = await loadContent('es'); const st = newLangState('es', 15);
    expect(advanceLevel(st, c)).toBe(st);
  });
  it('needs the PASS threshold per lesson', () => { expect(PASS).toBeGreaterThan(0); expect(LEVEL_UP_AT).toBeCloseTo(0.75); });
});
