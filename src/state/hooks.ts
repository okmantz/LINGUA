import { useEffect, useMemo, useRef } from 'react';
import { useStore, langConfig } from './store';
import { mulberry32 } from '../core/text';

export interface Flags { translations: 'always' | 'tap' | 'after' | 'never'; targetUI: boolean; hideRoman: boolean; hideHints: boolean }
export const immersionFlags = (level: number): Flags => ({
  translations: level <= 0 ? 'always' : level <= 2 ? 'tap' : level === 3 ? 'after' : 'never',
  targetUI: level >= 2, hideRoman: level >= 5, hideHints: level >= 4,
});
export const IMMERSION_LABELS = [
  'Level 0 — Guided: translations always visible.',
  'Level 1 — Supported: translations on tap, English interface.',
  'Level 2 — Mixed: exercise controls in the target language, translations on tap.',
  'Level 3 — Natural: translations only after you answer, target-language controls.',
  'Level 4 — Near-native: no translations or hints, natural-speed audio.',
  'Level 5 — Full immersion: no pronunciation respelling, no English support.',
];

export function useCtx() {
  const store = useStore(); const { lang, content, state, profile } = store;
  const cfg = langConfig(lang)!;
  const flags = immersionFlags(state?.immersion ?? 0);
  const baseUI = { choose: 'Choose the correct answer', check: 'Check', next: 'Continue', correct: 'Correct!', wrong: 'Not quite', listen: 'Listen', translate: 'Translate', fill: 'Fill in the blank', order: 'Put the words in order', answer: 'Your answer', well: 'Well done!', again: 'Try again', read: 'Read the text', speak: 'Speak' };
  const ui = flags.targetUI && content ? content.ui : baseUI;
  const rate = (state?.immersion ?? 0) >= 4 ? 1 : profile?.settings.ttsRate ?? 0.9;
  const rnd = useMemo(() => mulberry32(Date.now() & 0xffffffff), []);
  return { store, cfg, content: content!, state: state!, ui, flags, rate, rnd, baseUI };
}

/** Counts active study time (ignores idle > 60 s and background tabs) and records it once on stop/unmount. */
export function useStudyClock() {
  const { recordStudy } = useStore();
  const acc = useRef(0); const last = useRef(Date.now()); const active = useRef(Date.now()); const stopped = useRef(false);
  useEffect(() => {
    const bump = () => { active.current = Date.now(); };
    const tick = setInterval(() => { const now = Date.now(); if (!document.hidden && now - active.current < 60_000) acc.current += now - last.current; last.current = now; }, 1000);
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((e) => window.addEventListener(e, bump, { passive: true }));
    return () => { clearInterval(tick); ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((e) => window.removeEventListener(e, bump)); if (!stopped.current && acc.current > 3000) recordStudy(acc.current); stopped.current = true; };
    // eslint-disable-next-line
  }, []);
  return () => { if (!stopped.current && acc.current > 0) { recordStudy(acc.current); } acc.current = 0; };
}
