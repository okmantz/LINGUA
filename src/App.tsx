import { lazy, Suspense, useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './state/store';
import { LANGUAGES } from './content/registry';
import { Avatar } from './components/Avatar';
import { dayKey } from './core/fsrs';
import { cx } from './components/ui';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

const Daily = lazy(() => import('./pages/Daily'));
const Languages = lazy(() => import('./pages/Languages'));
const Vocabulary = lazy(() => import('./pages/Vocabulary'));
const Library = lazy(() => import('./pages/Library'));
const Cheats = lazy(() => import('./pages/Cheats'));
const Progress = lazy(() => import('./pages/Progress'));
const Achievements = lazy(() => import('./pages/Achievements'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const Assessment = lazy(() => import('./pages/Assessment'));

const NAV: { to: string; label: string; icon: string }[] = [
  { to: '/', label: 'Dashboard', icon: '🏠' }, { to: '/languages', label: 'My Languages', icon: '🌍' }, { to: '/daily', label: 'Daily Learning', icon: '⚡' },
  { to: '/vocabulary', label: 'Vocabulary', icon: '🔤' }, { to: '/grammar', label: 'Grammar', icon: '🧩' }, { to: '/conversations', label: 'Conversations', icon: '💬' },
  { to: '/listening', label: 'Listening', icon: '🎧' }, { to: '/reading', label: 'Reading', icon: '📖' }, { to: '/writing', label: 'Writing', icon: '✍️' },
  { to: '/pronunciation', label: 'Pronunciation', icon: '🗣' }, { to: '/cheats', label: 'Cheat Sheets', icon: '🗂' }, { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/achievements', label: 'Achievements', icon: '🏆' }, { to: '/settings', label: 'Profile & Settings', icon: '⚙️' },
];
const BOTTOM = ['/', '/daily', '/vocabulary', '/progress'];

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

export default function App() {
  const store = useStore(); const { ready, profile, lang, content, toasts } = store; const [menu, setMenu] = useState(false); const loc = useLocation();
  useReminders(); useEffect(() => { setMenu(false); window.scrollTo(0, 0); }, [loc.pathname]);
  if (!ready) return <div className="grid min-h-screen place-items-center text-muted">Loading…</div>;
  if (!profile) return <Onboarding />;
  if (!content) return <div className="grid min-h-screen place-items-center text-muted">Loading {lang}…</div>;
  const nav = (
    <nav aria-label="Main" className="flex flex-col gap-0.5">
      {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => cx('flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem]', isActive ? 'bg-accent/15 font-semibold' : 'text-muted hover:bg-surface2 hover:text-ink')}><span aria-hidden className="w-5 text-center">{n.icon}</span>{n.label}</NavLink>)}
    </nav>
  );
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-4 overflow-y-auto border-r border-line bg-surface p-4 lg:flex">
        <div className="px-2 text-2xl font-bold tracking-tight">LINGUA</div>{nav}
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-2.5 backdrop-blur">
          <button className="rounded-lg p-2 hover:bg-surface2 lg:hidden" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
          <span className="font-bold lg:hidden">LINGUA</span>
          <div className="ml-auto flex items-center gap-3">
            <label className="sr-only" htmlFor="lang">Active language</label>
            <select id="lang" value={lang ?? ''} onChange={(e) => store.setActiveLang(e.target.value)} className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm">{Object.keys(profile.languages).map((c) => <option key={c} value={c}>{LANGUAGES.find((l) => l.code === c)?.endonym}</option>)}</select>
            <NavLink to="/settings" aria-label="Profile and settings" className="flex items-center gap-2"><Avatar cfg={profile.avatar} size={34} /><span className="hidden text-sm font-medium sm:inline">{profile.username}</span></NavLink>
          </div>
        </header>
        {menu && <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true"><div className="absolute inset-0 bg-black/40" onClick={() => setMenu(false)} /><div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-surface p-4">{nav}</div></div>}
        <main className="mx-auto max-w-4xl px-4 pb-28 pt-6 lg:pb-10">
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            <Routes>
              <Route path="/" element={<Dashboard />} /><Route path="/languages" element={<Languages />} /><Route path="/daily" element={<Daily />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              {['grammar', 'conversations', 'listening', 'reading', 'writing', 'pronunciation'].map((k) => <Route key={k} path={`/${k}`} element={<Library key={loc.key} kind={k as any} />} />)}
              <Route path="/cheats" element={<Cheats />} /><Route path="/progress" element={<Progress />} /><Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<ProfilePage />} /><Route path="/assessment" element={<Assessment />} /><Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
          {NAV.filter((n) => BOTTOM.includes(n.to)).map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => cx('flex flex-col items-center gap-0.5 py-2 text-[11px]', isActive ? 'font-semibold text-ink' : 'text-muted')}><span aria-hidden className="text-lg">{n.icon}</span>{n.label.split(' ')[0]}</NavLink>)}
          <button onClick={() => setMenu(true)} className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-muted"><span aria-hidden className="text-lg">⋯</span>More</button>
        </nav>
      </div>
      <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((t) => <button key={t.id} onClick={() => store.dismissToast(t.id)} className="pointer-events-auto pop w-full max-w-sm rounded-2xl border border-accent/40 bg-surface p-3 text-left shadow-lg"><p className="font-semibold">🏆 {t.title}</p>{t.body && <p className="text-sm text-muted">{t.body}</p>}</button>)}
      </div>
    </div>
  );
}
