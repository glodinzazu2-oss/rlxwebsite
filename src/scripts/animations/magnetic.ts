/**
 * Interaction « magnétique » — les éléments marqués [data-magnetic] attirent
 * légèrement le curseur (signature des sites primés Awwwards). Le contenu interne
 * marqué [data-magnetic-inner] dérive un peu plus fort → sensation de profondeur
 * (le libellé flotte dans le champ magnétique).
 *
 * quickTo (GSAP) : lissage performant, transform GPU uniquement, aucun tween
 * recréé par frame. Actif au pointeur fin seulement (aucun sens au tactile) et
 * désactivé sous prefers-reduced-motion.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

/** Force par défaut : fraction de la distance curseur→centre reportée sur l'élément. */
const DEFAULT_STRENGTH = 0.3;
/** Le contenu interne suit un peu plus (profondeur). */
const INNER_RATIO = 0.4;

export function initMagnetic(): void {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '') || DEFAULT_STRENGTH;
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const innerX = inner ? gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' }) : null;
    const innerY = inner ? gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' }) : null;

    const onMove = (e: PointerEvent): void => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      moveX(dx * strength);
      moveY(dy * strength);
      if (innerX && innerY) {
        innerX(dx * strength * INNER_RATIO);
        innerY(dy * strength * INNER_RATIO);
      }
    };

    const onLeave = (): void => {
      moveX(0);
      moveY(0);
      innerX?.(0);
      innerY?.(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  });
}
