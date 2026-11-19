// Pure programme-progression rules (kept out of the UI store so they can be tested).
import type { LangState, LanguageContent } from './types';
import { PROGRAM_LENGTH } from './program';
import { dayComplete } from './session';

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
  return { state: ns, dayCompleted };
}
