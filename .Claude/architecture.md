# REMOLUX — Guide Officiel de l'Architecture Logicielle

> Ce document est la référence absolue de toute décision de développement sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md) (vision, mission, ADN de marque), [`rules.md`](./rules.md) (règles techniques strictes), [`design.md`](./design.md) (direction artistique), [`ux.md`](./ux.md) (expérience utilisateur) et [`motion.md`](./motion.md) (motion design).
> La qualité de l'architecture prime toujours sur la rapidité d'implémentation. Un raccourci qui fait gagner dix minutes aujourd'hui et coûte deux heures de compréhension dans six mois n'est jamais un bon compromis sur ce projet.

---

# 1. Philosophie de l'architecture

L'architecture de REMOLUX repose sur un principe simple : **le meilleur code est celui qu'on comprend dans deux ans**, y compris par quelqu'un qui n'a jamais travaillé sur ce projet.

## Code simple

La solution la plus simple qui répond correctement au besoin est toujours préférable. La simplicité n'est pas un manque d'ambition technique — c'est une discipline qui protège le projet de sa propre complexité future. Un code simple aujourd'hui est un code qui peut encore évoluer demain.

## Code lisible

Le code est écrit pour être lu bien plus souvent qu'il n'est écrit. Un nom de variable explicite, une fonction courte et bien nommée, une structure de fichier prévisible valent toujours mieux qu'une astuce clevère qui économise trois lignes mais demande cinq minutes de reconstruction mentale à chaque lecture.

## Code prévisible

Deux développeurs confrontés au même problème dans ce projet doivent arriver à des solutions structurellement similaires, parce que les conventions et les patterns du projet sont clairs, cohérents et appliqués sans exception. La prévisibilité réduit la charge cognitive de toute l'équipe.

## Code testable

Même en l'absence d'une suite de tests automatisés complète dès le départ, chaque module doit être conçu comme s'il allait être testé : fonctions pures quand c'est possible, effets de bord isolés et explicites, dépendances injectées plutôt qu'implicites. Un code difficile à tester est presque toujours un code mal architecturé.

## Code évolutif

REMOLUX est un projet de marque vivant : nouvelles sections, nouveaux produits, nouvelles campagnes viendront s'ajouter dans le temps. L'architecture doit absorber cette croissance sans réécriture majeure — ce qui signifie des interfaces stables, des responsabilités bien séparées, et l'absence de couplage inutile entre les couches (contenu, présentation, animation, 3D).

**Principe d'arbitrage permanent** : à chaque décision technique, la question n'est jamais "est-ce que ça marche ?" mais *"est-ce que ça reste compréhensible, maintenable et cohérent dans deux ans, pour quelqu'un qui découvre ce projet ?"*

---

# 2. Hiérarchie du projet

L'organisation des dossiers doit rester strictement prévisible. Chaque type de fichier a un seul emplacement légitime — jamais deux façons différentes de ranger la même chose.

```
src/
├── pages/          → routes du site (fichiers .astro correspondant aux URLs)
├── layouts/        → structures de page réutilisables (squelette HTML commun)
├── components/     → composants UI atomiques et réutilisables
├── sections/       → assemblages de composants formant une section de page
├── features/       → logique fonctionnelle transverse regroupée par domaine
├── lib/            → logique métier et intégrations (clients, configuration, constantes de domaine)
├── utils/          → fonctions utilitaires pures, génériques, sans état
├── hooks/          → logique réutilisable liée au cycle de vie ou à l'état (client-side)
├── types/          → définitions TypeScript partagées (interfaces, types globaux)
├── assets/         → médias sources (images, modèles 3D, vidéos) à traiter par le pipeline de build
├── styles/         → design tokens CSS globaux, styles de base, resets
└── animations/     → logique GSAP/Lenis isolée (voir section 9)

public/             → fichiers statiques servis tels quels (favicon, robots.txt, sitemap, fonts si non processées)
```

## Rôle précis de chaque dossier

### `pages/`
Contient exclusivement les fichiers qui définissent des routes. Une page assemble des `layouts/` et des `sections/` — elle ne doit **jamais** contenir de logique métier, de style complexe ou d'animation directe. Une page se lit comme un sommaire.

### `layouts/`
Structures de page communes (squelette HTML, `<head>`, navigation globale, footer). Un layout ne connaît jamais le contenu spécifique d'une page — il expose des slots/`<slot />` que la page vient remplir.

### `components/`
Briques UI atomiques et génériques (bouton, carte, icône, champ, badge). Un composant de ce dossier ne doit jamais connaître le contexte métier dans lequel il est utilisé — il doit pouvoir être déplacé sur n'importe quel projet Astro sans modification. Voir section 3 pour la philosophie de composition.

### `sections/`
Assemblages de composants formant une section complète de page (Hero, Problème, Fonctionnement, Preuves, Avis, CTA). Une section connaît le contenu et le contexte métier ; elle orchestre des composants de `components/` sans en redéfinir le style interne.

### `features/`
Regroupe la logique fonctionnelle transverse par domaine métier quand elle dépasse la portée d'un simple composant (ex. un système de galerie produit avec son état, ses composants et sa logique dédiée). Un `feature` est un module autonome : il expose une interface claire et cache son fonctionnement interne.

### `lib/`
Logique métier, configuration, constantes de domaine, clients d'intégration externe (ex. configuration Amazon, constantes de marque). Ne contient jamais de composant UI.

### `utils/`
Fonctions utilitaires pures et génériques, sans état, sans effet de bord, réutilisables indépendamment du domaine métier (formatage, calculs, helpers génériques). Si une fonction utilitaire devient spécifique au métier REMOLUX, elle appartient à `lib/`, pas à `utils/`.

### `hooks/`
Logique réutilisable côté client liée à un cycle de vie ou à un état (ex. détection de viewport, gestion d'intersection observer, état de scroll). Réservé aux comportements transverses utilisés par plusieurs composants.

### `types/`
Définitions TypeScript partagées entre plusieurs modules (interfaces de contenu, types de domaine). Un type utilisé dans un seul fichier reste local à ce fichier — il ne migre vers `types/` que lorsqu'il est réellement partagé.

### `assets/`
Médias sources destinés à être traités par le pipeline de build Astro (optimisation d'image, compression). Jamais de médias déjà pré-optimisés à la main en dehors de ce pipeline sans raison.

### `styles/`
Design tokens globaux (couleurs, typographie, espacements, easings — cohérents avec `design.md`), styles de base et resets. Aucun style spécifique à un composant ne doit s'y trouver — les styles de composants restent colocalisés avec leur composant.

### `animations/`
Toute la logique GSAP et Lenis isolée du markup (voir section 9 et `motion.md`). Aucune timeline complexe ne doit être écrite inline dans un composant.

### `public/`
Fichiers strictement statiques, non traités par le pipeline de build (favicon, `robots.txt`, `sitemap.xml`). Rien qui bénéficierait d'une optimisation automatique ne doit s'y trouver.

**Règle stricte** : avant de créer un fichier, toujours se demander à quel dossier il appartient selon cette hiérarchie. Un fichier "qui ne sait pas où aller" est le signe d'une responsabilité mal définie — clarifier cette responsabilité avant de choisir un emplacement par défaut.

---

# 3. Philosophie des composants

## Atomic Design (adapté)

REMOLUX s'inspire de la logique Atomic Design sans en appliquer la terminologie stricte : des éléments simples et génériques (`components/`) s'assemblent en compositions contextuelles (`sections/`), elles-mêmes assemblées en pages (`pages/`). Chaque niveau ne connaît que le niveau immédiatement inférieur — jamais de saut de couche (une page ne manipule jamais directement un détail d'implémentation d'un composant atomique).

## Composition

Toujours préférer la composition à l'héritage ou à la duplication. Un composant complexe se construit en assemblant des composants simples, jamais en dupliquant leur code avec des variations.

## Réutilisation

Un composant dans `components/` doit être réutilisable par construction : aucune donnée métier codée en dur, aucune dépendance à un contexte de page spécifique. S'il ne peut pas être réutilisé ailleurs sans modification, il n'a probablement pas sa place dans `components/` mais dans `sections/` ou `features/`.

## Responsabilités

Un composant = une responsabilité unique et clairement nommée (principe de responsabilité unique appliqué au front-end). Si le nom d'un composant nécessite un "et" pour être décrit ("CardEtBouton"), c'est le signe qu'il doit être scindé.

## Découpage

Découper un composant dès qu'il gère plusieurs préoccupations indépendantes (affichage + logique de données + animation complexe), mais ne jamais découper prématurément un composant simple en sous-composants artificiels sans bénéfice réel de réutilisation ou de lisibilité.

## Props

- Les props doivent être typées explicitement, avec des noms clairs qui décrivent leur rôle, pas leur type technique (`variant`, pas `styleType`).
- Limiter le nombre de props d'un composant : au-delà de 5-6 props, envisager un objet de configuration typé ou un découpage du composant.
- Toujours définir des valeurs par défaut sensées quand c'est pertinent, pour limiter la configuration obligatoire côté appelant.
- Aucune prop booléenne en cascade (`isLarge`, `isPrimary`, `isDanger`) quand un type union explicite (`variant: "primary" | "secondary"`) est possible — les unions sont plus lisibles et plus sûres.

## Slots / Children

Utiliser les slots (`<slot />` en Astro) pour tout contenu dont la structure interne appartient à l'appelant plutôt qu'au composant (ex. contenu riche d'une carte). Un composant qui accepte un slot ne doit jamais chercher à interpréter ou transformer ce contenu — il ne fournit que le conteneur et son comportement.

## Règles strictes

1. Un composant ne connaît jamais son parent — la communication descend par props, jamais l'inverse.
2. Un composant ne modifie jamais un état en dehors de sa propre responsabilité (pas de mutation globale cachée).
3. Un composant visuel ne contient jamais de logique métier (appel de données, règles business) — cette logique appartient à `lib/` ou `features/` et est injectée en props.
4. Le nom d'un composant doit toujours refléter son rôle générique (`Button`, `Card`, `Badge`), jamais son usage contextuel (`HeroButton`, `ProductCard` reste acceptable seulement si la spécialisation est réelle et durable, pas une commodité de nommage).
5. Un composant qui n'est utilisé qu'à un seul endroit et qui n'a aucune vocation à être réutilisé peut rester directement dans la section qui l'utilise plutôt que d'être remonté artificiellement dans `components/`.

---

# 4. Gestion des composants

Une méthode claire pour décider quand agir sur un composant :

## Quand créer un composant

- Dès qu'un même motif visuel ou fonctionnel apparaît (ou est prévu d'apparaître) à plus d'un endroit du site.
- Dès qu'un bloc de markup dépasse une taille qui nuit à la lisibilité du fichier parent, même s'il n'est utilisé qu'une fois — dans ce cas il peut être extrait localement sans remonter dans `components/`.
- Dès qu'une responsabilité UI distincte peut être isolée et nommée clairement.

## Quand réutiliser

Avant de créer quoi que ce soit, toujours vérifier l'existant (`components/`, `sections/`) pour un composant qui remplit déjà (ou presque) le besoin. Réutiliser avec une prop supplémentaire est toujours préférable à dupliquer avec une légère variation.

## Quand fusionner

Lorsque deux composants distincts finissent par partager 80% ou plus de leur structure et de leur comportement, les fusionner en un seul composant paramétrable plutôt que de maintenir deux variantes quasi identiques.

## Quand supprimer

Un composant qui n'est plus référencé nulle part dans le projet doit être supprimé, jamais laissé "au cas où". Vérifier les références avant suppression (voir `rules.md` — ne jamais supprimer sans justification, la justification ici est l'absence totale d'usage).

## Quand découper

Lorsqu'un composant gère visiblement plusieurs responsabilités distinctes (affichage + état + animation + logique de données), ou lorsqu'il devient difficile de nommer clairement ce qu'il fait en une phrase courte.

**Méthode de décision rapide** : avant toute action sur un composant, répondre à trois questions — *Existe-t-il déjà quelque chose de similaire ? Ce composant a-t-il une seule responsabilité claire ? Ce composant reste-t-il utilisé quelque part ?* Les réponses déterminent directement s'il faut créer, réutiliser, fusionner, découper ou supprimer.

---

# 5. Gestion des états

## State local

Privilégier systématiquement l'état local (au composant ou à la section) tant que la donnée n'a pas besoin d'être partagée ailleurs. L'état local est le niveau par défaut — tout niveau supérieur doit être justifié.

## Props

Le partage d'état entre un parent et ses enfants directs se fait par props descendantes. Jamais de contournement (état global) pour éviter un simple passage de props sur un ou deux niveaux.

## Context

Un contexte partagé n'est introduit que lorsque plusieurs composants non directement liés par une relation parent-enfant simple ont besoin de la même donnée, et que le passage de props deviendrait excessivement profond (prop drilling réel, pas hypothétique).

## Stores

Un store global (si nécessaire) reste réservé à un état véritablement transverse à l'application entière (ex. état de chargement du 3D, préférence `prefers-reduced-motion` calculée). Il ne doit jamais devenir un fourre-tout où atterrit "par facilité" un état qui pourrait rester local.

## Éviter les états globaux inutiles

Le réflexe par défaut ne doit jamais être la création d'un store. Un état global mal justifié introduit du couplage invisible et complique la traçabilité du flux de données. Chaque état global doit pouvoir être justifié par une phrase claire : *"cet état doit être global parce que ces deux composants n'ont aucune relation hiérarchique directe et ont pourtant besoin de la même valeur en temps réel."*

## Prévisibilité

Le flux de données doit toujours pouvoir être retracé sans ambiguïté : d'où vient cette valeur, qui peut la modifier, quand est-elle mise à jour. Un état modifié depuis plusieurs endroits non coordonnés est une source de bug garantie.

## Simplicité

Le nombre total de sources de vérité doit rester minimal. Une même information ne doit jamais être dupliquée dans deux états différents qui pourraient diverger — dériver une valeur à partir d'un état existant plutôt que de la dupliquer.

---

# 6. Architecture Astro

Astro est le socle du projet. La règle générale est : **rendre statique par défaut, hydrater seulement ce qui doit réellement être interactif**.

## SSG (Static Site Generation) — mode par défaut

REMOLUX est un site de marque au contenu majoritairement stable. Le SSG (génération statique au build) est le mode par défaut absolu pour toutes les pages. Il garantit la performance maximale, la meilleure indexation SEO, et la plus grande robustesse (rien ne peut "casser" au runtime sur une page statique).

## SSR (Server-Side Rendering)

Le SSR n'est envisagé que pour un besoin réel de contenu dynamique dépendant de la requête (personnalisation, donnée temps réel non pré-calculable). En l'état de la mission du site (vitrine de marque, redirection Amazon), aucun besoin de SSR n'est anticipé — son introduction doit être validée explicitement avant tout usage, car elle change fondamentalement le modèle de déploiement et de cache du site.

## Islands Architecture

Astro fonctionne par îlots : chaque composant interactif est une île isolée, hydratée indépendamment du reste de la page qui reste, elle, statique. C'est le modèle mental central du projet — **la page est un document, les îles sont des exceptions interactives justifiées**.

## Hydration — stratégies et quand les utiliser

- `client:load` — réservé aux éléments interactifs critiques visibles immédiatement au chargement et nécessaires dès la première interaction possible (ex. un élément de navigation interactif complexe). À utiliser avec parcimonie : chaque usage retarde le temps interactif global.
- `client:idle` — pour les éléments interactifs non critiques qui peuvent s'hydrater une fois le thread principal libéré (ex. widgets secondaires). Bon compromis par défaut pour l'interactivité non essentielle au-dessus de la ligne de flottaison.
- `client:visible` — **stratégie par défaut recommandée** pour tout composant interactif ou animé situé plus bas dans la page (sections au scroll, scènes 3D, animations déclenchées à l'entrée dans le viewport). Elle aligne parfaitement l'hydratation avec le moment réel où l'utilisateur atteint l'élément.
- `client:media` — pour un composant dont l'interactivité ne concerne qu'un breakpoint donné (ex. un menu mobile qui n'a pas besoin d'hydratation sur desktop).
- `client:only` — à éviter par défaut : ce mode retire tout rendu serveur, donc tout bénéfice SSG pour ce composant. Réservé aux cas où un rendu serveur est structurellement impossible (dépendance stricte à une API navigateur comme `window` dès le rendu initial, ex. certaines scènes Three.js).

**Règle absolue** : ne jamais hydrater "par défaut" ou "par sécurité". Chaque directive `client:*` doit être un choix conscient et justifiable.

## Server Components (composants Astro purs)

La très grande majorité des composants du projet doivent rester des composants Astro purs, sans script client, sans hydratation. C'est le mode le plus performant, le plus simple, et il doit rester la norme écrasante du projet — les îles interactives sont l'exception, pas la règle.

## Client Components (frameworks UI, si utilisés)

Si un framework UI (React, Vue, Svelte...) est introduit pour un besoin spécifique d'interactivité complexe, il doit rester strictement circonscrit au composant qui en a réellement besoin, jamais étendu à des composants qui pourraient rester en Astro pur. L'introduction d'un tel framework est une décision de dépendance majeure — voir section 12.

## Récapitulatif de décision

| Besoin | Stratégie |
|---|---|
| Contenu statique, sans interactivité | Composant Astro pur, aucune hydratation |
| Interaction critique visible immédiatement | `client:load`, usage minimal |
| Interaction secondaire au-dessus de la ligne de flottaison | `client:idle` |
| Interaction ou animation plus bas dans la page (scroll) | `client:visible` (par défaut recommandé) |
| Interactivité dépendante d'un breakpoint | `client:media` |
| Dépendance stricte à une API navigateur dès le rendu | `client:only` (exceptionnel) |
| Contenu dynamique dépendant de la requête | SSR (validation explicite requise) |

---

# 7. TypeScript

## Types et interfaces

- Utiliser `interface` pour toute forme d'objet extensible ou représentant une entité de domaine (props de composant, modèle de contenu).
- Utiliser `type` pour les unions, intersections, alias de types primitifs ou de fonctions.
- Ne jamais mélanger arbitrairement les deux pour la même catégorie d'usage dans le projet — cohérence stricte.

## Génériques

Utiliser des génériques uniquement lorsqu'ils apportent une réutilisabilité réelle et clarifient l'intention (ex. une fonction utilitaire générique de tri ou de filtrage). Ne jamais introduire un générique pour un cas d'usage unique — c'est de la complexité gratuite.

## Readonly

Marquer `readonly` toute donnée qui ne doit jamais être mutée après sa création (props de composants, constantes de configuration, résultats de transformation). Cela rend les intentions explicites et prévient des mutations accidentelles.

## Strict mode

Le `strict mode` TypeScript est obligatoire et non négociable sur l'ensemble du projet (cohérent avec `rules.md`). Aucune configuration ne doit l'assouplir, même localement.

## Éviter `any`

`any` est interdit sauf cas exceptionnel documenté (intégration d'une librairie tierce non typée, avec commentaire expliquant pourquoi). Préférer systématiquement `unknown` associé à un narrowing explicite, qui force une vérification avant usage.

## Naming

- Types et interfaces en `PascalCase` (`ProductFeature`, `HeroContent`).
- Variables et fonctions en `camelCase`.
- Constantes véritablement globales et immuables en `SCREAMING_SNAKE_CASE` (rare, réservé aux valeurs de configuration racine).
- Les noms doivent décrire le rôle métier, jamais la structure technique (`heroContent`, pas `dataObject1`).

## Organisation

- Un type utilisé dans un seul fichier reste défini localement dans ce fichier.
- Un type partagé entre plusieurs modules migre vers `types/`, organisé par domaine (ex. `types/content.ts`, `types/product.ts`) plutôt que dans un fichier unique fourre-tout.
- Les types dérivés (ex. `Pick`, `Omit`, `Partial`) sont préférés à la duplication manuelle d'un type existant légèrement modifié.

---

# 8. CSS

## Architecture CSS

CSS natif moderne exclusivement (cohérent avec `rules.md` et `design.md`) : custom properties, nesting, `clamp()`, container queries. Aucun framework CSS lourd non déjà présent dans le projet.

## Tokens et variables

Tous les design tokens (couleurs, typographie, espacements, rayons, ombres, easings) sont définis une seule fois, centralisés dans `styles/`, sous forme de custom properties CSS. Aucune valeur brute ("magic value") ne doit apparaître dans un composant si un token équivalent existe.

```css
:root {
  /* Couleurs */
  --color-bg-dark: #0a0a0c;
  --color-bg-light: #fafaf9;
  --color-accent-red: #c8102e;
  --color-accent-led: #eaf4ff;

  /* Typographie */
  --font-display: /* ... */;
  --font-body: /* ... */;

  /* Échelle d'espacement */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;

  /* Easings (cohérents avec motion.md) */
  --ease-out-standard: cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Organisation

- Styles globaux et resets dans `styles/` uniquement.
- Styles spécifiques à un composant colocalisés avec ce composant (dans le fichier `.astro` via `<style>` scoping natif d'Astro), jamais dispersés dans un fichier CSS global partagé.
- Aucune duplication de règle entre plusieurs composants : si une règle se répète, elle devient un token ou une classe utilitaire partagée.

## Responsive / Mobile first

Toutes les règles CSS partent du mobile ; les media queries étendent progressivement vers tablette puis desktop (`min-width`), jamais l'inverse (`max-width` en cascade descendante à éviter comme approche par défaut).

## Conventions et nommage

- Classes utilitaires ou de composants nommées de façon descriptive du rôle, pas de la valeur visuelle (`.card--elevated`, pas `.shadow-big`).
- Convention BEM-like légère pour les composants complexes si nécessaire (`.card`, `.card__title`, `.card--featured`), appliquée avec cohérence sur tout le projet.
- Pas de sélecteurs trop imbriqués (maximum 2-3 niveaux de nesting) — au-delà, c'est un signe de composant mal découpé.

---

# 9. GSAP

## Organisation

Toute la logique GSAP est isolée dans `src/animations/`, structurée par domaine ou par section (`animations/hero.ts`, `animations/scrollReveal.ts`) — jamais écrite inline dans le markup d'un composant Astro au-delà d'un simple point d'attache.

## Timelines

Les timelines complexes (plusieurs étapes séquencées) sont construites dans des fonctions dédiées, retournant la timeline pour permettre son contrôle (pause, kill) par l'appelant. Une timeline ne doit jamais être créée sans être rattachée à un cycle de vie clair (création à l'entrée du composant, nettoyage à la sortie).

## Hooks / points d'intégration

Un point d'intégration standard (fonction d'initialisation appelée au montage du composant hydraté) crée les animations et retourne une fonction de nettoyage. Ce pattern doit être identique sur tout le projet pour rester prévisible.

## Cleanup

Toute instance GSAP (timeline, tween, ScrollTrigger) doit être détruite explicitement au démontage du composant ou changement de contexte (`gsap.context()` recommandé pour scoper et nettoyer automatiquement un ensemble d'animations liées à un composant). Aucune exception — les fuites mémoire GSAP ne sont pas tolérées (cohérent avec `rules.md`).

## ScrollTrigger

Chaque `ScrollTrigger` est créé avec des bornes (`start`/`end`) explicites et documentées si non triviales, et systématiquement associé à une instance nettoyable. Éviter les triggers redondants sur un même élément — vérifier l'existant avant d'en ajouter un nouveau.

## Plugins

Seuls les plugins GSAP réellement nécessaires sont importés (import ciblé, jamais le bundle complet). Chaque nouveau plugin est une décision de dépendance à justifier (voir section 12).

## Performance

Animer prioritairement `transform` et `opacity` (propriétés compositées, peu coûteuses) — jamais des propriétés qui déclenchent un reflow layout (`width`, `top`, `left` en boucle) sauf nécessité absolue.

## Réutilisation

Les patterns d'animation récurrents (fade-in au scroll, reveal de texte, hover de carte) sont factorisés en fonctions réutilisables paramétrables, jamais réécrits à chaque nouvelle section.

Voir [`motion.md`](./motion.md) pour la philosophie complète du mouvement, les timings et les easings.

---

# 10. Three.js

## Organisation

Toute la logique Three.js est isolée dans `src/animations/` ou un dossier dédié (`src/three/`), structurée par scène (`three/productScene.ts`) — jamais mélangée à la logique de composant UI.

## Scènes

Chaque scène est encapsulée dans un module autonome exposant une interface claire : initialisation, méthode de rendu/update, méthode de nettoyage (`dispose`). Une scène ne doit jamais dépendre d'un état global non explicite.

## Caméras

Une seule caméra active par scène, avec des paramètres (FOV, near/far plane) documentés si non standards. Les mouvements de caméra restent lents et maîtrisés (cohérent avec `motion.md`).

## Lumières

Configuration de lumière cohérente avec la palette définie dans `design.md` (tons froids, halos LED). Nombre de lumières limité au strict nécessaire pour préserver la performance.

## Chargement (GLTF)

Les modèles sont chargés via `GLTFLoader` avec compression (Draco/Meshopt selon le pipeline disponible), toujours de façon asynchrone avec gestion explicite de l'état de chargement (placeholder ou fallback pendant le chargement, jamais d'écran vide).

## Textures

Textures compressées et dimensionnées au plus juste du besoin d'affichage réel (pas de texture 4K pour un élément affiché en 200px). Réutilisation des textures partagées entre objets plutôt que duplication en mémoire.

## Cleanup

Toute géométrie, matériau, texture et le renderer lui-même doivent être explicitement disposés (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`, `renderer.dispose()`) au démontage de la scène — sans exception (cohérent avec `rules.md`).

## Fallback

Chaque scène 3D prévoit une dégradation gracieuse (image statique haute qualité) pour les appareils bas de gamme, les navigateurs sans support WebGL suffisant, ou en cas d'échec de chargement — jamais d'écran cassé ou vide en cas de problème.

---

# 11. Performance

Philosophie **Performance First** : la performance n'est pas une optimisation de fin de projet, c'est un critère de décision à chaque étape du développement (cohérent avec l'objectif Lighthouse 95+ de `CLAUDE.md`).

## Lazy loading

Toute ressource non nécessaire au premier rendu (images sous la ligne de flottaison, scènes 3D, sections animées plus bas dans la page) est chargée paresseusement, via les mécanismes natifs (`loading="lazy"`) ou les stratégies d'hydratation Astro (`client:visible`).

## Code splitting / Dynamic import

Le code JavaScript spécifique à une section ou une interaction non critique est chargé dynamiquement (`import()`), jamais bundlé systématiquement dans le chemin critique de chargement de la page.

## Tree shaking

Toujours importer de façon nommée et ciblée depuis les librairies (ex. `import { gsap } from "gsap"` plutôt qu'un import global), pour permettre au bundler d'éliminer le code mort inutilisé.

## Bundle

Surveiller la taille du bundle à chaque ajout de dépendance ou de fonctionnalité. Toute augmentation significative doit être justifiée par un bénéfice utilisateur réel et mesurable.

## Images

Formats modernes systématiques (WebP/AVIF), dimensionnement exact au besoin d'affichage, `width`/`height` explicites pour éviter le CLS, traitement via le pipeline d'optimisation d'Astro plutôt que des assets pré-exportés à la main.

## Fonts

Sous-ensemble de caractères (subsetting), `font-display: swap`, préchargement uniquement des polices critiques utilisées au-dessus de la ligne de flottaison.

## Préchargement

Précharger uniquement les ressources critiques du premier rendu (police principale, image hero). Ne jamais précharger des ressources qui ne sont pas garanties d'être utilisées immédiatement — le préchargement excessif nuit autant que l'absence de préchargement.

## Cache

Stratégie de cache HTTP appropriée pour les assets statiques (immutables, hashés) versus le HTML (revalidation courte). Cohérent avec le mode de déploiement statique (SSG) du site.

---

# 12. Gestion des dépendances

## Quand ajouter une dépendance

Une dépendance n'est ajoutée que si elle répond à un besoin réel et actuel, non raisonnablement réalisable avec la stack existante (Astro, TypeScript, GSAP, Three.js, Lenis, CSS natif) en un temps et une qualité comparables.

## Quand refuser une dépendance

- Si la même fonctionnalité peut être obtenue simplement avec la stack existante.
- Si la librairie est peu maintenue, peu populaire, ou présente un historique de sécurité douteux.
- Si son poids en bundle est disproportionné par rapport au bénéfice apporté.
- Si elle duplique une fonctionnalité déjà couverte par une dépendance existante du projet.

## Comment évaluer une librairie

Avant toute intégration, vérifier systématiquement :

1. **Maintenance** — fréquence des mises à jour, activité récente du dépôt.
2. **Popularité** — adoption réelle par la communauté, signal de fiabilité à long terme.
3. **Sécurité** — absence de vulnérabilités connues non résolues, historique de réactivité aux failles signalées.
4. **Bundle** — poids réel ajouté (vérifié, pas estimé), compatibilité avec le tree shaking.
5. **Typage** — support TypeScript natif ou typages de qualité disponibles (`@types/*`).
6. **Compatibilité Astro** — bon fonctionnement avec le modèle d'îlots et l'hydratation partielle.

## Maintenance dans le temps

Toute dépendance ajoutée devient une responsabilité durable du projet. Elle doit être revue périodiquement (mises à jour, dépréciation éventuelle) — une dépendance qu'on ajoute et qu'on oublie devient une dette technique silencieuse.

**Règle d'or** : dans le doute entre ajouter une dépendance et écrire quelques dizaines de lignes de code simple et maîtrisé avec la stack existante, préférer systématiquement la seconde option.

---

# 13. Refactoring

## Quand refactoriser

- Lorsqu'un pattern se répète trois fois ou plus sans factorisation.
- Lorsqu'un composant ou un module a manifestement grossi au-delà d'une responsabilité unique claire.
- Lorsqu'une modification demandée est rendue anormalement difficile par la structure actuelle du code — c'est le signal que la structure doit être corrigée avant d'ajouter la fonctionnalité.
- Lorsqu'une incohérence de convention est détectée par rapport aux règles de ce document.

## Quand ne pas refactoriser

- Jamais de refactoring hors du périmètre de la tâche demandée sans validation explicite (cohérent avec `rules.md`).
- Jamais de refactoring "esthétique" sans bénéfice réel de lisibilité, maintenabilité ou performance.
- Jamais de réécriture complète d'un module fonctionnel quand une amélioration incrémentale suffit.

## Comment éviter la dette technique

- Corriger les petites incohérences au moment où elles sont rencontrées, plutôt que de les laisser s'accumuler.
- Ne jamais valider une solution "temporaire" sans un plan explicite pour la rendre définitive.
- Documenter systématiquement (commentaire ciblé) tout compromis technique assumé, avec la raison du compromis — pour que sa légitimité (ou son obsolescence) puisse être réévaluée plus tard.
- Traiter tout avertissement de lint, de type-check ou de build comme un signal à corriger immédiatement, jamais à ignorer ou reporter.

---

# 14. Les erreurs interdites

- **Composants géants** — un composant qui dépasse une taille raisonnable de lisibilité doit être découpé (voir section 4). Un fichier qu'on ne peut plus comprendre d'un seul balayage visuel est un fichier mal découpé.
- **Duplication** — tout code dupliqué à l'identique ou quasi-identique à plus de deux endroits doit être factorisé.
- **Magic numbers** — aucune valeur numérique non expliquée dans le code (`if (x > 847)`) ; toujours une constante nommée ou un token.
- **Magic strings** — aucune chaîne de caractères répétée codée en dur (identifiants, clés) ; toujours une constante ou un type union.
- **Code mort** — aucun code non utilisé, aucune fonction ou composant orphelin laissé "au cas où" — supprimer immédiatement (cohérent avec `rules.md`).
- **`console.log` oubliés** — aucun log de debug ne doit être livré ; à retirer systématiquement avant de considérer une tâche terminée.
- **`any`** — interdit sauf exception documentée (voir section 7).
- **Copier-coller** — copier un bloc de code pour l'adapter légèrement est presque toujours le signe qu'une factorisation est nécessaire à la place.
- **Styles inline** — interdits sauf valeur strictement dynamique calculée à l'exécution (voir `rules.md`), jamais comme raccourci de style statique.
- **Imports inutiles** — tout import non utilisé doit être retiré ; ils polluent la lisibilité et parfois le bundle.
- **Logique dupliquée** — une même règle métier ne doit jamais être réimplémentée à deux endroits différents du code ; centraliser dans `lib/` ou `utils/`.
- **Side effects incontrôlés** — aucune fonction supposée pure ne doit produire d'effet de bord caché (mutation d'un objet passé en paramètre, écriture globale) sans que cela soit explicite dans son nom ou sa signature.
- **Fichiers trop gros** — un fichier qui mélange plusieurs responsabilités distinctes doit être scindé selon la hiérarchie du projet (section 2).

---

# 15. Workflow de développement

Workflow obligatoire pour toute tâche de développement sur REMOLUX :

1. **Analyse** — comprendre précisément l'objectif réel de la demande à la lumière de la mission du site (`CLAUDE.md`) avant d'écrire la moindre ligne de code. Identifier les fichiers et modules concernés.
2. **Planification** — déterminer l'approche technique la plus simple et cohérente avec l'architecture existante (sections 2 à 6). Identifier si un composant existant peut être réutilisé, étendu, ou si une nouvelle structure est réellement nécessaire.
3. **Implémentation** — écrire le code en respectant strictement les conventions de ce document (TypeScript, CSS, GSAP, Three.js) et les règles de `rules.md`.
4. **Tests** — vérifier manuellement (et via les tests automatisés existants le cas échéant) que le comportement attendu est atteint, sans régression sur l'existant.
5. **Optimisation** — vérifier l'impact sur la performance (poids ajouté, stratégie d'hydratation, animations) avant de considérer l'implémentation comme définitive.
6. **Review** — relire son propre code à froid en se posant les questions de la section 1 (lisible, prévisible, simple) et vérifier la conformité à la checklist (section 16).
7. **Documentation** — documenter les décisions non évidentes directement dans le code (commentaire ciblé), jamais dans un fichier séparé non demandé.
8. **Git** — commit atomique et clair, cohérent avec les règles Git de `rules.md`.
9. **Validation** — vérifier le build, corriger toute erreur détectée (build, lint, type-check, console), et confronter le résultat à la checklist complète avant de considérer la tâche terminée.

Aucune étape de ce workflow ne doit être sautée, même pour une modification qui semble mineure — c'est précisément sur les modifications "mineures" que la discipline se relâche le plus facilement et que la dette technique s'accumule.

---

# 16. Checklist Architecture

La checklist complète (architecture générale, lisibilité, performance, réutilisation, TypeScript, Astro, GSAP, Three.js, responsive, SEO, accessibilité, Git, validation finale) est centralisée dans [`checklist.md`](./checklist.md) — voir en particulier les sections 1 à 3, 5 à 8 et 16 à 17. Elle ne doit pas être dupliquée ici.
