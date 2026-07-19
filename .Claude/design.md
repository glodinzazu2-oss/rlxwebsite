# REMOLUX — Guide Officiel de Direction Artistique

> Ce document est la référence absolue de toute décision de design sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md) (vision, mission, ADN de marque) et [`rules.md`](./rules.md) (règles techniques strictes).
> Aucune décision visuelle — couleur, animation, layout, image, micro-interaction — ne doit être prise sans être confrontée à ce document. En cas de doute entre deux options visuelles, celle qui se rapproche le plus de la sobriété et de la précision décrites ici doit toujours être préférée.

---

# 1. Vision artistique

Le visiteur ne doit jamais avoir l'impression de "consulter un site". Il doit avoir l'impression d'entrer dans l'univers d'un produit fini, pensé jusqu'au moindre détail — comme s'il feuilletait la présentation d'un objet qu'une équipe d'ingénieurs et de designers a passé des mois à perfectionner.

## Émotions recherchées à chaque instant de la navigation

- **Confiance** — chaque élément à l'écran doit sembler intentionnel. Rien n'est laissé au hasard, rien ne semble improvisé. Le visiteur doit se dire : "ces gens savent ce qu'ils font".
- **Robustesse** — le langage visuel (contrastes forts, matières suggérées, structure solide des blocs) doit évoquer un produit qui résiste aux éléments, pas un gadget fragile.
- **Précision** — alignements parfaits, espacements millimétrés, typographie nette. La précision visuelle est la preuve silencieuse de la précision du produit.
- **Technologie** — sans tomber dans le futurisme gratuit : une technologie discrète, maîtrisée, au service de l'usage (le magnétique, le sans-fil, l'étanchéité).
- **Élégance** — sobriété assumée. L'élégance vient de ce qui est retiré, pas de ce qui est ajouté.
- **Simplicité** — une idée, un message, une émotion par écran. Jamais deux messages qui se disputent l'attention en même temps.
- **Maîtrise** — le rythme de navigation donne le sentiment que la marque contrôle chaque étape du parcours, comme un guide sûr de lui.
- **Qualité premium** — qualité perçue immédiate, dès la première seconde, avant même la lecture du moindre mot.

## Ce que le site ne doit jamais paraître

- **Cheap** — pas de textures plastique, pas de couleurs criardes, pas d'éléments visuels qui semblent gratuits ou génériques.
- **Surchargé** — pas d'accumulation d'informations, de badges, de blocs promotionnels empilés.
- **Agressif** — pas de gros CTA clignotants, pas de compte à rebours, pas de "OFFRE LIMITÉE" en rouge vif.
- **Tape-à-l'œil** — pas d'effets visuels spectaculaires sans fonction (particules, néons, gradients arc-en-ciel).
- **Compliqué** — jamais de parcours qui oblige le visiteur à réfléchir pour comprendre où cliquer ou quoi faire.
- **Brouillon** — zéro incohérence d'alignement, de typographie, d'espacement ou de couleur. Zéro élément "à peu près juste".

**Règle d'arbitrage** : à chaque décision de design, se poser la question — *"Est-ce que cet élément renforce une des huit émotions recherchées, ou est-ce qu'il risque de faire basculer le site dans l'une des six perceptions interdites ?"* En cas de doute, retirer plutôt qu'ajouter.

---

# 2. Positionnement visuel

REMOLUX doit évoquer, par son langage visuel, le même niveau d'exigence que des marques comme **Apple**, **Rivian**, **DJI**, **Garmin** ou **Ledlenser** — sans jamais copier leur identité graphique, leurs couleurs, leur typographie ou leurs compositions spécifiques. Il s'agit de s'inspirer de leurs *principes*, pas de leur *forme*.

## Principes communs à intégrer

- **Sobriété** — peu d'éléments à l'écran, chacun ayant un rôle clair. Le silence visuel est une force, pas un manque.
- **Précision** — grilles rigoureuses, alignements exacts, aucune approximation dans l'espacement ou la taille des éléments.
- **Minimalisme fonctionnel** — chaque élément retiré qui ne nuit pas à la compréhension doit être retiré. Le minimalisme n'est pas un style, c'est une discipline.
- **Hiérarchie parfaite** — l'œil du visiteur doit toujours savoir instantanément où regarder en premier, en deuxième, en troisième. Aucune ambiguïté de lecture.
- **Grands espaces** — l'espace vide (ou sombre) n'est pas un espace perdu, c'est un espace qui donne de l'air et de la valeur à ce qu'il entoure.
- **Mise en valeur du produit** — le produit REMOLUX est toujours le sujet central de la composition. Le décor, la typographie, la couleur existent pour le servir, jamais pour rivaliser avec lui.

**Test de positionnement** : si l'on masquait le logo REMOLUX, l'écran devrait tout de même donner l'impression d'appartenir à une marque premium exigeante — jamais à un site e-commerce générique ou à une marque low-cost.

---

# 3. Palette

## Couleur dominante

Un **noir profond / anthracite** (proche de `#0A0A0C` à `#121316`) comme fond dominant sur les écrans à forte intention (hero, mise en situation produit, démonstrations). Ce fond sombre évoque la nuit, la route, le terrain — le contexte réel d'usage du produit — et fait ressortir la lumière des LED comme élément narratif central.

## Couleurs secondaires

- **Blanc cassé / gris très clair** (proche de `#F5F5F3` à `#FAFAF9`) pour les sections à dominante claire, utilisées pour aérer le parcours et créer un contraste de rythme entre écrans sombres et écrans clairs.
- **Gris neutres intermédiaires** (une échelle de 4 à 6 gris, du très clair au très foncé) pour les textes secondaires, bordures, séparateurs, fonds de carte — jamais de gris "sale" ou verdâtre, toujours des gris neutres et froids.

## Couleurs d'accent

- **Rouge signal REMOLUX** — un rouge froid et précis (pas un rouge criard type promotion), utilisé exclusivement pour : le logo, un détail produit, un point d'attention unique par écran (un mot clé, un indicateur). Jamais utilisé en aplat large.
- **Blanc LED froid** — utilisé uniquement pour évoquer la lumière réelle du produit (halos, reflets, effets de lumière dans les visuels et le 3D). Ne jamais utiliser comme couleur de fond ou de texte courant.

## Couleurs interdites

- Aucun dégradé multicolore ou "arc-en-ciel".
- Aucune couleur pastel, aucune couleur "bonbon" (rose vif, jaune vif, vert flashy).
- Aucun bleu générique de type "startup SaaS" — la marque ne doit jamais évoquer une application logicielle.
- Aucune couleur saturée utilisée en grande surface (uniquement en accent ponctuel, jamais en fond).
- Aucun orange ou jaune promotionnel évoquant les soldes ou le discount.

## Utilisation des contrastes

- Contraste fort et volontaire entre fond et sujet : le produit et les messages clés doivent toujours se détacher nettement de leur environnement.
- Le contraste sert la hiérarchie : plus un élément est important, plus son contraste avec le fond est marqué ; les éléments secondaires restent en faible contraste pour ne pas concurrencer l'essentiel.
- Toujours vérifier la conformité WCAG AA (voir `rules.md`, section Accessibilité) même sur les compositions à fort contraste esthétique.

## Utilisation des ombres

- Ombres douces, jamais dures ni "plaquées" — elles doivent suggérer une profondeur réelle et physique, pas un effet Photoshop des années 2010.
- Utilisées avec parcimonie : pour détacher un élément flottant (carte, bouton en hover, produit en 3D), jamais en décoration systématique de chaque bloc.
- Sur fond sombre, préférer les halos lumineux subtils aux ombres portées classiques pour suggérer la profondeur.
- Aucune ombre colorée gratuite (ombre bleue, violette) sauf si elle sert directement à évoquer la lumière LED du produit.

---

# 4. Typographie

## Philosophie typographique

Une typographie sans-serif moderne, géométrique mais humaine, qui inspire à la fois la précision technique et la chaleur d'une marque qui parle à des utilisateurs réels. La typographie est un outil de hiérarchie et de clarté avant d'être un outil décoratif.

Deux graisses maximum utilisées de façon systématique : une graisse "display" marquée (bold/semibold) pour les titres d'impact, et une graisse régulière pour tout texte courant. Éviter la multiplication de graisses intermédiaires qui brouille la hiérarchie.

## Hiérarchie

Une échelle typographique claire et limitée (5 à 6 niveaux maximum) :

1. **Display / Hero** — titre d'accroche principal de page.
2. **H1 / Titre de section** — un par section majeure.
3. **H2 / Sous-titre** — sous-sections, accroches secondaires.
4. **Corps de texte** — texte courant, descriptions.
5. **Texte secondaire / légende** — mentions, détails techniques, notes.
6. **Micro-texte** — labels, badges, indications minimales.

Chaque niveau doit être visuellement distinct sans ambiguïté possible entre deux niveaux adjacents.

## Taille des titres

- Titres d'impact (hero) : grands, occupant une part significative de l'écran, avec un usage généreux de `clamp()` pour une adaptation fluide entre mobile et desktop plutôt que des sauts brusques par breakpoint.
- Titres de section : nettement plus petits que le hero mais toujours dominants dans leur section, avec un rapport de taille cohérent et répété d'une section à l'autre.
- Ne jamais faire varier arbitrairement la taille d'un même niveau de titre d'une section à l'autre — la cohérence prime sur la variation créative.

## Taille du texte

- Corps de texte confortable à la lecture (jamais en dessous d'un seuil raisonnable de lisibilité, y compris sur mobile).
- Contraste de taille net entre corps de texte et titres — un corps de texte ne doit jamais concurrencer visuellement un titre.
- Texte secondaire toujours suffisamment lisible pour rester accessible, jamais réduit au point de devenir décoratif ou illisible.

## Longueur idéale des paragraphes

- Paragraphes courts, 2 à 4 lignes maximum sur desktop, encore plus courts sur mobile.
- Une idée par paragraphe. Si un paragraphe développe plusieurs idées, le scinder.
- Largeur de colonne de texte limitée pour garantir un nombre de caractères par ligne confortable (proche de 60-75 caractères sur desktop) — jamais de texte courant étiré sur toute la largeur de l'écran.

## Rythme vertical

- Un système d'espacement vertical cohérent et régulier entre titre, texte et éléments suivants (basé sur les mêmes tokens d'espacement que le layout, voir section 5).
- L'espacement doit toujours refléter la hiérarchie logique : un espacement plus grand avant un nouveau titre de section qu'entre un titre et son texte associé.
- Éviter les espacements verticaux irréguliers ou approximatifs — chaque espace doit être un choix, jamais un résidu.

---

# 5. Layout

## Grille

Grille fluide basée sur un système de colonnes cohérent (typiquement 12 colonnes sur desktop, adapté sur mobile/tablette), avec des gouttières régulières issues des tokens d'espacement du design system.

Tous les éléments doivent s'aligner sur cette grille — aucun élément positionné "à l'œil" ou en dehors du système.

## Espacements

Échelle d'espacement limitée et cohérente (type suite géométrique ou modulaire : ex. 4/8/16/24/32/48/64/96/128px), définie une seule fois en design tokens et réutilisée partout. Ne jamais introduire une valeur d'espacement hors de cette échelle.

## Rythme

Alternance volontaire entre sections denses (contenu, preuve, détails techniques) et sections aérées (respiration, mise en scène du produit, citation, transition). Ce rythme doit donner au scroll une sensation de narration progressive, jamais monotone ni chaotique.

## Marges

Marges extérieures généreuses et cohérentes sur tous les breakpoints — le contenu ne doit jamais toucher les bords de l'écran, y compris sur mobile. Les marges augmentent proportionnellement avec la largeur de l'écran, sans jamais donner un effet de contenu "perdu" sur les très grands écrans.

## Largeur maximale

Une largeur de conteneur maximale définie pour le contenu textuel et les compositions principales, afin d'éviter tout étirement excessif sur les écrans larges. Certains éléments (visuels hero, scènes 3D, mises en situation) peuvent exceptionnellement occuper toute la largeur de la fenêtre pour un effet immersif volontaire — mais jamais le texte courant.

## Équilibre visuel

Chaque écran doit être pensé comme une composition à part entière : équilibre des masses (texte / image / vide), point focal unique et clair, jamais deux éléments de poids visuel égal se disputant l'attention. L'asymétrie maîtrisée est préférable à la symétrie mécanique tant qu'elle reste équilibrée.

---

# 6. Images

## Style photographique

Photographie réaliste, cinématographique, jamais "stock photo" générique. Chaque image doit sembler avoir été prise spécifiquement pour raconter un usage réel de REMOLUX — une situation crédible, pas une mise en scène artificielle.

## Cadrage

Cadrages serrés sur le produit et son point d'usage (fixation magnétique, montage sans outil, feu en action) alternés avec des plans plus larges qui replacent le produit dans son contexte réel (route de nuit, remorque, chantier, bateau). Toujours un cadrage intentionnel, jamais un cadrage "par défaut" centré et plat.

## Éclairage

Éclairage naturel ou golden hour pour les scènes de contexte, éclairage nocturne maîtrisé pour mettre en valeur les LED en action (c'est le cœur de la preuve produit). Contrastes lumineux marqués, jamais de lumière plate ou de flash frontal générique.

## Environnement

Environnements réels et cohérents avec la cible (route, remorque agricole, bateau, chantier, caravane) — jamais de décor neutre ou de studio blanc sauf pour des plans de détail technique très ciblés. L'environnement doit toujours renforcer la promesse de robustesse et d'usage réel.

## Détails

Gros plans assumés sur les détails qui prouvent la qualité : le magnétisme en action, l'étanchéité, la texture du boîtier, la précision du montage. Ces détails sont une preuve silencieuse de qualité, à utiliser systématiquement en soutien des messages clés.

## Profondeur

Toujours rechercher une vraie profondeur de champ (flou d'arrière-plan maîtrisé) pour détacher le produit de son environnement et guider l'œil. Éviter les images plates sans profondeur perceptible.

## Couleurs

Traitement colorimétrique cohérent sur l'ensemble des images du site (même température de couleur, même contraste, même noir), pour que l'ensemble semble issu d'une seule direction artistique et non d'un assemblage hétéroclite de sources différentes.

## Interdiction absolue

Aucune image générique de banque d'images non retravaillée, aucune image dont l'éclairage, le cadrage ou le contexte ne serait pas spécifiquement pensé pour REMOLUX. Une image qui pourrait appartenir à n'importe quelle autre marque n'a pas sa place sur le site.

---

# 7. Rendu 3D

## Philosophie Three.js

Le rendu 3D existe pour une seule raison : **sublimer le produit et clarifier son fonctionnement**, jamais pour impressionner techniquement ou faire la démonstration d'une prouesse WebGL.

- Le produit REMOLUX est toujours la vedette absolue de toute scène 3D. Aucun élément de décor 3D ne doit attirer davantage l'attention que le produit lui-même.
- Le 3D doit servir un objectif précis à chaque usage : montrer la fixation magnétique, illustrer l'étanchéité, révéler un détail de fabrication, permettre une rotation pour inspecter le produit sous tous les angles. Un usage du 3D sans objectif fonctionnel ou narratif clair est à proscrire.
- Matériaux et éclairage 3D doivent respecter la palette et la lumière définies dans ce document (section 3) — reflets froids, halos LED, noir profond en fond.
- Les mouvements de caméra ou de produit doivent être lents, maîtrisés, jamais brusques ou "gadget" (pas de rotation automatique rapide et continue, pas d'effet "wahou" gratuit).
- Le 3D ne doit jamais être un gadget : s'il ralentit la page, s'il n'apporte pas de compréhension supplémentaire du produit, ou s'il complexifie inutilement l'expérience, il ne doit pas être utilisé — un visuel statique de haute qualité est toujours préférable à un 3D non justifié.
- Prévoir systématiquement une version dégradée (image statique ou 3D allégé) pour les appareils ou connexions ne pouvant pas supporter le rendu complet, sans jamais rompre la cohérence de l'expérience perçue.

---

# 8. Animations

## Philosophie GSAP

Chaque animation doit raconter quelque chose : révéler une information, guider l'attention vers l'élément suivant, illustrer une caractéristique du produit (le clic magnétique, l'ouverture, la lumière qui s'allume). Une animation qui ne raconte rien ne doit pas exister.

**Jamais d'animation gratuite.** Avant d'ajouter une animation, se poser la question : *"Que comprend ou ressent le visiteur grâce à cette animation, qu'il n'aurait pas compris ou ressenti sans elle ?"* Si la réponse est vague, ne pas l'ajouter.

## Vitesse

Rythme globalement mesuré et confiant, jamais précipité. Les animations d'entrée de contenu doivent laisser le temps à l'œil de suivre, sans jamais donner une impression de lenteur ou d'attente frustrante.

## Easing

Courbes d'accélération/décélération naturelles et douces (type `power2`/`power3` en ease-out pour les apparitions, ease-in-out pour les transitions d'état). Bannir les easings mécaniques ou "linéaires" qui donnent une sensation artificielle, ainsi que les rebonds ("bounce", "elastic") sauf cas très ponctuel et justifié par un détail ludique de marque.

## Durée

Durées courtes à moyennes pour les micro-interactions (hover, focus, clic), durées plus posées pour les révélations de contenu au scroll. Aucune animation ne doit faire attendre l'utilisateur au point de ralentir sa progression dans la page.

## Fluidité

Priorité absolue à la fluidité perçue (60fps constant). Toute animation qui introduit du jank, un à-coup ou une saccade visible doit être simplifiée ou retirée — la fluidité prime toujours sur la complexité de l'effet.

## Transitions

Transitions cohérentes d'un écran à l'autre, d'un état à l'autre — même vocabulaire d'easing et de durée sur l'ensemble du site, pour donner une sensation de système unifié plutôt que d'effets assemblés au cas par cas.

## Scroll

Les animations liées au scroll (ScrollTrigger) doivent être synchronisées avec Lenis pour rester parfaitement fluides, sans décalage ni latence. Le scroll doit rester l'élément moteur de la narration : chaque section se révèle et se transforme au rythme naturel du geste de l'utilisateur, jamais de façon automatique ou déconnectée de son action.

---

# 9. Icônes

## Style

Icônes en trait fin (line icons), géométriques, épurées — jamais d'icônes pleines ("filled") ou de style illustratif/ludique qui casserait la sobriété de la marque.

## Épaisseur

Épaisseur de trait unique et cohérente sur l'ensemble du site (une seule valeur de stroke-width définie en token), jamais de mélange d'épaisseurs entre icônes d'une même interface.

## Cohérence

Toutes les icônes doivent provenir d'un même système ou être redessinées pour respecter un style unique (mêmes angles, mêmes terminaisons, même grille de construction). Aucune icône "empruntée" à une bibliothèque au style visuellement différent des autres.

## Utilisation

Icônes utilisées uniquement pour clarifier ou accélérer la compréhension (fonctionnalité, caractéristique technique, navigation) — jamais en pure décoration. Toujours accompagnées d'un libellé texte quand leur seule forme pourrait être ambiguë.

---

# 10. Boutons

## Hiérarchie

Deux niveaux maximum : un bouton primaire (l'action principale, notamment le CTA vers Amazon) et un bouton secondaire (action complémentaire, moins prioritaire). Un seul bouton primaire visible à la fois par écran pour ne jamais diluer l'attention.

## Formes

Formes simples, angles cohérents avec le reste du design system (coins nets ou légèrement arrondis selon le token défini, mais jamais un mélange des deux styles). Taille généreuse garantissant une zone tactile confortable, en particulier sur mobile.

## Hover

Effet de hover subtil et physique (légère variation de fond, de bordure ou d'élévation) — jamais de changement brutal de couleur ou de taille. Le hover doit donner une sensation de matière qui répond au geste, pas un simple changement d'état binaire.

## Focus

État de focus clavier toujours visible et distinct (contour ou halo net), conforme aux exigences d'accessibilité — jamais supprimé pour des raisons esthétiques.

## Animation

Micro-animation de retour au clic (légère variation d'échelle ou d'opacité) pour confirmer la prise en compte de l'action, avec une durée très courte pour ne jamais donner une impression de lenteur.

---

# 11. Cartes

## Style

Cartes sobres, fond légèrement différencié du fond de section, sans surcharge décorative. La carte est un contenant discret, jamais un élément qui attire l'attention pour lui-même.

## Ombres

Ombres douces et subtiles, utilisées uniquement pour suggérer une légère élévation par rapport au fond — jamais d'ombres marquées ou multiples qui donneraient un effet "flottant" exagéré.

## Bordures

Bordures fines et discrètes (ou absence de bordure au profit d'un simple contraste de fond), jamais de bordures épaisses ou colorées qui alourdiraient la composition.

## Interactions

Si la carte est interactive (lien, action), prévoir un effet de survol cohérent avec les boutons (section 10) : légère élévation ou variation de fond, jamais de rotation, de zoom excessif ou d'effet spectaculaire.

---

# 12. Sections

Le rythme général d'une page REMOLUX suit une progression narrative claire, pensée comme une histoire qui se déroule au scroll :

```
Hero
  ↓
Problème
  ↓
Solution
  ↓
Fonctionnement
  ↓
Preuves
  ↓
Avis
  ↓
CTA Amazon
```

- **Hero** — accroche immédiate, promesse de marque, premier contact visuel fort avec le produit.
- **Problème** — mise en situation du besoin réel (fixation compliquée, câblage fragile, produits peu fiables) pour créer une résonance immédiate avec le visiteur.
- **Solution** — présentation de REMOLUX comme réponse évidente et supérieure à ce problème.
- **Fonctionnement** — démonstration claire de l'usage (magnétique, sans fil, installation simple), potentiellement appuyée par le 3D et l'animation.
- **Preuves** — éléments de réassurance technique (étanchéité, autonomie, robustesse, certifications) présentés avec sobriété, jamais sous forme de liste marketing agressive.
- **Avis** — preuve sociale, témoignages ou notes, présentés avec authenticité, sans exagération visuelle.
- **CTA Amazon** — invitation claire et confiante à poursuivre l'achat sur Amazon, cohérente avec le ton général du site, jamais pressante ni agressive.

Cette trame peut être adaptée selon les pages, mais la logique narrative (émotion → problème → réponse → preuve → action) doit toujours être respectée.

---

# 13. Ce qu'il ne faut jamais faire

- Jamais d'effet gadget (parallax excessif, particules, effets 3D non justifiés par un objectif produit).
- Jamais de carrousel inutile — préférer une sélection éditoriale claire à un défilement automatique.
- Jamais de popup agressive (interstitiel plein écran, popup à l'entrée, popup à la sortie).
- Jamais d'ombre excessive ou de faux effet de profondeur exagéré.
- Jamais de gradient gratuit sans fonction (dégradé décoratif sans lien avec la lumière du produit).
- Jamais d'animation qui ralentit la navigation ou introduit une saccade perceptible.
- Jamais de surcharge visuelle (trop d'éléments, trop de couleurs, trop de messages simultanés sur un même écran).
- Jamais de texte difficile à lire (contraste insuffisant, taille trop petite, superposition sur image chargée).
- Jamais de couleur ou de style visuel emprunté directement à une marque de référence (Apple, Rivian, DJI, Garmin, Ledlenser) — inspiration de principe uniquement, jamais de copie de forme.
- Jamais de mise en scène produit qui semble artificielle, "stock photo" ou décontextualisée.
- Jamais d'incohérence typographique, de rupture d'échelle ou d'espacement non justifiée entre deux sections.
- Jamais de CTA trompeur, agressif, ou de dark pattern pour pousser vers Amazon.
- Jamais d'élément visuel ajouté "parce que ça fait bien" sans lien avec un des huit objectifs émotionnels de la section 1.

---

# 14. Checklist finale — à utiliser avant toute modification visuelle

La checklist complète (émotion/positionnement, couleur/contraste, typographie, layout, images/3D, animation, composants, structure narrative) est centralisée dans [`checklist.md`](./checklist.md) — voir en particulier les sections 4, 6, 7, 10 et 11. Elle ne doit pas être dupliquée ici.
