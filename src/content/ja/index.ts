import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { JA_VOCAB } from './vocab'; import { JA_GRAMMAR } from './grammar'; import { JA_CONVS } from './convs';
import { JA_READING, JA_LISTENING, JA_WRITING, JA_PRON, JA_CHEATS, JA_PLACEMENT, JA_UI } from './texts';

import { JA_VOCAB_ADV, JA_GRAMMAR_ADV, JA_CONVS_ADV, JA_READING_ADV, JA_LISTENING_ADV, JA_WRITING_ADV, JA_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(JA_VOCAB + JA_VOCAB_ADV), grammar: parseGrammar(JA_GRAMMAR + JA_GRAMMAR_ADV), conversations: parseConvs(JA_CONVS + JA_CONVS_ADV),
  reading: parseReading(JA_READING + JA_READING_ADV), listening: parseListening(JA_LISTENING + JA_LISTENING_ADV), pronunciation: parsePron(JA_PRON),
  writing: parseWriting(JA_WRITING + JA_WRITING_ADV), cheats: parseCheats(JA_CHEATS), placement: parsePlacement(JA_PLACEMENT + JA_PLACEMENT_ADV),
  ui: JA_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
