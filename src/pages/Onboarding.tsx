import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AvatarConfig, PlacementResult } from '../core/types';
import { LANGUAGES } from '../content/registry';
import { useStore, DEFAULT_AVATAR } from '../state/store';
import { PlacementTest } from '../components/PlacementTest';
import { Avatar, TeacherAvatar } from '../components/Avatar';
import { CharacterPicker } from '../components/CharacterPicker';
import { LogoMark } from '../components/Logo';
import { Icon, type IconName } from '../components/Icon';
import { Btn, Chip, Note, cx } from '../components/ui';

const MINUTES: [number, string][] = [[5, 'Quick'], [10, 'Light'], [15, 'Steady'], [20, 'Sweet spot'], [30, 'Focused'], [45, 'Serious'], [60, 'Intense'], [90, '30-day sprint'], [120, 'Full sprint']];
const HELLO: Record<string, string> = { es: '¡Hola!', fr: 'Bonjour', de: 'Hallo', it: 'Ciao', pl: 'Cześć', ru: 'Привет', ko: '안녕', ja: 'やあ', zh: '你好', ar: 'مرحبا', sw: 'Hujambo', asl: '👋' };
const VALUE: [IconName, string, string][] = [['shield', 'Private by design', 'Everything stays on your device. No account, no tracking.'], ['repeat', 'Built on memory research', 'Spaced repetition and retrieval practice, not streak-farming.'], ['chat', 'Conversation from day one', 'You speak and write real sentences right away.']];
const STEPS = ['Welcome', 'Character', 'Language', 'Daily goal', 'Start'];

function Say({ children, mood = 'wave' }: { children: ReactNode; mood?: 'wave' | 'happy' | 'think' | 'cheer' }) {
  return (
    <div className="mb-6 flex items-end gap-3"><TeacherAvatar size={56} mood={mood} className="rounded-full ring-2 ring-accent/30" />
      <div className="relative rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-[0.95rem] leading-relaxed shadow-[var(--shadow)]">{children}</div></div>
  );
}
function Footer({ children }: { children: ReactNode }) {
  return <div className="sticky bottom-0 -mx-5 mt-8 flex items-center gap-2.5 border-t border-line bg-bg/85 px-5 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur-lg sm:-mx-10 sm:px-10">{children}</div>;
}
const Choice = ({ on, onClick, children, className }: { on: boolean; onClick: () => void; children: ReactNode; className?: string }) => (
  <button onClick={onClick} aria-pressed={on} className={cx('rounded-2xl border-2 text-left transition duration-150 active:scale-[.99]', on ? 'border-accent bg-accent/10 shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_14%,transparent)]' : 'border-line bg-surface hover:border-line-strong hover:bg-surface2/60', className)}>{children}</button>
);

export default function Onboarding() {
  const { createProfile } = useStore(); const nav = useNavigate();
  const [step, setStep] = useState(0); const [name, setName] = useState(''); const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [langs, setLangs] = useState<string[]>([]); const [minutes, setMinutes] = useState(15);
  const [results, setResults] = useState<Record<string, PlacementResult | undefined>>({}); const [li, setLi] = useState(0); const [testing, setTesting] = useState(false);
  const finish = async (res = results) => { await createProfile({ username: name.trim(), avatar, langs: langs.map((c) => ({ code: c, minutes, placement: res[c] })) }); nav('/'); };

  return (
    <div className="app-min-h lg:grid lg:grid-cols-[5fr_6fr]">
      {/* Brand panel (desktop) */}
      <aside className="hero hidden flex-col justify-between !rounded-none p-12 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:self-start xl:p-16">
        <div className="flex items-center gap-3"><LogoMark size={40} /><span className="text-2xl font-extrabold tracking-[-0.03em]">Lingua</span></div>
        <div>
          <p className="eyebrow !text-white/65">Learn. Speak. Belong.</p>
          <h1 className="mt-3 text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.035em] xl:text-5xl">Learn a language the way memory actually works.</h1>
          <div className="mt-6 flex flex-wrap gap-2">{['¡Hola!', 'Ciao', '你好', 'Привет', '안녕', 'مرحبا', 'Hujambo'].map((h) => <span key={h} className="rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/15 backdrop-blur">{h}</span>)}</div>
          <ul className="mt-10 space-y-5">{VALUE.map(([ic, t, d]) => <li key={t} className="flex items-start gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/12 ring-1 ring-white/15"><Icon name={ic} size={20} /></span><div><p className="font-bold leading-tight">{t}</p><p className="mt-0.5 text-sm muted">{d}</p></div></li>)}</ul>
        </div>
        <p className="max-w-sm text-sm leading-relaxed muted">Free, local-first and offline-capable. 30 days of focused work builds a working foundation, not fluency, and LINGUA will always tell you honestly where you stand.</p>
      </aside>

      <div className="safe-top min-w-0">
        <div className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-0 pt-6 sm:px-10 lg:pt-10">
          <div className="mb-6 flex items-center justify-between lg:mb-8">
            <div className="flex items-center gap-2.5 lg:invisible"><LogoMark size={32} /><span className="text-xl font-extrabold tracking-[-0.03em]">Lingua</span></div>
            {step > 0 && !testing && <span className="tabular text-sm font-semibold text-muted">Step {step} of {STEPS.length - 1}</span>}
          </div>
          {step > 0 && <div className="mb-8" aria-label={`Step ${step} of ${STEPS.length - 1}: ${STEPS[step]}`}>
            <div className="flex gap-1.5">{STEPS.slice(1).map((s, i) => <div key={s} className={cx('h-1.5 flex-1 rounded-full transition-colors duration-500', i < step ? 'bg-accent' : 'bg-surface3')} />)}</div>
            <div className="mt-2 hidden justify-between text-xs font-semibold text-faint sm:flex">{STEPS.slice(1).map((s, i) => <span key={s} className={cx(i + 1 === step && 'text-ink')}>{s}</span>)}</div>
          </div>}

          <div className="flex-1">
            {step === 0 && (
              <div className="rise">
                <div className="hero mb-7 p-6 lg:hidden"><p className="eyebrow !text-white/65">Learn. Speak. Belong.</p><h1 className="mt-2 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Learn a language the way memory actually works.</h1>
                  <div className="mt-4 flex flex-wrap gap-2">{['¡Hola!', 'Ciao', '你好', 'Привет', '안녕'].map((h) => <span key={h} className="rounded-full bg-white/14 px-3 py-1 text-sm font-semibold">{h}</span>)}</div></div>
                <h2 className="mb-1 hidden text-2xl font-extrabold tracking-tight lg:block">Welcome</h2>
                <Say>Hi, I'm your Teacher. I'll guide you step by step, so you always know what to do next. First, what should I call you?</Say>
                <label className="block text-sm font-bold" htmlFor="uname">Your name</label>
                <input id="uname" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && name.trim().length >= 2) setStep(1); }} maxLength={24} placeholder="e.g. Owen" autoComplete="given-name" className="mt-2 h-14 w-full rounded-2xl border border-line-strong bg-surface px-4 text-lg outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" />
                <ul className="mt-7 space-y-4 lg:hidden">{VALUE.map(([ic, t, d]) => <li key={t} className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/14 text-accent-strong"><Icon name={ic} size={20} /></span><div><p className="font-bold leading-tight">{t}</p><p className="text-sm text-muted">{d}</p></div></li>)}</ul>
                <div className="mt-6 lg:hidden"><Note>Realistic goal: 30 days of focused work builds a working foundation, not fluency. LINGUA will tell you honestly where you stand.</Note></div>
                <Footer><Btn size="lg" className="w-full" disabled={name.trim().length < 2} onClick={() => setStep(1)}>Continue<Icon name="arrow" size={18} /></Btn></Footer>
              </div>
            )}
            {step === 1 && (
              <div className="rise"><Say mood="happy">Nice to meet you, {name.trim()}! Pick a character to learn with. Three more unlock as you progress.</Say>
                <CharacterPicker value={avatar.char} onChange={(char) => setAvatar({ char })} ctx={{ tier: 0, ach: {} }} />
                <Footer><Btn variant="ghost" size="lg" onClick={() => setStep(0)}>Back</Btn><Btn size="lg" className="flex-1" onClick={() => setStep(2)}>Continue<Icon name="arrow" size={18} /></Btn></Footer></div>
            )}
            {step === 2 && (
              <div className="rise"><Say mood="think">Which language shall we start with? Each one keeps its own progress. Starting just one is the best way to make fast progress.</Say>
                <div className="grid gap-3 sm:grid-cols-2">{LANGUAGES.map((l) => { const on = langs.includes(l.code); return (
                  <Choice key={l.code} on={on} onClick={() => setLangs((x) => (on ? x.filter((c) => c !== l.code) : [...x, l.code]))} className="relative flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-3">
                      <span className={cx('grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface2 font-extrabold leading-none', (HELLO[l.code] ?? l.endonym.slice(0, 2)).length > 5 ? 'text-[0.66rem]' : (HELLO[l.code] ?? l.endonym.slice(0, 2)).length > 3 ? 'text-[0.8rem]' : 'text-[1.05rem]')}>{HELLO[l.code] ?? l.endonym.slice(0, 2)}</span>
                      <div className="min-w-0 flex-1 leading-tight"><p className="truncate text-lg font-extrabold tracking-tight">{l.endonym}</p><p className="text-sm text-muted">{l.name}</p></div>
                      <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition', on ? 'border-accent bg-accent text-accent-ink' : 'border-line-strong')}>{on && <Icon name="check" size={14} strokeWidth={3} />}</span>
                    </div>
                    <p className="text-sm leading-snug text-muted">{l.blurb}</p>
                    {l.fsi && <p className="mt-auto"><Chip tone={l.fsi.category <= 1 ? 'good' : l.fsi.category === 2 ? 'accent' : 'warn'}>{['', 'Easier', 'Moderate', 'Hard', 'Hardest'][l.fsi.category]} · ~{l.fsi.hours} h</Chip></p>}
                  </Choice>); })}</div>
                <p className="mt-4 text-xs text-muted">Difficulty is for English speakers: roughly the class hours to reach professional level.</p>
                <Footer><Btn variant="ghost" size="lg" onClick={() => setStep(1)}>Back</Btn><Btn size="lg" className="flex-1" disabled={!langs.length} onClick={() => setStep(3)}>{langs.length > 1 ? `Continue with ${langs.length} languages` : 'Continue'}<Icon name="arrow" size={18} /></Btn></Footer></div>
            )}
            {step === 3 && (
              <div className="rise"><Say>How much time can you give each day? Short and daily beats long and rare, and I'll build every session to fit.</Say>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{MINUTES.map(([m, label]) => <Choice key={m} on={minutes === m} onClick={() => setMinutes(m)} className="px-4 py-3.5"><span className="block text-2xl font-extrabold leading-none tracking-tight">{m}<span className="text-sm font-semibold text-muted"> min</span></span><span className="mt-1 block text-xs font-semibold text-muted">{label}</span></Choice>)}</div>
                <div className="mt-4"><Note>{minutes <= 10 ? 'A solid minimum: reviews plus a little new material.' : minutes <= 20 ? 'The sweet spot for most learners.' : minutes < 90 ? 'Great for faster progress. Sessions mix in listening, reading and writing.' : 'Sprint mode adds extra words, spaced replays of earlier days and extra retrieval practice. Split it into two or three sittings: spreading study out beats cramming. Even so, 30 days gives a working base, not fluency.'}</Note></div>
                <Footer><Btn variant="ghost" size="lg" onClick={() => setStep(2)}>Back</Btn><Btn size="lg" className="flex-1" onClick={() => { setStep(4); setLi(0); setTesting(false); }}>Continue<Icon name="arrow" size={18} /></Btn></Footer></div>
            )}
            {step === 4 && (() => {
              const code = langs[li]; const l = LANGUAGES.find((x) => x.code === code)!;
              const next = (res: Record<string, PlacementResult | undefined>) => { setResults(res); setTesting(false); if (li + 1 < langs.length) setLi(li + 1); else void finish(res); };
              if (testing) return <PlacementTest code={code} onCancel={() => setTesting(false)} onFinish={(r) => next({ ...results, [code]: r })} />;
              return (
                <div className="rise"><Say mood="happy">Last question{langs.length > 1 ? ` (${li + 1} of ${langs.length})` : ''}: how much {l.name} do you already know?</Say>
                  <div className="grid gap-3">
                    <Choice on={false} onClick={() => next({ ...results, [code]: undefined })} className="flex items-center gap-4 p-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/14 text-accent-strong"><Icon name="sparkles" size={22} /></span><span className="flex-1"><b className="block">I'm a complete beginner</b><span className="text-sm text-muted">Start the 30-day programme at day 1. Recommended if unsure.</span></span><Chip tone="accent" className="hidden sm:inline-flex">Best for most</Chip></Choice>
                    <Choice on={false} onClick={() => setTesting(true)} className="flex items-center gap-4 p-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface2 text-muted"><Icon name="target" size={22} /></span><span className="flex-1"><b className="block">I know some {l.name}. Test me</b><span className="text-sm text-muted">An adaptive test of about 15–25 questions. It gets harder while you keep answering correctly, from A1 up to C2.</span></span></Choice>
                  </div>
                  <div className="mt-4"><Note>You can retake placement any time from My Languages.</Note></div>
                  <Footer><Btn variant="ghost" size="lg" onClick={() => setStep(3)}>Back</Btn><div className="ml-auto flex items-center gap-2.5"><Avatar cfg={avatar} size={34} /><span className="text-sm font-semibold text-muted">{name}</span></div></Footer></div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
