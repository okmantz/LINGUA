import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { JA_VOCAB } from './vocab'; import { JA_GRAMMAR } from './grammar'; import { JA_CONVS } from './convs';
import { JA_READING, JA_LISTENING, JA_WRITING, JA_PRON, JA_CHEATS, JA_PLACEMENT, JA_UI } from './texts';

import { JA_VOCAB_EXT, JA_GRAMMAR_EXT, JA_CONVS_EXT, JA_READING_EXT, JA_LISTENING_EXT, JA_WRITING_EXT, JA_PLACEMENT_EXT } from './ext';
import { JA_VOCAB_ADV, JA_GRAMMAR_ADV, JA_CONVS_ADV, JA_READING_ADV, JA_LISTENING_ADV, JA_WRITING_ADV, JA_PLACEMENT_ADV } from './adv';
import { JA_VOCAB_DEEP, JA_GRAMMAR_DEEP } from './deep'; import { JA_CONVS_DEEP, JA_READING_DEEP, JA_LISTENING_DEEP, JA_WRITING_DEEP, JA_PLACEMENT_DEEP, JA_CHEATS_DEEP, JA_PRON_DEEP } from './deep2';
import { JA_MORE_VOCAB, JA_MORE_READING, JA_MORE_LISTENING, JA_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(JA_VOCAB + JA_VOCAB_ADV + JA_VOCAB_EXT + JA_VOCAB_DEEP), grammar: parseGrammar(JA_GRAMMAR + JA_GRAMMAR_ADV + JA_GRAMMAR_EXT + JA_GRAMMAR_DEEP), conversations: parseConvs(JA_CONVS + JA_CONVS_ADV + JA_CONVS_EXT + JA_CONVS_DEEP),
  reading: parseReading(JA_READING + JA_READING_ADV + JA_READING_EXT + JA_READING_DEEP), listening: parseListening(JA_LISTENING + JA_LISTENING_ADV + JA_LISTENING_EXT + JA_LISTENING_DEEP), pronunciation: parsePron(JA_PRON + JA_PRON_DEEP),
  writing: parseWriting(JA_WRITING + JA_WRITING_ADV + JA_WRITING_EXT + JA_WRITING_DEEP), cheats: parseCheats(JA_CHEATS + JA_CHEATS_DEEP), placement: parsePlacement(JA_PLACEMENT + JA_PLACEMENT_ADV + JA_PLACEMENT_EXT + JA_PLACEMENT_DEEP),
  ui: JA_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
content.vocab.push(...pvM(JA_MORE_VOCAB)); content.reading.push(...prM(JA_MORE_READING)); content.listening.push(...plM(JA_MORE_LISTENING)); content.conversations.push(...pcM(JA_MORE_CONVS));
export default content;
