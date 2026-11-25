import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { RU_VOCAB } from './vocab'; import { RU_GRAMMAR } from './grammar'; import { RU_CONVS } from './convs';
import { RU_READING, RU_LISTENING, RU_WRITING, RU_PRON, RU_CHEATS, RU_PLACEMENT, RU_UI } from './texts';

import { RU_VOCAB_EXT, RU_GRAMMAR_EXT, RU_CONVS_EXT, RU_READING_EXT, RU_LISTENING_EXT, RU_WRITING_EXT, RU_PLACEMENT_EXT } from './ext';
import { RU_VOCAB_ADV, RU_GRAMMAR_ADV, RU_CONVS_ADV, RU_READING_ADV, RU_LISTENING_ADV, RU_WRITING_ADV, RU_PLACEMENT_ADV } from './adv';
import { RU_VOCAB_DEEP, RU_GRAMMAR_DEEP } from './deep'; import { RU_CONVS_DEEP, RU_READING_DEEP, RU_LISTENING_DEEP, RU_WRITING_DEEP, RU_PLACEMENT_DEEP, RU_CHEATS_DEEP, RU_PRON_DEEP } from './deep2';
const content: LanguageContent = {
  vocab: parseVocab(RU_VOCAB + RU_VOCAB_ADV + RU_VOCAB_EXT + RU_VOCAB_DEEP), grammar: parseGrammar(RU_GRAMMAR + RU_GRAMMAR_ADV + RU_GRAMMAR_EXT + RU_GRAMMAR_DEEP), conversations: parseConvs(RU_CONVS + RU_CONVS_ADV + RU_CONVS_EXT + RU_CONVS_DEEP),
  reading: parseReading(RU_READING + RU_READING_ADV + RU_READING_EXT + RU_READING_DEEP), listening: parseListening(RU_LISTENING + RU_LISTENING_ADV + RU_LISTENING_EXT + RU_LISTENING_DEEP), pronunciation: parsePron(RU_PRON + RU_PRON_DEEP),
  writing: parseWriting(RU_WRITING + RU_WRITING_ADV + RU_WRITING_EXT + RU_WRITING_DEEP), cheats: parseCheats(RU_CHEATS + RU_CHEATS_DEEP), placement: parsePlacement(RU_PLACEMENT + RU_PLACEMENT_ADV + RU_PLACEMENT_EXT + RU_PLACEMENT_DEEP),
  ui: RU_UI, grammarLevels: {},
};
export default content;
