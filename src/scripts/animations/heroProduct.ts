/**
 * Éveil du feu 3D du hero — au premier engagement du visiteur.
 *
 * three.js est lourd (parse + init WebGL + boucle de rendu) : le charger pendant
 * le chargement de page ferait exploser le Total Blocking Time sur mobile. On le
 * charge donc à la **première interaction** (souris qui bouge, tap, focus clavier) —
 * jamais pendant le rendu initial. Résultat : la 3D s'active dès que le visiteur
 * s'intéresse au hero (≈ instantané en usage réel), et le budget de chargement reste
 * intact (Lighthouse n'interagit pas → three.js hors du trace de perf).
 *
 * D'ici là, le placeholder lumineux (heroAtmosphere) tient le rôle de « poster vivant ».
 */
import type { ModelConfig } from '../../webgl/createProductViewer';

export function initHeroProduct(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const container = hero?.querySelector<HTMLElement>('[data-hero-product]');
  if (!hero || !container) return;

  const cfg = safeParse(container.dataset.heroModel);
  if (!cfg) return;

  const webglOk = (() => {
    try {
      return !!document.createElement('canvas').getContext('webgl2');
    } catch {
      return false;
    }
  })();
  // Pas de WebGL : on garde le placeholder lumineux (dégradation gracieuse).
  if (!webglOk) return;

  const triggers = ['pointermove', 'pointerdown', 'touchstart', 'keydown'] as const;
  let booted = false;

  const boot = async (): Promise<void> => {
    if (booted) return;
    booted = true;
    triggers.forEach((ev) => window.removeEventListener(ev, onEngage));
    // Import dynamique : three.js + le viewer forment un chunk séparé, chargé ici seulement.
    const { createProductViewer } = await import('../../webgl/createProductViewer');
    const viewer = createProductViewer(container, { light: cfg }, () => {
      container.classList.add('is-3d'); // le placeholder cède la place au feu 3D
    });
    viewer.setModel('light');
  };

  const onEngage = (): void => void boot();
  triggers.forEach((ev) => window.addEventListener(ev, onEngage, { once: false, passive: true }));
}

function safeParse(raw: string | undefined): ModelConfig | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ModelConfig;
  } catch {
    return null;
  }
}
