/**
 * Système de reveal générique piloté par attributs data-* :
 *   data-reveal            → apparition au scroll (fade + translation)
 *   data-reveal-delay="x"  → délai en secondes (stagger manuel)
 * Les états initiaux sont posés en CSS (.js [data-reveal]) pour éviter tout flash.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initReveals(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!elements.length) return;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  elements.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? '0');
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onComplete: () => {
        el.style.willChange = 'auto';
      },
    });
  });
}
