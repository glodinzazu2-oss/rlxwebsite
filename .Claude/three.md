# REMOLUX — Guide Officiel Three.js

> Ce document est la référence absolue de tout développement 3D sur le projet REMOLUX. Il complète [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md), [`architecture.md`](./architecture.md) et [`performance.md`](./performance.md).
> L'objectif n'est jamais de faire une démonstration technique. Le rendu 3D doit servir le produit. Toujours. Une scène 3D impressionnante mais qui n'aide pas l'utilisateur à comprendre ou désirer le produit REMOLUX est une scène 3D mal conçue, quelle que soit sa qualité d'exécution.

> **État actuel** : `three` n'est pas encore une dépendance du projet (absent de `package.json`) et `src/webgl/` est vide. Ce document décrit l'architecture cible à appliquer **au moment de l'introduction réelle de Three.js**, pas un système déjà en place. Avant la première scène 3D réelle, valider ce guide par rapport à `architecture.md` section 12 (évaluation de toute nouvelle dépendance) plutôt que de l'appliquer littéralement sans le confronter à l'état du code à ce moment-là.

---

# 1. Philosophie Three.js

## Pourquoi utiliser la 3D

La 3D existe sur REMOLUX pour une seule raison légitime : **montrer ce qu'aucune photo ne peut montrer aussi bien**. Le mécanisme de fixation magnétique, la texture réelle du boîtier sous tous les angles, la simplicité du montage sans outil — autant d'éléments qu'une image statique suggère, mais que la 3D peut prouver, en laissant l'utilisateur inspecter le produit comme s'il le tenait en main.

La 3D transforme une promesse marketing ("facile à installer") en une expérience vérifiable ("je viens de le voir se fixer sous mes yeux, je peux même le faire tourner moi-même").

## Quand utiliser la 3D

- Pour démontrer un mécanisme physique clé du produit (fixation magnétique, étanchéité, ouverture du boîtier).
- Pour permettre une inspection produit à 360° dans un contexte où cette inspection lève une objection réelle (qualité de fabrication, finition, dimensions perçues).
- Pour sublimer une scène hero où le produit doit être la vedette incontestée de l'écran.

## Quand ne pas utiliser la 3D

- Quand une photographie de haute qualité (voir `design.md` section 6) suffit à transmettre la même information avec moins de coût de performance et de complexité.
- Pour un effet purement décoratif sans fonction de démonstration ou de compréhension du produit.
- Sur un écran où l'attention doit rester concentrée sur un texte ou une preuve (ex. section avis) — la 3D y serait une distraction, pas un service.
- Quand la contrainte de performance (appareil bas de gamme, connexion lente) empêcherait un rendu fluide — dans ce cas, un fallback image prend systématiquement le relais (voir section 10).

## Comment la 3D renforce la confiance

Un rendu 3D fluide, précis, sans latence ni artefact visuel est perçu, consciemment ou non, comme une preuve indirecte de la rigueur de la marque : si REMOLUX soigne à ce point la présentation numérique de son produit, l'utilisateur en déduit intuitively que le produit physique reçoit le même niveau d'exigence. À l'inverse, une scène 3D qui rame, qui saccade, ou qui semble "gadget", détruit instantanément cette confiance — la 3D est à double tranchant, et doit donc toujours être traitée avec la plus grande rigueur technique.

**Principe d'arbitrage permanent** : avant d'ajouter ou de modifier un élément 3D, toujours se demander — *"Est-ce que cet élément aide concrètement l'utilisateur à comprendre ou désirer le produit, ou est-ce une démonstration technique qui me flatte moi, développeur, plus qu'elle ne sert la marque ?"*

---

# 2. Architecture Three.js

## Scene

Une scène (`THREE.Scene`) par contexte de démonstration produit, jamais une scène globale unique partagée entre plusieurs sections indépendantes du site. Chaque scène est créée, peuplée, rendue puis détruite dans un cycle de vie clairement délimité par le composant qui la porte.

## Renderer

Un seul `WebGLRenderer` actif à la fois sur la page. Configuration explicite et documentée : `antialias`, `alpha`, `powerPreference` ("high-performance" par défaut, réévalué selon le contexte mobile — voir section 10), `pixelRatio` plafonné (jamais `window.devicePixelRatio` brut sans plafond, pour éviter un coût de rendu disproportionné sur les écrans très haute densité).

## Camera

Une `PerspectiveCamera` par scène, avec des paramètres FOV/near/far documentés (voir section 6). Aucune scène ne doit instancier plusieurs caméras actives simultanément sans raison technique claire (ex. rendu multi-passe).

## Lights

Nombre de lumières strictement limité au nécessaire (voir sections 5 et 9) — chaque lumière ajoutée est un coût de performance et une décision de direction artistique, jamais un ajout par défaut.

## Controls

Les contrôles d'interaction (rotation manuelle du produit, zoom limité) sont implémentés de façon contenue et prévisible — soit via une version restreinte d'`OrbitControls` (bornes strictes de rotation et de zoom), soit via une gestion manuelle du raycasting et du drag pour un contrôle plus fin de l'expérience (voir section 7).

## Loaders

Le chargement des modèles (`GLTFLoader`) et de leurs dépendances (`DRACOLoader`, `KTX2Loader` si textures compressées) est centralisé dans un module dédié, jamais dupliqué à chaque composant. Le chargement est toujours asynchrone, avec gestion explicite des états (en cours, réussi, échoué).

## Managers

Un gestionnaire de ressources (`LoadingManager`) centralise le suivi de progression et la coordination des chargements multiples, permettant d'afficher un état de chargement cohérent (voir `motion.md` section 4 sur le loader) et de déclencher le fallback en cas d'échec.

## Animation

La boucle de rendu (`requestAnimationFrame`) est encapsulée dans le module de scène, jamais globale et implicite. Elle intègre le mixer d'animation (`AnimationMixer`) si des clips sont utilisés (voir section 8), et toute logique GSAP pilotant des propriétés 3D (position, rotation, matériaux).

## Dispose

Chaque scène expose une méthode `dispose()` explicite qui libère intégralement geometries, materials, textures et le renderer lui-même. Cette méthode est appelée systématiquement au démontage du composant porteur — sans exception (cohérent avec `rules.md` et `architecture.md`).

## Organisation des fichiers

```
src/three/
├── core/
│   ├── createRenderer.ts     → configuration centralisée du renderer
│   ├── createCamera.ts       → configuration centralisée de la caméra
│   └── loadingManager.ts     → gestionnaire de chargement partagé
├── loaders/
│   ├── gltfLoader.ts         → instance configurée (Draco/KTX2)
│   └── textureLoader.ts
├── scenes/
│   ├── productHeroScene.ts   → scène dédiée à une démonstration précise
│   └── productMechanismScene.ts
├── materials/
│   └── productMaterials.ts   → définitions PBR réutilisables (voir section 4)
└── utils/
    ├── disposeScene.ts       → helper de nettoyage récursif
    └── deviceCapabilities.ts → détection de capacité (mobile, GPU faible)
```

Chaque scène est un module autonome exposant une interface stable : `init(container)`, `update(delta)`, `dispose()`. Aucun composant UI ne manipule directement les objets Three.js internes à une scène — il communique uniquement via cette interface.

---

# 3. Pipeline Blender → Three.js

## Organisation

Les fichiers sources Blender (`.blend`) sont conservés en dehors du dépôt de code applicatif (stockage dédié aux assets sources), jamais committés dans le projet — seuls les exports optimisés (GLB) intègrent le dépôt, dans `src/assets/models/`.

## Export

- Export au format **GLB** (binaire, GLTF empaqueté) systématiquement préféré au GLTF séparé (JSON + bin + textures), pour limiter le nombre de requêtes réseau et simplifier la gestion de version d'un modèle.
- Avant export : nettoyage de la scène Blender (suppression des objets cachés inutiles, des caméras et lumières de scène de travail non nécessaires au rendu Three.js, des modificateurs non appliqués).
- Application de tous les modificateurs nécessaires (subdivision, miroir) avant export — Three.js ne doit jamais recevoir de géométrie dépendante de modificateurs non résolus.
- Échelle et origine du modèle vérifiées et normalisées avant export (échelle 1:1 cohérente avec les unités du projet, origine centrée de façon prévisible) pour éviter tout ajustement correctif künstlich côté code.

## GLB / GLTF

Le format GLB est la norme du projet pour tout modèle destiné à la production. Le GLTF séparé n'est utilisé qu'en phase de développement/débogage local si l'inspection séparée des textures est utile ponctuellement — jamais livré tel quel en production.

## Draco

Compression géométrique **Draco** appliquée systématiquement sur tout modèle dont le poids brut dépasse un seuil raisonnable (quelques centaines de Ko). Le `DRACOLoader` côté Three.js doit être configuré avec un chemin vers les décodeurs WASM hébergés localement dans le projet (`public/draco/`), jamais dépendant d'un CDN tiers non maîtrisé.

## Compression des textures

- Textures compressées en **KTX2 / Basis Universal** quand le pipeline le permet, pour une décompression GPU native bien plus performante qu'un simple JPEG/PNG décompressé en mémoire.
- À défaut, textures exportées en résolution strictement adaptée à leur usage réel à l'écran (voir section 9) et compressées au format le plus léger disponible sans perte de qualité perceptible.

## Nommage

Convention de nommage stricte et cohérente pour tous les assets 3D : `nom-produit_partie_variante.glb` (ex. `remolux-light_full_v2.glb`). Les noms de matériaux, de meshes et de textures définis dans Blender doivent être explicites et cohérents, car ils sont directement repris dans le code Three.js pour cibler des objets spécifiques de la scène.

## Versions

Chaque révision significative d'un modèle est versionnée explicitement dans son nom de fichier ou son emplacement (jamais d'écrasement silencieux d'un modèle en production sans traçabilité) — cohérent avec les règles Git de `rules.md` : le remplacement d'un asset 3D est un commit atomique et documenté, précisant ce qui a changé et pourquoi.

**Checklist avant intégration d'un nouveau modèle** : géométrie nettoyée et optimisée, échelle/origine normalisées, export GLB compressé Draco, textures à résolution adaptée et compressées, nommage conforme, poids final vérifié et documenté.

---

# 4. Matériaux

## PBR (Physically Based Rendering)

Tous les matériaux du projet suivent une approche PBR, cohérente avec l'objectif de réalisme défini dans `design.md`. Les propriétés physiques (metalness, roughness) sont calibrées pour correspondre fidèlement aux matériaux réels du produit (plastique technique, aluminium brossé, verre de LED).

## `MeshStandardMaterial`

Matériau par défaut du projet pour la grande majorité des surfaces du produit — bon compromis entre réalisme physique et coût de performance. Utilisé pour le boîtier, les éléments plastiques et métalliques standards.

## `MeshPhysicalMaterial`

Réservé aux surfaces nécessitant des propriétés physiques avancées non couvertes par `MeshStandardMaterial` — notamment le **verre de LED** (clearcoat, transmission) ou toute surface avec un revêtement réfléchissant complexe. Son coût de calcul étant supérieur, son usage est limité aux éléments où le réalisme visuel apporte un bénéfice de perception de qualité réel et mesurable.

## Transmission

Utilisée exclusivement pour simuler la translucidité du verre de protection des LED — jamais comme effet décoratif sur d'autres surfaces. La transmission est coûteuse en performance (nécessite un rendu de la scène en arrière-plan) : son usage doit rester limité à une ou deux surfaces clés maximum par scène.

## Metalness / Roughness

Valeurs calibrées par référence photographique réelle du produit, jamais choisies "à l'œil" sans comparaison avec une photo de référence. Une roughness trop faible (surface trop lisse) donne un effet plastique irréaliste ; une metalness mal dosée casse la crédibilité du matériau.

## Normal Maps

Utilisées pour restituer les détails de surface fins (grain du plastique, texture de la fixation) sans alourdir la géométrie réelle. Résolution de la normal map toujours proportionnée à la taille d'affichage réelle de la surface concernée (voir section 9).

## AO (Ambient Occlusion)

Une texture d'AO (idéalement bakée depuis Blender) est utilisée pour renforcer le réalisme des zones de contact et des recoins du produit, sans dépendre uniquement du calcul d'occlusion en temps réel (coûteux). L'AO bakée est préférée à tout effet de post-processing d'occlusion en temps réel pour ce projet.

## Emission

Utilisée exclusivement pour simuler l'allumage réel des LED du produit — c'est l'usage le plus important et le plus symbolique du matériau émissif sur REMOLUX, car il porte directement la promesse de marque (la lumière). Intensité calibrée pour rester crédible (jamais un blanc surexposé qui casserait le réalisme), potentiellement associée à un effet de bloom léger et maîtrisé en post-processing si le budget de performance le permet.

## Quand utiliser chaque matériau — récapitulatif

| Surface | Matériau recommandé |
|---|---|
| Boîtier plastique/métal | `MeshStandardMaterial` |
| Verre de LED | `MeshPhysicalMaterial` (transmission, clearcoat) |
| LED allumée | `MeshStandardMaterial` avec `emissive` calibré |
| Éléments de fixation (aimants) | `MeshStandardMaterial`, metalness élevée |

---

# 5. Lumière

## HDRI

Un environnement HDRI discret et cohérent avec l'univers de marque (voir `design.md`) est utilisé pour les reflets ambiants réalistes sur les surfaces métalliques et le verre — jamais un HDRI générique de studio qui donnerait un rendu "template". Résolution de l'HDRI adaptée au besoin réel (jamais une résolution démesurée pour un simple reflet d'ambiance).

## Directional Light

Une lumière directionnelle principale simule la source de lumière dominante de la scène (cohérente avec l'éclairage nocturne ou golden hour défini dans `design.md`), responsable des ombres portées principales.

## Ambient / Environment Light

Une lumière d'ambiance douce (ou l'environnement HDRI lui-même via `scene.environment`) évite que les zones d'ombre ne soient totalement noires, sans pour autant aplatir le contraste recherché.

## Spot Light

Utilisée avec parcimonie, réservée à un besoin précis de mise en valeur d'un détail du produit (ex. souligner la zone de fixation lors d'une démonstration). Jamais utilisée en lumière principale par défaut.

## Réalisme et contraste

L'éclairage 3D suit strictement la palette et la philosophie de contraste définies dans `design.md` : fond sombre, contraste marqué entre le produit éclairé et son environnement, tons froids cohérents avec l'identité LED de la marque. Le contraste sert la hiérarchie visuelle — le produit doit toujours être l'élément le plus lumineux et le plus net de la composition.

**Nombre de lumières limité** : deux à trois sources lumineuses actives maximum par scène (directionnelle + ambiance/environnement + éventuellement un spot ponctuel), cohérent avec l'exigence de performance (section 9) et l'exigence de sobriété (`design.md`).

---

# 6. Caméra

## FOV

Un champ de vision modéré (typiquement 35° à 50°) est privilégié pour éviter toute distorsion perspective qui déformerait la perception des proportions réelles du produit — un FOV trop large donne une impression "fisheye" qui nuit au réalisme et à la confiance.

## Near / Far

Bornes `near`/`far` calibrées au plus juste de l'échelle réelle de la scène (jamais des valeurs par défaut arbitraires type `0.1` / `1000` sans réflexion), pour optimiser la précision du z-buffer et éviter le z-fighting sur les détails fins du produit.

## Position

Position de caméra initiale choisie pour présenter le produit sous son angle le plus valorisant (cohérent avec les principes de cadrage de `design.md`), jamais une vue frontale plate par défaut.

## Animation

Les mouvements de caméra (introduction de scène, transition entre angles de démonstration) suivent strictement les principes de `motion.md` (section 10) : lents, continus, motivés par un objectif de démonstration, jamais de mouvement rapide ou orbital automatique continu.

## Interaction

Si la caméra répond à une interaction utilisateur (drag pour faire tourner le produit), le mouvement de caméra doit rester borné (limites de rotation verticale et horizontale strictes) pour ne jamais permettre une vue dégradée ou incohérente du produit (vue de dessous non travaillée, vue arrière non texturée si non nécessaire).

## Transitions

Toute transition entre deux positions de caméra (ex. passage d'une vue d'ensemble à un détail) suit les timings et easings définis dans `motion.md` (section 6, `power2`/`power3` selon l'amplitude), jamais un cut instantané qui romprait la continuité perçue.

---

# 7. Interaction

## Hover

Un survol du produit (desktop) peut déclencher une micro-réaction discrète (léger changement de matériau ou de lumière sur la zone survolée) uniquement si cela sert à indiquer une zone interactive — jamais un effet décoratif systématique au survol de toute la scène.

## Drag

La rotation du produit via drag doit suivre fidèlement le geste de l'utilisateur en temps réel, avec un relâchement en douceur (`ease-out`) une fois le geste terminé — cohérent avec `motion.md` section 8. Aucune latence perceptible entre le geste et la réponse visuelle n'est tolérée.

## Rotation

Rotation libre bornée verticalement (pour ne jamais montrer un angle non travaillé du modèle), libre ou bornée horizontalement selon le besoin de démonstration. Aucune rotation automatique continue par défaut sans interaction (cohérent avec `motion.md`, section 14 — jamais de rotation infinie).

## Zoom

Si le zoom est proposé, il reste borné dans une plage raisonnable (jamais un zoom qui traverse la géométrie ou révèle des détails non travaillés du modèle), avec un easing doux à l'approche des limites.

## Raycaster

Utilisé pour détecter les interactions précises avec des zones spécifiques du produit (ex. zone de fixation cliquable pour déclencher une animation de démonstration). Le raycasting est limité aux objets réellement interactifs de la scène (liste explicite), jamais testé contre l'intégralité de la scène par défaut pour des raisons de performance.

## Gestes mobiles

Sur mobile, le drag est adapté au geste tactile (un doigt pour la rotation), sans geste multi-touch complexe non intuitif. Le zoom tactile (pinch), s'il est proposé, ne doit jamais entrer en conflit avec le scroll de la page (voir section 10).

## Desktop

Le curseur peut indiquer visuellement les zones interactives de la scène (changement de curseur au survol d'une zone cliquable), renforçant la découvrabilité de l'interaction sans nécessiter d'instruction textuelle.

## Accessibilité

Toute information essentielle démontrée exclusivement par une interaction 3D doit avoir un équivalent accessible (texte descriptif, image alternative) pour les utilisateurs ne pouvant pas ou ne souhaitant pas interagir avec la scène (voir section 11).

---

# 8. Animation

## GSAP piloté sur objets Three.js

GSAP est utilisé pour animer les propriétés des objets Three.js (position, rotation, échelle, propriétés de matériau comme l'intensité émissive) exactement comme il anime le DOM — même vocabulaire de timing et d'easing (cohérent avec `motion.md`), pour garantir une cohérence totale entre le mouvement 2D de l'interface et le mouvement 3D de la scène produit.

## Mixer / Animation Clips

Pour les animations complexes issues directement de Blender (ex. mécanisme d'ouverture du boîtier, séquence de fixation magnétique), un `AnimationMixer` et des `AnimationClip` exportés depuis Blender sont utilisés plutôt que de recréer manuellement le mouvement en code. Cette approche garantit une fidélité maximale au mouvement mécanique réel conçu par l'équipe produit/3D.

## Interpolation

Les clips d'animation utilisent une interpolation cohérente avec la philosophie de mouvement du projet (transitions douces, jamais de à-coups). Le mixage entre plusieurs clips (si nécessaire) est toujours géré avec un cross-fade progressif, jamais un changement abrupt d'animation.

## Idle (état de repos)

En l'absence d'interaction, la scène peut présenter un mouvement extrêmement subtil (respiration légère de la lumière émissive des LED, très léger flottement de caméra) — cohérent avec `motion.md` section 10, jamais un mouvement assez marqué pour être perçu comme une animation active continue.

## Transitions

Toute transition entre deux états d'animation (ex. produit fermé → produit ouvert) suit les timings de `motion.md` (section 5) et reste toujours interruptible proprement si l'utilisateur interagit pendant la transition (pas de blocage d'interaction pendant une animation en cours).

## Synchronisation

La boucle d'animation Three.js (`requestAnimationFrame`) et les animations GSAP doivent rester synchronisées avec le même référentiel de temps (delta time cohérent), pour éviter tout désalignement entre un mouvement piloté par GSAP et un mouvement piloté par le mixer natif Three.js sur un même objet.

---

# 9. Performance

## GPU

Le budget GPU de chaque scène est pensé dès la conception : nombre de matériaux physiques coûteux (transmission, clearcoat) limité, résolution de rendu adaptée à l'appareil (voir section 10), post-processing utilisé avec la plus grande parcimonie.

## CPU

Le calcul de logique de scène (mise à jour de position, raycasting) reste minimal à chaque frame — éviter tout recalcul coûteux non nécessaire (ex. recalcul de bounding box à chaque frame plutôt qu'une seule fois au chargement).

## Draw Calls

Le nombre de draw calls par scène est surveillé et minimisé : fusion de géométries statiques partageant un même matériau, réduction du nombre d'objets distincts rendus séparément quand c'est pertinent sans nuire à la flexibilité du code.

## Instancing

Si plusieurs occurrences identiques d'un même objet doivent être affichées (cas rare sur REMOLUX, produit généralement affiché en exemplaire unique), `InstancedMesh` est utilisé plutôt que la duplication d'objets individuels, pour réduire drastiquement les draw calls.

## LOD (Level of Detail)

Pour les scènes où le produit peut être vu de très près comme de très loin (rare mais possible selon les mises en situation), plusieurs niveaux de détail géométrique peuvent être définis et permutés selon la distance caméra — à n'implémenter que si un besoin réel de performance le justifie.

## Textures

- Résolution toujours proportionnée à la taille d'affichage réelle maximale de la surface concernée à l'écran — jamais de texture 4K pour un élément affiché en quelques centaines de pixels.
- Compression systématique (KTX2/Basis en priorité, voir section 3).
- Mipmapping activé pour toute texture susceptible d'être vue à distance variable, afin d'éviter l'aliasing et de réduire la bande passante mémoire GPU à distance.

## Compression

Modèles compressés Draco (section 3), textures compressées (KTX2/Basis ou formats compressés classiques à défaut), pour minimiser à la fois le poids réseau et l'empreinte mémoire GPU au décodage.

## Meshes

Nombre de polygones du modèle final calibré au strict nécessaire pour la qualité visuelle requise à l'écran — un modèle destiné au web n'a jamais besoin de la densité polygonale d'un rendu cinéma. Optimisation (retopologie, réduction de polycount) effectuée en amont dans Blender avant export.

## Frustum Culling

Activé par défaut (comportement natif de Three.js) et jamais désactivé sans raison — s'assurer que les bounding boxes/spheres des objets sont correctement calculées pour que le culling fonctionne efficacement.

## Occlusion

Pour les scènes simples de REMOLUX (produit unique, peu d'objets), l'occlusion culling manuelle n'est généralement pas nécessaire — le frustum culling natif suffit. À réévaluer uniquement si une scène future devient significativement plus complexe.

## Animation Loop

La boucle de rendu est systématiquement suspendue (`cancelAnimationFrame`) lorsque la scène sort du viewport (Intersection Observer) ou lorsque l'onglet devient inactif (`document.visibilitychange`) — aucune scène ne doit continuer à consommer des ressources GPU/CPU hors de toute visibilité réelle.

## Renderer

Un seul renderer actif à la fois sur la page (rappel de la section 2) ; `pixelRatio` plafonné (typiquement à 2 maximum même sur des écrans à densité supérieure) pour éviter un coût de rendu disproportionné sans bénéfice visuel perceptible.

## Memory

Surveillance active de la consommation mémoire (textures, géométries) via les outils de profiling (voir section 13) — toute scène qui voit sa consommation mémoire croître au fil du temps sans redescendre indique une fuite à corriger immédiatement.

## Dispose

Rappel absolu (cohérent avec `rules.md` et `architecture.md`) : toute géométrie, matériau, texture et le renderer lui-même doivent être explicitement disposés au démontage de la scène. Aucune exception n'est tolérée sur ce point — c'est la cause la plus fréquente de dégradation progressive de performance sur un site utilisant Three.js.

---

# 10. Mobile

## Différences

Les appareils mobiles disposent d'un GPU, d'un CPU et d'une mémoire significativement plus limités que le desktop, ainsi que d'une contrainte de batterie que le desktop n'a pas. Le rendu 3D sur mobile doit donc être conçu comme un scénario distinct, jamais comme une simple mise à l'échelle du rendu desktop.

## Optimisations

- Résolution de rendu réduite (pixelRatio plafonné plus bas que sur desktop, typiquement 1 à 1.5).
- Post-processing désactivé ou fortement réduit sur mobile (bloom, effets d'ombre avancés).
- Nombre de lumières et complexité des matériaux (transmission, clearcoat) réduits si nécessaire sur les appareils identifiés comme bas de gamme.
- Textures servies en résolution inférieure sur mobile via une détection de capacité, quand le pipeline le permet.

## Fallback

Sur les appareils ne supportant pas WebGL de façon satisfaisante, ou dont les capacités détectées sont insuffisantes pour un rendu fluide, une image statique haute qualité remplace intégralement la scène 3D — cohérent avec `design.md` et `motion.md`. Ce fallback doit être visuellement irréprochable, jamais perçu comme une version "dégradée" au rabais.

## Réduction de qualité

La dégradation de qualité doit toujours être progressive et invisible pour l'utilisateur final (il ne doit jamais "voir" qu'il reçoit une version moins riche) — les ajustements (résolution, ombres, post-processing) sont des décisions techniques internes, jamais des compromis visibles qui trahiraient un manque de soin.

## Gestion batterie

La boucle de rendu est suspendue de façon encore plus stricte sur mobile hors du viewport actif, et le framerate cible peut être plafonné intentionnellement (ex. 30fps au lieu de 60fps pour une scène d'ambiance non interactive) si cela réduit significativement la consommation batterie sans dégrader la perception de qualité pour ce type de contenu spécifique.

---

# 11. Accessibilité

## `prefers-reduced-motion`

Cohérent avec `motion.md` section 13 : lorsque cette préférence est activée, toute animation 3D non essentielle (rotation automatique, mouvements de caméra complexes, animations d'ouverture) est supprimée ou remplacée par un état statique final directement affiché. L'interaction manuelle simple (si elle reste proposée) est conservée mais sans mouvement automatique additionnel.

## Fallback image

Une image statique de haute qualité représentant fidèlement la scène 3D doit systématiquement exister comme alternative — utilisée en cas d'incompatibilité technique, de préférence utilisateur, ou de contrainte de performance (section 10), mais aussi comme contenu alternatif pour les technologies d'assistance qui ne peuvent pas interpréter une scène WebGL.

## Navigation clavier

Si la scène 3D propose une interaction (rotation, zoom, sélection de détail), un équivalent activable au clavier doit exister pour les contrôles essentiels, avec un focus visible et une gestion cohérente avec le reste du site (cohérent avec `rules.md` section Accessibilité).

## SEO

Le contenu d'une scène 3D n'étant pas indexable par les moteurs de recherche, chaque scène doit être accompagnée d'un texte alternatif descriptif ou d'un contenu HTML équivalent (caché visuellement si redondant avec l'image de fallback, mais présent dans le DOM) décrivant ce que la scène démontre, pour préserver la valeur SEO de la page.

## Indexation

Le canvas WebGL lui-même n'apporte aucune valeur d'indexation ; c'est le contenu textuel environnant (titres, descriptions) qui doit porter l'information sémantique de la section, indépendamment de la présence ou non du rendu 3D.

---

# 12. Erreurs interdites

- **Modèles trop lourds** — aucun modèle livré en production sans compression Draco et sans nettoyage préalable de la géométrie ; un modèle "brut" issu de Blender n'a jamais sa place dans le bundle final.
- **Textures 8K** (ou toute résolution disproportionnée) — la résolution doit toujours être calibrée sur la taille d'affichage réelle, jamais choisie "pour être sûr que ce soit net".
- **100 lumières** (ou tout excès de sources lumineuses) — deux à trois lumières actives maximum par scène (section 5).
- **Rotation infinie** — aucune rotation automatique continue sans interaction utilisateur (cohérent avec `motion.md`).
- **Caméra folle** — aucun mouvement de caméra rapide, saccadé, ou non maîtrisé ; tout mouvement suit les timings et easings de `motion.md`.
- **Ombres inutiles** — les ombres dynamiques coûteuses ne sont activées que si elles apportent un bénéfice de réalisme réellement perceptible ; à défaut, une ombre bakée en texture est préférée.
- **Géométries gigantesques** — tout modèle doit être optimisé en polycount avant intégration ; jamais de mesh brut à des millions de polygones pour un objet affiché en quelques centaines de pixels.
- **Fuites mémoire** — aucune scène ne doit être détruite sans un `dispose()` complet de tous ses éléments (section 9).
- **Renderers multiples** — un seul `WebGLRenderer` actif à la fois sur la page ; jamais plusieurs instances simultanées qui se disputeraient les ressources GPU.
- **Post-processing non maîtrisé** — tout effet de post-processing (bloom, SSAO) doit être justifié par un bénéfice visuel réel et son coût de performance mesuré, jamais ajouté "parce que ça existe dans Three.js".
- **Chargement bloquant** — aucun modèle ou texture ne doit être chargé de façon synchrone et bloquante pour le reste de la page ; le chargement 3D est toujours asynchrone et différé (cohérent avec `performance.md`).
- **Absence de fallback** — aucune scène 3D n'est livrée sans un plan de repli fonctionnel en cas d'échec de chargement ou d'incompatibilité (section 10).
- **Interaction non intuitive** — aucune interaction 3D ne doit nécessiter une explication pour être découverte et utilisée.
- **Scène 3D sans fonction claire** — rappel du principe fondateur (section 1) : toute scène 3D sans objectif de démonstration produit clair n'a pas sa place sur le site.

---

# 13. Workflow Three.js

Workflow obligatoire pour toute création ou modification impliquant Three.js sur REMOLUX :

1. **Création** — définir précisément l'objectif de démonstration de la scène (quelle question utilisateur elle répond, quelle preuve elle apporte — cohérent avec `ux.md` section 2) avant toute intégration technique. Vérifier l'existence d'un modèle 3D optimisé et validé (pipeline de la section 3) avant de commencer le développement.
2. **Optimisation** — dès l'intégration initiale, appliquer les principes de la section 9 (compression, résolution de texture, nombre de lumières, draw calls) — l'optimisation n'est jamais reportée à une phase ultérieure "si le temps le permet".
3. **Tests** — vérifier le rendu sur desktop et mobile, sur un appareil réel bas de gamme si possible, en conditions de réseau normal et dégradé. Vérifier explicitement le comportement du fallback (section 10) en simulant une incompatibilité ou une contrainte de performance.
4. **Profiling** — utiliser les outils de profiling (Chrome DevTools Performance panel, Spector.js ou équivalent pour l'inspection WebGL, statistiques de draw calls et de mémoire) pour vérifier objectivement le respect du budget de performance (voir `performance.md`), jamais se fier uniquement à une impression subjective de fluidité.
5. **Validation** — confronter la scène à la checklist complète (section 14) avant de considérer la tâche terminée, en incluant la vérification de `prefers-reduced-motion` et du cleanup mémoire.
6. **Maintenance** — toute mise à jour future du modèle ou de la scène suit le même pipeline (versionnement de l'asset, re-optimisation, re-profiling) — un asset 3D n'est jamais remplacé "à la volée" sans repasser par ce workflow complet.

---

# 14. Checklist Three.js

La checklist complète (intention, architecture, pipeline Blender, matériaux, caméra, animation, performance, mobile, accessibilité, dispose) est centralisée dans [`checklist.md`](./checklist.md) section 7 « Three.js / 3D » — elle ne doit pas être dupliquée ici.
