import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { IT_VOCAB } from './vocab'; import { IT_GRAMMAR } from './grammar'; import { IT_CONVS } from './convs';
import { IT_READING, IT_LISTENING, IT_WRITING, IT_PRON, IT_CHEATS, IT_PLACEMENT, IT_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(IT_VOCAB), grammar: parseGrammar(IT_GRAMMAR), conversations: parseConvs(IT_CONVS),
  reading: parseReading(IT_READING), listening: parseListening(IT_LISTENING), pronunciation: parsePron(IT_PRON),
  writing: parseWriting(IT_WRITING), cheats: parseCheats(IT_CHEATS), placement: parsePlacement(IT_PLACEMENT),
  ui: IT_UI, grammarLevels: {},
};
export default content;
