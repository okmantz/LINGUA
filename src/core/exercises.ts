// Turn vocabulary cards into adaptive, contextual exercises.
import type { Card, Exercise, Mode, VocabEntry } from './types';
import { coreWord, fold, shuffle } from './text';

export interface CardExercise {
  mode: Mode; entry: VocabEntry; ex: Exercise; speak?: string; // text to play for listening items
  answerLabel: string;
}

/** Choose a retrieval mode that gets harder as the memory gets stronger (desirable difficulty). */
export function pickMode(card: Card | undefined, rnd: () => number): Mode {
  if (!card || card.state === 0) return 'recog';
  const s = card.stability;
  const pool: Mode[] = card.state === 1 || card.state === 3 ? ['recog', 'rev', 'listen']
    : s < 3 ? ['rev', 'listen', 'recog']
    : s < 14 ? ['listen', 'cloze', 'rev', 'produce']
    : ['produce', 'cloze', 'listen'];
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

export function clozeOf(e: VocabEntry): { prompt: string; answer: string } | null {
  const core = coreWord(e.t);
  if (!core || core.includes(' ')) return null;
  const re = new RegExp(`(^|[^\\p{L}])(${core.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?=$|[^\\p{L}])`, 'iu');
  const m = re.exec(e.ex);
  if (!m) return null;
  return { prompt: e.ex.replace(re, `$1_____`), answer: m[2] };
}

export function makeExercise(e: VocabEntry, mode: Mode, pool: VocabEntry[], rnd: () => number): CardExercise {
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
    case 'produce': default:
      return { mode: 'produce', entry: e, ex: { kind: 'type', prompt: e.n, answers: [e.t, coreWord(e.t)], skill: 'vocabulary' }, answerLabel: `${e.t} = ${e.n}` };
  }
}
export const sameWord = (a: string, b: string) => fold(a) === fold(b);
