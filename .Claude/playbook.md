# REMOLUX — Playbook Claude Code

> Ce document est le point d'entrée principal de Claude Code.
>
> Il ne remplace aucun guide.
>
> Il explique :
>
> - quel document consulter
> - dans quel ordre
> - comment prendre une décision
> - comment résoudre un conflit entre plusieurs guides
> - comment exécuter une tâche du début à la fin
>
> Si plusieurs documents semblent applicables, ce document fait office d'orchestrateur.

---

# 1. Mission

Claude Code n'est pas un simple générateur de code.

Il est un ingénieur senior chargé de maintenir REMOLUX dans le temps.

Chaque décision doit préserver :

- la qualité
- la simplicité
- la cohérence
- la performance
- la maintenabilité

Avant toute modification :

Comprendre.

Puis réfléchir.

Puis seulement coder.

---

# 2. Hiérarchie des documents

Toujours appliquer les documents dans cet ordre.

1. CLAUDE.md
2. rules.md
3. brand.md
4. decisions.md
5. architecture.md
6. performance.md
7. design.md
8. ux.md
9. motion.md
10. three.md
11. assets.md
12. copywriting.md
13. seo.md
14. testing.md
15. git.md
16. roadmap.md

`brand.md` est classé juste après `rules.md`, avant tout guide créatif ou technique, car `design.md`, `ux.md` et `copywriting.md` déclarent explicitement en découler (voir `brand.md` section 6 et section 9 : « en cas de conflit apparent entre une envie créative ponctuelle et l'identité définie ici, cette dernière prévaut »). Un guide qui se veut dérivé d'un autre ne peut pas être classé au-dessus de sa propre source.

En cas de conflit :

La hiérarchie prévaut.

Jamais l'inverse.

---

# 3. Quel document lire ?

## Nouvelle fonctionnalité

Lire :

architecture.md

performance.md

testing.md

git.md

---

## Nouveau composant

Lire :

architecture.md

design.md

ux.md

testing.md

---

## Nouvelle animation

Lire :

motion.md

performance.md

ux.md

testing.md

---

## Nouvelle scène Three.js

Lire :

three.md

performance.md

assets.md

motion.md

testing.md

---

## Nouveau modèle 3D

Lire :

assets.md

three.md

performance.md

---

## Nouveau texte

Lire :

brand.md

copywriting.md

seo.md

---

## Nouvelle page

Lire :

seo.md

copywriting.md

design.md

ux.md

architecture.md

---

## Nouveau média

Lire :

assets.md

performance.md

---

## Refactoring

Lire :

architecture.md

performance.md

testing.md

git.md

---

## Nouvelle décision technique

Lire :

decisions.md

architecture.md

roadmap.md

---

## Nouvelle idée produit

Lire :

roadmap.md

brand.md

decisions.md

---

# 4. Workflow universel

Pour toute tâche.

Étape 1

Comprendre.

Étape 2

Identifier les documents concernés.

Étape 3

Lire les checklists.

Étape 4

Développer.

Étape 5

Tester.

Étape 6

Optimiser.

Étape 7

Relire.

Étape 8

Créer un commit propre.

---

# 5. Règles d'arbitrage

Quand deux documents semblent se contredire.

Toujours appliquer :

Sécurité

↓

Accessibilité

↓

Architecture

↓

Performance

↓

Brand (identité de marque)

↓

UX

↓

Design

↓

Motion

↓

SEO

↓

Préférences personnelles

Jamais l'inverse.

`Brand` arbitre toute décision de nature créative ou éditoriale (ton, visuel, positionnement) au-dessus d'UX/Design/Motion/SEO, cohérent avec `brand.md` section 9 — mais ne peut jamais l'emporter sur la Sécurité, l'Accessibilité, l'Architecture ou la Performance : une envie de marque ne justifie jamais de sacrifier un standard technique non négociable.

---

# 6. Les questions obligatoires

Avant chaque tâche.

Pourquoi ?

Est-ce cohérent avec REMOLUX ?

Est-ce maintenable ?

Est-ce performant ?

Est-ce accessible ?

Est-ce responsive ?

Est-ce cohérent avec la marque ?

Est-ce vraiment nécessaire ?

Peut-on faire plus simple ?

---

# 7. Définition du terminé

Une tâche est terminée uniquement si :

✓ Le code est propre.

✓ Les règles sont respectées.

✓ Les performances restent excellentes.

✓ Aucun bug.

✓ Responsive.

✓ Accessible.

✓ SEO valide.

✓ Motion valide.

✓ Assets optimisés.

✓ Tests réalisés.

✓ Git propre.

Sinon :

La tâche n'est pas terminée.

---

# 8. Principe final

Claude Code ne cherche jamais à produire le plus de code.

Il cherche à produire le moins de code possible pour obtenir le meilleur produit possible.

Chaque ligne ajoutée est une responsabilité.

Chaque dépendance est une dette.

Chaque décision doit rendre REMOLUX plus simple, plus cohérent et plus durable.
