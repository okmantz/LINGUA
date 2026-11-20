import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { computeStats } from '../core/analytics';
import { PROGRAM_LENGTH } from '../core/program';
import type { PlacementResult } from '../core/types';
import { PlacementTest } from '../components/PlacementTest';
import { Btn, Card, Chip, H1, Note, Progress } from '../components/ui';

export default function Languages() {
  const store = useStore(); const p = store.profile!; const nav = useNavigate();
  const [test, setTest] = useState<{ code: string; add: boolean } | null>(null);
  if (test) return <PlacementTest code={test.code} onCancel={() => setTest(null)} onFinish={(r: PlacementResult) => {
    if (test.add) void store.addLanguage(test.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15, r);
    else store.patchLang(test.code, (s) => { const fresh = Object.keys(s.programDone).length === 0; return { ...s, placement: r, ...(fresh ? { programDay: r.skipProgram ? PROGRAM_LENGTH + 1 : Math.max(1, r.startDay), pathLevel: r.skipProgram ? r.overall : s.pathLevel } : {}) }; });
    setTest(null); nav('/');
  }} />;
  const mine = LANGUAGES.filter((l) => p.languages[l.code]); const rest = LANGUAGES.filter((l) => !p.languages[l.code]);
  return (
    <div>
      <H1 sub="Each language has its own independent progress, vocabulary, reviews and assessments.">My Languages</H1>
      <div className="space-y-4">{mine.map((l) => { const s = p.languages[l.code]; const c = store.contents[l.code]; const st = c ? computeStats(s, c, store.cardMap.size ? [...store.cardMap.values()].filter((x) => x.lang === l.code) : [], []) : null; const active = p.activeLang === l.code; return (
        <Card key={l.code} className={active ? 'border-accent' : ''}>
          <div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-bold">{l.endonym}</h2><span className="text-muted">{l.name}</span>{active && <Chip tone="accent">Active</Chip>}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm"><Chip>{s.xp} XP</Chip><Chip>🔥 {s.streak.current}</Chip><Chip>{s.dailyMinutes} min/day</Chip>{s.placement && <Chip>placed {s.placement.overall}</Chip>}{st && <Chip>{st.retainedPlus} words retained</Chip>}</div>
          {s.programDay <= PROGRAM_LENGTH && !s.placement?.skipProgram ? <><Progress value={Object.keys(s.programDone).length / PROGRAM_LENGTH} className="mt-3" label="Programme" /><p className="mt-1 text-xs text-muted">Programme day {s.programDay} of {PROGRAM_LENGTH}</p></> : <p className="mt-3 text-sm text-muted">{s.placement?.skipProgram ? 'Skipped the beginner programme via placement.' : 'Programme complete.'} Pathway level: {s.pathLevel}</p>}
          <div className="mt-3 flex flex-wrap gap-2">{!active && <Btn size="sm" onClick={() => store.setActiveLang(l.code)}>Switch to {l.name}</Btn>}<Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: false })}>Retake placement</Btn></div>
        </Card>); })}</div>
      {rest.length > 0 && <><h2 className="mb-3 mt-8 text-lg font-semibold">Add a language</h2><div className="grid gap-3">{rest.map((l) => (
        <Card key={l.code}><div className="flex flex-wrap items-baseline gap-2"><h3 className="text-lg font-bold">{l.endonym}</h3><span className="text-muted">{l.name}</span></div><p className="mt-1 text-sm text-muted">{l.blurb}</p>{l.fsi && <p className="mt-1 text-xs text-muted">{['', 'Easier', 'Moderate', 'Hard', 'Hardest'][l.fsi.category]} for English speakers (about {l.fsi.hours} class hours to professional level). {l.outcome}</p>}
          <div className="mt-3 flex flex-wrap gap-2"><Btn size="sm" onClick={() => { void store.addLanguage(l.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15); nav('/'); }}>Start from zero</Btn><Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: true })}>Take placement test</Btn></div></Card>))}</div></>}
      <div className="mt-6"><Note>Adding more languages to the app itself is a content task: drop a folder into <code>src/content</code> and register it — see docs/ADDING_CONTENT.md. Content for newer languages is machine-drafted and should be reviewed by a speaker.</Note></div>
    </div>
  );
}
