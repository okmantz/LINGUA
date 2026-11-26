import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { IT_VOCAB } from './vocab'; import { IT_GRAMMAR } from './grammar'; import { IT_CONVS } from './convs';
import { IT_READING, IT_LISTENING, IT_WRITING, IT_PRON, IT_CHEATS, IT_PLACEMENT, IT_UI } from './texts';

import { IT_VOCAB_EXT, IT_GRAMMAR_EXT, IT_CONVS_EXT, IT_READING_EXT, IT_LISTENING_EXT, IT_WRITING_EXT, IT_PLACEMENT_EXT } from './ext';
import { IT_VOCAB_ADV, IT_GRAMMAR_ADV, IT_CONVS_ADV, IT_READING_ADV, IT_LISTENING_ADV, IT_WRITING_ADV, IT_PLACEMENT_ADV } from './adv';
import { IT_VOCAB_DEEP, IT_GRAMMAR_DEEP } from './deep'; import { IT_CONVS_DEEP, IT_READING_DEEP, IT_LISTENING_DEEP, IT_WRITING_DEEP, IT_PLACEMENT_DEEP, IT_CHEATS_DEEP, IT_PRON_DEEP } from './deep2';
import { IT_MORE_VOCAB, IT_MORE_READING, IT_MORE_LISTENING, IT_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(IT_VOCAB + IT_VOCAB_ADV + IT_VOCAB_EXT + IT_VOCAB_DEEP), grammar: parseGrammar(IT_GRAMMAR + IT_GRAMMAR_ADV + IT_GRAMMAR_EXT + IT_GRAMMAR_DEEP), conversations: parseConvs(IT_CONVS + IT_CONVS_ADV + IT_CONVS_EXT + IT_CONVS_DEEP),
  reading: parseReading(IT_READING + IT_READING_ADV + IT_READING_EXT + IT_READING_DEEP), listening: parseListening(IT_LISTENING + IT_LISTENING_ADV + IT_LISTENING_EXT + IT_LISTENING_DEEP), pronunciation: parsePron(IT_PRON + IT_PRON_DEEP),
  writing: parseWriting(IT_WRITING + IT_WRITING_ADV + IT_WRITING_EXT + IT_WRITING_DEEP), cheats: parseCheats(IT_CHEATS + IT_CHEATS_DEEP), placement: parsePlacement(IT_PLACEMENT + IT_PLACEMENT_ADV + IT_PLACEMENT_EXT + IT_PLACEMENT_DEEP),
  ui: IT_UI, grammarLevels: {},
};
content.vocab.push(...pvM(IT_MORE_VOCAB)); content.reading.push(...prM(IT_MORE_READING)); content.listening.push(...plM(IT_MORE_LISTENING)); content.conversations.push(...pcM(IT_MORE_CONVS));
export default content;
