import { useRef, useState } from 'react';
import type { AvatarConfig } from '../core/types';
import { ACCENTS, ACCESSORIES, BACKGROUNDS, BG_GRADIENTS, EYES, HAIR, HAIR_COLORS, MOUTHS, OUTFITS, OUTFIT_COLORS, SKINS, isUnlocked, type Part } from '../core/cosmetics';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { IMMERSION_LABELS } from '../state/hooks';
import { Avatar } from '../components/Avatar';
import { Btn, Card, Chip, H1, Note, cx } from '../components/ui';

function Swatches({ label, colors, value, onChange }: { label: string; colors: string[]; value: number; onChange: (n: number) => void }) {
  return (<div className="mb-3"><p className="mb-1.5 text-sm font-medium">{label}</p><div className="flex flex-wrap gap-2">{colors.map((c, i) => <button key={i} aria-label={`${label} ${i + 1}`} aria-pressed={value === i} onClick={() => onChange(i)} className={cx('h-8 w-8 rounded-full border-2', value === i ? 'border-accent scale-110' : 'border-line')} style={{ background: c }} />)}</div></div>);
}
function Parts({ label, parts, value, onChange, ctx }: { label: string; parts: Part[]; value: number; onChange: (n: number) => void; ctx: { tier: number; ach: Record<string, number> } }) {
  return (<div className="mb-3"><p className="mb-1.5 text-sm font-medium">{label}</p><div className="flex flex-wrap gap-1.5">{parts.map((p) => { const ok = isUnlocked(p, ctx); return (
    <button key={p.id} disabled={!ok} title={ok ? p.name : `Locked — ${p.unlock?.label}`} aria-pressed={value === p.id} onClick={() => onChange(p.id)} className={cx('rounded-lg border px-2.5 py-1 text-sm', value === p.id ? 'border-accent bg-accent/15' : 'border-line bg-surface', !ok && 'opacity-50')}>{ok ? p.name : `🔒 ${p.name}`}{!ok && <span className="ml-1 text-xs text-muted">({p.unlock?.label})</span>}</button>); })}</div></div>);
}
export function AvatarEditor({ value, onChange, tier, ach }: { value: AvatarConfig; onChange: (a: AvatarConfig) => void; tier: number; ach: Record<string, number> }) {
  const set = (k: keyof AvatarConfig) => (n: number) => onChange({ ...value, [k]: n }); const ctx = { tier, ach };
  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
      <div className="mx-auto"><Avatar cfg={value} size={150} /></div>
      <div>
        <Swatches label="Skin" colors={SKINS} value={value.skin} onChange={set('skin')} />
        <Swatches label="Hair colour" colors={HAIR_COLORS} value={value.hairColor} onChange={set('hairColor')} />
        <Parts label="Hair" parts={HAIR} value={value.hair} onChange={set('hair')} ctx={ctx} />
        <Parts label="Eyes" parts={EYES} value={value.eyes} onChange={set('eyes')} ctx={ctx} />
        <Parts label="Mouth" parts={MOUTHS} value={value.mouth} onChange={set('mouth')} ctx={ctx} />
        <Parts label="Accessory" parts={ACCESSORIES} value={value.accessory} onChange={set('accessory')} ctx={ctx} />
        <Parts label="Outfit" parts={OUTFITS} value={value.outfit} onChange={set('outfit')} ctx={ctx} />
        <div className="mb-3"><p className="mb-1.5 text-sm font-medium">Background</p><div className="flex flex-wrap gap-2">{BACKGROUNDS.map((b) => { const ok = isUnlocked(b, ctx); const [g1, g2] = BG_GRADIENTS[b.id]; return <button key={b.id} disabled={!ok} title={ok ? b.name : `Locked — ${b.unlock?.label}`} aria-label={b.name} aria-pressed={value.bg === b.id} onClick={() => set('bg')(b.id)} className={cx('h-9 w-9 rounded-lg border-2', value.bg === b.id ? 'border-accent' : 'border-line', !ok && 'opacity-40')} style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}>{!ok && '🔒'}</button>; })}</div></div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const store = useStore(); const { profile, state, stats, lang } = store; const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null); const [name, setName] = useState(profile!.username);
  const p = profile!; const tier = stats?.tier.index ?? 0; const s = p.settings;
  const onFile = async (f?: File) => { if (!f) return; try { await store.doImport(await f.text()); setMsg({ ok: true, t: 'Backup restored.' }); } catch (e: any) { setMsg({ ok: false, t: `Import failed: ${e.message ?? e}` }); } };
  const notif = async () => { if (!('Notification' in window)) { setMsg({ ok: false, t: 'This browser does not support notifications.' }); return; } const r = await Notification.requestPermission(); store.updateSettings({ reminders: r === 'granted' }); setMsg(r === 'granted' ? { ok: true, t: 'Reminders on — they appear while LINGUA is open or installed and running.' } : { ok: false, t: 'Notification permission was not granted.' }); };
  return (
    <div className="space-y-5">
      <H1>Profile & settings</H1>
      <Card><h2 className="mb-3 text-lg font-semibold">You</h2>
        <div className="mb-4 flex items-center gap-3"><label className="text-sm font-medium" htmlFor="un">Username</label><input id="un" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} onBlur={() => name.trim().length >= 2 && store.patchProfile((x) => ({ ...x, username: name.trim() }))} className="rounded-lg border border-line bg-surface px-3 py-1.5" /></div>
        <AvatarEditor value={p.avatar} onChange={(a) => store.patchProfile((x) => ({ ...x, avatar: a }))} tier={tier} ach={p.achievements} />
        <p className="mt-2 text-xs text-muted">Items unlock from demonstrated mastery (tier and achievements) — not from time spent.</p></Card>
      <Card><h2 className="mb-3 text-lg font-semibold">Appearance</h2>
        <p className="mb-1.5 text-sm font-medium">Theme</p><div className="mb-3 flex gap-2">{(['system', 'light', 'dark'] as const).map((m) => <Btn key={m} size="sm" variant={s.mode === m ? 'primary' : 'ghost'} onClick={() => store.updateSettings({ mode: m })}>{m[0].toUpperCase() + m.slice(1)}</Btn>)}</div>
        <p className="mb-1.5 text-sm font-medium">Accent colour</p><div className="mb-3 flex flex-wrap gap-2">{ACCENTS.map((a) => { const ok = !a.unlock || tier >= a.unlock.tier; return <button key={a.id} disabled={!ok} title={ok ? a.name : `Locked — ${a.unlock?.label}`} aria-label={a.name} aria-pressed={s.accent === a.id} onClick={() => store.updateSettings({ accent: a.id })} className={cx('h-9 w-9 rounded-full border-2', s.accent === a.id ? 'border-ink' : 'border-line', !ok && 'opacity-40')} style={{ background: a.hex }}>{!ok && '🔒'}</button>; })}</div>
        <label className="mb-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={s.largeText} onChange={(e) => store.updateSettings({ largeText: e.target.checked })} />Larger text</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.reducedMotion} onChange={(e) => store.updateSettings({ reducedMotion: e.target.checked })} />Reduce motion</label></Card>
      <Card><h2 className="mb-3 text-lg font-semibold">Learning</h2>
        <label className="mb-3 block text-sm font-medium">Speech speed: {s.ttsRate.toFixed(2)}×<input type="range" min={0.5} max={1.2} step={0.05} value={s.ttsRate} onChange={(e) => store.updateSettings({ ttsRate: Number(e.target.value) })} className="mt-1 block w-full max-w-xs" /></label>
        <label className="mb-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={s.showRomanization} onChange={(e) => store.updateSettings({ showRomanization: e.target.checked })} />Show pronunciation respelling on word cards</label>
        {Object.values(p.languages).map((l) => { const cfg = LANGUAGES.find((x) => x.code === l.code)!; return (
          <div key={l.code} className="mb-3 rounded-xl border border-line p-3"><p className="font-medium">{cfg.name}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm"><span className="text-muted">Daily goal</span>{[5, 10, 15, 20, 30, 45, 60].map((m) => <button key={m} onClick={() => store.patchLang(l.code, (x) => ({ ...x, dailyMinutes: m }))} className={cx('rounded-lg px-2 py-1', l.dailyMinutes === m ? 'bg-accent text-accent-ink font-semibold' : 'bg-surface2')}>{m}</button>)}</div>
            <div className="mt-2 text-sm"><span className="text-muted">Immersion</span> <label className="ml-2"><input type="checkbox" checked={l.immersionAuto} onChange={(e) => store.patchLang(l.code, (x) => ({ ...x, immersionAuto: e.target.checked }))} /> Auto</label>
              {!l.immersionAuto && <div className="mt-1 flex gap-1">{[0, 1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => store.patchLang(l.code, (x) => ({ ...x, immersion: n }))} className={cx('h-8 w-8 rounded-lg', l.immersion === n ? 'bg-accent text-accent-ink font-semibold' : 'bg-surface2')}>{n}</button>)}</div>}
              <p className="mt-1 text-xs text-muted">{IMMERSION_LABELS[l.immersion]}</p></div></div>); })}</Card>
      <Card><h2 className="mb-2 text-lg font-semibold">Reminders</h2>
        <p className="mb-2 text-sm text-muted">Browser notifications only fire while LINGUA is open (or the installed app is running). There is no server, so we cannot send background push messages.</p>
        <div className="flex flex-wrap items-center gap-3">{s.reminders ? <><Chip tone="good">On</Chip><input type="time" value={s.reminderTime} onChange={(e) => store.updateSettings({ reminderTime: e.target.value })} className="rounded-lg border border-line bg-surface px-2 py-1" aria-label="Reminder time" /><Btn size="sm" variant="ghost" onClick={() => store.updateSettings({ reminders: false })}>Turn off</Btn></> : <Btn size="sm" onClick={() => void notif()}>Enable reminders</Btn>}</div></Card>
      <Card><h2 className="mb-2 text-lg font-semibold">Your data</h2>
        <p className="text-sm text-muted">Stored only in this browser (IndexedDB). {store.persisted ? 'The browser has granted persistent storage.' : 'Persistent storage was not granted, so the browser may clear data under storage pressure — export backups regularly.'} Cloud sync is not available; use backup files to move between devices.</p>
        {p.lastBackup && <p className="mt-1 text-sm">Last backup: {new Date(p.lastBackup).toLocaleString()}</p>}
        <div className="mt-3 flex flex-wrap gap-2"><Btn onClick={() => void store.doExport()}>Export backup (JSON)</Btn><Btn variant="ghost" onClick={() => file.current?.click()}>Import backup…</Btn><input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ''; }} /></div>
        {msg && <div className="mt-3"><Note tone={msg.ok ? 'info' : 'warn'}>{msg.t}</Note></div>}
        <p className="mt-2 text-xs text-muted">Importing replaces everything currently stored.</p>
        <div className="mt-4 border-t border-line pt-3"><Btn variant="danger" size="sm" onClick={() => { if (confirm('Delete ALL data on this device? Export a backup first if you want to keep it.') && confirm('This cannot be undone. Really delete?')) void store.doWipe(); }}>Delete all data</Btn></div></Card>
      <Card><h2 className="mb-2 text-lg font-semibold">About the honesty of this app</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted"><li>Audio is your browser's text-to-speech, not recordings of native speakers.</li><li>Writing and open conversation are checked by keywords and length, not by an AI grader.</li><li>Speech recognition comes from your browser and may send audio to its vendor.</li><li>Placement measures A1–B2; C1/C2 need an examiner.</li><li>Built-in content is a focused starter core ({state ? 'see Vocabulary for the exact size' : ''}); the app tells you when a level has no material yet.</li></ul>
        <p className="mt-2 text-xs text-muted">Active language: {lang}. Data schema v{p.schema}.</p></Card>
    </div>
  );
}
