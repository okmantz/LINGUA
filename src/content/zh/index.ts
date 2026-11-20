import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ZH_VOCAB } from './vocab'; import { ZH_GRAMMAR } from './grammar'; import { ZH_CONVS } from './convs';
import { ZH_READING, ZH_LISTENING, ZH_WRITING, ZH_PRON, ZH_CHEATS, ZH_PLACEMENT, ZH_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(ZH_VOCAB), grammar: parseGrammar(ZH_GRAMMAR), conversations: parseConvs(ZH_CONVS),
  reading: parseReading(ZH_READING), listening: parseListening(ZH_LISTENING), pronunciation: parsePron(ZH_PRON),
  writing: parseWriting(ZH_WRITING), cheats: parseCheats(ZH_CHEATS), placement: parsePlacement(ZH_PLACEMENT),
  ui: ZH_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
