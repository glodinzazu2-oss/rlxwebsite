# REMOLUX — Site vitrine premium

Base de projet professionnelle pour le site de marque REMOLUX : kit de feux LED
de remorque sans fil premium. Direction artistique dark premium (noir profond,
métal brossé, lumières LED rouges/ambre), expérience animée GSAP + Lenis,
architecture pensée pour évoluer plusieurs années sans refactoring.

## Démarrage rapide

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build
npm run check      # vérification TypeScript + Astro
```

## Stack & justifications

| Choix                                  | Alternative écartée | Justification                                                                                                                                                                                                                                   |
| -------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Astro 5**                            | Next.js             | Site de marque orienté contenu : Astro ne livre aucun JavaScript inutile (Lighthouse 95+ naturel), tout en permettant d'ajouter des îlots interactifs (React, 3D) plus tard. Next.js n'apporte de valeur que pour une vraie couche applicative. |
| **CSS natif + design tokens**          | Tailwind            | Identité visuelle 100 % sur mesure : les tokens (`src/styles/tokens.css`) sont la source de vérité. Pas de framework à contourner, contrôle total des micro-détails.                                                                            |
| **GSAP + ScrollTrigger**               | Framer Motion       | Standard des sites primés : timelines cinématiques, scrub au scroll, performance GPU. Framer Motion impose React.                                                                                                                               |
| **Lenis**                              | Locomotive Scroll   | Défilement inertiel léger (~4 ko), maintenu, s'intègre proprement au ticker GSAP.                                                                                                                                                               |
| **Fontsource (Space Grotesk + Inter)** | Google Fonts CDN    | Fonts auto-hébergées : zéro requête tierce, RGPD-friendly, meilleur LCP.                                                                                                                                                                        |
| **Three.js — préparé, non installé**   | —                   | Architecture d'accueil prête (`src/webgl/`), chargement dynamique documenté. Zéro poids tant qu'aucune scène 3D n'existe.                                                                                                                       |

## Architecture

```
remolux-website/
├── .claude/               # Toute la documentation projet (guides, conventions, roadmap, checklists)
├── public/                # Fichiers servis tels quels (favicon, robots.txt, og-image)
├── src/
│   ├── assets/images/     # Photos produit optimisées par Astro (AVIF/WebP auto)
│   ├── components/
│   │   ├── global/        # Header, Footer — présents sur toutes les pages
│   │   ├── sections/      # Sections de page (Hero, Features, Technology…)
│   │   └── ui/            # Primitives réutilisables (Button, SectionHeading, Icon)
│   ├── config/            # site.ts — valeurs business (liens, produit, contact)
│   ├── data/              # Données structurées (specs produit)
│   ├── i18n/              # Dictionnaires de contenu (FR, prêt pour EN/DE)
│   ├── layouts/           # BaseLayout — SEO, fonts, loader, scripts
│   ├── pages/             # Routes (index, 404)
│   ├── scripts/
│   │   ├── core/          # motion.ts (GSAP), smooth-scroll.ts (Lenis)
│   │   ├── animations/    # reveal, parallax, hero, technology
│   │   └── main.ts        # Point d'entrée unique
│   ├── styles/            # tokens → reset → base → utilities
│   └── webgl/             # Accueil des futures scènes Three.js (voir README dédié)
├── astro.config.mjs
└── package.json
```

## Principes non négociables

1. **Le contenu vit dans `src/i18n/`**, jamais dans les composants → traduction sans refactoring.
2. **Les valeurs business vivent dans `src/config/site.ts`** (lien Amazon, emails…).
3. **Aucune couleur/espacement en dur** : uniquement les tokens CSS.
4. **Toute animation respecte `prefers-reduced-motion`** et n'anime que transform/opacity (GPU).
5. **Le site fonctionne sans JavaScript** : les états initiaux d'animation ne s'appliquent que si `html.js`.

## Documentation

Toute la documentation du projet vit dans `.claude/`, un seul système, une seule source de vérité par sujet. **Point d'entrée obligatoire : [`.claude/playbook.md`](.claude/playbook.md)** — il indique quel document lire selon le type de tâche et l'ordre de hiérarchie en cas de conflit.

| Fichier                   | Contenu                                                              |
| ------------------------- | -------------------------------------------------------------------- |
| `.claude/CLAUDE.md`       | Vision, mission, ADN de marque — lu en premier, systématiquement     |
| `.claude/playbook.md`     | Orchestrateur : quel document lire pour quelle tâche                 |
| `.claude/rules.md`        | Règles opérationnelles non négociables                               |
| `.claude/brand.md`        | Identité de marque — source dont découlent design/UX/copywriting     |
| `.claude/decisions.md`    | ADR — historique et justification des décisions structurantes        |
| `.claude/architecture.md` | Décisions techniques et structure détaillée                          |
| `.claude/performance.md`  | Budget perf, Core Web Vitals, optimisation images                    |
| `.claude/design.md`       | Direction artistique (palette, typographie, layout)                  |
| `.claude/ux.md`           | Expérience utilisateur, parcours, psychologie                        |
| `.claude/motion.md`       | Système d'animation GSAP/Lenis (timings, easings)                    |
| `.claude/three.md`        | Architecture 3D cible (Three.js — non encore installé)               |
| `.claude/assets.md`       | Gestion des médias (images, vidéos, fonts, modèles 3D)               |
| `.claude/copywriting.md`  | Ton, voix, structure des textes                                      |
| `.claude/seo.md`          | SEO technique (meta, JSON-LD, sitemap)                               |
| `.claude/testing.md`      | Protocole QA complet                                                 |
| `.claude/git.md`          | Conventions Git et workflow (branches, commits, PR)                  |
| `.claude/roadmap.md`      | Phases d'évolution du site                                           |
| `.claude/checklist.md`    | Checklist maître unique — remplace toute checklist locale à un guide |

## À faire avant mise en ligne

- [x] Remplacer `SITE.amazonUrl` par l'URL réelle de la fiche Amazon (`src/config/site.ts`)
- [x] Rédiger mentions légales + politique de confidentialité (`/mentions-legales`, `/confidentialite`)
- [x] Compléter le capital social dans `SITE.legal.shareCapital` (`src/config/site.ts`)
- [x] Confirmer le domaine final : `remolux.eu` (`astro.config.mjs`, `src/config/site.ts`, `robots.txt`)
- [x] Ajouter les photos produit dans `src/assets/images/` (kit réel + mises en situation)
- [x] Créer `public/images/og-image.jpg` (1200×630)
- [ ] Valider les specs produit marquées `toValidate` (`src/data/product.ts`)
- [ ] Confirmation écrite IP67/RED (fiche technique fournisseur) avant mise en ligne — voir Suivi Projet
