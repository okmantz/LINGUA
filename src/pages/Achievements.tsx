import { ACHIEVEMENTS } from '../core/achievements';
import { useCtx } from '../state/hooks';
import { computeStats } from '../core/analytics';
import { Card, Chip, H1, Progress } from '../components/ui';

const GROUPS = [['mastery', 'Mastery'], ['communication', 'Communication'], ['consistency', 'Consistency'], ['programme', 'Programme']] as const;
export default function Achievements() {
  const { store, state, content } = useCtx(); const p = store.profile!; const stats = store.stats!;
  const allStats = Object.keys(p.languages).filter((c) => store.contents[c]).map((c) => ({ lang: c, stats: computeStats(p.languages[c], store.contents[c], [...store.cardMap.values()].filter((x) => x.lang === c), []) }));
  const openConvs = store.events.filter((e) => e.type === 'conversation' && e.meta === 'open' && (e.score ?? 0) >= 0.7).length;
  const ctx = { profile: p, lang: state.code, state, stats, allStats, openConvs }; void content;
  const n = ACHIEVEMENTS.filter((a) => p.achievements[a.id]).length;
  return (
    <div>
      <H1 sub={`${n} of ${ACHIEVEMENTS.length} earned. Achievements reward demonstrated mastery and consistency — not just clicking through lessons.`}>Achievements</H1>
      {GROUPS.map(([g, label]) => (
        <div key={g} className="mb-6"><h2 className="mb-2 text-lg font-semibold">{label}</h2>
          <div className="grid gap-3 sm:grid-cols-2">{ACHIEVEMENTS.filter((a) => a.group === g).map((a) => { const got = p.achievements[a.id]; const pr = a.progress?.(ctx); return (
            <Card key={a.id} className={got ? 'border-accent/50' : ''}><div className="flex items-start gap-2"><span className="text-2xl" aria-hidden>{got ? '🏆' : '🔒'}</span><div className="flex-1"><p className="font-semibold">{a.title}</p><p className="text-sm text-muted">{a.desc}</p>
              {got ? <p className="mt-1 text-xs text-good">Earned {new Date(got).toLocaleDateString()}</p> : pr && <><Progress value={pr[0] / pr[1]} className="mt-2" label={a.title} /><p className="mt-1 text-xs text-muted">{pr[0]} / {pr[1]}</p></>}</div><Chip>+{a.xp} XP</Chip></div></Card>); })}</div></div>
      ))}
    </div>
  );
}
