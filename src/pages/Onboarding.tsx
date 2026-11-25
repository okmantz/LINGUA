import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AvatarConfig, PlacementResult } from '../core/types';
import { LANGUAGES } from '../content/registry';
import { useStore, DEFAULT_AVATAR } from '../state/store';
import { PlacementTest } from '../components/PlacementTest';
import { Avatar, TeacherAvatar } from '../components/Avatar';
import { CharacterPicker } from '../components/CharacterPicker';
import { Logo } from '../components/Logo';
import { Icon, type IconName } from '../components/Icon';
import { Btn, Card, Chip, Note, cx } from '../components/ui';

const MINUTES: [number, string][] = [[5, 'Quick'], [10, 'Light'], [15, 'Steady'], [20, 'Sweet spot'], [30, 'Focused'], [45, 'Serious'], [60, 'Intense'], [90, '30-day sprint'], [120, 'Full sprint']];
const HELLO: Record<string, string> = { es: '¡Hola!', fr: 'Bonjour !', de: 'Hallo!', it: 'Ciao!', pl: 'Cześć!', ru: 'Привет!', ko: '안녕!', ja: 'やあ', zh: '你好', ar: 'مرحبا', sw: 'Hujambo!', asl: '👋 HELLO' };

function Say({ children, mood = 'wave' }: { children: ReactNode; mood?: 'wave' | 'happy' | 'think' | 'cheer' }) {
  return (
    <div className="mb-5 flex items-end gap-3"><TeacherAvatar size={60} mood={mood} className="rounded-full ring-2 ring-accent/30" />
      <div className="relative rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-[0.95rem] leading-relaxed shadow-[var(--shadow)]">{children}</div></div>
  );
}
function Footer({ children }: { children: ReactNode }) {
  return <div className="safe-bottom sticky bottom-0 -mx-4 mt-6 flex items-center gap-2 border-t border-line bg-bg/90 px-4 py-3 backdrop-blur">{children}</div>;
}

export default function Onboarding() {
  const { createProfile } = useStore(); const nav = useNavigate();
  const [step, setStep] = useState(0); const [name, setName] = useState(''); const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [langs, setLangs] = useState<string[]>([]); const [minutes, setMinutes] = useState(15);
  const [results, setResults] = useState<Record<string, PlacementResult | undefined>>({}); const [li, setLi] = useState(0); const [testing, setTesting] = useState(false);
  const steps = ['Welcome', 'Character', 'Languages', 'Daily goal', 'Start'];
  const finish = async (res = results) => { await createProfile({ username: name.trim(), avatar, langs: langs.map((c) => ({ code: c, minutes, placement: res[c] })) }); nav('/'); };
  const VALUE: [IconName, string, string][] = [['shield', 'Private by design', 'Everything stays on your device. No account, no tracking.'], ['repeat', 'Built on memory research', 'Spaced repetition and retrieval practice, not streak-farming.'], ['chat', 'Conversation from day one', 'You speak and write real sentences right away.']];

  return (
    <div className="app-min-h safe-top">
      <div className="mx-auto max-w-xl px-4 pb-4 pt-6">
        <div className="mb-6 flex items-center justify-between"><Logo size={32} />{step > 0 && !testing && <span className="text-sm font-medium text-muted">Step {step} of {steps.length - 1}</span>}</div>
        {step > 0 && <div className="mb-6 flex gap-1.5" aria-label={`Step ${step} of ${steps.length - 1}`}>{steps.slice(1).map((s, i) => <div key={s} className={cx('h-1.5 flex-1 rounded-full transition-colors', i < step ? 'bg-accent' : 'bg-surface2')} />)}</div>}

        {step === 0 && (
          <div className="rise">
            <div className="hero mb-6 p-6 sm:p-8"><div className="relative z-10"><p className="text-sm font-semibold muted">Learn. <span className="text-accent">Speak.</span> Belong.</p><h1 className="mt-2 text-4xl font-extrabold leading-[1.1] tracking-tight">Learn a language the way memory actually works.</h1>
              <div className="mt-5 flex gap-2">{['¡Hola!', 'Ciao!', '你好', 'Привет!', '안녕!'].map((h) => <span key={h} className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{h}</span>)}</div></div></div>
            <Say>Hi, I'm your Teacher. I'll guide you step by step, so you always know what to do next. First, what should I call you?</Say>
            <label className="block text-sm font-semibold" htmlFor="uname">Your name</label>
            <input id="uname" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="e.g. Owen" autoComplete="given-name" className="mt-2 h-14 w-full rounded-2xl border border-line bg-surface px-4 text-lg outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" />
            <div className="mt-6 space-y-3">{VALUE.map(([ic, t, d]) => <div key={t} className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name={ic} size={20} /></span><div><p className="font-semibold leading-tight">{t}</p><p className="text-sm text-muted">{d}</p></div></div>)}</div>
            <Note>Realistic goal: 30 days of focused work builds a working foundation: real conversations on everyday topics. Nobody becomes fluent in 30 days, and LINGUA will tell you honestly where you stand.</Note>
            <Footer><Btn size="lg" className="w-full" disabled={name.trim().length < 2} onClick={() => setStep(1)}>Continue<Icon name="arrow" size={18} /></Btn></Footer>
          </div>
        )}
        {step === 1 && (
          <div className="rise"><Say mood="happy">Nice to meet you, {name.trim()}! Pick a character to learn with. Three more unlock as you progress.</Say>
            <CharacterPicker value={avatar.char} onChange={(char) => setAvatar({ char })} ctx={{ tier: 0, ach: {} }} />
            <Footer><Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn><Btn size="lg" className="flex-1" onClick={() => setStep(2)}>Continue</Btn></Footer></div>
        )}
        {step === 2 && (
          <div className="rise"><Say mood="think">Which language shall we start with? Each one keeps its own progress. Starting just one is the best way to make fast progress.</Say>
            <div className="grid gap-3">{LANGUAGES.map((l) => { const on = langs.includes(l.code); return (
              <button key={l.code} onClick={() => setLangs((x) => (on ? x.filter((c) => c !== l.code) : [...x, l.code]))} aria-pressed={on} className={cx('flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition active:scale-[.99]', on ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:bg-surface2')}>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface2 text-lg font-bold">{HELLO[l.code] ?? l.endonym.slice(0, 2)}</span>
                <div className="min-w-0 flex-1"><div className="flex items-baseline gap-2"><span className="text-xl font-extrabold">{l.endonym}</span><span className="text-muted">{l.name}</span></div><p className="mt-0.5 text-sm text-muted">{l.blurb}</p>{l.fsi && <p className="mt-1 text-xs text-muted">Difficulty for English speakers: {['', 'Easier', 'Moderate', 'Hard', 'Hardest'][l.fsi.category]} · about {l.fsi.hours} class hours to professional level</p>}</div>
                <span className={cx('grid h-7 w-7 shrink-0 place-items-center rounded-full border-2', on ? 'border-accent bg-accent text-accent-ink' : 'border-line')}>{on && <Icon name="check" size={15} strokeWidth={3} />}</span></button>); })}</div>
            <Footer><Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn><Btn size="lg" className="flex-1" disabled={!langs.length} onClick={() => setStep(3)}>Continue</Btn></Footer></div>
        )}
        {step === 3 && (
          <div className="rise"><Say>How much time can you give each day? Short and daily beats long and rare, and I'll build every session to fit.</Say>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{MINUTES.map(([m, label]) => <button key={m} onClick={() => setMinutes(m)} aria-pressed={minutes === m} className={cx('rounded-2xl border-2 px-4 py-3.5 text-left transition active:scale-[.98]', minutes === m ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:bg-surface2')}><span className="block text-2xl font-extrabold leading-none">{m}<span className="text-sm font-semibold text-muted"> min</span></span><span className="text-xs font-medium text-muted">{label}{m === 20 ? '' : ''}</span></button>)}</div>
            <p className="mt-3 text-sm text-muted">{minutes <= 10 ? 'A solid minimum: reviews plus a little new material.' : minutes <= 20 ? 'The sweet spot for most learners.' : minutes < 90 ? 'Great for faster progress. Sessions mix in listening, reading and writing.' : 'Sprint mode adds extra words, spaced replays of earlier days and extra retrieval practice. Split it into two or three sittings: spreading study out beats cramming. Even so, 30 days gives a working base, not fluency.'}</p>
            <Footer><Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn><Btn size="lg" className="flex-1" onClick={() => { setStep(4); setLi(0); setTesting(false); }}>Continue</Btn></Footer></div>
        )}
        {step === 4 && (() => {
          const code = langs[li]; const l = LANGUAGES.find((x) => x.code === code)!;
          const next = (res: Record<string, PlacementResult | undefined>) => { setResults(res); setTesting(false); if (li + 1 < langs.length) setLi(li + 1); else void finish(res); };
          if (testing) return <PlacementTest code={code} onCancel={() => setTesting(false)} onFinish={(r) => next({ ...results, [code]: r })} />;
          return (
            <div className="rise"><Say mood="happy">Last question{langs.length > 1 ? ` (${li + 1} of ${langs.length})` : ''}: how much {l.name} do you already know?</Say>
              <div className="grid gap-3">
                <button onClick={() => next({ ...results, [code]: undefined })} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-left transition hover:border-accent active:scale-[.99]"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon name="sparkles" size={22} /></span><span className="flex-1"><b className="block">I'm a complete beginner</b><span className="text-sm text-muted">Start the 30-day programme at day 1. Recommended if unsure.</span></span><Chip tone="accent">Best for most</Chip></button>
                <button onClick={() => setTesting(true)} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-left transition hover:border-accent active:scale-[.99]"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface2 text-muted"><Icon name="target" size={22} /></span><span className="flex-1"><b className="block">I know some {l.name}. Test me</b><span className="text-sm text-muted">An adaptive test of about 15–25 questions. It gets harder while you keep answering correctly, from A1 up to C2.</span></span></button>
              </div>
              <div className="mt-4"><Note>You can retake placement any time from My Languages.</Note></div>
              <Footer><Btn variant="ghost" onClick={() => setStep(3)}>Back</Btn><div className="ml-auto flex items-center gap-2"><Avatar cfg={avatar} size={32} /><span className="text-sm text-muted">{name}</span></div></Footer></div>
          );
        })()}
      </div>
    </div>
  );
}
