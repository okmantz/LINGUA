// Answer checking and text utilities (language-agnostic, accent-aware).
export const norm = (s: string) =>
  s.toLowerCase().replace(/[’`´]/g, "'").replace(/[¡¿!?.,;:"“”«»()…]/g, ' ').replace(/\s+/g, ' ').trim();

/** Fold diacritics and German digraphs so "schoen"/"schön"/"schon-ish" comparisons are explicit. */
export const fold = (s: string) =>
  norm(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '');

export function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

export type Verdict = 'exact' | 'accent' | 'close' | 'wrong';
/** exact = perfect · accent = right letters but diacritics missing · close = 1 typo (not accepted) · wrong */
export function checkAnswer(input: string, answers: string[]): Verdict {
  const n = norm(input);
  if (!n) return 'wrong';
  if (answers.some((a) => norm(a) === n)) return 'exact';
  const f = fold(input);
  if (answers.some((a) => fold(a) === f)) return 'accent';
  if (f.length >= 5 && answers.some((a) => lev(fold(a), f) <= 1)) return 'close';
  return 'wrong';
}

const ARTICLES = /^(?:(?:el|la|los|las|un|una|unos|unas|le|les|une|des|der|die|das|ein|eine|einen|dem|den)\s+|l')/i;
/** Strip a leading article: "la casa" → "casa", "l'eau" → "eau". */
export const coreWord = (t: string) => t.replace(ARTICLES, '').trim();

export const shuffle = <T,>(arr: T[], rnd: () => number = Math.random): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
/** Small deterministic PRNG so sessions/tests are reproducible. */
export const mulberry32 = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Word-level similarity (0..1) between a target sentence and a transcript. */
export function sentenceSimilarity(target: string, heard: string): number {
  const a = fold(target).split(' ').filter(Boolean), b = fold(heard).split(' ').filter(Boolean);
  if (!a.length || !b.length) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length] / Math.max(a.length, b.length);
}

export const countWords = (s: string) => (s.trim().match(/[\p{L}\p{N}']+/gu) ?? []).length;
export const hashStr = (s: string) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
