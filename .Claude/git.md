# REMOLUX — Guide Officiel Git

> Ce document est la référence absolue de la gestion Git sur le projet REMOLUX. Il complète l'ensemble des documents existants : [`CLAUDE.md`](./CLAUDE.md), [`rules.md`](./rules.md), [`design.md`](./design.md), [`ux.md`](./ux.md), [`motion.md`](./motion.md), [`architecture.md`](./architecture.md), [`performance.md`](./performance.md), [`three.md`](./three.md), [`copywriting.md`](./copywriting.md), [`seo.md`](./seo.md), [`assets.md`](./assets.md) et [`testing.md`](./testing.md).
> Chaque modification du projet doit être claire, traçable, maintenable et facilement réversible. L'historique Git n'est jamais un simple journal technique — c'est la mémoire du projet, consultée par des développeurs qui n'étaient pas présents au moment où une décision a été prise.

> **État actuel** : le dépôt Git est actif (GitHub : `glodinzazu2-oss/rlxwebsite`, branche principale `main`, CI GitHub Actions sur chaque push/PR, hooks pre-commit Husky + lint-staged). Ce workflow est **en vigueur** : une branche par sujet, une PR par livraison, jamais de commit direct sur `main` sans instruction explicite du client.

---

# 1. Philosophie Git

## Pourquoi Git est un outil de communication

Un commit n'est pas seulement une sauvegarde de code — c'est un message adressé à toute personne qui consultera l'historique du projet, aujourd'hui ou dans deux ans. Un commit bien écrit explique en quelques mots ce qui a changé et, plus important encore, pourquoi. Un commit mal écrit ("fix", "update", "wip") ne communique rien et transforme chaque investigation future en travail d'archéologie. Sur REMOLUX, chaque commit doit être écrit en pensant à ce lecteur futur, jamais uniquement pour soi-même au moment présent.

## Pourquoi un historique propre est un investissement

Un historique Git clair permet de retrouver rapidement quand et pourquoi un bug a été introduit (`git bisect`), de comprendre l'évolution d'une décision architecturale, et de revenir en arrière proprement en cas de besoin (section 7). Un historique confus (commits énormes, messages vagues, plusieurs sujets mélangés) transforme chacune de ces opérations, normalement rapides, en un travail long et incertain. Le temps investi à écrire un commit clair aujourd'hui est systématiquement remboursé, souvent plusieurs fois, par le temps économisé lors de la prochaine investigation.

## Pourquoi chaque commit raconte une histoire

L'historique Git du projet doit pouvoir se lire comme un récit cohérent de l'évolution du produit — chaque commit une étape logique et compréhensible isolément. Un bon test : si l'on retirait uniquement les messages de commit d'une période donnée et qu'on les lisait comme une liste, on devrait pouvoir reconstituer une narration cohérente de ce qui s'est passé sur le projet, sans avoir besoin d'ouvrir le code. C'est cette exigence narrative qui distingue un historique professionnel d'un simple journal de sauvegardes.

**Principe d'arbitrage permanent** : avant de créer un commit, se demander — _"Si quelqu'un lit uniquement ce message dans un an, sans aucun autre contexte, comprendra-t-il ce qui a changé et pourquoi ?"_

---

# 2. Workflow Git

## Création de branche

Chaque nouvelle tâche (fonctionnalité, correction, refactoring) démarre par la création d'une branche dédiée depuis `main` à jour, nommée selon la convention définie en section 3. Aucun développement ne débute directement sur `main`.

## Développement

Le développement s'effectue sur cette branche isolée, avec des commits atomiques et réguliers (section 4) — jamais un unique commit massif regroupant l'intégralité du travail en fin de tâche.

## Commit

Chaque commit correspond à une unité de changement logique et cohérente, testée avant d'être committée (cohérent avec `testing.md`), avec un message conforme à la convention de la section 4.

## Push

La branche est poussée vers le dépôt distant régulièrement, jamais gardée uniquement en local pendant une durée excessive — un travail non poussé est un travail non sauvegardé et non partagé avec l'équipe.

## Merge

Une fois la tâche complète, testée et validée (cohérent avec `testing.md` section 11), la branche est fusionnée dans `main` via une Pull Request (section 5), jamais par un merge direct non revu, sauf autorisation explicite de l'utilisateur pour un contexte de travail solo validé.

## Suppression de branche

Une fois la fusion effectuée, la branche de fonctionnalité est supprimée (locale et distante) — aucune branche fusionnée ne doit être laissée à traîner indéfiniment, ce qui encombre la lisibilité du dépôt.

## Récapitulatif du cycle

```
main (à jour)
  → création de branche dédiée
    → développement + commits atomiques
      → push régulier
        → Pull Request
          → revue + tests
            → merge dans main
              → suppression de la branche
```

---

# 3. Stratégie des branches

## `main`

Branche de référence, toujours stable et déployable. Aucun commit direct sur `main` sans passage par une Pull Request, sauf action exceptionnelle explicitement validée par l'utilisateur (cohérent avec les règles de sécurité Git de `rules.md`).

## `develop` (si le workflow du projet l'exige)

Branche d'intégration intermédiaire entre les branches de fonctionnalité et `main`, utilisée uniquement si le rythme de publication du projet justifie une étape de stabilisation avant mise en production. Sur un projet de la taille actuelle de REMOLUX, cette branche n'est pas systématiquement nécessaire — son introduction doit être une décision explicite et documentée, jamais un ajout par défaut.

## `feature/`

Pour toute nouvelle fonctionnalité ou ajout de contenu — `feature/hero-3d-showcase`, `feature/product-comparison-section`.

## `fix/`

Pour toute correction de bug — `fix/scroll-trigger-mobile-offset`, `fix/cls-hero-image`.

## `refactor/`

Pour toute restructuration de code sans changement de comportement fonctionnel visible — `refactor/animations-module-structure`.

## `hotfix/`

Pour toute correction urgente nécessitant une intervention rapide sur `main` (bug critique en production) — `hotfix/broken-amazon-cta-link`. Traité en priorité, avec un cycle de revue accéléré mais jamais supprimé.

## `docs/`

Pour toute modification de documentation uniquement (fichiers `.md`, commentaires de code significatifs) — `docs/update-motion-timings`.

## Convention de nommage

`type/description-courte-en-anglais-kebab-case` — toujours descriptif du contenu réel de la branche, jamais un nom générique (`feature/update`, `fix/bug`).

---

# 4. Les commits

Convention stricte inspirée des [Conventional Commits](https://www.conventionalcommits.org/), en anglais, à l'impératif, format court en première ligne suivi si nécessaire d'un corps explicatif.

## Format

```
<type>(<scope optionnel>): <description courte à l'impératif>

<corps optionnel expliquant le pourquoi, pas le quoi>
```

## Types

- **`feat`** — ajout d'une nouvelle fonctionnalité ou d'un nouveau contenu visible. Ex. : `feat(hero): add 3D product rotation on drag`
- **`fix`** — correction d'un bug. Ex. : `fix(scroll): correct ScrollTrigger offset on mobile Safari`
- **`refactor`** — restructuration de code sans changement de comportement. Ex. : `refactor(animations): extract GSAP timelines into dedicated module`
- **`style`** — changement n'affectant pas la logique (formatage, CSS pur sans impact fonctionnel). Ex. : `style(card): align spacing with design tokens`
- **`perf`** — amélioration de performance. Ex. : `perf(images): convert hero visuals to AVIF`
- **`docs`** — modification de documentation uniquement. Ex. : `docs(motion): clarify easing rules for CTA hover`
- **`test`** — ajout ou modification de tests. Ex. : `test(hero): add viewport regression check`
- **`build`** — changement affectant le système de build ou les dépendances. Ex. : `build(deps): upgrade astro to 4.x`
- **`chore`** — tâche de maintenance ne rentrant dans aucune autre catégorie (nettoyage, configuration). Ex. : `chore(assets): remove unused product textures`

## Exemples de bons commits

```
feat(product-scene): add magnetic mount demonstration animation

fix(footer): correct CLS caused by unset image dimensions

refactor(sections): split Hero into smaller composable blocks

perf(three): compress product model with Draco, reduce size by 68%

docs(rules): add GSAP cleanup requirement clarification
```

## Règles complémentaires

- La ligne de résumé reste sous 72 caractères, à l'impératif ("add", pas "added" ou "adds").
- Le corps du commit (si nécessaire) explique le **pourquoi** de la modification, jamais uniquement ce qui est déjà visible dans le diff.
- Un commit correspond à une seule intention logique — si le message nécessite un "et" pour décrire deux choses différentes, le commit doit être scindé.
- Le scope (entre parenthèses) est optionnel mais recommandé lorsqu'il clarifie immédiatement la zone du projet concernée.

---

# 5. Les Pull Requests

## Quand créer une PR

Systématiquement, pour toute modification destinée à intégrer `main`, dès que la branche de fonctionnalité est complète et testée (cohérent avec `testing.md`) — jamais de fusion directe sans passage par une PR, sauf exception explicitement validée par l'utilisateur.

## Comment rédiger une PR

- **Titre** court, clair, reflétant l'intention principale de la PR (cohérent avec la convention de commit du type dominant).
- **Résumé** en quelques points listant ce qui a changé et pourquoi (le "pourquoi" prime toujours sur le "quoi", déjà visible dans le diff).
- **Plan de test** explicite listant ce qui a été vérifié (cohérent avec `testing.md` section 11) — jamais une PR sans indication de la façon dont le changement a été validé.
- **Captures d'écran ou vidéo** pour toute modification visuelle, animée ou 3D — un changement d'interface sans preuve visuelle est une PR incomplète.

## Quoi vérifier avant de créer une PR

- Le build passe sans erreur.
- Aucune erreur de lint ou de type-check.
- La checklist de `testing.md` a été suivie intégralement pour le périmètre concerné.
- Aucun fichier hors du périmètre annoncé de la tâche n'a été modifié sans raison explicite.
- Aucun secret, fichier généré, ou fichier temporaire n'est inclus.

## Comment relire une PR

- Vérifier que le message de PR et les commits expliquent clairement l'intention.
- Vérifier la cohérence avec l'ensemble des documents de référence du projet (architecture, design, performance, accessibilité selon la nature du changement).
- Tester localement la fonctionnalité, jamais se contenter d'une lecture du diff pour une modification visuelle, animée ou 3D.
- Vérifier l'absence de régression sur les fonctionnalités connexes (cohérent avec `testing.md` section 10).

## Quand refuser une PR

- Le build, le lint, ou le type-check échoue.
- La PR mélange plusieurs sujets non liés (à scinder en plusieurs PR distinctes).
- Le message de PR ne permet pas de comprendre l'intention réelle du changement.
- Un test essentiel (responsive, accessibilité, performance, non-régression) n'a manifestement pas été effectué.
- La PR introduit une dépendance, un pattern ou une déviation non conforme aux règles définies dans les documents de référence (`rules.md`, `architecture.md`) sans justification explicite.

---

# 6. Refactoring

## Quand refactoriser

- Lorsqu'un pattern se répète trois fois ou plus sans factorisation (cohérent avec `architecture.md` section 13).
- Lorsqu'une modification demandée est rendue anormalement difficile par la structure actuelle du code.
- Lorsqu'une incohérence de convention est détectée par rapport aux règles définies dans les documents de référence.

## Comment découper

Un refactoring d'ampleur est toujours découpé en plusieurs commits (voire plusieurs PR) atomiques, chacun laissant le projet dans un état fonctionnel et testable — jamais un unique commit massif qui rendrait la revue et le éventuel rollback impossibles à cibler précisément.

## Comment éviter les régressions

- Le refactoring ne change jamais de comportement fonctionnel observable en même temps qu'il change la structure du code — si un changement de comportement est nécessaire, il fait l'objet d'un commit `feat`/`fix` séparé, avant ou après le refactoring, jamais mélangé.
- Chaque étape du refactoring est testée individuellement (cohérent avec `testing.md`) avant de passer à la suivante.
- Un refactoring de composant partagé est systématiquement revérifié sur l'ensemble de ses points d'usage connus (cohérent avec `testing.md` section 10).

## Comment documenter

Le message de commit ou de PR explique la raison du refactoring (dette identifiée, incohérence corrigée) — jamais uniquement "refactor" sans contexte. Si une décision structurante en résulte, elle est reflétée dans le document de référence concerné (`architecture.md` par exemple) si elle constitue une évolution durable des conventions du projet.

---

# 7. Rollback

## Comment revenir en arrière

La méthode privilégiée sur REMOLUX est **`git revert`**, qui crée un nouveau commit annulant les changements d'un commit précédent, sans réécrire l'historique existant — cohérent avec les règles de `rules.md` interdisant la réécriture d'historique déjà partagé.

## Comment annuler proprement

1. Identifier précisément le commit (ou la plage de commits) responsable du problème, via `git log` et si nécessaire `git bisect` pour localiser l'origine exacte d'une régression.
2. Utiliser `git revert` sur le commit concerné, en conservant un message explicite indiquant la raison de l'annulation (`revert: fix(scroll) broke desktop ScrollTrigger, reverting until proper fix`).
3. Tester immédiatement l'état du projet après le revert (cohérent avec `testing.md`) pour confirmer que le problème est bien résolu et qu'aucun autre effet de bord n'a été introduit par l'annulation elle-même.
4. Documenter dans la PR de revert la raison de l'annulation, pour que l'historique reste compréhensible.

## Quand éviter un revert

- Lorsque le commit problématique a de nombreux commits dépendants construits par-dessus depuis — dans ce cas, un correctif ciblé (`fix`) sur le problème précis est souvent préférable à un revert qui devrait aussi défaire tout le travail dépendant légitime.
- Lorsque seul un aspect mineur du commit pose problème — un correctif ciblé est alors plus précis et moins disruptif qu'une annulation complète.
- `git reset --hard` sur une branche déjà partagée est proscrit par défaut (cohérent avec `rules.md` — jamais de réécriture d'historique partagé sans autorisation explicite) ; il ne peut être envisagé que sur une branche strictement locale et non poussée.

---

# 8. Gestion des conflits

## Merge conflict

Un conflit de fusion survient lorsque deux branches ont modifié la même zone de code de façon incompatible. Il doit toujours être résolu manuellement et consciemment, jamais par un choix automatique aveugle d'une des deux versions sans comprendre l'intention de chacune.

## Résolution

1. Comprendre l'intention de chaque changement en conflit avant de choisir comment les réconcilier — ne jamais résoudre un conflit "au plus simple" sans vérifier que le résultat préserve bien les deux intentions légitimes.
2. Reconstruire manuellement la version finale qui intègre correctement les deux changements, en respectant les conventions de code du projet (`architecture.md`, `rules.md`).
3. Si l'intention d'un des deux changements n'est pas claire, consulter l'auteur (ou l'utilisateur dans le cas d'un agent) avant de trancher arbitrairement.

## Validation

Après résolution, le code doit être relu intégralement dans les zones concernées par le conflit — un conflit mal résolu produit souvent une régression silencieuse qui ne se manifeste pas immédiatement au build.

## Tests

Aucune résolution de conflit n'est considérée comme terminée sans un passage complet par le protocole de validation défini dans `testing.md` section 11 — un conflit touche presque toujours une zone de code sensible où deux logiques se sont développées en parallèle, donc à haut risque de régression.

---

# 9. Erreurs interdites

- **Commit `"fix"`** (ou tout message générique similaire) — chaque commit doit décrire précisément ce qui a été corrigé et si possible pourquoi (section 4).
- **Commit `"update"`** — ne dit rien sur la nature réelle du changement ; toujours préciser le type et le contenu réel.
- **Commit `"test"`** ou `"wip"` livré tel quel — un commit de travail en cours n'est jamais poussé en l'état sur une branche partagée sans être explicitement signalé comme tel, et jamais fusionné dans `main` sous cette forme.
- **Commit énorme** — un commit qui modifie des dizaines de fichiers sans lien logique clair doit être scindé en plusieurs commits atomiques (section 1 et 6).
- **Plusieurs fonctionnalités dans un commit** — chaque commit correspond à une seule intention logique ; deux fonctionnalités indépendantes appartiennent à deux commits (voire deux branches) distincts.
- **Push direct sur `main`** — toute modification passe par une branche dédiée et une Pull Request, sauf autorisation explicite de l'utilisateur (cohérent avec `rules.md` et le Git Safety Protocol général).
- **Commit cassant le build** — aucun commit n'est créé sans vérification préalable que le build, le lint et le type-check passent (cohérent avec `testing.md`).
- **Force push sur une branche partagée** — jamais sans confirmation explicite de l'utilisateur (cohérent avec `rules.md`), et jamais sur `main`.
- **Amend d'un commit déjà partagé** — jamais de réécriture d'un commit déjà poussé et potentiellement récupéré par d'autres, sauf autorisation explicite.
- **Fichiers sensibles committés** — aucun secret, clé API, token, ou fichier de configuration sensible ne doit jamais être committé (cohérent avec `rules.md` section sécurité).
- **`.gitignore` mal tenu** — les fichiers générés, temporaires, ou dépendants de l'environnement local ne doivent jamais être committés ; le `.gitignore` du projet doit être maintenu à jour en conséquence.
- **Branches non nettoyées** — une branche fusionnée et non supprimée s'accumule et complique la lisibilité du dépôt dans le temps.
- **Messages de commit en français mêlés à de l'anglais** — la convention du projet est l'anglais pour les messages de commit (cohérent avec `rules.md` section Git) ; aucun mélange incohérent d'une langue à l'autre.
- **`git add -A` ou `git add .` sans vérification** — toujours vérifier le contenu réel de ce qui est stagé avant de committer, jamais un ajout massif non contrôlé qui risquerait d'inclure un fichier sensible ou non désiré.

---

# 10. Workflow Git obligatoire

Workflow strict à suivre pour toute tâche de développement sur REMOLUX :

1. **Analyse** — comprendre précisément la nature et le périmètre de la tâche avant toute action Git ; déterminer le type de branche approprié (section 3).
2. **Branche** — créer une branche dédiée depuis `main` à jour, nommée selon la convention (`type/description-courte`).
3. **Développement** — implémenter la modification en respectant l'ensemble des documents de référence applicables (`architecture.md`, `design.md`, `rules.md`, etc. selon la nature de la tâche).
4. **Tests** — exécuter le protocole de validation complet défini dans `testing.md` avant tout commit.
5. **Commit** — créer un ou plusieurs commits atomiques, conformes à la convention de la section 4, chacun testé individuellement.
6. **Push** — pousser la branche vers le dépôt distant régulièrement, jamais en fin de tâche uniquement.
7. **Validation** — vérifier une dernière fois l'ensemble du diff avant de proposer la fusion (revue de son propre travail à froid, cohérent avec `architecture.md` section 15).
8. **Merge** — fusionner via Pull Request (section 5) une fois la revue effectuée, puis supprimer la branche.

Aucune étape de ce workflow n'est sautée, même pour une modification qui semble mineure.

---

# 11. Checklist Git

À utiliser obligatoirement avant tout commit.

## Avant de committer

- [ ] Le build passe sans erreur.
- [ ] Aucune erreur de lint ou de type-check n'a été ignorée.
- [ ] Le protocole de validation de `testing.md` a été suivi pour le périmètre du changement.
- [ ] Aucun `console.log`, code de debug, ou fichier temporaire n'est inclus dans les changements.
- [ ] Le contenu réellement stagé a été vérifié (`git status`, `git diff`), pas seulement supposé correct.

La checklist opérationnelle complète (contenu du commit, message, branche, Pull Request, validation finale) est centralisée dans [`checklist.md`](./checklist.md) section 16 « Git » — elle ne doit pas être dupliquée ici.
