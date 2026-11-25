// Turns a compact sign spec into one consistent SVG figure.
//
//   fs=A                              fingerspelling card: one hand, standard chart pose (J and Z draw their path)
//   h=B o=out,up l=chin a=tip m=down  a sign: handshape, palm,finger direction, location, anchor, movement
//   h2=B o2=up,out l2=neutral2        optional second (non-dominant) hand
//   x=4 y=-6  yaw=-30  pitch=0        optional nudge / viewing angle      r=2  (repeat marker)
//
// Figures show a right-handed signer facing you, so their right (dominant) hand is on YOUR left. Left-handed signers mirror
// everything. Arrows show the path of the dominant hand; ⊙ means "towards you" and ⊗ "towards the signer".
import { buildHand, drawHand, FS, LINE, SKIN, SKIN_SHADE, type Dir } from './handModel';

const ACCENT = '#E8590C', BG = '#F6F3EE', BODY = '#AEBBD0', HAIR = '#5B4636';
export const LOCATIONS: Record<string, [number, number]> = {
  forehead: [108, 52], temple: [94, 56], eye: [106, 76], nose: [118, 90], mouth: [118, 103], chin: [118, 119], cheek: [98, 98], ear: [86, 80],
  neck: [118, 142], shoulder: [76, 168], 'shoulder2': [164, 168], chest: [100, 192], center: [120, 192], heart: [138, 190], stomach: [112, 228],
  neutral: [92, 206], neutral2: [150, 206], high: [92, 160], front: [120, 206], low: [100, 240], side: [60, 206], above: [100, 120],
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

const arrowHead = (x: number, y: number, ang: number, s = 9) => {
  const a = (d: number) => [x - s * Math.cos(ang + d), y - s * Math.sin(ang + d)].map((n) => Math.round(n * 10) / 10);
  const [p, q] = [a(0.45), a(-0.45)]; return `<path d="M${x} ${y}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${ACCENT}"/>`;
};
const line = (x1: number, y1: number, x2: number, y2: number, dash = '') =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${ACCENT}" stroke-width="3.2" stroke-linecap="round" fill="none"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` + arrowHead(x2, y2, Math.atan2(y2 - y1, x2 - x1));
const VEC: Record<string, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], ul: [-0.7, -0.7], ur: [0.7, -0.7], dl: [-0.7, 0.7], dr: [0.7, 0.7] };

/** Movement glyphs, drawn from a start point; returns svg and the end point so tokens can be chained (e.g. "down+out"). */
function movement(tok: string, x: number, y: number, k = 1): { svg: string; end: [number, number] } {
  const L = 34 * k;
  if (VEC[tok]) { const [dx, dy] = VEC[tok]; const ex = x + dx * L, ey = y + dy * L; return { svg: line(x, y, ex, ey), end: [ex, ey] }; }
  if (tok === 'out' || tok === 'fwd') return { svg: `<g fill="none" stroke="${ACCENT}" stroke-width="3"><circle cx="${x + 16}" cy="${y - 16}" r="10"/></g><circle cx="${x + 16}" cy="${y - 16}" r="3.4" fill="${ACCENT}"/>`, end: [x + 16, y - 16] };
  if (tok === 'in' || tok === 'back') { const cx = x + 16, cy = y - 16; return { svg: `<g fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"><circle cx="${cx}" cy="${cy}" r="10"/><path d="M${cx - 5} ${cy - 5}L${cx + 5} ${cy + 5}M${cx + 5} ${cy - 5}L${cx - 5} ${cy + 5}"/></g>`, end: [cx, cy] }; }
  if (tok === 'circle' || tok === 'circle-ccw') {
    const r = 17, cw = tok === 'circle'; const sx = x, sy = y - r;
    const ex = x + (cw ? -1 : 1) * 6, ey = y - r - 2; const sw = cw ? 1 : 0;
    return { svg: `<path d="M${sx} ${sy + 2 * r}A${r} ${r} 0 1 ${sw} ${ex} ${ey + 4}" stroke="${ACCENT}" stroke-width="3.2" fill="none" stroke-linecap="round"/>` + arrowHead(ex, ey + 4, cw ? Math.PI * 0.05 : Math.PI * 0.95), end: [x, y] };
  }
  if (tok === 'tap') return { svg: [[-16, -6], [0, -17], [16, -6]].map(([dx, dy]) => `<path d="M${x + dx * 0.55} ${y + dy * 0.55}L${x + dx} ${y + dy}" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>`).join(''), end: [x, y] };
  if (tok === 'wiggle') return { svg: `<path d="M${x - 20} ${y}l8 -8l8 16l8 -16l8 16l8 -8" stroke="${ACCENT}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, end: [x, y] };
  if (tok === 'shake') return { svg: line(x, y, x + 24, y) + line(x, y, x - 24, y), end: [x, y] };
  if (tok === 'twist') return { svg: `<path d="M${x - 16} ${y + 6}A18 18 0 0 1 ${x + 16} ${y + 6}" stroke="${ACCENT}" stroke-width="3.2" fill="none" stroke-linecap="round"/>` + arrowHead(x + 16, y + 6, 1.2), end: [x, y] };
  if (tok === 'arc') return { svg: `<path d="M${x} ${y}Q${x + 22} ${y - 26} ${x + 44} ${y}" stroke="${ACCENT}" stroke-width="3.2" fill="none" stroke-linecap="round"/>` + arrowHead(x + 44, y, 0.9), end: [x + 44, y] };
  if (tok === 'flip') return { svg: `<path d="M${x - 18} ${y}Q${x} ${y - 24} ${x + 18} ${y}" stroke="${ACCENT}" stroke-width="3.2" fill="none" stroke-linecap="round"/>` + arrowHead(x + 18, y, 0.9), end: [x, y] };
  return { svg: '', end: [x, y] };
}

const face = () => `
<path d="M24 270C24 206 52 170 96 160L144 160C188 170 216 206 216 270Z" fill="${BODY}" stroke="${LINE}" stroke-width="2.4" stroke-linejoin="round"/>
<rect x="107" y="116" width="26" height="48" rx="10" fill="${SKIN_SHADE}" stroke="${LINE}" stroke-width="2.4"/>
<ellipse cx="86" cy="80" rx="6" ry="10" fill="${SKIN}" stroke="${LINE}" stroke-width="2.2"/><ellipse cx="154" cy="80" rx="6" ry="10" fill="${SKIN}" stroke="${LINE}" stroke-width="2.2"/>
<ellipse cx="120" cy="76" rx="34" ry="42" fill="${SKIN}" stroke="${LINE}" stroke-width="2.4"/>
<path d="M86 72C84 42 100 30 120 30C140 30 156 42 154 72C148 56 136 49 120 49C104 49 92 56 86 72Z" fill="${HAIR}" stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round"/>
<g fill="${LINE}"><ellipse cx="106" cy="74" rx="3" ry="3.6"/><ellipse cx="134" cy="74" rx="3" ry="3.6"/></g>
<g fill="none" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round"><path d="M99 65Q106 61 113 64M127 64Q134 61 141 65"/><path d="M120 80Q116 90 121 92"/><path d="M109 103Q120 110 131 103"/></g>`;

interface HandSpec { h: string; o: [Dir, Dir]; l: string; a: string; left: boolean; dx: number; dy: number; yaw: number; pitch: number }
const handSpec = (p: Record<string, string>, sfx: '' | '2'): HandSpec | null => {
  const h = p['h' + sfx]; if (!h) return null;
  const [pa, fi] = (p['o' + sfx] ?? 'out,up').split(',');
  return {
    h, o: [dirOf(pa, sfx === '2'), dirOf(fi ?? 'up', sfx === '2')], l: p['l' + sfx] ?? (sfx ? 'neutral2' : 'neutral'), a: p['a' + sfx] ?? 'c', left: sfx === '2',
    dx: Number(p['x' + sfx] ?? 0), dy: Number(p['y' + sfx] ?? 0), yaw: Number(p['yaw' + sfx] ?? 0), pitch: Number(p['pitch' + sfx] ?? 0),
  };
};

function place(hs: HandSpec, scale = 0.58) {
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
  const placed = drawHand(g, scale, tx, ty);
  return { ...placed, at: [lx + hs.dx, ly + hs.dy] as [number, number], tips: { index: placed.ext.index, pinky: placed.ext.pinky } };
}

export function signSvg(spec: string): string {
  const p = parseSpec(spec);
  const wrap = (w: number, h: number, inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="16" fill="${BG}" stroke="#DDD6CB" stroke-width="2"/>${inner}</svg>`;
  if (p.fs) {
    const d = FS[p.fs.toUpperCase()]; if (!d) return wrap(240, 240, '');
    const g = buildHand(d.shape, d.o[0], d.o[1], false, { yaw: d.yaw });
    const probe = drawHand(g, 1, 0, 0); const [x0, y0, x1, y1] = probe.bbox;
    const s = Math.min(1.5, 170 / (x1 - x0), 170 / (y1 - y0)); const pr2 = drawHand(g, s, 0, 0); const [a, b, c, e] = pr2.bbox;
    const tx = 120 - (a + c) / 2, ty = 125 - (b + e) / 2; const hand = drawHand(g, s, tx, ty);
    let path = '';
    if (d.path === 'J') { const [sx, sy] = hand.ext.pinky; path = `<path d="M${sx} ${sy - 4}C${sx} ${sy + 50} ${sx - 6} ${sy + 62} ${sx - 38} ${sy + 52}" stroke="${ACCENT}" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-dasharray="1 7"/>` + arrowHead(sx - 38, sy + 52, Math.atan2(-10, -32)); }
    if (d.path === 'Z') { const [sx, sy] = hand.ext.index; const w = 46; path = `<path d="M${sx - w / 2} ${sy - 10}L${sx + w / 2} ${sy - 10}L${sx - w / 2} ${sy + 26}L${sx + w / 2} ${sy + 26}" stroke="${ACCENT}" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + arrowHead(sx + w / 2, sy + 26, 0); }
    return wrap(240, 250, hand.svg + path);
  }
  const hs = handSpec(p, ''), hs2 = handSpec(p, '2');
  let out = face();
  let end: [number, number] | null = null;
  if (hs2) out += place(hs2).svg;
  if (hs) {
    const pl = place(hs); out += pl.svg;
    const [ax, ay] = pl.at; let [cx, cy] = [ax, ay];
    // the path starts at the anchor; a gentle offset keeps the arrow from hiding the hand's key feature
    for (const tok of (p.m ?? '').split('+').filter(Boolean)) {
      const mv = movement(tok, cx, cy, p.k ? Number(p.k) : 1); out += mv.svg; [cx, cy] = mv.end;
    }
    end = [cx, cy];
    if (p.r) out += `<text x="${Math.min(222, cx + 14)}" y="${Math.max(24, cy - 12)}" font-size="15" font-weight="800" font-family="system-ui,sans-serif" fill="${ACCENT}">×${p.r}</text>`;
  }
  void end;
  return wrap(240, 270, out);
}
