# WebGL / Three.js — architecture prête, non imposée

Ce dossier accueillera les scènes 3D (produit en 3D, environnement HDRI, réflexions)
**sans alourdir le site tant qu'elles ne sont pas nécessaires**.

## Principe

- Three.js n'est **pas** installé par défaut : zéro poids inutile dans le bundle.
- Quand une scène 3D sera prête : `npm install three @types/three`.
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
