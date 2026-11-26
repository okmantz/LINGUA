// One consistent figure per sign (see core/signRender.ts for the spec format and the conventions the figures follow).
// Figures play as a short loop: ① start pose → arrow → ② end pose → movement marks. A caption says in words which way to move.
import { useMemo, useState } from 'react';
import { signSvg, parseSpec, describeMotion } from '../core/signRender';

export function SignFigure({ spec, size = 220, compact = false, label, animate = true }: { spec: string; size?: number; compact?: boolean; label?: string; animate?: boolean }) {
  const [run, setRun] = useState(0); const [paused, setPaused] = useState(false); const [slow, setSlow] = useState(false);
  const p = parseSpec(spec); const still = !!(p.fs || p.num) || !p.h;
  const play = animate && !still;
  const svg = useMemo(() => signSvg(spec, { animate: play }), [spec, play, run]);
  const { move, face } = useMemo(() => describeMotion(spec), [spec]);
  const alt = label ?? (p.fs ? `Fingerspelled letter ${p.fs.toUpperCase()}` : p.num ? `Number ${p.num}` : !p.h ? `Face showing ${(p.nm ?? 'neutral').replace(/\+/g, ' and ')}` : `Sign diagram. ${move}${face ? ` Face: ${face}.` : ''}`);
  const h = p.fs || p.num ? size * (250 / 240) : size * (270 / 280);
  const showControls = play && !compact && size >= 180;
  return (
    <div style={{ width: size, maxWidth: '100%' }} className="mx-auto">
      <div role="img" aria-label={alt} style={{ width: '100%', aspectRatio: `${size} / ${h}`, ['--sign-speed' as any]: slow ? 2.2 : 1 }}
        className={`${paused ? 'sign-paused ' : ''}${compact ? 'overflow-hidden rounded-xl' : 'overflow-hidden rounded-2xl shadow-sm'}`} dangerouslySetInnerHTML={{ __html: svg }} />
      {showControls && (
        <div className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold">
          <button type="button" onClick={() => { setPaused(false); setRun((r) => r + 1); }} className="min-h-9 rounded-full border border-line-strong bg-surface px-3 text-muted hover:bg-surface2 hover:text-ink">↻ Replay</button>
          <button type="button" aria-pressed={paused} onClick={() => setPaused((x) => !x)} className="min-h-9 rounded-full border border-line-strong bg-surface px-3 text-muted hover:bg-surface2 hover:text-ink">{paused ? '▶ Play' : '❚❚ Pause'}</button>
          <button type="button" aria-pressed={slow} onClick={() => setSlow((x) => !x)} className={`min-h-9 rounded-full border px-3 ${slow ? 'border-accent bg-accent/15 text-accent-strong' : 'border-line-strong bg-surface text-muted hover:bg-surface2 hover:text-ink'}`}>Slow</button>
        </div>
      )}
      {!compact && size >= 180 && (move || face) && (
        <div className="mt-2 rounded-xl bg-surface2 px-3 py-2 text-left text-[0.82rem] leading-snug text-muted">
          {move && <p><b className="text-ink">How: </b>{move}</p>}
          {face && <p className="mt-0.5"><b className="text-ink">Face: </b>{face}.</p>}
          {!p.fs && !p.num && p.h && <p className="mt-1 text-[0.72rem] text-faint">① start · ② end. The signer faces you, so their right hand is on your left.</p>}
        </div>
      )}
    </div>
  );
}
