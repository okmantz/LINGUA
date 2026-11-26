import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ASL_VOCAB } from './vocab'; import { ASL_VOCAB_ADV } from './adv'; import { ASL_GRAMMAR } from './grammar'; import { ASL_CONVS } from './convs';
import { ASL_READING, ASL_LISTENING, ASL_WRITING, ASL_PRON, ASL_CHEATS, ASL_PLACEMENT, ASL_UI } from './texts';
import { ASL_GRAMMAR_DEEP, ASL_CONVS_DEEP, ASL_READING_DEEP, ASL_LISTENING_DEEP, ASL_WRITING_DEEP, ASL_PLACEMENT_DEEP, ASL_CHEATS_DEEP, ASL_PRON_DEEP } from './deep';

import { ASL_MORE_VOCAB, ASL_MORE_READING, ASL_MORE_LISTENING, ASL_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(ASL_VOCAB + ASL_VOCAB_ADV), grammar: parseGrammar(ASL_GRAMMAR + ASL_GRAMMAR_DEEP), conversations: parseConvs(ASL_CONVS + ASL_CONVS_DEEP),
  reading: parseReading(ASL_READING + ASL_READING_DEEP), listening: parseListening(ASL_LISTENING + ASL_LISTENING_DEEP), pronunciation: parsePron(ASL_PRON + ASL_PRON_DEEP),
  writing: parseWriting(ASL_WRITING + ASL_WRITING_DEEP), cheats: parseCheats(ASL_CHEATS + ASL_CHEATS_DEEP), placement: parsePlacement(ASL_PLACEMENT + ASL_PLACEMENT_DEEP),
  ui: ASL_UI, grammarLevels: {},
  // Days 1–5 start with the alphabet, then greetings/pronouns, so the first week is mostly handshapes and everyday signs.
  pace: { 1: { cats: ['greetings'], newWords: 12 }, 2: { cats: ['numbers', 'pronouns'], newWords: 12 }, 3: { cats: ['objects'], newWords: 12 }, 16: { cats: ['health'], newWords: 6 }, 17: { cats: ['connectors'], newWords: 7 }, 19: { cats: ['health'], newWords: 5 }, 20: { cats: ['connectors'], newWords: 7 } },
};
content.vocab.push(...pvM(ASL_MORE_VOCAB)); content.reading.push(...prM(ASL_MORE_READING)); content.listening.push(...plM(ASL_MORE_LISTENING)); content.conversations.push(...pcM(ASL_MORE_CONVS));
export default content;
