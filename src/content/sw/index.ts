import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { SW_VOCAB } from './vocab'; import { SW_GRAMMAR } from './grammar'; import { SW_CONVS } from './convs';
import { SW_READING, SW_LISTENING, SW_WRITING, SW_PRON, SW_CHEATS, SW_PLACEMENT, SW_UI } from './texts';
import { SW_VOCAB_ADV, SW_GRAMMAR_ADV, SW_CONVS_ADV, SW_READING_ADV, SW_LISTENING_ADV, SW_WRITING_ADV, SW_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(SW_VOCAB + SW_VOCAB_ADV), grammar: parseGrammar(SW_GRAMMAR + SW_GRAMMAR_ADV), conversations: parseConvs(SW_CONVS + SW_CONVS_ADV),
  reading: parseReading(SW_READING + SW_READING_ADV), listening: parseListening(SW_LISTENING + SW_LISTENING_ADV), pronunciation: parsePron(SW_PRON),
  writing: parseWriting(SW_WRITING + SW_WRITING_ADV), cheats: parseCheats(SW_CHEATS), placement: parsePlacement(SW_PLACEMENT + SW_PLACEMENT_ADV),
  ui: SW_UI, grammarLevels: {},
};
export default content;
