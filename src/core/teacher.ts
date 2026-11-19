// The Teacher's voice: short, specific, kind. Pure functions so the wording is testable and easy to edit.
import type { LangState } from './types';
import type { Stats } from './analytics';
import type { NextStep } from './guide';

export const TEACHER = { name: 'Teacher Lina' };
export type Mood = 'wave' | 'happy' | 'think' | 'cheer';
export interface Tip { id: string; mood: Mood; title?: string; text: string; action?: { label: string; to: string } }
export interface TipCtx {
  path: string; name: string; langName: string; state: LangState; stats: Stats | null; due: number; next: NextStep;
  todayMin: number; hour: number; today: string; programme: boolean; newcomer: boolean;
}

export const TOUR: { title: string; text: string }[] = [
  { title: 'Welcome!', text: "I'm your Teacher. I'll pop up with tips, reminders and advice as you go. Tap me whenever you want a hint." },
  { title: 'One clear next step', text: 'The big button on Home always points to the best thing to do right now. Follow it and you can\'t go wrong.' },
  { title: 'Your Path', text: 'Path shows your whole plan, day by day, with what you\'ll be able to do at the end of each one.' },
  { title: 'Practice any time', text: 'Want extra work on one skill? Practice has vocabulary, grammar, conversation, listening, reading, writing and pronunciation.' },
];

export function tipsFor(c: TipCtx): Tip[] {
  const out: Tip[] = []; const n = c.name; const goal = c.state.dailyMinutes; const streak = c.state.streak.current;
  const add = (t: Tip) => out.push(t);
  switch (c.path) {
    case '/':
      if (c.newcomer) add({ id: 'tour-v1', mood: 'wave', title: `Welcome, ${n}!`, text: TOUR[0].text });
      if (c.next.kind === 'assessment') add({ id: 'prog-done', mood: 'cheer', title: '30 days complete!', text: 'That is real commitment. The final assessment will show what stuck and what to polish.', action: { label: 'Take the assessment', to: '/assessment' } });
      if (c.due > 40) add({ id: `backlog-${c.today}`, mood: 'think', title: 'Big review pile', text: `${c.due} words are waiting. No stress: do a few every day, oldest first. Short and regular beats one huge catch-up.`, action: { label: 'Start reviewing', to: '/daily' } });
      else if (c.due > 0 && c.todayMin < 1) add({ id: `due-${c.today}`, mood: 'happy', title: 'Reviews are ready', text: `${c.due} word${c.due === 1 ? ' is' : 's are'} due. Reviewing just before you'd forget is the most efficient thing you can do, so we start there.`, action: { label: "Start today's session", to: '/daily' } });
      if (c.hour >= 17 && c.todayMin < 1 && streak > 0) add({ id: `streak-${c.today}`, mood: 'think', title: `Keep your ${streak}-day streak`, text: 'Even 5 focused minutes counts. Small and daily beats big and rare.', action: { label: 'Quick 5 minutes', to: '/daily?m=5' } });
      if (c.todayMin >= goal) add({ id: `goal-${c.today}`, mood: 'cheer', title: 'Goal reached!', text: `${Math.round(c.todayMin)} minutes today. Memory consolidates while you rest, so anything extra is a bonus, not a must.` });
      add({ id: 'home-1', mood: 'happy', text: 'Follow the big card at the top. It always shows the single best next step for you.' });
      break;
    case '/path': add({ id: 'path-1', mood: 'happy', text: c.programme ? 'This is your roadmap. The highlighted day is today. Finish its required steps and the next day unlocks.' : 'This is your pathway by level. Finish the lessons at your level and the next level opens up.' }); break;
    case '/daily':
      add({ id: 'daily-1', mood: 'happy', text: 'A session is a short chain of steps in a deliberate order: recall first, then new material, then use it. Just follow the list.' });
      add({ id: 'daily-2', mood: 'think', text: "Say answers out loud, even when the app doesn't ask. Producing language strengthens memory more than just recognising it." });
      break;
    case '/vocabulary':
      if (c.due > 0) add({ id: `vocab-due-${c.today}`, mood: 'happy', text: `You have ${c.due} due. Open the Review tab to clear them.` });
      add({ id: 'vocab-1', mood: 'think', title: 'How words stick', text: 'A word isn\'t learned from one right answer. It climbs: seen, recognised, recalled, retained, mastered. Reviews keep it climbing.' });
      break;
    case '/grammar': add({ id: 'grammar-1', mood: 'happy', text: "Read the pattern, study the examples, then take the check. Under 80%? Read 'common mistakes' and try again tomorrow." }); break;
    case '/conversations': add({ id: 'conv-1', mood: 'happy', text: "Start Guided (pick the reply), then Semi-open (type with hints), then Open. I've pre-selected the mode that suits you now." }); add({ id: 'conv-2', mood: 'think', text: 'Open mode checks key words, not grammar. Always compare your answer with the model reply.' }); break;
    case '/listening': add({ id: 'listen-1', mood: 'happy', text: "Listen first without reading. Replay, then check the transcript. The voice is computer speech, so focus on meaning, not accent." }); break;
    case '/reading': add({ id: 'read-1', mood: 'happy', text: 'Read once for the gist, then answer the questions. Only then use the glossary. Resist translating word by word.' }); break;
    case '/writing': add({ id: 'write-1', mood: 'happy', text: 'Short is fine. Use the checklist as your target, then compare with the model answer and steal one phrase.' }); break;
    case '/pronunciation': add({ id: 'pron-1', mood: 'happy', text: 'Listen, repeat out loud, record yourself and compare. Minimal pairs train your ear as much as your mouth.' }); break;
    case '/cheats': add({ id: 'cheats-1', mood: 'happy', text: 'Quick reference, searchable and available offline. Great for looking things up, but it does not replace practice.' }); break;
    case '/progress': add({ id: 'progress-1', mood: 'happy', text: "These numbers come from your real answers only. Check 'Focus', since your daily session already leans toward it." }); add({ id: 'progress-2', mood: 'think', text: 'Take two minutes for the weekly review at the bottom. Reflecting on what was hard really does help.' }); break;
    case '/achievements': add({ id: 'ach-1', mood: 'cheer', text: 'Badges reward mastery and consistency. Pick one that is almost done and aim for it.' }); break;
    case '/languages': add({ id: 'lang-1', mood: 'think', text: 'Each language keeps separate progress. One at a time works best. Add another when the first feels comfortable.' }); break;
    case '/settings': add({ id: 'settings-1', mood: 'happy', text: 'Tune your daily goal, speech speed and immersion here. If I\'m too chatty, you can quiet me in the Teacher section.' }); break;
    case '/assessment': add({ id: 'assess-1', mood: 'happy', text: 'This is a check-up, not an exam. An honest score tells us exactly what to review.' }); break;
  }
  return out;
}

/** The Teacher's reaction to a finished session or lesson. */
export function reviewComment(score: number, kind: 'session' | 'lesson' = 'lesson'): { mood: Mood; title: string; text: string } {
  const unit = kind === 'session' ? 'session' : 'lesson';
  if (score >= 0.9) return { mood: 'cheer', title: 'Excellent!', text: `That ${unit} was nearly flawless. Your next reviews will space these words further out, which is how they become long-term memories.` };
  if (score >= 0.75) return { mood: 'happy', title: 'Solid work', text: `Good accuracy. The few you missed will return in your reviews at just the right moment, so you don't need to worry about them.` };
  if (score >= 0.5) return { mood: 'think', title: 'Good effort', text: `You're in the productive zone: challenging, but not too hard. Mistakes are information. Try the ${unit} again tomorrow and watch the score climb.` };
  return { mood: 'think', title: "That was a tough one, and that's okay", text: `Struggling is exactly where learning happens. Don't repeat it right now. Sleep, then try again tomorrow. It will feel easier.` };
}
