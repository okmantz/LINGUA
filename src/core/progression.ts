// Pure programme-progression rules (kept out of the UI store so they can be tested).
import type { Cefr, LangState, LanguageContent } from './types';
import { CEFR_ORDER, cefrIndex } from './types';
import { PROGRAM_LENGTH } from './program';
import { dayComplete } from './session';
import { LIB_KEY, PASS, programActive } from './guide';

export interface Completion { state: LangState; dayCompleted: number | null }

/** Record a finished block. Marks programme progress and, if the day's required items are all done, unlocks the next day. */
export function applyCompletion(s: LangState, content: LanguageContent, key: string, score: number, programDay: number | undefined, now = Date.now()): Completion {
  const prev = s.lessons[key];
  let ns: LangState = { ...s, lessons: { ...s.lessons, [key]: { best: Math.max(prev?.best ?? 0, score), count: (prev?.count ?? 0) + 1, last: now } }, xp: s.xp + Math.round(5 + score * 15) };
  let dayCompleted: number | null = null;
  if (programDay) {
    const done = ns.dayProgress[programDay] ?? [];
    if (!done.includes(key)) ns = { ...ns, dayProgress: { ...ns.dayProgress, [programDay]: [...done, key] } };
    if (programDay === ns.programDay && !ns.programDone[programDay] && dayComplete(ns, content, programDay)) {
      ns = { ...ns, programDone: { ...ns.programDone, [programDay]: { completedAt: now, score } }, programDay: Math.min(PROGRAM_LENGTH + 1, programDay + 1), xp: ns.xp + 50, pathLevel: programDay >= PROGRAM_LENGTH ? 'A2' : ns.pathLevel };
      dayCompleted = programDay;
    }
  }
  return { state: advanceLevel(ns, content), dayCompleted };
}

/** How much of one CEFR level's lessons (grammar, conversations, reading, listening, writing, pronunciation) are passed. */
export function levelProgress(state: LangState, content: LanguageContent, level: Cefr): { passed: number; total: number; ratio: number } {
  const groups: [keyof typeof LIB_KEY, { id: string; level: Cefr }[]][] = [
    ['grammar', content.grammar], ['conversations', content.conversations], ['reading', content.reading],
    ['listening', content.listening], ['writing', content.writing], ['pronunciation', content.pronunciation],
  ];
  let passed = 0, total = 0;
  for (const [k, list] of groups) for (const it of list) if (it.level === level) { total++; if ((state.lessons[LIB_KEY[k](it.id)]?.best ?? 0) >= PASS) passed++; }
  return { passed, total, ratio: total ? passed / total : 1 };
}
export const LEVEL_UP_AT = 0.75;

/** After the programme (or placement above A2) the pathway level rises by itself once ~¾ of the current level's lessons are passed.
 *  Levels with no material are skipped rather than leaving the learner stuck. Never moves down, never past C2. */
export function advanceLevel(state: LangState, content: LanguageContent): LangState {
  if (programActive(state)) return state;
  let lvl = state.pathLevel; let guard = 0;
  while (cefrIndex(lvl) < CEFR_ORDER.length - 1 && guard++ < 6) {
    const lp = levelProgress(state, content, lvl);
    if (lp.total > 0 && lp.ratio < LEVEL_UP_AT) break;
    lvl = CEFR_ORDER[cefrIndex(lvl) + 1];
  }
  return lvl === state.pathLevel ? state : { ...state, pathLevel: lvl };
}
