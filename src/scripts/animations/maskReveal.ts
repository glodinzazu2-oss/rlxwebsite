/**
 * Révélation par masque — un cache recouvre le média puis se retire vers le haut
 * à l'entrée dans le viewport (transform GPU, une seule fois). Signature « wipe »
 * des sites primés. Le cache [data-mask] vit à l'intérieur d'un [data-mask-reveal].
 *
 * Sans JS / prefers-reduced-motion : le cache est rétracté d'emblée (image visible).
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initMaskReveals(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-mask-reveal]');
  if (!items.length) return;

  const reduce = prefersReducedMotion();

  items.forEach((el) => {
    const mask = el.querySelector<HTMLElement>('[data-mask]');
    if (!mask) return;

    if (reduce) {
      gsap.set(mask, { scaleY: 0 });
      return;
    }

    gsap.to(mask, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true,
      },
    });
  });
}
