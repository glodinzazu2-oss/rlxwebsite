# REMOLUX — Architecture Decision Record (ADR)

> Ce document est la mémoire technique officielle du projet.
>
> Les autres guides expliquent **comment** développer.
>
> Celui-ci explique **pourquoi** les décisions importantes ont été prises.
>
> Une décision importante n'est jamais supprimée.
> Elle peut être remplacée, mais son historique est conservé.

---

# Principes

Chaque décision importante doit répondre à :

- Pourquoi ce problème existe ?
- Quelles solutions ont été étudiées ?
- Pourquoi cette solution a été retenue ?
- Quels compromis accepte-t-on ?
- Quand faudra-t-il réévaluer cette décision ?

---

# Format

## ADR-XXX — Titre

**Statut**

Adopté | En discussion | Remplacé | Archivé

**Date**

AAAA-MM-JJ

### Contexte

...

### Problème

...

### Options étudiées

- Option A
- Option B
- Option C

### Décision

...

### Justification

...

### Compromis

...

### Conséquences

...

### Réévaluation

Quand faudra-t-on revoir cette décision ?

---

# Décisions fondatrices

## ADR-001 — Astro

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

REMOLUX est un site de marque à dominante statique (vitrine, redirection vers Amazon), avec des besoins ponctuels d'interactivité riche (animations GSAP, scènes Three.js) sans logique applicative complexe côté serveur.

### Problème

Quel framework de construction de site permet d'obtenir la meilleure performance par défaut, tout en supportant une interactivité ciblée là où elle est réellement nécessaire ?

### Options étudiées

- Astro (génération statique, îlots d'interactivité)
- Next.js (React, SSR/SSG hybride)
- Site statique fait main, sans framework

### Décision

Astro, en mode SSG par défaut, avec hydratation partielle via le modèle d'îlots.

### Justification

Astro livre par défaut zéro JavaScript sur les pages qui n'en nécessitent pas, ce qui correspond exactement au profil de REMOLUX. Next.js a été écarté car son modèle par défaut hydrate davantage de JavaScript côté client sans bénéfice pour un contenu majoritairement statique. Le site fait main a été écarté car il aurait exigé de réimplémenter manuellement l'optimisation d'images, le routing et la génération statique qu'Astro fournit déjà de façon mature.

### Compromis

Toute interactivité doit être consciemment justifiée et scopée (directives `client:*`), ce qui impose une discipline de développement plus stricte qu'un framework à hydratation globale par défaut.

### Conséquences

Performance maximale par défaut (cohérent avec l'objectif Lighthouse 95+ de `CLAUDE.md`), au prix d'une vigilance permanente sur le choix de stratégie d'hydratation de chaque composant (voir `architecture.md` section 6).

### Réévaluation

À revoir uniquement si le site devait un jour nécessiter du contenu réellement dynamique dépendant de la requête (personnalisation, données temps réel) — aucun signal de ce besoin à ce jour.

---

## ADR-002 — TypeScript strict

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

Le projet intègre plusieurs domaines techniques distincts (composants Astro, logique GSAP, scènes Three.js) où des erreurs de typage silencieuses peuvent produire des bugs difficiles à diagnostiquer, en particulier dans la manipulation d'objets 3D et d'animations.

### Problème

Quel niveau de rigueur de typage adopter pour limiter les erreurs runtime sans ralentir excessivement le développement ?

### Options étudiées

- JavaScript sans typage
- TypeScript en mode non strict
- TypeScript en mode strict

### Décision

TypeScript en mode strict, sans exception, sur l'ensemble du projet.

### Justification

Le mode strict élimine une classe entière d'erreurs runtime (`null`/`undefined` non gérés, types implicites incohérents) avant même l'exécution du code. JavaScript sans typage a été écarté car il expose à des erreurs évitables, particulièrement coûteuses à diagnostiquer dans la logique 3D et d'animation. TypeScript non strict a été écarté car il conserve une part significative de ces failles sans bénéfice réel en contrepartie.

### Compromis

Temps d'écriture légèrement supérieur à court terme (annotations explicites, gestion rigoureuse des cas `undefined`).

### Conséquences

Réduction des bugs de production, meilleure auto-documentation du code, cohérent avec `architecture.md` section 7.

### Réévaluation

Aucune réévaluation prévue — le mode strict est un standard non négociable, indépendant de l'évolution du projet.

---

## ADR-003 — GSAP

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

REMOLUX nécessite des animations complexes et précises, notamment liées au scroll, pour porter une grande partie du storytelling de marque (cohérent avec `motion.md`).

### Problème

Quelle solution technique permet de produire des animations fluides, précises et performantes, avec un contrôle fin du timing et une intégration robuste avec le scroll ?

### Options étudiées

- Animations CSS pures
- Framer Motion
- GSAP (avec ScrollTrigger)

### Décision

GSAP, avec son plugin ScrollTrigger pour les animations liées au scroll.

### Justification

GSAP offre un contrôle de timing et d'orchestration de timelines supérieur au CSS pur pour des séquences complexes, avec des performances éprouvées et une intégration native au scroll. Le CSS pur a été écarté comme solution unique car insuffisant pour orchestrer des timelines complexes synchronisées au scroll — il reste utilisé pour les micro-interactions simples. Framer Motion a été écarté car pensé prioritairement pour un écosystème React, moins naturel à intégrer dans le modèle d'îlots Astro.

### Compromis

Dépendance supplémentaire au bundle JavaScript, dont le coût est maîtrisé par un import ciblé et une stratégie d'hydratation appropriée (`client:visible`).

### Conséquences

Précision et fluidité d'animation largement supérieures à une solution purement CSS, au prix d'une discipline stricte de cleanup (`gsap.context()`, voir `architecture.md` section 9 et `motion.md` section 11).

### Réévaluation

À revoir si un jour le poids de GSAP devenait disproportionné par rapport à l'usage réel du site, ou si une alternative native au navigateur (Scroll-driven Animations CSS) atteignait une maturité et un support suffisants pour couvrir les mêmes besoins.

---

## ADR-004 — Three.js

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

La démonstration du produit REMOLUX (mécanisme magnétique, étanchéité, inspection à 360°) bénéficie fortement d'un rendu 3D interactif, qu'une simple image ou vidéo ne peut égaler pour cet usage précis.

### Problème

Quelle technologie de rendu 3D web permet d'obtenir un résultat visuellement réaliste tout en restant compatible avec les contraintes de performance du site ?

### Options étudiées

- Three.js
- Babylon.js
- Modèles pré-rendus en vidéo/GIF (pas d'interactivité réelle)

### Décision

Three.js, avec un pipeline d'assets optimisé (GLB, Draco, KTX2 — voir `three.md` et `assets.md`).

### Justification

Three.js dispose d'un écosystème mature et d'un modèle de scène bas niveau offrant le contrôle précis nécessaire au budget de performance défini dans `performance.md`. Babylon.js a été écarté car orienté davantage vers les moteurs de jeu complets, apportant une complexité non nécessaire au besoin ciblé de démonstration produit. Les rendus pré-calculés ont été écartés car ils ne permettent aucune interaction réelle (rotation manuelle, inspection).

### Compromis

Charge d'ingénierie 3D significative (pipeline Blender → GLB → optimisation) assumée en échange d'un niveau de démonstration produit qu'aucune alternative statique ne peut atteindre.

### Conséquences

Nécessite une discipline stricte de performance et de nettoyage mémoire (`dispose()` systématique, voir `three.md` section 9) sous peine de dégradation progressive du site.

### Réévaluation

À revoir si le catalogue produit REMOLUX venait à ne plus justifier l'investissement d'un pipeline 3D dédié, ou si une évolution majeure du web (WebGPU généralisé, nouveaux standards) rendait une autre approche significativement plus performante.

---

## ADR-005 — Lenis

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

Le scroll est l'épine dorsale de la narration du site REMOLUX ; sa fluidité perçue doit être irréprochable et parfaitement synchronisée avec les animations GSAP/ScrollTrigger.

### Problème

Comment garantir un scroll fluide et cohérent sur l'ensemble des navigateurs et appareils, en synchronisation fiable avec le moteur d'animation choisi (ADR-003) ?

### Options étudiées

- Scroll natif du navigateur
- Lenis
- Locomotive Scroll

### Décision

Lenis, synchronisé explicitement avec GSAP ScrollTrigger via le hook d'intégration officiel.

### Justification

Lenis est léger, activement maintenu, et conçu spécifiquement pour une intégration fluide avec GSAP. Le scroll natif a été écarté car insuffisant pour garantir la fluidité « cinématique » recherchée. Locomotive Scroll a été écarté car son intégration avec GSAP est historiquement moins directe que celle de Lenis.

### Compromis

Dépendance supplémentaire au bundle, de poids contenu, en échange d'une cohérence de scroll bien supérieure au comportement natif variable d'un navigateur à l'autre.

### Conséquences

Vigilance permanente requise pour maintenir la synchronisation Lenis/ScrollTrigger à chaque évolution du code (voir `motion.md` section 7).

### Réévaluation

À revoir si les Scroll-driven Animations natives du navigateur atteignaient un niveau de support et de fluidité suffisant pour remplacer cette dépendance sans perte de qualité perçue.

---

## ADR-006 — Static Site Generation

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

REMOLUX est un site de contenu de marque stable, sans personnalisation utilisateur ni donnée dépendante de la requête.

### Problème

Faut-il générer les pages au build (SSG) ou à chaque requête (SSR) ?

### Options étudiées

- SSG (génération statique au build)
- SSR (rendu à chaque requête)
- Hybride (SSG par défaut, SSR ponctuel)

### Décision

SSG pour l'intégralité du site, sans SSR à ce stade.

### Justification

Le contenu de REMOLUX ne dépend d'aucune donnée spécifique à la requête — le SSG offre la performance maximale (TTFB quasi nul) sans aucun sacrifice fonctionnel. Le SSR a été écarté par défaut car il introduirait un coût de calcul serveur par requête sans bénéfice fonctionnel actuel.

### Compromis

Toute future personnalisation ou contenu réellement dynamique nécessitera une réintroduction explicite et documentée du SSR, jamais un ajout silencieux.

### Conséquences

TTFB et performance globale maximisés, cohérent avec `performance.md` ; architecture de déploiement simplifiée (fichiers statiques).

### Réévaluation

À revoir si un besoin réel de contenu dynamique dépendant de la requête apparaissait (ex. compte utilisateur, données temps réel) — nécessiterait un nouvel ADR dédié avant toute mise en œuvre.

---

## ADR-007 — Component First

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

Le site doit rester maintenable et évolutif dans le temps, avec l'ajout prévisible de nouvelles sections et de nouveaux contenus (cohérent avec `roadmap.md`).

### Problème

Comment structurer le code pour maximiser la réutilisabilité et limiter la duplication à mesure que le site grandit ?

### Options étudiées

- Pages monolithiques avec markup dupliqué section par section
- Architecture component-first (composants atomiques assemblés en sections puis en pages)

### Décision

Architecture component-first, détaillée dans `architecture.md` sections 2 à 4.

### Justification

Une architecture par composants réutilisables limite structurellement la duplication et garantit une cohérence bien plus robuste qu'une approche page par page. Les pages monolithiques ont été écartées car elles auraient conduit rapidement à une duplication massive de markup et de style.

### Compromis

Effort de conception initial plus important (identifier correctement les frontières des composants).

### Conséquences

Vitesse de développement et cohérence largement supérieures à mesure que le site grandit, au prix d'une discipline de découpage constante (voir `architecture.md` section 4).

### Réévaluation

Aucune réévaluation prévue — ce principe reste valide indépendamment de l'échelle du projet.

---

## ADR-008 — Mobile First

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

La majorité du trafic de découverte de REMOLUX provient d'appareils mobiles (cohérent avec `CLAUDE.md` section 4).

### Problème

Faut-il concevoir en priorité pour desktop puis adapter au mobile, ou l'inverse ?

### Options étudiées

- Desktop-first avec adaptation mobile a posteriori
- Mobile-first avec extension progressive vers desktop

### Décision

Mobile-first, sans exception, sur l'ensemble du projet.

### Justification

Concevoir d'abord pour la contrainte la plus stricte garantit une base solide qui s'étend naturellement vers des contextes moins contraints. Le desktop-first a été écarté car il aurait risqué de produire une expérience mobile dégradée, alors que le mobile constitue la majorité réelle des points de contact de la marque.

### Compromis

Certaines possibilités créatives propres au grand écran (compositions riches, hover) doivent être pensées comme des enrichissements, jamais comme la base de conception.

### Conséquences

Chaque nouvelle fonctionnalité est d'abord validée sur mobile avant toute extension desktop (cohérent avec `testing.md` section 3).

### Réévaluation

À revoir uniquement si la répartition du trafic évoluait significativement vers une dominante desktop, ce qui n'est pas anticipé pour ce type de produit.

---

## ADR-009 — Performance First

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

REMOLUX vise un objectif Lighthouse 95+, et la performance est directement liée à la perception de qualité de marque (cohérent avec `performance.md` section 1).

### Problème

Comment garantir que la performance ne soit pas sacrifiée progressivement au fil des évolutions futures du site ?

### Options étudiées

- Performance traitée comme optimisation de fin de projet
- Performance traitée comme critère de décision à chaque étape (Performance First)

### Décision

Performance First — chaque décision technique intègre son impact de performance dès sa conception.

### Justification

La dette de performance accumulée progressivement est presque toujours plus coûteuse à corriger après coup qu'à éviter dès la conception. L'optimisation a posteriori a été écartée car elle expose le projet à une accumulation silencieuse de dette détectée seulement lorsqu'elle devient problématique.

### Compromis

Chaque nouvelle dépendance, animation ou asset est systématiquement évalué avant intégration — un coût de discipline permanent.

### Conséquences

Performance durablement maîtrisée, cohérent avec `performance.md` et `testing.md`.

### Réévaluation

Aucune réévaluation prévue — ce principe reste une contrainte permanente du projet.

---

## ADR-010 — Accessibilité WCAG AA

**Statut**

Adopté

**Date**

Voir date de démarrage du projet

### Contexte

REMOLUX vise une expérience premium et universellement soignée, incompatible avec une accessibilité traitée comme fonctionnalité secondaire.

### Problème

Faut-il traiter l'accessibilité comme une couche ajoutée après coup, ou comme une exigence native intégrée dès la conception ?

### Options étudiées

- Accessibilité ajoutée a posteriori
- Accessibilité native intégrée dès la conception (HTML sémantique, contraste, clavier, `prefers-reduced-motion`)

### Décision

Accessibilité native, conforme WCAG AA, intégrée dès la conception de chaque composant et chaque animation.

### Justification

L'accessibilité ajoutée après coup produit systématiquement des solutions moins élégantes et plus fragiles qu'une accessibilité pensée nativement dans la structure du code. L'option a posteriori a été écartée car incompatible avec l'exigence de qualité perçue du projet.

### Compromis

Chaque composant est conçu avec sa version sémantique et accessible dès sa première implémentation, ce qui demande une vigilance systématique.

### Conséquences

Standard de qualité qui élève également la robustesse générale du code (le HTML sémantique correct bénéficie aussi au SEO, cohérent avec `seo.md`).

### Réévaluation

Aucune réévaluation prévue — la conformité WCAG AA est un standard non négociable, indépendant de l'évolution du projet.

---

## ADR-011 — Vulnérabilités npm Astro 5.x : risque accepté et documenté

**Statut**

Adopté

**Date**

2026-07-19

### Contexte

`npm audit` signale 2 vulnérabilités (1 low, 1 high) sur Astro ≤7.0.0-beta.6 et esbuild 0.27.x : XSS via `define:vars`, replay de server islands, XSS via slot name, SSRF Host header, XSS via spread props, et lecture arbitraire de fichiers par le serveur de développement esbuild (Windows). Le seul correctif proposé par npm est Astro 7.1.1 — deux versions majeures au-dessus de la 5.x utilisée, avec breaking changes garantis.

### Problème

Faut-il monter vers Astro 7 (breaking change) pour éteindre l'alerte, ou accepter et documenter le risque ?

### Options étudiées

- Monter vers Astro 7.1.1 (`npm audit fix --force`)
- Rester en Astro 5.x (dernière version 5, `^5.18.2`) et documenter le risque
- Ignorer l'alerte sans documentation

### Décision

Rester en Astro 5.x et documenter le risque accepté (le présent ADR). Ignorer sans documenter est interdit par `rules.md` §15.

### Justification

Vérification faite faille par faille contre le code réel du projet : `define:vars`, les server islands (`server:defer`) et les slots nommés ne sont utilisés nulle part ; le site est 100 % SSG sans aucun rendu serveur (le SSRF et le XSS réfléchi supposent un runtime SSR) ; l'unique spread props (`Button.astro`) n'utilise que des attributs codés en dur, et le site n'accepte aucune entrée utilisateur ; la faille esbuild ne concerne que le serveur de développement local, absent du build livré. Aucune des failles n'est exploitable sur le site en production. Une montée majeure forcée casserait le build pour un gain de sécurité réel nul.

### Compromis

L'alerte `npm audit` restera visible tant que le projet est en Astro 5.x — elle est connue, comprise et assumée, pas ignorée.

### Conséquences

Aucune action immédiate. La CI et le développement local continuent en Astro 5.x.

### Réévaluation

À revoir si : (1) le projet introduit un jour du SSR, des server islands, des slots nommés dynamiques ou une entrée utilisateur quelconque — l'analyse ci-dessus deviendrait caduque et la montée vers Astro 7+ deviendrait prioritaire ; (2) une nouvelle faille touchant le SSG statique est publiée ; ou (3) une migration Astro 6/7 est planifiée pour d'autres raisons (fin de support de la 5.x).

---

# Décisions futures

Cette section reste vide jusqu'à ce qu'une vraie décision importante apparaisse.

Exemples de sujets qui **pourraient** un jour justifier un ADR, à condition de rester compatibles avec la mission définie dans `CLAUDE.md` :

ADR-012 — Internationalisation

ADR-013 — CMS

ADR-014 — PWA

ADR-015 — Multi-langues

**Hors périmètre, jamais un sujet d'ADR** : toute fonctionnalité e-commerce (panier, paiement, compte utilisateur) est interdite de façon permanente et non négociable par `CLAUDE.md` section 22 et `rules.md` section 16 — ce n'est pas une décision technique à instruire un jour, c'est une exclusion de mission. Un ADR ne peut pas rouvrir ce sujet ; seule une révision explicite de `CLAUDE.md` par le client pourrait changer la mission elle-même, ce qui dépasse le cadre d'une décision d'architecture.

---

# Règles

Une décision importante :

- n'est jamais supprimée ;
- peut être remplacée ;
- garde son historique ;
- explique toujours les compromis ;
- référence les documents impactés.

---

# Workflow

Identifier le problème.

Étudier plusieurs solutions.

Choisir.

Documenter.

Mettre à jour les guides concernés.

Développer.

Tester.

---

# Checklist

□ Le problème est clairement identifié.

□ Plusieurs solutions ont été étudiées.

□ Les compromis sont documentés.

□ Les conséquences sont connues.

□ Les documents impactés sont mis à jour.

□ Les tests sont réalisés.

□ L'ADR est daté.

□ L'ADR est versionné.

---

# Principe final

Une bonne décision n'est pas celle qui semble parfaite aujourd'hui.

C'est celle dont les raisons seront encore compréhensibles dans cinq ans.
