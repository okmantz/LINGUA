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
  return PROGRAM.map((def) => {
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

/** After the programme: everything at/below a level, ordered by level. */
export function pathwayItems(content: LanguageContent, level: Cefr) {
  const ok = (l: Cefr) => cefrIndex(l) <= cefrIndex(level);
  return {
    grammar: content.grammar.filter((g) => ok(g.level)), conversations: content.conversations.filter((c) => ok(c.level)),
    reading: content.reading.filter((r) => ok(r.level)), listening: content.listening.filter((l) => ok(l.level)),
    writing: content.writing.filter((w) => ok(w.level)), pron: content.pronunciation.filter((p) => ok(p.level)),
    vocab: content.vocab.filter((v) => ok(v.level)),
  };
}
