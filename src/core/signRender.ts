// Turns a compact sign spec into one consistent SVG figure.
//
//   fs=A                              fingerspelling card: one hand, standard chart pose (J and Z draw their path)
//   num=7                             number card (1–10), palm toward the viewer as in sign dictionaries
//   h=B o=out,up l=chin a=tip m=down  a sign: handshape, palm,finger direction, location, anchor, movement
//   to=neutral eo=out,down eh=5       optional END position (and end orientation / end handshape): the start hand is drawn faded,
//                                     the end hand solid, joined by an arrow — the usual way sign dictionaries show a path
//   curve=up|down|left|right          bend the start→end arrow (arcs, loops)
//   h2=B o2=up,out l2=neutral2        optional second (non-dominant) hand; it takes the same extras (to2, eo2, eh2…)
//   nm=brows-up+tilt                  non-manual markers drawn on the face (see FACE_TOKENS); a spec with only nm= draws just the face
//   x=4 y=-6  yaw=-30  pitch=0        optional nudge / viewing angle      r=2  (repeat marker)   s=0.8 (hand scale)
//
// Figures show a right-handed signer facing you, so their right (dominant) hand is on YOUR left. Left-handed signers mirror
// everything. Arrows show the path of the dominant hand; ⊙ means "towards you" and ⊗ "towards the signer".
// Honest limit: this is a schematic diagram, not a photograph. Every figure is paired with a written description of the sign.
import { buildHand, drawHand, FS, LINE, SKIN, SKIN_SHADE, type Dir } from './handModel';

const ACCENT = '#E8590C', BG = '#F6F3EE', BODY = '#AEBBD0', HAIR = '#5B4636';
export const LOCATIONS: Record<string, [number, number]> = {
  forehead: [108, 52], temple: [94, 56], eye: [106, 76], nose: [118, 90], mouth: [118, 103], lip: [120, 104], chin: [118, 119], cheek: [98, 98], ear: [86, 80], jaw: [100, 112],
  neck: [118, 142], shoulder: [76, 168], 'shoulder2': [164, 168], chest: [100, 192], center: [120, 192], heart: [138, 190], stomach: [112, 228],
  neutral: [92, 206], neutral2: [150, 206], high: [92, 160], front: [120, 206], low: [100, 240], side: [60, 206], above: [100, 120],
  'front-high': [96, 150], 'wave-left': [50, 76], 'wave-right': [190, 76], 'side-high': [52, 128], 'front-mid': [112, 172], 'low-right': [150, 238], 'low-left': [88, 238], 'out-left': [64, 150], 'in-right': [172, 150], 'head-top': [110, 36], 'cheek-low': [98, 108], 'elbow2': [176, 214], ear2: [154, 80], cheek2: [142, 98], temple2: [146, 56], 'neck2': [130, 146], chest2: [140, 192], shoulder3: [60, 176], 'front-low': [104, 232], 'far-left': [40, 200], 'far-right': [200, 200], 'mid-high': [120, 150],
};
const DIRS: Dir[] = ['out', 'in', 'up', 'down', 'left', 'right'];
const isDir = (s: string): s is Dir => (DIRS as string[]).includes(s);
/** `mid` = towards the signer's body midline, `lat` = away from it (so specs read the same for either hand). */
const dirOf = (s: string, left: boolean): Dir => (s === 'mid' ? (left ? 'left' : 'right') : s === 'lat' ? (left ? 'right' : 'left') : isDir(s) ? s : 'out');

export function parseSpec(spec: string): Record<string, string> {
  const o: Record<string, string> = {};
  for (const t of spec.trim().split(/\s+/)) { const i = t.indexOf('='); if (i > 0) o[t.slice(0, i)] = t.slice(i + 1); }
  return o;
}

const HALO = '#FFFFFF';
const arrowHead = (x: number, y: number, ang: number, s = 9) => {
  const a = (d: number) => [x - s * Math.cos(ang + d), y - s * Math.sin(ang + d)].map((n) => Math.round(n * 10) / 10);
  const [p, q] = [a(0.45), a(-0.45)];
  return `<path d="M${x} ${y}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${ACCENT}" stroke="${HALO}" stroke-width="1.4" stroke-linejoin="round" paint-order="stroke"/>`;
};
/** A path with a white halo under it so arrows stay readable on top of skin, hair and sleeves. */
const halo = (d: string, w = 3.2, extra = '') => `<path d="${d}" stroke="${HALO}" stroke-width="${w + 3.4}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${extra}/><path d="${d}" stroke="${ACCENT}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${extra}/>`;
const line = (x1: number, y1: number, x2: number, y2: number, dash = '') =>
  halo(`M${x1} ${y1}L${x2} ${y2}`, 3.2, dash ? `stroke-dasharray="${dash}"` : '') + arrowHead(x2, y2, Math.atan2(y2 - y1, x2 - x1));
const VEC: Record<string, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], ul: [-0.7, -0.7], ur: [0.7, -0.7], dl: [-0.7, 0.7], dr: [0.7, 0.7] };

/** A curved arrow from (x1,y1) to (x2,y2), bowed towards `bend`. */
function curved(x1: number, y1: number, x2: number, y2: number, bend: string) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const off = Math.max(14, len * 0.45); const [bx, by] = VEC[bend] ?? [0, -1];
  const cx = mx + bx * off, cy = my + by * off;
  const ang = Math.atan2(y2 - cy, x2 - cx);
  return halo(`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`) + arrowHead(x2, y2, ang);
}

/** Movement glyphs, drawn from a start point; returns svg and the end point so tokens can be chained (e.g. "down+out"). */
function movement(tok: string, x: number, y: number, k = 1): { svg: string; end: [number, number] } {
  const L = 34 * k;
  if (VEC[tok]) { const [dx, dy] = VEC[tok]; const ex = x + dx * L, ey = y + dy * L; return { svg: line(x, y, ex, ey), end: [ex, ey] }; }
  if (tok === 'out' || tok === 'fwd') return { svg: `<circle cx="${x + 16}" cy="${y - 16}" r="12" fill="${HALO}" opacity=".85"/><g fill="none" stroke="${ACCENT}" stroke-width="3"><circle cx="${x + 16}" cy="${y - 16}" r="10"/></g><circle cx="${x + 16}" cy="${y - 16}" r="3.4" fill="${ACCENT}"/>`, end: [x + 16, y - 16] };
  if (tok === 'in' || tok === 'back') { const cx = x + 16, cy = y - 16; return { svg: `<circle cx="${cx}" cy="${cy}" r="12" fill="${HALO}" opacity=".85"/><g fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"><circle cx="${cx}" cy="${cy}" r="10"/><path d="M${cx - 5} ${cy - 5}L${cx + 5} ${cy + 5}M${cx + 5} ${cy - 5}L${cx - 5} ${cy + 5}"/></g>`, end: [cx, cy] }; }
  if (tok === 'circle' || tok === 'circle-ccw') {
    const r = 17, cw = tok === 'circle'; const sx = x, sy = y - r;
    const ex = x + (cw ? -1 : 1) * 6, ey = y - r - 2; const sw = cw ? 1 : 0;
    return { svg: halo(`M${sx} ${sy + 2 * r}A${r} ${r} 0 1 ${sw} ${ex} ${ey + 4}`) + arrowHead(ex, ey + 4, cw ? Math.PI * 0.05 : Math.PI * 0.95), end: [x, y] };
  }
  if (tok === 'tap') return { svg: [[-16, -6], [0, -17], [16, -6]].map(([dx, dy]) => halo(`M${x + dx * 0.55} ${y + dy * 0.55}L${x + dx} ${y + dy}`, 3)).join(''), end: [x, y] };
  if (tok === 'wiggle') return { svg: halo(`M${x - 20} ${y}l8 -8l8 16l8 -16l8 16l8 -8`, 3), end: [x, y] };
  if (tok === 'shake') return { svg: line(x, y, x + 24, y) + line(x, y, x - 24, y), end: [x, y] };
  if (tok === 'twist') return { svg: halo(`M${x - 16} ${y + 6}A18 18 0 0 1 ${x + 16} ${y + 6}`) + arrowHead(x + 16, y + 6, 1.2), end: [x, y] };
  if (tok === 'arc') return { svg: halo(`M${x} ${y}Q${x + 22} ${y - 26} ${x + 44} ${y}`) + arrowHead(x + 44, y, 0.9), end: [x + 44, y] };
  if (tok === 'flip') return { svg: halo(`M${x - 18} ${y}Q${x} ${y - 24} ${x + 18} ${y}`) + arrowHead(x + 18, y, 0.9), end: [x, y] };
  if (tok === 'bounce') return { svg: line(x, y - 4, x, y + 20) + line(x + 14, y + 20, x + 14, y - 4), end: [x, y] };
  if (tok === 'close') return { svg: line(x - 20, y, x - 6, y) + line(x + 20, y, x + 6, y), end: [x, y] };
  if (tok === 'open') return { svg: line(x - 6, y, x - 20, y) + line(x + 6, y, x + 20, y), end: [x, y] };
  return { svg: '', end: [x, y] };
}

/** Face tokens for `nm=` — facial grammar and mouth morphemes that carry meaning in ASL. */
export const FACE_TOKENS = ['brows-up', 'brows-down', 'wide', 'squint', 'tilt', 'nod', 'shake', 'puff', 'mm', 'th', 'cha', 'oo', 'frown', 'smile', 'lean', 'neutral'] as const;
const face = (nm: string[] = [], bodyOnly = false, animId = '') => {
  const has = (t: string) => nm.includes(t);
  const up = has('brows-up') || has('wide'), down = has('brows-down') || has('squint');
  const tilt = has('tilt') ? -9 : 0;
  let brows = '<path d="M99 65Q106 61 113 64M127 64Q134 61 141 65"/>';
  if (up) brows = '<path d="M98 55Q106 49 114 54M126 54Q134 49 142 55"/>';
  if (down) brows = '<path d="M98 59L113 68M142 59L127 68"/><path d="M117 58L117 64M123 58L123 64" stroke-width="1.6"/>';
  const ry = has('wide') ? 5.2 : up ? 4.4 : down ? 2.4 : 3.6;
  let mouth = '<path d="M109 103Q120 110 131 103"/>';
  let extra = '';
  if (has('frown')) mouth = '<path d="M110 109Q120 100 130 109"/>';
  if (has('smile')) mouth = '<path d="M107 101Q120 114 133 101"/>';
  if (has('mm')) mouth = '<path d="M111 105H129"/>';
  if (has('oo')) mouth = '<ellipse cx="120" cy="106" rx="4.4" ry="4.8" fill="#7A3B3B"/>';
  if (has('cha')) mouth = '<ellipse cx="120" cy="107" rx="9" ry="7.5" fill="#7A3B3B"/>';
  if (has('wide') && !has('cha') && !has('oo')) mouth = '<ellipse cx="120" cy="106" rx="5" ry="6" fill="#7A3B3B"/>';
  if (has('th')) { mouth = '<path d="M110 104Q120 107 130 104"/>'; extra += '<path d="M115 105Q120 122 125 105Z" fill="#E58A8A" stroke="#4A3426" stroke-width="1.6" stroke-linejoin="round"/>'; }
  if (has('puff')) { mouth = '<path d="M112 106H128"/>'; extra += '<path d="M89 94Q80 104 90 114M151 94Q160 104 150 114" fill="none"/>'; }
  const arrows = (has('nod') ? line(172, 66, 172, 98) + line(184, 98, 184, 66) : '') + (has('shake') ? line(120, 18, 150, 18) + line(120, 18, 90, 18) : '');
  const head = `
<ellipse cx="86" cy="80" rx="6" ry="10" fill="${SKIN}" stroke="${LINE}" stroke-width="2.2"/><ellipse cx="154" cy="80" rx="6" ry="10" fill="${SKIN}" stroke="${LINE}" stroke-width="2.2"/>
<ellipse cx="120" cy="76" rx="34" ry="42" fill="${SKIN}" stroke="${LINE}" stroke-width="2.4"/>
<path d="M86 72C84 42 100 30 120 30C140 30 156 42 154 72C148 56 136 49 120 49C104 49 92 56 86 72Z" fill="${HAIR}" stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round"/>
<g fill="${LINE}"><ellipse cx="106" cy="74" rx="3" ry="${ry}"/><ellipse cx="134" cy="74" rx="3" ry="${ry}"/></g>
<g fill="none" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round">${brows}<path d="M120 80Q116 90 121 92"/>${mouth}${extra}</g>`;
  void bodyOnly;
  return `
<path d="M24 270C24 206 52 170 96 160L144 160C188 170 216 206 216 270Z" fill="${BODY}" stroke="${LINE}" stroke-width="2.4" stroke-linejoin="round"/>
<rect x="107" y="116" width="26" height="48" rx="10" fill="${SKIN_SHADE}" stroke="${LINE}" stroke-width="2.4"/>
<g transform="rotate(${tilt} 120 150)"><g${animId && (has('nod') || has('shake')) ? ` class="hd-${animId}"` : ''}>${head}</g></g>${arrows}`;
};

interface HandSpec { h: string; o: [Dir, Dir]; l: string; a: string; left: boolean; dx: number; dy: number; yaw: number; pitch: number; to?: string; eo?: [Dir, Dir]; eh?: string; ea?: string; curve?: string }
const AXIS: Record<Dir, 'x' | 'y' | 'z'> = { left: 'x', right: 'x', up: 'y', down: 'y', out: 'z', in: 'z' };
const pairDirs = (v: string | undefined, def: string, left: boolean): [Dir, Dir] => {
  const [pa, fi] = (v ?? def).split(','); const d: [Dir, Dir] = [dirOf(pa, left), dirOf(fi ?? 'up', left)];
  // The palm normal and the finger direction of a real hand are perpendicular; anything else is a mistake in the spec.
  if (AXIS[d[0]] === AXIS[d[1]]) throw new Error(`Bad sign orientation "${v ?? def}": palm and fingers must point along different axes`);
  return d;
};
const handSpec = (p: Record<string, string>, sfx: '' | '2'): HandSpec | null => {
  const h = p['h' + sfx]; if (!h) return null;
  const left = sfx === '2';
  return {
    h, o: pairDirs(p['o' + sfx], 'out,up', left), l: p['l' + sfx] ?? (sfx ? 'neutral2' : 'neutral'), a: p['a' + sfx] ?? 'c', left,
    dx: Number(p['x' + sfx] ?? 0), dy: Number(p['y' + sfx] ?? 0), yaw: Number(p['yaw' + sfx] ?? 0), pitch: Number(p['pitch' + sfx] ?? 0),
    to: p['to' + sfx], eo: p['eo' + sfx] ? pairDirs(p['eo' + sfx], 'out,up', left) : undefined, eh: p['eh' + sfx], ea: p['ea' + sfx], curve: p['curve' + sfx],
  };
};

const SCALE = 0.7;
function place(hs: HandSpec, scale = SCALE, dim = false) {
  const g = buildHand(hs.h, hs.o[0], hs.o[1], hs.left, { yaw: hs.yaw, pitch: hs.pitch });
  const probe = drawHand(g, scale, 0, 0); const [x0, y0, x1, y1] = probe.bbox;
  const [lx, ly] = LOCATIONS[hs.l] ?? LOCATIONS.neutral;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const f = hs.o[1];
  const anchors: Record<string, [number, number]> = {
    c: [cx, cy], tip: f === 'up' ? [cx, y0] : f === 'down' ? [cx, y1] : f === 'left' ? [x0, cy] : f === 'right' ? [x1, cy] : [cx, cy],
    heel: f === 'up' ? [cx, y1] : f === 'down' ? [cx, y0] : f === 'left' ? [x1, cy] : f === 'right' ? [x0, cy] : [cx, cy],
    index: probe.ext.index, thumb: probe.ext.thumb, pinky: probe.ext.pinky, palm: probe.ext.palmc, top: [cx, y0], bottom: [cx, y1], left: [x0, cy], right: [x1, cy],
  };
  const [ax, ay] = anchors[hs.a] ?? anchors.c;
  const tx = lx + hs.dx - ax, ty = ly + hs.dy - ay;
  const placed = drawHand(g, scale, tx, ty, { dim });
  return { ...placed, at: [lx + hs.dx, ly + hs.dy] as [number, number], tips: { index: placed.ext.index, pinky: placed.ext.pinky }, center: [cx + tx, cy + ty] as [number, number] };
}

/** One hand: the start pose (faded if there is an end pose), the end pose, and the arrow between them. */
function drawOne(hs: HandSpec, scale: number): { svg: string; end: [number, number]; arrow: string } {
  if (!hs.to) { const pl = place(hs, scale); return { svg: pl.svg, end: pl.at, arrow: '' }; }
  const start = place(hs, scale, true);
  const endSpec: HandSpec = { ...hs, l: hs.to, o: hs.eo ?? hs.o, h: hs.eh ?? hs.h, a: hs.ea ?? hs.a, dx: 0, dy: 0, to: undefined };
  const end = place(endSpec, scale);
  const [sx, sy] = start.center, [ex, ey] = end.center;
  const arrow = hs.curve ? curved(sx, sy, ex, ey, hs.curve) : line(sx, sy, ex, ey);
  return { svg: start.svg + end.svg, end: [ex, ey], arrow };
}


// ───────────────────────── Animation ─────────────────────────
// Each figure can play as a short loop: the dominant hand starts at pose ① (shown as a faint ghost), travels along the arrow to
// pose ② (also a ghost), then performs the movement marks (circle, tap, wiggle…). Numbered badges and a plain-English caption
// (see describeMotion) say which way to move, so nobody has to decode an arrow.
let animCount = 0;
interface Pose { t: number; x: number; y: number; r: number; sx: number; sy: number; op: number }
type Seg = (u: number) => Partial<Pose>;
const smooth = (u: number) => u * u * (3 - 2 * u);
const FINGER_VEC: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], out: [0, 0], in: [0, 0] };
/** One movement token → a function of progress u∈[0,1] returning the pose change, relative to where the previous token ended. */
function segFor(tok: string, k: number, finger: Dir): { seg: Seg; end: [number, number]; weight: number } | null {
  const L = 34 * k; const v = VEC[tok];
  if (v) return { seg: (u) => ({ x: v[0] * L * smooth(u), y: v[1] * L * smooth(u) }), end: [v[0] * L, v[1] * L], weight: 1 };
  const osc = (ax: number, ay: number, n: number): Seg => (u) => { const w = Math.sin(u * Math.PI * 2 * n); return { x: ax * w, y: ay * w }; };
  switch (tok) {
    case 'circle': case 'circle-ccw': { const r = 17, cw = tok === 'circle'; return { seg: (u) => { const a = u * Math.PI * 2; return { x: (cw ? -1 : 1) * r * Math.sin(a), y: -r + r * Math.cos(a) }; }, end: [0, 0], weight: 1.6 }; }
    case 'tap': { const [fx, fy] = FINGER_VEC[finger]; const f = fx || fy ? 1 : 0; return { seg: (u) => { const w = Math.abs(Math.sin(u * Math.PI * 2)); return f ? { x: fx * 9 * w, y: fy * 9 * w } : { sx: 1 + 0.1 * w, sy: 1 + 0.1 * w }; }, end: [0, 0], weight: 1.3 }; }
    case 'wiggle': return { seg: osc(7, 0, 3), end: [0, 0], weight: 1.3 };
    case 'shake': return { seg: osc(12, 0, 2), end: [0, 0], weight: 1.2 };
    case 'bounce': return { seg: (u) => ({ y: 14 * Math.abs(Math.sin(u * Math.PI * 2)) }), end: [0, 0], weight: 1.2 };
    case 'twist': return { seg: (u) => ({ r: 26 * Math.sin(u * Math.PI * 2) }), end: [0, 0], weight: 1.2 };
    case 'flip': return { seg: (u) => ({ sy: Math.cos(smooth(u) * Math.PI) }), end: [0, 0], weight: 1 };
    case 'arc': return { seg: (u) => ({ x: 44 * smooth(u), y: -52 * smooth(u) * (1 - smooth(u)) }), end: [44, 0], weight: 1 };
    case 'close': return { seg: (u) => ({ sx: 1 - 0.2 * Math.sin(u * Math.PI) }), end: [0, 0], weight: 0.8 };
    case 'open': return { seg: (u) => ({ sx: 1 + 0.2 * Math.sin(u * Math.PI) }), end: [0, 0], weight: 0.8 };
    case 'out': case 'fwd': return { seg: (u) => ({ sx: 1 + 0.16 * Math.sin(u * Math.PI), sy: 1 + 0.16 * Math.sin(u * Math.PI) }), end: [0, 0], weight: 0.9 };
    case 'in': case 'back': return { seg: (u) => ({ sx: 1 - 0.14 * Math.sin(u * Math.PI), sy: 1 - 0.14 * Math.sin(u * Math.PI) }), end: [0, 0], weight: 0.9 };
    default: return null;
  }
}
/** Sampled timeline: hold at ①, travel to ②, perform the movement marks, hold, fade, restart. */
function timeline(d: [number, number] | null, tokens: string[], k: number, finger: Dir): Pose[] {
  const P: Pose[] = []; const N = 3;
  const push = (t: number, x: number, y: number, extra: Partial<Pose> = {}) => P.push({ t, x, y, r: 0, sx: 1, sy: 1, op: 1, ...extra });
  push(0, 0, 0); push(0.1, 0, 0);
  let t = 0.1; let bx = 0, by = 0;
  const parts = tokens.map((tk) => segFor(tk, k, finger)).filter(Boolean) as NonNullable<ReturnType<typeof segFor>>[];
  const totalW = (d ? 1.4 : 0) + parts.reduce((a, p) => a + p.weight, 0) || 1; const span = 0.78 - 0.1;
  if (d) { const dt = (1.4 / totalW) * span; for (let i = 1; i <= 12; i++) { const u = smooth(i / 12); push(t + dt * (i / 12), d[0] * u, d[1] * u, { op: 1 }); } t += dt; bx = d[0]; by = d[1]; }
  for (const p of parts) {
    const dt = (p.weight / totalW) * span;
    for (let i = 1; i <= 16; i++) { const o = p.seg(i / 16); push(t + dt * (i / 16), bx + (o.x ?? 0), by + (o.y ?? 0), { r: o.r ?? 0, sx: o.sx ?? 1, sy: o.sy ?? 1 }); }
    t += dt; bx += p.end[0]; by += p.end[1];
  }
  const last = P[P.length - 1]; push(0.94, last.x, last.y, { r: last.r, sx: last.sx, sy: last.sy });
  push(0.98, last.x, last.y, { r: last.r, sx: last.sx, sy: last.sy, op: 0 }); push(1, 0, 0, { op: 0 });
  void N; return P;
}
const f1 = (n: number) => Math.round(n * 10) / 10;
function keyframes(name: string, P: Pose[], shift: [number, number] = [0, 0], fade?: 'out' | 'in', dPath?: [number, number] | null): string {
  const frames = P.map((q) => {
    let op = q.op;
    if (fade && dPath) { const prog = Math.min(1, Math.hypot(q.x, q.y) / (Math.hypot(dPath[0], dPath[1]) || 1)); const mid = smooth(Math.min(1, Math.max(0, (prog - 0.35) / 0.4))); op = q.op * (fade === 'out' ? 1 - mid : mid); }
    return `${f1(q.t * 100)}%{transform:translate(${f1(q.x + shift[0])}px,${f1(q.y + shift[1])}px) rotate(${f1(q.r)}deg) scale(${f1(q.sx)},${f1(q.sy)});opacity:${f1(op)}}`;
  });
  return `@keyframes ${name}{${frames.join('')}}`;
}
const NAMES: Record<string, string> = { forehead: 'your forehead', temple: 'your temple', eye: 'your eye', nose: 'your nose', mouth: 'your mouth', lip: 'your lips', chin: 'your chin', cheek: 'your cheek', ear: 'your ear', jaw: 'your jaw', neck: 'your neck', shoulder: 'your shoulder', chest: 'your chest', center: 'the centre of your chest', heart: 'your heart side', stomach: 'your stomach', neutral: 'in front of you', neutral2: 'in front of you (left)', high: 'high in front', front: 'in front of you', low: 'low in front', side: 'out to the side', above: 'above your head', 'front-high': 'in front, high', 'front-mid': 'in front, middle height', 'wave-left': 'out to the side, shoulder height', 'wave-right': 'out to the other side', 'head-top': 'the top of your head', 'cheek-low': 'low on your cheek' };
const place_ = (k: string) => NAMES[k] ?? k.replace(/-/g, ' ');
const MOVE_TEXT: Record<string, string> = { up: 'up', down: 'down', left: 'to the left (your left as you face the screen: the signer’s right)', right: 'to the right', ul: 'up and to the left', ur: 'up and to the right', dl: 'down and to the left', dr: 'down and to the right', out: 'forward, away from the signer’s body', fwd: 'forward', in: 'back toward the signer’s body', back: 'back toward the body', circle: 'in a small circle (clockwise as you see it)', 'circle-ccw': 'in a small circle (counter-clockwise as you see it)', tap: 'tap twice', wiggle: 'wiggle the fingers', shake: 'shake side to side', twist: 'twist the wrist', arc: 'in an arc', flip: 'flip the hand over', bounce: 'bounce down and up', close: 'squeeze closed', open: 'open out' };
/** Plain-English description of what the hands do and which way they move, derived from the spec. */
export function describeMotion(spec: string): { move: string; face: string } {
  const p = parseSpec(spec); if (p.fs || p.num) return { move: p.fs === 'J' ? 'Draw a J: down, then curve toward the signer’s body.' : p.fs === 'Z' ? 'Draw a Z: across, diagonal down, across.' : '', face: '' };
  const bits: string[] = [];
  if (p.h) {
    const o = (p.o ?? 'out,up').split(',')[0]; const palm = ({ out: 'palm facing out (toward you)', in: 'palm facing the signer', up: 'palm up', down: 'palm down', left: 'palm to the side', right: 'palm to the side', mid: 'palm toward the body', lat: 'palm away from the body' } as Record<string, string>)[o];
    bits.push(`Start ${place_(p.l ?? 'neutral')}${palm ? `, ${palm}` : ''}.`);
    if (p.to) bits.push(`Move to ${place_(p.to)}.`);
    const mv = (p.m ?? '').split('+').filter(Boolean).map((m) => MOVE_TEXT[m]).filter(Boolean);
    if (mv.length) bits.push(`Then ${mv.join(', then ')}.`);
    if (!p.to && !mv.length) bits.push('Hold the position (no movement).');
    if (p.r) bits.push(`Repeat ${p.r} times.`);
  }
  if (p.h2) bits.push(p.to2 ? 'The other hand moves too.' : 'The other hand stays still as a base.');
  const FACE: Record<string, string> = { 'brows-up': 'eyebrows up', 'brows-down': 'eyebrows down', wide: 'eyes wide', squint: 'eyes squinted', tilt: 'head tilted', nod: 'nod', shake: 'shake your head', puff: 'puff the cheeks', mm: 'lips pressed (“mm”)', th: 'tongue out (“th”)', cha: 'mouth open wide (“cha”)', oo: 'lips rounded (“oo”)', frown: 'frown', smile: 'smile', lean: 'lean in', neutral: 'neutral face' };
  const face = (p.nm ?? '').split('+').filter(Boolean).map((t) => FACE[t] ?? t).join(', ');
  return { move: bits.join(' '), face };
}

export function signSvg(spec: string, opts: { animate?: boolean } = {}): string {
  const p = parseSpec(spec);
  const wrap = (w: number, h: number, inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="16" fill="${BG}" stroke="#DDD6CB" stroke-width="2"/>${inner}</svg>`;
  const card = (shape: string, o: [Dir, Dir], yaw: number | undefined, pathKind?: string) => {
    const g = buildHand(shape, o[0], o[1], false, { yaw });
    const probe = drawHand(g, 1, 0, 0); const [x0, y0, x1, y1] = probe.bbox;
    const s = Math.min(1.5, 170 / (x1 - x0), 170 / (y1 - y0)); const pr2 = drawHand(g, s, 0, 0); const [a, b, c, e] = pr2.bbox;
    const tx = 120 - (a + c) / 2, ty = 125 - (b + e) / 2; const hand = drawHand(g, s, tx, ty);
    let path = '';
    if (pathKind === 'J') { const [sx, sy] = hand.ext.pinky; path = halo(`M${sx} ${sy - 4}C${sx} ${sy + 50} ${sx - 6} ${sy + 62} ${sx - 38} ${sy + 52}`, 3.6, 'stroke-dasharray="1 7"') + arrowHead(sx - 38, sy + 52, Math.atan2(-10, -32)); }
    if (pathKind === 'Z') { const [sx, sy] = hand.ext.index; const w = 46; path = halo(`M${sx - w / 2} ${sy - 10}L${sx + w / 2} ${sy - 10}L${sx - w / 2} ${sy + 26}L${sx + w / 2} ${sy + 26}`, 3.6) + arrowHead(sx + w / 2, sy + 26, 0); }
    return wrap(240, 250, hand.svg + path);
  };
  if (p.fs) {
    const d = FS[p.fs.toUpperCase()]; if (!d) return wrap(240, 240, '');
    return card(d.shape, d.o, d.yaw, d.path);
  }
  if (p.num) {
    const n = NUM[p.num]; if (!n) return wrap(240, 240, '');
    return card(n.shape, n.o, n.yaw);
  }
  const nm = (p.nm ?? '').split('+').filter(Boolean);
  const hs = handSpec(p, ''), hs2 = handSpec(p, '2');
  const scale = p.s ? Number(p.s) : SCALE;
  const badge = (n: number, bb: [number, number, number, number]) => `<g><circle cx="${f1(bb[0] - 2)}" cy="${f1(bb[1] - 2)}" r="10" fill="${ACCENT}" stroke="${HALO}" stroke-width="2"/><text x="${f1(bb[0] - 2)}" y="${f1(bb[1] + 2)}" text-anchor="middle" font-size="12" font-weight="800" font-family="system-ui,sans-serif" fill="#fff">${n}</text></g>`;
  const tokens = (p.m ?? '').split('+').filter(Boolean);
  const id = `a${++animCount}`;
  const animate = !!opts.animate && !!hs && (!!hs.to || tokens.some((t) => segFor(t, 1, 'up')));
  let out = face(nm, false, animate ? id : '');
  let arrows = ''; let css = '';
  if (hs2) { const d = drawOne(hs2, scale); out += d.svg; arrows += d.arrow; }
  if (hs && animate) {
    const finger = hs.o[1];
    const startPl = place(hs, scale), startGhost = place(hs, scale, true);
    let d: [number, number] | null = null; let endSolid = '', endGhost = '', end: [number, number] = startPl.at;
    let shape = false; let numbered = '';
    if (hs.to) {
      const es: HandSpec = { ...hs, l: hs.to, o: hs.eo ?? hs.o, h: hs.eh ?? hs.h, a: hs.ea ?? hs.a, dx: 0, dy: 0, to: undefined };
      const e = place(es, scale); const eg = place(es, scale, true);
      d = [e.center[0] - startPl.center[0], e.center[1] - startPl.center[1]]; end = e.center; endSolid = e.svg; endGhost = eg.svg;
      shape = es.h !== hs.h || es.o[0] !== hs.o[0] || es.o[1] !== hs.o[1];
      arrows += hs.curve ? curved(startPl.center[0], startPl.center[1], e.center[0], e.center[1], hs.curve) : line(startPl.center[0], startPl.center[1], e.center[0], e.center[1]);
      numbered = badge(1, startPl.bbox) + badge(2, e.bbox);
    }
    // marks (circle, tap, wiggle…) are drawn from the end of the path, exactly as in the static figure
    let [cx, cy] = hs.to ? end : startPl.center;
    for (const tok of tokens) { const mv = movement(tok, cx, cy, p.k ? Number(p.k) : 1); arrows += mv.svg; [cx, cy] = mv.end; }
    if (p.r) arrows += `<text x="${Math.min(222, cx + 14)}" y="${Math.max(24, cy - 12)}" font-size="15" font-weight="800" font-family="system-ui,sans-serif" fill="${ACCENT}" stroke="${HALO}" stroke-width="3" paint-order="stroke">×${p.r}</text>`;
    const P = timeline(d, tokens, p.k ? Number(p.k) : 1, finger);
    // layer order: ghosts and arrows underneath, moving hand on top
    out += (hs.to ? startGhost.svg + endGhost : '');
    const guide = arrows + numbered; arrows = '';
    css += keyframes(`k${id}`, P, [0, 0], shape ? 'out' : undefined, d);
    out += `<g class="mv-${id}">${startPl.svg}</g>`;
    if (shape && d) { css += keyframes(`k${id}b`, P, [-d[0], -d[1]], 'in', d); out += `<g class="mv-${id} mb-${id}">${endSolid}</g>`; }
    out += guide;                                   // arrows and badges sit on top of the moving hand so they are never hidden by it
    css += `.mv-${id}{transform-box:fill-box;transform-origin:50% 50%;animation:k${id} calc(4.2s * var(--sign-speed,1)) linear infinite}${shape ? `.mb-${id}{animation-name:k${id}b}` : ''}`;
    if (nm.includes('nod')) css += `@keyframes hdn${id}{0%,100%{transform:translateY(0)}25%,75%{transform:translateY(5px)}50%{transform:translateY(0)}}.hd-${id}{animation:hdn${id} 1.4s ease-in-out infinite}`;
    if (nm.includes('shake')) css += `@keyframes hds${id}{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}.hd-${id}{transform-box:fill-box;transform-origin:50% 90%;animation:hds${id} 1.4s ease-in-out infinite}`;
  } else {
    if (hs) {
      const d = drawOne(hs, scale); out += d.svg; arrows += d.arrow;
      let [cx, cy] = d.end;
      // trailing movement glyphs (repeat marks, circles, taps…) are drawn from the end of the path
      for (const tok of tokens) { const mv = movement(tok, cx, cy, p.k ? Number(p.k) : 1); arrows += mv.svg; [cx, cy] = mv.end; }
      if (p.r) arrows += `<text x="${Math.min(222, cx + 14)}" y="${Math.max(24, cy - 12)}" font-size="15" font-weight="800" font-family="system-ui,sans-serif" fill="${ACCENT}" stroke="${HALO}" stroke-width="3" paint-order="stroke">×${p.r}</text>`;
      if (hs.to) { const st = place(hs, scale, true); const en = place({ ...hs, l: hs.to, o: hs.eo ?? hs.o, h: hs.eh ?? hs.h, a: hs.ea ?? hs.a, dx: 0, dy: 0, to: undefined }, scale); arrows += badge(1, st.bbox) + badge(2, en.bbox); }
    }
  }
  return wrap(280, 270, `${css ? `<style>${css}</style>` : ''}<g transform="translate(20 0)">${out}${arrows}</g>`);
}

/** Number cards 1–10. Dictionaries draw them palm-to-viewer so every finger can be counted; in conversation signers vary. */
export const NUM: Record<string, { shape: string; o: [Dir, Dir]; yaw?: number }> = {
  '1': { shape: '1', o: ['out', 'up'] }, '2': { shape: 'V', o: ['out', 'up'] }, '3': { shape: '3', o: ['out', 'up'] }, '4': { shape: '4', o: ['out', 'up'] },
  '5': { shape: '5', o: ['out', 'up'] }, '6': { shape: '6', o: ['out', 'up'] }, '7': { shape: '7', o: ['out', 'up'] }, '8': { shape: '8', o: ['out', 'up'] },
  '9': { shape: 'F', o: ['out', 'up'] }, '10': { shape: '10', o: ['out', 'up'] },
};
