// App state: profile + cards + events held in memory, persisted to IndexedDB on every change.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Card, Cefr, EventRec, Grade, LangCode, LangState, LanguageContent, Mode, PlacementResult, Profile, Settings, Skill, AvatarConfig } from '../core/types';
import { addEvent, exportBackup, importBackup, loadCards, loadEvents, loadProfile, requestPersistence, saveCard, saveProfile, wipeAll, SCHEMA_VERSION } from '../core/storage';
import { dayKey, newCard, review } from '../core/fsrs';
import { loadContent, getLang } from '../content/registry';
import { computeStats, tierFor, type Stats } from '../core/analytics';
import { ACHIEVEMENTS, newlyEarned, type Ach } from '../core/achievements';
import { applyCompletion } from '../core/progression';
import { PROGRAM_LENGTH } from '../core/program';

export const DEFAULT_SETTINGS: Settings = { mode: 'system', accent: 'teal', ttsRate: 0.9, reminders: false, reminderTime: '19:00', showRomanization: true, reducedMotion: false, largeText: false };
export const DEFAULT_AVATAR: AvatarConfig = { skin: 1, hair: 0, hairColor: 1, eyes: 0, mouth: 0, accessory: 0, outfit: 0, bg: 0 };

export const newLangState = (code: LangCode, dailyMinutes: number, placement?: PlacementResult): LangState => ({
  code, startedAt: Date.now(), dailyMinutes, placement,
  programDay: placement?.skipProgram ? PROGRAM_LENGTH + 1 : Math.max(1, Math.min(PROGRAM_LENGTH, placement?.startDay ?? 1)),
  programDone: {}, dayProgress: {}, xp: 0, streak: { current: 0, best: 0, lastDay: '' }, studyMs: {},
  immersion: 0, immersionAuto: true, lessons: {}, weeklyReviews: {}, pathLevel: placement?.skipProgram ? placement.overall : 'A1',
});

export function suggestImmersion(level: Cefr, programDay: number): number {
  if (level === 'A1') return programDay < 10 ? 0 : 1;
  return { A2: 2, B1: 3, B2: 4, C1: 5, C2: 5 }[level] ?? 1;
}

export interface ReviewResult { grade: Grade; correct: boolean; mode: Mode; ms: number; skill?: Skill }
interface Toast { id: number; title: string; body?: string }

export interface Store {
  ready: boolean; profile: Profile | null; lang: LangCode | null; state: LangState | null;
  content: LanguageContent | null; contents: Record<string, LanguageContent>;
  cards: Card[]; cardMap: Map<string, Card>; events: EventRec[]; stats: Stats | null; toasts: Toast[]; persisted: boolean;
  createProfile: (p: { username: string; avatar: AvatarConfig; langs: { code: LangCode; minutes: number; placement?: PlacementResult }[] }) => Promise<void>;
  addLanguage: (code: LangCode, minutes: number, placement?: PlacementResult) => Promise<void>;
  setActiveLang: (c: LangCode) => void;
  patchLang: (code: LangCode, fn: (s: LangState) => LangState) => void;
  patchProfile: (fn: (p: Profile) => Profile) => void;
  updateSettings: (s: Partial<Settings>) => void;
  reviewCard: (itemId: string, r: ReviewResult, kind?: Card['kind']) => void;
  logEvent: (e: Omit<EventRec, 'ts' | 'lang'> & { lang?: string }) => void;
  recordStudy: (ms: number) => void;
  completeBlock: (key: string, score: number, programDay?: number) => void;
  evaluate: () => void;
  dismissToast: (id: number) => void;
  doExport: () => Promise<void>; doImport: (text: string) => Promise<void>; doWipe: () => Promise<void>;
  refreshAchievementsFor: () => void;
}
const Ctx = createContext<Store | null>(null);
export const useStore = () => { const s = useContext(Ctx); if (!s) throw new Error('Store missing'); return s; };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfileS] = useState<Profile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [events, setEvents] = useState<EventRec[]>([]);
  const [contents, setContents] = useState<Record<string, LanguageContent>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [persisted, setPersisted] = useState(false);
  const profRef = useRef<Profile | null>(null); profRef.current = profile;
  const cardsRef = useRef<Card[]>([]); cardsRef.current = cards;
  const eventsRef = useRef<EventRec[]>([]); eventsRef.current = events;
  const contentsRef = useRef<Record<string, LanguageContent>>({}); contentsRef.current = contents;
  const toastId = useRef(1);

  const toast = useCallback((title: string, body?: string) => {
    const id = toastId.current++; setToasts((t) => [...t, { id, title, body }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5200);
  }, []);

  const setProfile = useCallback((p: Profile) => { profRef.current = p; setProfileS(p); void saveProfile(p); }, []);

  // initial load
  useEffect(() => { (async () => {
    try {
      const p = await loadProfile(); const cs = await loadCards(); const ev = await loadEvents();
      setCards(cs); setEvents(ev); if (p) { setProfileS(p); profRef.current = p; }
      setPersisted(await requestPersistence());
    } catch (e) { console.error(e); }
    setReady(true);
  })(); }, []);

  // load content for every language the user has started
  const codes = profile ? Object.keys(profile.languages).join(',') : '';
  useEffect(() => { (async () => {
    if (!codes) return;
    const out: Record<string, LanguageContent> = { ...contentsRef.current };
    for (const c of codes.split(',')) if (!out[c]) { try { out[c] = await loadContent(c); } catch (e) { console.error(e); } }
    setContents(out);
  })(); }, [codes]);

  // theme + accent
  useEffect(() => {
    const s = profile?.settings ?? DEFAULT_SETTINGS; const root = document.documentElement;
    const apply = () => { const dark = s.mode === 'dark' || (s.mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); root.dataset.theme = dark ? 'dark' : 'light'; };
    apply(); root.dataset.large = s.largeText ? '1' : '0'; root.dataset.motion = s.reducedMotion ? '0' : '1';
    import('../core/cosmetics').then(({ ACCENTS }) => { const a = ACCENTS.find((x) => x.id === s.accent) ?? ACCENTS[0]; root.style.setProperty('--accent', a.hex); });
    const mq = matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener('change', apply); return () => mq.removeEventListener('change', apply);
  }, [profile?.settings]);

  const lang = profile?.activeLang ?? null;
  const state = profile && lang ? profile.languages[lang] ?? null : null;
  const content = lang ? contents[lang] ?? null : null;
  const cardMap = useMemo(() => new Map(cards.map((c) => [c.key, c])), [cards]);
  const langCards = useMemo(() => cards.filter((c) => c.lang === lang), [cards, lang]);
  const langEvents = useMemo(() => events.filter((e) => e.lang === lang), [events, lang]);
  const stats = useMemo(() => (state && content ? computeStats(state, content, langCards, langEvents) : null), [state, content, langCards, langEvents]);

  const patchProfile = useCallback((fn: (p: Profile) => Profile) => { if (profRef.current) setProfile(fn(profRef.current)); }, [setProfile]);
  const patchLang = useCallback((code: LangCode, fn: (s: LangState) => LangState) => patchProfile((p) => (p.languages[code] ? { ...p, languages: { ...p.languages, [code]: fn(p.languages[code]) } } : p)), [patchProfile]);

  const createProfile: Store['createProfile'] = useCallback(async ({ username, avatar, langs }) => {
    const languages: Record<string, LangState> = {}; langs.forEach((l) => { languages[l.code] = newLangState(l.code, l.minutes, l.placement); });
    const p: Profile = { schema: SCHEMA_VERSION, id: crypto.randomUUID?.() ?? String(Date.now()), username, avatar, createdAt: Date.now(), activeLang: langs[0]?.code ?? null, languages, achievements: {}, settings: DEFAULT_SETTINGS, unlockedCosmetics: [] };
    setProfile(p);
  }, [setProfile]);
  const addLanguage: Store['addLanguage'] = useCallback(async (code, minutes, placement) => {
    patchProfile((p) => ({ ...p, activeLang: code, languages: { ...p.languages, [code]: p.languages[code] ?? newLangState(code, minutes, placement) } }));
  }, [patchProfile]);
  const setActiveLang = useCallback((c: LangCode) => patchProfile((p) => (p.languages[c] ? { ...p, activeLang: c } : p)), [patchProfile]);
  const updateSettings = useCallback((s: Partial<Settings>) => patchProfile((p) => ({ ...p, settings: { ...p.settings, ...s } })), [patchProfile]);

  const logEvent: Store['logEvent'] = useCallback((e) => {
    const l = e.lang ?? profRef.current?.activeLang; if (!l) return;
    const rec: EventRec = { ...e, lang: l, ts: Date.now() } as EventRec;
    setEvents((prev) => [...prev, rec]); void addEvent(rec);
  }, []);

  const reviewCard: Store['reviewCard'] = useCallback((itemId, r, kind = 'vocab') => {
    const l = profRef.current?.activeLang; if (!l) return; const now = Date.now(); const key = `${l}:${itemId}`;
    const existing = cardsRef.current.find((c) => c.key === key) ?? newCard(l, itemId, kind, now);
    let next = review(existing, r.grade, now);
    const m = next.modes[r.mode] ?? { ok: 0, fail: 0 };
    next = { ...next, modes: { ...next.modes, [r.mode]: { ok: m.ok + (r.correct ? 1 : 0), fail: m.fail + (r.correct ? 0 : 1) } } };
    setCards((prev) => (prev.some((c) => c.key === key) ? prev.map((c) => (c.key === key ? next : c)) : [...prev, next]));
    void saveCard(next);
    logEvent({ type: 'review', skill: r.skill ?? 'vocabulary', itemId, correct: r.correct, ms: r.ms, meta: r.mode });
  }, [logEvent]);

  const recordStudy = useCallback((ms: number) => {
    const l = profRef.current?.activeLang; if (!l || ms <= 0) return; const k = dayKey(Date.now());
    patchLang(l, (s) => {
      const studyMs = { ...s.studyMs, [k]: (s.studyMs[k] ?? 0) + ms };
      let streak = s.streak;
      if (studyMs[k] >= 60_000 && streak.lastDay !== k) {
        const y = dayKey(Date.now() - 86_400_000);
        const cur = streak.lastDay === y ? streak.current + 1 : 1;
        streak = { current: cur, best: Math.max(streak.best, cur), lastDay: k };
      }
      return { ...s, studyMs, streak };
    });
  }, [patchLang]);

  const evaluate = useCallback(() => {
    const p = profRef.current; if (!p) return;
    const stat = (code: string) => { const c = contentsRef.current[code]; const s = p.languages[code]; return c && s ? computeStats(s, c, cardsRef.current.filter((x) => x.lang === code), eventsRef.current.filter((x) => x.lang === code)) : null; };
    const allStats = Object.keys(p.languages).map((code) => ({ lang: code, stats: stat(code) as Stats })).filter((x) => x.stats);
    const code = p.activeLang; if (!code) return; const st = p.languages[code]; const here = allStats.find((x) => x.lang === code)?.stats; if (!here) return;
    const openConvs = eventsRef.current.filter((e) => e.lang === code && e.type === 'conversation' && e.meta === 'open' && (e.score ?? 0) >= 0.7).length;
    const earned: Ach[] = newlyEarned({ profile: p, lang: code, state: st, stats: here, allStats, openConvs });
    let next = p;
    if (earned.length) {
      const ach = { ...p.achievements }; earned.forEach((a) => { ach[a.id] = Date.now(); });
      next = { ...next, achievements: ach, languages: { ...next.languages, [code]: { ...st, xp: st.xp + earned.reduce((n, a) => n + a.xp, 0) } } };
      earned.forEach((a) => toast(`Achievement: ${a.title}`, `${a.desc} (+${a.xp} XP)`));
    }
    const before = tierFor(computeStats(st, contentsRef.current[code], cardsRef.current.filter((x) => x.lang === code), eventsRef.current.filter((x) => x.lang === code)).masteryPoints).index;
    void before;
    // auto immersion follows the estimated level (never jumps more than the learner's evidence supports)
    const cur = next.languages[code];
    if (cur.immersionAuto) { const want = suggestImmersion(here.estimate.level, cur.programDay); if (want !== cur.immersion) next = { ...next, languages: { ...next.languages, [code]: { ...cur, immersion: want } } }; }
    if (next !== p) setProfile(next);
  }, [setProfile, toast]);

  const completeBlock: Store['completeBlock'] = useCallback((key, score, programDay) => {
    const l = profRef.current?.activeLang; const c = l ? contentsRef.current[l] : null; if (!l || !c) return;
    let completed: number | null = null;
    patchLang(l, (s) => { const r = applyCompletion(s, c, key, score, programDay); completed = r.dayCompleted; return r.state; });
    if (completed !== null) toast(`Day ${completed} complete`, completed >= PROGRAM_LENGTH ? 'Programme finished — take the final assessment from the dashboard.' : `Day ${completed + 1} is unlocked.`);
    setTimeout(evaluate, 50);
  }, [patchLang, evaluate, toast]);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const doExport = useCallback(async () => {
    const b = await exportBackup(); const blob = new Blob([JSON.stringify(b)], { type: 'application/json' }); const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `lingua-backup-${dayKey(Date.now())}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    patchProfile((p) => ({ ...p, lastBackup: Date.now() }));
  }, [patchProfile]);
  const doImport = useCallback(async (text: string) => {
    const b = JSON.parse(text); const p = await importBackup(b);
    setProfileS(p); profRef.current = p; setCards(await loadCards()); setEvents(await loadEvents());
  }, []);
  const doWipe = useCallback(async () => { await wipeAll(); setProfileS(null); profRef.current = null; setCards([]); setEvents([]); }, []);

  const value: Store = {
    ready, profile, lang, state, content, contents, cards: langCards, cardMap, events: langEvents, stats, toasts, persisted,
    createProfile, addLanguage, setActiveLang, patchLang, patchProfile, updateSettings, reviewCard, logEvent, recordStudy, completeBlock, evaluate, dismissToast,
    doExport, doImport, doWipe, refreshAchievementsFor: evaluate,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const langConfig = (code: string | null) => (code ? getLang(code) : undefined);
export { ACHIEVEMENTS };
