// Audit for "context-clue" leaks: questions a learner could answer by matching strings, without knowing any of the language.
import { fold, hasCJK, norm } from '../core/text';
import type { Exercise, LanguageContent } from '../core/types';

const BLOCK = /[぀-ヿ㐀-䶿一-鿿가-힯]/;
/** Comparable units of a text: character pairs for CJK/Hangul (no spaces), 4-letter word stems elsewhere. */
export function units(s: string): string[] {
  const f = fold(s).replace(/'/g, ' ');
  if (BLOCK.test(f)) { const c = [...f.replace(/[\s\d]/g, '')]; return c.length < 2 ? c : c.slice(0, -1).map((x, i) => x + c[i + 1]); }
  return f.split(' ').filter((w) => w.length >= 3).map((w) => w.slice(0, 4));
}
/** Share of a choice's units that already occur in the passage (1 = the choice is copied out of the text). */
export function overlap(choice: string, passage: string): number {
  const u = units(choice); if (!u.length) return 0;
  const p = new Set(units(passage)); return u.filter((x) => p.has(x)).length / u.length;
}

export interface Leak { where: string; why: string; prompt: string }

/** An mcq is leaky if the right choice is the one that looks most like the passage, and the others look nothing like it. */
export function passageLeak(ex: Exercise, passage: string): string | null {
  if (ex.kind !== 'mcq') return null;
  const sc = ex.choices.map((c) => overlap(c, passage));
  const right = sc[ex.answer]; const best = Math.max(...sc.filter((_, i) => i !== ex.answer), 0);
  // Pattern-matching wins when the right choice is (nearly) quoted from the text and no wrong choice is.
  return right >= 0.67 && right > best ? `correct choice is copied from the text (${right.toFixed(2)} vs ${best.toFixed(2)})` : null;
}
/** Fill/type/mcq whose own prompt already contains the answer. */
export function selfLeak(ex: Exercise): string | null {
  const ans = ex.kind === 'mcq' ? [ex.choices[ex.answer]] : ex.kind === 'order' ? [] : ex.answers;
  const p = norm(ex.prompt);
  for (const a of ans) {
    const fa = norm(a); if (fa.length < 2) continue;
    if (BLOCK.test(fa) || hasCJK(fa) ? p.includes(fa) : (` ${p} `).includes(` ${fa} `)) return `answer "${a}" is written in the question`;
  }
  return null;
}

export function leakIssues(c: LanguageContent, code: string): Leak[] {
  const out: Leak[] = [];
  const add = (where: string, ex: Exercise, why: string | null) => { if (why) out.push({ where: `${code}:${where}`, why, prompt: ex.prompt.slice(0, 90) }); };
  c.grammar.forEach((g) => g.exercises.forEach((e, i) => add(`grammar:${g.id}#${i}`, e, selfLeak(e))));
  c.reading.forEach((r) => { const txt = r.paragraphs.join(' '); r.questions.forEach((q, i) => add(`reading:${r.id}#${i}`, q, passageLeak(q, txt) ?? selfLeak(q))); });
  // Listening questions are heard, not read (the transcript is hidden until the end), so only a self-leak in the question text counts.
  c.listening.forEach((l) => l.questions.forEach((q, i) => add(`listening:${l.id}#${i}`, q, selfLeak(q))));
  // A placement reading item carries its passage inside the prompt, so compare the choices with that text; audio items are heard only.
  c.placement.forEach((p) => add(`placement:${p.id}`, p.ex, p.audio ? selfLeak(p.ex) : p.ex.kind === 'mcq' && p.skill === 'reading' ? passageLeak(p.ex, p.ex.prompt) : selfLeak(p.ex)));
  return out;
}
