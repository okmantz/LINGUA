import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { DE_VOCAB } from './vocab'; import { DE_GRAMMAR } from './grammar'; import { DE_CONVS } from './convs';
import { DE_READING, DE_LISTENING, DE_WRITING, DE_PRON, DE_CHEATS, DE_PLACEMENT, DE_UI } from './texts';

import { DE_VOCAB_ADV, DE_GRAMMAR_ADV, DE_CONVS_ADV, DE_READING_ADV, DE_LISTENING_ADV, DE_WRITING_ADV, DE_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(DE_VOCAB + DE_VOCAB_ADV), grammar: parseGrammar(DE_GRAMMAR + DE_GRAMMAR_ADV), conversations: parseConvs(DE_CONVS + DE_CONVS_ADV),
  reading: parseReading(DE_READING + DE_READING_ADV), listening: parseListening(DE_LISTENING + DE_LISTENING_ADV), pronunciation: parsePron(DE_PRON),
  writing: parseWriting(DE_WRITING + DE_WRITING_ADV), cheats: parseCheats(DE_CHEATS), placement: parsePlacement(DE_PLACEMENT + DE_PLACEMENT_ADV),
  ui: DE_UI, grammarLevels: {},
};
export default content;
