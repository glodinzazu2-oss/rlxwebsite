// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Configuration Astro — REMOLUX
 * - `site` : requis pour sitemap + canonical. À mettre à jour avec le domaine final.
 * - Sortie statique : performance maximale, hébergeable partout (Vercel, Netlify, CDN).
 */
export default defineConfig({
  site: 'https://www.remolux.com',
  integrations: [
    sitemap({
      // Pages légales en noindex (voir .claude/seo.md §3 et §7) : exclues du sitemap.
      filter: (page) => !page.includes('/mentions-legales') && !page.includes('/confidentialite'),
    }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
