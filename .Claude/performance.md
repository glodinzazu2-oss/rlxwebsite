# REMOLUX — Guide Officiel des Performances

> Ce document est la référence absolue de toute décision liée aux performances sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md) et [`architecture.md`](./architecture.md).
> L'objectif n'est pas seulement d'obtenir un bon score Lighthouse. L'objectif est de construire un site qui donne immédiatement une sensation de vitesse, de fluidité et de qualité — la performance est vécue avant d'être mesurée.

---

# 1. Philosophie Performance First

## Pourquoi la performance est une composante du luxe

Un site premium qui charge lentement n'est pas premium — il est incohérent avec sa propre promesse. Le luxe se définit par l'absence de friction : rien n'attend, rien ne grince, rien ne rame. Une marque comme REMOLUX, qui promet robustesse et précision dans un produit physique, doit prouver la même robustesse et la même précision dans son expérience numérique. La lenteur est le premier signal, souvent inconscient, qu'un visiteur perçoit comme un manque de sérieux.

## Pourquoi un site rapide inspire confiance

La vitesse de réponse d'une interface est interprétée par le cerveau humain comme un indicateur de compétence et de contrôle. Un site qui répond instantanément à chaque interaction donne la sensation que la marque derrière ce site maîtrise parfaitement son sujet. Un site qui hésite, qui charge par à-coups, sème un doute diffus qui contamine la perception de tout le reste — y compris la perception du produit physique.

## Pourquoi chaque milliseconde compte

Les études de comportement utilisateur convergent toutes vers la même réalité : au-delà de quelques centaines de millisecondes de délai perceptible, l'attention se détourne, la patience diminue, et le taux de rebond augmente de façon mesurable. Sur REMOLUX, où l'objectif final est un clic de redirection vers Amazon, chaque milliseconde de latence non nécessaire est une érosion directe de la probabilité de conversion — pas une simple question de confort.

## Pourquoi optimiser dès la conception

La performance n'est jamais une passe de nettoyage de fin de projet. Une architecture pensée sans considération de performance accumule une dette qui devient exponentiellement plus coûteuse à corriger a posteriori (hydratation excessive difficile à retirer, dépendances lourdes profondément intégrées, animations mal conçues qu'il faut reconstruire). Chaque décision technique — choix d'une dépendance, stratégie d'hydratation, format d'image — doit intégrer la question de la performance au moment même où elle est prise, jamais après coup.

**Principe d'arbitrage permanent** : à chaque décision technique, se demander — _"Est-ce que cette approche coûte le moins de temps possible à l'utilisateur, du premier octet reçu à la première interaction possible ?"_ En cas d'hésitation entre deux solutions de qualité visuelle équivalente, choisir systématiquement la plus légère.

---

# 2. Objectifs

Objectifs chiffrés non négociables, mesurés en conditions réalistes (mobile, réseau 4G simulé, appareil de milieu de gamme) autant qu'en conditions optimales (desktop, fibre) :

## Lighthouse

- **Performance : 95+** (mobile et desktop)
- **Accessibilité : 95+**
- **Bonnes pratiques : 95+**
- **SEO : 95+**

Cohérent avec l'objectif fixé dans `CLAUDE.md` — ce score n'est pas une aspiration, c'est un seuil minimal de livraison.

## Core Web Vitals

| Métrique                            | Objectif REMOLUX | Seuil "bon" Google |
| ----------------------------------- | ---------------- | ------------------ |
| **LCP** (Largest Contentful Paint)  | < 2.0 s          | < 2.5 s            |
| **CLS** (Cumulative Layout Shift)   | < 0.05           | < 0.1              |
| **INP** (Interaction to Next Paint) | < 150 ms         | < 200 ms           |
| **FCP** (First Contentful Paint)    | < 1.2 s          | < 1.8 s            |
| **TTFB** (Time to First Byte)       | < 400 ms         | < 800 ms           |
| **TBT** (Total Blocking Time)       | < 100 ms         | < 200 ms           |

REMOLUX vise systématiquement un seuil plus strict que le simple seuil "bon" de Google — l'objectif est de rester confortablement dans la zone verte, jamais de flirter avec la limite.

## Interaction et fluidité

- Toute animation ou transition maintient **60 FPS constant**, sans exception (cohérent avec `motion.md`).
- Aucune interaction utilisateur (hover, clic, scroll) ne doit produire de délai de réponse perceptible.

## Temps de chargement perçu

Le contenu visuellement significatif (hero, produit) doit apparaître en moins de **2 secondes** sur une connexion mobile 4G simulée, et l'intégralité de l'expérience doit sembler "prête" (interactive, stable, sans élément en cours de réorganisation) en moins de **3 secondes** dans les mêmes conditions.

---

# 3. Performance Astro

## SSG (mode par défaut)

Toutes les pages REMOLUX sont générées statiquement au build. C'est la fondation de la performance du site : aucun calcul serveur au moment de la requête, un TTFB minimal, un contenu servi directement depuis un CDN ou un serveur de fichiers statiques.

## SSR

Non utilisé par défaut sur ce projet (cohérent avec `architecture.md` section 6). Toute introduction de SSR devra être justifiée par un besoin réel et validée explicitement, car elle réintroduit un coût de calcul serveur par requête et une dépendance à la latence réseau/serveur qui n'existe pas en SSG.

## Hydration / Islands

Le modèle d'îlots d'Astro est le levier de performance le plus puissant du projet : la page reste un document HTML/CSS statique par défaut, et seuls les fragments réellement interactifs sont hydratés en JavaScript. Chaque octet de JavaScript envoyé au navigateur doit être justifié par une interactivité réelle — jamais par défaut.

## `client:visible`

Stratégie recommandée par défaut pour toute interactivité ou animation qui n'est pas immédiatement visible au chargement (sections plus bas dans la page, scènes 3D, animations au scroll). Elle garantit que le coût d'hydratation est différé exactement jusqu'au moment où l'utilisateur en a réellement besoin, sans jamais peser sur le chargement initial.

## `client:idle`

Utilisée pour l'interactivité secondaire au-dessus de la ligne de flottaison, dont l'hydratation peut attendre que le thread principal soit libéré après le rendu initial — bon compromis entre réactivité perçue et priorité donnée au chargement du contenu principal.

## `client:load`

Réservée aux éléments interactifs strictement critiques dès le premier instant (rare sur un site de vitrine de marque). Chaque usage de `client:load` retarde mécaniquement le temps interactif global de la page — à minimiser au strict nécessaire.

## Préchargement

Seules les ressources garanties nécessaires au premier rendu (police critique, image hero) sont préchargées (`<link rel="preload">`). Un préchargement mal ciblé consomme de la bande passante au détriment de ressources réellement prioritaires — chaque préchargement est une déclaration de priorité qui doit être exacte.

## Code splitting

Chaque île interactive génère son propre bundle JavaScript, chargé indépendamment et uniquement quand nécessaire — comportement natif d'Astro à préserver en évitant tout regroupement artificiel de logique qui forcerait le chargement anticipé de code non utilisé sur une page donnée.

## Lazy loading

Toute ressource sous la ligne de flottaison (images, sections animées, scènes 3D) est chargée paresseusement, alignée avec la stratégie d'hydratation `client:visible` et les attributs natifs `loading="lazy"` sur les images.

## Dynamic imports

Toute logique lourde et non systématiquement nécessaire (ex. initialisation d'une scène Three.js) est importée dynamiquement (`import()`) au moment précis où elle devient nécessaire, jamais bundlée dans le chemin critique de chargement initial de la page.

---

# 4. Images

## Formats

**AVIF en priorité**, avec **WebP en repli** pour les navigateurs ne supportant pas encore AVIF, et un format traditionnel (JPEG/PNG) en dernier recours uniquement si strictement nécessaire. Le pipeline d'optimisation d'Astro doit générer automatiquement ces variantes.

## Responsive images / srcset / sizes

Chaque image significative est servie avec un jeu de résolutions multiples (`srcset`) et un attribut `sizes` précisément calibré sur le comportement responsive réel du layout — jamais une seule résolution unique servie indifféremment à tous les viewports, qui gaspillerait de la bande passante sur mobile ou dégraderait la netteté sur grand écran.

## Compression

Compression systématique et maximale sans perte de qualité perceptible, appliquée via le pipeline d'optimisation d'Astro au moment du build — jamais d'image exportée manuellement sans passer par ce pipeline.

## Lazy loading

`loading="lazy"` sur toute image sous la ligne de flottaison ; les images critiques du premier écran (hero) restent en chargement prioritaire (`loading="eager"` avec `fetchpriority="high"` si pertinent).

## Placeholder

Un placeholder léger (technique de type flou basse résolution ou couleur dominante extraite) est affiché pendant le chargement des images lourdes, pour éviter tout espace vide brut et préparer une transition douce (cohérent avec `motion.md` section 9) à l'apparition de l'image finale.

## Dimensions explicites

`width` et `height` (ou `aspect-ratio` en CSS) systématiquement définis sur chaque image, sans exception, pour réserver l'espace exact avant chargement et garantir un CLS proche de zéro.

## Pipeline Astro

L'intégralité des images passe par le composant/pipeline d'optimisation natif d'Astro (`astro:assets` ou équivalent) — aucune image n'est placée manuellement dans `public/` en contournement de ce pipeline sauf cas exceptionnel justifié (ex. favicon).

---

# 5. Fonts

## WOFF2

Format exclusif pour toutes les polices du projet — le plus performant en compression parmi les formats web actuels, supporté par l'ensemble des navigateurs cibles.

## Subset

Chaque police est réduite (subsetting) au jeu de caractères réellement utilisé sur le site (alphabet latin, ponctuation nécessaire), pour réduire drastiquement le poids du fichier téléchargé.

## Preload

Uniquement les polices critiques utilisées au-dessus de la ligne de flottaison (titre hero, texte visible immédiatement) sont préchargées. Les polices utilisées plus bas dans la page ou pour des variantes rares ne sont jamais préchargées.

## `font-display`

`font-display: swap` systématique, pour garantir qu'un texte de repli s'affiche immédiatement pendant le chargement de la police définitive — jamais de texte invisible en attente de police (FOIT), qui retarderait artificiellement la perception de contenu.

## Fallback

Une police de repli système proche visuellement de la police de marque (même largeur approximative, même hauteur de x) est définie explicitement dans la pile de polices, pour minimiser le décalage visuel au moment du swap.

## CLS

Le choix d'une police de fallback proche dimensionnellement de la police finale, combiné à `font-display: swap`, minimise le saut de mise en page au chargement de la police — vérifié systématiquement dans les métriques CLS mesurées (section 2).

---

# 6. CSS

## Optimisation

Le CSS livré est strictement celui utilisé par la page rendue — aucune règle CSS morte ou non appliquée ne doit subsister dans le bundle final. Astro et son pipeline de build doivent être configurés pour éliminer le CSS inutilisé de façon systématique.

## Critical CSS

Le CSS nécessaire au rendu du premier écran (above the fold) est inliné ou chargé en priorité, pour éviter tout rendu bloquant sur une feuille de style externe non critique — comportement à vérifier explicitement dans la sortie de build d'Astro plutôt que supposé automatique.

## Variables

Les design tokens CSS (custom properties, cohérents avec `design.md` et `architecture.md`) sont centralisés et légers — leur usage ne doit jamais introduire de recalcul de style coûteux (éviter les chaînes de dépendances de variables trop profondes qui compliqueraient le recalcul du navigateur).

## Cascade

Une architecture CSS peu profonde et peu spécifique (cohérent avec `architecture.md` section 8) réduit le coût de calcul de style du navigateur — des sélecteurs simples et une spécificité maîtrisée sont aussi une question de performance, pas seulement de maintenabilité.

## Animations CSS

Les animations CSS pures (transitions simples, non pilotées par GSAP) n'animent que des propriétés compositées (`transform`, `opacity`) — jamais de propriétés qui déclenchent un reflow (cohérent avec `motion.md` section 11).

## Container Queries

Utilisées avec discernement pour un CSS véritablement adaptatif au contexte du composant plutôt qu'au seul viewport global — un usage pertinent réduit le besoin de classes conditionnelles complexes en JavaScript, ce qui est un gain à la fois de lisibilité et de performance.

## Réduction du CSS inutile

Toute règle CSS dupliquée, tout style non utilisé après un refactoring, doit être supprimé immédiatement (cohérent avec `rules.md` — ne jamais laisser de code mort). Un audit régulier du CSS effectivement chargé versus utilisé (Coverage panel de Chrome DevTools, voir section 12) permet de détecter ce type de dette.

---

# 7. JavaScript

## Réduction du JS

Le principe directeur du projet est de minimiser drastiquement le JavaScript envoyé au navigateur, cohérent avec le modèle d'îlots d'Astro (section 3). Chaque kilo-octet de JavaScript a un coût de téléchargement, de parsing et d'exécution — jamais gratuit.

## Code splitting

Chaque île interactive et chaque fonctionnalité non systématiquement nécessaire (ex. logique 3D, animations complexes) génère son propre chunk, chargé uniquement quand requis — jamais un bundle monolithique unique regroupant toute la logique du site.

## Imports

Systématiquement des imports nommés et ciblés (`import { gsap } from "gsap"`), jamais des imports globaux ou par défaut qui embarqueraient plus de code que nécessaire.

## Tree shaking

Vérifié explicitement lors de l'ajout de toute nouvelle dépendance : la librairie doit être compatible ESM et permettre l'élimination du code non utilisé par le bundler. Une dépendance qui ne supporte pas le tree shaking correctement est un signal d'alerte avant intégration (voir section correspondante dans `architecture.md`).

## Lazy loading (JS)

Toute logique non nécessaire au premier rendu est importée dynamiquement (`import()`), déclenchée par la visibilité (`client:visible`), une interaction utilisateur, ou l'inactivité du thread principal (`client:idle`) selon le cas.

## Éviter le JS inutile

Avant d'écrire du JavaScript pour un comportement, toujours vérifier si le même résultat peut être obtenu en CSS natif (transitions, `:hover`, `:focus-visible`, container queries) — le CSS est systématiquement moins coûteux que l'équivalent JavaScript pour les comportements qu'il peut couvrir nativement.

## Scripts tiers

Toute intégration tierce (analytics, tracking) est réduite au strict nécessaire (cohérent avec `CLAUDE.md` et `rules.md` — respect de la vie privée), chargée de façon différée et asynchrone, jamais de façon bloquante dans le chemin critique de rendu. Chaque script tiers est un coût de performance externe non maîtrisé directement — son ajout doit être pesé avec la même rigueur qu'une dépendance interne (voir `architecture.md` section 12).

---

# 8. GSAP

## Performance GSAP

GSAP est performant par nature, mais son usage doit rester discipliné pour préserver ce potentiel : le coût réel d'une animation GSAP dépend presque exclusivement des propriétés animées et du nombre d'instances actives simultanément.

## ScrollTrigger

Le nombre d'instances `ScrollTrigger` actives sur une page est surveillé et limité au nécessaire (cohérent avec `motion.md` section 7) — chaque instance ajoute un coût de calcul à chaque frame de scroll. Les bornes `start`/`end` sont toujours précises pour éviter des zones de calcul inutilement larges.

## Timelines

Les timelines complexes sont construites une seule fois et réutilisées (pause/reprise) plutôt que recréées à chaque déclenchement — la création répétée d'objets GSAP à chaque interaction est un gaspillage de performance évitable.

## GPU

Priorité systématique aux propriétés compositées (`transform`, `opacity`) pour toute animation GSAP — cohérent avec `motion.md` section 11, ces propriétés sont gérées par le compositeur GPU sans déclencher de reflow ni de repaint coûteux.

## `transform` / `opacity`

Toute animation de position utilise `x`/`y`/`scale`/`rotation` (translatés en `transform` par GSAP) plutôt que `top`/`left`/`width`/`height`. Toute animation de visibilité utilise `opacity` plutôt qu'un changement de `display` animé (impossible nativement) ou de `visibility`.

## Batch

Pour l'animation d'un grand nombre d'éléments similaires (ex. apparition séquentielle de plusieurs cartes), `gsap.timeline()` avec des décalages (`stagger`) est utilisé plutôt que la création de multiples tweens indépendants non coordonnés — plus performant et plus cohérent visuellement.

## Cleanup

Toute instance GSAP (tween, timeline, ScrollTrigger) est détruite explicitement au démontage du composant — une animation "orpheline" continue de consommer des cycles de calcul même si son élément DOM associé a disparu, un coût de performance totalement évitable.

## `gsap.context()`

Utilisé systématiquement pour scoper et nettoyer automatiquement l'ensemble des animations liées à un composant (cohérent avec `architecture.md` section 9 et `motion.md` section 11) — c'est le mécanisme de référence du projet pour garantir qu'aucune animation ne survit à son composant.

---

# 9. Three.js

Voir [`three.md`](./three.md) pour le guide complet et détaillé du développement 3D. Rappel des points de performance les plus critiques, dans une optique de budget global du site :

## Optimisation GPU

Budget GPU de chaque scène pensé dès la conception : nombre de matériaux physiques coûteux limité, résolution de rendu (`pixelRatio`) plafonnée, post-processing minimal et justifié.

## Meshes / Draw Calls

Géométries optimisées en polycount, fusion de géométries statiques quand pertinent, nombre de draw calls surveillé.

## Textures / HDRI

Résolutions calibrées sur la taille d'affichage réelle, compression systématique (KTX2/Basis en priorité), HDRI de résolution raisonnable.

## GLTF / Draco

Modèles exportés en GLB avec compression Draco systématique au-delà d'un seuil de poids raisonnable.

## LOD / Frustum Culling / Occlusion

Frustum culling natif toujours actif ; LOD envisagé uniquement si un besoin réel de performance à distance variable le justifie.

## Animation Loop

Boucle de rendu suspendue hors du viewport et lors de l'inactivité de l'onglet — un coût de performance continu totalement évitable sinon.

## Renderer / Dispose

Un seul renderer actif à la fois ; nettoyage complet (`dispose()`) de toute géométrie, matériau, texture et du renderer lui-même au démontage — cause la plus fréquente de dégradation progressive si négligée.

**Le budget 3D est le poste de performance le plus sensible du site** — toute scène Three.js doit être mesurée individuellement (section 12) avant d'être validée en production.

---

# 10. Réseau

## Compression

Compression Brotli (prioritaire) ou Gzip activée côté serveur/CDN pour l'ensemble des ressources textuelles (HTML, CSS, JS, SVG) — vérifiée explicitement dans la configuration de déploiement, jamais supposée activée par défaut.

## HTTP

HTTP/2 ou HTTP/3 utilisé pour bénéficier du multiplexage des requêtes, réduisant l'impact du nombre de fichiers chargés en parallèle (moins critique qu'à l'époque HTTP/1.1, mais toujours à vérifier sur l'infrastructure de déploiement retenue).

## Cache

Stratégie de cache HTTP différenciée : assets statiques versionnés/hashés (images, JS, CSS générés par le build) avec cache long et immuable (`Cache-Control: public, max-age=31536000, immutable`) ; HTML avec une politique de revalidation courte adaptée à la fréquence de mise à jour du contenu.

## Headers

En-têtes de performance et de sécurité correctement configurés (compression, cache, cohérent avec les règles de sécurité de `rules.md`) — vérifiés lors de chaque déploiement, pas seulement à la mise en place initiale.

## Préchargement (réseau)

`<link rel="preload">` pour les ressources critiques identifiées (police principale, image hero), utilisé avec discernement (section 3) — un excès de préchargement sature la bande passante disponible pour les ressources réellement prioritaires.

## DNS / Préconnexion

`<link rel="preconnect">` ou `dns-prefetch` pour les origines externes strictement nécessaires (ex. CDN de police si externe, domaine d'analytics minimal) — jamais utilisé pour des origines non systématiquement sollicitées, ce qui gaspillerait des ressources de connexion.

---

# 11. Mobile

## CPU faible

Le JavaScript exécuté sur mobile doit rester minimal (section 7) — un CPU mobile de milieu de gamme peut mettre plusieurs fois plus de temps qu'un CPU desktop à exécuter le même script, ce qui rend le budget JS d'autant plus critique sur ce segment.

## GPU faible

Les animations et le rendu 3D doivent être calibrés en priorité sur les capacités mobiles (cohérent avec `three.md` section 10 et `motion.md` section 12) — le mobile n'est jamais un "mode dégradé" pensé après coup, c'est le scénario de référence.

## Mémoire

Les appareils mobiles disposent de moins de mémoire disponible pour le navigateur — la gestion rigoureuse du cleanup (GSAP, Three.js) et la limitation du nombre de ressources lourdes chargées simultanément sont d'autant plus critiques sur ce segment.

## Batterie

Toute boucle de rendu ou d'animation continue doit être suspendue dès qu'elle n'est plus visible ou nécessaire (cohérent avec `three.md` section 9), pour limiter l'impact sur l'autonomie de l'appareil — un site qui décharge visiblement la batterie plus vite que la moyenne est perçu négativement, même sans que l'utilisateur en comprenne la cause technique.

## Connexion lente

L'ensemble du site doit rester pleinement fonctionnel et raisonnablement rapide en conditions de réseau 3G/4G dégradées — testé systématiquement via le throttling réseau des outils de développement (section 12), jamais supposé acceptable sur la seule base d'un test en connexion fibre.

---

# 12. Monitoring

## Lighthouse

Exécuté systématiquement avant toute livraison de fonctionnalité touchant le rendu, les images, les scripts ou les animations — en mode mobile ET desktop, jamais un seul des deux uniquement.

## Chrome DevTools — Performance Panel

Utilisé pour identifier les tâches longues bloquant le thread principal, les reflows/repaints coûteux, et vérifier le maintien effectif de 60fps pendant les animations et le scroll.

## Memory (DevTools)

Utilisé pour détecter les fuites mémoire, en particulier après des cycles répétés de montage/démontage de composants animés ou de scènes Three.js — une consommation mémoire qui ne redescend jamais après démontage est un signal d'alerte à traiter immédiatement.

## Network (DevTools)

Utilisé pour vérifier le poids réel des ressources chargées, l'ordre de priorité de chargement, l'efficacité de la compression et du cache, ainsi que le comportement en conditions de réseau throttlé (3G/4G simulé).

## FPS

Vérifié visuellement (compteur de frames de DevTools ou `stats.js` en développement pour les scènes Three.js) sur chaque animation et chaque scène 3D avant validation — objectif constant de 60 FPS (section 2).

## Core Web Vitals

Mesurés en conditions de laboratoire (Lighthouse) ET, si l'infrastructure le permet, en données de terrain réelles (Chrome UX Report / RUM) pour valider que les objectifs sont atteints par de vrais utilisateurs, pas seulement en environnement contrôlé.

## PageSpeed Insights

Utilisé comme vérification complémentaire à Lighthouse local, notamment pour confirmer les métriques de terrain (Core Web Vitals réels) une fois le site déployé en production.

**Aucune fonctionnalité impactant potentiellement la performance n'est considérée comme terminée sans passage par au moins Lighthouse et le Performance Panel de Chrome DevTools.**

---

# 13. Erreurs interdites

- **Images énormes** — aucune image non optimisée, non redimensionnée, ou dans un format non moderne (AVIF/WebP) ne doit être livrée en production.
- **JS inutile** — aucun script ajouté sans justification claire d'un besoin d'interactivité réel, cohérent avec la philosophie d'hydratation minimale d'Astro.
- **Animations à 30 FPS** (ou moins) — toute animation doit maintenir 60 FPS constant ; une animation qui ne peut pas atteindre ce seuil doit être simplifiée ou retirée.
- **Layout shift** — aucun élément ne doit se déplacer ou changer de taille de façon inattendue après le rendu initial ; dimensions toujours réservées à l'avance (images, polices).
- **Draw calls excessifs** — aucune scène 3D livrée sans vérification du nombre de draw calls et optimisation si nécessaire (voir `three.md`).
- **Hydratation inutile** — aucun composant Astro hydraté (`client:*`) sans besoin d'interactivité réel démontré.
- **Polices trop nombreuses** — le nombre de familles et de graisses de police chargées est strictement limité (cohérent avec `design.md` section 4) ; chaque graisse supplémentaire est un fichier réseau de plus.
- **Bundle énorme** — la taille du bundle JavaScript total est surveillée à chaque ajout de dépendance ou de fonctionnalité ; toute augmentation significative doit être justifiée (cohérent avec `architecture.md` section 12).
- **Scripts tiers bloquants** — aucun script tiers chargé de façon synchrone dans le `<head>` sans stratégie de chargement différé.
- **CSS non utilisé** — aucune règle CSS morte ou dupliquée ne doit subsister après une modification (section 6).
- **Absence de compression réseau** — Brotli/Gzip doivent être vérifiés actifs sur l'environnement de déploiement, jamais supposés.
- **Fuites mémoire GSAP/Three.js** — aucune instance non nettoyée au démontage d'un composant (sections 8 et 9).
- **Préchargement excessif** — un excès de ressources préchargées qui retarde le chargement des ressources réellement critiques.
- **Absence de test mobile réel** — aucune fonctionnalité de performance validée uniquement sur desktop sans vérification mobile en conditions dégradées.
- **Livraison sans mesure** — aucune modification impactant potentiellement la performance ne doit être considérée comme terminée sans passage par les outils de monitoring de la section 12.

---

# 14. Workflow Performance

Workflow obligatoire pour toute tâche de développement susceptible d'impacter la performance :

1. **Analyse** — avant toute implémentation, évaluer l'impact de performance prévisible de l'approche envisagée (poids ajouté, stratégie d'hydratation, complexité d'animation ou de rendu 3D).
2. **Profiling** (avant modification si un problème est suspecté) — mesurer l'état actuel via Lighthouse et le Performance Panel de Chrome DevTools pour établir une base de comparaison objective.
3. **Optimisation** — appliquer les principes de ce document (images, fonts, CSS, JS, GSAP, Three.js, réseau) dès l'implémentation, jamais en passe corrective a posteriori.
4. **Mesure** — après implémentation, re-mesurer avec les mêmes outils (Lighthouse, Core Web Vitals, FPS) pour objectiver l'impact réel de la modification, en conditions mobile ET desktop, réseau normal ET dégradé.
5. **Validation** — confronter les résultats mesurés aux objectifs chiffrés de la section 2 ; toute régression détectée doit être corrigée avant de considérer la tâche terminée.
6. **Documentation** — si un compromis de performance a dû être assumé pour une raison précise (ex. richesse visuelle jugée indispensable), documenter ce compromis directement dans le code concerné, avec la justification (cohérent avec `architecture.md` et `rules.md`).

Aucune tâche touchant le rendu visuel, les animations, les images, les polices, ou une dépendance n'est considérée comme terminée sans être passée par ce workflow.

---

# 15. Checklist Performance

La checklist complète (objectifs, Astro, images, fonts, CSS, JavaScript, GSAP, Three.js, réseau, mobile, monitoring) est centralisée dans [`checklist.md`](./checklist.md) section 8 « Performance » — elle ne doit pas être dupliquée ici.
