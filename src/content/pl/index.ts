import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { PL_VOCAB } from './vocab'; import { PL_GRAMMAR } from './grammar'; import { PL_CONVS } from './convs';
import { PL_READING, PL_LISTENING, PL_WRITING, PL_PRON, PL_CHEATS, PL_PLACEMENT, PL_UI } from './texts';

import { PL_VOCAB_EXT, PL_GRAMMAR_EXT, PL_CONVS_EXT, PL_READING_EXT, PL_LISTENING_EXT, PL_WRITING_EXT, PL_PLACEMENT_EXT } from './ext';
import { PL_VOCAB_ADV, PL_GRAMMAR_ADV, PL_CONVS_ADV, PL_READING_ADV, PL_LISTENING_ADV, PL_WRITING_ADV, PL_PLACEMENT_ADV } from './adv';
import { PL_VOCAB_DEEP, PL_GRAMMAR_DEEP } from './deep'; import { PL_CONVS_DEEP, PL_READING_DEEP, PL_LISTENING_DEEP, PL_WRITING_DEEP, PL_PLACEMENT_DEEP, PL_CHEATS_DEEP, PL_PRON_DEEP } from './deep2';
const content: LanguageContent = {
  vocab: parseVocab(PL_VOCAB + PL_VOCAB_ADV + PL_VOCAB_EXT + PL_VOCAB_DEEP), grammar: parseGrammar(PL_GRAMMAR + PL_GRAMMAR_ADV + PL_GRAMMAR_EXT + PL_GRAMMAR_DEEP), conversations: parseConvs(PL_CONVS + PL_CONVS_ADV + PL_CONVS_EXT + PL_CONVS_DEEP),
  reading: parseReading(PL_READING + PL_READING_ADV + PL_READING_EXT + PL_READING_DEEP), listening: parseListening(PL_LISTENING + PL_LISTENING_ADV + PL_LISTENING_EXT + PL_LISTENING_DEEP), pronunciation: parsePron(PL_PRON + PL_PRON_DEEP),
  writing: parseWriting(PL_WRITING + PL_WRITING_ADV + PL_WRITING_EXT + PL_WRITING_DEEP), cheats: parseCheats(PL_CHEATS + PL_CHEATS_DEEP), placement: parsePlacement(PL_PLACEMENT + PL_PLACEMENT_ADV + PL_PLACEMENT_EXT + PL_PLACEMENT_DEEP),
  ui: PL_UI, grammarLevels: {},
};
export default content;
