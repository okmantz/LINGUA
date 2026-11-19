import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './state/store';
import { useGuide } from './state/hooks';
import { LANGUAGES } from './content/registry';
import { Avatar } from './components/Avatar';
import { Logo, LogoMark } from './components/Logo';
import { Icon, type IconName } from './components/Icon';
import { TeacherDock } from './components/Teacher';
import { dayKey } from './core/fsrs';
import { TIERS } from './core/analytics';
import { cx, Sheet } from './components/ui';
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
const LEARN: Item[] = [
  { to: '/', label: 'Home', icon: 'home', hint: 'Your next step' },
  { to: '/path', label: 'Your Path', icon: 'path', hint: 'The plan, day by day' },
  { to: '/daily', label: "Today's Session", icon: 'bolt', hint: 'Short guided practice' },
];
const PRACTICE: Item[] = [
  { to: '/vocabulary', label: 'Vocabulary', icon: 'cards' }, { to: '/grammar', label: 'Grammar', icon: 'puzzle' },
  { to: '/conversations', label: 'Conversations', icon: 'chat' }, { to: '/listening', label: 'Listening', icon: 'headphones' },
  { to: '/reading', label: 'Reading', icon: 'book' }, { to: '/writing', label: 'Writing', icon: 'pen' }, { to: '/pronunciation', label: 'Pronunciation', icon: 'mic' },
];
const REFERENCE: Item[] = [{ to: '/cheats', label: 'Cheat Sheets', icon: 'sheet', hint: 'Quick reference' }];
const YOU: Item[] = [
  { to: '/progress', label: 'Progress', icon: 'chart' }, { to: '/achievements', label: 'Achievements', icon: 'trophy' },
  { to: '/languages', label: 'My Languages', icon: 'globe' }, { to: '/settings', label: 'Profile & Settings', icon: 'sliders' },
];
// The desktop sidebar has three groups; the profile card at the bottom is the way to Settings.
const GROUPS: { label: string; items: Item[] }[] = [{ label: 'Learn', items: LEARN }, { label: 'Practice', items: [...PRACTICE, ...REFERENCE] }, { label: 'You', items: YOU.filter((n) => n.to !== '/settings') }];
const PRACTICE_PATHS = PRACTICE.map((p) => p.to);

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
  const label = (c: string) => LANGUAGES.find((l) => l.code === c)?.endonym ?? c;
  if (codes.length < 2 && compact) return <span className="hidden items-center gap-1.5 rounded-full bg-surface2 px-3 py-1.5 text-sm font-medium sm:inline-flex"><Icon name="globe" size={15} className="text-accent" />{label(lang ?? codes[0])}</span>;
  return (
    <label className={cx('relative inline-flex items-center gap-1.5 rounded-xl bg-surface2 pl-3 pr-2 text-sm font-medium', compact ? 'h-9' : 'h-11 w-full')}>
      <span className="sr-only">Active language</span><Icon name="globe" size={16} className="shrink-0 text-accent" />
      <select value={lang ?? ''} onChange={(e) => setActiveLang(e.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent py-2 pr-5 outline-none">{codes.map((c) => <option key={c} value={c}>{label(c)}</option>)}</select>
      <Icon name="down" size={14} className="pointer-events-none absolute right-2.5 text-muted" />
    </label>
  );
}

function NavItem({ n, badge, onClick }: { n: Item; badge?: number; onClick?: () => void }) {
  return (
    <NavLink to={n.to} end={n.to === '/'} onClick={onClick} className={({ isActive }) => cx('group flex min-h-8 items-center gap-3 rounded-lg px-3 py-1 text-[0.9rem] transition', isActive ? 'bg-accent/15 font-semibold text-ink' : 'text-muted hover:bg-surface2 hover:text-ink')}>
      {({ isActive }) => <><Icon name={n.icon} size={19} className={isActive ? 'text-accent' : 'opacity-80'} /><span className="flex-1">{n.label}</span>{!!badge && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-accent-ink">{badge > 99 ? '99+' : badge}</span>}</>}
    </NavLink>
  );
}

function Sidebar() {
  const { store, next, due } = useGuide(); const p = store.profile!; const s = store.state!; const tier = store.stats?.tier;
  const nextTier = tier ? TIERS[tier.index] : TIERS[0];
  return (
    <aside className="sticky top-0 hidden h-dvh w-[280px] shrink-0 flex-col border-r border-line bg-surface lg:flex">
      <div className="px-5 pb-3 pt-5"><Logo tagline /></div>
      <div className="px-4 pb-1">
        <Link to={next.to} className="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-accent to-accent/75 p-3 text-accent-ink shadow-sm transition hover:brightness-105">
          <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-wider opacity-75">Next up</p><p className="truncate text-[0.92rem] font-bold leading-snug">{next.title}</p></div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/10"><Icon name="arrow" size={16} className="transition group-hover:translate-x-0.5" /></span>
        </Link>
      </div>
      <nav aria-label="Main" className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {GROUPS.map((g) => (
          <div key={g.label}><p className="mb-0.5 px-3 text-[11px] font-bold uppercase tracking-wider text-muted/80">{g.label}</p>
            <div>{g.items.map((n) => <NavItem key={n.to} n={n} badge={n.to === '/vocabulary' ? due : undefined} />)}</div></div>
        ))}
      </nav>
      <Link to="/settings" className="m-3 flex items-center gap-3 rounded-2xl border border-line p-2.5 transition hover:bg-surface2">
        <Avatar cfg={p.avatar} size={44} tier={tier?.index ?? 0} />
        <div className="min-w-0 flex-1"><p className="truncate font-semibold leading-tight">{p.username}</p><p className="truncate text-xs text-muted">{nextTier.name} · {s.xp} XP</p></div>
        <Icon name="sliders" size={17} className="text-muted" />
      </Link>
    </aside>
  );
}

function TopBar() {
  const { profile, state, stats } = useStore(); const p = profile!;
  return (
    <header className="glass safe-top sticky top-0 z-30 border-b border-line">
      <div className="flex h-14 items-center gap-2.5 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 lg:hidden" aria-label="LINGUA home"><LogoMark size={30} /><span className="text-lg font-extrabold tracking-tight">Lingua</span></Link>
        <div className="ml-auto flex items-center gap-2">
          <span className="inline-flex h-9 items-center gap-1 rounded-full bg-warn/15 px-2.5 text-sm font-bold text-warn" title={`${state?.streak.current ?? 0}-day streak`}><Icon name="flame" size={16} />{state?.streak.current ?? 0}</span>
          <span className="hidden h-9 items-center gap-1 rounded-full bg-accent/15 px-2.5 text-sm font-bold sm:inline-flex" title="Experience points"><Icon name="star" size={15} className="text-accent" />{state?.xp ?? 0}</span>
          <LangSelect compact />
          <NavLink to="/settings" aria-label="Profile and settings" className="lg:hidden"><Avatar cfg={p.avatar} size={36} tier={stats?.tier.index} /></NavLink>
        </div>
      </div>
    </header>
  );
}

function BottomBar({ onPractice, onMore }: { onPractice: () => void; onMore: () => void }) {
  const { pathname } = useLocation(); const { due } = useGuide();
  const tab = (to: string, label: string, icon: IconName) => (
    <NavLink to={to} end={to === '/'} className={({ isActive }) => cx('flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium', isActive ? 'text-accent' : 'text-muted')}><Icon name={icon} size={22} />{label}</NavLink>
  );
  const btn = (label: string, icon: IconName, active: boolean, onClick: () => void, badge?: number) => (
    <button onClick={onClick} className={cx('relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium', active ? 'text-accent' : 'text-muted')}><Icon name={icon} size={22} />{label}{!!badge && <span className="absolute right-[26%] top-1 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent" />}</button>
  );
  return (
    <nav aria-label="Quick" className="glass safe-bottom fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line lg:hidden">
      {tab('/', 'Home', 'home')}{tab('/path', 'Path', 'path')}
      <NavLink to="/daily" className="flex flex-col items-center" aria-label="Today's session">{({ isActive }) => <><span className={cx('-mt-4 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow-lg)] ring-4 ring-bg transition active:scale-95', isActive && 'brightness-110')}><Icon name="bolt" size={26} /></span><span className={cx('mt-0.5 text-[11px] font-medium', isActive ? 'text-accent' : 'text-muted')}>Today</span></>}</NavLink>
      {btn('Practice', 'grid', PRACTICE_PATHS.includes(pathname), onPractice, due)}{btn('More', 'more', ['/progress', '/achievements', '/cheats', '/languages', '/settings'].includes(pathname), onMore)}
    </nav>
  );
}

export default function App() {
  const store = useStore(); const { ready, profile, lang, content, toasts } = store; const loc = useLocation();
  const [sheet, setSheet] = useState<null | 'practice' | 'more'>(null);
  useReminders(); useEffect(() => { setSheet(null); window.scrollTo(0, 0); }, [loc.pathname]);
  if (!ready) return <Splash text="Loading…" />;
  if (!profile) return <Onboarding />;
  if (!content) return <Splash text={`Loading ${lang}…`} />;
  return <Shell sheet={sheet} setSheet={setSheet} toasts={toasts} />;
}

function Splash({ text }: { text: string }) {
  return <div className="app-min-h grid place-items-center"><div className="flex flex-col items-center gap-3 text-muted"><LogoMark size={56} /><p className="text-sm">{text}</p></div></div>;
}

function Shell({ sheet, setSheet, toasts }: { sheet: null | 'practice' | 'more'; setSheet: (s: null | 'practice' | 'more') => void; toasts: ReturnType<typeof useStore>['toasts'] }) {
  const store = useStore(); const loc = useLocation(); const { due } = useGuide();
  const tile = (n: Item) => (
    <NavLink key={n.to} to={n.to} className={({ isActive }) => cx('relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center text-xs font-semibold transition active:scale-95', isActive ? 'border-accent bg-accent/10' : 'border-line bg-surface2/60')}>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={n.icon} size={22} /></span>{n.label}
      {n.to === '/vocabulary' && due > 0 && <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink">{due}</span>}
    </NavLink>
  );
  return (
    <div className="app-min-h lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopBar />
        <main className={cx('mx-auto w-full max-w-4xl px-4 pt-5 sm:px-6 lg:pb-12 lg:pt-8', store.focus ? 'pb-10' : 'pb-36')}>
          <div key={loc.pathname} className="rise">
            <Suspense fallback={<div className="space-y-3" aria-busy><div className="h-8 w-48 animate-pulse rounded-lg bg-surface2" /><div className="h-40 animate-pulse rounded-2xl bg-surface2" /><div className="h-24 animate-pulse rounded-2xl bg-surface2" /></div>}>
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
      <Sheet open={sheet === 'practice'} onClose={() => setSheet(null)} title="Practice a skill">
        <div className="grid grid-cols-3 gap-2.5">{PRACTICE.map(tile)}{REFERENCE.map(tile)}</div>
        <p className="mt-3 text-center text-xs text-muted">Not sure where to start? Tap <b>Today</b> and I'll pick for you.</p>
      </Sheet>
      <Sheet open={sheet === 'more'} onClose={() => setSheet(null)} title="More">
        <div className="space-y-1">{YOU.map((n) => <NavItem key={n.to} n={n} onClick={() => setSheet(null)} />)}</div>
      </Sheet>
      <div className="pointer-events-none fixed inset-x-0 top-16 z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((t) => <button key={t.id} onClick={() => store.dismissToast(t.id)} className="pointer-events-auto pop flex w-full max-w-sm items-start gap-3 rounded-2xl border border-accent/40 bg-surface p-3 text-left shadow-[var(--shadow-lg)]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name="trophy" size={19} /></span><span><p className="font-semibold leading-snug">{t.title}</p>{t.body && <p className="text-sm text-muted">{t.body}</p>}</span></button>)}
      </div>
    </div>
  );
}
