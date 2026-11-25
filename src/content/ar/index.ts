import type { LanguageContent } from '../../core/types';
import { parseVocab, parseGrammar, parseConvs, parseReading, parseListening, parsePron, parseWriting, parseCheats, parsePlacement } from '../dsl';
import { AR_VOCAB } from './vocab'; import { AR_GRAMMAR } from './grammar'; import { AR_CONVS } from './convs';
import { AR_READING, AR_LISTENING, AR_WRITING, AR_PRON, AR_CHEATS, AR_PLACEMENT, AR_UI } from './texts';

import { AR_VOCAB_ADV, AR_GRAMMAR_ADV, AR_CONVS_ADV, AR_READING_ADV, AR_LISTENING_ADV, AR_WRITING_ADV, AR_PLACEMENT_ADV, AR_PLACEMENT_EXTRA } from './adv';
const content: LanguageContent = {
  vocab: parseVocab(AR_VOCAB + AR_VOCAB_ADV), grammar: parseGrammar(AR_GRAMMAR + AR_GRAMMAR_ADV), conversations: parseConvs(AR_CONVS + AR_CONVS_ADV),
  reading: parseReading(AR_READING + AR_READING_ADV), listening: parseListening(AR_LISTENING + AR_LISTENING_ADV), pronunciation: parsePron(AR_PRON),
  writing: parseWriting(AR_WRITING + AR_WRITING_ADV), cheats: parseCheats(AR_CHEATS), placement: parsePlacement(AR_PLACEMENT + AR_PLACEMENT_ADV + AR_PLACEMENT_EXTRA),
  ui: AR_UI, grammarLevels: {},
  pace: { 1: { cats: ['script', 'greetings'], newWords: 18 }, 2: { cats: ['script', 'numbers', 'pronouns'], newWords: 14 }, 3: { cats: ['script', 'objects'], newWords: 14 } },
};
export default content;
