# REMOLUX — Guide Officiel de Gestion des Assets

> Ce document est la référence absolue de l'organisation, l'optimisation et la maintenance de tous les assets du projet REMOLUX. Il complète l'ensemble des documents existants : [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md), [`architecture.md`](./architecture.md), [`performance.md`](./performance.md), [`three.md`](./three.md), [`copywriting.md`](./copywriting.md) et [`seo.md`](./seo.md).
> Chaque asset du projet doit être organisé, optimisé, cohérent et facilement maintenable — un asset mal géré est une dette technique et visuelle au même titre qu'une ligne de code mal écrite.

---

# 1. Philosophie

## Pourquoi un asset est du code

Une image, un modèle 3D, une police ou un logo n'est pas un simple fichier déposé dans un dossier — c'est une dépendance du projet au même titre qu'un module TypeScript. Il a un poids, un impact sur la performance, un cycle de vie, des règles de nommage et d'organisation, et peut devenir obsolète ou orphelin exactement comme du code mort. Traiter un asset avec moins de rigueur qu'une ligne de code est une incohérence qui, à l'échelle d'un projet entier, produit la même dette technique qu'un code mal architecturé.

## Pourquoi un asset mal organisé ralentit un projet

Un asset introuvable est recréé ou dupliqué inutilement. Un asset mal nommé oblige à l'ouvrir pour comprendre son contenu, perdant un temps qui s'accumule sur des centaines de fichiers. Un asset non optimisé alourdit silencieusement le site à chaque page qui l'utilise, dégradant la performance globale (cohérent avec `performance.md`) sans qu'aucune ligne de code n'ait changé. Un asset orphelin, jamais nettoyé, gonfle le dépôt et sème le doute sur ce qui est réellement utilisé. Une organisation rigoureuse des assets n'est donc pas une question d'ordre esthétique — c'est un facteur direct de vitesse de développement, de performance produit, et de fiabilité du projet dans le temps.

**Principe d'arbitrage permanent** : avant d'ajouter un asset au projet, toujours se demander — *"Cet asset est-il à sa place exacte, nommé sans ambiguïté, optimisé au minimum nécessaire, et sera-t-il facilement retrouvable et compréhensible par quelqu'un d'autre dans six mois ?"*

---

# 2. Arborescence

Organisation stricte et prévisible de tous les assets sources, cohérente avec la structure définie dans `architecture.md` :

```
src/assets/
├── images/          → photographies et visuels raster de contenu (hero, mises en situation, détails produit)
├── icons/           → pictogrammes SVG (interface, fonctionnalités)
├── logos/           → déclinaisons du logo REMOLUX (voir section 5)
├── videos/          → séquences vidéo (démonstration, ambiance)
├── models/          → modèles 3D exportés (GLB, voir section 7)
├── textures/        → textures destinées aux modèles 3D (diffuse, normal, roughness, AO)
├── hdri/            → environnements HDRI pour l'éclairage 3D
├── fonts/           → fichiers de police (WOFF2)
├── audio/           → ressources sonores (si un usage futur est validé — aucun usage par défaut, voir `ux.md`)
└── documents/       → fichiers documentaires non médias (ex. fiches techniques PDF si nécessaires)
```

## Rôle précis de chaque dossier

### `images/`
Photographies et visuels raster destinés au pipeline d'optimisation Astro (`astro:assets`). Organisées en sous-dossiers thématiques si le volume le justifie (`images/hero/`, `images/produit/`, `images/situations/`) — jamais un dossier plat de plusieurs centaines de fichiers sans sous-structure.

### `icons/`
Pictogrammes SVG uniquement (voir section 4). Aucune icône raster (PNG) sauf cas exceptionnel documenté.

### `logos/`
Toutes les déclinaisons officielles du logo REMOLUX (voir section 5), dans un dossier dédié et distinct des autres images, car soumises à des règles d'usage spécifiques.

### `videos/`
Séquences vidéo optimisées pour le web (voir section 6), jamais de rush ou de fichier source non compressé.

### `models/`
Modèles 3D au format GLB, prêts pour l'intégration Three.js (voir section 7 et `three.md`).

### `textures/`
Textures liées aux modèles 3D, organisées par modèle si plusieurs modèles existent (`textures/remolux-light/diffuse.ktx2`), jamais mélangées avec les images de contenu classique de `images/`.

### `hdri/`
Environnements HDRI utilisés pour l'éclairage réaliste des scènes Three.js (cohérent avec `three.md` section 5).

### `fonts/`
Fichiers de police auto-hébergés au format WOFF2 (voir section 8).

### `audio/`
Réservé à un usage futur explicitement validé — REMOLUX ne diffuse aucun son automatique par défaut (cohérent avec `ux.md` section 14).

### `documents/`
Fichiers non médias nécessaires au contenu (fiches techniques, certificats) si le besoin est confirmé — à distinguer strictement des assets visuels.

## `public/`

Seuls les fichiers strictement statiques non destinés à un traitement de build (favicon, `robots.txt`, `sitemap.xml`, décodeurs Draco/KTX2 — voir `three.md` section 3) résident dans `public/`, jamais un asset qui bénéficierait de l'optimisation du pipeline Astro.

**Règle stricte** : tout fichier source Blender, Photoshop, Illustrator ou autre format de travail non destiné à la production est conservé en dehors du dépôt de code (stockage dédié aux fichiers sources), jamais committé dans le projet.

---

# 3. Images

## Quand utiliser chaque format

- **AVIF** — format de sortie prioritaire pour toute photographie ou visuel complexe (mises en situation, détails produit) grâce à son ratio compression/qualité supérieur à tout autre format actuel.
- **WebP** — format de repli automatique pour les navigateurs ne supportant pas encore AVIF, généré systématiquement en complément par le pipeline Astro.
- **PNG** — réservé aux images nécessitant une transparence sans perte et non couvertes efficacement par les formats modernes (rare sur ce projet ; à n'utiliser qu'en dernier recours après évaluation d'AVIF/WebP avec transparence).
- **SVG** — exclusif pour tout élément vectoriel : icônes, logos, illustrations géométriques simples. Jamais de SVG pour une photographie ou un visuel complexe (poids disproportionné et rendu inadapté).
- **JPEG** — évité par défaut sur ce projet ; peut rester en fallback ultime uniquement si la chaîne AVIF/WebP échoue pour une raison technique exceptionnelle et documentée.

## Compression

Toute image passe obligatoirement par le pipeline d'optimisation d'Astro (`astro:assets`), garantissant une compression maximale sans perte de qualité perceptible — aucune image n'est exportée manuellement et placée directement dans le projet en contournement de ce pipeline (cohérent avec `performance.md` section 4).

## Résolutions

Chaque image source est fournie dans une résolution suffisante pour couvrir le plus grand affichage prévu (desktop large), le pipeline générant ensuite automatiquement les variantes de résolution inférieure nécessaires au responsive — jamais une résolution source insuffisante qui obligerait à un agrandissement dégradant la netteté.

## Responsive

Chaque image de contenu significative est servie avec un jeu `srcset`/`sizes` complet (cohérent avec `performance.md` section 4), généré automatiquement par le pipeline Astro à partir d'une seule image source haute résolution — jamais plusieurs fichiers sources distincts gérés manuellement pour chaque taille d'écran.

---

# 4. Icônes

## Organisation

Toutes les icônes résident dans `src/assets/icons/`, organisées à plat ou en sous-dossiers thématiques si leur nombre le justifie (`icons/ui/`, `icons/features/`) — jamais dispersées dans d'autres dossiers d'images.

## Nommage

Nom descriptif du rôle de l'icône, en minuscules, mots séparés par des tirets (`icon-magnetic.svg`, `icon-waterproof.svg`) — jamais un nom générique ou numéroté (`icon1.svg`, `new-icon.svg`).

## SVG

Format exclusif pour toute icône (section 3). Chaque SVG est nettoyé de tout métadonnée inutile (commentaires d'export, attributs superflus issus du logiciel de création) avant intégration au projet.

## Optimisation

Chaque SVG est passé par un outil d'optimisation dédié (type SVGO) avant intégration, pour réduire son poids au strict nécessaire sans altérer son rendu visuel — aucune icône n'est intégrée directement telle qu'exportée par un logiciel de design sans cette étape de nettoyage.

## Cohérence

Toutes les icônes respectent un même style, une même épaisseur de trait, une même grille de construction (cohérent avec `design.md` section 9) — toute icône qui rompt cette cohérence doit être redessinée avant intégration, jamais utilisée telle quelle par facilité.

## Accessibilité

Toute icône porteuse de sens fonctionnel (bouton, action) est accompagnée d'un texte accessible (`aria-label`, texte visuellement masqué, ou libellé visible à proximité) — aucune icône seule, sans alternative textuelle, ne doit porter une action critique de l'interface (cohérent avec `rules.md` section Accessibilité).

---

# 5. Logos

## Versions

Le logo REMOLUX existe en plusieurs versions officielles maintenues dans `src/assets/logos/` : version complète (symbole + nom de marque), version symbole seul (pour les usages compacts), et déclinaisons de couleur associées.

## Couleurs

Version couleur officielle (cohérente avec la palette de `design.md`) comme référence principale, utilisée sur tout fond neutre compatible avec son contraste.

## Monochrome

Une version monochrome (noir ou blanc uni) est disponible pour les contextes où la version couleur ne serait pas suffisamment lisible ou cohérente (impressions, contextes à contrainte de contraste spécifique).

## Fond sombre / fond clair

Deux déclinaisons distinctes et validées sont maintenues : une version optimisée pour affichage sur fond sombre (dominante du site, cohérent avec `design.md` section 3), une version optimisée pour fond clair (sections claires du site). Le choix entre les deux n'est jamais laissé à une simple inversion algorithmique de couleur non validée visuellement.

## Espaces de protection

Une zone de protection minimale (espace vide obligatoire autour du logo, exprimée en proportion de sa propre taille) est respectée dans tout contexte d'intégration, pour garantir que le logo ne soit jamais visuellement écrasé par un élément adjacent.

## Utilisations interdites

- Jamais de déformation (étirement horizontal ou vertical disproportionné) du logo.
- Jamais de recoloration du logo en dehors des versions officiellement validées (section couleurs/monochrome).
- Jamais d'ajout d'effet (ombre portée, contour, dégradé) non prévu dans la version officielle.
- Jamais de rotation du logo.
- Jamais d'utilisation du logo sur un fond dont le contraste ne garantit pas une lisibilité irréprochable.
- Jamais de recréation manuelle approximative du logo à partir d'une capture d'écran ou d'un export dégradé — toujours utiliser le fichier source officiel.

---

# 6. Vidéos

## Compression

Toute vidéo intégrée au site est compressée au maximum sans perte de qualité perceptible avant intégration, jamais un export brut de montage directement déposé dans le projet.

## Codecs

Codec **H.264** comme base de compatibilité universelle, avec une variante **AV1** ou **VP9** (format WebM) en complément si le gain de poids est significatif et le support navigateur suffisant pour l'audience cible — le navigateur sélectionne automatiquement la source la plus efficace via l'élément `<video>` avec sources multiples.

## Résolutions

Résolution source adaptée au plus grand affichage prévu (jamais une résolution supérieure à ce qui sera réellement affiché, ce qui gaspillerait de la bande passante), avec éventuellement plusieurs résolutions disponibles pour une adaptation selon le contexte réseau/appareil.

## Poster

Chaque vidéo dispose d'une image poster (extraite ou dédiée, optimisée selon les règles de la section 3) affichée avant le déclenchement de la lecture — jamais un écran noir ou vide en attente de chargement.

## Autoplay

Aucune vidéo ne démarre automatiquement avec le son (cohérent avec `ux.md` section 14 — jamais de son automatique). Une autoplay silencieuse et en boucle peut être envisagée uniquement pour un usage d'ambiance strictement contextuel et léger, jamais pour du contenu informatif essentiel qui nécessiterait l'attention volontaire de l'utilisateur.

## Streaming

Pour toute vidéo de poids significatif, un chargement progressif natif (`preload="metadata"` par défaut, jamais `preload="auto"` systématique) est utilisé pour éviter de charger l'intégralité de la vidéo avant que l'utilisateur n'ait manifesté l'intention de la regarder.

## Lazy loading

Toute vidéo sous la ligne de flottaison n'est chargée qu'à l'approche du viewport (Intersection Observer), cohérent avec la stratégie de lazy loading générale du site (`performance.md` section 3).

---

# 7. Three.js Assets

Voir [`three.md`](./three.md) pour le guide complet du développement 3D. Cette section couvre spécifiquement la gestion des fichiers d'assets 3D.

## GLB

Format exclusif de livraison des modèles 3D en production (binaire, autoportant) — jamais de GLTF séparé (JSON + textures + bin distincts) livré en production, réservé uniquement au débogage local.

## Textures

Organisées dans `src/assets/textures/`, sous-dossiers par modèle si plusieurs modèles coexistent. Résolution toujours calibrée sur la taille d'affichage réelle maximale de la surface concernée (cohérent avec `three.md` section 9) — jamais de texture surdimensionnée "pour être sûr".

## HDRI

Environnements HDRI dans `src/assets/hdri/`, en résolution raisonnable (jamais une résolution démesurée pour un simple reflet d'ambiance), au format compressé disponible le plus adapté au pipeline Three.js utilisé.

## KTX2

Format de texture compressée prioritaire lorsque le pipeline le permet (décompression GPU native, cohérent avec `three.md` section 3 et `performance.md` section 9) — généré à partir des textures sources via l'outillage Basis Universal dédié.

## Draco

Compression géométrique appliquée systématiquement à tout modèle GLB dont le poids brut dépasse un seuil raisonnable, avec les décodeurs Draco hébergés localement dans `public/draco/` (jamais dépendants d'un CDN tiers non maîtrisé).

## Organisation

```
src/assets/
├── models/
│   └── remolux-light_full_v2.glb
├── textures/
│   └── remolux-light/
│       ├── diffuse.ktx2
│       ├── normal.ktx2
│       ├── roughness.ktx2
│       └── ao.ktx2
└── hdri/
    └── studio-cold-2k.hdr
```

## Versions

Chaque modèle et sa nomenclature intègrent un numéro de version explicite dans le nom de fichier (section 9), jamais un écrasement silencieux d'un asset déjà en production — toute évolution significative d'un modèle 3D est un nouvel export versionné, traçable dans l'historique Git (cohérent avec `rules.md` section Git).

## Pipeline

Le pipeline complet (Blender → export GLB → compression Draco → compression textures KTX2 → intégration Three.js) est documenté et suivi systématiquement pour chaque nouvel asset 3D — jamais une étape sautée "pour gagner du temps", ce qui produirait un asset non conforme aux standards de performance du projet.

---

# 8. Fonts

## Organisation

Fichiers de police dans `src/assets/fonts/`, un sous-dossier par famille si plusieurs familles sont utilisées, nommés clairement par famille et graisse (`inter-regular.woff2`, `inter-semibold.woff2`).

## WOFF2

Format exclusif pour toutes les polices du projet (cohérent avec `performance.md` section 5) — aucun format de police plus lourd (TTF, OTF, WOFF1) n'est livré en production.

## Subsets

Chaque police est réduite au jeu de caractères réellement nécessaire (subsetting), pour minimiser drastiquement le poids du fichier téléchargé — un subset non réalisé sur une police de production est une erreur de performance à corriger systématiquement.

## Fallbacks

Une police de repli système, dimensionnellement proche de la police de marque, est définie explicitement dans chaque déclaration de pile de polices, pour minimiser le décalage visuel (CLS) pendant le chargement (cohérent avec `performance.md` section 5).

## Licences

Chaque police auto-hébergée doit disposer d'une licence explicite et vérifiée autorisant l'usage web et l'auto-hébergement — aucune police n'est intégrée au projet sans vérification préalable de sa licence, et cette licence (ou sa référence) est conservée documentée à proximité des fichiers de police pour traçabilité future.

---

# 9. Nommage

Convention stricte, cohérente sur l'ensemble des types d'assets : **minuscules, mots séparés par des tirets, nom descriptif du contenu réel, jamais de nom générique ou d'export brut.**

## Images

`sujet-contexte-variante.format` — ex. `remolux-light_remorque-nuit.avif`, `hero-produit-desktop.avif`.

## Vidéos

`sujet-contexte.format` — ex. `installation-magnetique-demo.mp4`.

## Modèles GLB

`produit_partie_variante_version.glb` — ex. `remolux-light_full_v2.glb`.

## Textures

`type-de-texture.format`, organisée dans le sous-dossier du modèle concerné — ex. `textures/remolux-light/normal.ktx2`.

## Icônes

`icon-fonction.svg` — ex. `icon-magnetic.svg`, `icon-waterproof.svg`.

**Règle générale de nommage** : le nom d'un fichier doit permettre à quiconque de comprendre son contenu et son usage sans avoir à l'ouvrir. Un nom qui nécessite une ouverture du fichier pour être compris est un nom mal choisi.

---

# 10. Versioning

## Quand remplacer

Un asset est remplacé directement (même nom de fichier) uniquement lorsqu'il s'agit d'une correction mineure ne changeant pas la nature du contenu (recompression, correction de couleur légère) — le remplacement reste tracé par un commit Git explicite et documenté (cohérent avec `rules.md` section Git).

## Quand versionner

Un asset est versionné explicitement dans son nom de fichier (`_v2`, `_v3`) lorsqu'il s'agit d'une évolution significative de son contenu (nouvelle géométrie 3D, nouvelle prise de vue) dont on souhaite pouvoir tracer ou éventuellement restaurer une version précédente au-delà du seul historique Git — notamment pour les assets 3D dont le pipeline de production est plus lourd à reproduire (cohérent avec `three.md` section 3).

## Quand supprimer

Un asset devenu totalement orphelin (aucune référence dans le code ou le contenu du projet) est supprimé sans délai — jamais conservé "au cas où" (cohérent avec `rules.md`, ne jamais laisser de code ou d'asset mort). Une vérification des références est systématiquement effectuée avant suppression.

## Historique

L'historique Git constitue la trace de référence de l'évolution des assets versionnés directement (remplacement de fichier) ; le suffixe de version explicite dans le nom de fichier constitue une trace complémentaire directement visible dans l'arborescence pour les assets à cycle de production long (modèles 3D notamment), sans dépendre d'une consultation de l'historique Git pour comprendre quelle version est active.

---

# 11. Erreurs interdites

- **`IMG_4920.jpg`** (ou tout nom généré automatiquement par un appareil ou un export non retravaillé) — tout fichier doit être renommé selon la convention de la section 9 avant intégration.
- **`texture-final-v8-final.png`** (nommage confus et incohérent) — un seul suffixe de version clair et cohérent (`_v2`, `_v3`), jamais d'empilement de qualificatifs ("final", "final2", "dernier").
- **`logo-new2.svg`** (nom non descriptif et non daté clairement) — chaque déclinaison de logo doit porter un nom explicite de sa variante (couleur, monochrome, fond sombre/clair) selon la section 5, jamais un simple numéro incrémental.
- **Assets dupliqués** — aucun même contenu visuel ou 3D présent sous plusieurs noms ou emplacements différents dans le projet ; un seul asset de référence par contenu.
- **Assets inutilisés** — aucun fichier présent dans le dépôt sans référence active dans le code ou le contenu ; vérification et nettoyage réguliers (section 10).
- **Fichiers énormes** — aucun asset livré en production sans être passé par son pipeline d'optimisation dédié (images, vidéos, modèles 3D, polices) ; un poids anormalement élevé doit toujours déclencher une vérification avant intégration.
- **Fichiers sources committés** — aucun fichier `.blend`, `.psd`, `.ai`, ou autre format de travail non destiné à la production ne doit être committé dans le dépôt de code (section 2).
- **Résolution disproportionnée** — aucune image, texture ou HDRI en résolution supérieure à son besoin d'affichage réel maximal.
- **Format inadapté** — aucun SVG utilisé pour une photographie, aucun PNG utilisé par défaut là où AVIF/WebP suffiraient, aucun format de police autre que WOFF2 en production.
- **Absence de texte alternatif** — aucune icône ou image porteuse de sens intégrée sans son équivalent accessible (`alt`, `aria-label`).
- **Logo déformé ou modifié** — aucune utilisation du logo en dehors des règles strictes de la section 5.
- **Vidéo avec son automatique** — aucune vidéo ne démarre avec le son activé sans action explicite de l'utilisateur.
- **Absence de licence vérifiée** — aucune police ou asset tiers intégré sans vérification et documentation de sa licence d'usage.

---

# 12. Workflow Assets

Workflow obligatoire pour toute création, modification ou intégration d'un asset sur REMOLUX :

1. **Création** — produire ou obtenir l'asset source en qualité maximale exploitable (photographie haute résolution, modèle 3D propre, police complète) avant toute étape d'optimisation.
2. **Optimisation** — appliquer systématiquement le pipeline d'optimisation approprié au type d'asset (compression image, compression vidéo, compression Draco/KTX2 pour la 3D, subsetting pour les polices) — jamais d'intégration d'un asset non optimisé, même "temporairement".
3. **Validation** — vérifier visuellement le résultat optimisé (absence d'artefact de compression visible, fidélité colorimétrique, netteté suffisante) avant intégration au projet.
4. **Intégration** — placer l'asset dans l'arborescence correcte (section 2), le nommer selon la convention (section 9), et l'intégrer au code en respectant les règles spécifiques à son type (sections 3 à 8).
5. **Maintenance** — vérifier périodiquement l'absence d'assets orphelins ou dupliqués (section 10), et re-optimiser tout asset ancien qui ne respecterait plus les standards actuels du pipeline (ex. un ancien format non converti en AVIF/KTX2).

Aucun asset n'est considéré comme intégré tant que l'intégralité de ce workflow n'a pas été suivie.

---

# 13. Checklist Assets

La checklist complète (organisation, nommage, format, optimisation, accessibilité/SEO, logos, vidéos, assets 3D, licences, versioning) est centralisée dans [`checklist.md`](./checklist.md) section 9 « Assets » — elle ne doit pas être dupliquée ici.
