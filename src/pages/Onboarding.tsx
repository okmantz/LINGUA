import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AvatarConfig, PlacementResult } from '../core/types';
import { LANGUAGES } from '../content/registry';
import { useStore, DEFAULT_AVATAR } from '../state/store';
import { AvatarEditor } from './Profile';
import { PlacementTest } from '../components/PlacementTest';
import { Avatar } from '../components/Avatar';
import { Btn, Card, Chip, Note, cx } from '../components/ui';

const MINUTES = [5, 10, 15, 20, 30, 45, 60];

export default function Onboarding() {
  const { createProfile } = useStore(); const nav = useNavigate();
  const [step, setStep] = useState(0); const [name, setName] = useState(''); const [avatar, setAvatar] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [langs, setLangs] = useState<string[]>([]); const [minutes, setMinutes] = useState(15);
  const [results, setResults] = useState<Record<string, PlacementResult | undefined>>({}); const [li, setLi] = useState(0); const [testing, setTesting] = useState(false);
  const steps = ['Welcome', 'Avatar', 'Languages', 'Daily goal', 'Placement'];
  const finish = async (res = results) => { await createProfile({ username: name.trim(), avatar, langs: langs.map((c) => ({ code: c, minutes, placement: res[c] })) }); nav('/'); };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-1.5" aria-label={`Step ${step + 1} of ${steps.length}`}>{steps.map((s, i) => <div key={s} className={cx('h-1.5 flex-1 rounded-full', i <= step ? 'bg-accent' : 'bg-surface2')} />)}</div>
      {step === 0 && (
        <div>
          <h1 className="text-4xl font-bold tracking-tight">LINGUA</h1>
          <p className="mt-2 text-lg text-muted">Learn Spanish, French or German with methods that are backed by memory research: spaced repetition, retrieval practice, listening and reading input, and real conversation from day one.</p>
          <Card className="mt-5"><ul className="list-disc space-y-1.5 pl-5 text-sm"><li><b>Local-first.</b> Everything stays on this device. No account, no tracking.</li><li><b>Works offline</b> once loaded, and installs like an app.</li><li><b>Honest progress.</b> A word only counts as retained after you recall it on different days — never from a single right answer.</li><li><b>Realistic.</b> 30 days builds a solid beginner foundation for simple conversations; it does not make you fluent.</li></ul></Card>
          <label className="mt-6 block font-medium" htmlFor="uname">What should we call you?</label>
          <input id="uname" value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="Username" className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-lg outline-none focus:border-accent" />
          <Btn size="lg" className="mt-5" disabled={name.trim().length < 2} onClick={() => setStep(1)}>Continue</Btn>
        </div>
      )}
      {step === 1 && (
        <div><h2 className="text-2xl font-bold">Make your avatar</h2><p className="mb-4 text-muted">More items unlock as you demonstrate real mastery.</p>
          <AvatarEditor value={avatar} onChange={setAvatar} tier={0} ach={{}} />
          <div className="mt-5 flex gap-2"><Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn><Btn onClick={() => setStep(2)}>Continue</Btn></div></div>
      )}
      {step === 2 && (
        <div><h2 className="text-2xl font-bold">Which languages?</h2><p className="mb-4 text-muted">Pick one or more. Each language keeps completely separate progress, vocabulary and reviews.</p>
          <div className="grid gap-3">{LANGUAGES.map((l) => { const on = langs.includes(l.code); return (
            <button key={l.code} onClick={() => setLangs((x) => (on ? x.filter((c) => c !== l.code) : [...x, l.code]))} aria-pressed={on} className={cx('rounded-2xl border p-4 text-left transition', on ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:bg-surface2')}>
              <div className="flex items-baseline gap-2"><span className="text-xl font-bold">{l.endonym}</span><span className="text-muted">{l.name}</span>{on && <Chip tone="accent" className="ml-auto">Selected</Chip>}</div><p className="mt-1 text-sm text-muted">{l.blurb}</p></button>); })}</div>
          <p className="mt-3 text-sm text-muted">Tip: starting one language well beats starting three. You can add more later.</p>
          <div className="mt-5 flex gap-2"><Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn><Btn disabled={!langs.length} onClick={() => setStep(3)}>Continue</Btn></div></div>
      )}
      {step === 3 && (
        <div><h2 className="text-2xl font-bold">Daily goal</h2><p className="mb-4 text-muted">Short and daily beats long and rare. Your sessions are built to fit this time.</p>
          <div className="flex flex-wrap gap-2">{MINUTES.map((m) => <button key={m} onClick={() => setMinutes(m)} aria-pressed={minutes === m} className={cx('rounded-xl border px-4 py-3 text-lg font-medium', minutes === m ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface hover:bg-surface2')}>{m} min</button>)}</div>
          <p className="mt-3 text-sm text-muted">{minutes <= 10 ? 'A solid minimum: reviews plus a little new material.' : minutes <= 20 ? 'The sweet spot for most learners.' : 'Great for faster progress — mix in listening, reading and writing.'}</p>
          <div className="mt-5 flex gap-2"><Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn><Btn onClick={() => { setStep(4); setLi(0); setTesting(false); }}>Continue</Btn></div></div>
      )}
      {step === 4 && (() => {
        const code = langs[li]; const l = LANGUAGES.find((x) => x.code === code)!;
        const next = (res: Record<string, PlacementResult | undefined>) => { setResults(res); setTesting(false); if (li + 1 < langs.length) setLi(li + 1); else void finish(res); };
        if (testing) return <PlacementTest code={code} onCancel={() => setTesting(false)} onFinish={(r) => next({ ...results, [code]: r })} />;
        return (
          <div><h2 className="text-2xl font-bold">{l.name}: where do you start?</h2><p className="mb-4 text-muted">Language {li + 1} of {langs.length}</p>
            <div className="grid gap-3">
              <button onClick={() => next({ ...results, [code]: undefined })} className="rounded-2xl border border-line bg-surface p-4 text-left hover:bg-surface2"><b>I'm a complete beginner</b><p className="text-sm text-muted">Start the 30-day programme at day 1.</p></button>
              <button onClick={() => setTesting(true)} className="rounded-2xl border border-line bg-surface p-4 text-left hover:bg-surface2"><b>I know some {l.name} — test me</b><p className="text-sm text-muted">An adaptive 5–10 minute test of vocabulary, grammar, reading, listening and sentence building. It gets harder while you keep answering correctly.</p></button>
            </div>
            <Note>You can retake placement any time from My Languages.</Note>
            <div className="mt-5 flex items-center gap-3"><Btn variant="ghost" onClick={() => setStep(3)}>Back</Btn><Avatar cfg={avatar} size={36} /><span className="text-sm text-muted">{name}</span></div></div>
        );
      })()}
    </div>
  );
}
