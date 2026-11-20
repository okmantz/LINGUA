import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { KO_VOCAB } from './vocab'; import { KO_GRAMMAR } from './grammar'; import { KO_CONVS } from './convs';
import { KO_READING, KO_LISTENING, KO_WRITING, KO_PRON, KO_CHEATS, KO_PLACEMENT, KO_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(KO_VOCAB), grammar: parseGrammar(KO_GRAMMAR), conversations: parseConvs(KO_CONVS),
  reading: parseReading(KO_READING), listening: parseListening(KO_LISTENING), pronunciation: parsePron(KO_PRON),
  writing: parseWriting(KO_WRITING), cheats: parseCheats(KO_CHEATS), placement: parsePlacement(KO_PLACEMENT),
  ui: KO_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
