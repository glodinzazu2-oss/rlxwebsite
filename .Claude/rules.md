# REMOLUX — Règles Absolues du Projet

> Ce document définit les règles non négociables applicables à tout développement sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md) (vision, mission, ADN de marque) en fixant les règles opérationnelles strictes de développement.
> Ces règles s'appliquent à toute personne (humaine ou IA) intervenant sur le code, sans exception. En cas de conflit apparent entre une demande ponctuelle et ce document, ce document prévaut — signaler le conflit plutôt que de le contourner en silence.

---

## 1. Règles générales

- Ne jamais casser une fonctionnalité existante. Toute modification doit être vérifiée par rapport au comportement précédent avant d'être considérée comme acquise.
- Ne jamais supprimer du code sans justification claire et explicite. Si un doute existe sur l'utilité d'un code, l'investiguer avant d'agir — ne jamais supprimer "par précaution" ou "au cas où".
- Toujours privilégier la simplicité : la solution la plus simple qui répond correctement au besoin est toujours préférable à une solution plus élaborée.
- Toujours privilégier les performances, en cohérence avec l'objectif Lighthouse 95+ défini dans `CLAUDE.md`.
- Toujours écrire un code lisible : un code que l'on comprend en le lisant une fois, sans effort de reconstruction mentale.
- Toujours documenter les décisions importantes — pas le code trivial, mais les choix non évidents (contrainte technique, compromis, comportement spécifique d'une librairie).
- Toujours vérifier le build avant de terminer une tâche.
- Toujours corriger les erreurs détectées (build, lint, type-check, console) avant de considérer une tâche comme terminée.
- Ne jamais utiliser de dépendance inutile — toute nouvelle dépendance doit être justifiée par un besoin réel, non substituable par le code existant ou la stack imposée.
- Ne jamais dupliquer du code — factoriser dès qu'un pattern se répète de façon identique ou quasi identique.
- Toujours respecter le Design System du projet (tokens, composants, échelles) tel qu'il existe — ne pas en créer un parallèle.
- Toujours respecter le REMOLUX Experience Book (confiance, simplicité, robustesse, liberté, élégance, qualité perçue, storytelling, UX haut de gamme).
- Toujours expliquer les fichiers modifiés à l'issue d'une tâche : quels fichiers, pourquoi, et quel effet la modification a sur le comportement du site.

## 2. Règles d'architecture

- Respecter strictement la séparation des responsabilités : structure (Astro), logique d'animation (GSAP), rendu 3D (Three.js), style (CSS), comportement de scroll (Lenis) — chacun dans son domaine, jamais mélangés dans un même fichier sans nécessité.
- Un composant = une responsabilité unique et clairement nommée.
- Respecter l'arborescence existante du projet. Ne jamais créer une nouvelle convention de dossier ou de nommage sans nécessité démontrée.
- Toute nouvelle abstraction doit répondre à un besoin réel et actuel — jamais à un besoin futur hypothétique.
- Les design tokens (couleurs, typographie, espacements, easings) doivent rester centralisés — jamais de valeurs magiques dispersées dans les composants.
- Le couplage entre modules doit rester minimal : un composant UI ne doit jamais dépendre directement d'une scène Three.js ou d'une instance GSAP sans passer par une interface claire.

## 3. Règles Astro

- Utiliser le rendu statique/hybride par défaut ; ne jamais introduire de SSR ou de rendu dynamique non justifié par un besoin réel.
- Hydratation ciblée uniquement (`client:visible`, `client:idle`, `client:load` selon le besoin réel) — jamais d'hydratation globale ou par défaut "au cas où".
- Un fichier `.astro` reste lisible : si la logique interactive devient complexe, l'extraire dans un module TypeScript dédié plutôt que de la laisser s'accumuler dans le composant.
- Les props de composants Astro doivent être typées explicitement.
- Ne jamais dupliquer un layout ou une section déjà existante — réutiliser ou étendre l'existant.
- Les imports de scripts lourds (Three.js, GSAP) doivent être scoping au composant qui en a réellement besoin, jamais globalisés dans un layout partagé sans raison.

## 4. Règles TypeScript

- Mode strict obligatoire sur l'ensemble du projet.
- Typage explicite des fonctions publiques, des props de composants, et des retours de fonctions non triviales.
- `any` interdit sauf cas exceptionnel documenté (intégration d'une librairie tierce non typée) — préférer `unknown` avec narrowing.
- Pas de suppression d'erreur de type via `@ts-ignore` ou `@ts-expect-error` sans commentaire expliquant pourquoi c'est nécessaire et temporaire.
- Nommage des types et interfaces cohérent avec les conventions déjà en place dans le projet.
- Pas de duplication de types : un type partagé entre plusieurs modules doit être centralisé.

## 5. Règles CSS

- CSS moderne natif uniquement (custom properties, nesting, `clamp()`, container queries) — pas de framework CSS lourd non déjà présent dans le projet.
- Toute couleur, espacement, ou valeur typographique doit provenir des design tokens définis — jamais de valeur codée en dur si un token équivalent existe.
- Mobile first systématique : les styles de base ciblent le mobile, les media queries étendent vers le haut (tablette, desktop).
- Éviter les sélecteurs trop spécifiques ou les `!important` — s'ils deviennent nécessaires, c'est le signe d'un problème de structure à corriger, pas à contourner.
- Cohérence des unités : privilégier des unités relatives (`rem`, `%`, `clamp()`, `vw`/`vh` avec prudence) pour garantir la fluidité responsive.
- Pas de style inline dans le markup sauf cas justifié (valeur dynamique calculée à l'exécution).

## 6. Règles GSAP

- Toute logique d'animation GSAP doit être isolée dans des modules dédiés, jamais écrite inline dans le markup sans raison.
- Chaque animation doit servir un objectif narratif ou fonctionnel clair (renforcer un message de marque, guider l'attention) — jamais d'animation gratuite ou décorative sans justification.
- Toujours nettoyer les instances GSAP (`ScrollTrigger.kill()`, timelines) au démontage du composant ou changement de contexte, pour éviter les fuites mémoire et les triggers fantômes.
- Respecter systématiquement `prefers-reduced-motion` : prévoir une version allégée ou statique pour les utilisateurs qui le demandent.
- Éviter les animations qui bloquent ou ralentissent le scroll perçu — la fluidité du scroll prime toujours sur la sophistication de l'animation.
- Ne jamais empiler des ScrollTrigger redondants sur un même élément ; vérifier l'existant avant d'en ajouter un nouveau.

## 7. Règles Three.js

- Toute scène, matériau, géométrie ou texture doit être explicitement disposée (`dispose()`) lors du démontage du composant, sans exception — les fuites mémoire WebGL ne sont pas tolérées.
- Le rendu 3D doit avoir une stratégie de dégradation ou de désactivation sur les appareils bas de gamme ou en cas de contrainte de performance forte.
- La logique Three.js (scène, caméra, lumières, boucle de rendu) doit rester encapsulée dans son propre module, jamais mélangée à la logique de composant UI.
- Charger les modèles 3D dans des formats optimisés et compressés (glTF/GLB compressé) — jamais de modèle brut non optimisé.
- La boucle de rendu (`requestAnimationFrame`) doit être stoppée quand la scène n'est pas visible (hors viewport, onglet inactif) pour économiser les ressources.
- Ne jamais instancier plusieurs renderers ou scènes redondantes sur une même page sans nécessité.

## 8. Règles Lenis

- Une seule instance de smooth scroll active à la fois sur la page — jamais d'instances concurrentes.
- Toute intégration avec GSAP ScrollTrigger doit être correctement synchronisée (mise à jour de ScrollTrigger sur les évènements Lenis) pour éviter les décalages visuels.
- Ne jamais bloquer ou interrompre le scroll natif sur les zones qui doivent rester nativement scrollables (menus internes, zones de texte long) sans raison UX claire.
- Vérifier systématiquement l'absence de conflit entre Lenis et les nouveaux éléments interactifs ajoutés (formulaires, ancres, modales).
- La fluidité du scroll doit rester constante sur mobile comme sur desktop — tester les deux avant de valider.

## 9. Règles SEO

- Un seul `<h1>` par page, hiérarchie de titres logique et continue.
- Meta title et meta description uniques, pertinents, et orientés bénéfice utilisateur pour chaque page.
- URLs propres, lisibles, stables dans le temps.
- Attributs `alt` descriptifs et pertinents sur toute image porteuse de sens.
- Contenu textuel réel et cohérent avec le storytelling de marque — jamais de texte caché ou de sur-optimisation artificielle.
- Sitemap et `robots.txt` maintenus à jour à chaque évolution de la structure du site.
- Données structurées (schema.org) utilisées quand pertinent pour le produit et l'organisation.

## 10. Règles Performance

- Objectif permanent : Lighthouse 95+ sur Performance, mobile et desktop.
- Chargement différé systématique des ressources lourdes (3D, vidéos, animations complexes) via lazy loading ou intersection observer.
- Images toujours en formats modernes (WebP/AVIF), correctement dimensionnées, avec `width`/`height` explicites pour éviter le CLS.
- Polices optimisées : subset, `font-display: swap`, préchargement uniquement des polices critiques.
- Scripts lourds (Three.js notamment) chargés de façon asynchrone et uniquement lorsque nécessaire.
- Toute nouvelle fonctionnalité ou dépendance doit être évaluée sur son coût de performance avant intégration.
- Tester systématiquement en conditions réseau dégradées (throttling) avant toute livraison.

## 11. Règles Accessibilité

- Conformité WCAG AA minimum sur l'ensemble du site.
- Contraste de couleur conforme AA sur tout texte et élément interactif, y compris sur les fonds sombres avec accents lumineux.
- Navigation clavier complète : tout élément interactif doit être atteignable et visiblement focusable au clavier.
- Respect systématique de `prefers-reduced-motion`.
- Attributs ARIA utilisés uniquement en complément d'un HTML sémantique correct, jamais en substitut.
- Textes alternatifs pertinents sur toute image, icône, ou élément 3D porteur d'information.
- Tout formulaire (le cas échéant) correctement labellisé et accessible.

## 12. Règles Responsive

- Conception et développement mobile first, extension progressive vers tablette et desktop.
- Utiliser les breakpoints déjà définis dans le design system — ne pas en inventer de nouveaux sans nécessité démontrée.
- Zones tactiles dimensionnées correctement (minimum 44x44px) pour tout élément cliquable.
- Version allégée ou désactivée des animations/3D lourds sur mobile bas de gamme si la performance l'exige.
- Tester systématiquement sur viewport mobile réel ou émulé avant toute livraison, en plus du desktop.

## 13. Règles Git

- Commits atomiques : un sujet logique et cohérent par commit.
- Messages de commit clairs, en anglais, format impératif court, expliquant le pourquoi si non évident.
- Ne jamais committer de secrets, clés API, tokens, ou fichiers de configuration sensibles.
- Ne jamais committer de fichiers générés, temporaires, ou de build.
- Ne jamais forcer un push sur une branche partagée sans confirmation explicite de l'utilisateur.
- Ne jamais réécrire l'historique de commits déjà partagés sans validation explicite.
- Une branche correspond à une fonctionnalité ou un correctif clairement délimité.

## 14. Règles Documentation

- `CLAUDE.md` documente la vision, la mission et les standards du projet — mis à jour uniquement si ces éléments changent réellement.
- `rules.md` (ce document) documente les règles opérationnelles strictes — mis à jour uniquement en cas d'évolution réelle des règles, jamais pour un détail ponctuel.
- Pas de documentation dupliquée d'un code déjà lisible par lui-même.
- Toute décision architecturale ou technique non évidente doit être commentée directement à l'endroit du code concerné.
- Ne jamais créer de fichiers `.md` de planification, de notes ou de brouillons intermédiaires sans demande explicite.
- À l'issue de chaque tâche, expliquer clairement les fichiers modifiés, la raison de la modification, et son effet sur le comportement du site.

## 15. Règles de sécurité

- Aucune donnée sensible (clé API, token, identifiant, secret) ne doit jamais être exposée côté client ni committée dans le dépôt.
- Toute intégration tierce (analytics, tracking, widget externe) limitée au strict nécessaire, respectueuse de la vie privée du visiteur.
- Pas de collecte de données personnelles au-delà du strict nécessaire — le site ne gère ni compte utilisateur ni paiement.
- Liens sortants vers Amazon toujours explicites, jamais masqués ou trompeurs.
- Dépendances tenues à jour ; toute vulnérabilité connue signalée doit être traitée ou explicitement documentée si elle ne peut pas l'être immédiatement.
- Ne jamais exécuter ou intégrer de code provenant d'une source non vérifiée.

## 16. Ce qu'il est strictement interdit de faire

- Casser une fonctionnalité existante, même temporairement, sans en informer immédiatement l'utilisateur.
- Supprimer du code, un fichier ou une fonctionnalité sans justification claire et validée.
- Ajouter une fonctionnalité e-commerce (panier, paiement, compte utilisateur) — hors mission du site.
- Introduire une dépendance ou un framework hors de la stack imposée (Astro, TypeScript, GSAP, Three.js, Lenis, CSS moderne) sans validation explicite.
- Dupliquer un pattern, un composant ou un style déjà existant ailleurs dans le projet.
- Sacrifier la performance pour un effet visuel non essentiel.
- Ignorer les standards WCAG AA au prétexte de contraintes visuelles.
- Laisser des `console.log`, du code mort, ou des fichiers temporaires dans le code livré.
- Committer un secret, une clé, ou un fichier de configuration sensible.
- Faire du refactoring ou du nettoyage non demandé en marge d'une tâche ciblée.
- Terminer une tâche sans avoir vérifié le build et corrigé les erreurs détectées.
- Modifier un fichier hors du périmètre explicitement demandé par l'utilisateur.

## 17. Checklist obligatoire avant de terminer une tâche

La checklist opérationnelle complète est centralisée dans [`checklist.md`](./checklist.md) — section 1 « Général » systématiquement, plus les sections spécifiques au périmètre de la tâche. Elle ne doit pas être dupliquée ici.
