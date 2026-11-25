// One consistent figure per sign (see core/signRender.ts for the spec format and the conventions the figures follow).
import { useMemo } from 'react';
import { signSvg, parseSpec } from '../core/signRender';

export function SignFigure({ spec, size = 220, compact = false, label }: { spec: string; size?: number; compact?: boolean; label?: string }) {
  const svg = useMemo(() => signSvg(spec), [spec]);
  const p = parseSpec(spec);
  const alt = label ?? (p.fs ? `Fingerspelled letter ${p.fs.toUpperCase()}` : `Sign diagram: ${p.h ?? ''} hand${p.l ? ` at ${p.l}` : ''}${p.m ? `, moving ${p.m.replace('+', ' then ')}` : ''}`);
  const h = p.fs ? size * (250 / 240) : size * (270 / 240);
  return <div role="img" aria-label={alt} style={{ width: size, height: h, maxWidth: '100%' }} className={compact ? 'overflow-hidden rounded-xl' : 'overflow-hidden rounded-2xl shadow-sm'} dangerouslySetInnerHTML={{ __html: svg }} />;
}
