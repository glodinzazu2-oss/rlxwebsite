// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Configuration Astro — REMOLUX
 * - `site` : requis pour sitemap + canonical. À mettre à jour avec le domaine final.
 * - Sortie statique : performance maximale, hébergeable partout (Vercel, Netlify, CDN).
 */
export default defineConfig({
  site: 'https://www.remolux.eu',
  integrations: [
    sitemap({
      // Pages légales en noindex (voir .claude/seo.md §3 et §7) : exclues du sitemap.
      filter: (page) => !page.includes('/mentions-legales') && !page.includes('/confidentialite'),
    }),
  ],
  compressHTML: true,
  build: {
    // Inline le CSS critique dans le HTML : supprime les requêtes bloquantes
    // (round-trips réseau) avant le premier rendu. Le trafic est majoritairement
    // en première visite mobile (cf. CLAUDE.md §4/§8) — la vitesse de premier
    // rendu prime sur la mise en cache inter-pages du CSS.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
