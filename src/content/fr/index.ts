import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { FR_VOCAB } from './vocab'; import { FR_GRAMMAR } from './grammar'; import { FR_CONVS } from './convs';
import { FR_READING, FR_LISTENING, FR_WRITING, FR_PRON, FR_CHEATS, FR_PLACEMENT, FR_UI } from './texts';

import { FR_VOCAB_ADV, FR_GRAMMAR_ADV, FR_CONVS_ADV, FR_READING_ADV, FR_LISTENING_ADV, FR_WRITING_ADV, FR_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(FR_VOCAB + FR_VOCAB_ADV), grammar: parseGrammar(FR_GRAMMAR + FR_GRAMMAR_ADV), conversations: parseConvs(FR_CONVS + FR_CONVS_ADV),
  reading: parseReading(FR_READING + FR_READING_ADV), listening: parseListening(FR_LISTENING + FR_LISTENING_ADV), pronunciation: parsePron(FR_PRON),
  writing: parseWriting(FR_WRITING + FR_WRITING_ADV), cheats: parseCheats(FR_CHEATS), placement: parsePlacement(FR_PLACEMENT + FR_PLACEMENT_ADV),
  ui: FR_UI, grammarLevels: {},
};
export default content;
