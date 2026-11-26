import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ES_VOCAB } from './vocab'; import { ES_GRAMMAR } from './grammar'; import { ES_CONVS } from './convs';
import { ES_READING, ES_LISTENING, ES_WRITING, ES_PRON, ES_CHEATS, ES_PLACEMENT, ES_UI } from './texts';

import { ES_VOCAB_EXT, ES_GRAMMAR_EXT, ES_CONVS_EXT, ES_READING_EXT, ES_LISTENING_EXT, ES_WRITING_EXT, ES_PLACEMENT_EXT } from './ext';
import { ES_VOCAB_ADV, ES_GRAMMAR_ADV, ES_CONVS_ADV, ES_READING_ADV, ES_LISTENING_ADV, ES_WRITING_ADV, ES_PLACEMENT_ADV } from './adv';
import { ES_VOCAB_DEEP, ES_GRAMMAR_DEEP } from './deep'; import { ES_CONVS_DEEP, ES_READING_DEEP, ES_LISTENING_DEEP, ES_WRITING_DEEP, ES_PLACEMENT_DEEP, ES_CHEATS_DEEP, ES_PRON_DEEP } from './deep2';
import { ES_MORE_VOCAB, ES_MORE_READING, ES_MORE_LISTENING, ES_MORE_CONVS } from './more';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(ES_VOCAB + ES_VOCAB_ADV + ES_VOCAB_EXT + ES_VOCAB_DEEP), grammar: parseGrammar(ES_GRAMMAR + ES_GRAMMAR_ADV + ES_GRAMMAR_EXT + ES_GRAMMAR_DEEP), conversations: parseConvs(ES_CONVS + ES_CONVS_ADV + ES_CONVS_EXT + ES_CONVS_DEEP),
  reading: parseReading(ES_READING + ES_READING_ADV + ES_READING_EXT + ES_READING_DEEP), listening: parseListening(ES_LISTENING + ES_LISTENING_ADV + ES_LISTENING_EXT + ES_LISTENING_DEEP), pronunciation: parsePron(ES_PRON + ES_PRON_DEEP),
  writing: parseWriting(ES_WRITING + ES_WRITING_ADV + ES_WRITING_EXT + ES_WRITING_DEEP), cheats: parseCheats(ES_CHEATS + ES_CHEATS_DEEP), placement: parsePlacement(ES_PLACEMENT + ES_PLACEMENT_ADV + ES_PLACEMENT_EXT + ES_PLACEMENT_DEEP),
  ui: ES_UI, grammarLevels: {},
};
content.vocab.push(...pvM(ES_MORE_VOCAB)); content.reading.push(...prM(ES_MORE_READING)); content.listening.push(...plM(ES_MORE_LISTENING)); content.conversations.push(...pcM(ES_MORE_CONVS));
export default content;
