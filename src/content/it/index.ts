import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { IT_VOCAB } from './vocab'; import { IT_GRAMMAR } from './grammar'; import { IT_CONVS } from './convs';
import { IT_READING, IT_LISTENING, IT_WRITING, IT_PRON, IT_CHEATS, IT_PLACEMENT, IT_UI } from './texts';

import { IT_VOCAB_ADV, IT_GRAMMAR_ADV, IT_CONVS_ADV, IT_READING_ADV, IT_LISTENING_ADV, IT_WRITING_ADV, IT_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(IT_VOCAB + IT_VOCAB_ADV), grammar: parseGrammar(IT_GRAMMAR + IT_GRAMMAR_ADV), conversations: parseConvs(IT_CONVS + IT_CONVS_ADV),
  reading: parseReading(IT_READING + IT_READING_ADV), listening: parseListening(IT_LISTENING + IT_LISTENING_ADV), pronunciation: parsePron(IT_PRON),
  writing: parseWriting(IT_WRITING + IT_WRITING_ADV), cheats: parseCheats(IT_CHEATS), placement: parsePlacement(IT_PLACEMENT + IT_PLACEMENT_ADV),
  ui: IT_UI, grammarLevels: {},
};
export default content;
