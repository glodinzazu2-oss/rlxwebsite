# REMOLUX — Manuel Interne du Projet

> Document de référence permanent. Toute personne (humaine ou IA) intervenant sur ce projet doit avoir lu et intégré ce document avant toute modification du code.
> Ce fichier fait autorité. En cas de doute ou de conflit avec une demande ponctuelle, ce document prévaut sauf instruction explicite et éclairée du client.

> **Point d'entrée obligatoire** : ce fichier n'est qu'un résumé de la vision et des standards. Le dossier `.claude/` contient 15 autres documents de référence (architecture, design, UX, motion, three.js, performance, assets, copywriting, SEO, brand, testing, git, roadmap, decisions, rules) qui font tout autant autorité que celui-ci. **Avant toute tâche de développement, lire [`playbook.md`](./playbook.md)** — il indique quels documents consulter selon le type de tâche, l'ordre de hiérarchie complet, et comment arbitrer un conflit entre deux guides. Ne jamais se limiter à ce seul fichier pour une tâche non triviale.

---

## 1. Vision du projet

REMOLUX est une marque premium de feux LED magnétiques sans fil, conçus pour les remorques, bateaux, caravanes, porte-engins, véhicules agricoles et professionnels.

Le site REMOLUX n'est pas une boutique en ligne. C'est une **vitrine de marque** — un espace numérique conçu pour installer une perception de qualité, de fiabilité et d'élégance technique dans l'esprit du visiteur, avant de le rediriger vers Amazon pour l'achat.

Chaque écran, chaque interaction, chaque micro-animation doit servir un seul objectif : faire ressentir que REMOLUX est un produit fini, pensé, robuste — pas un gadget générique importé.

## 2. Mission

Construire l'expérience digitale la plus soignée possible dans sa catégorie (accessoires remorque/utilitaire), au niveau visuel et sensoriel d'une marque comme Apple, Rivian, ou Ledlenser — appliqué à un produit d'apparence simple mais d'usage exigeant (extérieur, sécurité routière, conditions difficiles).

Le site doit convaincre en moins de 10 secondes que REMOLUX est un produit sérieux, et donner envie de cliquer vers Amazon en toute confiance.

## 3. Objectifs business

- **Objectif principal** : générer des clics qualifiés vers les fiches produits Amazon (CTA omniprésents mais non intrusifs).
- **Objectif secondaire** : asseoir une image de marque forte et mémorable, indépendante de la plateforme de vente.
- **Objectif tertiaire** : réduire le taux de rebond en offrant une expérience de navigation fluide, rapide, et gratifiante (storytelling produit, démonstration visuelle du système magnétique/sans fil).
- Le site n'a **aucune fonction e-commerce native** : pas de panier, pas de paiement, pas de compte client. Tout tunnel d'achat = redirection externe vers Amazon.

## 4. Public cible

- Propriétaires de remorques, caravanes, bateaux, porte-engins (particuliers).
- Professionnels du BTP, agriculteurs, loueurs de matériel, flottes utilitaires.
- Profil type : exigeant sur la fiabilité, sensible au prix mais prêt à payer plus pour de la qualité perçue, achète déjà sur Amazon par habitude/confiance logistique.
- Utilisateur majoritairement mobile en phase de découverte (réseaux sociaux, recherche), et souvent desktop/mobile en phase de vérification avant achat.

## 5. ADN de la marque

Les piliers non négociables de toute décision créative ou technique :

- **Confiance** — le site ne doit jamais paraître approximatif. Zéro élément cassé, zéro texte flou, zéro promesse non tenue visuellement.
- **Simplicité** — une idée par écran. Pas de surcharge d'information. Le produit et son bénéfice priment toujours sur la décoration.
- **Robustesse** — direction artistique qui évoque le solide, le durable, l'étanche, le résistant (matières, contrastes, typographies).
- **Liberté** — sans fil, magnétique, sans installation : cette liberté d'usage doit se ressentir dans la fluidité de navigation elle-même.
- **Élégance** — sobriété visuelle, pas de gadgets graphiques superflus, alignement et espacement irréprochables.
- **Qualité perçue** — chaque détail (transition, ombre, typo, timing d'animation) doit signaler un produit haut de gamme.
- **Storytelling** — le site raconte un usage, une situation, un problème résolu — il ne liste pas des caractéristiques techniques brutes.
- **Expérience utilisateur haut de gamme** — fluidité, réactivité, absence de friction, sensation "premium" à chaque scroll et interaction.

## 6. Positionnement

REMOLUX se positionne comme la référence premium sur un marché aujourd'hui dominé par des produits génériques et sans identité. Le site doit créer un écart de perception net avec la concurrence low-cost : là où les autres montrent des photos produit basiques sur fond blanc, REMOLUX raconte une expérience, une situation réelle, une preuve de robustesse.

Ton de marque : sobre, confiant, technique sans être froid, jamais criard, jamais "vendeur" au sens agressif du terme.

## 7. Direction artistique

- Palette sombre/contrastée dominante, avec accents lumineux évoquant les LED elles-mêmes (rouge signal, blanc froid) utilisés avec parcimonie et intention.
- Typographie : sans-serif moderne, lisible, avec hiérarchie claire (display bold pour les titres d'impact, texte courant très lisible).
- Photographie/3D : mise en situation réelle (route, nuit, remorque, chantier) plutôt que packshots froids. Le rendu 3D (Three.js) est utilisé pour sublimer le produit, pas pour la démonstration technique aride.
- Animations (GSAP) : subtiles, motivées par le scroll, jamais gratuites. Chaque animation doit renforcer un message (ex. : révéler la fixation magnétique, illustrer l'étanchéité).
- Scroll (Lenis) : doit donner une sensation de fluidité "cinématique", jamais de latence perceptible.
- Espace blanc (ou noir) généreux. Le vide fait partie du design premium.

## 8. Philosophie UX

- Mobile first absolu : la majorité du trafic de découverte est mobile.
- Parcours court et guidé : Accroche → Problème → Solution REMOLUX → Preuve (robustesse/facilité) → CTA Amazon.
- Le CTA vers Amazon doit toujours être visible ou accessible en un geste, sans être agressif.
- Aucune friction : pas de pop-up intrusif, pas de formulaire obligatoire, pas de cookie banner envahissant.
- Chaque page doit pouvoir se consommer en scroll continu, sans obliger de réflexion ou de recherche d'information.
- La vitesse perçue fait partie de l'expérience premium : un site premium qui rame n'est plus premium.

## 9. Stack technique imposée

- **Astro** — génération du site, architecture en îlots, performance par défaut.
- **TypeScript** — strict, sur l'intégralité du code (pas de `.js` nouveau, pas de `any` non justifié).
- **GSAP** — animations avancées, scroll-triggers, séquences.
- **Three.js** — rendu 3D du produit / effets visuels immersifs.
- **Lenis** — smooth scroll.
- **CSS moderne** — CSS natif (custom properties, nesting, container queries, `clamp()`), pas de framework CSS lourd type Bootstrap. Tailwind possible uniquement si déjà en place dans le projet — ne pas l'introduire sans validation.
- **Architecture modulaire** — composants Astro isolés et réutilisables, séparation stricte logique / présentation / animation.

Ne jamais introduire une dépendance supplémentaire (librairie UI, framework, plugin) sans validation explicite. La stack ci-dessus est fermée par défaut.

## 10. Standards de développement

- Un composant = une responsabilité. Pas de composant "fourre-tout".
- Toute logique d'animation GSAP doit être isolée dans des modules dédiés (`/src/animations` ou équivalent existant), jamais inline dans le markup sans raison.
- Le code Three.js (scènes, matériaux, lumières) doit être encapsulé et nettoyé proprement (dispose des géométries/matériaux/textures, cleanup au unmount) pour éviter les fuites mémoire.
- Pas de dupplication : si un pattern se répète 3 fois, il devient un composant ou un utilitaire.
- Pas d'abstraction prématurée : ne pas généraliser un composant pour un futur cas d'usage hypothétique.
- Respecter l'arborescence existante du projet ; ne pas créer de nouvelle convention de dossier sans nécessité claire.

## 11. Standards de code

- TypeScript strict, typage explicite des props de composants et des fonctions publiques.
- Nommage clair et en anglais pour le code (variables, fonctions, fichiers) ; le contenu éditorial (textes du site) peut être en français selon le marché ciblé.
- Pas de commentaires inutiles décrivant ce que fait le code — uniquement des commentaires expliquant un choix non évident (contrainte technique, workaround, comportement GSAP/Three.js particulier).
- Formatage cohérent avec la configuration du projet (Prettier/ESLint si présents) — ne jamais désactiver une règle de lint pour contourner un problème sans le signaler.
- Pas de `console.log` laissé dans le code livré.
- Gestion des assets (images, modèles 3D, vidéos) optimisée systématiquement avant intégration (compression, formats modernes : WebP/AVIF, glTF compressé pour le 3D).

## 12. Architecture attendue

- Astro en mode statique/hybride selon les besoins de performance (pas de SSR inutile).
- Composants Astro pour la structure statique, hydratation ciblée (`client:visible`, `client:idle`, etc.) uniquement là où l'interactivité l'exige — jamais d'hydratation globale par défaut.
- Séparation claire :
  - `/src/components` — composants UI réutilisables
  - `/src/sections` ou équivalent — sections de page assemblant les composants
  - `/src/animations` — logique GSAP isolée
  - `/src/three` ou `/src/webgl` — scènes et logique Three.js
  - `/src/styles` — design tokens CSS globaux (couleurs, typographie, espacements)
  - `/src/assets` — médias sources
- Design tokens centralisés en CSS custom properties (couleurs de marque, échelle typographique, espacements, easing des animations) — jamais de valeurs magiques dispersées dans le code.

## 13. Performance — objectif Lighthouse 95+

- Objectif : score Lighthouse **95+** sur Performance, Accessibilité, Bonnes pratiques et SEO, en mobile comme en desktop.
- Chargement différé systématique des ressources lourdes (modèles 3D, vidéos, animations complexes) via lazy loading / intersection observer.
- Images toujours servies en formats modernes, dimensionnées correctement, avec `width`/`height` explicites pour éviter le CLS.
- Polices optimisées (subset, `font-display: swap`, préchargement des polices critiques).
- Bundle JS minimal : tout script tiers ou lourd (Three.js notamment) chargé de façon asynchrone et uniquement quand nécessaire.
- Toute nouvelle dépendance ou fonctionnalité doit être évaluée sur son coût de performance avant intégration.
- Tester avant chaque livraison sur mobile en conditions réseau dégradées (throttling).

## 14. SEO

- Structure sémantique HTML stricte (un seul `<h1>` par page, hiérarchie logique des titres).
- Meta title/description uniques et pertinents par page, orientés bénéfice utilisateur.
- Données structurées (schema.org) pour le produit et l'organisation quand pertinent.
- URLs propres, lisibles, cohérentes.
- Sitemap et robots.txt maintenus à jour.
- Contenu textuel réel et significatif (pas de texte caché ou de bourrage de mots-clés) — cohérent avec le storytelling de marque.
- Balises alt descriptives sur toutes les images porteuses de sens.

## 15. Accessibilité — WCAG AA

- Contraste des couleurs conforme AA minimum sur tout texte et élément interactif, y compris sur fond sombre avec accents lumineux.
- Navigation clavier complète : tous les éléments interactifs (CTA, liens, menus) accessibles et visibles au focus.
- Attributs ARIA utilisés uniquement quand nécessaire, jamais en substitut d'un HTML sémantique correct.
- Animations : respecter `prefers-reduced-motion` — proposer une expérience allégée sans animation intensive pour les utilisateurs qui le demandent.
- Textes alternatifs pertinents sur toute image, icône ou élément 3D porteur d'information.
- Formulaires (s'il y en a, ex. newsletter) toujours labellisés correctement.

## 16. Responsive — mobile first

- Toute conception et tout développement démarrent par la version mobile, puis s'étendent vers tablette et desktop.
- Breakpoints cohérents avec le design system du projet — ne pas en inventer de nouveaux sans nécessité.
- Le rendu 3D et les animations lourdes doivent avoir une version allégée ou désactivée sur mobile bas de gamme si la performance l'exige.
- Zones tactiles dimensionnées correctement (min. 44x44px) pour tous les éléments cliquables.
- Tester systématiquement sur viewport mobile réel (ou émulé) avant toute livraison.

## 17. Règles Git

- Commits atomiques, un sujet logique par commit.
- Messages de commit clairs, en anglais, format impératif court (ex. `fix hero animation trigger on Safari`), expliquant le **pourquoi** si non évident.
- Ne jamais commit de fichiers générés, de secrets, de clés API, ou de fichiers temporaires.
- Ne jamais forcer un push sur une branche partagée sans confirmation explicite.
- Ne jamais amender ou réécrire l'historique de commits déjà partagés sans validation.
- Une branche = une fonctionnalité ou un correctif clairement délimité.

## 18. Règles de documentation

- Ce fichier (`CLAUDE.md`) documente la vision et les règles du projet — il n'est mis à jour que si la vision, les objectifs ou les standards changent réellement (pas pour des détails d'implémentation).
- Pas de documentation dupliquée du code déjà lisible par lui-même.
- Toute décision architecturale non évidente doit être commentée à l'endroit du code concerné, pas dans un document séparé perdu dans le temps.
- Ne pas créer de fichiers `.md` de planification ou de notes intermédiaires sauf demande explicite.

## 19. Procédure avant toute modification

1. Relire ce document (`CLAUDE.md`) si le contexte n'est pas déjà clair en mémoire de la session.
2. Comprendre l'objectif réel de la demande à la lumière de la mission (image de marque + redirection Amazon), pas uniquement de sa formulation littérale.
3. Explorer le code existant concerné (structure, conventions, composants similaires) avant d'écrire quoi que ce soit — ne jamais dupliquer un pattern déjà présent ailleurs.
4. Vérifier l'impact potentiel sur la performance, l'accessibilité et le responsive de la modification envisagée.
5. En cas d'ambiguïté sur un choix créatif ou technique impactant la marque, poser la question plutôt que de supposer.

## 20. Procédure après chaque modification

1. Vérifier que le code respecte les standards de code et d'architecture définis ci-dessus.
2. Vérifier visuellement le rendu (desktop **et** mobile) quand la modification touche l'UI, l'animation ou le 3D.
3. Vérifier l'absence de régression sur les animations GSAP et les scènes Three.js existantes (pas de fuite mémoire, pas de conflit de scroll-trigger).
4. Vérifier que le smooth scroll (Lenis) reste fluide et sans conflit avec les nouveaux éléments.
5. Contrôler l'accessibilité de base (focus clavier, contraste, `prefers-reduced-motion`) sur les éléments ajoutés ou modifiés.
6. Ne jamais déclarer une tâche terminée sans être passé par la checklist finale (section 23).

## 21. Règles de sécurité

- Aucune donnée sensible (clé API, token, identifiant) ne doit jamais être exposée côté client ou committée dans le dépôt.
- Toute intégration tierce (analytics, tracking, widget) doit être limitée au strict nécessaire et respectueuse de la vie privée du visiteur.
- Pas de collecte de données personnelles au-delà de ce qui est strictement nécessaire (le site ne gère ni compte, ni paiement).
- Liens sortants vers Amazon toujours explicites pour l'utilisateur (pas de redirection masquée ou trompeuse).
- Dépendances tenues à jour ; ne jamais ignorer une alerte de vulnérabilité connue sans la traiter ou la documenter.

## 22. Ce qu'il ne faut jamais faire

- Ne jamais ajouter de fonctionnalité e-commerce (panier, paiement, compte utilisateur) — ce n'est pas la mission du site.
- Ne jamais sacrifier la performance pour un effet visuel non essentiel.
- Ne jamais surcharger une page d'animations ou d'éléments 3D au point de nuire à la lisibilité ou à la fluidité.
- Ne jamais introduire une dépendance ou un framework hors de la stack imposée sans validation explicite.
- Ne jamais copier un pattern générique "template e-commerce" — chaque écran doit être pensé pour l'ADN REMOLUX.
- Ne jamais livrer une interaction ou une animation non testée sur mobile.
- Ne jamais ignorer les standards WCAG AA au prétexte de contraintes visuelles.
- Ne jamais rendre le CTA vers Amazon trompeur, agressif ou intrusif (pas de dark pattern).
- Ne jamais committer de secrets, clés, ou fichiers de configuration sensibles.
- Ne jamais faire de refactoring ou de nettoyage non demandé en marge d'une tâche ciblée.

## 23. Checklist finale avant de considérer une tâche terminée

La checklist complète et détaillée est centralisée dans [`checklist.md`](./checklist.md) — ce document unique remplace toute checklist qui serait autrement dupliquée dans chacun des guides du projet. Avant de considérer une tâche terminée, valider les sections de `checklist.md` pertinentes au périmètre de la tâche (section 1 « Général » systématiquement, plus les sections spécifiques : Architecture, Motion, Three.js, Performance, Accessibilité, SEO, Copywriting, Brand, UX, Git, QA selon le cas).
