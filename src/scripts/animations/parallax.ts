/**
 * Parallaxe au scroll — profondeur continue.
 *   [data-parallax="0.2"] → l'élément dérive de 20% de sa hauteur au scroll.
 * Les halos ambiants [data-reactive-glow] dérivent aussi (couche lumineuse qui
 * bouge sous le contenu), en plus de suivre le curseur. GPU-only (transform),
 * scrub doux, désactivé si prefers-reduced-motion.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

function applyParallax(el: HTMLElement, speed: number): void {
  gsap.to(el, {
    yPercent: speed * -100,
    ease: 'none',
    scrollTrigger: {
      trigger: el.parentElement ?? el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
    },
  });
}

export function initParallax(): void {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    applyParallax(el, parseFloat(el.dataset.parallax ?? '0.2'));
  });

  // Couche lumineuse : les halos dérivent au scroll (profondeur), en plus du curseur.
  document.querySelectorAll<HTMLElement>('[data-reactive-glow]').forEach((el) => {
    applyParallax(el, 0.24);
  });
}
