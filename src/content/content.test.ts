// Content validation — fails the build if a language's data is inconsistent or the 30-day programme has holes.
import { describe, it, expect } from 'vitest';
import { LANGUAGES, loadContent } from './registry';
import { PROGRAM } from '../core/program';
import { resolveProgram } from '../core/curriculum';
import { VOCAB_CATEGORIES } from '../core/categories';
import { clozeOf } from '../core/exercises';
import type { Cefr, Exercise, LanguageContent } from '../core/types';
import { buildPlacementPool, initPlacement, nextItem, submit, placementResult, difficulty, guessRate, MARGIN } from '../core/placement';
import { mulberry32 } from '../core/text';
import { cefrIndex } from '../core/types';

/** Minimum material per level above A2: the point of these floors is that a learner can keep going from B1 to the top of what the app teaches. */
const DEPTH: Record<string, { vocab: number; grammar: number; conv: number; reading: number; listening: number; writing: number }> = {
  B1: { vocab: 18, grammar: 2, conv: 1, reading: 1, listening: 1, writing: 1 },
  B2: { vocab: 18, grammar: 2, conv: 1, reading: 1, listening: 1, writing: 1 },
  C1: { vocab: 16, grammar: 2, conv: 1, reading: 1, listening: 1, writing: 1 },
  C2: { vocab: 10, grammar: 1, conv: 1, reading: 1, listening: 0, writing: 0 },
};

const checkEx = (ex: Exercise, where: string) => {
  if (ex.kind === 'mcq') {
    expect(ex.choices.length, where).toBeGreaterThanOrEqual(2);
    expect(new Set(ex.choices).size, `${where}: duplicate choices ${ex.choices}`).toBe(ex.choices.length);
    expect(ex.answer, where).toBeGreaterThanOrEqual(0);
  } else if (ex.kind === 'order') { expect(ex.words.length, where).toBeGreaterThanOrEqual(2); }
  else { expect(ex.answers.length, where).toBeGreaterThan(0); ex.answers.forEach((a) => expect(a.trim(), where).not.toBe('')); }
  expect(ex.prompt.trim(), where).not.toBe('');
};

for (const lang of LANGUAGES) {
  describe(`content: ${lang.code}`, async () => {
    const c: LanguageContent = await loadContent(lang.code);
    it('vocabulary is well-formed', () => {
      const ids = new Set<string>();
      const cats = new Set(VOCAB_CATEGORIES.map((x) => x.id));
      for (const v of c.vocab) {
        expect(ids.has(v.id), `dup ${v.id}`).toBe(false); ids.add(v.id);
        expect(cats.has(v.cat), `${v.id} bad cat ${v.cat}`).toBe(true);
        expect(v.t && v.n && v.pron && v.ex && v.exn, `${v.id} incomplete`).toBeTruthy();
        if (v.pos === 'noun' && !lang.noGender) expect(v.gender, `${v.id} noun needs gender`).toBeTruthy();
      }
      expect(c.vocab.length).toBeGreaterThan(200);
      const cloze = c.vocab.filter((v) => clozeOf(v)).length / c.vocab.length;
      expect(cloze, 'enough words usable for contextual cloze').toBeGreaterThan(0.5);
    });
    it('grammar lessons are complete and valid', () => {
      for (const g of c.grammar) {
        expect(g.exercises.length, g.id).toBeGreaterThanOrEqual(4);
        expect(g.examples.length, g.id).toBeGreaterThanOrEqual(3);
        expect(g.mistakes.length, g.id).toBeGreaterThanOrEqual(2);
        expect(g.body.length, g.id).toBeGreaterThan(0);
        g.exercises.forEach((e, i) => checkEx(e, `${g.id}#${i}`));
      }
      expect(new Set(c.grammar.map((g) => g.id)).size).toBe(c.grammar.length);
    });
    it('every programme slot resolves to content', () => {
      const days = resolveProgram(c);
      for (const d of days) {
        const w = `day ${d.def.day}`;
        d.def.grammar.forEach((s, i) => expect(d.grammar[i], `${w}: grammar slot ${s}`).toBeTruthy());
        expect(d.conv, `${w}: conv ${d.def.conv}`).toBeTruthy();
        if (d.def.reading) expect(d.reading, `${w}: reading ${d.def.reading}`).toBeTruthy();
        if (d.def.listening) expect(d.listening, `${w}: listening ${d.def.listening}`).toBeTruthy();
        if (d.def.pron) expect(d.pron, `${w}: pron ${d.def.pron}`).toBeTruthy();
        if (d.def.writing) expect(d.writing, `${w}: writing ${d.def.writing}`).toBeTruthy();
        if (d.def.newWords > 0 && d.def.day <= 20) expect(d.words.length, `${w}: new words`).toBeGreaterThanOrEqual(4);
      }
      expect(PROGRAM.length).toBe(30);
    });
    it('conversations, readings, listenings are valid', () => {
      for (const cv of c.conversations) {
        expect(cv.steps.length, cv.id).toBeGreaterThanOrEqual(3);
        for (const s of cv.steps) { expect(s.options.filter((o) => o.good).length, cv.id).toBe(1); expect(s.options.length, cv.id).toBeGreaterThanOrEqual(3); expect(s.keywords.length, `${cv.id} keywords`).toBeGreaterThan(0); }
      }
      for (const r of c.reading) { expect(r.paragraphs.length).toBe(r.translation.length); r.questions.forEach((q, i) => checkEx(q, `${r.id}#${i}`)); expect(r.questions.length, r.id).toBeGreaterThanOrEqual(3); }
      for (const l of c.listening) { expect(l.lines.length, l.id).toBeGreaterThanOrEqual(4); l.questions.forEach((q, i) => checkEx(q, `${l.id}#${i}`)); }
      for (const p of c.pronunciation) { expect(p.sounds.length).toBeGreaterThan(2); expect(p.drills.length).toBeGreaterThan(1); }
      for (const w of c.writing) { expect(w.requires.length).toBeGreaterThan(1); expect(w.model).toBeTruthy(); }
    });
    it('placement covers A1–C2 with several skills', () => {
      for (const lvl of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
        const items = c.placement.filter((p) => p.level === lvl);
        expect(items.length, `placement ${lvl}`).toBeGreaterThanOrEqual(lvl === 'A1' || lvl === 'A2' ? 4 : 5);
        expect(new Set(items.map((i) => i.skill)).size, `skills at ${lvl}`).toBeGreaterThanOrEqual(2);
        items.forEach((p) => checkEx(p.ex, p.id));
      }
      expect(new Set(c.placement.map((p) => p.id)).size, 'placement ids unique').toBe(c.placement.length);
    });
    it('goes deep: real material at every level up to C2', () => {
      for (const lvl of ['B1', 'B2', 'C1', 'C2'] as Cefr[]) {
        const need = { ...DEPTH[lvl], ...(lang.depth?.[lvl] ?? {}) };
        const n = (arr: { level: string }[]) => arr.filter((x) => x.level === lvl).length;
        expect(n(c.vocab), `${lvl} vocab`).toBeGreaterThanOrEqual(need.vocab);
        expect(n(c.grammar), `${lvl} grammar`).toBeGreaterThanOrEqual(need.grammar);
        expect(n(c.conversations), `${lvl} conversations`).toBeGreaterThanOrEqual(need.conv);
        expect(n(c.reading), `${lvl} reading`).toBeGreaterThanOrEqual(need.reading);
        expect(n(c.listening), `${lvl} listening`).toBeGreaterThanOrEqual(need.listening);
        expect(n(c.writing), `${lvl} writing`).toBeGreaterThanOrEqual(need.writing);
      }
    });
    it('the real placement pool recovers simulated learners (within one level ≥ 90 %, never over by 2+)', () => {
      const pool = buildPlacementPool(c.placement, c.vocab, mulberry32(3), { sign: lang.sign });
      for (const lvl of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) expect(pool.filter((p) => p.level === lvl).length, `pool ${lvl}`).toBeGreaterThanOrEqual(10);
      let within = 0, runs = 0, over2 = 0;
      for (let lv = 0; lv <= 5; lv++) for (let k = 0; k < 12; k++) {
        const theta = lv + MARGIN + 0.1 + (k / 12) * 0.6 - 0.3; const rnd = mulberry32(900 + lv * 50 + k); let st = initPlacement(); let g = 0;
        while (!st.done && g++ < 60) { const it = nextItem(pool, st, rnd, false); if (!it) break; const know = rnd() < 1 / (1 + Math.exp(-1.7 * (theta - difficulty(it)))); st = submit(pool, st, it, know || rnd() < guessRate(it.ex), false); }
        const r = placementResult(st, 0); const d = cefrIndex(r.overall) - Math.max(0, Math.min(5, Math.floor(theta - MARGIN + 1e-9)));
        runs++; if (Math.abs(d) <= 1) within++; if (d >= 2) over2++;
      }
      expect(within / runs).toBeGreaterThanOrEqual(0.9); expect(over2).toBe(0);
    });
    if (lang.code === 'de') it('German nouns carry a Plural note', () => { for (const v of c.vocab.filter((x) => x.pos === 'n')) expect(v.note ?? '', v.id).toMatch(/Plural:/); });
    it('cheat sheets exist and have rows', () => { expect(c.cheats.length).toBeGreaterThanOrEqual(8); c.cheats.forEach((s) => expect(s.rows.length).toBeGreaterThan(1)); });
  });
}
