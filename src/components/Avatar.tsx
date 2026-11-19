// Designed characters (flat, friendly SVG) used as profile pictures, plus the Teacher.
import { useId, type ReactNode } from 'react';
import type { AvatarConfig } from '../core/types';
import { normalizeAvatar, TIER_RING } from '../core/cosmetics';
import type { Mood } from '../core/teacher';

export type { Mood };

const INK = '#1f2937';

// ── shared pieces for the human characters ──
function Person({ skin, outfit, hairBack, hairFront, children, mouth = 'smile', brows = true, lashes = false, collar }: {
  skin: string; outfit: string; hairBack?: ReactNode; hairFront?: ReactNode; children?: ReactNode; mouth?: 'smile' | 'grin' | 'soft' | 'o'; brows?: boolean; lashes?: boolean; collar?: ReactNode;
}) {
  const m = {
    smile: <path d="M42 59 Q50 66 58 59" stroke="#9b3d3d" strokeWidth="2.2" fill="none" strokeLinecap="round" />,
    grin: <path d="M40 58 Q50 70 60 58 Z" fill="#7f2d2d" stroke="#7f2d2d" strokeWidth="1.2" strokeLinejoin="round" />,
    soft: <path d="M44 61 Q50 64 56 61" stroke="#9b3d3d" strokeWidth="2.2" fill="none" strokeLinecap="round" />,
    o: <ellipse cx="50" cy="61" rx="3" ry="3.4" fill="#9b3d3d" />,
  }[mouth];
  return (
    <>
      {hairBack}
      <path d="M12 100 Q14 77 50 74 Q86 77 88 100Z" fill={outfit} />
      {collar}
      <rect x="43" y="63" width="14" height="15" rx="6" fill={skin} />
      <ellipse cx="29.5" cy="49" rx="3.6" ry="5.2" fill={skin} /><ellipse cx="70.5" cy="49" rx="3.6" ry="5.2" fill={skin} />
      <ellipse cx="50" cy="47" rx="21" ry="23.5" fill={skin} />
      <ellipse cx="38" cy="55" rx="4.2" ry="2.6" fill="#f87171" opacity=".22" /><ellipse cx="62" cy="55" rx="4.2" ry="2.6" fill="#f87171" opacity=".22" />
      <ellipse cx="41" cy="48" rx="2.7" ry="3.3" fill={INK} /><ellipse cx="59" cy="48" rx="2.7" ry="3.3" fill={INK} />
      <circle cx="42" cy="46.6" r="1" fill="#fff" /><circle cx="60" cy="46.6" r="1" fill="#fff" />
      {lashes && <g stroke={INK} strokeWidth="1.4" strokeLinecap="round"><path d="M37.6 45.6 l-2 -1.6" /><path d="M62.4 45.6 l2 -1.6" /></g>}
      {brows && <g stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".75"><path d="M36.5 41.5 q4.5 -2.4 9 0" /><path d="M54.5 41.5 q4.5 -2.4 9 0" /></g>}
      <path d="M49 51 q-1.6 4.2 1.6 4.6" stroke="#000" strokeOpacity=".18" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {m}
      {hairFront}
      {children}
    </>
  );
}

function Alex() {
  const hair = '#5b3a24';
  return (
    <Person skin="#e8b48a" outfit="#1f2937" mouth="grin"
      collar={<path d="M38 76 Q50 86 62 76 L60 100 H40Z" fill="#111827" />}
      hairFront={<g fill={hair}><path d="M28 47 Q22 20 48 16 Q76 14 73 47 Q69 33 60 34 Q57 24 47 30 Q40 25 36 36 Q30 34 28 47Z" /><path d="M44 17 l-5 -6 l9 3z M56 16 l5 -7 l2 9z" /></g>}>
      <circle cx="68" cy="88" r="4.6" fill="#38bdf8" /><circle cx="68" cy="88" r="2" fill="#34d399" />
    </Person>
  );
}
function Camille() {
  const hair = '#6b3f26';
  return (
    <Person skin="#f4cfae" outfit="#f8fafc" lashes mouth="smile"
      hairBack={<path d="M23 47 Q16 86 28 92 L72 92 Q84 86 77 47Z" fill={hair} />}
      collar={<g fill="#2b4a7a"><rect x="14" y="82" width="72" height="4" /><rect x="14" y="91" width="72" height="4" /></g>}
      hairFront={<g><path d="M25 48 Q22 20 50 19 Q78 20 75 48 Q70 32 56 33 Q40 30 25 48Z" fill={hair} /><path d="M24 30 Q28 13 52 13 Q76 14 77 31 Q52 22 24 30Z" fill="#c0262d" /><circle cx="52" cy="11.5" r="3.4" fill="#c0262d" /></g>} />
  );
}
function Mei() {
  const hair = '#14121b';
  return (
    <Person skin="#f6d9bd" outfit="#f1f5f9" lashes mouth="grin"
      hairBack={<path d="M22 46 Q15 88 30 96 L70 96 Q85 88 78 46Z" fill={hair} />}
      hairFront={<g><path d="M24 50 Q20 18 50 17 Q80 18 76 50 Q70 31 52 33 Q36 30 24 50Z" fill={hair} /><path d="M50 22 q-3 6 -8 10" stroke="#fff" strokeOpacity=".15" strokeWidth="2" fill="none" /></g>}>
      <path d="M22 50 Q20 14 50 14 Q80 14 78 50" fill="none" stroke="#e2e8f0" strokeWidth="4.4" strokeLinecap="round" />
      <rect x="16.5" y="44" width="9" height="16" rx="4.5" fill="#e2e8f0" /><rect x="74.5" y="44" width="9" height="16" rx="4.5" fill="#e2e8f0" />
      <rect x="19" y="47" width="4" height="10" rx="2" fill="#a855f7" opacity=".7" /><rect x="77" y="47" width="4" height="10" rx="2" fill="#a855f7" opacity=".7" />
    </Person>
  );
}
function Omar() {
  const hair = '#1c1917';
  return (
    <Person skin="#b97f55" outfit="#475569" mouth="smile"
      collar={<path d="M36 76 Q50 90 64 76 L66 82 Q50 96 34 82Z" fill="#334155" />}
      hairFront={<g>
        <path d="M27 46 Q24 19 50 18 Q76 19 73 46 Q68 30 50 31 Q33 30 27 46Z" fill={hair} />
        <path d="M30 54 Q31 76 50 76 Q69 76 70 54 Q66 66 50 66 Q34 66 30 54Z" fill={hair} />
      </g>}>
      <path d="M42 62 Q50 66 58 62" stroke="#f1d6c2" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9" />
      <g fill="none" stroke="#0f172a" strokeWidth="2"><rect x="33" y="42.5" width="16" height="12" rx="5" /><rect x="51" y="42.5" width="16" height="12" rx="5" /><path d="M49 47 h2" /></g>
    </Person>
  );
}

// ── mascots ──
function Owl() {
  return (
    <>
      <path d="M26 30 l-6 -14 l16 8z M74 30 l6 -14 l-16 8z" fill="#7c3f12" />
      <ellipse cx="50" cy="58" rx="31" ry="33" fill="#9a5222" />
      <ellipse cx="50" cy="80" rx="17" ry="14" fill="#fde7b0" />
      <path d="M44 74 q3 3 6 0 M50 74 q3 3 6 0 M47 82 q3 3 6 0" stroke="#d6a96a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M20 62 Q16 84 30 92 Q26 74 30 60Z" fill="#7c3f12" /><path d="M80 62 Q84 84 70 92 Q74 74 70 60Z" fill="#7c3f12" />
      <circle cx="37" cy="50" r="15" fill="#fbe3b5" /><circle cx="63" cy="50" r="15" fill="#fbe3b5" />
      <circle cx="37" cy="50" r="10.5" fill="#fff" /><circle cx="63" cy="50" r="10.5" fill="#fff" />
      <circle cx="38" cy="51" r="6" fill="#3b2314" /><circle cx="62" cy="51" r="6" fill="#3b2314" />
      <circle cx="40" cy="48.6" r="2" fill="#fff" /><circle cx="64" cy="48.6" r="2" fill="#fff" />
      <path d="M45.5 58 L54.5 58 L50 67.5Z" fill="#f59e0b" />
      <path d="M26 28 L50 17 L74 28 L50 39Z" fill="#111827" /><path d="M38 33 v8 q12 6 24 0 v-8" fill="#1f2937" />
      <path d="M74 28 v14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" /><circle cx="74" cy="44" r="2.6" fill="#fbbf24" />
    </>
  );
}
function Fox() {
  return (
    <>
      <path d="M14 100 Q16 80 50 78 Q84 80 86 100Z" fill="#fb923c" />
      <path d="M20 57 Q16 32 30 25 L33 9 L46 23 Q50 22 54 23 L67 9 L70 25 Q84 32 80 57 Q80 82 50 86 Q20 82 20 57Z" fill="#f97316" />
      <path d="M33 14 l-1 10 l8 -3z M67 14 l1 10 l-8 -3z" fill="#7c2d12" opacity=".75" />
      <path d="M20 58 Q36 52 50 68 Q64 52 80 58 Q79 82 50 86 Q21 82 20 58Z" fill="#fff7ed" />
      <path d="M34 50 q4 -4.4 8 0 M58 50 q4 -4.4 8 0" stroke="#3b1d0d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="67" rx="4.6" ry="3.4" fill="#2b1a10" /><path d="M50 70 v3 M45 74 q5 4 10 0" stroke="#2b1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M24 84 Q50 98 76 84 L80 100 L20 100Z" fill="#2563eb" /><path d="M30 88 l-2 12 M44 93 v8 M58 93 v8 M72 88 l2 12" stroke="#93c5fd" strokeWidth="1.6" opacity=".7" />
    </>
  );
}
function Panda() {
  return (
    <>
      <path d="M12 100 Q14 80 50 78 Q86 80 88 100Z" fill="#1f2937" />
      <circle cx="27" cy="29" r="11" fill="#1f2937" /><circle cx="73" cy="29" r="11" fill="#1f2937" />
      <ellipse cx="50" cy="53" rx="29" ry="26" fill="#fff" />
      <ellipse cx="37.5" cy="50" rx="7.4" ry="9.4" fill="#1f2937" transform="rotate(18 37.5 50)" /><ellipse cx="62.5" cy="50" rx="7.4" ry="9.4" fill="#1f2937" transform="rotate(-18 62.5 50)" />
      <circle cx="38.6" cy="49.5" r="3" fill="#fff" /><circle cx="61.4" cy="49.5" r="3" fill="#fff" /><circle cx="39" cy="50" r="1.7" fill="#1f2937" /><circle cx="61" cy="50" r="1.7" fill="#1f2937" />
      <ellipse cx="50" cy="60" rx="4.4" ry="3.2" fill="#1f2937" /><path d="M50 63 v2.5 M44.5 66 q5.5 4.2 11 0" stroke="#1f2937" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M21 52 Q20 16 50 16 Q80 16 79 52" fill="none" stroke="#16a34a" strokeWidth="4.2" strokeLinecap="round" />
      <rect x="15.5" y="45" width="9" height="15" rx="4.5" fill="#15803d" /><rect x="75.5" y="45" width="9" height="15" rx="4.5" fill="#15803d" />
      <path d="M70 92 q10 -12 18 -8 q-4 12 -18 8z" fill="#4ade80" /><path d="M70 92 q8 -6 16 -8" stroke="#166534" strokeWidth="1.2" fill="none" />
    </>
  );
}
function Robot() {
  return (
    <>
      <path d="M22 100 Q24 79 50 77 Q76 79 78 100Z" fill="#e2e8f0" /><rect x="42" y="68" width="16" height="12" rx="4" fill="#94a3b8" />
      <path d="M50 22 V11" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" /><circle cx="50" cy="9.5" r="4.6" fill="#f472b6" /><circle cx="48.6" cy="8.2" r="1.4" fill="#fff" opacity=".8" />
      <rect x="21" y="40" width="9" height="22" rx="4.5" fill="#3b82f6" /><rect x="70" y="40" width="9" height="22" rx="4.5" fill="#3b82f6" />
      <rect x="25" y="22" width="50" height="50" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="31" y="33" width="38" height="28" rx="13" fill="#0f172a" />
      <path d="M38 48 q4.4 -6 8.8 0 M53.2 48 q4.4 -6 8.8 0" stroke="#67e8f9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M45 54.5 q5 4 10 0" stroke="#67e8f9" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="64" r="2" fill="#f472b6" opacity=".5" /><circle cx="66" cy="64" r="2" fill="#f472b6" opacity=".5" />
      <path d="M44 84 h12" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" /><circle cx="50" cy="91" r="2.4" fill="#34d399" />
    </>
  );
}

const ART: Record<string, { art: ReactNode; bg: [string, string] }> = {
  alex: { art: <Alex />, bg: ['#7dd3fc', '#818cf8'] },
  camille: { art: <Camille />, bg: ['#fda4af', '#fcd34d'] },
  mei: { art: <Mei />, bg: ['#c4b5fd', '#f9a8d4'] },
  omar: { art: <Omar />, bg: ['#fcd34d', '#fb923c'] },
  ollie: { art: <Owl />, bg: ['#a78bfa', '#f472b6'] },
  pip: { art: <Panda />, bg: ['#86efac', '#22d3ee'] },
  finn: { art: <Fox />, bg: ['#93c5fd', '#a5b4fc'] },
  bolt: { art: <Robot />, bg: ['#38bdf8', '#6366f1'] },
};

export function Avatar({ cfg, size = 64, label, tier, className = '' }: { cfg?: AvatarConfig | null; size?: number; label?: string; tier?: number; className?: string }) {
  const a = normalizeAvatar(cfg); const c = ART[a.char] ?? ART.alex; const uid = useId().replace(/:/g, '');
  const ring = tier === undefined ? null : TIER_RING[Math.min(tier, TIER_RING.length - 1)];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label ?? 'Your character'} className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c.bg[0]} /><stop offset="1" stopColor={c.bg[1]} /></linearGradient>
        <clipPath id={`c${uid}`}><circle cx="50" cy="50" r={ring ? 45 : 50} /></clipPath>
      </defs>
      <g transform={ring ? 'translate(50 50) scale(.9) translate(-50 -50)' : undefined}>
        <g clipPath={`url(#c${uid})`} transform={ring ? 'translate(50 50) scale(1.11) translate(-50 -50)' : undefined}>
          <rect width="100" height="100" fill={`url(#g${uid})`} />
          <circle cx="82" cy="18" r="22" fill="#fff" opacity=".16" />
          {c.art}
        </g>
      </g>
      {ring && <circle cx="50" cy="50" r="47.5" fill="none" stroke={ring} strokeWidth="3" />}
    </svg>
  );
}

// ── The Teacher ──
export function TeacherAvatar({ size = 56, mood = 'happy', className = '' }: { size?: number; mood?: Mood; className?: string }) {
  const uid = useId().replace(/:/g, ''); const skin = '#f2c7a5'; const hair = '#5a3523';
  const mouth = mood === 'cheer' ? <path d="M40 59 Q50 71 60 59 Z" fill="#8b2e2e" /> : mood === 'think' ? <path d="M44 62 Q50 63 56 61" stroke="#9b3d3d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    : <path d="M41 59 Q50 67.5 59 59" stroke="#9b3d3d" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Your Teacher" className={`shrink-0 ${className}`}>
      <defs><linearGradient id={`t${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1e3a8a" /><stop offset="1" stopColor="#0ea5e9" /></linearGradient><clipPath id={`tc${uid}`}><circle cx="50" cy="50" r="50" /></clipPath></defs>
      <g clipPath={`url(#tc${uid})`}>
        <rect width="100" height="100" fill={`url(#t${uid})`} /><circle cx="84" cy="16" r="24" fill="#fff" opacity=".14" />
        <path d="M24 44 Q16 76 30 88 L70 88 Q84 76 76 44Z" fill={hair} />
        <circle cx="50" cy="12" r="10" fill={hair} /><circle cx="50" cy="12" r="10" fill="none" stroke="#7a4a30" strokeWidth="1.4" opacity=".6" />
        <path d="M10 100 Q12 77 50 74 Q88 77 90 100Z" fill="#1e293b" /><path d="M38 76 Q50 92 62 76 L60 100 H40Z" fill="#f8fafc" /><path d="M38 76 L50 100 L30 100Z M62 76 L50 100 L70 100Z" fill="#334155" />
        <rect x="43" y="62" width="14" height="15" rx="6" fill={skin} />
        <ellipse cx="29.5" cy="49" rx="3.6" ry="5.2" fill={skin} /><ellipse cx="70.5" cy="49" rx="3.6" ry="5.2" fill={skin} />
        <circle cx="29" cy="55.5" r="1.8" fill="#fbbf24" /><circle cx="71" cy="55.5" r="1.8" fill="#fbbf24" />
        <ellipse cx="50" cy="47" rx="21" ry="23.5" fill={skin} />
        <path d="M27 47 Q24 20 50 19 Q76 20 73 47 Q70 32 54 31 Q40 30 33 38 Q29 41 27 47Z" fill={hair} />
        <ellipse cx="38" cy="55" rx="4.2" ry="2.6" fill="#f87171" opacity=".25" /><ellipse cx="62" cy="55" rx="4.2" ry="2.6" fill="#f87171" opacity=".25" />
        <ellipse cx="41" cy="48.5" rx="2.6" ry="3.2" fill={INK} /><ellipse cx="59" cy="48.5" rx="2.6" ry="3.2" fill={INK} /><circle cx="42" cy="47" r=".9" fill="#fff" /><circle cx="60" cy="47" r=".9" fill="#fff" />
        <g stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".75"><path d={mood === 'think' ? 'M36.5 41 q4.5 -3.6 9 -1' : 'M36.5 41.5 q4.5 -2.4 9 0'} /><path d="M54.5 41.5 q4.5 -2.4 9 0" /></g>
        <g fill="none" stroke="#111827" strokeWidth="2"><rect x="32.5" y="42.5" width="17" height="13" rx="5.5" /><rect x="50.5" y="42.5" width="17" height="13" rx="5.5" /><path d="M49.5 47.5 h1" /></g>
        {mouth}
        {mood === 'cheer' && <g fill="#fde047"><path d="M16 22 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" /><path d="M84 30 l1.6 3.6 l3.6 1.6 l-3.6 1.6 l-1.6 3.6 l-1.6 -3.6 l-3.6 -1.6 l3.6 -1.6z" /></g>}
        {mood === 'wave' && <g><path d="M80 78 Q94 70 92 56" stroke={skin} strokeWidth="8" strokeLinecap="round" fill="none" /></g>}
        {mood === 'think' && <g fill="#fff" opacity=".9"><circle cx="82" cy="30" r="2" /><circle cx="87" cy="22" r="3" /><circle cx="92" cy="12" r="4.4" /></g>}
      </g>
    </svg>
  );
}
