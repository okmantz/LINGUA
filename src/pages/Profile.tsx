import { useRef, useState } from 'react';
import { ACCENTS } from '../core/cosmetics';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { IMMERSION_LABELS } from '../state/hooks';
import { Avatar, TeacherAvatar } from '../components/Avatar';
import { CharacterPicker } from '../components/CharacterPicker';
import { Icon, type IconName } from '../components/Icon';
import { Btn, Card, Chip, H1, IconBadge, Note, Segmented, Switch, Tabs, cx } from '../components/ui';
import { TEACHER } from '../core/teacher';

const MINUTES = [5, 10, 15, 20, 30, 45, 60, 90, 120];
const Row = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-line py-4 first:border-0 first:pt-0 last:pb-0"><div className="min-w-0 flex-1 basis-56"><p className="font-semibold">{title}</p>{hint && <p className="mt-0.5 text-sm text-muted">{hint}</p>}</div>{children}</div>
);
const Section = ({ icon, title, sub, children }: { icon: IconName; title: string; sub?: string; children: React.ReactNode }) => (
  <Card><div className="mb-4 flex items-center gap-3"><IconBadge name={icon} size={38} /><div className="min-w-0"><h2 className="text-lg font-extrabold leading-tight tracking-tight">{title}</h2>{sub && <p className="text-sm text-muted">{sub}</p>}</div></div>{children}</Card>
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
      <H1 eyebrow="Settings" sub="Your character, learning preferences, look and data." right={<Avatar cfg={p.avatar} size={56} tier={tier} />}>Profile & settings</H1>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'you', label: 'You' }, { id: 'learning', label: 'Learning' }, { id: 'look', label: 'Look & feel' }, { id: 'data', label: 'Your data' }]} />

      {tab === 'you' && <div className="stagger space-y-4">
        <Section icon="user" title="Your character" sub="The ring shows your mastery tier.">
          <CharacterPicker value={p.avatar.char} onChange={(char) => store.patchProfile((x) => ({ ...x, avatar: { char } }))} ctx={{ tier, ach: p.achievements }} />
          <p className="mt-4 text-xs text-muted">Finn, Bolt and Milo unlock as you progress, based on demonstrated mastery rather than time spent.</p></Section>
        <Section icon="edit" title="Name"><label className="sr-only" htmlFor="un">Username</label>
          <input id="un" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} onBlur={() => name.trim().length >= 2 && store.patchProfile((x) => ({ ...x, username: name.trim() }))} className="h-12 w-full rounded-2xl border-2 border-line-strong bg-surface px-4 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" /></Section>
        <Card><div className="mb-4 flex items-center gap-3"><TeacherAvatar size={46} className="rounded-full ring-2 ring-accent/30" /><div><h2 className="text-lg font-extrabold leading-tight tracking-tight">{TEACHER.name}</h2><p className="text-sm text-muted">Gives tips, reminders and advice when you tap her.</p></div></div>
          <Row title="Show the Teacher" hint="She only opens on her own for something really important. Tap her for tips any time."><Switch on={teacherOn} onChange={(v) => store.setTeacherOff(!v)} label="Show the Teacher" /></Row>
          <Row title="Show all tips again" hint="Replay the welcome tour and every tip."><Btn size="sm" variant="ghost" onClick={() => store.resetTips()}>Reset tips</Btn></Row></Card>
      </div>}

      {tab === 'learning' && <div className="stagger space-y-4">
        <Section icon="volume" title="Audio & display">
          <Row title={`Speech speed: ${s.ttsRate.toFixed(2)}×`} hint="How fast the computer voice speaks."><input aria-label="Speech speed" type="range" min={0.5} max={1.2} step={0.05} value={s.ttsRate} onChange={(e) => store.updateSettings({ ttsRate: Number(e.target.value) })} className="w-44" /></Row>
          <Row title="Pronunciation respelling" hint="Show the 'how to say it' line on word cards."><Switch on={s.showRomanization} onChange={(v) => store.updateSettings({ showRomanization: v })} label="Show pronunciation respelling" /></Row></Section>
        {Object.values(p.languages).map((l) => { const cfg = LANGUAGES.find((x) => x.code === l.code)!; return (
          <Card key={l.code}><div className="mb-4 flex items-center gap-2.5"><IconBadge name="globe" size={38} /><h2 className="text-lg font-extrabold tracking-tight">{cfg.name}</h2>{lang === l.code && <Chip tone="accent">Active</Chip>}</div>
            <p className="mb-2 text-sm font-bold">Daily goal</p><div className="no-scrollbar -mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1">{MINUTES.map((m) => <button key={m} onClick={() => store.patchLang(l.code, (x) => ({ ...x, dailyMinutes: m }))} aria-pressed={l.dailyMinutes === m} className={cx('tabular h-10 min-w-[4.25rem] shrink-0 whitespace-nowrap rounded-xl px-3 text-sm font-bold transition', l.dailyMinutes === m ? 'btn-primary' : 'bg-surface2 text-muted hover:bg-surface3 hover:text-ink')}>{m} min</button>)}</div>
            <Row title="Immersion" hint={IMMERSION_LABELS[l.immersion]}><label className="flex items-center gap-2.5 text-sm font-semibold"><Switch on={l.immersionAuto} onChange={(v) => store.patchLang(l.code, (x) => ({ ...x, immersionAuto: v }))} label="Automatic immersion" />Auto</label></Row>
            {!l.immersionAuto && <div className="flex gap-1.5 pt-1">{[0, 1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => store.patchLang(l.code, (x) => ({ ...x, immersion: n }))} aria-label={`Immersion level ${n}`} aria-pressed={l.immersion === n} className={cx('tabular h-10 w-10 rounded-xl text-sm font-bold transition', l.immersion === n ? 'btn-primary' : 'bg-surface2 text-muted hover:bg-surface3')}>{n}</button>)}</div>}
          </Card>); })}
        <Section icon="bell" title="Reminders" sub="Browser notifications only fire while LINGUA is open (or the installed app is running). There is no server, so there are no background push messages.">
          <div className="flex flex-wrap items-center gap-3">{s.reminders ? <><Chip tone="good">On</Chip><input type="time" value={s.reminderTime} onChange={(e) => store.updateSettings({ reminderTime: e.target.value })} className="h-10 rounded-xl border border-line-strong bg-surface px-3" aria-label="Reminder time" /><Btn size="sm" variant="ghost" onClick={() => store.updateSettings({ reminders: false })}>Turn off</Btn></> : <Btn size="sm" onClick={() => void notif()}>Enable reminders</Btn>}</div>
          {msg && <div className="mt-3"><Note tone={msg.ok ? 'info' : 'warn'}>{msg.t}</Note></div>}</Section>
      </div>}

      {tab === 'look' && <div className="stagger space-y-4"><Section icon="sun" title="Appearance">
        <p className="mb-2 text-sm font-bold">Theme</p><div className="mb-6"><Segmented label="Theme" value={s.mode} onChange={(m) => store.updateSettings({ mode: m })} items={[{ id: 'system', label: 'System', icon: 'monitor' }, { id: 'light', label: 'Light', icon: 'sun' }, { id: 'dark', label: 'Dark', icon: 'moon' }]} /></div>
        <p className="mb-2.5 text-sm font-bold">Accent colour</p><div className="mb-6 flex flex-wrap gap-3">{ACCENTS.map((a) => { const ok = !a.unlock || tier >= a.unlock.tier; return <button key={a.id} disabled={!ok} title={ok ? a.name : `Locked: ${a.unlock?.label}`} aria-label={a.name} aria-pressed={s.accent === a.id} onClick={() => store.updateSettings({ accent: a.id })} className={cx('grid h-11 w-11 place-items-center rounded-full text-white shadow-[inset_0_1px_0_rgb(255_255_255/.3)] ring-offset-2 ring-offset-surface transition active:scale-95', s.accent === a.id ? 'ring-2 ring-ink' : 'hover:scale-105', !ok && 'opacity-40')} style={{ background: a.hex }}>{!ok ? <Icon name="lock" size={16} /> : s.accent === a.id ? <Icon name="check" size={18} strokeWidth={3} /> : null}</button>; })}</div>
        <Row title="Larger text" hint="Easier reading."><Switch on={s.largeText} onChange={(v) => store.updateSettings({ largeText: v })} label="Larger text" /></Row>
        <Row title="Reduce motion" hint="Turns off animations."><Switch on={s.reducedMotion} onChange={(v) => store.updateSettings({ reducedMotion: v })} label="Reduce motion" /></Row></Section></div>}

      {tab === 'data' && <div className="stagger space-y-4">
        <Section icon="shield" title="Your data" sub="Stored only on this device.">
          <p className="text-sm text-muted">Stored only in this browser (IndexedDB). {store.persisted ? 'The browser has granted persistent storage.' : 'Persistent storage was not granted, so the browser may clear data under storage pressure. Export backups regularly.'} Cloud sync is not available; use backup files to move between devices.</p>
          {p.lastBackup && <p className="mt-2 text-sm font-semibold">Last backup: {new Date(p.lastBackup).toLocaleString()}</p>}
          <div className="mt-4 flex flex-wrap gap-2"><Btn onClick={() => void store.doExport()}><Icon name="download" size={17} />Export backup (JSON)</Btn><Btn variant="ghost" onClick={() => file.current?.click()}><Icon name="upload" size={17} />Import backup…</Btn><input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ''; }} /></div>
          {msg && <div className="mt-3"><Note tone={msg.ok ? 'info' : 'warn'}>{msg.t}</Note></div>}
          <p className="mt-3 text-xs text-muted">Importing replaces everything currently stored.</p>
          <div className="mt-5 rounded-2xl border border-bad/30 bg-bad/[.06] p-4"><p className="font-bold text-bad">Danger zone</p><p className="mt-0.5 text-sm text-muted">Removes your progress, reviews and settings from this device.</p><Btn variant="danger" size="sm" className="mt-3" onClick={() => { if (confirm('Delete ALL data on this device? Export a backup first if you want to keep it.') && confirm('This cannot be undone. Really delete?')) void store.doWipe(); }}><Icon name="trash" size={16} />Delete all data</Btn></div></Section>
        <Section icon="info" title="About the honesty of this app">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-faint"><li>Audio is your browser's text-to-speech, not recordings of native speakers.</li><li>Writing and open conversation are checked by keywords and length, not by an AI grader.</li><li>Speech recognition comes from your browser and may send audio to its vendor.</li><li>Placement measures A1–B2; C1/C2 need an examiner.</li><li>Built-in content is a focused starter core ({state ? 'see Vocabulary for the exact size' : ''}); the app tells you when a level has no material yet.</li></ul>
          <p className="mt-3 text-xs text-muted">Active language: {lang}. Data schema v{p.schema}.</p></Section>
      </div>}
    </div>
  );
}
