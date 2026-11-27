import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../content/registry';
import { useStore } from '../state/store';
import { computeStats } from '../core/analytics';
import { PROGRAM_LENGTH } from '../core/program';
import type { PlacementResult } from '../core/types';
import { currentLevel } from '../core/guide';
import { LevelPicker } from '../components/LevelPicker';
import { PlacementTest } from '../components/PlacementTest';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, H1, LEVEL_NAME, LevelBadge, Note, Progress, SectionTitle, cx } from '../components/ui';

export default function Languages() {
  const store = useStore(); const p = store.profile!; const nav = useNavigate();
  const [test, setTest] = useState<{ code: string; add: boolean } | null>(null); const [lvlFor, setLvlFor] = useState<string | null>(null);
  if (test) return <PlacementTest code={test.code} onCancel={() => setTest(null)} onFinish={(r: PlacementResult) => {
    // Whether this is a new language or a retake, the result sets where training starts (the beginner programme is resumed for A1).
    if (test.add) void store.addLanguage(test.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15, r);
    else { store.applyPlacement(test.code, r); store.setActiveLang(test.code); }
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
          <div className="mt-3 flex flex-wrap gap-1.5"><Chip><Icon name="clock" size={12} />{s.dailyMinutes} min/day</Chip></div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface2/70 p-3"><LevelBadge level={currentLevel(s)} size="lg" solid /><div className="min-w-0 flex-1 leading-tight"><p className="text-xs font-semibold uppercase tracking-wide text-muted">Training level</p><p className="font-bold">{LEVEL_NAME[currentLevel(s)]}</p>{s.placement && <p className="text-xs text-muted">{s.placement.manual ? 'Chosen by you' : `Placement result: ${s.placement.overall}`}</p>}</div><Btn size="sm" variant="ghost" onClick={() => setLvlFor(l.code)}>Change</Btn></div>
          {s.programDay <= PROGRAM_LENGTH && !s.placement?.skipProgram && <div className="mt-3"><Progress value={Object.keys(s.programDone).length / PROGRAM_LENGTH} label="Programme" /><p className="mt-1.5 text-xs text-muted">Beginner programme: day {s.programDay} of {PROGRAM_LENGTH}</p></div>}
          <div className="mt-auto flex flex-wrap gap-2 pt-4">{!active && <Btn size="sm" onClick={() => store.setActiveLang(l.code)}>Switch to {l.name}</Btn>}<Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: false })}>Retake placement test</Btn></div>
        </Card>); })}</div>
      <LevelPicker open={!!lvlFor} onClose={() => setLvlFor(null)} current={lvlFor && p.languages[lvlFor] ? currentLevel(p.languages[lvlFor]) : 'A1'} language={LANGUAGES.find((x) => x.code === lvlFor)?.name ?? ''} onChoose={(lv) => { if (lvlFor) store.chooseLevel(lvlFor, lv); }} />
      {rest.length > 0 && <><SectionTitle>Add a language</SectionTitle><div className="grid gap-3 md:grid-cols-2">{rest.map((l) => (
        <Card key={l.code} hover className="flex flex-col"><div className="flex flex-wrap items-baseline gap-2"><h3 className="text-xl font-extrabold tracking-tight">{l.endonym}</h3><span className="text-muted">{l.name}</span></div><p className="mt-1.5 text-sm leading-snug text-muted">{l.blurb}</p>{l.fsi && <p className="mt-2.5"><Chip tone={l.fsi.category <= 1 ? 'good' : l.fsi.category === 2 ? 'accent' : 'warn'}>{level[l.fsi.category]} · ~{l.fsi.hours} h to professional</Chip></p>}
          <div className="mt-auto flex flex-wrap gap-2 pt-4"><Btn size="sm" onClick={() => { void store.addLanguage(l.code, p.languages[p.activeLang!]?.dailyMinutes ?? 15); nav('/'); }}>Start as a beginner</Btn><Btn size="sm" variant="ghost" onClick={() => setTest({ code: l.code, add: true })}>Take placement test</Btn></div></Card>))}</div></>}
      <div className="mt-8"><Note>Adding more languages to the app itself is a content task: drop a folder into <code>src/content</code> and register it. See docs/ADDING_CONTENT.md. Content for newer languages is machine-drafted and should be reviewed by a speaker.</Note></div>
    </div>
  );
}
