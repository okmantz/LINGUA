import { ACHIEVEMENTS } from '../core/achievements';
import { useCtx } from '../state/hooks';
import { computeStats } from '../core/analytics';
import { Icon } from '../components/Icon';
import { Card, Chip, H1, Progress, SectionTitle, cx } from '../components/ui';

const GROUPS = [['mastery', 'Mastery'], ['communication', 'Communication'], ['consistency', 'Consistency'], ['programme', 'Programme']] as const;
export default function Achievements() {
  const { store, state, content } = useCtx(); const p = store.profile!; const stats = store.stats!;
  const allStats = Object.keys(p.languages).filter((c) => store.contents[c]).map((c) => ({ lang: c, stats: computeStats(p.languages[c], store.contents[c], [...store.cardMap.values()].filter((x) => x.lang === c), []) }));
  const openConvs = store.events.filter((e) => e.type === 'conversation' && e.meta === 'open' && (e.score ?? 0) >= 0.7).length;
  const ctx = { profile: p, lang: state.code, state, stats, allStats, openConvs }; void content;
  const n = ACHIEVEMENTS.filter((a) => p.achievements[a.id]).length;
  return (
    <div>
      <H1 eyebrow="Achievements" sub="Achievements reward demonstrated mastery and consistency, not just clicking through lessons.">Your badges</H1>
      <Card className="mb-2 flex items-center gap-4 !p-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-sm"><Icon name="trophy" size={24} /></span><div className="min-w-0 flex-1"><p className="tabular text-xl font-extrabold leading-tight tracking-tight">{n} <span className="text-base font-semibold text-muted">of {ACHIEVEMENTS.length} earned</span></p><Progress value={n / ACHIEVEMENTS.length} className="mt-2" label="Achievements earned" tone="warn" /></div></Card>
      {GROUPS.map(([g, label]) => (
        <section key={g}><SectionTitle>{label}</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">{ACHIEVEMENTS.filter((a) => a.group === g).map((a) => { const got = p.achievements[a.id]; const pr = a.progress?.(ctx); return (
            <Card key={a.id} className={cx('flex items-start gap-3.5 !p-4', !!got && 'border-amber-400/50 bg-gradient-to-br from-amber-400/[.08] to-surface')}>
              <span className={cx('grid h-11 w-11 shrink-0 place-items-center rounded-xl', got ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-sm' : 'bg-surface2 text-faint')}><Icon name={got ? 'trophy' : 'lock'} size={21} /></span>
              <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="font-bold leading-snug tracking-tight">{a.title}</p><Chip tone={got ? 'warn' : 'plain'}>+{a.xp} XP</Chip></div><p className="mt-0.5 text-sm text-muted">{a.desc}</p>
                {got ? <p className="mt-2 text-xs font-semibold text-good">Earned {new Date(got).toLocaleDateString()}</p> : pr && <div className="mt-2.5"><Progress value={pr[0] / pr[1]} label={a.title} /><p className="tabular mt-1 text-xs font-medium text-muted">{pr[0]} / {pr[1]}</p></div>}</div></Card>); })}</div></section>
      ))}
    </div>
  );
}
