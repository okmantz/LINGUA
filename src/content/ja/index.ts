import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { JA_VOCAB } from './vocab'; import { JA_GRAMMAR } from './grammar'; import { JA_CONVS } from './convs';
import { JA_READING, JA_LISTENING, JA_WRITING, JA_PRON, JA_CHEATS, JA_PLACEMENT, JA_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(JA_VOCAB), grammar: parseGrammar(JA_GRAMMAR), conversations: parseConvs(JA_CONVS),
  reading: parseReading(JA_READING), listening: parseListening(JA_LISTENING), pronunciation: parsePron(JA_PRON),
  writing: parseWriting(JA_WRITING), cheats: parseCheats(JA_CHEATS), placement: parsePlacement(JA_PLACEMENT),
  ui: JA_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
