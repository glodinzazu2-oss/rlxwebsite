# REMOLUX — Guide Officiel du Motion Design

> Ce document est la référence absolue de toute décision liée au mouvement sur le projet REMOLUX : GSAP, Lenis, ScrollTrigger, Three.js, animations CSS, micro-interactions, transitions, navigation et loading. Il complète [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md) et [`ux.md`](./ux.md).
> L'objectif n'est jamais d'impressionner. L'objectif est de produire une sensation de **maîtrise, précision, qualité, fluidité, confiance et calme**. Chaque animation doit avoir une intention. Une animation qui n'a pas de fonction précise est une mauvaise animation, quelle que soit sa qualité d'exécution technique.

---

# 1. Philosophie du mouvement

Le mouvement n'existe jamais pour lui-même. Il existe pour :

- **Guider** — orienter l'attention de l'utilisateur vers ce qui compte à un instant donné, sans qu'il ait à chercher.
- **Révéler** — faire apparaître une information au moment exact où elle devient pertinente dans le parcours, jamais avant, jamais après.
- **Expliquer** — rendre visible et compréhensible un mécanisme (le clic magnétique, l'installation sans outil) qu'un texte statique ne pourrait pas transmettre aussi clairement.
- **Accompagner** — donner à chaque transition d'état (hover, clic, changement de section) une continuité naturelle qui évite toute sensation de rupture.
- **Rassurer** — chaque mouvement fluide et prévisible est une preuve silencieuse de la maîtrise technique de la marque, exactement comme la précision d'un mécanisme physique bien conçu inspire confiance.

**Le mouvement ne doit jamais divertir gratuitement.** Une animation qui existe uniquement parce qu'elle est "belle" ou "impressionnante", sans remplir l'une des cinq fonctions ci-dessus, est une erreur de conception — elle détourne l'attention du produit et de son message au lieu de les servir.

REMOLUX ne cherche jamais à provoquer un "wahou" technique. Elle cherche à provoquer un sentiment de calme et d'évidence — comme si chaque mouvement était la seule façon logique dont les choses pouvaient se dérouler.

---

# 2. Principes fondamentaux

## Le mouvement suit le regard

Toute animation doit accompagner la direction naturelle du regard (haut vers bas, gauche vers droite), jamais la contredire. Un élément qui apparaît dans une direction inattendue force l'utilisateur à réajuster son attention — c'est une friction, pas un effet.

## Le mouvement révèle, il ne cache jamais

Une animation ne doit jamais masquer temporairement une information dont l'utilisateur a besoin. Elle prépare et introduit le contenu, elle ne le retient pas artificiellement pour créer un effet de suspense inutile.

## Le mouvement ne surprend jamais

Aucune animation ne doit démarrer de façon abrupte, imprévisible ou déclenchée sans lien clair avec une action ou une position de l'utilisateur (scroll, hover, clic). La surprise casse la confiance ; la prévisibilité la construit.

## Le mouvement respecte l'utilisateur

Il respecte son rythme (jamais plus rapide que ce qu'il peut suivre, jamais plus lent que ce qu'il peut tolérer), ses préférences système (`prefers-reduced-motion`, voir section 13), et son intention (une animation ne doit jamais empêcher ou retarder une action que l'utilisateur souhaite effectuer).

## Le mouvement ne ralentit jamais

Aucune animation ne doit être un obstacle à la progression de l'utilisateur dans la page. Si une animation retarde perceptiblement l'accès à un contenu ou à une action, elle est mal calibrée et doit être raccourcie ou supprimée.

## Le mouvement est cohérent

Le même type d'interaction produit toujours le même type de mouvement, avec les mêmes timings et les mêmes easings, partout sur le site. Cette cohérence est ce qui transforme une collection d'animations en un véritable langage de marque.

## Le mouvement est discret par défaut

L'intensité d'une animation doit toujours être la plus faible possible pour remplir sa fonction. Une animation subtile qui atteint son objectif est toujours préférable à une animation spectaculaire qui atteint le même objectif avec plus de bruit visuel.

## Le mouvement est réversible dans sa perception

L'utilisateur doit toujours pouvoir "suivre mentalement" ce qui s'est passé visuellement — d'où vient l'élément, où il va. Un mouvement trop rapide ou trop complexe pour être suivi par l'œil casse la sensation de maîtrise.

---

# 3. Les émotions recherchées

Chaque émotion cible correspond à des choix précis de motion design :

## Fluidité

Produite par des courbes d'easing continues (jamais linéaires), un scroll fluide (Lenis) parfaitement synchronisé avec les animations, et l'absence totale de saccade (jank) perceptible à 60fps.

## Précision

Produite par des timings exacts et cohérents, des points de départ et d'arrivée d'animation alignés sur la grille du design system, et des mouvements qui s'arrêtent net à leur position finale sans dépassement (overshoot) non maîtrisé.

## Robustesse

Produite par des mouvements qui ont du poids et de la matière (easing avec une légère résistance en fin de course plutôt qu'un arrêt artificiel), évoquant un mécanisme physique solide plutôt qu'un élément numérique sans consistance.

## Élégance

Produite par la retenue : peu d'animations simultanées, une hiérarchie claire dans l'ordre d'apparition des éléments, et l'absence de tout effet superflu.

## Technologie

Produite par des transitions nettes et rapides sur les micro-interactions (hover, focus), et par le rendu 3D qui démontre le produit avec une précision quasi chirurgicale.

## Silence

Produite par l'absence de mouvement inutile en dehors des zones d'interaction — un écran au repos doit rester véritablement au repos, sans animation de fond continue qui solliciterait l'attention sans raison.

## Maîtrise

Produite par la prévisibilité totale du comportement de chaque élément animé : le même geste produit toujours le même résultat, sans exception ni variation aléatoire.

## Confiance

Produite par la stabilité (jamais de layout shift), la continuité (jamais de rupture brutale entre deux états), et la cohérence du langage de mouvement sur l'ensemble du site.

---

# 4. Le rythme du site

Le site doit avoir un tempo pensé comme une partition, avec des temps forts et des temps de respiration.

## Hero

Entrée posée et confiante : apparition progressive et hiérarchisée des éléments (visuel produit, accroche, sous-texte, CTA secondaire), jamais tout en même temps. Premier souffle du site — il donne le tempo de tout ce qui suit.

## Sections

Chaque nouvelle section se révèle au rythme du scroll de l'utilisateur, jamais de façon automatique ou déconnectée de son geste. Le tempo interne d'une section (ordre d'apparition de ses éléments) suit toujours la hiérarchie de lecture définie dans `ux.md`.

## Transitions entre sections

Continues et sans rupture — la fin d'une section prépare visuellement l'entrée dans la suivante (fondu, léger décalage de profondeur), jamais de coupure nette qui donnerait une sensation de pages assemblées artificiellement.

## CTA

Apparition calme, jamais précipitée. Le CTA ne doit jamais sembler "surgir" — il doit sembler être la conséquence naturelle du contenu qui vient de se dérouler.

## Footer

Ralentissement du tempo général, signalant la fin du parcours narratif. Mouvement minimal, presque immobile, pour installer une sensation de conclusion sereine.

## Chargement

Le tempo doit rester perceptible même pendant le chargement initial (voir section 11 pour la performance) — jamais un écran figé sans signal de vie, mais jamais non plus un loader spectaculaire qui deviendrait lui-même un point d'attention excessif.

## Sortie (navigation vers Amazon)

Le dernier mouvement avant la sortie du site (clic CTA) doit être bref, net et confirmatif — une micro-animation de retour au clic suffit ; aucune transition de sortie complexe n'est nécessaire ni souhaitable.

**Le site doit se ressentir comme une seule respiration continue du haut vers le bas de la page**, jamais comme une suite d'écrans indépendants.

---

# 5. Les timings

Recommandations précises de durée, à respecter comme règle par défaut sauf justification documentée.

| Interaction                              | Durée recommandée                                                      | Durée interdite                                           |
| ---------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| Hover (couleur, fond, bordure)           | 150–200 ms                                                             | > 400 ms (perçu comme lent)                               |
| Focus (apparition du contour)            | 100–150 ms (quasi instantané)                                          | tout délai perceptible (nuit à l'accessibilité)           |
| Click / micro-feedback                   | 80–120 ms                                                              | > 200 ms (donne une sensation de latence)                 |
| Fade (apparition/disparition simple)     | 300–500 ms                                                             | < 150 ms (saccadé) ou > 800 ms (mou)                      |
| Reveal de contenu au scroll              | 400–700 ms                                                             | > 1000 ms (retarde la lecture)                            |
| Cards (apparition, hover)                | 250–400 ms                                                             | > 600 ms                                                  |
| Images (apparition, zoom léger au hover) | 300–500 ms                                                             | > 700 ms ou effet de zoom > 5-8%                          |
| Navigation (ouverture menu mobile)       | 250–350 ms                                                             | > 500 ms                                                  |
| Transitions de section                   | 500–800 ms                                                             | > 1200 ms (casse le rythme de scroll)                     |
| Loader / écran de chargement             | dépendant du temps réel de chargement, jamais artificiellement allongé | tout délai ajouté artificiellement pour "faire patienter" |

## Durées interdites, en synthèse

- Toute durée supérieure à 1 seconde pour une interaction déclenchée par un geste direct de l'utilisateur (hover, clic) — cela crée une sensation de latence, jamais de qualité perçue.
- Toute durée inférieure à 100 ms pour une transition censée être perçue comme un mouvement (en dessous, l'œil perçoit un flash plutôt qu'un mouvement).
- Toute durée artificiellement allongée dans le seul but de "montrer" une animation — le timing doit toujours servir la clarté, jamais la démonstration de la technique.

---

# 6. Les easings

## power1

Le plus doux des `power`. Utilisé pour des mouvements très subtils, presque imperceptibles (micro-décalages, respiration légère). À utiliser quand le mouvement doit être ressenti sans être identifié consciemment.

## power2

L'easing par défaut du projet pour la grande majorité des transitions (fade, reveal, hover). Il offre une accélération/décélération naturelle et confiante, sans excès. **C'est l'easing de référence de REMOLUX.**

## power3

Réservé aux mouvements plus marqués nécessitant une décélération plus prononcée en fin de course (grands déplacements, transitions de section importantes). À utiliser avec parcimonie — son usage systématique donnerait une sensation de mouvement trop appuyé.

## expo

Réservé aux entrées ou sorties rapides et nettes (ex. apparition d'un élément d'interface critique). Son accélération/décélération très marquée en fait un easing à utiliser uniquement pour des moments ponctuels et volontairement affirmés — jamais en usage courant.

## circ

Peut être utilisé pour des mouvements circulaires ou des rotations légères (ex. interaction avec le produit en 3D) où une décélération très douce en fin de course est recherchée. Usage rare et spécifique.

## sine

Le plus neutre et le plus doux de tous. Adapté aux animations continues ou en boucle légère (ex. respiration très subtile d'un halo lumineux) où l'on veut éviter toute sensation mécanique. À utiliser uniquement pour des effets d'ambiance très discrets.

## Philosophie des easings

- **`ease-out` (décélération en fin de course) est la norme absolue** pour toute animation d'entrée — un élément qui arrive doit ralentir en approchant sa position finale, jamais s'arrêter brutalement.
- **`ease-in-out`** est réservé aux transitions d'un état stable à un autre état stable (ex. changement de section, changement de couleur d'un élément déjà visible).
- **`ease-in` seul (accélération en début de course, arrêt brutal) est à éviter** pour toute animation d'entrée — il donne une sensation d'arrêt artificiel qui casse la fluidité perçue.
- **Jamais d'easing linéaire** pour un mouvement perçu comme "naturel" — le linéaire est réservé aux cas mécaniques explicites (ex. une barre de progression de chargement, où la linéarité communique une progression réelle et mesurable).
- **Un seul vocabulaire d'easing par type d'interaction** sur tout le site — un hover de bouton utilise toujours le même easing qu'un autre hover de bouton, sans variation arbitraire d'un composant à l'autre.

---

# 7. Scroll

Le scroll est l'épine dorsale de l'expérience REMOLUX — l'essentiel de la narration du site se déroule à travers lui.

## Lenis

- Une seule instance Lenis active sur toute la page, initialisée une fois, jamais recréée inutilement.
- Les paramètres de fluidité (durée, easing du scroll) doivent rester cohérents sur tout le site — jamais de variation de "poids" du scroll d'une page à l'autre.
- Lenis doit rester synchronisé avec `ScrollTrigger` via le hook d'intégration officiel (mise à jour de ScrollTrigger sur chaque frame de Lenis) — une désynchronisation entre les deux est une source directe de décalage visuel perceptible.

## ScrollTrigger

- Chaque `ScrollTrigger` a des bornes `start`/`end` explicites et réfléchies, jamais laissées aux valeurs par défaut sans vérification du résultat réel.
- `scrub` est utilisé pour les animations qui doivent suivre précisément la position du scroll (ex. révélation progressive d'un produit en 3D), avec une valeur de lissage (`scrub: true` ou une valeur numérique de lissage) choisie pour éviter tout à-coup.
- `pin` est utilisé avec parcimonie, uniquement lorsque l'histoire racontée nécessite réellement de figer une section pendant que son contenu évolue (ex. démonstration du mécanisme magnétique) — jamais comme effet systématique.
- `snap` n'est utilisé que si l'expérience bénéficie réellement d'un alignement automatique sur des sections précises, et seulement s'il ne contredit jamais la fluidité du scroll naturel — en cas de doute, ne pas l'utiliser.

## Timelines liées au scroll

Les timelines pilotées par ScrollTrigger sont construites de façon modulaire et prévisible (voir `architecture.md` section 9), avec un point d'entrée et un point de sortie clairement définis pour chaque étape animée.

## `start` / `end`

Toujours exprimés de façon relative à la fois à l'élément déclencheur et au viewport (ex. `"top 80%"`, `"bottom 20%"`), jamais en valeurs absolues fragiles qui casseraient au moindre changement de contenu.

## `refresh` / `invalidate`

`ScrollTrigger.refresh()` doit être appelé après tout changement de layout significatif (chargement de police, changement de contenu dynamique, redimensionnement majeur) pour garantir que les positions calculées restent exactes. `invalidateOnRefresh` est utilisé pour les animations dont les valeurs dépendent de la taille de l'élément, afin qu'elles se recalculent correctement après un `resize`.

## `resize`

Toute animation liée au scroll doit être testée après redimensionnement de la fenêtre (notamment le passage mobile/desktop) pour vérifier l'absence de décalage ou de rupture.

## Bonnes pratiques

- Grouper et nettoyer les instances ScrollTrigger par contexte de composant (`gsap.context()`), jamais les laisser s'accumuler sans nettoyage lors des changements de page ou de démontage de composant.
- Limiter le nombre de ScrollTrigger actifs simultanément sur une page — chaque instance a un coût de calcul au scroll.
- Toujours vérifier le comportement du scroll en conditions réelles (appareil mobile, réseau lent) avant de valider une animation liée au scroll.

## Mauvaises pratiques à proscrire

- Créer un `ScrollTrigger` sans jamais le nettoyer.
- Utiliser `pin` de façon systématique pour un effet de mode plutôt que pour un besoin narratif réel.
- Faire dépendre une animation de valeurs de scroll absolues non recalculées au resize.
- Empiler plusieurs `ScrollTrigger` redondants sur un même élément.
- Désynchroniser Lenis et ScrollTrigger en oubliant le hook d'intégration.

---

# 8. Les micro-interactions

## Hover

Changement subtil et immédiat (150–200 ms, `power2.out`) de couleur, de fond ou d'élévation. Jamais de changement de taille brutal ni de rotation.

## Focus

Apparition quasi instantanée d'un contour ou halo net et visible, conforme à l'accessibilité — jamais retardée, jamais supprimée pour raison esthétique.

## Active / Pressed

Micro-retour visuel très bref (80–120 ms) au moment du clic ou du toucher (légère variation d'opacité ou d'échelle, jamais de saut de position), confirmant la prise en compte du geste avant même le résultat de l'action.

## Drag (si applicable, ex. rotation produit en 3D)

Le mouvement doit suivre fidèlement le geste de l'utilisateur en temps réel (sans latence perceptible), avec un relâchement en douceur (`ease-out`) une fois le geste terminé, jamais un arrêt brutal ou un rebond exagéré.

## Cursor

Si un curseur personnalisé est utilisé (desktop uniquement), son comportement doit rester discret et fonctionnel (ex. changement subtil au survol d'un élément interactif) — jamais un effet spectaculaire qui détournerait l'attention du contenu.

## Navigation / Menu

Ouverture et fermeture fluides (250–350 ms), avec une hiérarchie d'apparition des éléments du menu (pas tous simultanément) pour renforcer la sensation de contrôle et de clarté.

## CTA

Micro-animation de confirmation au hover et au clic (cohérent avec `design.md` section 10 et `ux.md` section 10) — jamais de pulsation continue ou d'effet d'appel à l'action agressif.

## Cards

Légère élévation ou variation de fond au hover (250–400 ms, `power2.out`), jamais de rotation, de zoom excessif ou d'inclinaison 3D exagérée (tilt).

## Images

Zoom très léger au hover si pertinent (maximum 5–8%, jamais plus), toujours avec un `overflow: hidden` propre sur le conteneur pour éviter tout débordement disgracieux.

## Icônes

Micro-mouvement discret uniquement si l'icône est elle-même interactive (ex. légère rotation d'un chevron), jamais d'animation sur une icône purement décorative.

## Liens

Changement de couleur ou de soulignement progressif (150–200 ms), jamais de saut brusque ou de soulignement qui apparaît instantanément sans transition.

---

# 9. Les transitions

## Entrée

Toute apparition de contenu (section, image, texte) suit un `ease-out` avec un léger décalage de position initiale (quelques pixels, jamais un déplacement large) combiné à un fondu — jamais une apparition instantanée ni un déplacement large et rapide qui distrairait.

## Sortie

Une sortie doit toujours être aussi soignée que l'entrée : fondu et léger décalage inverse, avec une durée légèrement plus courte que l'entrée pour ne jamais donner une sensation de lenteur au moment de quitter un état.

## Section à section

Continuité visuelle assurée par un chevauchement léger des animations d'entrée/sortie (la section suivante commence à apparaître légèrement avant que la précédente ait totalement disparu du champ d'attention), pour éviter tout "trou" visuel.

## Page à page (navigation interne, le cas échéant)

Transition cohérente avec le langage du site (fondu, jamais de slide brutal ou d'effet de page qui se retourne). La continuité prime toujours sur l'originalité.

## Overlay (menu mobile, modal éventuelle)

Apparition en fondu avec léger effet de profondeur (l'arrière-plan peut s'assombrir légèrement), fermeture symétrique et tout aussi soignée que l'ouverture.

## Loader

Le loader (si nécessaire, ex. chargement d'une scène 3D lourde) doit rester minimaliste, cohérent avec l'identité de marque, et ne jamais donner une impression d'attente excessive — voir section 11 pour la philosophie de performance liée.

## Images

Chargement progressif soigné (fondu à l'apparition une fois l'image chargée), jamais de saut brutal d'un espace vide à l'image pleinement chargée sans transition.

## Texte

Apparition du texte toujours groupée par bloc logique (titre, puis paragraphe), jamais lettre par lettre ou mot par mot de façon systématique (effet trop démonstratif, à réserver à un usage exceptionnel et justifié narrativement).

## CTA

La transition d'apparition du CTA doit toujours sembler être la conclusion naturelle du mouvement de la section qui précède, jamais un élément qui surgit indépendamment.

**Règle absolue de cette section : ne jamais créer de rupture.** Chaque transition doit donner l'impression que l'écran précédent et l'écran suivant appartiennent à la même continuité narrative et visuelle.

---

# 10. Three.js

Le rendu 3D est un outil de motion design à part entière, soumis aux mêmes exigences de retenue et d'intention que GSAP.

## Caméra

Mouvements de caméra lents, continus, toujours motivés par un objectif de démonstration (révéler un angle, un détail) — jamais de mouvement de caméra rapide, saccadé ou orbital continu sans interaction utilisateur.

## Rotation

Si le produit peut être tourné par l'utilisateur (drag), la rotation doit être fluide et directement proportionnelle au geste, avec un léger amorti (`ease-out`) au relâchement. Aucune rotation automatique continue n'est activée par défaut sans interaction — un produit qui tourne seul indéfiniment devient rapidement un gadget plutôt qu'une démonstration.

## Lumière

Éclairage cohérent avec la palette de `design.md` (tons froids, halos LED), utilisé pour sculpter le volume du produit et souligner ses détails de fabrication — jamais un éclairage plat qui aplatirait la perception de qualité.

## HDRI

Si un environnement HDRI est utilisé pour les reflets, il doit rester discret et cohérent avec l'univers de marque (jamais un environnement studio générique ou un ciel spectaculaire qui détournerait l'attention du produit).

## Reflets

Les reflets sur les surfaces du produit (boîtier, verre de LED) doivent rester réalistes et subtils — ils renforcent la perception de qualité matérielle sans devenir un effet visuel dominant.

## Ombres

Ombres douces et réalistes, cohérentes avec la lumière définie, utilisées pour ancrer le produit dans son espace 3D — jamais d'ombres dures ou stylisées qui casseraient le réalisme recherché.

## Animations

Toute animation 3D (apparition du produit, démonstration du mécanisme magnétique) suit les mêmes principes de timing et d'easing que le reste du site (sections 5 et 6) — le 3D n'a pas de vocabulaire de mouvement séparé du reste du site, il applique le même langage dans un espace tridimensionnel.

## Interaction

Les interactions 3D (drag, hover sur une pièce du produit) doivent rester intuitives et découvrables sans explication — si une interaction 3D nécessite un mode d'emploi, elle est trop complexe pour l'objectif du site.

## Idle (état de repos)

En l'absence d'interaction, la scène peut présenter un mouvement extrêmement subtil (respiration légère de la lumière, très léger flottement) pour signaler que la scène est vivante — jamais un mouvement assez marqué pour être qualifié d'animation active.

## Performance

Le rendu 3D doit toujours respecter le budget de performance global du site (section 11) — geometry et texture optimisées, boucle de rendu suspendue hors du viewport.

## Fallback

Une version dégradée (image statique haute qualité) est systématiquement prévue en cas d'incompatibilité ou de contrainte de performance — jamais d'écran vide ou cassé.

**Rappel central : le 3D doit toujours servir le produit.** Aucun effet 3D n'est validé s'il ne renforce pas directement la perception de qualité, de robustesse ou de compréhension du fonctionnement du produit REMOLUX.

---

# 11. Performance Motion

## 60 FPS — non négociable

Toute animation du site doit maintenir un rythme constant de 60 images par seconde. Une animation qui introduit du jank (saccade visible) doit être simplifiée, optimisée, ou retirée — sans exception.

## GPU / propriétés compositées

Animer prioritairement `transform` (translate, scale, rotate) et `opacity` — ces propriétés sont gérées par le compositeur GPU sans déclencher de recalcul de layout ni de repaint coûteux. Éviter d'animer `width`, `height`, `top`, `left`, `margin` ou toute propriété qui force un reflow.

## `will-change`

Utilisé avec parcimonie, uniquement sur les éléments dont on sait avec certitude qu'ils vont être animés de façon imminente ou continue (ex. juste avant le déclenchement d'une transition complexe) — jamais appliqué de façon permanente ou systématique sur de nombreux éléments, car cela consomme de la mémoire GPU inutilement.

## Layout / Paint / Composite

Comprendre et respecter le pipeline de rendu du navigateur : privilégier systématiquement les animations qui ne concernent que l'étape de composition (transform/opacity), éviter celles qui déclenchent un reflow (layout) ou un repaint complet, particulièrement coûteux sur mobile.

## Batch

Grouper les lectures et écritures du DOM lors de calculs liés à des animations personnalisées (éviter l'alternance lecture/écriture qui force des reflows forcés synchrones — "layout thrashing"). GSAP gère nativement une grande partie de cette optimisation ; rester vigilant lors de toute manipulation DOM manuelle en complément.

## `gsap.context()`

Utilisé systématiquement pour scoper les animations à un composant ou une section, permettant un nettoyage automatique et complet (`ctx.revert()`) au démontage — c'est le mécanisme de référence pour éviter toute fuite mémoire ou trigger fantôme (cohérent avec `architecture.md` section 9).

## Cleanup / Memory leaks

Toute timeline, tween, ScrollTrigger, ou instance Three.js doit être explicitement détruite lors du démontage de son composant. Une fuite mémoire liée au motion design se traduit toujours, à terme, par une dégradation progressive des performances du site — elle n'est jamais acceptable, même en apparence mineure.

## RAF (requestAnimationFrame)

Toute boucle d'animation personnalisée (notamment Three.js) doit utiliser `requestAnimationFrame` et être explicitement suspendue lorsque l'élément concerné sort du viewport ou que l'onglet devient inactif — jamais de boucle de rendu qui continue de consommer des ressources hors de toute utilité visible.

## Optimisation ScrollTrigger

Limiter le nombre total d'instances actives, utiliser des bornes `start`/`end` précises pour éviter des zones de calcul inutilement larges, et grouper les rafraîchissements (`refresh`) plutôt que de les déclencher de façon répétée et redondante.

## Optimisation Three.js

Limiter le nombre de draw calls (fusion de géométries quand pertinent), utiliser des niveaux de détail (LOD) adaptés si nécessaire, compresser systématiquement modèles et textures, et suspendre le rendu dès que la scène n'est plus visible à l'écran.

---

# 12. Mobile

Les animations sur mobile suivent des règles plus strictes qu'en desktop, cohérentes avec la contrainte de performance et d'attention réduite du contexte mobile :

- **Animations plus courtes** — réduire légèrement les durées définies en section 5 sur mobile pour compenser la sensation de latence perçue différemment sur petit écran et tactile.
- **Moins nombreuses** — limiter le nombre d'animations simultanées ou successives visibles sur un même écran mobile ; l'espace réduit rend toute surcharge de mouvement plus fatigante visuellement.
- **Plus simples** — éviter les séquences d'animation complexes à plusieurs étapes sur mobile ; préférer une seule transition claire et directe.
- **Plus légères** — désactiver ou simplifier drastiquement les effets 3D et les animations lourdes (parallaxe, effets de profondeur complexes) sur les appareils mobiles bas de gamme, en s'appuyant sur une détection de capacité ou de préférence quand c'est possible.
- Le scroll (Lenis) doit rester la priorité absolue de fluidité sur mobile — toute animation qui menacerait la fluidité du scroll doit être sacrifiée en premier.
- Les micro-interactions de hover n'ont pas de sens sur tactile — elles sont remplacées par des retours au toucher (`active`/`pressed`) courts et clairs (section 8).

---

# 13. `prefers-reduced-motion`

Le respect de cette préférence système est une obligation absolue, non négociable, sur l'ensemble du site (cohérent avec `rules.md` et `ux.md`).

## Ce qui disparaît

- Tout mouvement de grande amplitude (translation large, parallaxe, rotation continue).
- Toute animation 3D non essentielle à la compréhension du produit (rotation automatique, mouvements de caméra complexes).
- Tout effet de zoom, de scale prononcé, ou de mouvement décoratif.

## Ce qui reste

- Les changements d'état strictement nécessaires à la compréhension de l'interface (ex. un élément qui passe de fermé à ouvert doit toujours changer d'état, même sans animation fluide).
- Les indicateurs de focus (accessibilité non négociable).
- Le contenu lui-même, bien entendu, intégralement préservé.

## Ce qui est remplacé

- Les animations d'apparition (fade/translate) sont remplacées par un simple changement d'opacité instantané ou très bref (quelques dizaines de millisecondes), sans déplacement.
- Les transitions de section basées sur le mouvement sont remplacées par de simples fondus enchaînés minimalistes.
- Les animations 3D interactives complexes sont remplacées par une image statique de haute qualité ou une interaction limitée à l'essentiel (ex. rotation manuelle simple sans mouvement de caméra automatique).

## Ce qui est simplifié

- Les micro-interactions (hover, focus, clic) conservent un retour visuel, mais sa durée est réduite au minimum et son amplitude de mouvement supprimée au profit d'un simple changement de couleur ou d'opacité.
- Le scroll reste fonctionnel et fluide (Lenis peut rester actif pour le confort de défilement) mais les animations qui y sont synchronisées (ScrollTrigger) sont réduites à leur expression la plus minimale ou désactivées si elles impliquent un mouvement large.

**Principe directeur** : un utilisateur avec `prefers-reduced-motion` activé doit pouvoir comprendre et utiliser l'intégralité du site aussi bien qu'un autre utilisateur — seule la mise en scène du mouvement change, jamais l'accès à l'information ou à la fonctionnalité.

---

# 14. Les erreurs Motion interdites

- **Jamais de bounce** — l'effet de rebond casse la sensation de précision et de maîtrise recherchée ; il évoque le ludique, pas le premium technique.
- **Jamais d'elastic** — même logique que le bounce, l'élasticité donne une sensation de légèreté peu sérieuse, incompatible avec le positionnement robuste de la marque.
- **Jamais de flash** — un changement instantané et brutal de contenu ou de couleur choque l'œil et casse la continuité perçue.
- **Jamais de shake** — les effets de tremblement (souvent utilisés pour signaler une erreur) sont trop agressifs pour l'univers REMOLUX ; préférer un changement de couleur ou de bordure sobre.
- **Jamais de zoom violent** — tout effet de zoom doit rester subtil (voir section 8, maximum 5-8%) ; un zoom prononcé est perçu comme criard.
- **Jamais de rotation infinie** — un élément qui tourne en continu sans interaction devient rapidement un gadget qui fatigue l'attention plutôt qu'il ne la sert.
- **Jamais de loader inutile** — un loader n'est affiché que si le temps de chargement réel le justifie ; ne jamais ajouter un délai artificiel pour "montrer" un loader.
- **Jamais de parallaxe excessive** — un léger effet de profondeur peut être acceptable en usage ponctuel et maîtrisé, mais une parallaxe marquée et généralisée fatigue visuellement et nuit à la lisibilité.
- **Jamais d'animation gratuite** — rappel du principe fondateur (section 1) : toute animation sans fonction précise (guider, révéler, expliquer, accompagner, rassurer) est interdite.
- **Jamais d'animation qui bloque l'utilisateur** — aucune animation ne doit empêcher ou retarder une action volontaire de l'utilisateur (scroll, clic).
- **Jamais de mouvement aléatoire ou non déterministe** — chaque animation doit produire un résultat identique et prévisible à chaque déclenchement.
- **Jamais d'animation continue en arrière-plan sans fonction** — un site "au repos" doit rester visuellement calme (cohérent avec l'émotion "silence" de la section 3).
- **Jamais de superposition d'animations concurrentes non coordonnées** — deux animations simultanées sur le même écran doivent toujours être hiérarchisées et synchronisées, jamais indépendantes l'une de l'autre.
- **Jamais d'effet sonore associé à une animation** sans demande explicite — le site reste silencieux par défaut (cohérent avec `ux.md`, jamais de son automatique).
- **Jamais de texte qui clignote ou pulse** pour attirer l'attention — cette technique est associée aux pratiques publicitaires agressives, incompatibles avec le positionnement premium.
- **Jamais d'animation dont la durée dépasse un seuil raisonnable de patience utilisateur** (voir tableau des timings interdits, section 5).

---

# 15. Checklist Motion

La checklist complète (intention, émotion, timing/easing, scroll, Three.js, micro-interactions, transitions, performance, mobile, `prefers-reduced-motion`) est centralisée dans [`checklist.md`](./checklist.md) section 6 « GSAP & Motion » — elle ne doit pas être dupliquée ici.
