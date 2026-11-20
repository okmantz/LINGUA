import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { PL_VOCAB } from './vocab'; import { PL_GRAMMAR } from './grammar'; import { PL_CONVS } from './convs';
import { PL_READING, PL_LISTENING, PL_WRITING, PL_PRON, PL_CHEATS, PL_PLACEMENT, PL_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(PL_VOCAB), grammar: parseGrammar(PL_GRAMMAR), conversations: parseConvs(PL_CONVS),
  reading: parseReading(PL_READING), listening: parseListening(PL_LISTENING), pronunciation: parsePron(PL_PRON),
  writing: parseWriting(PL_WRITING), cheats: parseCheats(PL_CHEATS), placement: parsePlacement(PL_PLACEMENT),
  ui: PL_UI, grammarLevels: {},
};
export default content;
