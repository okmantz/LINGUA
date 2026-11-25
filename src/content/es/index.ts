import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ES_VOCAB } from './vocab'; import { ES_GRAMMAR } from './grammar'; import { ES_CONVS } from './convs';
import { ES_READING, ES_LISTENING, ES_WRITING, ES_PRON, ES_CHEATS, ES_PLACEMENT, ES_UI } from './texts';

import { ES_VOCAB_ADV, ES_GRAMMAR_ADV, ES_CONVS_ADV, ES_READING_ADV, ES_LISTENING_ADV, ES_WRITING_ADV, ES_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(ES_VOCAB + ES_VOCAB_ADV), grammar: parseGrammar(ES_GRAMMAR + ES_GRAMMAR_ADV), conversations: parseConvs(ES_CONVS + ES_CONVS_ADV),
  reading: parseReading(ES_READING + ES_READING_ADV), listening: parseListening(ES_LISTENING + ES_LISTENING_ADV), pronunciation: parsePron(ES_PRON),
  writing: parseWriting(ES_WRITING + ES_WRITING_ADV), cheats: parseCheats(ES_CHEATS), placement: parsePlacement(ES_PLACEMENT + ES_PLACEMENT_ADV),
  ui: ES_UI, grammarLevels: {},
};
export default content;
