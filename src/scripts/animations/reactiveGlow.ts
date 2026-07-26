/**
 * Halo ambiant réactif — primitive légère (sans canvas) pour les sections.
 *
 * Chaque `[data-reactive-glow]` voit le centre de son dégradé radial suivre le
 * curseur dans sa zone `[data-glow-zone]` (via les variables CSS --gx/--gy).
 * Mise à jour throttlée en rAF, désactivée sous prefers-reduced-motion (le halo
 * garde alors sa position/respiration par défaut). Réutilisable sur toute section.
 */
import { prefersReducedMotion } from '../core/motion';

export function initReactiveGlow(): void {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-reactive-glow]').forEach((glow) => {
    const zone = glow.closest<HTMLElement>('[data-glow-zone]') ?? glow.parentElement;
    if (!zone) return;

    let raf = 0;
    let gx = 50;
    let gy = 40;
    const apply = (): void => {
      raf = 0;
      glow.style.setProperty('--gx', `${gx.toFixed(1)}%`);
      glow.style.setProperty('--gy', `${gy.toFixed(1)}%`);
    };

    zone.addEventListener(
      'pointermove',
      (e) => {
        const r = zone.getBoundingClientRect();
        gx = ((e.clientX - r.left) / r.width) * 100;
        gy = ((e.clientY - r.top) / r.height) * 100;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );
  });
}
