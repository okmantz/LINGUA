import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { ZH_VOCAB } from './vocab'; import { ZH_GRAMMAR } from './grammar'; import { ZH_CONVS } from './convs';
import { ZH_READING, ZH_LISTENING, ZH_WRITING, ZH_PRON, ZH_CHEATS, ZH_PLACEMENT, ZH_UI } from './texts';

import { ZH_VOCAB_EXT, ZH_GRAMMAR_EXT, ZH_CONVS_EXT, ZH_READING_EXT, ZH_LISTENING_EXT, ZH_WRITING_EXT, ZH_PLACEMENT_EXT } from './ext';
import { ZH_VOCAB_ADV, ZH_GRAMMAR_ADV, ZH_CONVS_ADV, ZH_READING_ADV, ZH_LISTENING_ADV, ZH_WRITING_ADV, ZH_PLACEMENT_ADV } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(ZH_VOCAB + ZH_VOCAB_ADV + ZH_VOCAB_EXT), grammar: parseGrammar(ZH_GRAMMAR + ZH_GRAMMAR_ADV + ZH_GRAMMAR_EXT), conversations: parseConvs(ZH_CONVS + ZH_CONVS_ADV + ZH_CONVS_EXT),
  reading: parseReading(ZH_READING + ZH_READING_ADV + ZH_READING_EXT), listening: parseListening(ZH_LISTENING + ZH_LISTENING_ADV + ZH_LISTENING_EXT), pronunciation: parsePron(ZH_PRON),
  writing: parseWriting(ZH_WRITING + ZH_WRITING_ADV + ZH_WRITING_EXT), cheats: parseCheats(ZH_CHEATS), placement: parsePlacement(ZH_PLACEMENT + ZH_PLACEMENT_ADV + ZH_PLACEMENT_EXT),
  ui: ZH_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
