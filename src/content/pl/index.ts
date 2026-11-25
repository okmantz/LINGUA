import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { PL_VOCAB } from './vocab'; import { PL_GRAMMAR } from './grammar'; import { PL_CONVS } from './convs';
import { PL_READING, PL_LISTENING, PL_WRITING, PL_PRON, PL_CHEATS, PL_PLACEMENT, PL_UI } from './texts';

import { PL_VOCAB_ADV, PL_GRAMMAR_ADV, PL_CONVS_ADV, PL_READING_ADV, PL_LISTENING_ADV, PL_WRITING_ADV, PL_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(PL_VOCAB + PL_VOCAB_ADV), grammar: parseGrammar(PL_GRAMMAR + PL_GRAMMAR_ADV), conversations: parseConvs(PL_CONVS + PL_CONVS_ADV),
  reading: parseReading(PL_READING + PL_READING_ADV), listening: parseListening(PL_LISTENING + PL_LISTENING_ADV), pronunciation: parsePron(PL_PRON),
  writing: parseWriting(PL_WRITING + PL_WRITING_ADV), cheats: parseCheats(PL_CHEATS), placement: parsePlacement(PL_PLACEMENT + PL_PLACEMENT_ADV),
  ui: PL_UI, grammarLevels: {},
};
export default content;
