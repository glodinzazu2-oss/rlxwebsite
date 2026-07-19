# REMOLUX — Checklist Maître

> Ce document est la **seule** source de vérité pour toutes les checklists du projet. Chaque guide (`architecture.md`, `design.md`, `motion.md`, `three.md`, `performance.md`, `assets.md`, `copywriting.md`, `seo.md`, `brand.md`, `ux.md`, `testing.md`, `git.md`, `roadmap.md`, `rules.md`, `CLAUDE.md`) renvoie ici au lieu de dupliquer ses propres items de validation.
>
> **Pourquoi une checklist unique** : avant la création de ce document, le même critère (`prefers-reduced-motion` respecté, cleanup GSAP/Three.js, mobile-first vérifié, WCAG AA) était répété quasi à l'identique dans une dizaine de fichiers différents. Un changement de seuil ou de règle obligeait à chasser toutes ses occurrences sans garantie d'exhaustivité. Ici, chaque critère n'existe qu'à un seul endroit — le modifier une fois suffit.
>
> **Comment l'utiliser** : une tâche ne coche que les sections pertinentes à son périmètre (cf. `playbook.md` section 3 pour savoir quelles sections s'appliquent à quel type de tâche). Une tâche qui touche uniquement du texte n'a pas à valider la section Three.js ; une tâche purement visuelle n'a pas à valider la section Git au-delà de la section 14.

---

## 1. Général (toute tâche, sans exception)

- [ ] L'objectif réel de la demande a été compris à la lumière de la mission REMOLUX (`CLAUDE.md`), pas seulement de sa formulation littérale.
- [ ] L'existant a été exploré avant d'écrire quoi que ce soit — aucun pattern déjà présent n'a été dupliqué.
- [ ] La solution retenue est la plus simple possible pour répondre au besoin réel.
- [ ] Aucune fonctionnalité existante n'a été cassée ; si un doute existe, il a été vérifié, pas supposé.
- [ ] Aucun code, fichier ou fonctionnalité n'a été supprimé sans justification claire et explicite.
- [ ] Aucun refactoring ou nettoyage hors périmètre n'a été fait sans validation explicite.
- [ ] Le build passe sans erreur ; lint et type-check ne signalent aucune erreur ignorée.
- [ ] Aucun `console.log`, code mort, ou fichier temporaire n'est laissé dans le code livré.
- [ ] Aucune dépendance hors stack (Astro, TypeScript, GSAP, Three.js, Lenis, CSS natif) n'a été introduite sans validation explicite (critères d'évaluation : `architecture.md` section 12).
- [ ] Les fichiers modifiés seront clairement expliqués à l'utilisateur en fin de tâche (quoi, pourquoi, effet produit).

## 2. Architecture & Composants

- [ ] Le fichier créé/modifié est placé dans le bon dossier selon la hiérarchie définie (`architecture.md` section 2).
- [ ] La responsabilité du module reste unique et clairement identifiable.
- [ ] Aucune nouvelle abstraction n'a été introduite sans besoin réel et actuel.
- [ ] L'existant (`components/`, `sections/`, `utils/`, `lib/`) a été vérifié avant toute création.
- [ ] Un composant réutilisable ne dépend d'aucun contexte métier spécifique.
- [ ] Aucun magic number ni magic string n'a été introduit (constante nommée ou token).

## 3. TypeScript

- [ ] Mode strict respecté ; aucun `any` non justifié et documenté.
- [ ] Props de composants et fonctions publiques typées explicitement.
- [ ] Types/interfaces correctement organisés (locaux vs `types/` si partagés).

## 4. CSS

- [ ] Toute couleur, espacement, ou valeur typographique provient des design tokens (`design.md` section 3-5) — aucune valeur codée en dur si un token équivalent existe.
- [ ] Mobile first : styles de base ciblent le mobile, media queries étendent vers le haut.
- [ ] Aucun style inline sauf valeur dynamique calculée à l'exécution.

## 5. Astro

- [ ] Le composant reste un composant Astro pur si aucune interactivité réelle n'est nécessaire.
- [ ] La directive `client:*` utilisée est la plus légère possible pour le besoin réel, jamais ajoutée « par sécurité » (`architecture.md` section 6).
- [ ] Aucun `client:only` sans nécessité absolue.

## 6. GSAP & Motion

- [ ] L'animation a une fonction précise identifiable (guider, révéler, expliquer, accompagner, rassurer — `motion.md` section 1) ; sinon elle n'existe pas.
- [ ] Timing et easing conformes aux recommandations (`motion.md` sections 5-6) ; aucun bounce/elastic/linéaire non justifié.
- [ ] Toute logique GSAP est isolée dans `src/animations/`, jamais inline sans raison.
- [ ] Chaque instance GSAP (timeline, ScrollTrigger) est nettoyée via `gsap.context()` au démontage.
- [ ] Lenis et ScrollTrigger restent synchronisés ; bornes `start`/`end` explicites et vérifiées.
- [ ] `prefers-reduced-motion` est respecté : version réduite ou statique prévue et testée.
- [ ] Seules les propriétés compositées (`transform`, `opacity`) sont animées.
- [ ] 60 FPS constant vérifié, aucun jank perceptible.

## 7. Three.js / 3D

- [ ] La scène a un objectif de démonstration produit clairement identifié (`three.md` section 1) ; sinon elle n'existe pas.
- [ ] Structure de fichiers conforme (`core/`, `loaders/`, `scenes/`, `materials/`, `utils/`), interface stable (`init`, `update`, `dispose`).
- [ ] Modèle exporté en GLB compressé Draco ; textures compressées et à résolution proportionnée à l'usage réel.
- [ ] Nombre de lumières limité à 2-3 maximum ; matériaux justifiés par la surface réelle.
- [ ] Aucune rotation ou mouvement de caméra automatique continu sans interaction utilisateur.
- [ ] `dispose()` complet vérifié (geometry, material, texture, renderer) au démontage — sans exception.
- [ ] Boucle de rendu suspendue hors du viewport et lorsque l'onglet est inactif.
- [ ] Fallback image statique haute qualité testé explicitement (incompatibilité, contrainte de performance).
- [ ] Alternative textuelle/accessible existe pour toute information portée exclusivement par la scène.

## 8. Performance

- [ ] Aucun des Core Web Vitals cibles n'est dégradé (LCP < 2.0s, CLS < 0.05, INP < 150ms — `performance.md` section 2).
- [ ] Score Lighthouse Performance maintenu à 95+ (mobile et desktop) si la modification touche le rendu, les scripts ou les images.
- [ ] Images en AVIF/WebP, `width`/`height` explicites, lazy loading sous la ligne de flottaison.
- [ ] Polices en WOFF2, subset, `font-display: swap`, préchargement limité aux polices critiques.
- [ ] Aucun script inutile ajouté ; imports ciblés compatibles tree shaking.
- [ ] Toute logique lourde non critique chargée dynamiquement (`import()`) ou différée.

## 9. Assets

- [ ] Asset placé dans le bon dossier (`assets.md` section 2), nommé selon la convention (minuscules, tirets, descriptif — section 9).
- [ ] Format adapté au type de contenu (AVIF/WebP photo, SVG vectoriel, WOFF2 police, GLB 3D).
- [ ] Compression appliquée au maximum sans perte perceptible ; résolution proportionnée à l'usage réel.
- [ ] Aucun doublon d'un asset déjà présent ailleurs ; aucun asset orphelin laissé après la tâche.
- [ ] Licence vérifiée pour tout asset ou police tiers.

## 10. Accessibilité (WCAG AA)

- [ ] Contraste conforme AA sur tout texte et élément interactif, y compris sur fond sombre avec accents lumineux.
- [ ] Navigation clavier complète : tout élément interactif atteignable et visiblement focusable.
- [ ] Attributs ARIA utilisés uniquement en complément d'un HTML sémantique correct.
- [ ] Texte alternatif pertinent sur toute image, icône ou élément 3D porteur de sens.
- [ ] `prefers-reduced-motion` testé et produit le comportement attendu (voir section 6).

## 11. Responsive / Mobile

- [ ] Conception et développement mobile first, étendus vers tablette puis desktop.
- [ ] Vérifié sur mobile, tablette, laptop, desktop, ultra wide (portrait et paysage si applicable).
- [ ] Zones tactiles ≥ 44x44px ; aucun élément ne déborde ou n'est tronqué à aucune taille testée.
- [ ] Breakpoints utilisés sont ceux déjà définis dans le design system.

## 12. SEO

- [ ] Un seul `<h1>` par page ; hiérarchie H2/H3 logique et continue.
- [ ] `<title>` et meta description uniques, pertinents, de longueur maîtrisée.
- [ ] Balise canonical présente et correcte ; URL courte, lisible, stable.
- [ ] Données structurées (JSON-LD) exactes et honnêtes par rapport au contenu visible (`seo.md` section 6).
- [ ] Page incluse dans le sitemap généré ; `robots.txt` cohérent avec l'intention d'indexation.

## 13. Copywriting & Contenu

- [ ] Le texte a une fonction claire (inspirer confiance, démontrer, expliquer, convertir — `copywriting.md` section 1).
- [ ] Chaque affirmation de qualité est accompagnée d'une preuve concrète et vérifiable ; sinon elle est retirée.
- [ ] Aucun mot de la liste interdite (`copywriting.md` section 9) ni superlatif non justifié.
- [ ] CTA court (2-4 mots), honnête, sans urgence artificielle, placé à un point de rupture naturel.

## 14. Brand / Identité

- [ ] La décision se rattache explicitement à la mission REMOLUX et à au moins une des six valeurs fondamentales (`brand.md` sections 1 et 3).
- [ ] Aucune des erreurs interdites de `brand.md` section 9 n'a été commise (prétention, agressivité, promesse impossible, dénigrement, copie d'une marque de référence).
- [ ] En cas de conflit entre une envie créative ponctuelle et l'identité définie dans `brand.md`, l'identité prévaut (voir `playbook.md` section 5 pour l'échelle d'arbitrage complète).

## 15. UX

- [ ] La modification sert la philosophie « rassurer, démontrer, créer le désir » — jamais « vendre » au sens agressif (`ux.md` section 1).
- [ ] Un seul CTA primaire visible par écran ; aucune surcharge informationnelle.
- [ ] Aucune des erreurs UX interdites (`ux.md` section 14) — popup, carrousel automatique, dark pattern, fausse urgence, clic surprise.

## 16. Git

- [ ] Commit atomique correspondant à une seule intention logique.
- [ ] Message conforme à la convention (`git.md` section 4) : type, impératif, anglais, sous 72 caractères.
- [ ] Aucun secret, clé API, fichier généré ou temporaire inclus.
- [ ] Branche nommée `type/description-courte`, créée depuis `main` à jour ; aucun commit direct sur `main` sans PR (sauf autorisation explicite).

## 17. QA / Validation finale

- [ ] Protocole de validation complet exécuté (`testing.md` section 11) : build, lint/type-check, visuel multi-breakpoint, fonctionnel, accessibilité, performance, non-régression.
- [ ] Tout point d'usage d'un composant/module modifié a été revérifié, pas seulement celui qui a motivé la modification.
- [ ] Aucune régression connue et non corrigée n'est livrée, quelle que soit la pression de délai.
- [ ] En cas de doute persistant sur une décision (créative, technique, ou de priorité), la question a été posée plutôt que tranchée arbitrairement.
