# REMOLUX — Guide Officiel des Tests Qualité (QA)

> Ce document est la référence absolue de la validation qualité sur le projet REMOLUX. Il complète l'ensemble des documents existants : [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md), [`architecture.md`](./architecture.md), [`performance.md`](./performance.md), [`three.md`](./three.md), [`copywriting.md`](./copywriting.md), [`seo.md`](./seo.md) et [`assets.md`](./assets.md).
> Aucune fonctionnalité, aucune modification, aucun asset n'est livré sans validation complète. La qualité n'est jamais présumée — elle est vérifiée, à chaque fois, selon un protocole défini.

---

# 1. Philosophie QA

## Pourquoi tester

Une modification qui n'a pas été testée n'est pas une modification terminée — c'est une hypothèse non vérifiée. Tester n'est pas une étape optionnelle ajoutée par prudence excessive : c'est la seule façon de transformer une intention ("ça devrait marcher") en un fait vérifié ("ça marche, je l'ai vu"). Sur un site dont la mission est de construire la confiance (`CLAUDE.md`), toute défaillance visible — même mineure — contredit directement cette mission et doit donc être considérée comme inacceptable par défaut.

## Pourquoi un bug est une dette

Un bug non détecté avant livraison ne disparaît pas — il se déplace. Il devient un problème que l'utilisateur découvre à la place de l'équipe, au pire moment possible (en pleine décision d'achat), ou un problème que l'équipe devra corriger plus tard dans un contexte où le correctif est plus coûteux (code déjà en production, régression déjà propagée à d'autres fonctionnalités). Chaque bug non testé est donc une dette reportée, jamais une économie de temps réelle.

## Pourquoi la qualité est invisible lorsqu'elle est réussie

Un site qui fonctionne parfaitement ne se remarque pas — l'utilisateur ne pense jamais consciemment "quelle fluidité, quelle absence de bug". C'est précisément l'objectif : la qualité réussie disparaît derrière l'expérience elle-même. À l'inverse, la moindre défaillance (un bouton qui ne répond pas, une animation qui saccade, un texte qui déborde) devient immédiatement visible et disproportionnellement dommageable à la perception de marque, car elle rompt une attente de perfection implicite construite par tout le reste de l'expérience (`design.md`, `ux.md`, `motion.md`). Le QA protège cette invisibilité de la qualité — c'est un travail dont le succès ne se voit jamais, mais dont l'échec se voit toujours.

**Principe d'arbitrage permanent** : avant de considérer une tâche terminée, se demander — *"Ai-je vérifié ce comportement, ou est-ce que je suppose simplement qu'il fonctionne ?"* Toute réponse qui repose sur une supposition, même raisonnable, doit être remplacée par une vérification réelle avant livraison.

---

# 2. Types de tests

Chaque modification doit être évaluée à travers l'ensemble des dimensions suivantes, selon sa nature :

- **Visuels** — conformité à la direction artistique (`design.md`), absence de défaut de rendu, cohérence entre les breakpoints.
- **Fonctionnels** — chaque interaction produit exactement le résultat attendu, sans exception ni cas limite oublié.
- **Responsive** — comportement correct et cohérent sur l'ensemble des tailles d'écran cibles (section 3).
- **Accessibilité** — conformité WCAG AA, navigation clavier, lecteurs d'écran, `prefers-reduced-motion` (section 4).
- **SEO** — structure sémantique, balises, données structurées correctement en place (section 9).
- **Performance** — respect des objectifs Core Web Vitals et de fluidité définis dans `performance.md` (section 5).
- **Three.js** — rendu, interaction, performance et robustesse des scènes 3D (section 7).
- **GSAP** — comportement, timing et nettoyage des animations (section 8).
- **Navigation** — cohérence et fiabilité du parcours utilisateur d'un bout à l'autre du site.

Une modification qui touche plusieurs de ces dimensions doit être testée sur chacune d'entre elles — jamais uniquement sur celle qui semble la plus évidemment concernée par le changement.

---

# 3. Responsive

## Méthodologie

Chaque modification visuelle ou structurelle est testée sur l'ensemble des catégories d'écran suivantes, jamais uniquement sur un seul format de référence :

- **Mobile** — la référence de conception (mobile first, cohérent avec `ux.md` section 11), testée sur une largeur étroite représentative (ex. ~375px) et une largeur mobile large (ex. ~430px).
- **Tablet** — testée en orientation portrait et paysage, les deux comportements devant rester cohérents et fonctionnels.
- **Laptop** — les tailles d'écran d'ordinateur portable intermédiaires (ex. ~1280–1440px), souvent négligées entre mobile et grand desktop, doivent être vérifiées spécifiquement.
- **Desktop** — la taille de référence standard (ex. ~1920px).
- **Ultra wide** — les écrans très larges (ex. ≥ 2560px) sont vérifiés pour s'assurer que la largeur maximale de contenu (`design.md` section 5) est respectée et qu'aucun élément ne s'étire de façon disgracieuse.

## Portrait / Landscape

Toute page ou composant testé sur mobile et tablette l'est systématiquement dans les deux orientations — un comportement correct en portrait ne garantit jamais un comportement correct en paysage, en particulier pour les scènes 3D et les animations liées au scroll.

## Points de vérification systématiques

- Aucun élément ne déborde de son conteneur ou du viewport à aucune taille testée.
- Aucun texte n'est tronqué ou illisible.
- Les zones tactiles restent suffisamment grandes sur mobile (cohérent avec `ux.md` section 11).
- Les transitions entre breakpoints (redimensionnement progressif de la fenêtre sur desktop) ne cassent aucune mise en page ni aucune animation liée au scroll (cohérent avec `motion.md` section 7 — `resize`/`refresh`).

---

# 4. Accessibilité

## Keyboard

Navigation complète au clavier vérifiée sur chaque nouvel élément interactif : tous les éléments (liens, boutons, CTA) sont atteignables via `Tab`, dans un ordre logique cohérent avec la structure visuelle de la page.

## Focus

L'indicateur de focus est visible et net sur chaque élément interactif recevant le focus clavier — jamais supprimé ni rendu imperceptible pour des raisons esthétiques (cohérent avec `rules.md` et `design.md` section 10).

## ARIA

Les attributs ARIA utilisés (le cas échéant) sont vérifiés comme corrects et non redondants avec un HTML déjà sémantiquement correct — un test avec un lecteur d'écran ou l'inspecteur d'accessibilité du navigateur permet de vérifier que l'annonce produite correspond bien à l'intention.

## Contraste

Le contraste texte/fond de chaque nouvel élément est vérifié conforme WCAG AA à l'aide d'un outil de mesure de contraste, y compris sur les fonds sombres avec accents lumineux (cohérent avec `design.md` section 3).

## Screen readers

Toute nouvelle fonctionnalité ou section significative est testée avec un lecteur d'écran (VoiceOver, NVDA ou équivalent) pour vérifier que le contenu est annoncé de façon cohérente et compréhensible, en particulier pour les éléments non triviaux (icônes interactives, scènes 3D avec alternative textuelle — cohérent avec `three.md` section 11).

## Reduced Motion

Chaque nouvelle animation ou scène 3D est testée avec `prefers-reduced-motion` activé au niveau système, pour vérifier que le comportement dégradé attendu (cohérent avec `motion.md` section 13 et `three.md` section 11) est effectivement appliqué — jamais supposé fonctionnel sans vérification directe.

---

# 5. Performance

## Lighthouse

Exécuté systématiquement (mobile et desktop) sur toute page modifiée, avec vérification explicite du maintien du score cible de 95+ (cohérent avec `performance.md` section 2) — jamais livré sans cette vérification, même pour une modification qui semble mineure.

## Core Web Vitals

LCP, CLS et INP mesurés et comparés aux objectifs chiffrés définis dans `performance.md` section 2, en conditions réalistes (réseau mobile simulé) autant qu'optimales.

## FPS

Chaque animation (GSAP, CSS) et chaque scène 3D est vérifiée visuellement (et via le compteur de frames de Chrome DevTools) pour confirmer le maintien d'un 60 FPS constant, sans jank perceptible (cohérent avec `motion.md` et `three.md`).

## Mémoire

Pour toute fonctionnalité impliquant GSAP ou Three.js, un test de cycle répété (montage/démontage du composant, navigation aller-retour) est effectué avec le panel Memory de Chrome DevTools pour vérifier l'absence de fuite mémoire (cohérent avec `performance.md` sections 8 et 9).

## GPU

Le coût GPU des scènes 3D et des animations est vérifié via le Performance Panel de Chrome DevTools, en particulier après l'ajout de nouveaux matériaux, lumières ou effets (cohérent avec `three.md` section 9).

## Network

Le poids et le nombre de requêtes réseau générés par la modification sont vérifiés via le panel Network de Chrome DevTools, en conditions de débit normal et throttlé (3G/4G simulé), cohérent avec `performance.md` section 11.

---

# 6. UX

## Parcours utilisateur

Toute modification est testée en la replaçant dans le parcours utilisateur complet défini dans `ux.md` section 3 — jamais testée isolément sans vérifier sa cohérence avec les étapes précédentes et suivantes du parcours.

## Navigation

Vérifier que la navigation (menu, ancres, retour, CTA persistant) reste fonctionnelle et cohérente après la modification, sur mobile comme sur desktop (cohérent avec `ux.md` section 5).

## CTA

Vérifier que le CTA reste visible, fonctionnel, correctement positionné, et cohérent avec les règles définies dans `ux.md` section 10 et `copywriting.md` section 8 — en particulier après toute modification de layout ou d'animation susceptible de déplacer ou masquer un CTA existant.

## Temps de compréhension

Évaluer, en se mettant à la place d'un visiteur découvrant la page pour la première fois, si le message principal de la section modifiée est compris en quelques secondes, sans ambiguïté (cohérent avec `ux.md` et `copywriting.md`).

## Lisibilité

Vérifier la lisibilité réelle du texte modifié ou ajouté (longueur de phrase, contraste, taille sur mobile) selon les critères de `ux.md` section 6.

---

# 7. Three.js

Voir [`three.md`](./three.md) pour le guide complet. Points de test spécifiques à valider systématiquement :

## Fallback

Le comportement de fallback (image statique de haute qualité) est testé explicitement en simulant une incompatibilité ou une contrainte de performance (ex. désactivation forcée de WebGL dans les outils de développement) — jamais supposé fonctionnel sans déclenchement réel du scénario de repli.

## Chargement

Le comportement pendant le chargement du modèle et des textures est testé en conditions de réseau lent (throttling), pour vérifier qu'aucun écran vide ou cassé n'apparaît pendant cette phase (cohérent avec `three.md` section 2).

## FPS

Chaque scène est testée pour son maintien de 60 FPS, y compris pendant les interactions (drag, rotation) et pas seulement à l'état statique.

## Mémoire

Test de cycle de montage/démontage répété de chaque scène pour vérifier l'absence de fuite mémoire (section 5), avec inspection explicite du nombre de géométries/textures actives avant et après le cycle.

## Interactions

Chaque interaction proposée (drag, zoom, hover) est testée sur desktop (souris) et sur mobile (tactile), avec vérification des bornes définies (section interaction de `three.md`) — aucune interaction ne doit permettre d'atteindre un état visuel incohérent (angle non travaillé, zoom traversant la géométrie).

## Dispose

Vérification explicite, via le profiling mémoire, que la méthode `dispose()` de chaque scène libère effectivement l'ensemble des ressources GPU (géométries, matériaux, textures) — jamais supposée correcte sans cette vérification directe.

---

# 8. GSAP

## Timelines

Chaque timeline est testée dans son intégralité (déclenchement, déroulement complet, état final) pour vérifier la conformité avec le comportement attendu et les timings définis dans `motion.md`.

## Cleanup

Test de cycle de montage/démontage répété de chaque composant animé pour vérifier qu'aucune instance GSAP orpheline ne subsiste (via `gsap.globalTimeline.getChildren()` en inspection ou le panel Memory) — cohérent avec `architecture.md` section 9 et `performance.md` section 8.

## ScrollTrigger

Chaque `ScrollTrigger` est testé en scrollant manuellement à vitesse normale et rapide, ainsi qu'après un redimensionnement de fenêtre, pour vérifier l'absence de décalage ou de déclenchement incorrect (cohérent avec `motion.md` section 7).

## Animations

Chaque animation est vérifiée visuellement pour sa fidélité aux timings et easings définis dans `motion.md` section 5 et 6 — un simple "ça bouge" n'est jamais suffisant, la qualité du mouvement doit être évaluée précisément.

## Transitions

Les transitions entre sections ou états sont testées pour l'absence de rupture visuelle (cohérent avec `motion.md` section 9), y compris en cas de scroll rapide ou d'interruption de l'utilisateur en plein milieu d'une transition.

---

# 9. SEO

Voir [`seo.md`](./seo.md) pour le guide complet. Points de test systématiques avant toute livraison de page :

## Balises

Vérification de la présence et de l'unicité du `<title>`, d'un seul `<h1>`, et d'une hiérarchie de titres cohérente et continue (cohérent avec `seo.md` section 4).

## Meta

Vérification de la présence et de la pertinence de la meta description sur chaque page modifiée ou créée.

## Schema

Vérification de la validité technique des données structurées JSON-LD (via un outil de test de données structurées) et de leur exactitude par rapport au contenu réellement visible (cohérent avec `seo.md` section 6).

## Canonical

Vérification de la présence et de l'exactitude de la balise canonical sur chaque page.

## Sitemap

Vérification que toute nouvelle page est correctement incluse dans le `sitemap.xml` généré après le build.

## Robots

Vérification que le comportement d'indexation (`robots.txt`, meta robots) correspond à l'intention réelle pour chaque page (indexable ou non).

---

# 10. Régressions

## Comment détecter une régression

Une régression se détecte en comparant systématiquement le comportement observé après modification à un comportement de référence connu (comportement avant modification, ou comportement attendu documenté) — jamais en testant uniquement la nouvelle fonctionnalité de façon isolée sans vérifier son impact sur l'existant. Tout écran, composant, ou parcours ayant un lien direct ou indirect (partagé via un composant commun, un token de design, une animation globale) avec la zone modifiée doit être revérifié.

## Comment éviter une régression

- Toujours vérifier l'usage existant d'un composant ou d'un module avant de le modifier (cohérent avec `architecture.md` section 4) — une modification d'un composant partagé doit être testée sur l'ensemble de ses points d'usage, pas seulement sur celui qui a motivé la modification.
- Ne jamais modifier un design token global (couleur, espacement, easing) sans vérifier son impact sur l'ensemble des composants qui en dépendent.
- Toujours retester le parcours utilisateur complet (section 6) après une modification, même localisée en apparence.

## Quand refuser une livraison

Une livraison doit être refusée (et la tâche non considérée comme terminée) dès qu'un des cas suivants est constaté :

- Une fonctionnalité existante ne se comporte plus comme avant sans que ce changement soit l'objectif explicite de la tâche.
- Une erreur de build, de lint, ou de type-check n'a pas été corrigée.
- Un test de responsive, d'accessibilité ou de performance échoue par rapport aux standards définis dans les documents de référence.
- Un doute réel subsiste sur le comportement d'une fonctionnalité et qu'aucune vérification directe n'a permis de le lever.

**Aucune pression de délai ne justifie la livraison d'une régression connue et non corrigée.**

---

# 11. Validation finale

Protocole de validation complet à exécuter avant chaque livraison, dans cet ordre :

1. **Vérification du build** — le projet compile sans erreur, sans avertissement ignoré.
2. **Vérification du lint et du type-check** — aucune erreur TypeScript, aucune règle de lint non respectée sans justification documentée.
3. **Vérification visuelle multi-breakpoint** — mobile, tablette, laptop, desktop, ultra wide, en portrait et paysage si applicable (section 3).
4. **Vérification fonctionnelle** — chaque interaction testée manuellement, y compris les cas limites (double-clic rapide, interruption d'animation, navigation arrière).
5. **Vérification accessibilité** — clavier, focus, contraste, `prefers-reduced-motion`, lecteur d'écran si la modification le justifie (section 4).
6. **Vérification performance** — Lighthouse, Core Web Vitals, FPS, mémoire (section 5).
7. **Vérification Three.js et GSAP** (si applicable) — fallback, chargement, cleanup, timings (sections 7 et 8).
8. **Vérification SEO** (si la modification touche une page) — balises, schema, canonical, sitemap (section 9).
9. **Vérification de non-régression** — comportement de l'existant confirmé inchangé en dehors du périmètre voulu (section 10).
10. **Revue finale par rapport à la checklist complète** (section 14).

Une tâche n'est considérée comme terminée qu'une fois l'intégralité de ce protocole exécutée sans écart non résolu.

---

# 12. Erreurs interdites

- **"Ça marche chez moi"** — aucune validation basée uniquement sur l'environnement de développement local sans vérification en conditions représentatives de production (build, réseau, appareils réels ou émulés).
- **Pas testé sur mobile** — aucune livraison sans vérification explicite sur au moins un format mobile réaliste, jamais uniquement sur desktop redimensionné visuellement sans émulation réelle.
- **Pas testé au clavier** — aucune nouvelle interaction livrée sans vérification de son accessibilité complète au clavier.
- **Pas testé avec Reduced Motion** — aucune animation ou scène 3D livrée sans vérification explicite du comportement sous cette préférence système.
- **Pas testé Lighthouse** — aucune page modifiée livrée sans passage par Lighthouse (mobile et desktop).
- **Pas testé Three.js** — aucune scène 3D livrée sans vérification du fallback, du chargement, du FPS et du cleanup mémoire.
- **Pas testé GSAP** — aucune animation livrée sans vérification du cleanup et de la conformité aux timings définis.
- **Pas testé après resize** — aucune page avec ScrollTrigger ou layout responsive livrée sans test de redimensionnement de fenêtre en direct.
- **Pas testé en conditions réseau dégradées** — aucune fonctionnalité impliquant des ressources lourdes (3D, vidéo, images) validée uniquement en connexion rapide.
- **Suppose l'absence de régression sans vérifier** — aucune modification d'un composant ou module partagé livrée sans revérification de l'ensemble de ses points d'usage connus.
- **Ignore un avertissement de build ou de lint** — aucun avertissement traité comme "non bloquant" par défaut ; chaque avertissement doit être compris et traité explicitement.
- **Valide visuellement sans valider fonctionnellement** — un écran qui a l'air correct visuellement n'est pas suffisant ; chaque interaction doit être réellement déclenchée et vérifiée.
- **Teste uniquement le cas nominal** — aucune fonctionnalité validée sans considération des cas limites (contenu vide, contenu très long, interaction rapide répétée, interruption en cours d'animation).

---

# 13. Workflow QA

Workflow obligatoire pour toute tâche de développement sur REMOLUX, aligné avec le workflow général défini dans `architecture.md` section 15 :

1. **Analyse** — identifier, avant tout test, l'ensemble des dimensions concernées par la modification (visuel, fonctionnel, responsive, accessibilité, SEO, performance, 3D, animation, navigation — section 2) pour cibler précisément ce qui doit être vérifié.
2. **Tests** — exécuter systématiquement les tests pertinents identifiés à l'étape précédente, en suivant les méthodologies détaillées des sections 3 à 9, jamais en se limitant à une vérification superficielle.
3. **Corrections** — corriger immédiatement tout écart constaté par rapport au comportement attendu ou aux standards définis dans les documents de référence, avant de poursuivre.
4. **Validation** — exécuter le protocole de validation finale complet (section 11) une fois les corrections appliquées.
5. **Livraison** — ne considérer la tâche comme terminée qu'une fois l'intégralité de la checklist (section 14) confirmée sans écart non résolu, et expliquer clairement à l'utilisateur ce qui a été testé et vérifié (cohérent avec `rules.md` — toujours expliquer les fichiers modifiés et leur validation).

---

# 14. Checklist QA

La checklist complète (build/code, visuel/responsive, fonctionnel, accessibilité, performance, Three.js, GSAP, SEO, non-régression) est centralisée dans [`checklist.md`](./checklist.md) section 17 « QA / Validation finale », en combinaison avec les sections spécifiques au périmètre de la tâche. Elle ne doit pas être dupliquée ici.
