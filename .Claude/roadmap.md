# REMOLUX — Feuille de Route Officielle

> Ce document complète l'ensemble des guides existants du projet, notamment [`CLAUDE.md`](./CLAUDE.md), [`brand.md`](./brand.md), [`architecture.md`](./architecture.md), [`decisions.md`](./decisions.md) et [`testing.md`](./testing.md). Contrairement à ces guides qui décrivent le présent du projet, ce document décrit son **évolution future** — la direction stratégique dans laquelle REMOLUX doit grandir, et les critères qui doivent gouverner chaque décision d'évolution.
> Les phases décrites ici sont des orientations, jamais des engagements de dates.

---

# 1. Vision

## À quoi doit ressembler REMOLUX dans plusieurs années

Dans plusieurs années, REMOLUX doit être devenue une référence silencieuse et reconnue dans sa catégorie — le site que l'on montre en exemple lorsqu'on veut illustrer ce qu'une marque d'accessoires techniques peut accomplir en matière d'expérience numérique premium, sans jamais avoir eu besoin de sacrifier sa simplicité fondatrice pour y parvenir.

Le site aura grandi en profondeur (plus de produits, plus de contenus, plus de preuves) sans jamais avoir grandi en complexité perçue par l'utilisateur — chaque nouvel ajout aura été un raffinement de la mission initiale (`CLAUDE.md`, `brand.md`), jamais une dilution. REMOLUX restera reconnaissable, cohérente, et fidèle à son ADN à chaque étape de sa croissance — la marque de demain doit être une version plus riche et plus mûre de la marque d'aujourd'hui, jamais une marque différente.

Techniquement, REMOLUX doit rester un projet dont l'architecture (`architecture.md`) et les décisions fondatrices (`decisions.md`) tiennent toujours la charge de cette croissance sans réécriture majeure — la preuve, a posteriori, que les choix structurants faits au démarrage étaient les bons.

---

# 2. Principes

Ces principes gouvernent toute décision d'évolution du projet, sans exception :

## Qualité avant quantité

Une seule section parfaitement exécutée vaut toujours mieux que trois sections médiocres. Aucune évolution n'est justifiée par le seul besoin d'avoir "plus" de contenu ou de fonctionnalités — chaque ajout doit atteindre le même niveau d'exigence que l'existant, ou ne pas être fait.

## Simplicité avant fonctionnalités

Une nouvelle fonctionnalité qui complexifie l'expérience sans bénéfice proportionnel n'a pas sa place sur REMOLUX, même si elle est techniquement réalisable et demandée. La simplicité du parcours utilisateur (`ux.md`) reste un actif plus précieux que la richesse fonctionnelle.

## Performance avant effets

Aucune évolution visuelle, animée ou 3D n'est validée si elle dégrade la performance du site en deçà des objectifs définis dans `performance.md`. Un effet impressionnant qui coûte la fluidité globale du site n'est jamais un progrès, c'est une régression déguisée.

## Cohérence avant nouveauté

Toute évolution doit d'abord être cohérente avec l'identité de marque (`brand.md`), la direction artistique (`design.md`) et l'expérience (`ux.md`) déjà établies — la nouveauté pour elle-même n'est jamais une justification suffisante. REMOLUX n'a pas vocation à suivre les tendances du moment ; elle a vocation à rester fidèle à ce qu'elle est.

**Ces quatre principes sont hiérarchiquement supérieurs à toute demande ponctuelle d'évolution** — une idée qui contredit l'un d'eux doit être reformulée ou abandonnée, indépendamment de son intérêt apparent à court terme.

---

# 3. Priorisation

## Méthode

Chaque évolution proposée est évaluée selon cinq critères, notés qualitativement (faible / moyen / fort), avant toute décision de priorisation :

### Impact utilisateur

Dans quelle mesure cette évolution répond-elle à un besoin, une objection ou une question réelle de l'utilisateur (cohérent avec `ux.md` section 2) ? Une évolution à fort impact utilisateur résout une friction ou un manque clairement identifié dans le parcours actuel.

### Coût

Quel est l'effort de développement, de design et de contenu nécessaire pour livrer cette évolution au niveau de qualité exigé par le projet (jamais au rabais) ? Le coût inclut aussi le temps de validation qualité complet défini dans `testing.md`.

### Maintenance

Quelle charge continue cette évolution ajoute-t-elle au projet une fois livrée (contenu à tenir à jour, dépendance à surveiller, complexité de code additionnelle) ? Une fonctionnalité qui semble peu coûteuse à livrer mais très coûteuse à maintenir dans la durée doit être évaluée avec prudence.

### Performance

Quel est l'impact prévisible de cette évolution sur les objectifs de performance définis dans `performance.md` ? Toute évolution à impact performance négatif significatif doit démontrer un bénéfice utilisateur suffisamment fort pour le justifier, ou être reconsidérée dans sa forme technique.

### Cohérence

Dans quelle mesure cette évolution renforce-t-elle (plutôt qu'elle ne dilue) l'identité de marque, la direction artistique et l'expérience déjà établies (cohérent avec `brand.md` section 10) ?

## Grille de décision

Une évolution est priorisée favorablement lorsqu'elle combine un impact utilisateur fort, un coût de maintenance maîtrisé, un impact performance neutre ou positif, et une cohérence forte avec l'identité de marque. Une évolution qui présente un fort impact utilisateur mais un coût de maintenance ou un impact performance très négatif doit être reformulée techniquement avant d'être acceptée, plutôt que rejetée en bloc ou acceptée telle quelle.

---

# 4. Phases

Les phases suivantes décrivent une progression logique et non un calendrier engagé. Chaque phase suppose la précédente suffisamment aboutie et stable avant d'être significativement entamée.

## Phase 1 — Site vitrine

Établir la fondation complète du site : mission de marque, direction artistique, structure narrative principale (Hero → Problème → Solution → Fonctionnement → Preuves → Avis → CTA Amazon, cohérent avec `design.md` section 12), présentation du ou des produits actuels, et redirection soignée vers Amazon. Cette phase constitue le socle sur lequel toute évolution future s'appuie — elle doit être achevée à un niveau de qualité irréprochable avant d'envisager sérieusement les phases suivantes.

## Phase 2 — Optimisations

Une fois le site vitrine stable, concentrer les efforts sur l'affinement : performance (atteinte et maintien durable des objectifs Lighthouse et Core Web Vitals de `performance.md`), accessibilité approfondie, raffinement des animations et du rendu 3D, tests utilisateurs réels si possible pour identifier les frictions résiduelles du parcours (`ux.md`). Cette phase ne cherche jamais à ajouter du contenu nouveau, mais à porter l'existant à son meilleur niveau d'exécution possible.

## Phase 3 — Contenus

Enrichissement du contenu de marque : preuves techniques approfondies, contenu éditorial si pertinent, déclinaisons visuelles supplémentaires, sections de démonstration additionnelles pour de nouveaux usages ou contextes produit. Chaque nouveau contenu suit strictement les standards déjà établis (`copywriting.md`, `design.md`, `seo.md`) — cette phase densifie la preuve et le storytelling de marque sans jamais changer sa nature.

## Phase 4 — Écosystème

Extension potentielle vers un ensemble plus large de produits REMOLUX ou de contenus associés (voir pistes en section 5), toujours dans le respect strict de l'identité de marque établie. Cette phase suppose une base de contenu et de trafic suffisamment mature pour justifier un élargissement du périmètre du site.

## Phase 5 — Internationalisation

Adaptation du site à d'autres marchés linguistiques ou géographiques, si la stratégie business de la marque le justifie. Cette phase implique une réévaluation explicite de plusieurs décisions techniques actuelles (notamment l'ADR-006 sur le SSG et l'usage des balises `hreflang` évoquées dans `seo.md` section 3) — elle ne doit être engagée qu'après un nouvel ADR dédié documentant les implications de ce changement d'échelle (cohérent avec `decisions.md`).

**Rappel** : ces phases orientent la réflexion stratégique, elles ne constituent jamais un engagement calendaire. Une évolution de Phase 3 peut légitimement être avancée avant l'achèvement complet de la Phase 2 si un besoin business précis le justifie — mais jamais au détriment de la qualité déjà établie dans les phases précédentes.

---

# 5. Idées futures

Cette section liste des pistes d'évolution potentielles, à titre exploratoire — leur présence ici n'impose en rien leur réalisation. Chaque piste devra, le cas échéant, être évaluée selon la méthode de priorisation (section 3) et validée par rapport à l'identité de marque (`brand.md`) avant tout développement.

- **Comparateur** — un outil de comparaison entre les différents modèles ou variantes de produits REMOLUX, si la gamme s'élargit suffisamment pour le justifier.
- **Blog** — du contenu éditorial autour de l'usage des remorques, de l'entretien, de la sécurité routière — à évaluer strictement sur sa cohérence avec la mission du site (`CLAUDE.md` — le site ne vend pas, il rassure et démontre) et son bénéfice SEO réel (`seo.md` section 8).
- **FAQ avancée** — une section de questions-réponses enrichie si le volume de questions récurrentes des utilisateurs le justifie, avec balisage `FAQPage` associé (cohérent avec `seo.md` section 6).
- **Espace professionnel** — une section ou un parcours dédié spécifiquement au persona professionnel (`brand.md` section 7), avec un contenu et des preuves adaptés à ses besoins spécifiques (usage intensif, flotte, durabilité).
- **Configurateur** — un outil interactif permettant de visualiser le produit selon différentes options (couleur, quantité) si la gamme le justifie, dans le respect strict des principes de simplicité définis en section 2.
- **Documentation produit** — une section technique détaillée (fiches techniques, guides d'installation complets) pour les utilisateurs recherchant un niveau d'information plus poussé que le parcours principal du site.
- **Nouveaux produits** — extension de la gamme REMOLUX au-delà des feux LED magnétiques actuels, toujours dans la même famille de valeurs (confiance, simplicité, robustesse — `brand.md` section 3) et jamais par simple opportunisme commercial déconnecté de l'ADN de marque.

**Aucune de ces pistes n'est une décision** — chacune nécessiterait, si elle était sérieusement envisagée, son propre cycle d'analyse, de priorisation et potentiellement un ADR dédié (`decisions.md`) si son impact architectural est significatif.

---

# 6. Gestion de la dette

## Dette technique

Code, dépendances ou architecture qui s'écartent des standards définis dans `architecture.md`, `performance.md` ou `rules.md` — qu'il s'agisse de raccourcis pris sous contrainte de temps ou de choix devenus obsolètes avec l'évolution du projet.

**Suivi** : toute dette technique assumée consciemment est documentée directement dans le code concerné (commentaire expliquant le compromis, cohérent avec `architecture.md` section 13) et, si elle est structurante, référencée dans `decisions.md` avec un statut explicite.

**Réduction** : traitée en priorité lors de la Phase 2 (Optimisations, section 4), ou immédiatement si elle bloque ou complique une évolution en cours — jamais laissée s'accumuler indéfiniment "pour plus tard" sans plan concret de résorption.

## Dette design

Écarts visuels ou d'interaction par rapport aux standards définis dans `design.md` et `motion.md`, accumulés au fil d'ajouts successifs sans révision d'ensemble.

**Suivi** : identifiée lors des revues de cohérence visuelle globale du site (à effectuer périodiquement, en particulier avant toute nouvelle phase majeure).

**Réduction** : traitée par un audit visuel complet du site comparé au design system actuel, avec correction systématique des écarts constatés — jamais reportée indéfiniment au risque de voir la marque perdre en cohérence perçue.

## Dette UX

Frictions ou incohérences de parcours utilisateur accumulées au fil des évolutions, par rapport aux principes définis dans `ux.md`.

**Suivi** : identifiée par test utilisateur réel si possible, ou par revue rigoureuse du parcours complet (`ux.md` section 3) à intervalle régulier.

**Réduction** : traitée en priorité dès qu'elle affecte une étape critique du parcours de conversion (menant au CTA Amazon) ; les frictions mineures sur des sections secondaires peuvent être traitées de façon plus incrémentale.

## Dette contenu

Textes, preuves ou visuels devenus obsolètes, imprécis ou incohérents avec l'état réel du produit (nouvelle version, nouvelle certification, ancien argument dépassé).

**Suivi** : toute évolution produit physique doit déclencher une vérification systématique du contenu du site qui s'y rapporte — la dette contenu est particulièrement dangereuse car elle touche directement à l'honnêteté de marque (`brand.md` section 5 et `copywriting.md` section 7).

**Réduction** : traitée immédiatement dès détection, sans délai — un contenu inexact affecte directement la confiance, valeur fondamentale de la marque (`brand.md` section 3).

**Principe commun à toute dette** : une dette identifiée et non traitée doit rester visible et documentée, jamais oubliée silencieusement — un projet qui accumule une dette invisible perd progressivement sa capacité à évoluer rapidement et sûrement.

---

# 7. Évolution du design system

Le design system de REMOLUX (`design.md`) peut et doit évoluer dans le temps — affiner une nuance de couleur, ajuster un timing d'animation, introduire un nouveau composant réutilisable — sans que cette évolution ne remette en cause l'identité de marque elle-même (`brand.md`).

## Principes d'évolution sans rupture d'identité

- Toute évolution du design system est d'abord confrontée à l'ADN et aux valeurs de marque définis dans `brand.md` avant d'être validée — elle doit renforcer cette identité, jamais s'en éloigner.
- Les évolutions incrémentales (ajustement de token, nouveau composant cohérent avec le système existant) sont intégrées directement dans `design.md`, avec une mise à jour claire du document.
- Une évolution structurante (nouvelle palette dominante, changement de philosophie typographique) est traitée comme une décision majeure au sens de `decisions.md` — elle nécessite un ADR dédié documentant le contexte, la justification et les alternatives considérées, jamais un changement appliqué directement sans ce processus.
- Chaque évolution du design system est vérifiée pour sa cohérence rétroactive avec l'ensemble des sections déjà existantes du site — un design system qui évolue par ajouts non coordonnés perd rapidement sa cohérence globale.

## Ce qui ne doit jamais changer sans un processus décisionnel complet

Les fondations les plus structurantes de l'identité visuelle (palette dominante, philosophie typographique générale, principes de sobriété définis dans `design.md` section 1 et 2) constituent le socle stable de la marque — toute évolution à ce niveau engage l'identité de REMOLUX dans son ensemble et doit être traitée avec la même rigueur qu'une décision architecturale majeure.

---

# 8. Critères de réussite

Une évolution mérite d'être intégrée au projet lorsqu'elle satisfait l'ensemble des critères suivants :

1. **Alignement avec la mission** — elle sert directement la mission de REMOLUX (construire la confiance, rediriger vers Amazon — `CLAUDE.md`), pas seulement un intérêt technique ou esthétique isolé.
2. **Respect des quatre principes directeurs** — qualité avant quantité, simplicité avant fonctionnalités, performance avant effets, cohérence avant nouveauté (section 2).
3. **Priorisation favorable** — elle obtient une évaluation positive sur l'ensemble des cinq critères de priorisation (impact utilisateur, coût, maintenance, performance, cohérence — section 3).
4. **Validation qualité complète** — elle passe intégralement le protocole défini dans `testing.md` avant toute mise en production, sans exception ni raccourci.
5. **Cohérence de marque confirmée** — elle a été confrontée au workflow de validation défini dans `brand.md` section 10 et n'enfreint aucune des erreurs interdites qui y sont listées.
6. **Absence de dette non maîtrisée** — elle n'introduit pas de dette technique, design, UX ou contenu non documentée et non assumée consciemment (section 6).

**Une évolution qui échoue sur un seul de ces six critères doit être reformulée ou reportée** — aucun critère n'est optionnel ni compensable par l'excellence des autres.

---

# 9. Erreurs interdites

- **Ajouter une fonctionnalité parce qu'elle est tendance** — aucune évolution n'est justifiée par sa popularité dans d'autres projets ou secteurs si elle ne répond à aucun besoin réel identifié pour REMOLUX (cohérent avec section 2, principe de simplicité avant fonctionnalités).
- **Copier un concurrent** — aucune évolution ne doit être motivée par le simple fait qu'un concurrent l'a implémentée ; chaque évolution doit être justifiée indépendamment par les critères de priorisation propres au projet (section 3), cohérent avec `brand.md` section 8.
- **Multiplier les options** — aucune fonctionnalité n'introduit de choix ou de configuration superflue pour l'utilisateur ; la simplicité du parcours prime toujours (cohérent avec `ux.md`).
- **Complexifier inutilement** — aucune évolution technique n'ajoute de couche d'abstraction, de dépendance ou de configuration non justifiée par un besoin réel et actuel (cohérent avec `architecture.md` section 1 et 12).
- **Ignorer la maintenance** — aucune évolution n'est validée sans une évaluation explicite de son coût de maintenance dans le temps (section 3) ; une fonctionnalité séduisante à livrer mais coûteuse à maintenir indéfiniment doit être reconsidérée.
- **Sacrifier la performance pour un effet** — aucune évolution visuelle ou animée n'est intégrée si elle dégrade les objectifs de performance sans bénéfice utilisateur proportionnellement fort (cohérent avec `performance.md`).
- **Dévier de l'identité de marque pour suivre une envie créative ponctuelle** — toute évolution reste subordonnée à la cohérence avec `brand.md`, jamais l'inverse.
- **Livrer une évolution sans validation qualité complète** — aucune nouveauté n'est mise en production sans passage intégral par le protocole de `testing.md`.
- **Accumuler la dette silencieusement** — aucune dette (technique, design, UX, contenu) n'est laissée non documentée sous prétexte qu'elle semble mineure dans l'instant (section 6).
- **Changer une fondation de marque sans processus décisionnel** — aucune évolution structurante du design system ou de l'identité n'est appliquée sans passer par le processus décisionnel complet défini en section 7 et dans `decisions.md`.
- **Promettre une roadmap comme un engagement calendaire** — aucune phase ou idée future listée dans ce document n'est communiquée en externe comme une date ferme ; ce document reste un outil de priorisation interne, jamais un engagement public.

---

# 10. Workflow Produit

Workflow obligatoire pour toute évolution significative envisagée sur REMOLUX :

1. **Idée** — formuler clairement l'évolution envisagée et le besoin ou l'objectif qu'elle vise à servir.
2. **Analyse** — confronter l'idée à la mission (`CLAUDE.md`), à l'identité de marque (`brand.md`) et aux quatre principes directeurs (section 2) avant toute autre étape.
3. **Priorisation** — évaluer l'idée selon les cinq critères définis en section 3 (impact utilisateur, coût, maintenance, performance, cohérence).
4. **Prototype** — si l'idée est retenue, produire une version exploratoire minimale permettant de valider concrètement sa pertinence avant un investissement complet de développement.
5. **Développement** — implémenter l'évolution en respectant l'intégralité des standards techniques et créatifs définis dans les documents de référence du projet (`architecture.md`, `design.md`, `motion.md`, `rules.md`, etc. selon la nature de l'évolution).
6. **Validation** — exécuter le protocole complet de `testing.md` avant toute mise en production.
7. **Mise en production** — livrer l'évolution selon le workflow Git défini dans `git.md`.
8. **Retour utilisateur** — observer et recueillir, dans la mesure du possible, les signaux réels d'usage et de perception de cette évolution une fois en production, pour informer les décisions futures de la roadmap.

---

# 11. Checklist Roadmap

Cette checklist est spécifique au processus de priorisation d'une évolution (elle ne recoupe pas les checklists techniques/créatives de [`checklist.md`](./checklist.md), qui restent applicables une fois l'évolution retenue et en cours de développement).

## Alignement stratégique

- [ ] L'évolution sert directement la mission de REMOLUX (`CLAUDE.md`), pas uniquement un intérêt technique ou esthétique isolé.
- [ ] L'évolution respecte les quatre principes directeurs (qualité avant quantité, simplicité avant fonctionnalités, performance avant effets, cohérence avant nouveauté — section 2).
- [ ] L'évolution est cohérente avec la phase actuelle du projet (section 4), ou sa priorisation anticipée est explicitement justifiée.

## Priorisation

- [ ] L'impact utilisateur réel de l'évolution est clairement identifié et significatif.
- [ ] Le coût de développement et de validation qualité a été estimé de façon réaliste.
- [ ] Le coût de maintenance dans le temps a été explicitement évalué, pas seulement le coût de livraison initial.
- [ ] L'impact sur la performance a été anticipé et reste neutre ou positif, ou est justifié par un bénéfice utilisateur proportionnellement fort.
- [ ] La cohérence avec l'identité de marque et le design system existants a été vérifiée.

## Dette et maintenabilité

- [ ] L'évolution n'introduit aucune dette technique, design, UX ou contenu non documentée et non assumée consciemment (section 6).
- [ ] Si l'évolution impacte une décision fondatrice, un nouvel ADR a été envisagé conformément à `decisions.md`.

## Validation finale

- [ ] Aucune des erreurs interdites listées en section 9 n'a été commise.
- [ ] L'évolution satisfait l'ensemble des six critères de réussite définis en section 8.
- [ ] Une fois retenue, l'évolution suit `checklist.md` intégralement (sections Brand, Git, QA notamment) avant mise en production.
- [ ] En cas de doute sur la pertinence ou la priorité d'une évolution, la question a été posée plutôt que tranchée arbitrairement.
