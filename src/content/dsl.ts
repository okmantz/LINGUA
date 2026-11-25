// Compact authoring format → typed content. Keeps each language a data-entry job, not a code job.
import type { Cefr, Conversation, CheatSection, ConvStep, Exercise, GrammarLesson, ListeningItem, PlacementItem, PronLesson, ReadingText, Skill, VocabEntry, WritingPrompt } from '../core/types';

const sp = (s: string, sep = '|') => s.split(sep).map((x) => x.trim());
const lines = (src: string) => src.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('//'));
const asciiSlug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Non-Latin words (Cyrillic, CJK, Hangul, Arabic) would all slug to '' — keep their letters so card ids stay stable and readable.
const slug = (s: string) => asciiSlug(s) || s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
const pair = (s: string): [string, string] => { const i = s.lastIndexOf(' = '); return i < 0 ? [s.trim(), ''] : [s.slice(0, i).trim(), s.slice(i + 3).trim()]; };

// ── Vocabulary: cat|target|english|pos[.gender]|respelling|example|example translation|level?|note?
export function parseVocab(src: string): VocabEntry[] {
  const seen = new Map<string, number>();
  return lines(src).map((l) => {
    const [cat, t, n, posg, pron, ex, exn, lvl, note, fig] = sp(l);
    const [pos, gender] = posg.split('.');
    let id = slug(t) || 'w'; const k = seen.get(id) ?? 0; seen.set(id, k + 1); if (k) id += `-${k + 1}`;
    const posFull = ({ n: 'noun', v: 'verb', adj: 'adj', adv: 'adv', phr: 'phrase', prep: 'prep', pron: 'pron', conj: 'conj', num: 'num', q: 'question' } as Record<string, string>)[pos] ?? pos;
    return { id, cat, t, n, pos: posFull, gender: gender || undefined, pron, ex, exn, level: (lvl || 'A1') as Cefr, note: note || undefined, fig: fig || undefined };
  });
}

// ── Exercises:  mcq Prompt ? a | *b | c   ·   fill Prompt ___ => ans / ans   ·   order Prompt => sentence   ·   type Prompt => ans / ans
export function parseEx(s: string, skill?: Skill, level?: Cefr): Exercise {
  const m = /^(mcq|fill|order|type)\s+([\s\S]*)$/.exec(s.trim());
  if (!m) throw new Error(`Bad exercise: ${s}`);
  const [, kind, rest] = m;
  const meta = { skill, level };
  if (kind === 'mcq') {
    const i = rest.lastIndexOf(' ? ');
    if (i < 0) throw new Error(`mcq needs " ? ": ${s}`);
    const prompt = rest.slice(0, i).trim();
    const raw = sp(rest.slice(i + 3));
    const answer = raw.findIndex((c) => c.startsWith('*'));
    if (answer < 0) throw new Error(`mcq has no *correct: ${s}`);
    return { kind: 'mcq', prompt, choices: raw.map((c) => c.replace(/^\*/, '')), answer, ...meta };
  }
  const [prompt, ans] = rest.split(' => ');
  if (!ans) throw new Error(`${kind} needs " => ": ${s}`);
  if (kind === 'fill') return { kind: 'fill', prompt: prompt.trim(), answers: sp(ans, '/'), ...meta };
  if (kind === 'order') return { kind: 'order', prompt: prompt.trim(), words: ans.trim().split(/\s+/), answer: ans.trim(), ...meta };
  return { kind: 'type', prompt: prompt.trim(), answers: sp(ans, '/'), ...meta };
}

// ── Grammar lessons
//  ## id | slot | title | level      S: summary   B: paragraph   T: row cells with |   E: ex = translation   M: mistake   X: exercise
export function parseGrammar(src: string): GrammarLesson[] {
  const out: GrammarLesson[] = []; let cur: GrammarLesson | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, summary: '', body: [], examples: [], mistakes: [], exercises: [] }; out.push(cur); continue; }
    if (!cur) continue;
    const tag = l.slice(0, 2), v = l.slice(2).trim();
    if (tag === 'S:') cur.summary = v;
    else if (tag === 'B:') cur.body.push(v);
    else if (tag === 'T:') { cur.table ??= { rows: [] }; if (v.startsWith('caption=')) cur.table.caption = v.slice(8); else cur.table.rows.push(sp(v)); }
    else if (tag === 'E:') cur.examples.push(pair(v));
    else if (tag === 'M:') cur.mistakes.push(v);
    else if (tag === 'X:') cur.exercises.push(parseEx(v, 'grammar', cur.level));
  }
  return out;
}

// ── Conversations
//  ## id | slot | title | level | scenario
//  N: npc text = translation
//  Y: model = translation || wrong = translation || wrong = translation :: kw,kw ; kw,kw
export function parseConvs(src: string): Conversation[] {
  const out: Conversation[] = []; let cur: Conversation | null = null; let npc: { t: string; n: string } | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level, scenario] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, scenario, steps: [] }; out.push(cur); continue; }
    if (!cur) continue;
    if (l.startsWith('N:')) { const [t, n] = pair(l.slice(2)); npc = { t, n }; }
    else if (l.startsWith('Y:') && npc) {
      const [optPart, kwPart] = l.slice(2).split(' :: ');
      const opts = optPart.split(' || ').map((o) => pair(o.trim()));
      if (opts.length < 2) throw new Error(`Conversation ${cur.id}: needs ≥1 wrong option`);
      const step: ConvStep = {
        npc, model: { t: opts[0][0], n: opts[0][1] },
        // A translation written as "(note)" is an explanation, not a gloss: shown only after the learner answers.
        options: opts.map(([t, n], i) => (n.startsWith('(') ? { t, n: '', good: i === 0, why: n.slice(1, -1) } : { t, n, good: i === 0 })),
        keywords: (kwPart ?? '').split(';').map((g) => sp(g, ',').filter(Boolean)).filter((g) => g.length),
      };
      cur.steps.push(step); npc = null;
    }
  }
  return out;
}

// ── Reading / Listening
//  ## id | slot | title | level    P: paragraph = translation   G: w = meaning ; w = meaning   Q: exercise
export function parseReading(src: string): ReadingText[] {
  const out: ReadingText[] = []; let cur: ReadingText | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, paragraphs: [], translation: [], glossary: [], questions: [] }; out.push(cur); continue; }
    if (!cur) continue;
    if (l.startsWith('P:')) { const [t, n] = pair(l.slice(2)); cur.paragraphs.push(t); cur.translation.push(n); }
    else if (l.startsWith('G:')) cur.glossary.push(...l.slice(2).split(';').map((g) => pair(g.trim())));
    else if (l.startsWith('Q:')) cur.questions.push(parseEx(l.slice(2), 'reading', cur.level));
  }
  return out;
}
export function parseListening(src: string): ListeningItem[] {
  const out: ListeningItem[] = []; let cur: ListeningItem | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, lines: [], questions: [] }; out.push(cur); continue; }
    if (!cur) continue;
    if (l.startsWith('L:')) { const body = l.slice(2).trim(); const c = body.indexOf(':'); const spk = body.slice(0, c).trim(); const [t, n] = pair(body.slice(c + 1).trim()); cur.lines.push({ spk, t, n }); }
    else if (l.startsWith('Q:')) cur.questions.push(parseEx(l.slice(2), 'listening', cur.level));
  }
  return out;
}

// ── Pronunciation:  ## id|slot|title|level   I: intro   S: sym | tip | w=meaning, w=meaning   P: a | b | note   D: drill   M: mistake
export function parsePron(src: string): PronLesson[] {
  const out: PronLesson[] = []; let cur: PronLesson | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, intro: '', sounds: [], minimalPairs: [], drills: [], mistakes: [] }; out.push(cur); continue; }
    if (!cur) continue;
    const v = l.slice(2).trim();
    if (l.startsWith('I:')) cur.intro = v;
    else if (l.startsWith('S:')) { const [sym, tip, ex] = sp(v); cur.sounds.push({ sym, tip, examples: ex.split(',').map((e) => { const [a, b] = sp(e, '='); return [a, b ?? ''] as [string, string]; }) }); }
    else if (l.startsWith('P:')) { const [a, b, n] = sp(v); cur.minimalPairs.push([a, b, n ?? '']); }
    else if (l.startsWith('D:')) cur.drills.push(v);
    else if (l.startsWith('M:')) cur.mistakes.push(v);
  }
  return out;
}

// ── Writing:  ## id|slot|title|level|minWords   T: task   R: label = alt, alt ; label = alt   M: model = translation
export function parseWriting(src: string): WritingPrompt[] {
  const out: WritingPrompt[] = []; let cur: WritingPrompt | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, slot, title, level, mw] = sp(l.slice(2)); cur = { id, slot, title, level: level as Cefr, task: '', minWords: Number(mw) || 20, requires: [], model: '', modelN: '' }; out.push(cur); continue; }
    if (!cur) continue;
    const v = l.slice(2).trim();
    if (l.startsWith('T:')) cur.task = v;
    else if (l.startsWith('R:')) cur.requires = v.split(';').map((g) => { const [label, alts] = pair(g.trim()); return { label, any: sp(alts, ',') }; });
    else if (l.startsWith('M:')) { const [m, n] = pair(v); cur.model = m; cur.modelN = n; }
  }
  return out;
}

// ── Cheat sheets: ## id | title | tag, tag   N: note   R: a | b | c
export function parseCheats(src: string): CheatSection[] {
  const out: CheatSection[] = []; let cur: CheatSection | null = null;
  for (const l of lines(src)) {
    if (l.startsWith('##')) { const [id, title, tags] = sp(l.slice(2)); cur = { id, title, tags: sp(tags ?? '', ','), rows: [] }; out.push(cur); continue; }
    if (!cur) continue;
    if (l.startsWith('N:')) cur.note = l.slice(2).trim(); else if (l.startsWith('R:')) cur.rows.push(sp(l.slice(2)));
  }
  return out;
}

// ── Placement:  skill | level | audio text or - | exercise
export function parsePlacement(src: string): PlacementItem[] {
  return lines(src).map((l, i) => {
    const [skill, level, audio, ...rest] = sp(l);
    return { id: `p${i}-${slug(rest.join(' ')).slice(0, 18)}`, skill: skill as Skill, level: level as Cefr, audio: audio === '-' ? undefined : audio, ex: parseEx(rest.join(' | '), skill as Skill, level as Cefr) };
  });
}
