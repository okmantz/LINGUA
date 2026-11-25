import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { KO_VOCAB } from './vocab'; import { KO_GRAMMAR } from './grammar'; import { KO_CONVS } from './convs';
import { KO_READING, KO_LISTENING, KO_WRITING, KO_PRON, KO_CHEATS, KO_PLACEMENT, KO_UI } from './texts';

import { KO_VOCAB_ADV, KO_GRAMMAR_ADV, KO_CONVS_ADV, KO_READING_ADV, KO_LISTENING_ADV, KO_WRITING_ADV, KO_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(KO_VOCAB + KO_VOCAB_ADV), grammar: parseGrammar(KO_GRAMMAR + KO_GRAMMAR_ADV), conversations: parseConvs(KO_CONVS + KO_CONVS_ADV),
  reading: parseReading(KO_READING + KO_READING_ADV), listening: parseListening(KO_LISTENING + KO_LISTENING_ADV), pronunciation: parsePron(KO_PRON),
  writing: parseWriting(KO_WRITING + KO_WRITING_ADV), cheats: parseCheats(KO_CHEATS), placement: parsePlacement(KO_PLACEMENT + KO_PLACEMENT_ADV),
  ui: KO_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
