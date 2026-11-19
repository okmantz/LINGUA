import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// Two builds:
//  - default  : GitHub Pages site (relative base + HashRouter => works on any path), with PWA.
//  - --mode offline : ONE self-contained file (dist-offline/index.html) that works when
//    double-clicked from disk (file://), where browsers block separate module scripts.
export default defineConfig(({ mode }) => {
  const offline = mode === 'offline';
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      ...(offline
        ? [viteSingleFile()]
        : [
            VitePWA({
              registerType: 'autoUpdate',
              manifest: {
                name: 'LINGUA — Language Acquisition',
                short_name: 'LINGUA',
                description: 'Science-based, local-first language learning',
                theme_color: '#0f172a',
                background_color: '#0f172a',
                display: 'standalone',
                start_url: './',
                scope: './',
                icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
              },
              workbox: { globPatterns: ['**/*.{js,css,html,svg,json,woff2}'] },
            }),
          ]),
    ],
    resolve: offline
      ? { alias: { 'virtual:pwa-register': fileURLToPath(new URL('./src/pwa-stub.ts', import.meta.url)) } }
      : {},
    build: offline ? { outDir: 'dist-offline', emptyOutDir: true, assetsInlineLimit: 100_000_000 } : {},
    test: { environment: 'jsdom', include: ['src/**/*.test.ts'], setupFiles: ['src/test/setup.ts'] },
  };
});
