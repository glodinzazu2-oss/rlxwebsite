# REMOLUX — Guide Officiel de l'Expérience Utilisateur (UX)

> Ce document est la référence absolue de toute décision UX sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md) (vision, mission, ADN de marque), [`rules.md`](./rules.md) (règles techniques strictes) et [`design.md`](./design.md) (direction artistique).
> Une belle interface ne suffit pas. L'objectif de ce document est que chaque décision — texte, ordre des sections, timing d'une animation, position d'un CTA — soit prise pour produire un effet psychologique précis chez le visiteur. Aucune décision d'interface ne doit être arbitraire.

---

# 1. Philosophie UX

**Le site ne vend pas. Le site rassure. Le site démontre. Le site crée le désir. Le site envoie ensuite vers Amazon.**

Cette phrase est le fondement de toute décision UX du projet. Elle doit être relue avant chaque arbitrage.

Concrètement, cela signifie :

- Le site n'a pas vocation à "convaincre" par l'argumentation commerciale (promotions, urgence, comparatifs prix). Il a vocation à **rassurer** un visiteur déjà en recherche active d'une solution fiable.
- Le site **démontre** plutôt qu'il n'affirme. Chaque promesse (robustesse, étanchéité, simplicité d'installation) doit être montrée en situation — visuellement, par le mouvement, par le détail — jamais seulement écrite en toutes lettres.
- Le site **crée le désir** par la qualité de l'expérience elle-même : la fluidité du scroll, la précision du 3D, la beauté des mises en situation deviennent une preuve indirecte de la qualité du produit physique.
- Le site n'est **jamais le point de conversion final**. Le CTA vers Amazon est un aboutissement naturel du parcours émotionnel, pas une extraction forcée. L'utilisateur doit avoir l'impression de décider de cliquer, pas d'y être poussé.
- Chaque écran doit répondre à une question implicite : _"Est-ce que ce que je vois renforce ma confiance dans cette marque, ou est-ce que ça me fait douter ?"_ Si un élément ne répond pas positivement à cette question, il ne doit pas exister sur le site.

L'UX de REMOLUX doit se lire comme celle d'un produit qui n'a rien à prouver par la pression commerciale — seulement par l'évidence de sa qualité.

---

# 2. Psychologie utilisateur

## Ce que pense l'utilisateur lorsqu'il arrive

Le visiteur arrive généralement avec une intention déjà formée : il a un besoin concret (feux de remorque fiables, pratiques, sans câblage complexe) et cherche une confirmation ou une découverte de solution. Il n'est ni un curieux passif, ni un acheteur impulsif — c'est un utilisateur pragmatique, souvent technique, qui a déjà été déçu par des produits génériques.

## Ses peurs

- "Est-ce que ça va vraiment tenir sur la route, dans le vent, sous la pluie ?"
- "Est-ce que ça va se décharger ou se décrocher au pire moment ?"
- "Est-ce encore un produit chinois générique renommé, avec un packaging soigné mais un produit médiocre ?"
- "Est-ce que l'installation va être aussi compliquée que ce qu'on me promet toujours ?"
- "Est-ce que je vais perdre mon temps et mon argent si ça ne fonctionne pas avec ma remorque / mon véhicule ?"

## Ses objections

- "Je peux trouver moins cher ailleurs."
- "Je ne suis pas sûr que ce soit compatible avec mon usage (agricole, marine, utilitaire)."
- "Un produit magnétique et sans fil, est-ce que ce n'est pas justement moins fiable qu'un branchement classique ?"
- "Pourquoi devrais-je faire confiance à cette marque que je ne connais pas encore ?"

## Ses questions

- Comment ça s'installe concrètement ?
- Combien de temps tient la batterie / l'autonomie ?
- Est-ce vraiment étanche, résistant aux chocs, aux vibrations de la route ?
- Est-ce que d'autres utilisateurs réels en sont satisfaits ?
- Où et comment puis-je l'acheter en toute sécurité ?

## Ses attentes

- Une réponse rapide et claire à ses objections, sans avoir à chercher l'information.
- Une preuve visuelle et concrète, pas seulement des promesses marketing.
- Un chemin d'achat évident et sans friction une fois convaincu.
- La sensation de traiter avec une marque sérieuse et pérenne, pas un site éphémère.

## Comment chaque section du site répond progressivement à ces questions

1. **Hero** — répond à "qu'est-ce que c'est et est-ce que ça a l'air sérieux ?" par une accroche nette et une image/3D immédiatement qualitative.
2. **Problème** — répond à "est-ce que cette marque comprend vraiment ma situation ?" en verbalisant les frustrations réelles (câblage, fragilité, installation).
3. **Solution** — répond à "en quoi c'est différent ?" en présentant REMOLUX comme la réponse logique et supérieure.
4. **Fonctionnement** — répond à "comment ça marche concrètement, est-ce que c'est vraiment simple ?" par une démonstration visuelle claire (3D, animation du système magnétique).
5. **Preuves** — répond aux peurs de robustesse et de fiabilité (étanchéité, autonomie, résistance) par des preuves concrètes, pas des slogans.
6. **Avis** — répond à "est-ce que d'autres utilisateurs réels confirment ?" par une preuve sociale authentique.
7. **CTA Amazon** — répond à "comment et où puis-je l'acheter en confiance ?" en s'appuyant sur la crédibilité déjà acquise d'Amazon comme plateforme d'achat sécurisée.

Chaque section doit désamorcer une objection précise avant que le visiteur ne l'ait consciemment formulée — c'est ce qui produit la sensation de fluidité et de confiance.

---

# 3. Parcours utilisateur

```
Arrivée
  ↓
Curiosité
  ↓
Compréhension
  ↓
Confiance
  ↓
Projection
  ↓
Preuves
  ↓
Décision
  ↓
CTA Amazon
```

## Description de chaque étape

**Arrivée** — Les deux premières secondes déterminent tout. L'utilisateur doit immédiatement percevoir un niveau de finition supérieur à ce qu'il a l'habitude de voir sur ce marché. Aucune information n'est encore lue en détail à ce stade — seule l'impression globale (qualité perçue, sobriété, produit visible) compte.

**Curiosité** — L'accroche du hero et le premier geste de scroll doivent donner envie d'en savoir plus, sans encore chercher à convaincre. C'est le moment où l'on capte l'attention par une promesse forte et un visuel intrigant (le produit en action, un détail qui interpelle).

**Compréhension** — L'utilisateur commence à saisir concrètement ce qu'est le produit, à quoi il sert, comment il s'installe. Cette étape doit être la plus limpide possible : aucune ambiguïté sur la nature du produit ou son usage.

**Confiance** — Les preuves de robustesse, la qualité des visuels, la cohérence du site construisent progressivement la certitude que la marque est sérieuse et fiable. C'est l'étape charnière du parcours.

**Projection** — L'utilisateur commence à s'imaginer utiliser le produit dans son propre contexte (sa remorque, son bateau, son exploitation). Les mises en situation variées et réalistes servent directement cette étape.

**Preuves** — Les éléments factuels (autonomie, étanchéité, avis clients, détails techniques) viennent consolider rationnellement ce que l'émotion a déjà construit.

**Décision** — L'utilisateur est prêt intérieurement ; il n'a plus besoin d'être convaincu, seulement guidé vers l'action suivante de façon évidente.

**CTA Amazon** — Le passage vers Amazon doit se faire comme une suite naturelle et non comme une rupture — le ton, la clarté et la confiance construites tout au long du parcours doivent se prolonger jusqu'au clic final.

Chaque section du site doit être mappée consciemment sur une (ou plusieurs) de ces étapes psychologiques — jamais construite indépendamment de ce parcours.

---

# 4. Hiérarchie de l'information

## Ce qui doit être vu en premier

Le produit lui-même (visuel ou 3D) et la promesse centrale de marque (accroche hero). Rien ne doit rivaliser avec ces deux éléments à l'arrivée sur une page.

## Ce qui vient ensuite

Les bénéfices clés reformulés depuis la douleur utilisateur (simplicité d'installation, robustesse, liberté sans fil), puis la démonstration de fonctionnement.

## Ce qui est secondaire

Les détails techniques précis (spécifications, certifications, compatibilité), les avis clients détaillés, les informations complémentaires — accessibles mais jamais imposés en premier plan.

## Ce qui est caché (ou différé)

Les mentions légales, les informations logistiques (livraison, retours — gérées par Amazon), les détails redondants avec la fiche Amazon. Ces éléments doivent exister quelque part (footer, page dédiée) mais ne jamais interrompre le parcours principal.

## Ce qui ne doit jamais distraire

Aucun élément décoratif, aucune animation, aucun bloc promotionnel ne doit capter l'attention au détriment du produit ou du message en cours. Toute information qui n'aide pas directement à avancer dans le parcours (section 3) est une distraction et doit être reléguée ou supprimée.

**Règle d'arbitrage** : à chaque ajout d'information ou d'élément visuel, se demander _"est-ce que ceci aide l'utilisateur à avancer d'une étape du parcours, ou est-ce que ça le retient sans raison ?"_

---

# 5. Règles de navigation

## Menus

Menu minimal, quelques entrées maximum, jamais de méga-menu ou de sous-navigation complexe. La navigation ne doit jamais donner l'impression d'un site à explorer, mais d'un récit à suivre.

## Scroll

Le scroll est le mode de navigation principal et privilégié. Il doit être fluide (Lenis), continu, et raconter une progression — jamais interrompu par des ruptures de rythme ou des chargements visibles.

## Retour

Le retour en haut de page ou vers une section précédente doit toujours être possible simplement (scroll inverse, ancre de menu) sans jamais dépendre du bouton "retour" du navigateur comme unique solution.

## CTA

Le CTA vers Amazon doit rester accessible à tout moment (idéalement via un élément persistant discret, ex. bouton flottant ou barre de navigation) sans jamais devenir intrusif ou omniprésent au point de sembler insistant.

## Footer

Le footer regroupe les informations secondaires (mentions légales, contact, liens annexes) et peut réitérer une dernière fois, sobrement, l'invitation vers Amazon — sans dupliquer agressivement le CTA principal.

## Liens

Les liens internes sont rares et intentionnels (ancres vers des sections). Les liens externes (Amazon) doivent être clairement identifiables comme menant hors du site, sans effet de surprise pour l'utilisateur.

## Ancres

Utilisées pour permettre un accès rapide depuis un menu compact vers une section spécifique (ex. "Fonctionnement", "Avis") — toujours avec un défilement fluide et non un saut brutal.

## Navigation mobile

Menu réduit à l'essentiel, accessible en un geste (icône burger ou barre fixe minimaliste), CTA toujours atteignable sans avoir à ouvrir un menu. Priorité à la simplicité du pouce.

## Navigation desktop

Peut se permettre une barre de navigation légèrement plus riche (ancres visibles directement), mais reste toujours minimale — jamais plus de 4 à 5 entrées visibles.

---

# 6. Lisibilité

## Longueur idéale des phrases

Phrases courtes et directes, 8 à 15 mots en moyenne. Une phrase longue doit être scindée si elle peut l'être sans perte de sens.

## Longueur idéale des paragraphes

2 à 4 lignes maximum sur desktop, encore plus court sur mobile. Un paragraphe = une idée. Jamais d'accumulation de plusieurs arguments dans un seul bloc de texte.

## Rythme

Alternance entre texte, visuel et espace vide pour éviter toute sensation de mur de texte. Le rythme de lecture doit suivre le rythme du scroll, jamais l'inverse.

## Espacement

Interlignage confortable, espacement généreux entre les blocs de texte et les éléments visuels environnants, cohérent avec les tokens définis dans `design.md`.

## Densité d'information

Densité volontairement faible : mieux vaut trois messages clairs et mémorables que dix informations diluées. La rareté de l'information renforce sa perception de valeur.

## Contraste

Contraste texte/fond toujours conforme WCAG AA (voir `rules.md`), y compris sur les visuels ou fonds sombres avec superposition de texte — jamais de texte sur image sans garantie de lisibilité (overlay si nécessaire).

## Lecture mobile

Le texte doit rester pleinement lisible sans zoom, avec une taille de police jamais réduite pour "faire tenir" plus de contenu — c'est la quantité de texte qui doit s'adapter à l'écran, jamais sa lisibilité.

---

# 7. Gestion de l'attention

L'œil de l'utilisateur ne doit jamais avoir à "chercher" où regarder — il doit être guidé sans effort conscient.

## Espaces

Le vide autour d'un élément agit comme un projecteur : plus un élément est entouré d'espace, plus il capte naturellement l'attention. Utiliser l'espace comme outil de guidage, pas seulement d'esthétique.

## Mouvement

L'œil humain est naturellement attiré par le mouvement. Une animation subtile peut donc être utilisée intentionnellement pour orienter l'attention vers l'élément qui doit être vu à un instant donné — mais seulement un mouvement actif à la fois sur un écran.

## Contraste

Un contraste de couleur, de taille ou de forme plus marqué signale l'importance. La hiérarchie visuelle doit toujours refléter fidèlement la hiérarchie de l'information définie en section 4.

## Animation

Les animations d'apparition au scroll doivent introduire les éléments dans l'ordre exact dans lequel ils doivent être lus/compris — jamais un ordre d'apparition qui contredit la hiérarchie logique du contenu.

## Taille

La taille relative des éléments doit toujours correspondre à leur importance réelle — un titre secondaire ne doit jamais visuellement dominer un titre principal.

## Ordre visuel

L'ordre de lecture naturel (haut vers bas, gauche vers droite en contexte occidental) doit être respecté et exploité — ne jamais forcer un parcours visuel non intuitif sans raison forte.

---

# 8. Gestion de la confiance

Tout, dans l'expérience, doit accumuler silencieusement de la confiance, seconde après seconde.

- **Preuves** — démonstrations concrètes (résistance, étanchéité, autonomie) toujours préférées aux affirmations non étayées.
- **Photos** — qualité photographique irréprochable et cohérente (voir `design.md` section 6) : une photo médiocre détruit plus de confiance qu'elle n'en construit.
- **Qualité** — chaque détail d'exécution (alignement, typographie, transition) est perçu, consciemment ou non, comme un indicateur de la qualité du produit physique lui-même.
- **Cohérence** — un site visuellement et tonalement cohérent d'un bout à l'autre rassure ; la moindre incohérence (style, ton, rythme) sème un doute diffus.
- **Performance** — un site rapide est perçu comme un site fiable ; la lenteur est immédiatement associée, même inconsciemment, à un manque de sérieux.
- **Rapidité** — les réponses aux questions de l'utilisateur (comment ça marche, est-ce robuste) doivent arriver vite dans le parcours, sans le faire chercher.
- **Stabilité** — aucune surprise, aucun changement brusque de mise en page, aucun élément qui saute ou clignote de façon inattendue.
- **Honnêteté** — aucune exagération, aucune promesse non démontrable, aucun avis ou preuve qui semble fabriqué. La confiance se construit sur la sincérité perçue autant que sur la qualité visuelle.

---

# 9. Gestion des émotions

Chaque section du parcours doit viser une émotion dominante précise :

- **Hero** — impact, curiosité immédiate, impression de sérieux et de maîtrise.
- **Découverte** — intérêt grandissant, sentiment que la marque comprend un vrai problème vécu.
- **Démonstration** — clarté et soulagement ("ah, c'est aussi simple que ça").
- **Fonctionnement** — admiration technique discrète, sentiment de logique et d'intelligence de conception.
- **Comparaison** (implicite, jamais frontale envers un concurrent nommé) — supériorité perçue naturelle, sans avoir besoin de dénigrer.
- **CTA** — confiance tranquille, sentiment de décision libre et éclairée, jamais de pression ni d'urgence.
- **Footer** — sérénité, impression de clôture professionnelle, dernière confirmation du sérieux de la marque.

Aucune section ne doit chercher à provoquer l'urgence, la peur de manquer une offre (FOMO), ou une émotion négative forte — le registre émotionnel de REMOLUX reste toujours maîtrisé et positif.

---

# 10. Gestion des CTA

## Quand

Le premier CTA peut apparaître dès le hero (discret, secondaire), mais le CTA principal ne doit être poussé avec force qu'une fois la confiance suffisamment construite (après les sections Fonctionnement/Preuves), et systématiquement répété en fin de parcours.

## Où

Positionné à des points de rupture naturels du parcours (fin de section clé, fin de page) et de façon persistante mais discrète (ex. bouton flottant léger), jamais superposé de force sur un contenu en cours de lecture.

## Comment

Toujours formulé comme une invitation claire et confiante, jamais comme une injonction. Le geste de clic doit sembler être le choix naturel de l'utilisateur, pas une extraction forcée.

## Combien

Un nombre volontairement limité de CTA par page — répétition du même CTA principal à des points stratégiques, jamais multiplication de CTA différents qui diluerait la décision.

## Taille

Suffisamment visible pour être trouvé immédiatement quand l'utilisateur est prêt à agir, sans jamais dominer excessivement l'écran ni écraser le contenu environnant.

## Importance

Un seul CTA de niveau primaire visible à la fois (cohérent avec `design.md` section 10) — tout autre CTA présent reste visuellement secondaire.

## Texte

Formulation claire, orientée action et bénéfice ("Voir sur Amazon", "Découvrir le produit"), jamais de formulation artificielle d'urgence ("Achetez maintenant !", "Offre limitée").

## Animation

Micro-interaction de confirmation au survol/clic (cf. `design.md` section 10), jamais d'animation attractive agressive (clignotement, pulsation permanente, secousse).

**Rappel fondamental : le CTA ne doit jamais être agressif.** Sa force vient de la confiance déjà construite en amont du parcours, jamais d'une pression exercée sur l'instant.

---

# 11. Mobile

Règles Mobile First strictes, cohérentes avec `CLAUDE.md` et `rules.md` :

- Conception et rédaction pensées d'abord pour l'écran mobile, puis étendues — jamais l'inverse.
- Un seul message central par écran mobile ; la densité d'information doit être encore plus réduite qu'en desktop.
- Zones tactiles généreuses (minimum 44x44px), espacées suffisamment pour éviter les clics accidentels.
- CTA toujours atteignable sans effort, idéalement accessible sans scroll excessif ni ouverture de menu.
- Scroll fluide et naturel comme mode de navigation quasi exclusif — pas de gestes complexes ou non standards attendus de l'utilisateur.
- Poids des ressources (images, 3D, animations) strictement maîtrisé pour garantir une fluidité parfaite même sur connexion mobile modeste.
- Texte toujours lisible sans zoom, jamais réduit pour économiser de l'espace vertical.
- Les mises en situation et preuves doivent rester tout aussi impactantes en format vertical qu'en format large desktop — repenser le cadrage plutôt que rétrécir simplement le visuel desktop.

---

# 12. Desktop

Le desktop permet d'enrichir l'expérience sans jamais la complexifier :

- Compositions plus larges, permettant des mises en page asymétriques et une respiration visuelle accrue.
- Le rendu 3D et les animations peuvent être plus ambitieux qu'en mobile (plus de détails, interactions à la souris comme le survol ou le drag de rotation produit).
- La navigation peut afficher davantage d'ancres directement visibles, réduisant le besoin d'ouvrir un menu.
- Les zones de texte peuvent s'organiser en colonnes ou en compositions texte/image côte à côte, impossibles en mobile.
- Le curseur permet des micro-interactions supplémentaires (hover riches, effets de parallaxe légers) qui n'existent pas sur mobile — toujours dans le respect des règles d'animation de `design.md`.
- Malgré ces possibilités élargies, le principe de sobriété et de hiérarchie unique reste strictement identique au mobile : plus d'espace ne signifie jamais plus de contenu simultané, mais plus de respiration autour du même contenu essentiel.

---

# 13. Accessibilité UX

Au-delà de la conformité technique WCAG AA (voir `rules.md`), l'accessibilité UX vise à réduire tout effort inutile imposé à l'utilisateur :

## Fatigue visuelle

Contrastes équilibrés (ni trop plats, ni éblouissants), pas de scintillement, pas d'animation continue en arrière-plan qui solliciterait l'attention en permanence.

## Charge cognitive

Un seul choix ou une seule action possible à la fois par écran. Jamais plusieurs décisions à prendre simultanément (plusieurs CTA concurrents, plusieurs messages à hiérarchiser soi-même).

## Simplicité

Chaque interaction doit être compréhensible sans explication. Si un élément nécessite une notice d'usage pour être compris, il est mal conçu et doit être repensé.

## Rapidité

Le temps entre l'intention de l'utilisateur ("je veux comprendre X" ou "je veux agir") et la satisfaction de cette intention doit être minimal — pas de détour, pas d'étape superflue.

## Clarté

Un langage direct, sans jargon technique inutile, des libellés de bouton explicites, une structure d'information prévisible d'une section à l'autre.

---

# 14. Les erreurs UX interdites

- Jamais de popup (entrée, sortie, scroll, newsletter forcée).
- Jamais de formulaire inutile ou de collecte de données non indispensable.
- Jamais de carrousel automatique (perte de contrôle utilisateur, contenu manqué).
- Jamais de surcharge visuelle ou informationnelle sur un même écran.
- Jamais de distraction non liée à la progression du parcours utilisateur.
- Jamais de texte inutile ou redondant ("blabla" marketing sans valeur ajoutée).
- Jamais de jargon technique ou marketing incompréhensible pour l'utilisateur cible.
- Jamais de faux boutons (éléments visuellement cliquables mais inertes, ou inversement des zones cliquables non identifiables comme telles).
- Jamais de dark patterns (case pré-cochée, CTA trompeur, faux compte à rebours, fausse urgence, opt-out caché).
- Jamais de clic surprise (redirection inattendue, ouverture d'onglet non annoncée, action déclenchée sans intention claire de l'utilisateur).
- Jamais de contenu qui bouge ou se réorganise pendant la lecture (CLS, layout shift) sans raison volontaire et maîtrisée.
- Jamais de chargement visible et non maîtrisé (spinner long, contenu qui saute une fois chargé).
- Jamais de navigation qui piège l'utilisateur (impossible de revenir en arrière facilement, ancre qui casse le scroll naturel).
- Jamais de contenu qui interrompt le scroll de force (auto-scroll, snap agressif non désiré).
- Jamais de son ou de vidéo qui se déclenche automatiquement avec le son activé.
- Jamais d'information cruciale masquée derrière une interaction non évidente (accordéon caché, tooltip introuvable).

---

# 15. Checklist UX

La checklist complète (philosophie/intention, hiérarchie et attention, navigation, lisibilité, confiance et émotion, CTA, mobile/desktop, accessibilité UX, erreurs interdites) est centralisée dans [`checklist.md`](./checklist.md) section 15 « UX » — elle ne doit pas être dupliquée ici.
