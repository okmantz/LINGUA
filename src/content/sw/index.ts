import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { SW_VOCAB } from './vocab'; import { SW_GRAMMAR } from './grammar'; import { SW_CONVS } from './convs';
import { SW_READING, SW_LISTENING, SW_WRITING, SW_PRON, SW_CHEATS, SW_PLACEMENT, SW_UI } from './texts';
import { SW_VOCAB_EXT, SW_GRAMMAR_EXT, SW_CONVS_EXT, SW_READING_EXT, SW_LISTENING_EXT, SW_WRITING_EXT, SW_PLACEMENT_EXT } from './ext';
import { SW_VOCAB_ADV, SW_GRAMMAR_ADV, SW_CONVS_ADV, SW_READING_ADV, SW_LISTENING_ADV, SW_WRITING_ADV, SW_PLACEMENT_ADV } from './adv';
import { SW_VOCAB_DEEP, SW_GRAMMAR_DEEP } from './deep'; import { SW_CONVS_DEEP, SW_READING_DEEP, SW_LISTENING_DEEP, SW_WRITING_DEEP, SW_PLACEMENT_DEEP, SW_CHEATS_DEEP, SW_PRON_DEEP } from './deep2';
const content: LanguageContent = {
  vocab: parseVocab(SW_VOCAB + SW_VOCAB_ADV + SW_VOCAB_EXT + SW_VOCAB_DEEP), grammar: parseGrammar(SW_GRAMMAR + SW_GRAMMAR_ADV + SW_GRAMMAR_EXT + SW_GRAMMAR_DEEP), conversations: parseConvs(SW_CONVS + SW_CONVS_ADV + SW_CONVS_EXT + SW_CONVS_DEEP),
  reading: parseReading(SW_READING + SW_READING_ADV + SW_READING_EXT + SW_READING_DEEP), listening: parseListening(SW_LISTENING + SW_LISTENING_ADV + SW_LISTENING_EXT + SW_LISTENING_DEEP), pronunciation: parsePron(SW_PRON + SW_PRON_DEEP),
  writing: parseWriting(SW_WRITING + SW_WRITING_ADV + SW_WRITING_EXT + SW_WRITING_DEEP), cheats: parseCheats(SW_CHEATS + SW_CHEATS_DEEP), placement: parsePlacement(SW_PLACEMENT + SW_PLACEMENT_ADV + SW_PLACEMENT_EXT + SW_PLACEMENT_DEEP),
  ui: SW_UI, grammarLevels: {},
};
export default content;
