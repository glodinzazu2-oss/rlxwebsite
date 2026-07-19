# REMOLUX — Guide Officiel SEO

> Ce document est la référence absolue de toute décision liée au référencement sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md), [`architecture.md`](./architecture.md), [`performance.md`](./performance.md), [`three.md`](./three.md) et [`copywriting.md`](./copywriting.md).
> L'objectif n'est pas uniquement d'obtenir un bon classement. L'objectif est de construire un site parfaitement compréhensible pour Google, Bing, les IA génératives et les moteurs de recherche modernes — un site dont la structure, le contenu et le code communiquent sans ambiguïté ce qu'il est, à qui il s'adresse, et pourquoi il fait autorité.

---

# 1. Philosophie SEO

## Pourquoi le SEO commence dès la conception

Le SEO n'est jamais une couche ajoutée après coup sur un site déjà construit — c'est une contrainte structurante qui doit influencer l'architecture de l'information, le nommage des routes, la hiérarchie des titres et l'organisation du contenu dès les premières décisions du projet. Un site pensé sans SEO dès la conception accumule une dette de restructuration coûteuse (URLs à changer, hiérarchie de titres à refondre) qui est presque toujours plus chère à corriger après coup qu'à bien faire dès le départ.

## Pourquoi une bonne UX améliore le SEO

Les moteurs de recherche modernes, au premier rang desquels Google, mesurent directement des signaux d'expérience utilisateur (Core Web Vitals, taux de rebond, temps passé, clarté de navigation) pour évaluer la qualité d'une page. Un site qui suit rigoureusement les principes définis dans `ux.md` (clarté, absence de friction, hiérarchie de l'information limpide) produit mécaniquement des signaux positifs pour le référencement — le SEO et l'UX ne sont jamais en opposition sur ce projet, ils sont la même discipline vue sous deux angles.

## Pourquoi la performance est du SEO

Les Core Web Vitals (LCP, CLS, INP — voir `performance.md`) sont des facteurs de classement explicites chez Google. Un site lent n'est jamais un site bien référencé, quelle que soit la qualité de son contenu. Chaque optimisation de performance décrite dans `performance.md` est donc directement une optimisation SEO — les deux documents doivent toujours être appliqués en cohérence l'un avec l'autre.

## Une philosophie complète

Le SEO de REMOLUX repose sur un principe simple : **rendre à Google, à Bing et aux IA génératives exactement ce qu'un humain comprendrait en lisant la page** — une structure claire, un contenu honnête et précis (cohérent avec `copywriting.md`), une hiérarchie d'information logique, et un code technique qui ne cache ni ne complique cette lisibilité. Aucune technique de manipulation ou de sur-optimisation artificielle n'a sa place ici — le meilleur SEO est la conséquence naturelle d'un site bien construit, pas une couche de tactiques ajoutées en marge.

**Principe d'arbitrage permanent** : à chaque décision technique ou éditoriale, se demander — _"Est-ce que cette décision aide un moteur de recherche (et un humain) à comprendre plus clairement ce qu'est cette page et pourquoi elle mérite d'être trouvée ?"_

---

# 2. Architecture SEO

## Arborescence

Une arborescence peu profonde et logique, reflétant la hiérarchie réelle de l'information (accueil → catégories de produit ou d'usage → pages de détail si nécessaire). Chaque page doit avoir une raison d'exister distincte et non redondante avec une autre page du site.

## URLs

- URLs courtes, lisibles, descriptives, en minuscules, mots séparés par des tirets (`/feux-remorque-magnetiques`, jamais `/page1` ou `/produit_ID_4521`).
- Aucune information technique ou d'implémentation dans l'URL (pas de paramètres de session, d'identifiants internes non nécessaires).
- Les URLs sont stables dans le temps — une URL une fois publiée et indexée n'est jamais modifiée sans mise en place d'une redirection 301 appropriée.

## Navigation

La navigation principale reste minimale (cohérent avec `ux.md` section 5) mais suffisamment explicite pour que sa structure serve aussi de signal de hiérarchie thématique aux moteurs de recherche — chaque lien de navigation doit porter un intitulé clair et descriptif, jamais un intitulé vague ("Découvrir" seul, sans contexte).

## Maillage interne

Chaque page importante du site est reliée par au moins un lien interne contextuel depuis une autre page pertinente, avec un texte d'ancre descriptif (jamais "cliquez ici"). Le maillage interne distribue l'autorité SEO entre les pages et aide les moteurs à comprendre les relations thématiques entre elles.

## Breadcrumbs (fil d'Ariane)

Utilisé si la profondeur de navigation le justifie, avec un balisage de données structurées `BreadcrumbList` associé (voir section 6). Le fil d'Ariane renforce à la fois la compréhension de la hiérarchie par les moteurs de recherche et l'orientation de l'utilisateur (cohérent avec `ux.md`).

## Profondeur des pages

Aucune page importante du site ne doit être accessible à plus de trois clics depuis la page d'accueil. Une profondeur excessive dilue l'autorité SEO transmise à une page et complique sa découverte par les robots d'indexation.

---

# 3. Balises HTML

## `<title>`

Unique pour chaque page, précis, orienté bénéfice utilisateur, incluant si pertinent le nom de la marque en fin de balise (`Feux LED magnétiques sans fil pour remorque — REMOLUX`). Longueur maîtrisée pour éviter la troncature dans les résultats de recherche (environ 50-60 caractères).

## Meta description

Unique pour chaque page, résumant clairement le contenu et la valeur de la page en une à deux phrases (environ 150-160 caractères), rédigée selon les principes de `copywriting.md` (clarté, précision, pas de superlatif creux) — la meta description n'est pas un facteur de classement direct mais influence fortement le taux de clic depuis les résultats de recherche.

## Canonical

Une balise `<link rel="canonical">` explicite sur chaque page, pointant vers l'URL de référence de cette page — indispensable pour éviter tout problème de contenu dupliqué (section 9), en particulier si des paramètres d'URL ou des variantes d'accès existent.

## Robots

Balise `<meta name="robots">` utilisée explicitement lorsque nécessaire (`noindex` pour des pages qui ne doivent pas être indexées, ex. pages légales secondaires si pertinent) — par défaut, toute page de contenu principal reste indexable (`index, follow`) sans restriction.

## Hreflang

Utilisé uniquement si le site propose plusieurs versions linguistiques ou géographiques du même contenu — chaque variante linguistique doit alors référencer explicitement toutes les autres versions disponibles, y compris elle-même (`x-default` inclus si pertinent). Non applicable tant que le site reste monolingue.

## Open Graph

Balises `og:title`, `og:description`, `og:image`, `og:url`, `og:type` définies sur chaque page, avec une image dédiée et de haute qualité (cohérente avec `design.md`) pour garantir un partage soigné sur les réseaux sociaux — jamais une image générique ou par défaut non pensée pour le format de partage social.

## Twitter Cards

Balises `twitter:card` (type `summary_large_image` recommandé), `twitter:title`, `twitter:description`, `twitter:image` définies en cohérence avec les balises Open Graph, pour un rendu soigné lors du partage sur X/Twitter.

## Favicon

Favicon décliné dans les formats et tailles nécessaires (`favicon.ico`, PNG multi-tailles, icône Apple Touch) pour un rendu cohérent sur tous les navigateurs, plateformes et systèmes d'exploitation — cohérent avec l'identité de marque définie dans `design.md`.

## `theme-color`

Meta `theme-color` définie en cohérence avec la palette de marque (`design.md`), pour un rendu cohérent de la barre de navigateur mobile lors de la consultation du site.

---

# 4. Hiérarchie du contenu

## H1

Un seul `<h1>` par page, sans exception, résumant clairement le sujet principal de la page — jamais absent, jamais dupliqué, jamais utilisé pour une simple raison de style visuel plutôt que sémantique.

## H2

Utilisés pour structurer les sections majeures de la page, dans un ordre logique et continu (jamais de saut de niveau, ex. un `<h3>` qui suit directement un `<h1>` sans `<h2>` intermédiaire).

## H3

Utilisés pour les sous-sections à l'intérieur d'une section H2, uniquement lorsque cette sous-hiérarchie a un sens réel de structuration du contenu — jamais utilisés uniquement pour un effet visuel de taille de texte (cohérent avec `design.md`, où la hiérarchie visuelle typographique doit rester distincte de la hiérarchie sémantique HTML si nécessaire, via des classes plutôt que des niveaux de titre incorrects).

## Paragraphes

Contenu textuel réel et significatif dans des balises `<p>` sémantiquement correctes, jamais du texte structuré uniquement en `<div>` ou `<span>` sans balisage sémantique.

## Listes

Utilisation de `<ul>`/`<ol>` pour toute énumération réelle (caractéristiques, étapes) — les moteurs de recherche interprètent correctement cette structure pour en extraire des informations clés (et potentiellement les afficher en résultats enrichis).

## Citations

Les témoignages ou avis clients cités textuellement utilisent la balise sémantique `<blockquote>` (avec attribution via `<cite>` si pertinent) plutôt qu'un simple paragraphe stylé, pour signaler correctement leur nature de citation aux moteurs de recherche.

## `alt`

Chaque image porteuse de sens dispose d'un attribut `alt` descriptif et précis, décrivant le contenu réel de l'image dans son contexte (cohérent avec section 5 et `rules.md` section Accessibilité) — jamais un `alt` vide sur une image de contenu, jamais un `alt` bourré de mots-clés non descriptifs.

## Captions

Les légendes d'image (`<figcaption>` dans un `<figure>`) sont utilisées lorsqu'un contexte ou une explication complémentaire à l'image est nécessaire — apportent un signal contextuel supplémentaire aux moteurs de recherche en plus de l'attribut `alt`.

## Structure idéale d'une page

```
<h1> Sujet principal de la page
  <h2> Section majeure 1
    <h3> Sous-section si nécessaire
  <h2> Section majeure 2
  <h2> Section majeure 3
```

Chaque page suit cette logique de hiérarchie stricte, sans exception, cohérente avec la structure narrative définie dans `copywriting.md` section 4.

---

# 5. Images SEO

## Nommage

Noms de fichiers descriptifs et lisibles, en minuscules, mots séparés par des tirets (`feu-led-magnetique-remorque-nuit.avif`), jamais de noms génériques issus directement d'un appareil photo ou d'un export (`IMG_4521.jpg`).

## Alt

Attribut `alt` descriptif, précis, écrit pour un humain autant que pour un moteur de recherche, jamais une liste de mots-clés juxtaposés (cohérent avec section 4 et `rules.md`).

## Compression

Toute image compressée au maximum sans perte de qualité perceptible, via le pipeline d'optimisation d'Astro (cohérent avec `performance.md` section 4) — le poids d'une image impacte directement la performance, donc indirectement le SEO.

## Dimensions

`width`/`height` explicites sur chaque image pour éviter tout Cumulative Layout Shift, facteur de classement direct via les Core Web Vitals (cohérent avec `performance.md`).

## Lazy loading

`loading="lazy"` sur les images sous la ligne de flottaison, sans exception, pour préserver la vitesse de chargement perçue et réelle du premier écran.

## Formats

AVIF en priorité, WebP en repli, cohérent avec `performance.md` section 4 — les moteurs de recherche modernes indexent correctement ces formats, aucune perte d'indexabilité à attendre de leur usage.

## Sitemap d'images

Si le volume d'images le justifie, une extension du sitemap XML dédiée aux images peut être envisagée pour améliorer leur découverte via la recherche d'images — à évaluer selon le volume réel de contenu visuel du site.

---

# 6. Données structurées

Les données structurées (JSON-LD, format recommandé et exclusif pour ce projet) permettent aux moteurs de recherche et aux IA génératives de comprendre sans ambiguïté la nature exacte de chaque contenu, indépendamment de son affichage visuel.

## Organization

Décrit l'entité REMOLUX elle-même (nom, logo, réseaux sociaux, contact) — implémentée une fois, globalement, sur les pages principales du site (a minima la page d'accueil).

## Product

Décrit chaque produit REMOLUX présenté (nom, description, image, marque) — utilisé avec prudence concernant les propriétés `offers`/`price`/`availability` puisque le site ne vend pas directement : si ces propriétés sont incluses, elles doivent rester rigoureusement exactes et cohérentes avec la réalité de la redirection vers Amazon, jamais présentées de façon trompeuse.

## FAQ

Le schema `FAQPage` est utilisé uniquement si une véritable section de questions-réponses existe sur la page, avec des questions et réponses réelles et utiles — jamais un schema FAQ ajouté artificiellement dans le seul but d'obtenir un résultat enrichi, ce qui constitue une pratique trompeuse à proscrire.

## Breadcrumb

Le schema `BreadcrumbList` accompagne tout fil d'Ariane visuellement présent sur la page (section 2), reflétant fidèlement la hiérarchie de navigation réelle.

## WebSite / SearchAction

Le schema `WebSite` (avec `SearchAction` si une fonction de recherche interne existe) est implémenté sur la page d'accueil pour faciliter la compréhension globale du site par les moteurs de recherche et potentiellement activer une sitelinks searchbox.

## Article

Utilisé uniquement si le site propose du contenu éditorial de type article ou actualité (ex. un futur blog de marque) — non applicable aux pages de présentation produit classiques.

## Review

Utilisé uniquement si de véritables avis clients vérifiés sont affichés sur le site, avec des données exactes (note, auteur, date) — jamais de note ou d'avis fictif ou approximé, ce qui constituerait une pratique trompeuse sanctionnable par les moteurs de recherche.

## Quand utiliser chaque schema — synthèse

| Contexte                            | Schema                                            |
| ----------------------------------- | ------------------------------------------------- |
| Toute page principale du site       | `Organization`                                    |
| Page d'accueil                      | `WebSite` (+ `SearchAction` si recherche interne) |
| Page présentant un produit          | `Product`                                         |
| Section FAQ réelle                  | `FAQPage`                                         |
| Navigation avec fil d'Ariane        | `BreadcrumbList`                                  |
| Contenu éditorial (blog, actualité) | `Article`                                         |
| Avis clients vérifiés affichés      | `Review` / `AggregateRating`                      |

**Règle absolue** : aucune donnée structurée n'est implémentée si elle ne correspond pas exactement et honnêtement au contenu réellement visible par l'utilisateur sur la page — toute donnée structurée trompeuse expose le site à une pénalité de la part des moteurs de recherche.

---

# 7. Astro SEO

## SSG

Le rendu statique par défaut d'Astro (cohérent avec `architecture.md` et `performance.md`) est en soi un atout SEO majeur : contenu immédiatement présent dans le HTML servi, sans dépendance à l'exécution de JavaScript côté client pour être indexé — aucune ambiguïté d'indexation possible, contrairement à un rendu purement client-side.

## Sitemap

Un `sitemap.xml` généré automatiquement au build (via l'intégration officielle Astro dédiée), incluant toutes les pages indexables du site avec leur date de dernière modification, soumis à la Search Console de Google et aux Webmaster Tools de Bing.

## `robots.txt`

Un fichier `robots.txt` explicite à la racine du site, autorisant l'indexation des pages de contenu principal, excluant explicitement les éventuelles routes techniques ou non pertinentes pour l'indexation (ex. routes d'API internes s'il en existe), et référençant l'emplacement du sitemap.

## Canonical

Chaque page générée par Astro définit sa propre balise canonical (section 3), calculée de façon cohérente et automatique à partir de la structure de routing du site plutôt que codée en dur à chaque page, pour éviter toute erreur de copier-coller entre pages.

## Routing

La structure de fichiers `src/pages/` d'Astro reflète directement l'arborescence d'URL du site (cohérent avec section 2) — chaque route doit correspondre à une intention de contenu claire, jamais à une simple commodité technique de développement.

## Pages dynamiques

Si des pages sont générées dynamiquement (ex. à partir d'un jeu de données produits), chacune doit recevoir un title, une meta description et des données structurées uniques et pertinents — jamais un template générique dupliqué sans personnalisation réelle du contenu, ce qui produirait du contenu quasi dupliqué à grande échelle (section 9).

## RSS

Un flux RSS (via l'intégration officielle Astro) est envisagé uniquement si le site propose du contenu éditorial récurrent (ex. un futur blog de marque) — non prioritaire pour la mission actuelle du site (vitrine de marque, redirection Amazon).

---

# 8. SEO moderne

## E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

Les moteurs de recherche modernes évaluent la crédibilité perçue d'un contenu à travers ces quatre dimensions. Pour REMOLUX, cela se traduit par : un contenu qui démontre une réelle expérience et expertise du produit (précision technique, cohérente avec `copywriting.md`), une autorité de marque cohérente (identité visuelle stable, informations d'entreprise claires), et une fiabilité perçue par l'exactitude et l'honnêteté de chaque affirmation (jamais de promesse non prouvée, cohérent avec `copywriting.md` section 7).

## Helpful Content

Google favorise explicitement le contenu créé en priorité pour être utile à un humain, pas pour être optimisé mécaniquement pour un algorithme. Chaque page REMOLUX doit d'abord répondre à une vraie question ou un vrai besoin de l'utilisateur (cohérent avec `ux.md` section 2) — le SEO technique vient renforcer un contenu déjà intrinsèquement utile, jamais compenser un contenu creux ou générique.

## AI Search / Google AI Overviews / recherche conversationnelle

Les moteurs de recherche intègrent de plus en plus des réponses générées par IA directement dans les résultats. Pour être correctement cité ou synthétisé par ces systèmes, le contenu doit être structuré de façon extrêmement claire : réponses directes et complètes aux questions probables de l'utilisateur, formulées en langage naturel, avec un contexte explicite (pas seulement des listes de mots-clés) — cohérent avec la clarté et la précision déjà exigées par `copywriting.md`.

## Bing

Les mêmes principes fondamentaux de qualité, structure et données structurées s'appliquent à Bing, avec une attention supplémentaire portée à l'exactitude et la richesse des données structurées, historiquement bien exploitées par ce moteur.

## LLMs et agents IA

Les modèles de langage qui explorent ou citent des sites web (pour répondre à des requêtes utilisateur en dehors même d'un moteur de recherche traditionnel) bénéficient directement d'un contenu bien structuré sémantiquement (HTML propre, hiérarchie de titres logique, données structurées précises) et d'un contenu textuel autonome et complet par section — une section qui a du sens même extraite isolément de son contexte visuel est mieux comprise et mieux citée par ces systèmes.

## Vision moderne du SEO REMOLUX

Le SEO n'est plus seulement une discipline d'optimisation pour un classement dans une liste de résultats bleus — c'est une discipline de **clarté sémantique universelle**, destinée à être comprise aussi bien par un humain, un robot d'indexation classique, qu'un système d'IA générative. Un site conçu selon les principes de clarté, de structure et d'honnêteté définis dans l'ensemble des documents REMOLUX est, par construction, bien positionné pour cette évolution du référencement.

---

# 9. Erreurs interdites

- **Duplicate content** — aucun contenu substantiellement identique ou quasi identique sur plusieurs URLs différentes sans balisage canonical explicite pointant vers la version de référence.
- **Keyword stuffing** — aucune répétition artificielle et non naturelle de mots-clés dans le texte, les balises meta, ou les attributs `alt` — le contenu doit toujours rester rédigé pour un humain d'abord (cohérent avec `copywriting.md`).
- **Plusieurs H1** — jamais plus d'un `<h1>` par page, sans exception (section 4).
- **Meta manquantes** — aucune page publiée sans title et meta description uniques et pertinents.
- **Images sans `alt`** — aucune image de contenu publiée sans attribut `alt` descriptif.
- **URLs mal conçues** — aucune URL contenant des paramètres techniques inutiles, des identifiants non lisibles, ou une structure incohérente avec l'arborescence du site (section 2).
- **Canonical absente** — aucune page publiée sans balise canonical explicite.
- **Liens cassés** — aucun lien interne ou externe non fonctionnel laissé en production ; vérification systématique avant publication.
- **Contenu caché ou trompeur** — aucun texte caché visuellement mais présent dans le code dans le seul but d'influencer l'indexation (technique de black hat SEO strictement interdite).
- **Redirections en chaîne** — aucune succession de redirections multiples (301 vers 301 vers 301) ; toute redirection doit pointer directement vers la destination finale.
- **Vitesse négligée** — aucune page publiée sans respect des objectifs de performance définis dans `performance.md`, directement corrélés au classement SEO.
- **Données structurées trompeuses** — aucun schema JSON-LD ne doit décrire un contenu, un avis, ou une donnée qui ne correspond pas exactement à la réalité visible sur la page (section 6).
- **Contenu généré sans valeur ajoutée** — aucune page créée uniquement pour cibler un mot-clé sans apporter de contenu réellement utile et distinct.
- **Absence de sitemap ou robots.txt** — ces deux fichiers sont obligatoires et maintenus à jour à chaque évolution de la structure du site.
- **Balises `hreflang` incohérentes** — si utilisées, elles doivent référencer systématiquement toutes les variantes linguistiques existantes de façon croisée et cohérente, jamais partiellement.

---

# 10. Workflow SEO

Workflow obligatoire pour toute création ou modification de page ayant un impact SEO :

1. **Analyse** — identifier l'intention de recherche et le besoin utilisateur précis auquel cette page doit répondre (cohérent avec `ux.md` section 2), avant toute décision de structure ou de contenu.
2. **Création** — construire la page en respectant l'architecture SEO définie (arborescence, URL, section 2), la hiérarchie de contenu (section 4), et les principes de copywriting (`copywriting.md`).
3. **Optimisation** — renseigner l'intégralité des balises HTML nécessaires (title, meta description, canonical, Open Graph, Twitter Cards — section 3), les données structurées pertinentes (section 6), et vérifier l'optimisation des images (section 5).
4. **Validation** — vérifier l'absence de toute erreur interdite (section 9) : H1 unique, canonical présente, alt renseignés, pas de duplication de contenu.
5. **Publication** — s'assurer que la page est correctement référencée dans le sitemap généré, accessible selon les règles du `robots.txt`, et que sa performance (`performance.md`) respecte les objectifs définis.
6. **Suivi** — une fois publiée, la page peut être soumise à l'indexation via la Search Console (action manuelle de l'équipe, hors périmètre de développement) ; son comportement d'indexation et ses métriques de performance sont à surveiller dans le temps.

---

# 11. Checklist SEO

La checklist complète (architecture, balises HTML, hiérarchie du contenu, images, données structurées, Astro, SEO moderne) est centralisée dans [`checklist.md`](./checklist.md) section 12 « SEO » — elle ne doit pas être dupliquée ici.
