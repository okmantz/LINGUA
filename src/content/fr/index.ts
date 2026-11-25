import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { FR_VOCAB } from './vocab'; import { FR_GRAMMAR } from './grammar'; import { FR_CONVS } from './convs';
import { FR_READING, FR_LISTENING, FR_WRITING, FR_PRON, FR_CHEATS, FR_PLACEMENT, FR_UI } from './texts';

import { FR_VOCAB_EXT, FR_GRAMMAR_EXT, FR_CONVS_EXT, FR_READING_EXT, FR_LISTENING_EXT, FR_WRITING_EXT, FR_PLACEMENT_EXT } from './ext';
import { FR_VOCAB_ADV, FR_GRAMMAR_ADV, FR_CONVS_ADV, FR_READING_ADV, FR_LISTENING_ADV, FR_WRITING_ADV, FR_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(FR_VOCAB + FR_VOCAB_ADV + FR_VOCAB_EXT), grammar: parseGrammar(FR_GRAMMAR + FR_GRAMMAR_ADV + FR_GRAMMAR_EXT), conversations: parseConvs(FR_CONVS + FR_CONVS_ADV + FR_CONVS_EXT),
  reading: parseReading(FR_READING + FR_READING_ADV + FR_READING_EXT), listening: parseListening(FR_LISTENING + FR_LISTENING_ADV + FR_LISTENING_EXT), pronunciation: parsePron(FR_PRON),
  writing: parseWriting(FR_WRITING + FR_WRITING_ADV + FR_WRITING_EXT), cheats: parseCheats(FR_CHEATS), placement: parsePlacement(FR_PLACEMENT + FR_PLACEMENT_ADV + FR_PLACEMENT_EXT),
  ui: FR_UI, grammarLevels: {},
};
export default content;
