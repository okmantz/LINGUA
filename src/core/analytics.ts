// Derives every progress number from real review/exercise history — nothing is self-reported.
import type { Card, Cefr, EventRec, LangState, LanguageContent, Skill } from './types';
import { CEFR_ORDER, SKILLS, cefrIndex } from './types';
import { stageCounts, stageOf, type Stage } from './mastery';
import { dayKey } from './fsrs';
import { levelProgress } from './progression';

export const LEVEL_VOCAB: Record<Cefr, number> = { A1: 0, A2: 600, B1: 1500, B2: 3000, C1: 6000, C2: 10000 };
export const TIERS = [
  { id: 'beginner', name: 'Beginner', at: 0 }, { id: 'novice', name: 'Novice', at: 25 }, { id: 'apprentice', name: 'Apprentice', at: 90 },
  { id: 'practitioner', name: 'Practitioner', at: 220 }, { id: 'adept', name: 'Adept', at: 450 },
  { id: 'expert', name: 'Expert', at: 800 }, { id: 'master', name: 'Master', at: 1300 },
];
export const tierFor = (points: number) => { let i = 0; TIERS.forEach((t, k) => { if (points >= t.at) i = k; }); return { index: i, ...TIERS[i], next: TIERS[i + 1] }; };

export interface SkillScore { score: number | null; n: number }
export interface Stats {
  vocabTotal: number; stages: Record<Stage, number>; retainedPlus: number;
  grammarMastered: number; grammarTotal: number; lessonsPassed: number;
  skills: Record<Skill, SkillScore>;
  studyTotalMin: number; study7Min: number; study30Min: number; activeDays14: number; consistency: number;
  conversationsDone: number; speakingSamples: number; writingSamples: number;
  estimate: { level: Cefr; progressToNext: number; confidence: 'low' | 'medium' | 'high'; basis: string };
  masteryPoints: number; tier: ReturnType<typeof tierFor>; strengths: Skill[]; weaknesses: Skill[];
  dueNow: number; programDaysDone: number;
}

export function skillScores(events: EventRec[]): Record<Skill, SkillScore> {
  const out = {} as Record<Skill, SkillScore>;
  for (const s of SKILLS) {
    const ev = events.filter((e) => e.skill === s && (e.correct !== undefined || e.score !== undefined)).slice(-60).reverse();
    if (!ev.length) { out[s] = { score: null, n: 0 }; continue; }
    let w = 0, a = 0, k = 1;
    for (const e of ev) { const v = e.score !== undefined ? e.score : e.correct ? 1 : 0; a += v * k; w += k; k *= 0.97; }
    out[s] = { score: a / w, n: ev.length };
  }
  return out;
}

export function computeStats(state: LangState, content: LanguageContent, cards: Card[], events: EventRec[], now = Date.now()): Stats {
  const vocabCards = cards.filter((c) => c.kind === 'vocab');
  const stages = stageCounts(vocabCards, content.vocab.length, now);
  const retainedPlus = stages.retained + stages.mastered;
  const skills = skillScores(events);

  const gl = content.grammar;
  const lessonScore = (id: string) => state.lessons[`grammar:${id}`]?.best ?? 0;
  const grammarMastered = gl.filter((g) => lessonScore(g.id) >= 0.8).length;
  const lessonsPassed = Object.values(state.lessons).filter((l) => l.best >= 0.8).length;

  const mins = (keys: string[]) => keys.reduce((n, k) => n + (state.studyMs[k] ?? 0), 0) / 60000;
  const dayKeys = (n: number) => Array.from({ length: n }, (_, i) => dayKey(now - i * 86_400_000));
  const studyTotalMin = Object.values(state.studyMs).reduce((a, b) => a + b, 0) / 60000;
  const activeDays14 = dayKeys(14).filter((k) => (state.studyMs[k] ?? 0) > 60_000).length;

  const conversationsDone = events.filter((e) => e.type === 'conversation' && (e.score ?? 0) >= 0.6).length;
  const speakingSamples = events.filter((e) => e.type === 'speaking').length;
  const writingSamples = events.filter((e) => e.type === 'writing').length;
  const programDaysDone = Object.keys(state.programDone).length;

  // Level estimate: placement baseline + retained vocabulary, gated by recent accuracy.
  const base: Cefr = state.placement?.overall ?? 'A1';
  const eff = retainedPlus + (state.placement ? LEVEL_VOCAB[base] : 0);
  let est: Cefr = base;
  for (const l of CEFR_ORDER) if (eff >= LEVEL_VOCAB[l] && LEVEL_VOCAB[l] > 0 && cefrIndex(l) > cefrIndex(est)) est = l;
  // The app's word lists are a core, not a full CEFR vocabulary, so also credit levels whose lessons AND words have been worked through:
  // level L counts once every level up to L has ≥ 75 % of its lessons passed and ≥ 60 % of its words retained.
  const retainedIds = new Set(vocabCards.filter((c) => { const st = stageOf(c, now); return st === 'retained' || st === 'mastered'; }).map((c) => c.itemId));
  let covered: Cefr | null = null;
  for (const l of CEFR_ORDER) {
    const lp = levelProgress(state, content, l); const words = content.vocab.filter((v) => v.level === l);
    const wordRatio = words.length ? words.filter((w) => retainedIds.has(w.id)).length / words.length : 1;
    if ((lp.total === 0 && words.length === 0) || (lp.ratio >= 0.75 && wordRatio >= 0.6 && (lp.total > 0 || words.length > 0))) covered = l; else break;
  }
  if (covered && cefrIndex(covered) > cefrIndex(est)) est = covered;
  const core = (['grammar', 'reading', 'listening', 'vocabulary'] as Skill[]).map((s) => skills[s]).filter((s) => s.n >= 10 && s.score !== null);
  const avg = core.length ? core.reduce((a, s) => a + (s.score as number), 0) / core.length : null;
  if (avg !== null && avg < 0.55 && cefrIndex(est) > 0) est = CEFR_ORDER[cefrIndex(est) - 1];
  const nxt = CEFR_ORDER[Math.min(5, cefrIndex(est) + 1)];
  const progressToNext = est === 'C2' ? 1 : Math.max(0, Math.min(1, (eff - LEVEL_VOCAB[est]) / (LEVEL_VOCAB[nxt] - LEVEL_VOCAB[est])));
  const nEv = events.length;
  const confidence = nEv < 40 ? 'low' : nEv < 200 ? 'medium' : 'high';
  const basis = state.placement ? `placement (${base}) + ${retainedPlus} words verified by spaced review` : `${retainedPlus} words verified by spaced review`;

  const masteryPoints = Math.round(
    stages.retained * 1 + stages.mastered * 3 + grammarMastered * 8 + conversationsDone * 4 + programDaysDone * 2 +
    (state.finalAssessment?.passed ? 50 : 0) + Math.min(30, lessonsPassed - grammarMastered) * 2);

  const ranked = SKILLS.filter((s) => skills[s].score !== null && skills[s].n >= 5).sort((a, b) => (skills[b].score as number) - (skills[a].score as number));
  return {
    vocabTotal: content.vocab.length, stages, retainedPlus, grammarMastered, grammarTotal: gl.length, lessonsPassed, skills,
    studyTotalMin, study7Min: mins(dayKeys(7)), study30Min: mins(dayKeys(30)), activeDays14, consistency: activeDays14 / 14,
    conversationsDone, speakingSamples, writingSamples,
    estimate: { level: est, progressToNext, confidence, basis },
    masteryPoints, tier: tierFor(masteryPoints),
    strengths: ranked.slice(0, 2).filter((s) => (skills[s].score as number) >= 0.75),
    weaknesses: ranked.slice(-2).reverse().filter((s) => (skills[s].score as number) < 0.75),
    dueNow: vocabCards.filter((c) => c.due <= now).length, programDaysDone,
  };
}

/** Retention curve: for cards due in the future/past, bucket by stability. */
export function retentionBuckets(cards: Card[]) {
  const b = [['<1d', 0], ['1–3d', 0], ['3–7d', 0], ['1–3w', 0], ['3w+', 0]] as [string, number][];
  for (const c of cards) { if (!c.reps) continue; const s = c.stability; b[s < 1 ? 0 : s < 3 ? 1 : s < 7 ? 2 : s < 21 ? 3 : 4][1]++; }
  return b;
}
export function dailyMinutes(state: LangState, days: number, now = Date.now()) {
  return Array.from({ length: days }, (_, i) => { const k = dayKey(now - (days - 1 - i) * 86_400_000); return { day: k, min: (state.studyMs[k] ?? 0) / 60000 }; });
}
/** Accuracy per week for a skill (for trend charts). */
export function weeklyAccuracy(events: EventRec[], now = Date.now(), weeks = 8) {
  return Array.from({ length: weeks }, (_, i) => {
    const end = now - (weeks - 1 - i) * 7 * 86_400_000, start = end - 7 * 86_400_000;
    const ev = events.filter((e) => e.ts > start && e.ts <= end && (e.correct !== undefined || e.score !== undefined));
    const acc = ev.length ? ev.reduce((a, e) => a + (e.score !== undefined ? e.score : e.correct ? 1 : 0), 0) / ev.length : null;
    return { label: `W${i + 1}`, acc, n: ev.length };
  });
}
