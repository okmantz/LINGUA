import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ZH_VOCAB } from './vocab'; import { ZH_GRAMMAR } from './grammar'; import { ZH_CONVS } from './convs';
import { ZH_READING, ZH_LISTENING, ZH_WRITING, ZH_PRON, ZH_CHEATS, ZH_PLACEMENT, ZH_UI } from './texts';

import { ZH_VOCAB_EXT, ZH_GRAMMAR_EXT, ZH_CONVS_EXT, ZH_READING_EXT, ZH_LISTENING_EXT, ZH_WRITING_EXT, ZH_PLACEMENT_EXT } from './ext';
import { ZH_VOCAB_ADV, ZH_GRAMMAR_ADV, ZH_CONVS_ADV, ZH_READING_ADV, ZH_LISTENING_ADV, ZH_WRITING_ADV, ZH_PLACEMENT_ADV } from './adv';
import { ZH_VOCAB_DEEP, ZH_GRAMMAR_DEEP } from './deep'; import { ZH_CONVS_DEEP, ZH_READING_DEEP, ZH_LISTENING_DEEP, ZH_WRITING_DEEP, ZH_PLACEMENT_DEEP, ZH_CHEATS_DEEP, ZH_PRON_DEEP } from './deep2';
import { ZH_MORE_VOCAB, ZH_MORE_READING, ZH_MORE_LISTENING, ZH_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(ZH_VOCAB + ZH_VOCAB_ADV + ZH_VOCAB_EXT + ZH_VOCAB_DEEP), grammar: parseGrammar(ZH_GRAMMAR + ZH_GRAMMAR_ADV + ZH_GRAMMAR_EXT + ZH_GRAMMAR_DEEP), conversations: parseConvs(ZH_CONVS + ZH_CONVS_ADV + ZH_CONVS_EXT + ZH_CONVS_DEEP),
  reading: parseReading(ZH_READING + ZH_READING_ADV + ZH_READING_EXT + ZH_READING_DEEP), listening: parseListening(ZH_LISTENING + ZH_LISTENING_ADV + ZH_LISTENING_EXT + ZH_LISTENING_DEEP), pronunciation: parsePron(ZH_PRON + ZH_PRON_DEEP),
  writing: parseWriting(ZH_WRITING + ZH_WRITING_ADV + ZH_WRITING_EXT + ZH_WRITING_DEEP), cheats: parseCheats(ZH_CHEATS + ZH_CHEATS_DEEP), placement: parsePlacement(ZH_PLACEMENT + ZH_PLACEMENT_ADV + ZH_PLACEMENT_EXT + ZH_PLACEMENT_DEEP),
  ui: ZH_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
content.vocab.push(...pvM(ZH_MORE_VOCAB)); content.reading.push(...prM(ZH_MORE_READING)); content.listening.push(...plM(ZH_MORE_LISTENING)); content.conversations.push(...pcM(ZH_MORE_CONVS));
export default content;
