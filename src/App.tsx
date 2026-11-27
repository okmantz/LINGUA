import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './state/store';
import { useGuide } from './state/hooks';
import { LANGUAGES, getLang } from './content/registry';
import { Avatar, TeacherAvatar } from './components/Avatar';
import { Logo, LogoMark } from './components/Logo';
import { Icon, type IconName } from './components/Icon';
import { TeacherDock } from './components/Teacher';
import { dayKey } from './core/fsrs';
import { SKILL_ROUTE, currentLevel } from './core/guide';
import { applyUpdate, useUpdateReady } from './core/update';
import { TIERS } from './core/analytics';
import { Btn, cx, LEVEL_NAME, LevelBadge, Sheet, Skeleton } from './components/ui';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

const Daily = lazy(() => import('./pages/Daily'));
const Path = lazy(() => import('./pages/Path'));
const Languages = lazy(() => import('./pages/Languages'));
const Vocabulary = lazy(() => import('./pages/Vocabulary'));
const Library = lazy(() => import('./pages/Library'));
const Cheats = lazy(() => import('./pages/Cheats'));
const Progress = lazy(() => import('./pages/Progress'));
const Achievements = lazy(() => import('./pages/Achievements'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const Assessment = lazy(() => import('./pages/Assessment'));

interface Item { to: string; label: string; icon: IconName; hint?: string }
const I = (to: string, label: string, icon: IconName, hint?: string): Item => ({ to, label, icon, hint });
// Sidebar structure: where to be today, then skills grouped by what they do (take language in / use it), then tracking and tools.
const GROUPS: { label: string; items: Item[] }[] = [
  { label: 'Today', items: [I('/', 'Home', 'home', 'Your next step'), I('/daily', "Today's Session", 'bolt', 'Short guided practice'), I('/path', 'Your Path', 'path', 'The plan, day by day')] },
  { label: 'Take it in', items: [I('/vocabulary', 'Vocabulary', 'cards', 'Words & reviews'), I('/grammar', 'Grammar', 'puzzle', 'Patterns that matter'), I('/reading', 'Reading', 'book', 'Short graded texts'), I('/listening', 'Listening', 'headphones', 'Train your ear')] },
  { label: 'Use it', items: [I('/conversations', 'Conversations', 'chat', 'Say real sentences'), I('/pronunciation', 'Pronunciation', 'mic', 'Speak and compare'), I('/writing', 'Writing', 'pen', 'Write with a checklist')] },
  { label: 'Track & tools', items: [I('/progress', 'Progress', 'chart', 'How you are doing'), I('/achievements', 'Achievements', 'trophy', 'Badges to aim for'), I('/cheats', 'Cheat Sheets', 'sheet', 'Quick reference')] },
];
/** Sign languages have no sound: the skills that depend on it are renamed rather than hidden. */
const groupsFor = (lang?: string | null) => {
  if (!LANGUAGES.find((l) => l.code === lang)?.sign) return GROUPS;
  const map: Record<string, [string, string]> = { Listening: ['Watching', 'Follow signed dialogue'], Pronunciation: ['Handshapes', 'Learn the building blocks'] };
  return GROUPS.map((g) => ({ ...g, items: g.items.map((it) => (map[it.label] ? { ...it, label: map[it.label][0], hint: map[it.label][1] } : it)) }));
};
const SKILL_ITEMS = [...GROUPS[1].items, ...GROUPS[2].items];
const SKILL_PATHS = SKILL_ITEMS.map((p) => p.to);
const MORE: Item[] = [I('/progress', 'Progress', 'chart'), I('/achievements', 'Achievements', 'trophy'), I('/cheats', 'Cheat Sheets', 'sheet'), I('/languages', 'My Languages', 'globe'), I('/settings', 'Profile & Settings', 'sliders')];

function useReminders() {
  const { profile, state } = useStore();
  useEffect(() => {
    if (!profile?.settings.reminders || typeof Notification === 'undefined') return;
    const id = setInterval(() => {
      if (Notification.permission !== 'granted') return; const now = new Date(); const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const key = `lingua-reminded-${dayKey(Date.now())}`; if (hm < profile.settings.reminderTime || localStorage.getItem(key)) return;
      const studied = Object.values(profile.languages).some((l) => (l.studyMs[dayKey(Date.now())] ?? 0) > 60_000);
      localStorage.setItem(key, '1'); if (!studied) new Notification('LINGUA', { body: `Your ${state?.dailyMinutes ?? 10}-minute session is ready. Reviews are due!`, icon: 'icon.svg' });
    }, 60_000);
    return () => clearInterval(id);
  }, [profile, state?.dailyMinutes]);
}

function LangSelect({ compact = false }: { compact?: boolean }) {
  const { profile, lang, setActiveLang } = useStore(); const p = profile!; const codes = Object.keys(p.languages);
  const find = (c: string) => LANGUAGES.find((l) => l.code === c);
  const label = (c: string) => find(c)?.endonym ?? c;
  const cur = lang ?? codes[0];
  if (compact && codes.length < 2) return <span className="hidden h-9 items-center gap-1.5 rounded-full bg-surface2 px-3 text-sm font-semibold sm:inline-flex"><Icon name="globe" size={15} className="text-accent-strong" />{label(cur)}</span>;
  if (compact) return (
    <label className="relative inline-flex h-9 items-center gap-1.5 rounded-full bg-surface2 pl-3 pr-2 text-sm font-semibold">
      <span className="sr-only">Active language</span><Icon name="globe" size={15} className="shrink-0 text-accent-strong" />
      <select value={cur} onChange={(e) => setActiveLang(e.target.value)} className="max-w-28 appearance-none truncate bg-transparent pr-5 outline-none">{codes.map((c) => <option key={c} value={c}>{label(c)}</option>)}</select>
      <Icon name="down" size={13} className="pointer-events-none absolute right-2.5 text-muted" />
    </label>
  );
  return (
    <label className="group relative flex h-12 w-full items-center gap-2.5 rounded-2xl border border-line bg-surface2/60 pl-2.5 pr-3 transition hover:border-line-strong hover:bg-surface2">
      <span className="sr-only">Active language</span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-strong"><Icon name="globe" size={17} /></span>
      <span className="min-w-0 flex-1 leading-tight"><span className="block text-[10px] font-semibold uppercase tracking-wider text-muted">Learning</span><span className="block truncate text-[0.95rem] font-bold">{label(cur)}</span></span>
      {p.languages[cur] && <LevelBadge level={currentLevel(p.languages[cur])} size="sm" />}
      <Icon name="down" size={16} className="shrink-0 text-muted" />
      <select value={cur} onChange={(e) => setActiveLang(e.target.value)} aria-label="Active language" className="absolute inset-0 cursor-pointer opacity-0">{codes.map((c) => <option key={c} value={c}>{label(c)}{find(c)?.name !== label(c) ? ` · ${find(c)?.name}` : ''}</option>)}</select>
    </label>
  );
}

function NavItem({ n, badge, tag, onClick }: { n: Item; badge?: number; tag?: string; onClick?: () => void }) {
  return (
    <NavLink to={n.to} end={n.to === '/'} onClick={onClick} className={({ isActive }) => cx('group relative flex min-h-9 items-center gap-3 rounded-xl px-3 py-1 text-[0.9rem] transition', isActive ? 'bg-accent/12 font-semibold text-ink' : 'font-medium text-muted hover:bg-surface2 hover:text-ink')}>
      {({ isActive }) => <>
        {isActive && <span className="absolute -left-3.5 bottom-2 top-2 w-1 rounded-r-full bg-accent" aria-hidden />}
        <Icon name={n.icon} size={19} className={cx('shrink-0 transition', isActive ? 'text-accent-strong' : 'text-faint group-hover:text-muted')} />
        <span className="flex-1 truncate">{n.label}</span>
        {tag && !isActive && <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-strong">{tag}</span>}
        {!!badge && <span className="tabular grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-accent-ink">{badge > 99 ? '99+' : badge}</span>}
      </>}
    </NavLink>
  );
}

function Sidebar() {
  const { store, next, due, weakest } = useGuide(); const p = store.profile!; const focusTo = weakest ? SKILL_ROUTE[weakest].to : null; const s = store.state!; const tier = store.stats?.tier;
  const nextTier = tier ? TIERS[tier.index] : TIERS[0];
  return (
    <aside className="sticky top-0 hidden h-dvh w-[280px] shrink-0 flex-col border-r border-line bg-surface lg:flex">
      <div className="px-5 pb-3 pt-5"><Link to="/" aria-label="LINGUA home"><Logo tagline /></Link></div>
      <div className="space-y-2 px-3.5 pb-2">
        <div className="flex items-center gap-2"><div className="min-w-0 flex-1"><LangSelect /></div><Link to="/languages" aria-label="Add or manage languages" title="Add or manage languages" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface2/60 text-muted transition hover:border-line-strong hover:bg-surface2 hover:text-ink"><Icon name="plus" size={19} /></Link></div>
        <Link to={next.to} className="hero group flex items-center gap-3 !rounded-2xl px-3.5 py-3 transition hover:brightness-110">
          <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/65">Next up{next.minutes ? ` · ${next.minutes} min` : ''}</p><p className="mt-0.5 truncate text-[0.92rem] font-bold leading-snug">{next.title}</p></div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25"><Icon name="arrow" size={16} className="transition group-hover:translate-x-0.5" /></span>
        </Link>
      </div>
      <nav aria-label="Main" className="flex-1 space-y-3.5 overflow-y-auto px-3.5 py-2">
        {groupsFor(store.lang).map((g) => (
          <div key={g.label}><p className="eyebrow mb-1 px-3">{g.label}</p>
            <div>{g.items.map((n) => <NavItem key={n.to} n={n} badge={n.to === '/vocabulary' ? due : undefined} tag={n.to === focusTo && n.to !== '/vocabulary' ? 'Focus' : undefined} />)}</div></div>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <Link to="/settings" className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-surface2">
          <Avatar cfg={p.avatar} size={40} tier={tier?.index ?? 0} />
          <div className="min-w-0 flex-1"><p className="truncate font-bold leading-tight">{p.username}</p><p className="tabular truncate text-xs text-muted">{nextTier.name} · {s.xp} XP</p></div>
          <Icon name="sliders" size={18} className="text-faint" />
        </Link>
      </div>
    </aside>
  );
}

const TITLES: Record<string, string> = { '/': 'Home', '/daily': "Today's session", '/path': 'Your path', '/vocabulary': 'Vocabulary', '/grammar': 'Grammar', '/reading': 'Reading', '/listening': 'Listening', '/conversations': 'Conversations', '/pronunciation': 'Pronunciation', '/writing': 'Writing', '/progress': 'Progress', '/achievements': 'Achievements', '/cheats': 'Cheat sheets', '/languages': 'My languages', '/settings': 'Profile & settings', '/assessment': 'Final assessment' };

function SaveDot() {
  const { saveStatus, persisted } = useStore();
  if (saveStatus.state === 'error') return <Link to="/settings" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bad/12 px-3 text-xs font-bold text-bad" title={saveStatus.error}><Icon name="alert" size={14} />Not saved</Link>;
  return <span className="hidden h-9 items-center gap-1.5 px-1 text-xs font-semibold text-muted md:inline-flex" title={persisted ? 'Saved on this device. The browser has promised not to clear it.' : 'Saved on this device. Export a backup now and then.'}><span className={cx('h-1.5 w-1.5 rounded-full', saveStatus.state === 'saving' ? 'animate-pulse bg-warn' : 'bg-good')} />{saveStatus.state === 'saving' ? 'Saving…' : 'Saved'}</span>;
}
function TopBar() {
  const { profile, state, stats } = useStore(); const p = profile!; const { pathname } = useLocation(); const { due } = useGuide();
  return (
    <header className="glass safe-top sticky top-0 z-30 border-b border-line">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-4 sm:px-6 lg:h-16 lg:px-8">
        <Link to="/" className="flex items-center gap-2 lg:hidden" aria-label="LINGUA home"><LogoMark size={30} /><span className="text-[1.1rem] font-extrabold tracking-[-0.03em]">Lingua</span></Link>
        <p className="hidden text-[0.95rem] font-bold text-muted lg:block">{TITLES[pathname] ?? ''}</p>
        <div className="ml-auto flex items-center gap-2">
          <SaveDot />
          {due > 0 && <Link to="/vocabulary" className="hidden h-9 items-center gap-1.5 rounded-full bg-accent/14 px-3 text-sm font-bold text-accent-strong transition hover:bg-accent/22 sm:inline-flex" title="Words due for review"><Icon name="repeat" size={15} /><span className="tabular">{due}</span> due</Link>}
          <span className="tabular inline-flex h-9 items-center gap-1 rounded-full bg-warn/12 px-3 text-sm font-bold text-warn" title={`${state?.streak.current ?? 0}-day streak`}><Icon name="flame" size={16} />{state?.streak.current ?? 0}</span>
          <span className="tabular hidden h-9 items-center gap-1 rounded-full bg-surface2 px-3 text-sm font-bold sm:inline-flex" title="Experience points"><Icon name="star" size={15} className="text-accent-strong" />{state?.xp ?? 0}</span>
          <div className="lg:hidden"><LangSelect compact /></div>
          {!p.teacher?.off && <button onClick={() => window.dispatchEvent(new Event('lingua:teacher'))} aria-label="Ask your Teacher" className="rounded-full ring-2 ring-accent/30 transition active:scale-95 lg:hidden"><TeacherAvatar size={34} className="rounded-full" /></button>}
          <NavLink to="/settings" aria-label="Profile and settings" className="lg:hidden"><Avatar cfg={p.avatar} size={36} tier={stats?.tier.index} /></NavLink>
        </div>
      </div>
    </header>
  );
}

function BottomBar({ onPractice, onMore }: { onPractice: () => void; onMore: () => void }) {
  const { pathname } = useLocation(); const { due } = useGuide();
  const cell = 'relative flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-semibold transition';
  const tab = (to: string, label: string, icon: IconName) => (
    <NavLink to={to} end={to === '/'} className={({ isActive }) => cx(cell, isActive ? 'text-accent-strong' : 'text-muted')}>{({ isActive }) => <><span className={cx('grid h-7 w-12 place-items-center rounded-full transition', isActive && 'bg-accent/15')}><Icon name={icon} size={21} /></span>{label}</>}</NavLink>
  );
  const btn = (label: string, icon: IconName, active: boolean, onClick: () => void, badge?: number) => (
    <button onClick={onClick} className={cx(cell, active ? 'text-accent-strong' : 'text-muted')}><span className={cx('relative grid h-7 w-12 place-items-center rounded-full transition', active && 'bg-accent/15')}><Icon name={icon} size={21} />{!!badge && <span className="absolute right-2.5 top-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent" />}</span>{label}</button>
  );
  return (
    <nav aria-label="Quick" className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="glass dock pointer-events-auto mx-auto grid max-w-md grid-cols-5 items-center rounded-[1.75rem] px-1.5 py-1">
        {tab('/', 'Home', 'home')}{tab('/path', 'Path', 'path')}
        <NavLink to="/daily" className="flex flex-col items-center" aria-label="Today's session">{({ isActive }) => <><span className={cx('-mt-7 grid h-14 w-14 place-items-center rounded-full btn-primary ring-[5px] ring-bg transition active:scale-95', isActive && 'brightness-110')}><Icon name="bolt" size={25} /></span><span className={cx('mb-1 mt-1 text-[11px] font-semibold', isActive ? 'text-accent-strong' : 'text-muted')}>Today</span></>}</NavLink>
        {btn('Skills', 'grid', SKILL_PATHS.includes(pathname), onPractice, due)}{btn('Menu', 'more', MORE.some((m) => m.to === pathname), onMore)}
      </div>
    </nav>
  );
}

/** Tags target-language text so the browser lays it out correctly: right-to-left for Arabic (dir=auto) and the right
 *  glyph set for Chinese/Japanese/Korean (lang). Done by observing the DOM so no component has to know about scripts. */
function useScriptAttrs(code: string | null) {
  useEffect(() => {
    const cfg = getLang(code ?? ''); if (!cfg) return;
    const lang = cfg.script === 'kana' ? 'ja' : cfg.script === 'han' ? 'zh-Hans' : cfg.script === 'hangul' ? 'ko' : cfg.script === 'arabic' ? 'ar' : cfg.script === 'cyrillic' ? cfg.code : null;
    const re = cfg.script === 'arabic' ? /[\u0600-\u06ff]/ : cfg.script === 'kana' || cfg.script === 'han' ? /[\u3040-\u30ff\u3400-\u9fff]/ : cfg.script === 'hangul' ? /[\uac00-\ud7af\u1100-\u11ff]/ : null;
    if (!lang || !re) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      document.querySelectorAll<HTMLElement>('p,li,h1,h2,h3,h4,button,td,th,label,span,textarea,input').forEach((el) => {
        const field = el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement;
        if (field ? cfg.rtl : re.test(el.textContent ?? '')) { if (cfg.rtl && el.getAttribute('dir') !== 'auto') el.setAttribute('dir', 'auto'); if (el.getAttribute('lang') !== lang) el.setAttribute('lang', lang); }
      });
    };
    const mo = new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(run); });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true }); run();
    return () => { mo.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [code]);
}

export default function App() {
  const store = useStore(); const { ready, profile, lang, content, toasts } = store; const loc = useLocation();
  const [sheet, setSheet] = useState<null | 'practice' | 'more'>(null);
  useScriptAttrs(lang); useReminders(); useEffect(() => { setSheet(null); window.scrollTo(0, 0); }, [loc.pathname]);
  if (!ready) return <Splash text="Loading…" />;
  if (store.loadError) return <StorageProblem />;
  if (!profile) return <Onboarding />;
  if (!content) return <Splash text={`Loading ${lang}…`} />;
  return <Shell sheet={sheet} setSheet={setSheet} toasts={toasts} />;
}

/** Saved data exists but could not be opened. We never fall through to onboarding here, because starting a blank profile would overwrite it. */
function StorageProblem() {
  const { retryLoad, startFresh, loadError } = useStore();
  return (
    <div className="app-min-h grid place-items-center px-5">
      <div className="card w-full max-w-md p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-warn/14 text-warn"><Icon name="alert" size={28} /></span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Your saved progress couldn't be opened</h1>
        <p className="mt-2 text-sm text-muted">Your browser would not give LINGUA access to its storage just now. This is usually temporary (a private window, a full disk, or another LINGUA tab updating). Your data has not been touched.</p>
        <div className="mt-5 flex flex-col gap-2.5"><Btn size="lg" onClick={retryLoad}>Try again</Btn><Btn size="lg" variant="ghost" onClick={() => { if (confirm('Start with a new empty profile? If your old data comes back later it may be replaced.')) startFresh(); }}>Start fresh anyway</Btn></div>
        {loadError && <p className="mt-4 break-words text-xs text-faint">{loadError}</p>}
      </div>
    </div>
  );
}

/** "A new version is ready" — applied only when the learner taps it, never in the middle of a lesson. */
function UpdateBanner() {
  const ready = useUpdateReady();
  if (!ready) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-[65] flex justify-center px-4 lg:bottom-6">
      <div className="pop pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-4 pr-2 shadow-[var(--shadow-lg)]"><span className="text-sm font-semibold">A new version is ready</span><Btn size="sm" onClick={applyUpdate}>Update</Btn></div>
    </div>
  );
}

function Splash({ text }: { text: string }) {
  return <div className="app-min-h grid place-items-center"><div className="flex flex-col items-center gap-4 text-muted"><div className="bob"><LogoMark size={60} /></div><div className="h-1 w-28 overflow-hidden rounded-full bg-surface2"><div className="skeleton h-full w-full !rounded-full" /></div><p className="text-sm font-medium">{text}</p></div></div>;
}

function PageSkeleton() {
  return <div className="space-y-4" aria-busy aria-label="Loading"><Skeleton className="h-9 w-56" /><Skeleton className="h-44 w-full !rounded-3xl" /><div className="grid gap-4 sm:grid-cols-2"><Skeleton className="h-28 !rounded-2xl" /><Skeleton className="h-28 !rounded-2xl" /></div></div>;
}

function Shell({ sheet, setSheet, toasts }: { sheet: null | 'practice' | 'more'; setSheet: (s: null | 'practice' | 'more') => void; toasts: ReturnType<typeof useStore>['toasts'] }) {
  const store = useStore(); const loc = useLocation(); const { due } = useGuide();
  const tile = (n: Item) => (
    <NavLink key={n.to} to={n.to} className={({ isActive }) => cx('relative flex flex-col items-center gap-2 rounded-2xl border p-3 pt-3.5 text-center text-xs font-semibold transition active:scale-95', isActive ? 'border-accent bg-accent/10' : 'border-line bg-surface2/50')}>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent-strong"><Icon name={n.icon} size={22} /></span>{n.label}
      {n.to === '/vocabulary' && due > 0 && <span className="tabular absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink">{due}</span>}
    </NavLink>
  );
  return (
    <div className="app-min-h lg:flex">
      <a href="#main" className="sr-only z-[70] rounded-lg bg-surface px-3 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopBar />
        <main id="main" className={cx('mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8', store.focus ? 'pb-12' : 'pb-40')}>
          <div key={loc.pathname} className="rise">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Dashboard />} /><Route path="/path" element={<Path />} /><Route path="/daily" element={<Daily />} /><Route path="/languages" element={<Languages />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                {['grammar', 'conversations', 'listening', 'reading', 'writing', 'pronunciation'].map((k) => <Route key={k} path={`/${k}`} element={<Library key={loc.key} kind={k as any} />} />)}
                <Route path="/cheats" element={<Cheats />} /><Route path="/progress" element={<Progress />} /><Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<ProfilePage />} /><Route path="/assessment" element={<Assessment />} /><Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        {!store.focus && <BottomBar onPractice={() => setSheet('practice')} onMore={() => setSheet('more')} />}
      </div>
      <TeacherDock />
      <UpdateBanner />
      <Sheet open={sheet === 'practice'} onClose={() => setSheet(null)} title="Practise a skill">
        {groupsFor(store.lang).slice(1, 3).map((g) => <div key={g.label} className="mb-4"><p className="eyebrow mb-2 px-0.5">{g.label}</p><div className="grid grid-cols-3 gap-2.5">{g.items.map(tile)}</div></div>)}
        <p className="mt-1 rounded-xl bg-surface2 px-3 py-2.5 text-center text-xs text-muted">Not sure where to start? Tap <b className="text-ink">Today</b> and your Teacher will pick for you.</p>
      </Sheet>
      <Sheet open={sheet === 'more'} onClose={() => setSheet(null)} title="Menu">
        <Link to="/settings" onClick={() => setSheet(null)} className="mb-4 flex items-center gap-3 rounded-2xl bg-surface2 p-3">
          <Avatar cfg={store.profile!.avatar} size={46} tier={store.stats?.tier.index ?? 0} />
          <div className="min-w-0 flex-1"><p className="truncate font-bold leading-tight">{store.profile!.username}</p><p className="tabular truncate text-xs text-muted">{store.state?.xp ?? 0} XP · {store.state?.streak.current ?? 0}-day streak</p></div>
          <Icon name="sliders" size={18} className="text-muted" />
        </Link>
        <div className="space-y-4">
          {groupsFor(store.lang).map((g) => (
            <div key={g.label}><p className="eyebrow mb-1 px-3">{g.label}</p>
              <div>{g.items.map((n) => <NavItem key={n.to} n={n} onClick={() => setSheet(null)} badge={n.to === '/vocabulary' ? due : undefined} />)}</div></div>
          ))}
          <div><p className="eyebrow mb-1 px-3">Account</p>
            <div><NavItem n={I('/languages', 'My Languages', 'globe')} onClick={() => setSheet(null)} /><NavItem n={I('/settings', 'Profile & Settings', 'sliders')} onClick={() => setSheet(null)} /></div></div>
        </div>
      </Sheet>
      <div className="pointer-events-none fixed inset-x-0 top-[4.25rem] z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((t) => <button key={t.id} onClick={() => store.dismissToast(t.id)} className="pointer-events-auto pop flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-left shadow-[var(--shadow-lg)]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950"><Icon name="trophy" size={20} /></span><span className="min-w-0"><p className="font-bold leading-snug">{t.title}</p>{t.body && <p className="text-sm text-muted">{t.body}</p>}</span></button>)}
      </div>
    </div>
  );
}
