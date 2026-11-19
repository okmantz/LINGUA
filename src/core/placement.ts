// Adaptive placement: a staircase over CEFR levels A1→B2 using mixed-skill items.
// Honest limits: placement covers A1–B2; C1/C2 need human assessment and are reported as "B2 or above".
import type { Cefr, PlacementItem, PlacementResult, Skill, VocabEntry } from './types';
import { CEFR_ORDER, SKILLS, cefrIndex } from './types';
import { makeExercise } from './exercises';
import { shuffle } from './text';

export const PLACEMENT_LEVELS: Cefr[] = ['A1', 'A2', 'B1', 'B2'];
const PER_LEVEL = 4;

export interface PState { levelIdx: number; served: { item: PlacementItem; correct: boolean }[]; done: boolean; topPassed: number; }
export const initPlacement = (): PState => ({ levelIdx: 0, served: [], done: false, topPassed: -1 });

/** Add auto-generated vocabulary-recognition items from the word list so every level has coverage. */
export function buildPlacementPool(hand: PlacementItem[], vocab: VocabEntry[], rnd: () => number): PlacementItem[] {
  const gen: PlacementItem[] = [];
  for (const lvl of ['A1', 'A2', 'B1'] as Cefr[]) {
    const pool = shuffle(vocab.filter((v) => v.level === lvl && v.pos !== 'phrase'), rnd).slice(0, lvl === 'A1' ? 3 : 2);
    for (const v of pool) {
      const ce = makeExercise(v, 'recog', vocab, rnd);
      gen.push({ id: `gen-${v.id}`, skill: 'vocabulary', level: lvl, ex: ce.ex });
    }
  }
  return [...hand, ...gen];
}

export function nextItem(pool: PlacementItem[], st: PState, rnd: () => number, canSpeak: boolean): PlacementItem | null {
  if (st.done) return null;
  const lvl = PLACEMENT_LEVELS[st.levelIdx];
  const seen = new Set(st.served.map((s) => s.item.id));
  const here = st.served.filter((s) => s.item.level === lvl);
  const avail = pool.filter((p) => p.level === lvl && !seen.has(p.id) && (canSpeak || !p.audio));
  if (!avail.length) return null;
  // spread across skills: prefer a skill not yet used at this level
  const usedSk = new Set(here.map((s) => s.item.skill));
  const fresh = avail.filter((a) => !usedSk.has(a.skill));
  return shuffle(fresh.length ? fresh : avail, rnd)[0];
}

export function submit(pool: PlacementItem[], st: PState, item: PlacementItem, correct: boolean, canSpeak = true): PState {
  const served = [...st.served, { item, correct }];
  const lvl = PLACEMENT_LEVELS[st.levelIdx];
  const here = served.filter((s) => s.item.level === lvl);
  const availLeft = pool.filter((p) => p.level === lvl && !served.some((s) => s.item.id === p.id) && (canSpeak || !p.audio)).length;
  const right = here.filter((s) => s.correct).length, wrong = here.length - right;
  let { levelIdx, topPassed, done } = st;
  const target = Math.min(PER_LEVEL, here.length + availLeft);   // items this level will have in total
  const need = Math.ceil(target * 0.6);                           // 3/4, 2/3, 2/2, 1/1
  if (right >= need) {                                            // passed this level
    topPassed = levelIdx;
    if (levelIdx === PLACEMENT_LEVELS.length - 1) done = true; else levelIdx++;
  } else if (wrong > target - need) done = true;                  // can no longer pass it
  else if (availLeft === 0) done = true;
  return { levelIdx, served, done, topPassed };
}

export function placementResult(st: PState, now: number): PlacementResult {
  const overall: Cefr = st.topPassed >= 0 ? PLACEMENT_LEVELS[st.topPassed] : 'A1';
  const bySkill: Partial<Record<Skill, Cefr>> = {};
  for (const sk of SKILLS) {
    const items = st.served.filter((s) => s.item.skill === sk);
    if (!items.length) continue;
    let best = -1;
    for (const l of PLACEMENT_LEVELS) {
      const at = items.filter((s) => s.item.level === l);
      if (at.length && at.filter((s) => s.correct).length / at.length >= 0.5) best = Math.max(best, cefrIndex(l));
    }
    bySkill[sk] = CEFR_ORDER[Math.max(0, best)];
  }
  const weaknesses = (Object.entries(bySkill) as [Skill, Cefr][]).filter(([, l]) => cefrIndex(l) < cefrIndex(overall)).map(([s]) => s);
  // Learners who place A2 can skip the first foundation block; B1+ skip the programme (offered, not forced).
  const startDay = overall === 'A1' ? 1 : overall === 'A2' ? 11 : 31;
  return { takenAt: now, overall, bySkill, weaknesses, startDay, skipProgram: cefrIndex(overall) >= 2, answered: st.served.length, correct: st.served.filter((s) => s.correct).length };
}
