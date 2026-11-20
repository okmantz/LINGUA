import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { AR_VOCAB } from './vocab'; import { AR_GRAMMAR } from './grammar'; import { AR_CONVS } from './convs';
import { AR_READING, AR_LISTENING, AR_WRITING, AR_PRON, AR_CHEATS, AR_PLACEMENT, AR_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(AR_VOCAB), grammar: parseGrammar(AR_GRAMMAR), conversations: parseConvs(AR_CONVS),
  reading: parseReading(AR_READING), listening: parseListening(AR_LISTENING), pronunciation: parsePron(AR_PRON),
  writing: parseWriting(AR_WRITING), cheats: parseCheats(AR_CHEATS), placement: parsePlacement(AR_PLACEMENT),
  ui: AR_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
