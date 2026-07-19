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
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
