# WebGL / Three.js — scènes 3D

Ce dossier contient les scènes 3D du site. Three.js est actif depuis le 24/07/2026.

## Implémentation de référence

`createProductViewer.ts` — visualiseur du kit REMOLUX (feu, émetteur, mallette),
monté par `components/sections/Product3D.astro` en island `client:visible` (import
dynamique → chunk séparé chargé à l'approche du viewport). Studio PMREM/RoomEnvironment,
OrbitControls bridés, chargement GLB avec cache, `dispose()` complet, boucle suspendue
hors viewport. Modèles dans `src/assets/models/` (textures optimisées 1K). Voir `.claude/three.md`.

## Principe

- Chaque scène est un module autonome chargé **dynamiquement** (code splitting)
  et **uniquement** si l'élément cible est présent et visible.

## Pattern d'intégration recommandé

```ts
// src/webgl/hero-scene.ts (exemple à venir)
// export async function mountHeroScene(canvas: HTMLCanvasElement) { ... }

// Dans main.ts — import dynamique conditionné à la présence du canvas :
const canvas = document.querySelector<HTMLCanvasElement>('[data-webgl-hero]');
if (canvas && !prefersReducedMotion()) {
  const io = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting) {
      const { mountHeroScene } = await import('../webgl/hero-scene');
      mountHeroScene(canvas);
      io.disconnect();
    }
  });
  io.observe(canvas);
}
```

## Règles

1. Toujours `import()` dynamique — jamais d'import statique de Three.js.
2. Toujours désactiver si `prefers-reduced-motion`.
3. Toujours prévoir un fallback visuel (image/SVG) : la 3D est un bonus, pas un prérequis.
4. Limiter le devicePixelRatio à 2 max pour la performance.
5. Disposer (`dispose()`) géométries/textures à la destruction de la scène.
