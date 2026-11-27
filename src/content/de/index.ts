import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { DE_VOCAB } from './vocab'; import { DE_GRAMMAR } from './grammar'; import { DE_CONVS } from './convs';
import { DE_READING, DE_LISTENING, DE_WRITING, DE_PRON, DE_CHEATS, DE_PLACEMENT, DE_UI } from './texts';

import { DE_VOCAB_EXT, DE_GRAMMAR_EXT, DE_CONVS_EXT, DE_READING_EXT, DE_LISTENING_EXT, DE_WRITING_EXT, DE_PLACEMENT_EXT } from './ext';
import { DE_VOCAB_ADV, DE_GRAMMAR_ADV, DE_CONVS_ADV, DE_READING_ADV, DE_LISTENING_ADV, DE_WRITING_ADV, DE_PLACEMENT_ADV } from './adv';
import { DE_VOCAB_DEEP, DE_GRAMMAR_DEEP } from './deep'; import { DE_CONVS_DEEP, DE_READING_DEEP, DE_LISTENING_DEEP, DE_WRITING_DEEP, DE_PLACEMENT_DEEP, DE_CHEATS_DEEP, DE_PRON_DEEP } from './deep2';
import { DE_MORE_VOCAB, DE_MORE_READING, DE_MORE_LISTENING, DE_MORE_CONVS } from './more';
import { DE_MORE2_VOCAB } from './more2';
import { parseVocab as pvM, parseReading as prM, parseListening as plM, parseConvs as pcM } from '../dsl';
const content: LanguageContent = {
  vocab: parseVocab(DE_VOCAB + DE_VOCAB_ADV + DE_VOCAB_EXT + DE_VOCAB_DEEP), grammar: parseGrammar(DE_GRAMMAR + DE_GRAMMAR_ADV + DE_GRAMMAR_EXT + DE_GRAMMAR_DEEP), conversations: parseConvs(DE_CONVS + DE_CONVS_ADV + DE_CONVS_EXT + DE_CONVS_DEEP),
  reading: parseReading(DE_READING + DE_READING_ADV + DE_READING_EXT + DE_READING_DEEP), listening: parseListening(DE_LISTENING + DE_LISTENING_ADV + DE_LISTENING_EXT + DE_LISTENING_DEEP), pronunciation: parsePron(DE_PRON + DE_PRON_DEEP),
  writing: parseWriting(DE_WRITING + DE_WRITING_ADV + DE_WRITING_EXT + DE_WRITING_DEEP), cheats: parseCheats(DE_CHEATS + DE_CHEATS_DEEP), placement: parsePlacement(DE_PLACEMENT + DE_PLACEMENT_ADV + DE_PLACEMENT_EXT + DE_PLACEMENT_DEEP),
  ui: DE_UI, grammarLevels: {},
};
content.vocab.push(...pvM(DE_MORE_VOCAB));
{ const have = new Set(content.vocab.map((v) => v.id)); content.vocab.push(...pvM(DE_MORE2_VOCAB).filter((v) => !have.has(v.id))); } content.reading.push(...prM(DE_MORE_READING)); content.listening.push(...plM(DE_MORE_LISTENING)); content.conversations.push(...pcM(DE_MORE_CONVS));
export default content;
