import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { FR_VOCAB } from './vocab'; import { FR_GRAMMAR } from './grammar'; import { FR_CONVS } from './convs';
import { FR_READING, FR_LISTENING, FR_WRITING, FR_PRON, FR_CHEATS, FR_PLACEMENT, FR_UI } from './texts';

import { FR_VOCAB_EXT, FR_GRAMMAR_EXT, FR_CONVS_EXT, FR_READING_EXT, FR_LISTENING_EXT, FR_WRITING_EXT, FR_PLACEMENT_EXT } from './ext';
import { FR_VOCAB_ADV, FR_GRAMMAR_ADV, FR_CONVS_ADV, FR_READING_ADV, FR_LISTENING_ADV, FR_WRITING_ADV, FR_PLACEMENT_ADV } from './adv';
import { FR_VOCAB_DEEP, FR_GRAMMAR_DEEP } from './deep'; import { FR_CONVS_DEEP, FR_READING_DEEP, FR_LISTENING_DEEP, FR_WRITING_DEEP, FR_PLACEMENT_DEEP, FR_CHEATS_DEEP, FR_PRON_DEEP } from './deep2';
const content: LanguageContent = {
  vocab: parseVocab(FR_VOCAB + FR_VOCAB_ADV + FR_VOCAB_EXT + FR_VOCAB_DEEP), grammar: parseGrammar(FR_GRAMMAR + FR_GRAMMAR_ADV + FR_GRAMMAR_EXT + FR_GRAMMAR_DEEP), conversations: parseConvs(FR_CONVS + FR_CONVS_ADV + FR_CONVS_EXT + FR_CONVS_DEEP),
  reading: parseReading(FR_READING + FR_READING_ADV + FR_READING_EXT + FR_READING_DEEP), listening: parseListening(FR_LISTENING + FR_LISTENING_ADV + FR_LISTENING_EXT + FR_LISTENING_DEEP), pronunciation: parsePron(FR_PRON + FR_PRON_DEEP),
  writing: parseWriting(FR_WRITING + FR_WRITING_ADV + FR_WRITING_EXT + FR_WRITING_DEEP), cheats: parseCheats(FR_CHEATS + FR_CHEATS_DEEP), placement: parsePlacement(FR_PLACEMENT + FR_PLACEMENT_ADV + FR_PLACEMENT_EXT + FR_PLACEMENT_DEEP),
  ui: FR_UI, grammarLevels: {},
};
export default content;
