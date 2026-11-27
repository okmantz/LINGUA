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
  fig?: string;         // sign-language figure spec (see components/SignFigure.tsx); only used by sign languages
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
export interface PlacementItem {
  id: string; skill: Skill; level: Cefr; ex: Exercise; audio?: string;
  /** Optional fine-tuning of difficulty on the CEFR scale (A1 = 0 … C2 = 5). Typed answers are harder than recognising the same word. */
  shift?: number;
  /** Sign-language figure spec shown with the question. */
  fig?: string;
}

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
  /** Optional per-day overrides of the shared 30-day plan (e.g. extra script/letter cards on days 1-3 for non-Latin languages). */
  pace?: Record<number, { cats?: string[]; newWords?: number }>;
}
export interface LanguageConfig {
  code: LangCode; name: string; endonym: string; tts: string; accents: string[];
  blurb: string; load: () => Promise<LanguageContent>;
  /** Writing system: drives keyboards, RTL layout and how typed answers are accepted. Default 'latin'. */
  script?: 'latin' | 'cyrillic' | 'arabic' | 'han' | 'kana' | 'hangul';
  rtl?: boolean;                 // right-to-left (Arabic)
  noGender?: boolean;            // no grammatical gender on nouns (Chinese, Japanese, Korean)
  romanLabel?: string;           // what the `pron` line is called: "Pinyin", "Rōmaji", "Romanization"…
  /** US Foreign Service Institute difficulty for English speakers (1 easiest … 4 hardest) and typical class hours to professional proficiency. */
  fsi?: { category: 1 | 2 | 3 | 4; hours: number };
  /** The honest, realistic 30-day outcome for this language at the recommended daily time. */
  outcome?: string;
  /** Per-level overrides of the minimum material the content tests demand (only for languages where a level is deliberately lighter). */
  depth?: Partial<Record<Cefr, Partial<{ vocab: number; grammar: number; conv: number; reading: number; listening: number; writing: number }>>>;
  /** Sign language: no audio, no spoken pronunciation; vocabulary is shown as sign figures. */
  sign?: boolean;
}

// ── User data ──
/** A profile picture is one of a small set of designed characters (see core/cosmetics.ts).
 *  The numeric fields are from the old custom-avatar editor; they are kept optional so old saves and backups still load. */
export interface AvatarConfig {
  char: string;
  skin?: number; hair?: number; hairColor?: number; eyes?: number; mouth?: number; accessory?: number; outfit?: number; bg?: number;
}
/** Teacher settings + which tips have already been shown (so she never repeats herself). */
export interface TeacherPrefs { off?: boolean; seen: Record<string, number> }
export type ThemeMode = 'system' | 'light' | 'dark';
export interface PlacementResult {
  takenAt: number; overall: Cefr; bySkill: Partial<Record<Skill, Cefr>>; weaknesses: Skill[];
  startDay: number; skipProgram: boolean; answered: number; correct: number;
  /** Ability estimate on the CEFR scale (A1 = 0 … C2 = 5), its standard error and how much to trust it. */
  theta?: number; sd?: number; confidence?: 'low' | 'medium' | 'high'; range?: [Cefr, Cefr]; skipped?: number;
  /** True when the learner chose their level themselves instead of taking the test. */
  manual?: boolean;
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
  teacher?: TeacherPrefs;
  /** Set on every save; when IndexedDB and the localStorage mirror disagree, the newer one wins. */
  updatedAt?: number;
}

// ── Cards (spaced repetition) ──
export type Mode = 'recog' | 'rev' | 'listen' | 'cloze' | 'produce' | 'dictate';
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
