import type { AvatarConfig } from '../core/types';
import { BG_GRADIENTS, HAIR_COLORS, OUTFIT_COLORS, SKINS } from '../core/cosmetics';

export function Avatar({ cfg, size = 64, label }: { cfg: AvatarConfig; size?: number; label?: string }) {
  const skin = SKINS[cfg.skin] ?? SKINS[0], hair = HAIR_COLORS[cfg.hairColor] ?? HAIR_COLORS[0], outfit = OUTFIT_COLORS[cfg.outfit] ?? OUTFIT_COLORS[0];
  const [g1, g2] = BG_GRADIENTS[cfg.bg] ?? BG_GRADIENTS[0]; const id = `av${cfg.bg}${cfg.skin}${cfg.hair}${size}`;
  const hairBack = cfg.hair === 3 ? <path d="M22 44 Q20 82 30 88 L70 88 Q80 82 78 44 Z" fill={hair} /> : null;
  const hairTop = [
    <path key="0" d="M26 40 Q26 18 50 18 Q74 18 74 40 Q64 30 50 30 Q36 30 26 40Z" fill={hair} />,
    <path key="1" d="M24 44 Q22 16 50 16 Q78 16 76 44 Q70 28 58 30 Q44 24 24 44Z" fill={hair} />,
    <g key="2"><circle cx="50" cy="14" r="9" fill={hair} /><path d="M26 40 Q28 20 50 20 Q72 20 74 40 Q62 30 50 30 Q38 30 26 40Z" fill={hair} /></g>,
    <path key="3" d="M24 46 Q22 16 50 16 Q78 16 76 46 Q68 28 50 28 Q32 28 24 46Z" fill={hair} />,
    <path key="4" d="M28 38 Q30 24 50 24 Q70 24 72 38 Q60 32 50 32 Q40 32 28 38Z" fill={hair} />,
    <g key="5"><circle cx="32" cy="30" r="9" fill={hair} /><circle cx="50" cy="22" r="10" fill={hair} /><circle cx="68" cy="30" r="9" fill={hair} /><circle cx="26" cy="42" r="6" fill={hair} /><circle cx="74" cy="42" r="6" fill={hair} /></g>,
    <path key="6" d="M24 44 Q24 18 52 18 Q78 20 76 42 Q60 24 36 36 Q30 38 24 44Z" fill={hair} />,
    null,
  ][cfg.hair] ?? null;
  const eyeY = 48;
  const eyes = [
    <g key="e"><circle cx="40" cy={eyeY} r="3" fill="#1b1b1f" /><circle cx="60" cy={eyeY} r="3" fill="#1b1b1f" /></g>,
    <g key="e"><path d={`M36 ${eyeY} q4 -4 8 0`} stroke="#1b1b1f" strokeWidth="2.2" fill="none" /><path d={`M56 ${eyeY} q4 -4 8 0`} stroke="#1b1b1f" strokeWidth="2.2" fill="none" /></g>,
    <g key="e"><circle cx="40" cy={eyeY} r="3.6" fill="#fff" /><circle cx="60" cy={eyeY} r="3.6" fill="#fff" /><circle cx="40" cy={eyeY} r="2" fill="#1b1b1f" /><circle cx="60" cy={eyeY} r="2" fill="#1b1b1f" /></g>,
    <g key="e"><path d={`M36 ${eyeY} h8`} stroke="#1b1b1f" strokeWidth="2.4" /><path d={`M56 ${eyeY} h8`} stroke="#1b1b1f" strokeWidth="2.4" /></g>,
  ][cfg.eyes] ?? null;
  const mouth = [
    <path key="m" d="M41 60 Q50 68 59 60" stroke="#7a2e2e" strokeWidth="2.4" fill="none" strokeLinecap="round" />,
    <path key="m" d="M43 62 Q50 65 57 62" stroke="#7a2e2e" strokeWidth="2.4" fill="none" strokeLinecap="round" />,
    <path key="m" d="M40 59 Q50 72 60 59 Z" fill="#7a2e2e" />,
    <path key="m" d="M43 62 H57" stroke="#7a2e2e" strokeWidth="2.4" strokeLinecap="round" />,
  ][cfg.mouth] ?? null;
  const acc = [
    null,
    <g key="a" fill="none" stroke="#1b1b1f" strokeWidth="2"><circle cx="40" cy={eyeY} r="7" /><circle cx="60" cy={eyeY} r="7" /><path d={`M47 ${eyeY} h6`} /></g>,
    <g key="a"><path d="M22 50 Q22 14 50 14 Q78 14 78 50" fill="none" stroke="#334155" strokeWidth="4" /><rect x="17" y="46" width="9" height="14" rx="4" fill="#334155" /><rect x="74" y="46" width="9" height="14" rx="4" fill="#334155" /></g>,
    <path key="a" d="M30 76 Q50 90 70 76 L72 84 Q50 98 28 84 Z" fill="#b91c1c" />,
    <g key="a"><ellipse cx="46" cy="22" rx="26" ry="8" fill="#be123c" /><circle cx="46" cy="14" r="3" fill="#be123c" /></g>,
    <g key="a" fill="#fbbf24"><circle cx="26" cy="58" r="3" /><circle cx="74" cy="58" r="3" /></g>,
    <g key="a" fill="none" stroke="#7c3aed" strokeWidth="2"><circle cx="40" cy={eyeY} r="8" /><circle cx="60" cy={eyeY} r="8" /><path d={`M48 ${eyeY} h4`} /></g>,
    <path key="a" d="M28 26 Q36 16 44 22 M72 26 Q64 16 56 22" stroke="#65a30d" strokeWidth="4" fill="none" strokeLinecap="round" />,
  ][cfg.accessory] ?? null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label ?? 'Your avatar'} className="shrink-0 rounded-full">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={g1} /><stop offset="1" stopColor={g2} /></linearGradient><clipPath id={`${id}c`}><circle cx="50" cy="50" r="50" /></clipPath></defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="100" height="100" fill={`url(#${id})`} />
        {hairBack}
        <path d="M14 100 Q16 76 50 74 Q84 76 86 100 Z" fill={outfit} />
        <rect x="43" y="62" width="14" height="16" rx="5" fill={skin} />
        <ellipse cx="50" cy="46" rx="22" ry="25" fill={skin} />
        {hairTop}{eyes}{mouth}{acc}
      </g>
    </svg>
  );
}
