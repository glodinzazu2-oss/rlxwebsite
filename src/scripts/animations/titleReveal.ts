/**
 * Révélation des titres de section ligne par ligne.
 * Chaque ligne (masquée par overflow) monte de sous son masque à l'entrée dans
 * le viewport, en cascade — le « poli » signature des sites primés.
 *
 * transform GPU uniquement, une seule fois par titre. Sous prefers-reduced-motion,
 * les lignes sont posées directement à leur place (aucune translation).
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initTitleReveals(): void {
  const titles = document.querySelectorAll<HTMLElement>('[data-reveal-lines]');
  if (!titles.length) return;

  const reduce = prefersReducedMotion();

  titles.forEach((title) => {
    const lines = title.querySelectorAll<HTMLElement>('.section-heading__line-inner');
    if (!lines.length) return;

    if (reduce) {
      gsap.set(lines, { yPercent: 0 });
      return;
    }

    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
        },
      },
    );
  });
}
