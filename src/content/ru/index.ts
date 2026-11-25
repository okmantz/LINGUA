import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { RU_VOCAB } from './vocab'; import { RU_GRAMMAR } from './grammar'; import { RU_CONVS } from './convs';
import { RU_READING, RU_LISTENING, RU_WRITING, RU_PRON, RU_CHEATS, RU_PLACEMENT, RU_UI } from './texts';

import { RU_VOCAB_EXT, RU_GRAMMAR_EXT, RU_CONVS_EXT, RU_READING_EXT, RU_LISTENING_EXT, RU_WRITING_EXT, RU_PLACEMENT_EXT } from './ext';
import { RU_VOCAB_ADV, RU_GRAMMAR_ADV, RU_CONVS_ADV, RU_READING_ADV, RU_LISTENING_ADV, RU_WRITING_ADV, RU_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(RU_VOCAB + RU_VOCAB_ADV + RU_VOCAB_EXT), grammar: parseGrammar(RU_GRAMMAR + RU_GRAMMAR_ADV + RU_GRAMMAR_EXT), conversations: parseConvs(RU_CONVS + RU_CONVS_ADV + RU_CONVS_EXT),
  reading: parseReading(RU_READING + RU_READING_ADV + RU_READING_EXT), listening: parseListening(RU_LISTENING + RU_LISTENING_ADV + RU_LISTENING_EXT), pronunciation: parsePron(RU_PRON),
  writing: parseWriting(RU_WRITING + RU_WRITING_ADV + RU_WRITING_EXT), cheats: parseCheats(RU_CHEATS), placement: parsePlacement(RU_PLACEMENT + RU_PLACEMENT_ADV + RU_PLACEMENT_EXT),
  ui: RU_UI, grammarLevels: {},
};
export default content;
