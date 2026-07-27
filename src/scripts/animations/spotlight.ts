/**
 * Reflet « spotlight » qui suit le curseur sur la surface d'une carte.
 * Chaque [data-spotlight] met à jour --mx/--my (throttle rAF) ; le reflet est
 * dessiné en CSS (dégradé radial en mode screen), révélé au survol via .is-spot.
 *
 * Pointeur fin uniquement, coupé sous prefers-reduced-motion. Aucun coût hors survol.
 */
import { prefersReducedMotion } from '../core/motion';

export function initSpotlight(): void {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    let raf = 0;
    let mx = 50;
    let my = 50;
    const apply = (): void => {
      raf = 0;
      el.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${my.toFixed(1)}%`);
    };

    el.addEventListener('pointerenter', () => el.classList.add('is-spot'));
    el.addEventListener('pointerleave', () => el.classList.remove('is-spot'));
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width) * 100;
        my = ((e.clientY - r.top) / r.height) * 100;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );
  });
}
