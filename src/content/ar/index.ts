import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { AR_VOCAB } from './vocab'; import { AR_GRAMMAR } from './grammar'; import { AR_CONVS } from './convs';
import { AR_READING, AR_LISTENING, AR_WRITING, AR_PRON, AR_CHEATS, AR_PLACEMENT, AR_UI } from './texts';

import { AR_VOCAB_EXT, AR_GRAMMAR_EXT, AR_CONVS_EXT, AR_READING_EXT, AR_LISTENING_EXT, AR_WRITING_EXT, AR_PLACEMENT_EXT } from './ext';
import { AR_VOCAB_ADV, AR_GRAMMAR_ADV, AR_CONVS_ADV, AR_READING_ADV, AR_LISTENING_ADV, AR_WRITING_ADV, AR_PLACEMENT_ADV, AR_PLACEMENT_EXTRA } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(AR_VOCAB + AR_VOCAB_ADV + AR_VOCAB_EXT), grammar: parseGrammar(AR_GRAMMAR + AR_GRAMMAR_ADV + AR_GRAMMAR_EXT), conversations: parseConvs(AR_CONVS + AR_CONVS_ADV + AR_CONVS_EXT),
  reading: parseReading(AR_READING + AR_READING_ADV + AR_READING_EXT), listening: parseListening(AR_LISTENING + AR_LISTENING_ADV + AR_LISTENING_EXT), pronunciation: parsePron(AR_PRON),
  writing: parseWriting(AR_WRITING + AR_WRITING_ADV + AR_WRITING_EXT), cheats: parseCheats(AR_CHEATS), placement: parsePlacement(AR_PLACEMENT + AR_PLACEMENT_ADV + AR_PLACEMENT_EXTRA + AR_PLACEMENT_EXT),
  ui: AR_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
