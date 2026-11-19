import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { DE_VOCAB } from './vocab'; import { DE_GRAMMAR } from './grammar'; import { DE_CONVS } from './convs';
import { DE_READING, DE_LISTENING, DE_WRITING, DE_PRON, DE_CHEATS, DE_PLACEMENT, DE_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(DE_VOCAB), grammar: parseGrammar(DE_GRAMMAR), conversations: parseConvs(DE_CONVS),
  reading: parseReading(DE_READING), listening: parseListening(DE_LISTENING), pronunciation: parsePron(DE_PRON),
  writing: parseWriting(DE_WRITING), cheats: parseCheats(DE_CHEATS), placement: parsePlacement(DE_PLACEMENT),
  ui: DE_UI, grammarLevels: {},
};
export default content;
