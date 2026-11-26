import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { AR_VOCAB } from './vocab'; import { AR_GRAMMAR } from './grammar'; import { AR_CONVS } from './convs';
import { AR_READING, AR_LISTENING, AR_WRITING, AR_PRON, AR_CHEATS, AR_PLACEMENT, AR_UI } from './texts';

import { AR_VOCAB_EXT, AR_GRAMMAR_EXT, AR_CONVS_EXT, AR_READING_EXT, AR_LISTENING_EXT, AR_WRITING_EXT, AR_PLACEMENT_EXT } from './ext';
import { AR_VOCAB_ADV, AR_GRAMMAR_ADV, AR_CONVS_ADV, AR_READING_ADV, AR_LISTENING_ADV, AR_WRITING_ADV, AR_PLACEMENT_ADV, AR_PLACEMENT_EXTRA } from './adv';
import { AR_VOCAB_DEEP, AR_GRAMMAR_DEEP } from './deep'; import { AR_CONVS_DEEP, AR_READING_DEEP, AR_LISTENING_DEEP, AR_WRITING_DEEP, AR_PLACEMENT_DEEP, AR_CHEATS_DEEP, AR_PRON_DEEP } from './deep2';
import { AR_MORE_VOCAB, AR_MORE_READING, AR_MORE_LISTENING, AR_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(AR_VOCAB + AR_VOCAB_ADV + AR_VOCAB_EXT + AR_VOCAB_DEEP), grammar: parseGrammar(AR_GRAMMAR + AR_GRAMMAR_ADV + AR_GRAMMAR_EXT + AR_GRAMMAR_DEEP), conversations: parseConvs(AR_CONVS + AR_CONVS_ADV + AR_CONVS_EXT + AR_CONVS_DEEP),
  reading: parseReading(AR_READING + AR_READING_ADV + AR_READING_EXT + AR_READING_DEEP), listening: parseListening(AR_LISTENING + AR_LISTENING_ADV + AR_LISTENING_EXT + AR_LISTENING_DEEP), pronunciation: parsePron(AR_PRON + AR_PRON_DEEP),
  writing: parseWriting(AR_WRITING + AR_WRITING_ADV + AR_WRITING_EXT + AR_WRITING_DEEP), cheats: parseCheats(AR_CHEATS + AR_CHEATS_DEEP), placement: parsePlacement(AR_PLACEMENT + AR_PLACEMENT_ADV + AR_PLACEMENT_EXTRA + AR_PLACEMENT_EXT + AR_PLACEMENT_DEEP),
  ui: AR_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
content.vocab.push(...pvM(AR_MORE_VOCAB)); content.reading.push(...prM(AR_MORE_READING)); content.listening.push(...plM(AR_MORE_LISTENING)); content.conversations.push(...pcM(AR_MORE_CONVS));
export default content;
