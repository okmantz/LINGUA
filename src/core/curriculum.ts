// Resolves language-independent programme slots to concrete content for one language.
import { PROGRAM, type DayDef } from './program';
import type { Conversation, GrammarLesson, LanguageContent, ListeningItem, PronLesson, ReadingText, VocabEntry, WritingPrompt, Cefr } from './types';
import { cefrIndex } from './types';

export interface DayContent {
  def: DayDef; words: VocabEntry[]; grammar: GrammarLesson[]; conv?: Conversation; reading?: ReadingText;
  listening?: ListeningItem; pron?: PronLesson; writing?: WritingPrompt;
}
const bySlot = <T extends { slot: string }>(arr: T[], slot?: string) => (slot ? arr.find((x) => x.slot === slot) : undefined);

/** New words for a day = unseen words in the day's categories, highest-level-appropriate first, stable order. */
export function dayWords(def: DayDef, content: LanguageContent, claimed: Set<string>): VocabEntry[] {
  if (!def.cats.length || def.newWords === 0) return [];
  const out: VocabEntry[] = [];
  // pass 1: A1 words in theme order; pass 2: allow A2 if the theme is short of A1 words
  for (const maxLevel of [0, 1]) {
    for (const cat of def.cats) {
      for (const v of content.vocab) {
        if (out.length >= def.newWords) return out;
        if (v.cat === cat && !claimed.has(v.id) && !out.includes(v) && cefrIndex(v.level) <= maxLevel) out.push(v);
      }
    }
  }
  return out;
}

export function resolveProgram(content: LanguageContent): DayContent[] {
  const claimed = new Set<string>();
  return PROGRAM.map((base) => {
    const def: DayDef = { ...base, ...(content.pace?.[base.day] ?? {}) };
    const words = dayWords(def, content, claimed);
    words.forEach((w) => claimed.add(w.id));
    return {
      def, words,
      grammar: def.grammar.map((s) => bySlot(content.grammar, s)).filter(Boolean) as GrammarLesson[],
      conv: bySlot(content.conversations, def.conv), reading: bySlot(content.reading, def.reading),
      listening: bySlot(content.listening, def.listening), pron: bySlot(content.pronunciation, def.pron),
      writing: bySlot(content.writing, def.writing),
    };
  });
}

/** How far a level is from the learner's level, as a sort key: the learner's own level first, then one step up (a stretch),
 *  then one step down (a refresher), then two up, two down, and so on. Everything else keeps its authored order. */
export function levelDistance(item: Cefr, level: Cefr): number {
  const d = cefrIndex(item) - cefrIndex(level);
  return d === 0 ? 0 : d > 0 ? d * 2 - 1 : -d * 2;
}
/** Stable sort of any levelled list so the learner's level comes first. Array.prototype.sort is stable, so authored order is kept within a level. */
export function rankForLevel<T extends { level: Cefr }>(list: T[], level: Cefr): T[] {
  return list.map((x, i) => ({ x, i, k: levelDistance(x.level, level) })).sort((a, b) => a.k - b.k || a.i - b.i).map((r) => r.x);
}

/** The learner's pathway: every item, ordered so that material AT their level comes first, then the next level up, then easier levels.
 *  Previously this returned "everything at or below the level in file order", which put A1 greetings in front of a B2 learner.
 *  Easier levels stay available (they are never removed) but only come up once the level itself has nothing left to offer. */
export function pathwayItems(content: LanguageContent, level: Cefr) {
  return {
    grammar: rankForLevel(content.grammar, level), conversations: rankForLevel(content.conversations, level),
    reading: rankForLevel(content.reading, level), listening: rankForLevel(content.listening, level),
    writing: rankForLevel(content.writing, level), pron: rankForLevel(content.pronunciation, level),
    vocab: rankForLevel(content.vocab, level),
  };
}
