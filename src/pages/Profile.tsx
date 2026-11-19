import { useRef, useState } from 'react';
import { ACCENTS } from '../core/cosmetics';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { IMMERSION_LABELS } from '../state/hooks';
import { Avatar, TeacherAvatar } from '../components/Avatar';
import { CharacterPicker } from '../components/CharacterPicker';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, H1, Note, Tabs, cx } from '../components/ui';
import { TEACHER } from '../core/teacher';

const MINUTES = [5, 10, 15, 20, 30, 45, 60];
const Row = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-3.5 first:border-0 first:pt-0 last:pb-0"><div className="min-w-0 flex-1 basis-48"><p className="font-medium">{title}</p>{hint && <p className="text-sm text-muted">{hint}</p>}</div>{children}</div>
);
const Switch = ({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) => (
  <button role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={cx('relative h-7 w-12 shrink-0 rounded-full transition', on ? 'bg-accent' : 'bg-surface2 ring-1 ring-line')}><span className={cx('absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all', on ? 'left-[22px]' : 'left-0.5')} /></button>
);

export default function ProfilePage() {
  const store = useStore(); const { profile, state, stats, lang } = store; const file = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<'you' | 'learning' | 'look' | 'data'>('you');
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null); const [name, setName] = useState(profile!.username);
  const p = profile!; const tier = stats?.tier.index ?? 0; const s = p.settings; const teacherOn = !p.teacher?.off;
  const onFile = async (f?: File) => { if (!f) return; try { await store.doImport(await f.text()); setMsg({ ok: true, t: 'Backup restored.' }); } catch (e: any) { setMsg({ ok: false, t: `Import failed: ${e.message ?? e}` }); } };
  const notif = async () => { if (!('Notification' in window)) { setMsg({ ok: false, t: 'This browser does not support notifications.' }); return; } const r = await Notification.requestPermission(); store.updateSettings({ reminders: r === 'granted' }); setMsg(r === 'granted' ? { ok: true, t: 'Reminders on. They appear while LINGUA is open or installed and running.' } : { ok: false, t: 'Notification permission was not granted.' }); };
  return (
    <div>
      <H1 sub="Your character, learning preferences, look and data." right={<Avatar cfg={p.avatar} size={52} tier={tier} />}>Profile & settings</H1>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'you', label: 'You' }, { id: 'learning', label: 'Learning' }, { id: 'look', label: 'Look & feel' }, { id: 'data', label: 'Your data' }]} />

      {tab === 'you' && <div className="space-y-4">
        <Card><h2 className="mb-3 text-lg font-bold">Your character</h2>
          <CharacterPicker value={p.avatar.char} onChange={(char) => store.patchProfile((x) => ({ ...x, avatar: { char } }))} ctx={{ tier, ach: p.achievements }} />
          <p className="mt-3 text-xs text-muted">The ring around your picture shows your mastery tier. Finn, Bolt and Milo unlock as you progress, based on demonstrated mastery rather than time spent.</p></Card>
        <Card><h2 className="mb-3 text-lg font-bold">Name</h2><label className="sr-only" htmlFor="un">Username</label>
          <input id="un" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} onBlur={() => name.trim().length >= 2 && store.patchProfile((x) => ({ ...x, username: name.trim() }))} className="h-12 w-full rounded-xl border border-line bg-surface px-3.5 outline-none focus:border-accent" /></Card>
        <Card><div className="mb-3 flex items-center gap-3"><TeacherAvatar size={48} className="rounded-full" /><div><h2 className="text-lg font-bold">{TEACHER.name}</h2><p className="text-sm text-muted">Pops up with tips, reminders and advice.</p></div></div>
          <Row title="Show the Teacher" hint="Tips appear once per page, never repeatedly."><Switch on={teacherOn} onChange={(v) => store.setTeacherOff(!v)} label="Show the Teacher" /></Row>
          <Row title="Show all tips again" hint="Replay the welcome tour and every tip."><Btn size="sm" variant="ghost" onClick={() => store.resetTips()}>Reset tips</Btn></Row></Card>
      </div>}

      {tab === 'learning' && <div className="space-y-4">
        <Card><h2 className="mb-3 text-lg font-bold">Audio & display</h2>
          <Row title={`Speech speed: ${s.ttsRate.toFixed(2)}×`} hint="How fast the computer voice speaks."><input aria-label="Speech speed" type="range" min={0.5} max={1.2} step={0.05} value={s.ttsRate} onChange={(e) => store.updateSettings({ ttsRate: Number(e.target.value) })} className="w-44" /></Row>
          <Row title="Pronunciation respelling" hint="Show the 'how to say it' line on word cards."><Switch on={s.showRomanization} onChange={(v) => store.updateSettings({ showRomanization: v })} label="Show pronunciation respelling" /></Row></Card>
        {Object.values(p.languages).map((l) => { const cfg = LANGUAGES.find((x) => x.code === l.code)!; return (
          <Card key={l.code}><div className="mb-3 flex items-center gap-2"><h2 className="text-lg font-bold">{cfg.name}</h2>{lang === l.code && <Chip tone="accent">Active</Chip>}</div>
            <p className="mb-2 text-sm font-medium">Daily goal</p><div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">{MINUTES.map((m) => <button key={m} onClick={() => store.patchLang(l.code, (x) => ({ ...x, dailyMinutes: m }))} className={cx('h-10 min-w-16 shrink-0 whitespace-nowrap rounded-xl px-3 text-sm font-semibold', l.dailyMinutes === m ? 'bg-accent text-accent-ink' : 'bg-surface2 text-muted')}>{m} min</button>)}</div>
            <Row title="Immersion" hint={IMMERSION_LABELS[l.immersion]}><label className="flex items-center gap-2 text-sm"><Switch on={l.immersionAuto} onChange={(v) => store.patchLang(l.code, (x) => ({ ...x, immersionAuto: v }))} label="Automatic immersion" />Auto</label></Row>
            {!l.immersionAuto && <div className="flex gap-1.5 pb-1">{[0, 1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => store.patchLang(l.code, (x) => ({ ...x, immersion: n }))} aria-label={`Immersion level ${n}`} className={cx('h-10 w-10 rounded-xl text-sm font-semibold', l.immersion === n ? 'bg-accent text-accent-ink' : 'bg-surface2 text-muted')}>{n}</button>)}</div>}
          </Card>); })}
        <Card><h2 className="mb-1 text-lg font-bold">Reminders</h2><p className="mb-3 text-sm text-muted">Browser notifications only fire while LINGUA is open (or the installed app is running). There is no server, so there are no background push messages.</p>
          <div className="flex flex-wrap items-center gap-3">{s.reminders ? <><Chip tone="good">On</Chip><input type="time" value={s.reminderTime} onChange={(e) => store.updateSettings({ reminderTime: e.target.value })} className="h-10 rounded-xl border border-line bg-surface px-3" aria-label="Reminder time" /><Btn size="sm" variant="ghost" onClick={() => store.updateSettings({ reminders: false })}>Turn off</Btn></> : <Btn size="sm" onClick={() => void notif()}>Enable reminders</Btn>}</div>
          {msg && <div className="mt-3"><Note tone={msg.ok ? 'info' : 'warn'}>{msg.t}</Note></div>}</Card>
      </div>}

      {tab === 'look' && <div className="space-y-4"><Card><h2 className="mb-3 text-lg font-bold">Appearance</h2>
        <p className="mb-2 text-sm font-medium">Theme</p><div className="mb-5 grid grid-cols-3 gap-2">{(['system', 'light', 'dark'] as const).map((m) => <button key={m} onClick={() => store.updateSettings({ mode: m })} aria-pressed={s.mode === m} className={cx('h-11 rounded-xl text-sm font-semibold capitalize', s.mode === m ? 'bg-accent text-accent-ink' : 'bg-surface2 text-muted')}>{m}</button>)}</div>
        <p className="mb-2 text-sm font-medium">Accent colour</p><div className="mb-5 flex flex-wrap gap-2.5">{ACCENTS.map((a) => { const ok = !a.unlock || tier >= a.unlock.tier; return <button key={a.id} disabled={!ok} title={ok ? a.name : `Locked: ${a.unlock?.label}`} aria-label={a.name} aria-pressed={s.accent === a.id} onClick={() => store.updateSettings({ accent: a.id })} className={cx('grid h-11 w-11 place-items-center rounded-full border-[3px] text-white', s.accent === a.id ? 'border-ink' : 'border-transparent', !ok && 'opacity-40')} style={{ background: a.hex }}>{!ok ? <Icon name="lock" size={16} /> : s.accent === a.id ? <Icon name="check" size={18} strokeWidth={3} /> : null}</button>; })}</div>
        <Row title="Larger text" hint="Easier reading."><Switch on={s.largeText} onChange={(v) => store.updateSettings({ largeText: v })} label="Larger text" /></Row>
        <Row title="Reduce motion" hint="Turns off animations."><Switch on={s.reducedMotion} onChange={(v) => store.updateSettings({ reducedMotion: v })} label="Reduce motion" /></Row></Card></div>}

      {tab === 'data' && <div className="space-y-4">
        <Card><h2 className="mb-2 text-lg font-bold">Your data</h2>
          <p className="text-sm text-muted">Stored only in this browser (IndexedDB). {store.persisted ? 'The browser has granted persistent storage.' : 'Persistent storage was not granted, so the browser may clear data under storage pressure. Export backups regularly.'} Cloud sync is not available; use backup files to move between devices.</p>
          {p.lastBackup && <p className="mt-1 text-sm">Last backup: {new Date(p.lastBackup).toLocaleString()}</p>}
          <div className="mt-3 flex flex-wrap gap-2"><Btn onClick={() => void store.doExport()}>Export backup (JSON)</Btn><Btn variant="ghost" onClick={() => file.current?.click()}>Import backup…</Btn><input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ''; }} /></div>
          {msg && <div className="mt-3"><Note tone={msg.ok ? 'info' : 'warn'}>{msg.t}</Note></div>}
          <p className="mt-2 text-xs text-muted">Importing replaces everything currently stored.</p>
          <div className="mt-4 border-t border-line pt-3"><Btn variant="danger" size="sm" onClick={() => { if (confirm('Delete ALL data on this device? Export a backup first if you want to keep it.') && confirm('This cannot be undone. Really delete?')) void store.doWipe(); }}>Delete all data</Btn></div></Card>
        <Card><h2 className="mb-2 text-lg font-bold">About the honesty of this app</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted"><li>Audio is your browser's text-to-speech, not recordings of native speakers.</li><li>Writing and open conversation are checked by keywords and length, not by an AI grader.</li><li>Speech recognition comes from your browser and may send audio to its vendor.</li><li>Placement measures A1–B2; C1/C2 need an examiner.</li><li>Built-in content is a focused starter core ({state ? 'see Vocabulary for the exact size' : ''}); the app tells you when a level has no material yet.</li></ul>
          <p className="mt-2 text-xs text-muted">Active language: {lang}. Data schema v{p.schema}.</p></Card>
      </div>}
    </div>
  );
}
