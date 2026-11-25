// A small stylised 3-D right-hand model, drawn as SVG.
//
// Why a model instead of 100+ hand-drawn pictures: every handshape is defined once, as joint angles, and every figure is
// the *same* hand seen from a different direction. That keeps all the images visually consistent and means a handshape
// (e.g. the "B hand") looks identical wherever it appears. Foreshortening, overlap and hidden fingers fall out of the
// geometry instead of being drawn by eye.
//
// Hand space: x → thumb side (for a right hand seen palm-on), y → fingertips, z → out of the palm (palm normal).
// World space for figures: X → viewer's right, Y → up, Z → towards the viewer (i.e. away from the signer).
// Honest limit: this is a diagram, not a photograph. Every figure is paired with a written description of the sign.

export type V3 = [number, number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const norm = (a: V3): V3 => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

const KNUCKLE_X = [21, 7, -7, -21];                       // index, middle, ring, pinky
const BONES: [number, number, number][] = [[28, 17, 13], [31, 19, 13], [28, 18, 13], [22, 13, 12]];
const WIDTH = [13, 13.5, 13, 11.5];
const THUMB_BASE: V3 = [24, -38, 0], THUMB_LEN = [24, 20, 16], THUMB_W = 15;
export const SKIN = '#F2C7A2', SKIN_SHADE = '#E3AE86', LINE = '#4A3426', SLEEVE = '#3B5B8C';

/** Per finger: [MCP, PIP, DIP flexion in degrees (+ = towards the palm), spread in degrees (+ = towards the thumb), z lift]. */
type F = [number, number, number, number?, number?];
const ST: F = [0, 0, 0], FIST: F = [90, 100, 55];
export interface Shape { f: [F, F, F, F]; t: [V3, V3, V3]; tz?: number }
const T = (a: V3, b: V3, c: V3): [V3, V3, V3] => [a, b, c];
const SP = (s: number[]): [F, F, F, F] => [[0, 0, 0, s[0]], [0, 0, 0, s[1]], [0, 0, 0, s[2]], [0, 0, 0, s[3]]];
const OPEN = [10, 2, -7, -18];
const TOUT = T([0.85, 0.5, 0.15], [1, 0.25, 0.1], [1, 0.1, 0.1]);        // thumb stretched out to the side
const TSIDE = T([0.45, 0.9, 0.1], [0.15, 1, 0.1], [0, 1, 0.05]);         // thumb up along the side of the hand (A)
const TFLAT = T([0.3, 0.95, 0.1], [0.1, 1, 0.05], [0, 1, 0]);           // thumb alongside the index, in the plane of the hand
const TACROSS = T([-0.55, 0.55, 0.7], [-1, 0.05, 0.35], [-1, 0, 0.25]);  // thumb across the palm / over folded fingers
const TTUCK = T([-0.6, 0.45, 0.35], [-1, 0.3, 0.1], [-1, 0.2, 0]);       // thumb tucked under folded fingers

const f = (a: number, b: number, c: number, s = 0, z = 0): F => [a, b, c, s, z];
const CUP = (n = 1): F => f(35 * n, 38 * n, 28 * n);

export const SHAPES: Record<string, Shape> = {
  '5': { f: SP(OPEN), t: TOUT },
  'B': { f: SP([0, 0, 0, 0]), t: TACROSS },
  'flat': { f: SP([0, 0, 0, 0]), t: TFLAT },                               // flat hand, thumb alongside
  'A': { f: [FIST, FIST, FIST, FIST], t: TSIDE },
  'S': { f: [FIST, FIST, FIST, FIST], t: T([-0.3, 0.35, 0.95], [-1, 0.25, 0.3], [-1, 0.15, 0.1]) },
  '10': { f: [FIST, FIST, FIST, FIST], t: T([0.1, 1, 0.1], [0, 1, 0], [0, 1, 0]) },     // thumbs-up
  'T': { f: [FIST, FIST, FIST, FIST], t: T([-0.3, 0.6, 0.6], [-0.35, 0.95, 0.4], [-0.1, 1, 0.3]) },
  'M': { f: [FIST, FIST, FIST, FIST], t: T([-0.7, 0.4, 0.35], [-1, 0.3, 0.1], [-1, 0.25, 0]) },
  'N': { f: [FIST, FIST, FIST, FIST], t: T([-0.6, 0.45, 0.35], [-0.9, 0.3, 0.1], [-0.9, 0.25, 0]) },
  'E': { f: [f(65, 75, 45), f(65, 75, 45), f(65, 75, 45), f(65, 75, 45)], t: T([-0.2, 0.3, 0.85], [-1, 0.3, 0.2], [-1, 0.25, 0.1]) },
  'C': { f: [CUP(), CUP(), CUP(), CUP()], t: T([0.55, 0.15, 0.45], [0.2, 0.15, 0.85], [-0.1, 0.35, 0.9]) },
  'O': { f: [f(48, 62, 45), f(52, 62, 45), f(55, 60, 45), f(58, 55, 45)], t: T([0.55, 0.3, 0.5], [0.1, 0.45, 0.85], [-0.2, 0.65, 0.75]) },
  'flatO': { f: [f(40, 55, 20), f(42, 55, 20), f(44, 55, 20), f(46, 55, 20)], t: T([0.5, 0.6, 0.4], [0.1, 0.85, 0.45], [-0.3, 0.7, 0.55]) },
  'baby-O': { f: [f(60, 70, 40), FIST, FIST, FIST], t: T([0.3, 0.55, 0.6], [-0.25, 0.8, 0.5], [-0.5, 0.65, 0.5]) },
  '1': { f: [ST, FIST, FIST, FIST], t: TACROSS },
  'D': { f: [ST, f(60, 70, 40), f(62, 68, 40), f(64, 66, 40)], t: T([0.2, 0.55, 0.5], [-0.25, 0.8, 0.55], [-0.6, 0.55, 0.55]) },
  'G': { f: [ST, FIST, FIST, FIST], t: TFLAT },
  'H': { f: [f(0, 0, 0, 2), f(0, 0, 0, -2), FIST, FIST], t: TACROSS },
  'I': { f: [FIST, FIST, FIST, ST], t: TACROSS },
  'L': { f: [ST, FIST, FIST, FIST], t: TOUT },
  'Y': { f: [FIST, FIST, FIST, ST], t: TOUT },
  'ILY': { f: [ST, FIST, FIST, f(0, 0, 0, -8)], t: TOUT },
  'horns': { f: [f(0, 0, 0, 6), FIST, FIST, f(0, 0, 0, -8)], t: TACROSS },
  'U': { f: [f(0, 0, 0, -1), f(0, 0, 0, 1), FIST, FIST], t: TACROSS },
  'V': { f: [f(0, 0, 0, 12), f(0, 0, 0, -9), FIST, FIST], t: TACROSS },
  'R': { f: [f(0, 0, 0, -9, 0), f(0, 0, 0, 9, 2), FIST, FIST], t: TACROSS },
  'W': { f: [f(0, 0, 0, 12), ST, f(0, 0, 0, -12), FIST], t: T([-0.35, 0.3, 0.8], [-0.9, 0.2, 0.55], [-1, 0.25, 0.3]) },
  '3': { f: [ST, f(0, 0, 0, -4), FIST, FIST], t: TOUT },
  '8': { f: [f(0, 0, 0, 8), f(60, 70, 40, 0), f(0, 0, 0, -8), f(0, 0, 0, -18)], t: T([0.45, 0.5, 0.45], [0.05, 0.75, 0.6], [-0.35, 0.65, 0.6]) },
  '7': { f: [f(0, 0, 0, 8), f(0, 0, 0, -2), f(60, 70, 40, 0), f(0, 0, 0, -18)], t: T([0.45, 0.5, 0.45], [0.05, 0.75, 0.6], [-0.35, 0.65, 0.6]) },
  'F': { f: [f(55, 65, 45), ST, f(0, 0, 0, -6), f(0, 0, 0, -16)], t: T([0.45, 0.55, 0.5], [0.0, 0.75, 0.6], [-0.35, 0.65, 0.55]) },
  'X': { f: [f(15, 95, 35), FIST, FIST, FIST], t: TACROSS },
  'K': { f: [ST, f(0, 0, 0, -22, 0), FIST, FIST], t: T([0.1, 0.8, 0.45], [-0.25, 0.9, 0.35], [-0.35, 0.9, 0.2]) },
  'P': { f: [ST, f(0, 0, 0, -22, 0), FIST, FIST], t: T([0.1, 0.8, 0.45], [-0.25, 0.9, 0.35], [-0.35, 0.9, 0.2]) },
  'claw': { f: [f(45, 50, 25, 8), f(45, 50, 25, 2), f(45, 50, 25, -6), f(45, 50, 25, -16)], t: T([0.8, 0.4, 0.45], [0.6, 0.5, 0.55], [0.35, 0.45, 0.65]) },
  'bentB': { f: [f(90, 0, 0), f(90, 0, 0), f(90, 0, 0), f(90, 0, 0)], t: TACROSS },
  'bentV': { f: [f(15, 80, 25, 14), f(15, 80, 25, -10), FIST, FIST], t: TACROSS },
  'bentL': { f: [f(10, 85, 20), FIST, FIST, FIST], t: TOUT },
  'open8': { f: [f(0, 0, 0, 8), f(55, 65, 40), f(0, 0, 0, -8), f(0, 0, 0, -18)], t: TOUT },
};
// Letters that share a handshape with another letter differ by orientation only (G/Q, K/P): see FS below.
SHAPES.Q = SHAPES.G; SHAPES.bentL.f[0] = f(15, 80, 20);

export type Dir = 'out' | 'in' | 'up' | 'down' | 'left' | 'right';
const DIRS: Record<Dir, V3> = { out: [0, 0, 1], in: [0, 0, -1], up: [0, 1, 0], down: [0, -1, 0], left: [-1, 0, 0], right: [1, 0, 0] };

/** Convex hull (monotone chain) of 2-D points. */
function hull(pts: [number, number][]): [number, number][] {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]); if (p.length < 3) return p;
  const cr = (o: [number, number], a: [number, number], b: [number, number]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = []; for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  const up: [number, number][] = []; for (const q of [...p].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
}
interface Chain { pts: V3[]; w: number; z: number; thumb?: boolean; straight?: boolean }
export interface HandGeom { palm: V3[]; chains: Chain[]; cuff: V3[]; dorsal: boolean }

function flexChain(base: V3, bones: number[], fl: number[], spread: number): V3[] {
  const pts: V3[] = [base]; let cum = 0; let p = base;
  fl.forEach((a, i) => {
    cum += a; const c = Math.cos(rad(cum)), s = Math.sin(rad(cum));
    const sx = Math.sin(rad(spread));
    const d = norm([sx * c, Math.cos(rad(spread)) * c, s]);
    p = add(p, mul(d, bones[i])); pts.push(p);
  });
  return pts;
}

/** Build the hand in hand space, rotate it so the palm faces `palm` and the fingers point `fing`, mirror for a left hand. */
export function buildHand(shape: string, palm: Dir, fing: Dir, left = false, view: { yaw?: number; pitch?: number } = {}): HandGeom {
  const sh = SHAPES[shape] ?? SHAPES['5'];
  const y = DIRS[fing], z = DIRS[palm]; const x = cross(y, z);
  const cy = Math.cos(rad(view.yaw ?? 0)), sy = Math.sin(rad(view.yaw ?? 0)), cp = Math.cos(rad(view.pitch ?? 0)), sp = Math.sin(rad(view.pitch ?? 0));
  const cam = (p: V3): V3 => { const a: V3 = [p[0] * cy + p[2] * sy, p[1], -p[0] * sy + p[2] * cy]; return [a[0], a[1] * cp - a[2] * sp, a[1] * sp + a[2] * cp]; };
  const rot = (p: V3): V3 => { const q: V3 = left ? [-p[0], p[1], p[2]] : p; return cam(add(add(mul(x, q[0]), mul(y, q[1])), mul(z, q[2]))); };
  const chains: Chain[] = [];
  sh.f.forEach((fl, i) => {
    const pts = flexChain([KNUCKLE_X[i], 0, fl[4] ?? 0], BONES[i], [fl[0], fl[1], fl[2]], fl[3] ?? 0).map(rot);
    chains.push({ pts, w: WIDTH[i], z: pts.reduce((a, p) => a + p[2], 0) / pts.length + (fl[4] ?? 0) * 0.1, straight: fl[0] + fl[1] + fl[2] < 70 });
  });
  const tp: V3[] = [THUMB_BASE]; let p = THUMB_BASE;
  sh.t.forEach((d, i) => { p = add(p, mul(norm(d), THUMB_LEN[i])); tp.push(p); });
  const tpts = tp.map(rot);
  chains.push({ pts: tpts, w: THUMB_W, z: tpts.reduce((a, q) => a + q[2], 0) / tpts.length + (sh.tz ?? 0), thumb: true });
  // The palm is a slab, not a sheet, so it still has body when seen edge-on.
  const slab: V3[] = [];
  for (const zz of [-10, 10]) for (const [px, py] of [[-28, -60], [28, -60], [28, 4], [-28, 4]]) slab.push(rot([px, py, zz]));
  const palmPts = hull(slab.map((p) => [p[0], -p[1]] as [number, number])).map(([hx, hy]) => [hx, -hy, 0] as V3);
  const cuff = hull(([-12, 12] as number[]).flatMap((zz) => [[-22, -60], [22, -60], [24, -78], [-24, -78]].map(([px, py]) => rot([px, py, zz]))).map((p) => [p[0], -p[1]] as [number, number])).map(([hx, hy]) => [hx, -hy, 0] as V3);
  const nz = rot([0, 0, 1])[2] - rot([0, 0, 0])[2];
  return { palm: palmPts, chains, cuff, dorsal: nz < -0.35 };
}

export interface Placed { svg: string; bbox: [number, number, number, number]; ext: Record<string, [number, number]> }
const r1 = (n: number) => Math.round(n * 10) / 10;
const proj = (p: V3, s: number, tx: number, ty: number): [number, number] => [tx + p[0] * s, ty - p[1] * s];

/** Draw a hand with its origin (the base of the middle finger's knuckle line) at (tx, ty). */
export function drawHand(g: HandGeom, s: number, tx: number, ty: number, opts: { dim?: boolean } = {}): Placed {
  const parts: string[] = [];
  const pl = (pts: V3[], close: boolean) => pts.map((p, i) => { const [x, y] = proj(p, s, tx, ty); return `${i ? 'L' : 'M'}${r1(x)} ${r1(y)}`; }).join('') + (close ? 'Z' : '');
  const stroke = (d: string, w: number, col: string, join = 'round') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${r1(w * s)}" stroke-linecap="round" stroke-linejoin="${join}"/>`;
  const cuffD = pl(g.cuff, true);
  parts.push(`<path d="${cuffD}" fill="${SLEEVE}" stroke="${LINE}" stroke-width="${r1(2.4 * s)}" stroke-linejoin="round"/>`);
  const palmZ = 0;
  const items: { z: number; svg: string }[] = [];
  // Round the palm: pull the hull in towards its centre, then stroke it thick with round joins.
  const cx0 = g.palm.reduce((a, p) => a + p[0], 0) / g.palm.length, cy0 = g.palm.reduce((a, p) => a + p[1], 0) / g.palm.length;
  const inset = g.palm.map((p): V3 => { const dx = p[0] - cx0, dy = p[1] - cy0, l = Math.hypot(dx, dy) || 1, k = Math.max(0, l - 7) / l; return [cx0 + dx * k, cy0 + dy * k, 0]; });
  const palmD = pl(inset, true);
  items.push({ z: palmZ - 0.0001, svg: stroke(palmD, 14 + 2.6, LINE) + stroke(palmD, 14, SKIN) + `<path d="${palmD}" fill="${SKIN}"/>` });
  if (g.dorsal) {               // back of a fist: only the knuckle ridge shows, so draw the knuckles
    g.chains.filter((c) => !c.thumb && !c.straight).forEach((c) => { const d = pl([c.pts[0], c.pts[0]], false); items.push({ z: 0.01, svg: stroke(d, WIDTH[0] + 2.6, LINE) + stroke(d, WIDTH[0], SKIN) }); });
  }
  for (const c of g.chains) {
    const d = pl(c.pts, false);
    let nail = '';
    if (g.dorsal && (c.straight || c.thumb)) {           // fingernails show when the back of the hand faces the viewer
      const a = proj(c.pts[c.pts.length - 2], s, tx, ty), b = proj(c.pts[c.pts.length - 1], s, tx, ty);
      const mx = a[0] + (b[0] - a[0]) * 0.62, my = a[1] + (b[1] - a[1]) * 0.62;
      nail = `<path d="M${r1(mx)} ${r1(my)}L${r1(b[0])} ${r1(b[1])}" stroke="#FBE6D6" stroke-width="${r1(c.w * 0.55 * s)}" stroke-linecap="round" fill="none"/>`;
    }
    items.push({ z: c.z + (c.thumb ? 0.02 : 0), svg: stroke(d, c.w + 2.6, LINE) + stroke(d, c.w, SKIN) + nail });
  }
  items.sort((a, b) => a.z - b.z).forEach((i) => parts.push(i.svg));
  const all = [...g.palm, ...g.chains.flatMap((c) => c.pts)].map((p) => proj(p, s, tx, ty));
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
  const bbox: [number, number, number, number] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  const tips = g.chains.map((c) => proj(c.pts[c.pts.length - 1], s, tx, ty));
  const ext: Placed['ext'] = { palmc: proj([0, -28, 0], s, tx, ty), index: tips[0], middle: tips[1], thumb: tips[4], pinky: tips[3] };
  return { svg: `<g${opts.dim ? ' opacity=".55"' : ''}>${parts.join('')}</g>`, bbox, ext };
}

// ── Fingerspelling: standard chart pose for each letter (palm and finger direction, as signed to a viewer). ──
export const FS: Record<string, { shape: string; o: [Dir, Dir]; path?: string; yaw?: number; note?: string }> = {
  A: { shape: 'A', o: ['out', 'up'] }, B: { shape: 'B', o: ['out', 'up'] }, C: { shape: 'C', o: ['left', 'up'] },
  D: { shape: 'D', o: ['out', 'up'], yaw: -28 }, E: { shape: 'E', o: ['out', 'up'], yaw: -18 }, F: { shape: 'F', o: ['out', 'up'], yaw: -62 },
  G: { shape: 'G', o: ['out', 'left'] }, H: { shape: 'H', o: ['out', 'left'] }, I: { shape: 'I', o: ['out', 'up'] },
  J: { shape: 'I', o: ['out', 'up'], path: 'J' }, K: { shape: 'K', o: ['out', 'up'] }, L: { shape: 'L', o: ['out', 'up'] },
  M: { shape: 'M', o: ['out', 'up'] }, N: { shape: 'N', o: ['out', 'up'] }, O: { shape: 'O', o: ['left', 'up'] },
  P: { shape: 'P', o: ['out', 'down'] }, Q: { shape: 'Q', o: ['out', 'down'] }, R: { shape: 'R', o: ['out', 'up'] },
  S: { shape: 'S', o: ['out', 'up'] }, T: { shape: 'T', o: ['out', 'up'] }, U: { shape: 'U', o: ['out', 'up'] },
  V: { shape: 'V', o: ['out', 'up'] }, W: { shape: 'W', o: ['out', 'up'] }, X: { shape: 'X', o: ['out', 'up'], yaw: -62 },
  Y: { shape: 'Y', o: ['out', 'up'] }, Z: { shape: '1', o: ['out', 'up'], path: 'Z' },
};
