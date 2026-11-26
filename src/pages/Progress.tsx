import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCtx } from '../state/hooks';
import { dailyMinutes, retentionBuckets, tierFor, TIERS, weeklyAccuracy } from '../core/analytics';
import { dayKey } from '../core/fsrs';
import { PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { SKILLS } from '../core/types';
import { BarChart, LineChart, Radar, StageBar } from '../components/Charts';
import { Icon } from '../components/Icon';
import { Btn, Card, Chip, H1, Note, Progress as Bar, cx } from '../components/ui';

const monday = () => { const d = new Date(); const k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return dayKey(d.getTime()); };

export default function ProgressPage() {
  const { store, state, content } = useCtx(); const st = store.stats!; const [notes, setNotes] = useState(state.weeklyReviews[monday()]?.notes ?? ''); const [saved, setSaved] = useState(false);
  const tier = tierFor(st.masteryPoints); const week = weeklyAccuracy(store.events); const wk = store.events.filter((e) => e.ts > Date.now() - 7 * 86_400_000);
  const acc = wk.filter((e) => e.correct !== undefined || e.score !== undefined); const accAvg = acc.length ? acc.reduce((a, e) => a + (e.score ?? (e.correct ? 1 : 0)), 0) / acc.length : null;
  const Title = ({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) => <div className="mb-3.5"><h2 className="font-extrabold tracking-tight">{children}</h2>{sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}</div>;
  return (
    <div className="stagger space-y-5">
      <H1 eyebrow={`Progress · ${state.code.toUpperCase()}`} sub="Every number here comes from your real answers.">How you're doing</H1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><p className="eyebrow">Estimated level</p><p className="mt-1 text-5xl font-extrabold tracking-tight">{st.estimate.level}</p><Bar value={st.estimate.progressToNext} className="mt-3" label="Progress to next level" />
          <p className="mt-3 text-sm text-muted">Based on {st.estimate.basis}. Confidence: <b className="text-ink">{st.estimate.confidence}</b>. This is an estimate from vocabulary and accuracy, not an official CEFR result.</p></Card>
        <Card><p className="eyebrow">Mastery tier <span className="font-medium normal-case tracking-normal">(separate from CEFR)</span></p><p className="mt-1 text-5xl font-extrabold tracking-tight">{tier.name}</p><Bar value={tier.next ? (st.masteryPoints - tier.at) / (tier.next.at - tier.at) : 1} className="mt-3" label="Progress to next tier" tone="warn" />
          <p className="mt-3 text-sm text-muted"><span className="tabular">{st.masteryPoints}</span> mastery points{tier.next ? <> · <span className="tabular">{tier.next.at - st.masteryPoints}</span> to {tier.next.name}</> : ''}. Points come from retained words, passed checks and finished programme days, not time spent.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{TIERS.map((t) => <Chip key={t.id} tone={st.masteryPoints >= t.at ? 'accent' : 'plain'}>{t.name}</Chip>)}</div></Card>
      </div>
      <Card><Title sub={`${st.retainedPlus} of ${st.vocabTotal} words retained (recalled across different days, with a long memory stability).`}>Vocabulary mastery</Title><StageBar counts={st.stages} /></Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><Title sub="Faded labels have no data yet.">Skill balance</Title><Radar data={SKILLS.map((s) => ({ label: ({ vocabulary: 'Vocab', grammar: 'Grammar', reading: 'Reading', listening: 'Listen', writing: 'Writing', speaking: 'Speak', conversation: 'Convo' } as Record<string, string>)[s] ?? s, value: st.skills[s].score }))} /></Card>
        <Card><Title>Strengths & weaknesses</Title>
          {st.strengths.length || st.weaknesses.length ? <div className="space-y-2 text-sm"><p className="flex items-start gap-2.5 rounded-xl bg-good/10 px-3 py-2.5"><Icon name="trend" size={17} className="mt-0.5 shrink-0 text-good" /><span><b>Strong:</b> {st.strengths.length ? st.strengths.join(', ') : 'still forming'}</span></p><p className="flex items-start gap-2.5 rounded-xl bg-warn/10 px-3 py-2.5"><Icon name="target" size={17} className="mt-0.5 shrink-0 text-warn" /><span><b>Focus:</b> {st.weaknesses.length ? st.weaknesses.join(', ') : 'nothing stands out as weak'}</span></p><p className="text-xs text-muted">Your daily session automatically leans toward your weakest skill once you have enough data.</p></div> : <p className="text-sm text-muted">Needs at least 5 answers per skill before it can say anything meaningful.</p>}
          <div className="mt-4 space-y-2">{SKILLS.map((s) => <div key={s} className="flex items-center gap-3 text-sm"><span className="w-[5.5rem] capitalize text-muted">{s}</span><Bar value={st.skills[s].score ?? 0} className="flex-1" label={s} /><span className="tabular w-[4.5rem] text-right text-xs text-muted">{st.skills[s].score === null ? 'no data' : <><b className="text-ink">{Math.round((st.skills[s].score as number) * 100)}%</b> ({st.skills[s].n})</>}</span></div>)}</div></Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><Title sub={`${Math.round(st.study30Min)} min in 30 days · ${st.activeDays14}/14 recent days active`}>Study time, last 30 days</Title><BarChart data={dailyMinutes(state, 30).map((d) => ({ label: d.day.slice(5), value: d.min }))} unit=" min" /></Card>
        <Card><Title>Accuracy by week</Title><LineChart data={week.map((w) => ({ label: w.label, value: w.acc }))} /></Card>
      </div>
      <Card><Title sub="Buckets = how many days until each word is predicted to fade to 90% recall. Moving right means your memory is consolidating.">Memory strength of reviewed words</Title><BarChart data={retentionBuckets(store.cards).map(([label, value]) => ({ label, value }))} height={110} /></Card>
      <Card><Title sub={<>{Object.keys(state.programDone).length} of {PROGRAM_LENGTH} days complete.{state.finalAssessment ? ` Final assessment: ${Math.round(state.finalAssessment.score * 100)}%.` : ''}</>}>30-day programme</Title>
        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">{PROGRAM.map((d) => { const done = !!state.programDone[d.day]; const cur = state.programDay === d.day && !state.placement?.skipProgram; return <div key={d.day} title={`Day ${d.day}: ${d.title}`} className={cx('tabular grid h-10 place-items-center rounded-xl text-sm font-bold', done ? 'bg-accent text-accent-ink' : cur ? 'border-2 border-accent bg-accent/10 text-accent-strong' : 'bg-surface2 text-faint')}>{d.day}</div>; })}</div>
        <p className="mt-3 text-sm"><Link className="font-bold text-accent-strong hover:underline" to="/assessment">Final assessment</Link><span className="mx-2 text-faint">·</span><Link className="font-bold text-accent-strong hover:underline" to="/languages">Reassess with a placement test</Link></p></Card>
      <Card><Title>Weekly review</Title>
        <ul className="grid gap-2 text-sm sm:grid-cols-3"><li className="rounded-xl bg-surface2 p-3"><b className="tabular block text-xl font-extrabold tracking-tight">{Math.round(st.study7Min)}</b><span className="text-muted">minutes studied (7 days)</span></li><li className="rounded-xl bg-surface2 p-3"><b className="tabular block text-xl font-extrabold tracking-tight">{wk.length}</b><span className="text-muted">answered items{accAvg !== null ? ` · ${Math.round(accAvg * 100)}% accuracy` : ''}</span></li><li className="rounded-xl bg-surface2 p-3"><b className="tabular block text-xl font-extrabold tracking-tight">{st.dueNow}</b><span className="text-muted">words due now</span></li></ul>
        {st.weaknesses.length > 0 && <p className="mt-3 text-sm text-muted">Suggested focus next week: <b className="text-ink">{st.weaknesses.join(', ')}</b></p>}
        <label htmlFor="wr" className="mt-4 block text-sm font-bold">What worked, what was hard, what will you change?</label>
        <textarea id="wr" value={notes} onChange={(e) => { setNotes(e.target.value); setSaved(false); }} rows={3} className="mt-2 w-full rounded-2xl border-2 border-line-strong bg-surface p-3.5 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15" />
        <div className="mt-3 flex items-center gap-3"><Btn size="sm" onClick={() => { store.patchLang(state.code, (s) => ({ ...s, weeklyReviews: { ...s.weeklyReviews, [monday()]: { at: Date.now(), notes } } })); setSaved(true); }}>Save this week's review</Btn>{saved && <span className="inline-flex items-center gap-1 text-sm font-semibold text-good"><Icon name="check" size={15} strokeWidth={3} />Saved</span>}</div>
        {Object.keys(state.weeklyReviews).length > 1 && <details className="mt-4 text-sm"><summary className="cursor-pointer font-semibold text-muted hover:text-ink">Earlier reviews</summary>{Object.entries(state.weeklyReviews).filter(([k]) => k !== monday()).sort().reverse().map(([k, v]) => <p key={k} className="mt-2"><b>{k}</b>: {v.notes || '—'}</p>)}</details>}</Card>
      <Note>Totals: {st.vocabTotal} words, {content.grammar.length} grammar lessons, {content.conversations.length} conversations, {content.reading.length} readings, {content.listening.length} listenings are built in for this language.</Note>
    </div>
  );
}
