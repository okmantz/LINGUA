import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ASL_VOCAB } from './vocab'; import { ASL_VOCAB_ADV } from './adv'; import { ASL_GRAMMAR } from './grammar'; import { ASL_CONVS } from './convs';
import { ASL_READING, ASL_LISTENING, ASL_WRITING, ASL_PRON, ASL_CHEATS, ASL_PLACEMENT, ASL_UI } from './texts';

const content: LanguageContent = {
  vocab: parseVocab(ASL_VOCAB + ASL_VOCAB_ADV), grammar: parseGrammar(ASL_GRAMMAR), conversations: parseConvs(ASL_CONVS),
  reading: parseReading(ASL_READING), listening: parseListening(ASL_LISTENING), pronunciation: parsePron(ASL_PRON),
  writing: parseWriting(ASL_WRITING), cheats: parseCheats(ASL_CHEATS), placement: parsePlacement(ASL_PLACEMENT),
  ui: ASL_UI, grammarLevels: {},
  // Days 1–5 start with the alphabet, then greetings/pronouns, so the first week is mostly handshapes and everyday signs.
  pace: { 1: { cats: ['greetings'], newWords: 12 }, 2: { cats: ['numbers', 'pronouns'], newWords: 12 }, 3: { cats: ['objects'], newWords: 12 }, 16: { cats: ['health'], newWords: 6 }, 17: { cats: ['connectors'], newWords: 7 }, 19: { cats: ['health'], newWords: 5 }, 20: { cats: ['connectors'], newWords: 7 } },
};
export default content;
