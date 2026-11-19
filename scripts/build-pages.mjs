// Builds the PWA and the single-file offline build into /docs so GitHub Pages can
// serve the repo directly: Settings -> Pages -> Deploy from a branch -> main -> /docs.
import { execSync } from 'node:child_process';
import { cpSync, rmSync, readdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';

const run = (c) => execSync(c, { stdio: 'inherit' });
run('npm run build');
run('npm run build:offline');

// Clear old build output in docs/ but keep hand-written markdown docs.
for (const f of readdirSync('docs')) {
  if (f.endsWith('.md') || f === '.gitkeep') continue;
  rmSync(`docs/${f}`, { recursive: true, force: true });
}
cpSync('dist', 'docs', { recursive: true });
copyFileSync('dist/index.html', 'docs/404.html');
copyFileSync('dist-offline/index.html', 'docs/lingua.html');
writeFileSync('docs/.nojekyll', '');
console.log('\nBuilt site into docs/ -> commit and push it.');
