import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ES_VOCAB } from './vocab'; import { ES_GRAMMAR } from './grammar'; import { ES_CONVS } from './convs';
import { ES_READING, ES_LISTENING, ES_WRITING, ES_PRON, ES_CHEATS, ES_PLACEMENT, ES_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(ES_VOCAB), grammar: parseGrammar(ES_GRAMMAR), conversations: parseConvs(ES_CONVS),
  reading: parseReading(ES_READING), listening: parseListening(ES_LISTENING), pronunciation: parsePron(ES_PRON),
  writing: parseWriting(ES_WRITING), cheats: parseCheats(ES_CHEATS), placement: parsePlacement(ES_PLACEMENT),
  ui: ES_UI, grammarLevels: {},
};
export default content;
