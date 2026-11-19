// ───────────────────────── Shared domain types ─────────────────────────
export type LangCode = string;
export type Cefr = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export const CEFR_ORDER: Cefr[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const cefrIndex = (l: Cefr) => CEFR_ORDER.indexOf(l);

export type Skill = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'speaking' | 'conversation';
export const SKILLS: Skill[] = ['vocabulary', 'grammar', 'reading', 'listening', 'writing', 'speaking', 'conversation'];

// ── Content (authored per language, loaded lazily) ──
export interface VocabEntry {
  id: string;
  cat: string;          // category id (see VOCAB_CATEGORIES)
  t: string;            // target-language form (with article for nouns where relevant)
  n: string;            // English meaning
  pos: string;          // noun | verb | adj | adv | phrase | prep | pron | conj | num
  gender?: string;      // m | f | n | mf
  pron: string;         // learner-friendly respelling (CAPS = stressed syllable)
  ex: string;           // example sentence (target)
  exn: string;          // example translation
  level: Cefr;
  note?: string;        // grammar / usage note
  related?: string[];   // related vocab ids
}

export type Exercise =
  | { kind: 'mcq'; prompt: string; choices: string[]; answer: number; explain?: string; skill?: Skill; level?: Cefr }
  | { kind: 'fill'; prompt: string; answers: string[]; hint?: string; explain?: string; skill?: Skill; level?: Cefr }
  | { kind: 'order'; prompt: string; words: string[]; answer: string; explain?: string; skill?: Skill; level?: Cefr }
  | { kind: 'type'; prompt: string; answers: string[]; explain?: string; skill?: Skill; level?: Cefr };

export interface GrammarLesson {
  id: string;
  slot: string;           // language-independent slot used by the 30-day program, e.g. "be-verb"
  title: string;
  level: Cefr;
  summary: string;
  body: string[];         // paragraphs (supports **bold**)
  table?: { caption?: string; rows: string[][] };  // first row = header
  examples: [string, string][];
  mistakes: string[];
  exercises: Exercise[];
}

export interface ConvStep {
  npc: { t: string; n: string };
  options: { t: string; n: string; good: boolean; why?: string }[];  // guided mode
  model: { t: string; n: string };                                    // model reply for open mode
  keywords: string[][];                                              // groups of alternatives for open mode
}
export interface Conversation {
  id: string; slot: string; title: string; level: Cefr; scenario: string; steps: ConvStep[];
}

export interface ReadingText {
  id: string; slot: string; title: string; level: Cefr; paragraphs: string[]; translation: string[];
  glossary: [string, string][]; questions: Exercise[];
}
export interface ListeningItem {
  id: string; slot: string; title: string; level: Cefr; lines: { spk: string; t: string; n: string }[]; questions: Exercise[];
}
export interface PronSound { sym: string; tip: string; examples: [string, string][]; }
export interface PronLesson {
  id: string; slot: string; title: string; level: Cefr; intro: string; sounds: PronSound[];
  minimalPairs: [string, string, string][]; drills: string[]; mistakes: string[];
}
export interface WritingPrompt {
  id: string; slot: string; title: string; level: Cefr; task: string; minWords: number;
  requires: { label: string; any: string[] }[]; model: string; modelN: string;
}
export interface CheatSection { id: string; title: string; tags: string[]; rows: string[][]; note?: string; }
export interface PlacementItem { id: string; skill: Skill; level: Cefr; ex: Exercise; audio?: string; }

export interface LanguageUI { // target-language interface strings used by Immersion mode
  choose: string; check: string; next: string; correct: string; wrong: string; listen: string;
  translate: string; fill: string; order: string; answer: string; well: string; again: string; read: string; speak: string;
}
export interface LanguageContent {
  vocab: VocabEntry[];
  grammar: GrammarLesson[];
  conversations: Conversation[];
  reading: ReadingText[];
  listening: ListeningItem[];
  pronunciation: PronLesson[];
  writing: WritingPrompt[];
  cheats: CheatSection[];
  placement: PlacementItem[];
  ui: LanguageUI;
  grammarLevels: Record<string, string>; // optional per-language notes
}
export interface LanguageConfig {
  code: LangCode; name: string; endonym: string; tts: string; accents: string[];
  blurb: string; load: () => Promise<LanguageContent>;
}

// ── User data ──
export interface AvatarConfig {
  skin: number; hair: number; hairColor: number; eyes: number; mouth: number; accessory: number; outfit: number; bg: number;
}
export type ThemeMode = 'system' | 'light' | 'dark';
export interface PlacementResult {
  takenAt: number; overall: Cefr; bySkill: Partial<Record<Skill, Cefr>>; weaknesses: Skill[];
  startDay: number; skipProgram: boolean; answered: number; correct: number;
}
export interface DayRecord { completedAt: number; score: number; }
export interface LangState {
  code: LangCode; startedAt: number; dailyMinutes: number; placement?: PlacementResult;
  programDay: number;                         // next day to do (1–31; 31 = finished)
  programDone: Record<number, DayRecord>;
  dayProgress: Record<number, string[]>;     // completed block keys for each programme day
  finalAssessment?: { at: number; score: number; passed: boolean; cefr: Cefr };
  xp: number;
  streak: { current: number; best: number; lastDay: string };
  studyMs: Record<string, number>;            // yyyy-mm-dd -> ms
  immersion: number;                          // 0..5
  immersionAuto: boolean;
  lessons: Record<string, { best: number; count: number; last: number }>; // grammar/reading/listening/etc
  weeklyReviews: Record<string, { at: number; notes: string }>;
  pathLevel: Cefr;                            // current pathway level after programme
}
export interface Settings {
  mode: ThemeMode; accent: string; ttsRate: number; reminders: boolean; reminderTime: string;
  showRomanization: boolean; reducedMotion: boolean; largeText: boolean;
}
export interface Profile {
  schema: number; id: string; username: string; avatar: AvatarConfig; createdAt: number;
  activeLang: LangCode | null; languages: Record<LangCode, LangState>;
  achievements: Record<string, number>; settings: Settings; unlockedCosmetics: string[];
  lastBackup?: number;
}

// ── Cards (spaced repetition) ──
export type Mode = 'recog' | 'rev' | 'listen' | 'cloze' | 'produce';
export interface Card {
  key: string;            // `${lang}:${itemId}`
  lang: LangCode; itemId: string; kind: 'vocab' | 'grammar';
  state: 0 | 1 | 2 | 3;   // new, learning, review, relearning
  due: number; stability: number; difficulty: number;
  reps: number; lapses: number; last: number; firstSeen: number;
  days: string[];         // distinct review days (yyyy-mm-dd), capped
  modes: Partial<Record<Mode, { ok: number; fail: number }>>;
}
export type Grade = 1 | 2 | 3 | 4;

export interface EventRec {
  id?: number; ts: number; lang: LangCode;
  type: 'review' | 'exercise' | 'assessment' | 'conversation' | 'study' | 'writing' | 'speaking';
  skill: Skill; itemId?: string; correct?: boolean; ms?: number; score?: number; meta?: string;
}
