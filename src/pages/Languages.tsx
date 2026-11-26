import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { computeStats } from '../core/analytics';
import { PROGRAM_LENGTH } from '../core/program';
import type { PlacementResult } from '../core/types';
import { PlacementTest } from '../components/PlacementTest';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, H1, Note, Progress, SectionTitle, cx } from '../components/ui';

export default function Languages() {
  const store = useStore(); const p = store.profile!; const nav = useNavigate();
  const [test, setTest] = useState<{ code: string; add: boolean } | null>(null);
  if (test) return <PlacementTest code={test.code} onCancel={() => setTest(null)} onFinish={(r: PlacementResult) => {
    if (test.add) void store.addLanguage(test.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15, r);
    else store.patchLang(test.code, (s) => { const fresh = Object.keys(s.programDone).length === 0; return { ...s, placement: r, ...(fresh ? { programDay: r.skipProgram ? PROGRAM_LENGTH + 1 : Math.max(1, r.startDay), pathLevel: r.skipProgram ? r.overall : s.pathLevel } : {}) }; });
    setTest(null); nav('/');
  }} />;
  const mine = LANGUAGES.filter((l) => p.languages[l.code]); const rest = LANGUAGES.filter((l) => !p.languages[l.code]);
  const level = ['', 'Easier', 'Moderate', 'Hard', 'Hardest'];
  return (
    <div>
      <H1 eyebrow="Languages" sub="Each language has its own independent progress, vocabulary, reviews and assessments.">My languages</H1>
      <div className="grid gap-4 md:grid-cols-2">{mine.map((l) => { const s = p.languages[l.code]; const c = store.contents[l.code]; const st = c ? computeStats(s, c, store.cardMap.size ? [...store.cardMap.values()].filter((x) => x.lang === l.code) : [], []) : null; const active = p.activeLang === l.code; return (
        <Card key={l.code} className={cx('flex flex-col', active && 'border-accent/60 shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_12%,transparent),var(--shadow)]')}>
          <div className="flex items-start gap-3"><div className="min-w-0 flex-1"><h2 className="text-2xl font-extrabold leading-tight tracking-tight">{l.endonym}</h2><p className="text-sm text-muted">{l.name}</p></div>{active && <Chip tone="accent"><Icon name="check" size={12} strokeWidth={3} />Active</Chip>}</div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-surface2 px-2 py-2.5"><p className="tabular text-lg font-extrabold leading-none">{s.xp}</p><p className="mt-1 text-[11px] font-semibold text-muted">XP</p></div>
            <div className="rounded-xl bg-surface2 px-2 py-2.5"><p className="tabular flex items-center justify-center gap-1 text-lg font-extrabold leading-none"><Icon name="flame" size={15} className="text-warn" />{s.streak.current}</p><p className="mt-1 text-[11px] font-semibold text-muted">Streak</p></div>
            <div className="rounded-xl bg-surface2 px-2 py-2.5"><p className="tabular text-lg font-extrabold leading-none">{st ? st.retainedPlus : '–'}</p><p className="mt-1 text-[11px] font-semibold text-muted">Words kept</p></div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5"><Chip><Icon name="clock" size={12} />{s.dailyMinutes} min/day</Chip>{s.placement && <Chip>Placed {s.placement.overall}</Chip>}</div>
          {s.programDay <= PROGRAM_LENGTH && !s.placement?.skipProgram ? <div className="mt-4"><Progress value={Object.keys(s.programDone).length / PROGRAM_LENGTH} label="Programme" /><p className="mt-1.5 text-xs text-muted">Programme day {s.programDay} of {PROGRAM_LENGTH}</p></div> : <p className="mt-4 text-sm text-muted">{s.placement?.skipProgram ? 'Skipped the beginner programme via placement.' : 'Programme complete.'} Pathway level: <b className="text-ink">{s.pathLevel}</b></p>}
          <div className="mt-auto flex flex-wrap gap-2 pt-4">{!active && <Btn size="sm" onClick={() => store.setActiveLang(l.code)}>Switch to {l.name}</Btn>}<Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: false })}>Retake placement</Btn></div>
        </Card>); })}</div>
      {rest.length > 0 && <><SectionTitle>Add a language</SectionTitle><div className="grid gap-3 md:grid-cols-2">{rest.map((l) => (
        <Card key={l.code} hover className="flex flex-col"><div className="flex flex-wrap items-baseline gap-2"><h3 className="text-xl font-extrabold tracking-tight">{l.endonym}</h3><span className="text-muted">{l.name}</span></div><p className="mt-1.5 text-sm leading-snug text-muted">{l.blurb}</p>{l.fsi && <p className="mt-2.5"><Chip tone={l.fsi.category <= 1 ? 'good' : l.fsi.category === 2 ? 'accent' : 'warn'}>{level[l.fsi.category]} · ~{l.fsi.hours} h to professional</Chip></p>}
          <div className="mt-auto flex flex-wrap gap-2 pt-4"><Btn size="sm" onClick={() => { void store.addLanguage(l.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15); nav('/'); }}>Start from zero</Btn><Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: true })}>Take placement test</Btn></div></Card>))}</div></>}
      <div className="mt-8"><Note>Adding more languages to the app itself is a content task: drop a folder into <code>src/content</code> and register it. See docs/ADDING_CONTENT.md. Content for newer languages is machine-drafted and should be reviewed by a speaker.</Note></div>
    </div>
  );
}
