import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ES_VOCAB } from './vocab'; import { ES_GRAMMAR } from './grammar'; import { ES_CONVS } from './convs';
import { ES_READING, ES_LISTENING, ES_WRITING, ES_PRON, ES_CHEATS, ES_PLACEMENT, ES_UI } from './texts';

import { ES_VOCAB_EXT, ES_GRAMMAR_EXT, ES_CONVS_EXT, ES_READING_EXT, ES_LISTENING_EXT, ES_WRITING_EXT, ES_PLACEMENT_EXT } from './ext';
import { ES_VOCAB_ADV, ES_GRAMMAR_ADV, ES_CONVS_ADV, ES_READING_ADV, ES_LISTENING_ADV, ES_WRITING_ADV, ES_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(ES_VOCAB + ES_VOCAB_ADV + ES_VOCAB_EXT), grammar: parseGrammar(ES_GRAMMAR + ES_GRAMMAR_ADV + ES_GRAMMAR_EXT), conversations: parseConvs(ES_CONVS + ES_CONVS_ADV + ES_CONVS_EXT),
  reading: parseReading(ES_READING + ES_READING_ADV + ES_READING_EXT), listening: parseListening(ES_LISTENING + ES_LISTENING_ADV + ES_LISTENING_EXT), pronunciation: parsePron(ES_PRON),
  writing: parseWriting(ES_WRITING + ES_WRITING_ADV + ES_WRITING_EXT), cheats: parseCheats(ES_CHEATS), placement: parsePlacement(ES_PLACEMENT + ES_PLACEMENT_ADV + ES_PLACEMENT_EXT),
  ui: ES_UI, grammarLevels: {},
};
export default content;
