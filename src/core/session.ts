// Daily learning engine: builds a personalised session that fits the user's time budget.
import type { Card, LangState, LanguageContent, Skill, EventRec, Cefr } from './types';
import { cefrIndex } from './types';
import { PROGRAM_LENGTH } from './program';
import { resolveProgram, pathwayItems, dayWords } from './curriculum';
import { skillScores } from './analytics';

export type BlockType = 'review' | 'newvocab' | 'grammar' | 'conversation' | 'reading' | 'listening' | 'pronunciation' | 'writing' | 'recap';
export interface Block {
  key: string; type: BlockType; title: string; why: string; minutes: number; skill: Skill;
  ids: string[];             // content ids (vocab ids / lesson id / etc.)
  programDay?: number; required?: boolean;
}
export interface SessionPlan { blocks: Block[]; minutes: number; day: number | null; focus: string; dueTotal: number }

export const SEC = { review: 14, newWord: 32, grammar: 240, conversation: 240, reading: 230, listening: 190, pronunciation: 150, writing: 210 };
const min = (sec: number) => Math.max(1, Math.round(sec / 60));

export interface PlanInput {
  minutes: number; state: LangState; content: LanguageContent; cards: Card[]; events: EventRec[]; now: number; rnd?: () => number;
}

export function planSession(inp: PlanInput): SessionPlan {
  const { state, content, cards, events, now } = inp;
  const budget = inp.minutes * 60;
  const blocks: Block[] = [];
  let used = 0;
  const left = () => budget - used;
  const push = (b: Block, sec: number) => { blocks.push({ ...b, minutes: min(sec) }); used += sec; };

  const vocabCards = new Map(cards.filter((c) => c.kind === 'vocab').map((c) => [c.itemId, c]));
  const due = cards.filter((c) => c.kind === 'vocab' && c.due <= now).sort((a, b) => a.due - b.due);
  const skills = skillScores(events);
  const weakest = (Object.entries(skills) as [Skill, { score: number | null; n: number }][])
    .filter(([s, v]) => ['grammar', 'reading', 'listening', 'writing', 'speaking', 'conversation'].includes(s) && v.score !== null && v.n >= 4)
    .sort((a, b) => (a[1].score as number) - (b[1].score as number))[0]?.[0];

  const programActive = state.programDay <= PROGRAM_LENGTH && !state.placement?.skipProgram;
  const days = programActive ? resolveProgram(content) : [];
  const today = programActive ? days[state.programDay - 1] : undefined;
  const prog = state.dayProgress[state.programDay] ?? [];
  const isDone = (k: string) => prog.includes(k);

  // 1) Retrieval practice first — reviews are the highest-yield minutes. Cap so new learning still happens.
  const backlog = due.length;
  const revShare = inp.minutes <= 5 ? 0.5 : backlog > 60 ? 0.65 : 0.45;
  const nReview = Math.min(backlog, Math.floor((budget * revShare) / SEC.review));
  if (nReview > 0) push({ key: 'review', type: 'review', title: `Review ${nReview} word${nReview > 1 ? 's' : ''}`, why: backlog > nReview ? `${backlog} due — most overdue first` : 'Due now — retrieval strengthens memory', ids: due.slice(0, nReview).map((c) => c.itemId), minutes: 0, skill: 'vocabulary' }, nReview * SEC.review);

  if (today) {
    const d = today.def;
    // 2) New words for today's theme (only the ones not yet introduced)
    // Words from earlier days that a short session never reached come first, so nothing in the plan is silently skipped.
    // (Never from days a placement test let the learner skip: those words are below their level.)
    const firstDay = Math.max(1, Math.min(state.placement?.startDay ?? 1, PROGRAM_LENGTH));
    const carry = days.slice(firstDay - 1, state.programDay - 1).flatMap((x) => x.words).filter((w) => !vocabCards.has(w.id)).slice(0, 12);
    // Sprint (≥45 min): add extra high-frequency words from today's themes, beyond the standard daily quota.
    const claimedAll = new Set(days.flatMap((x) => x.words.map((w) => w.id)));
    const bonus = inp.minutes >= 45 ? dayWords({ ...d, newWords: Math.min(20, Math.floor(inp.minutes / 6)) }, content, claimedAll) : [];
    const fresh = [...new Map([...carry, ...today.words, ...bonus].filter((w) => !vocabCards.has(w.id)).map((w) => [w.id, w])).values()];
    if (fresh.length && left() > 90) {
      const n = Math.max(3, Math.min(fresh.length, Math.floor((left() * 0.3) / SEC.newWord)));
      push({ key: `d${d.day}-words-${fresh[0].id}`, type: 'newvocab', title: `${n} new words: ${d.title}`, why: `Day ${d.day} theme words, tested right after introduction`, ids: fresh.slice(0, n).map((w) => w.id), minutes: 0, skill: 'vocabulary', programDay: d.day, required: true }, n * SEC.newWord);
    }
    // 3) Today's lessons in pedagogical order: input → grammar → output
    const wants: [string, number, () => Block | null][] = [
      ['conv', SEC.conversation, () => today.conv && !isDone(`conv:${today.conv.id}`) ? { key: `conv:${today.conv.id}`, type: 'conversation', title: `Conversation: ${today.conv.title}`, why: 'Produce real sentences from day one', ids: [today.conv.id], minutes: 0, skill: 'conversation', programDay: d.day, required: true } : null],
      ...today.grammar.map((g): [string, number, () => Block | null] => [`g:${g.id}`, SEC.grammar, () => !isDone(`grammar:${g.id}`) ? { key: `grammar:${g.id}`, type: 'grammar', title: `Grammar: ${g.title}`, why: 'Learn the pattern, then use it immediately', ids: [g.id], minutes: 0, skill: 'grammar', programDay: d.day, required: true } : null]),
      ['listen', SEC.listening, () => today.listening && !isDone(`listening:${today.listening.id}`) ? { key: `listening:${today.listening.id}`, type: 'listening', title: `Listening: ${today.listening.title}`, why: 'Comprehensible input', ids: [today.listening.id], minutes: 0, skill: 'listening', programDay: d.day } : null],
      ['read', SEC.reading, () => today.reading && !isDone(`reading:${today.reading.id}`) ? { key: `reading:${today.reading.id}`, type: 'reading', title: `Reading: ${today.reading.title}`, why: 'Comprehensible input', ids: [today.reading.id], minutes: 0, skill: 'reading', programDay: d.day } : null],
      ['pron', SEC.pronunciation, () => today.pron && !isDone(`pron:${today.pron.id}`) ? { key: `pron:${today.pron.id}`, type: 'pronunciation', title: `Pronunciation: ${today.pron.title}`, why: 'Sounds shape listening too', ids: [today.pron.id], minutes: 0, skill: 'speaking', programDay: d.day } : null],
      ['write', SEC.writing, () => today.writing && !isDone(`writing:${today.writing.id}`) ? { key: `writing:${today.writing.id}`, type: 'writing', title: `Writing: ${today.writing.title}`, why: 'Active production', ids: [today.writing.id], minutes: 0, skill: 'writing', programDay: d.day } : null],
    ];
    // Short sessions skip the heavier lessons; the day simply spreads over several sittings.
    for (const [, sec, make] of wants) {
      const b = make(); if (!b) continue;
      if (left() >= sec * 0.85 || (blocks.length === 0 && inp.minutes >= 5)) push(b, Math.min(sec, Math.max(left(), sec * 0.85)));
    }
    // 3b) Sprint mode (≥40 min): lesson-level spaced repetition. Days finished 1, 3, 7 and 14 lessons ago are revisited —
    //     conversations to produce again, listening and reading to re-process — because re-exposure at expanding gaps is what fixes input in memory.
    if (inp.minutes >= 40) {
      const replayDone = (k: string) => (state.lessons[k]?.best ?? 0) >= 0.6;
      for (const gap of [1, 3, 7, 14]) {
        const past = days[state.programDay - 1 - gap]; if (!past) continue;
        const why = `Spaced re-visit of day ${past.def.day} — expanding gaps fix lessons in memory`;
        const reps: [number, Block | null][] = [
          [SEC.conversation, past.conv ? { key: `replay:conv:${past.conv.id}:${d.day}`, type: 'conversation', title: `Replay: ${past.conv.title}`, why, ids: [past.conv.id], minutes: 0, skill: 'conversation' } : null],
          [SEC.listening, past.listening ? { key: `replay:listening:${past.listening.id}:${d.day}`, type: 'listening', title: `Re-listen: ${past.listening.title}`, why, ids: [past.listening.id], minutes: 0, skill: 'listening' } : null],
          [SEC.reading, past.reading ? { key: `replay:reading:${past.reading.id}:${d.day}`, type: 'reading', title: `Re-read: ${past.reading.title}`, why, ids: [past.reading.id], minutes: 0, skill: 'reading' } : null],
        ];
        for (const [sec, b] of reps) if (b && !replayDone(b.key) && left() >= sec * 0.85) push(b, sec);
      }
    }
  } else {
    // Post-programme / skipped: weakness-driven pathway at the learner's level.
    const lvl: Cefr = state.pathLevel;
    const items = pathwayItems(content, lvl);
    const doneKey = (k: string) => (state.lessons[k]?.best ?? 0) >= 0.8;
    const cand: Block[] = [];
    // `items.vocab` is ranked: words AT the learner's level come first, so a B2 learner never starts on "hello" and "goodbye".
    const unseen = items.vocab.filter((v) => !vocabCards.has(v.id));
    const nNew = Math.max(5, Math.min(unseen.length, Math.floor((left() * 0.35) / SEC.newWord), 24));
    const fresh = unseen.slice(0, nNew);
    if (fresh.length) cand.push({ key: `path-words-${fresh[0].id}`, type: 'newvocab', title: `${fresh.length} new ${fresh.every((w) => w.level === lvl) ? lvl + ' ' : ''}words`, why: 'Next most useful unseen vocabulary at your level', ids: fresh.map((w) => w.id), minutes: 0, skill: 'vocabulary' });
    const g = items.grammar.find((x) => !doneKey(`grammar:${x.id}`)); if (g) cand.push({ key: `grammar:${g.id}`, type: 'grammar', title: `Grammar: ${g.title}`, why: weakest === 'grammar' ? 'Your grammar is the weakest skill right now' : 'Next grammar topic', ids: [g.id], minutes: 0, skill: 'grammar' });
    const c = items.conversations.find((x) => !doneKey(`conv:${x.id}`)) ?? items.conversations[0]; if (c) cand.push({ key: `conv:${c.id}`, type: 'conversation', title: `Conversation: ${c.title}`, why: 'Speaking/writing practice', ids: [c.id], minutes: 0, skill: 'conversation' });
    const l = items.listening.find((x) => !doneKey(`listening:${x.id}`)); if (l) cand.push({ key: `listening:${l.id}`, type: 'listening', title: `Listening: ${l.title}`, why: weakest === 'listening' ? 'Weakest skill' : 'Input practice', ids: [l.id], minutes: 0, skill: 'listening' });
    const r = items.reading.find((x) => !doneKey(`reading:${x.id}`)); if (r) cand.push({ key: `reading:${r.id}`, type: 'reading', title: `Reading: ${r.title}`, why: weakest === 'reading' ? 'Weakest skill' : 'Input practice', ids: [r.id], minutes: 0, skill: 'reading' });
    const w = items.writing.find((x) => !doneKey(`writing:${x.id}`)); if (w) cand.push({ key: `writing:${w.id}`, type: 'writing', title: `Writing: ${w.title}`, why: weakest === 'writing' ? 'Weakest skill' : 'Output practice', ids: [w.id], minutes: 0, skill: 'writing' });
    const p = items.pron.find((x) => !doneKey(`pron:${x.id}`)); if (p) cand.push({ key: `pron:${p.id}`, type: 'pronunciation', title: `Pronunciation: ${p.title}`, why: 'Sound practice', ids: [p.id], minutes: 0, skill: 'speaking' });
    // Weakest skill first, then rotate so sessions differ day to day (seeded by date).
    const dayIdx = Math.floor(now / 86_400_000);
    const order = (b: Block) => (b.skill === weakest ? -10 : 0) + ((hash(b.key) + dayIdx) % 7);
    cand.sort((a, b) => order(a) - order(b));
    const secOf = (b: Block) => b.type === 'newvocab' ? b.ids.length * SEC.newWord : b.type === 'grammar' ? SEC.grammar : b.type === 'conversation' ? SEC.conversation : b.type === 'listening' ? SEC.listening : b.type === 'reading' ? SEC.reading : b.type === 'writing' ? SEC.writing : SEC.pronunciation;
    // New words are the heart of a pathway session, so they get their slot first; the other blocks then fill whatever time is left.
    cand.sort((a, b) => (a.type === 'newvocab' ? -1 : 0) - (b.type === 'newvocab' ? -1 : 0));
    for (const b of cand) { const s = secOf(b); if (left() >= s * 0.85) push(b, s); }
  }

  // 4) Fill leftover time with extra review (even if not due) so the budget is honoured.
  if (left() >= 60 && due.length > nReview) {
    const extra = Math.min(due.length - nReview, Math.floor(left() / SEC.review));
    if (extra > 0) push({ key: 'review2', type: 'review', title: `${extra} more due word${extra > 1 ? 's' : ''}`, why: 'Using the rest of your time on due reviews', ids: due.slice(nReview, nReview + extra).map((c) => c.itemId), minutes: 0, skill: 'vocabulary' }, extra * SEC.review);
  }
  // Sprint: spend spare minutes on extra retrieval of the words closest to being forgotten (reviewing slightly early still strengthens memory).
  if (inp.minutes >= 40 && left() >= 120) {
    const taken = new Set(blocks.filter((b) => b.type === 'review').flatMap((b) => b.ids));
    const early = cards.filter((c) => c.kind === 'vocab' && !taken.has(c.itemId)).sort((a, b) => a.due - b.due).slice(0, Math.min(40, Math.floor(left() / SEC.review)));
    if (early.length >= 5) push({ key: 'review-extra', type: 'review', title: `Extra retrieval: ${early.length} words`, why: 'Sprint mode: more retrieval practice on the words nearest to being forgotten', ids: early.map((c) => c.itemId), minutes: 0, skill: 'vocabulary' }, early.length * SEC.review);
  }
  if (!blocks.length) { // nothing due, nothing planned: guarantee something useful
    const learned = [...vocabCards.values()].sort((a, b) => a.due - b.due).slice(0, Math.max(5, Math.floor(budget / SEC.review)));
    if (learned.length) push({ key: 'review-early', type: 'review', title: 'Early review (nothing due)', why: 'Reviewing slightly early still helps, but nothing is overdue', ids: learned.map((c) => c.itemId), minutes: 0, skill: 'vocabulary' }, learned.length * SEC.review);
  }
  const focus = today ? `Day ${today.def.day}: ${today.def.title}` : weakest ? `Strengthening ${weakest}` : 'Balanced practice';
  return { blocks, minutes: Math.round(used / 60), day: today?.def.day ?? null, focus, dueTotal: backlog };
}

const hash = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };

/** A programme day is complete once every *required* block is done (words introduced + conversation + grammar). */
export function dayComplete(state: LangState, content: LanguageContent, day: number): boolean {
  const dc = resolveProgram(content)[day - 1]; if (!dc) return false;
  const prog = state.dayProgress[day] ?? [];
  const need: string[] = [];
  if (dc.words.length) need.push('words');
  if (dc.conv) need.push(`conv:${dc.conv.id}`);
  dc.grammar.forEach((g) => need.push(`grammar:${g.id}`));
  return need.every((k) => prog.includes(k));
}
