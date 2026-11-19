import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCtx } from '../state/hooks';
import { dailyMinutes, retentionBuckets, tierFor, TIERS, weeklyAccuracy } from '../core/analytics';
import { dayKey } from '../core/fsrs';
import { PROGRAM, PROGRAM_LENGTH } from '../core/program';
import { SKILLS } from '../core/types';
import { BarChart, LineChart, Radar, StageBar } from '../components/Charts';
import { Btn, Card, Chip, H1, Note, Progress as Bar, cx } from '../components/ui';

const monday = () => { const d = new Date(); const k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return dayKey(d.getTime()); };

export default function ProgressPage() {
  const { store, state, content } = useCtx(); const st = store.stats!; const [notes, setNotes] = useState(state.weeklyReviews[monday()]?.notes ?? ''); const [saved, setSaved] = useState(false);
  const tier = tierFor(st.masteryPoints); const week = weeklyAccuracy(store.events); const wk = store.events.filter((e) => e.ts > Date.now() - 7 * 86_400_000);
  const acc = wk.filter((e) => e.correct !== undefined || e.score !== undefined); const accAvg = acc.length ? acc.reduce((a, e) => a + (e.score ?? (e.correct ? 1 : 0)), 0) / acc.length : null;
  return (
    <div className="space-y-5">
      <H1 sub={`${state.code.toUpperCase()} · every number here comes from your real answers.`}>Progress</H1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><p className="text-sm text-muted">Estimated level</p><p className="text-4xl font-bold">{st.estimate.level}</p><Bar value={st.estimate.progressToNext} className="mt-2" label="Progress to next level" />
          <p className="mt-2 text-sm text-muted">Based on {st.estimate.basis}. Confidence: <b>{st.estimate.confidence}</b>. This is an estimate from vocabulary and accuracy, not an official CEFR result.</p></Card>
        <Card><p className="text-sm text-muted">Mastery tier (separate from CEFR)</p><p className="text-4xl font-bold">{tier.name}</p><Bar value={tier.next ? (st.masteryPoints - tier.at) / (tier.next.at - tier.at) : 1} className="mt-2" label="Progress to next tier" />
          <p className="mt-2 text-sm text-muted">{st.masteryPoints} mastery points{tier.next ? ` · ${tier.next.at - st.masteryPoints} to ${tier.next.name}` : ''}. Points come from retained words, passed checks and finished programme days — not time spent.</p>
          <div className="mt-2 flex flex-wrap gap-1">{TIERS.map((t) => <Chip key={t.id} tone={st.masteryPoints >= t.at ? 'accent' : 'plain'}>{t.name}</Chip>)}</div></Card>
      </div>
      <Card><h2 className="mb-2 font-semibold">Vocabulary mastery</h2><StageBar counts={st.stages} /><p className="mt-2 text-xs text-muted">{st.retainedPlus} of {st.vocabTotal} words retained (recalled across different days, with a long memory stability).</p></Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><h2 className="mb-1 font-semibold">Skill balance</h2><Radar data={SKILLS.map((s) => ({ label: s === 'conversation' ? 'convers.' : s.slice(0, 7), value: st.skills[s].score }))} /><p className="text-xs text-muted">Faded labels have no data yet.</p></Card>
        <Card><h2 className="mb-2 font-semibold">Strengths & weaknesses</h2>
          {st.strengths.length || st.weaknesses.length ? <><p className="text-sm">💪 {st.strengths.length ? st.strengths.join(', ') : 'Still forming'}</p><p className="mt-1 text-sm">🎯 Focus: {st.weaknesses.length ? st.weaknesses.join(', ') : 'nothing stands out as weak'}</p><p className="mt-2 text-xs text-muted">Your daily session automatically leans toward your weakest skill once you have enough data.</p></> : <p className="text-sm text-muted">Needs at least 5 answers per skill before it can say anything meaningful.</p>}
          <div className="mt-3 space-y-1.5">{SKILLS.map((s) => <div key={s} className="flex items-center gap-2 text-sm"><span className="w-24 capitalize text-muted">{s}</span><Bar value={st.skills[s].score ?? 0} className="flex-1" label={s} /><span className="w-16 text-right text-xs text-muted">{st.skills[s].score === null ? 'no data' : `${Math.round((st.skills[s].score as number) * 100)}% (${st.skills[s].n})`}</span></div>)}</div></Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><h2 className="mb-2 font-semibold">Study time, last 30 days</h2><BarChart data={dailyMinutes(state, 30).map((d) => ({ label: d.day, value: d.min }))} unit=" min" /><p className="text-xs text-muted">{Math.round(st.study30Min)} min in 30 days · {st.activeDays14}/14 recent days active</p></Card>
        <Card><h2 className="mb-2 font-semibold">Accuracy by week</h2><LineChart data={week.map((w) => ({ label: w.label, value: w.acc }))} /></Card>
      </div>
      <Card><h2 className="mb-2 font-semibold">Memory strength of reviewed words</h2><BarChart data={retentionBuckets(store.cards).map(([label, value]) => ({ label, value }))} height={110} /><p className="text-xs text-muted">Buckets = how many days until each word is predicted to fade to 90% recall. Moving right means your memory is consolidating.</p></Card>
      <Card><h2 className="mb-2 font-semibold">30-day programme</h2>
        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">{PROGRAM.map((d) => { const done = !!state.programDone[d.day]; const cur = state.programDay === d.day && !state.placement?.skipProgram; return <div key={d.day} title={`Day ${d.day}: ${d.title}`} className={cx('grid h-9 place-items-center rounded-lg text-sm', done ? 'bg-accent text-accent-ink font-semibold' : cur ? 'border-2 border-accent' : 'bg-surface2 text-muted')}>{d.day}</div>; })}</div>
        <p className="mt-2 text-sm text-muted">{Object.keys(state.programDone).length} of {PROGRAM_LENGTH} days complete.{state.finalAssessment ? ` Final assessment: ${Math.round(state.finalAssessment.score * 100)}%.` : ''} <Link className="underline" to="/assessment">Final assessment</Link> · <Link className="underline" to="/languages">Reassess with a placement test</Link></p></Card>
      <Card><h2 className="mb-1 font-semibold">Weekly review</h2>
        <ul className="mt-1 list-disc pl-5 text-sm text-muted"><li>{Math.round(st.study7Min)} minutes studied in the last 7 days</li><li>{wk.length} answered items{accAvg !== null ? ` at ${Math.round(accAvg * 100)}% accuracy` : ''}</li><li>{st.dueNow} words due now</li>{st.weaknesses.length > 0 && <li>Suggested focus next week: {st.weaknesses.join(', ')}</li>}</ul>
        <label htmlFor="wr" className="mt-3 block text-sm font-medium">What worked, what was hard, what will you change?</label>
        <textarea id="wr" value={notes} onChange={(e) => { setNotes(e.target.value); setSaved(false); }} rows={3} className="mt-1 w-full rounded-xl border border-line bg-surface p-3" />
        <Btn size="sm" className="mt-2" onClick={() => { store.patchLang(state.code, (s) => ({ ...s, weeklyReviews: { ...s.weeklyReviews, [monday()]: { at: Date.now(), notes } } })); setSaved(true); }}>Save this week's review</Btn>{saved && <span className="ml-2 text-sm text-good">Saved</span>}
        {Object.keys(state.weeklyReviews).length > 1 && <details className="mt-3 text-sm"><summary className="cursor-pointer text-muted">Earlier reviews</summary>{Object.entries(state.weeklyReviews).filter(([k]) => k !== monday()).sort().reverse().map(([k, v]) => <p key={k} className="mt-1"><b>{k}</b>: {v.notes || '—'}</p>)}</details>}</Card>
      <Note>Totals: {st.vocabTotal} words, {content.grammar.length} grammar lessons, {content.conversations.length} conversations, {content.reading.length} readings, {content.listening.length} listenings are built in for this language.</Note>
    </div>
  );
}
