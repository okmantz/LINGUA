import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { RU_VOCAB } from './vocab'; import { RU_GRAMMAR } from './grammar'; import { RU_CONVS } from './convs';
import { RU_READING, RU_LISTENING, RU_WRITING, RU_PRON, RU_CHEATS, RU_PLACEMENT, RU_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(RU_VOCAB), grammar: parseGrammar(RU_GRAMMAR), conversations: parseConvs(RU_CONVS),
  reading: parseReading(RU_READING), listening: parseListening(RU_LISTENING), pronunciation: parsePron(RU_PRON),
  writing: parseWriting(RU_WRITING), cheats: parseCheats(RU_CHEATS), placement: parsePlacement(RU_PLACEMENT),
  ui: RU_UI, grammarLevels: {},
};
export default content;
