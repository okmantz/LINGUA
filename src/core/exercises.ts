// Turn vocabulary cards into adaptive, contextual exercises.
import type { Card, Exercise, Mode, VocabEntry } from './types';
import { coreWord, fold, shuffle } from './text';

export interface CardExercise {
  mode: Mode; entry: VocabEntry; ex: Exercise; speak?: string; // text to play for listening items
  answerLabel: string;
  fig?: string;        // sign-language figure shown above the question
}

/** Choose a retrieval mode that gets harder as the memory gets stronger (desirable difficulty). */
export function pickMode(card: Card | undefined, rnd: () => number, canHear = true): Mode {
  if (!card || card.state === 0) return 'recog';
  const s = card.stability; const canDictate = canHear;
  // 'dictate' (hear a whole sentence, type it) joins once a word is reasonably stable: sentence-level listening + spelling, the hardest retrieval.
  const pool: Mode[] = card.state === 1 || card.state === 3 ? ['recog', 'rev', 'listen']
    : s < 3 ? ['rev', 'listen', 'recog']
    : s < 14 ? ['listen', 'cloze', 'rev', 'produce', ...(canDictate ? ['dictate' as Mode] : [])]
    : ['produce', 'cloze', 'listen', ...(canDictate ? ['dictate' as Mode] : [])];
  // Without a working voice (or in a sign language) nothing can be heard, so listening modes are never offered.
  if (!canHear) { const silent = pool.filter((m) => m !== 'listen' && m !== 'dictate'); pool.length = 0; pool.push(...(silent.length ? silent : (['rev', 'produce'] as Mode[]))); }
  // prefer the least practised mode among the pool (interleaving)
  const counts = pool.map((m) => (card.modes[m]?.ok ?? 0) + (card.modes[m]?.fail ?? 0) + rnd() * 0.9);
  return pool[counts.indexOf(Math.min(...counts))];
}

function distractors(e: VocabEntry, pool: VocabEntry[], n: number, rnd: () => number, key: 't' | 'n') {
  const same = pool.filter((p) => p.id !== e.id && p.pos === e.pos && p.cat === e.cat);
  const samePos = pool.filter((p) => p.id !== e.id && p.pos === e.pos && !same.includes(p));
  const rest = pool.filter((p) => p.id !== e.id && !same.includes(p) && !samePos.includes(p));
  const out: string[] = [];
  for (const p of [...shuffle(same, rnd), ...shuffle(samePos, rnd), ...shuffle(rest, rnd)]) {
    if (!out.includes(p[key]) && p[key] !== e[key]) out.push(p[key]);
    if (out.length >= n) break;
  }
  return out;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Which sides of a word must be a word boundary. Chinese/Japanese have no spaces; Korean and Arabic attach particles/prefixes. */
const boundaries = (core: string): { lead: boolean; trail: boolean } =>
  /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(core) ? { lead: false, trail: false }
  : /[\uac00-\ud7af]/.test(core) ? { lead: true, trail: false }
  : /[\u0600-\u06ff]/.test(core) ? { lead: false, trail: false }
  : { lead: true, trail: true };

export function clozeOf(e: VocabEntry): { prompt: string; answer: string } | null {
  const core = coreWord(e.t);
  if (!core || core.includes(' ')) return null;
  const b = boundaries(core);
  const re = new RegExp(`${b.lead ? '(^|[^\\p{L}])' : '()'}(${esc(core)})${b.trail ? '(?=$|[^\\p{L}])' : ''}`, 'iu');
  const m = re.exec(e.ex);
  if (!m) return null;
  return { prompt: e.ex.replace(re, `$1_____`), answer: m[2] };
}

const isLatinish = (s: string) => !/[^\u0000-\u024f\u1e00-\u1eff\u0400-\u04ff]/.test(s);
/** In Chinese/Japanese/Korean/Arabic a learner may not have the right keyboard, so the romanisation (pinyin, rōmaji, RR…) is accepted too. */
const romanAlts = (e: VocabEntry): string[] => {
  if (isLatinish(e.t) || !e.pron) return [];
  const p = e.pron.replace(/·/g, '');
  return [p, p.replace(/-/g, ''), p.replace(/-/g, ' ')];
};

export const SIGN_PREFIX = 'fig:';
/** Sign-language vocabulary: the question is a figure (or the answer choices are figures); nothing is spoken. */
function makeSignExercise(e: VocabEntry, mode: Mode, pool: VocabEntry[], rnd: () => number): CardExercise {
  const gloss = (v: VocabEntry) => v.t;
  const others = (pred: (p: VocabEntry) => boolean, n: number) => shuffle(pool.filter((p) => p.id !== e.id && p.fig && p.fig !== e.fig && pred(p)), rnd).slice(0, n);
  const near = (p: VocabEntry) => p.cat === e.cat;
  const pick = (n: number) => { const a = others(near, n); return a.length >= n ? a : [...a, ...others((p) => !near(p) && !a.includes(p), n - a.length)]; };
  const label = `${e.t} = ${e.n}`;
  if (mode === 'rev') {
    const wrong = pick(3).map((p) => SIGN_PREFIX + p.fig);
    const choices = shuffle([SIGN_PREFIX + e.fig, ...wrong], rnd);
    return { mode, entry: e, ex: { kind: 'mcq', prompt: `Which sign means "${e.n}"?`, choices, answer: choices.indexOf(SIGN_PREFIX + e.fig), skill: 'vocabulary' }, answerLabel: label };
  }
  if (mode === 'produce' || mode === 'cloze' || mode === 'dictate' || mode === 'listen') {
    if (mode === 'cloze') { const c = clozeOf(e); if (c) return { mode, entry: e, ex: { kind: 'fill', prompt: c.prompt, answers: [c.answer, c.answer.replace(/-/g, ' ')], hint: `${e.exn} · ${e.n}`, skill: 'vocabulary' }, answerLabel: label }; }
    return { mode: 'produce', entry: e, fig: e.fig, ex: { kind: 'type', prompt: 'Type the English gloss for this sign', answers: [gloss(e), gloss(e).replace(/-/g, ' '), e.n.replace(/\(.*\)/, '').trim()], skill: 'vocabulary' }, answerLabel: label };
  }
  const wrong = pick(3).map((p) => p.n);
  const choices = shuffle([e.n, ...wrong], rnd);
  return { mode: 'recog', entry: e, fig: e.fig, ex: { kind: 'mcq', prompt: 'What does this sign mean?', choices, answer: choices.indexOf(e.n), skill: 'vocabulary' }, answerLabel: label };
}

export function makeExercise(e: VocabEntry, mode: Mode, pool: VocabEntry[], rnd: () => number): CardExercise {
  if (e.fig) return makeSignExercise(e, mode, pool, rnd);
  const mcq = (prompt: string, right: string, wrong: string[], extra: Partial<CardExercise> = {}): CardExercise => {
    const choices = shuffle([right, ...wrong], rnd);
    return { mode, entry: e, ex: { kind: 'mcq', prompt, choices, answer: choices.indexOf(right), skill: 'vocabulary' }, answerLabel: `${e.t} = ${e.n}`, ...extra };
  };
  switch (mode) {
    case 'recog': return mcq(e.t, e.n, distractors(e, pool, 3, rnd, 'n'), { speak: e.t });
    case 'rev': return mcq(e.n, e.t, distractors(e, pool, 3, rnd, 't'));
    case 'listen': return mcq('🔊', e.t, distractors(e, pool, 3, rnd, 't'), { speak: e.t });
    case 'cloze': {
      const c = clozeOf(e);
      if (c) return { mode, entry: e, ex: { kind: 'fill', prompt: c.prompt, answers: [c.answer], hint: `${e.exn} · ${e.n}`, skill: 'vocabulary' }, answerLabel: `${e.t} = ${e.n}`, speak: e.ex };
      return makeExercise(e, 'produce', pool, rnd);
    }
    case 'dictate': {
      // Hear the whole example sentence and type it: trains sound→spelling and sentence-level listening.
      if (!isLatinish(e.ex) || e.ex.split(/\s+/).length < 2) return makeExercise(e, 'produce', pool, rnd);
      return { mode, entry: e, ex: { kind: 'type', prompt: '🔊 ' + 'Type what you hear', answers: [e.ex], skill: 'listening' }, speak: e.ex, answerLabel: `${e.ex} = ${e.exn}` };
    }
    case 'produce': default:
      return { mode: 'produce', entry: e, ex: { kind: 'type', prompt: e.n, answers: [e.t, coreWord(e.t), ...romanAlts(e)], skill: 'vocabulary' }, answerLabel: `${e.t}${isLatinish(e.t) ? '' : ` (${e.pron})`} = ${e.n}` };
  }
}
export const sameWord = (a: string, b: string) => fold(a) === fold(b);
