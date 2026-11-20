// Integrity check for the committed GitHub Pages build in /docs.
// Exits 1 if any file referenced by the built HTML/JS/CSS/manifest is missing from docs/ -- the exact
// failure behind "The app failed to load" when /docs is uploaded or committed only partially.
// Usage: node scripts/verify-docs.mjs [dir]   (default: docs)
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative, dirname } from 'node:path';

const root = resolve(process.argv[2] ?? 'docs');
if (!existsSync(join(root, 'index.html'))) { console.error(`verify-docs: ${root}/index.html not found`); process.exit(1); }

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root);
const missing = new Map(); // missing path -> set of referencing files
const EXT = '(?:js|css|webp|png|jpe?g|svg|woff2?|webmanifest)';

// A reference "./x" or "assets/x" may be relative to the referencing file's folder OR to the site root
// (the service-worker/manifest paths are page-relative), so it only counts as missing if neither exists.
function check(from, ref) {
  const clean = ref.replace(/^\.\//, '').replace(/^\//, '');
  const candidates = [resolve(dirname(from), clean), resolve(root, clean)];
  if (candidates.some(existsSync)) return;
  const key = relative(root, candidates[0]);
  if (!missing.has(key)) missing.set(key, new Set());
  missing.get(key).add(relative(root, from));
}

for (const f of files.filter((p) => /\.(html|js|css|webmanifest)$/.test(p))) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(new RegExp(`(?:["'\`(=]|\\s)(\\.{0,2}/?(?:assets/)?[A-Za-z0-9_-][A-Za-z0-9_.-]*\\.${EXT})(?=["'\`)\\s>])`, 'g'))) {
    const ref = m[1];
    // only hashed build assets (name-HASH.ext), icons and the assets/ folder; ignore prose/library strings
    if (/-[A-Za-z0-9_-]{8}\.\w+$/.test(ref) || ref.includes('assets/') || /^(\.\/)?(icon|apple-touch-icon)/.test(ref) || /^(\.\/)?(sw|workbox-[0-9a-f]+)\.js$/.test(ref)) check(f, ref);
  }
}
for (const f of ['index.html', '404.html', 'lingua.html', 'sw.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', '.nojekyll'])
  if (!existsSync(join(root, f))) missing.set(f, new Set(['(required file)']));

if (missing.size) {
  console.error(`verify-docs: ${missing.size} file(s) referenced but MISSING from ${root}:`);
  for (const [m, by] of missing) console.error(`  - ${m}   (needed by ${[...by].slice(0, 2).join(', ')}${by.size > 2 ? ', ...' : ''})`);
  console.error('\nRe-run `npm run build:pages` and commit the WHOLE docs/ folder (including every file in docs/assets/).');
  process.exit(1);
}
console.log(`verify-docs: OK (${files.length} files, every reference resolves)`);
