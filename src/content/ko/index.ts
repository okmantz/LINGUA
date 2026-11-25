import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { KO_VOCAB } from './vocab'; import { KO_GRAMMAR } from './grammar'; import { KO_CONVS } from './convs';
import { KO_READING, KO_LISTENING, KO_WRITING, KO_PRON, KO_CHEATS, KO_PLACEMENT, KO_UI } from './texts';

import { KO_VOCAB_EXT, KO_GRAMMAR_EXT, KO_CONVS_EXT, KO_READING_EXT, KO_LISTENING_EXT, KO_WRITING_EXT, KO_PLACEMENT_EXT } from './ext';
import { KO_VOCAB_ADV, KO_GRAMMAR_ADV, KO_CONVS_ADV, KO_READING_ADV, KO_LISTENING_ADV, KO_WRITING_ADV, KO_PLACEMENT_ADV } from './adv';
import { KO_VOCAB_DEEP, KO_GRAMMAR_DEEP } from './deep'; import { KO_CONVS_DEEP, KO_READING_DEEP, KO_LISTENING_DEEP, KO_WRITING_DEEP, KO_PLACEMENT_DEEP, KO_CHEATS_DEEP, KO_PRON_DEEP } from './deep2';
const content: LanguageContent = {
  vocab: parseVocab(KO_VOCAB + KO_VOCAB_ADV + KO_VOCAB_EXT + KO_VOCAB_DEEP), grammar: parseGrammar(KO_GRAMMAR + KO_GRAMMAR_ADV + KO_GRAMMAR_EXT + KO_GRAMMAR_DEEP), conversations: parseConvs(KO_CONVS + KO_CONVS_ADV + KO_CONVS_EXT + KO_CONVS_DEEP),
  reading: parseReading(KO_READING + KO_READING_ADV + KO_READING_EXT + KO_READING_DEEP), listening: parseListening(KO_LISTENING + KO_LISTENING_ADV + KO_LISTENING_EXT + KO_LISTENING_DEEP), pronunciation: parsePron(KO_PRON + KO_PRON_DEEP),
  writing: parseWriting(KO_WRITING + KO_WRITING_ADV + KO_WRITING_EXT + KO_WRITING_DEEP), cheats: parseCheats(KO_CHEATS + KO_CHEATS_DEEP), placement: parsePlacement(KO_PLACEMENT + KO_PLACEMENT_ADV + KO_PLACEMENT_EXT + KO_PLACEMENT_DEEP),
  ui: KO_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
