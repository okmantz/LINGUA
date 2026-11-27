// "What should I do next?" — pure logic behind the guided experience. No UI, fully testable.
import type { Cefr, LangState, LanguageContent, Skill } from './types';
import { PROGRAM, PROGRAM_LENGTH } from './program';
import { resolveProgram, pathwayItems } from './curriculum';
import type { SessionPlan } from './session';

export type LibKind = 'grammar' | 'conversations' | 'listening' | 'reading' | 'writing' | 'pronunciation';
export const LIB_KINDS: LibKind[] = ['grammar', 'conversations', 'listening', 'reading', 'writing', 'pronunciation'];
/** Storage key used for a library item in LangState.lessons / dayProgress. */
export const LIB_KEY: Record<LibKind, (id: string) => string> = {
  grammar: (id) => `grammar:${id}`, conversations: (id) => `conv:${id}`, listening: (id) => `listening:${id}`,
  reading: (id) => `reading:${id}`, writing: (id) => `writing:${id}`, pronunciation: (id) => `pron:${id}`,
};
export const PASS = 0.8;

/** The level the learner is working at right now: A1 during the beginner programme, otherwise their pathway level (which placement sets). */
export const currentLevel = (s: LangState): Cefr => (programActive(s) ? 'A1' : s.pathLevel);
export const programActive = (s: LangState) => s.programDay <= PROGRAM_LENGTH && !s.placement?.skipProgram;
export const programFinished = (s: LangState) => s.programDay > PROGRAM_LENGTH && !s.placement?.skipProgram;

export const SKILL_ROUTE: Record<Skill, { to: string; label: string }> = {
  vocabulary: { to: '/vocabulary', label: 'vocabulary' }, grammar: { to: '/grammar', label: 'grammar' }, reading: { to: '/reading', label: 'reading' },
  listening: { to: '/listening', label: 'listening' }, writing: { to: '/writing', label: 'writing' }, speaking: { to: '/pronunciation', label: 'pronunciation' },
  conversation: { to: '/conversations', label: 'conversation' },
};

export interface NextStep { kind: 'session' | 'assessment' | 'extra' | 'rest'; title: string; body: string; cta: string; to: string; minutes?: number }

export function nextStep(i: { state: LangState; plan: SessionPlan; todayMin: number; weakest?: Skill }): NextStep {
  const { state, plan, todayMin, weakest } = i; const active = programActive(state);
  const requiredLeft = plan.blocks.filter((b) => b.required).length;
  const goalMet = todayMin >= state.dailyMinutes;
  if (programFinished(state) && !state.finalAssessment) return { kind: 'assessment', title: '30 days done — take your final assessment', body: 'A short mixed check shows how solid your beginner foundation is, and what to review next.', cta: 'Take the assessment', to: '/assessment' };
  if (goalMet && (!active || requiredLeft === 0)) {
    const w = weakest ? SKILL_ROUTE[weakest] : null;
    return w
      ? { kind: 'extra', title: 'Daily goal complete', body: `Anything more is a bonus. Your ${w.label} has the most room to grow.`, cta: `Practise ${w.label}`, to: w.to }
      : { kind: 'rest', title: 'Daily goal complete', body: 'Nice work. Rest helps memory settle, so come back tomorrow, or browse your progress.', cta: 'See my progress', to: '/progress' };
  }
  if (active) {
    const d = PROGRAM[state.programDay - 1];
    return { kind: 'session', title: `Day ${state.programDay}: ${d.title}`, body: `${plan.blocks.length} short step${plan.blocks.length === 1 ? '' : 's'}, about ${plan.minutes} min.${plan.dueTotal ? ` Starts with ${plan.dueTotal} review${plan.dueTotal === 1 ? '' : 's'}.` : ''}`, cta: `Start Day ${state.programDay}`, to: '/daily', minutes: plan.minutes };
  }
  return { kind: 'session', title: plan.focus === 'Balanced practice' ? "Today's practice" : plan.focus, body: plan.blocks.length ? `${plan.blocks.length} step${plan.blocks.length === 1 ? '' : 's'}, about ${plan.minutes} min, chosen for your level.` : 'Pick a skill from Practice to get started.', cta: 'Start practice', to: '/daily', minutes: plan.minutes };
}

const listFor = (c: LanguageContent, k: LibKind): { id: string; level: string }[] =>
  k === 'grammar' ? c.grammar : k === 'conversations' ? c.conversations : k === 'listening' ? c.listening : k === 'reading' ? c.reading : k === 'writing' ? c.writing : c.pronunciation;
const pathKey = { grammar: 'grammar', conversations: 'conversations', listening: 'listening', reading: 'reading', writing: 'writing', pronunciation: 'pron' } as const;

/** The single library item to suggest next for a skill (today's programme lesson, else the next undone item at the learner's level). */
export function recommendedItem(kind: LibKind, state: LangState, content: LanguageContent, exclude?: string): string | null {
  const done = (id: string) => (state.lessons[LIB_KEY[kind](id)]?.best ?? 0) >= PASS;
  if (programActive(state)) {
    const day = resolveProgram(content)[state.programDay - 1];
    const today = day ? ({ grammar: day.grammar, conversations: day.conv ? [day.conv] : [], listening: day.listening ? [day.listening] : [], reading: day.reading ? [day.reading] : [], writing: day.writing ? [day.writing] : [], pronunciation: day.pron ? [day.pron] : [] })[kind] : [];
    const pick = today.find((x) => x.id !== exclude && !done(x.id) && !(state.dayProgress[state.programDay] ?? []).includes(LIB_KEY[kind](x.id)));
    if (pick) return pick.id;
  }
  const lvl = currentLevel(state);
  const atLevel = (pathwayItems(content, lvl)[pathKey[kind]] as { id: string }[]).find((x) => x.id !== exclude && !done(x.id));
  if (atLevel) return atLevel.id;
  return listFor(content, kind).find((x) => x.id !== exclude && !done(x.id))?.id ?? null;
}

/** How many items of a kind are passed (>= 80%) — drives the "x of y" progress bars. */
export function passedCount(kind: LibKind, state: LangState, content: LanguageContent) {
  const all = listFor(content, kind); return { done: all.filter((x) => (state.lessons[LIB_KEY[kind](x.id)]?.best ?? 0) >= PASS).length, total: all.length };
}
