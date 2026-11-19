import type { LangState, Profile } from './types';
import type { Stats } from './analytics';

export interface AchCtx { profile: Profile; lang: string; state: LangState; stats: Stats; allStats: { lang: string; stats: Stats }[]; openConvs: number; }
export interface Ach { id: string; title: string; desc: string; group: 'mastery' | 'consistency' | 'communication' | 'programme'; xp: number; check: (c: AchCtx) => boolean; progress?: (c: AchCtx) => [number, number]; }
const p = (n: number, t: number): [number, number] => [Math.min(n, t), t];

export const ACHIEVEMENTS: Ach[] = [
  { id: 'first-conversation', group: 'communication', title: 'First words', desc: 'Complete a conversation with ≥60% accuracy.', xp: 20, check: (c) => c.stats.conversationsDone >= 1, progress: (c) => p(c.stats.conversationsDone, 1) },
  { id: 'independent-talker', group: 'communication', title: 'On your own', desc: 'Answer 5 open-ended conversation turns sets without option buttons, scoring ≥70%.', xp: 60, check: (c) => c.openConvs >= 5, progress: (c) => p(c.openConvs, 5) },
  { id: 'speaker-10', group: 'communication', title: 'Spoken aloud', desc: 'Record or recognise 10 spoken attempts.', xp: 30, check: (c) => c.stats.speakingSamples >= 10, progress: (c) => p(c.stats.speakingSamples, 10) },
  { id: 'writer-5', group: 'communication', title: 'Writer', desc: 'Submit 5 writing tasks that meet the checklist.', xp: 40, check: (c) => c.stats.writingSamples >= 5, progress: (c) => p(c.stats.writingSamples, 5) },
  { id: 'words-retained-25', group: 'mastery', title: 'Sticky memory', desc: 'Retain 25 words (recalled on 2+ days, stability ≥ 7 d).', xp: 40, check: (c) => c.stats.retainedPlus >= 25, progress: (c) => p(c.stats.retainedPlus, 25) },
  { id: 'words-retained-100', group: 'mastery', title: 'Hundred kept', desc: 'Retain 100 words.', xp: 100, check: (c) => c.stats.retainedPlus >= 100, progress: (c) => p(c.stats.retainedPlus, 100) },
  { id: 'words-retained-250', group: 'mastery', title: 'Working vocabulary', desc: 'Retain 250 words.', xp: 200, check: (c) => c.stats.retainedPlus >= 250, progress: (c) => p(c.stats.retainedPlus, 250) },
  { id: 'words-mastered-10', group: 'mastery', title: 'Rock solid', desc: 'Master 10 words (stability ≥ 21 d and produced from memory).', xp: 80, check: (c) => c.stats.stages.mastered >= 10, progress: (c) => p(c.stats.stages.mastered, 10) },
  { id: 'words-mastered-50', group: 'mastery', title: 'Long-term memory', desc: 'Master 50 words.', xp: 200, check: (c) => c.stats.stages.mastered >= 50, progress: (c) => p(c.stats.stages.mastered, 50) },
  { id: 'grammar-5', group: 'mastery', title: 'Pattern spotter', desc: 'Pass 5 grammar mastery checks (≥80%).', xp: 50, check: (c) => c.stats.grammarMastered >= 5, progress: (c) => p(c.stats.grammarMastered, 5) },
  { id: 'grammar-15', group: 'mastery', title: 'Grammar engine', desc: 'Pass 15 grammar mastery checks.', xp: 150, check: (c) => c.stats.grammarMastered >= 15, progress: (c) => p(c.stats.grammarMastered, 15) },
  { id: 'listening-ace', group: 'mastery', title: 'Good ears', desc: 'Hold ≥85% listening accuracy over 20+ exercises.', xp: 80, check: (c) => (c.stats.skills.listening.score ?? 0) >= 0.85 && c.stats.skills.listening.n >= 20, progress: (c) => p(c.stats.skills.listening.n, 20) },
  { id: 'reader', group: 'mastery', title: 'Reader', desc: 'Hold ≥85% reading accuracy over 15+ exercises.', xp: 80, check: (c) => (c.stats.skills.reading.score ?? 0) >= 0.85 && c.stats.skills.reading.n >= 15, progress: (c) => p(c.stats.skills.reading.n, 15) },
  { id: 'streak-3', group: 'consistency', title: 'Three days', desc: '3-day study streak.', xp: 15, check: (c) => c.state.streak.best >= 3, progress: (c) => p(c.state.streak.best, 3) },
  { id: 'streak-7', group: 'consistency', title: 'One full week', desc: '7-day study streak.', xp: 40, check: (c) => c.state.streak.best >= 7, progress: (c) => p(c.state.streak.best, 7) },
  { id: 'streak-30', group: 'consistency', title: 'Habit formed', desc: '30-day study streak.', xp: 150, check: (c) => c.state.streak.best >= 30, progress: (c) => p(c.state.streak.best, 30) },
  { id: 'program-5', group: 'programme', title: 'Foundations laid', desc: 'Complete programme days 1–5.', xp: 40, check: (c) => c.stats.programDaysDone >= 5, progress: (c) => p(c.stats.programDaysDone, 5) },
  { id: 'program-10', group: 'programme', title: 'Everyday speaker', desc: 'Complete programme day 10.', xp: 60, check: (c) => c.stats.programDaysDone >= 10, progress: (c) => p(c.stats.programDaysDone, 10) },
  { id: 'program-20', group: 'programme', title: 'Independent', desc: 'Complete programme day 20.', xp: 100, check: (c) => c.stats.programDaysDone >= 20, progress: (c) => p(c.stats.programDaysDone, 20) },
  { id: 'program-30', group: 'programme', title: '30 days', desc: 'Complete all 30 programme days.', xp: 200, check: (c) => c.stats.programDaysDone >= 30, progress: (c) => p(c.stats.programDaysDone, 30) },
  { id: 'final-passed', group: 'programme', title: 'Assessed', desc: 'Pass the final assessment (≥70%).', xp: 250, check: (c) => !!c.state.finalAssessment?.passed },
  { id: 'immersion-3', group: 'communication', title: 'Thinking in it', desc: 'Reach Immersion level 3 (natural speed, no translations).', xp: 60, check: (c) => c.state.immersion >= 3, progress: (c) => p(c.state.immersion, 3) },
  { id: 'polyglot', group: 'mastery', title: 'Polyglot in progress', desc: 'Retain 25+ words in two different languages.', xp: 120, check: (c) => c.allStats.filter((s) => s.stats.retainedPlus >= 25).length >= 2 },
];

export function newlyEarned(ctx: AchCtx): Ach[] {
  return ACHIEVEMENTS.filter((a) => !ctx.profile.achievements[a.id] && a.check(ctx));
}
