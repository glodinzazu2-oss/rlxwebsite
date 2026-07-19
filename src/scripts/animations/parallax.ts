/**
 * Parallaxe légère pilotée par attribut :
 *   data-parallax="0.15" → l'élément dérive de 15% de la hauteur scrollée.
 * GPU-only (transform), scrub doux, désactivée si prefers-reduced-motion.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initParallax(): void {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax ?? '0.1');
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
  });
}
