/**
 * Section Technologie — narration au scroll.
 * Les étapes se révèlent progressivement avec une ligne de progression animée.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initTechnologyScroll(): void {
  const section = document.querySelector<HTMLElement>('[data-tech-section]');
  if (!section || prefersReducedMotion()) return;

  const line = section.querySelector<HTMLElement>('[data-tech-line]');
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.8,
        },
      }
    );
  }

  section.querySelectorAll<HTMLElement>('[data-tech-step]').forEach((step) => {
    gsap.from(step, {
      opacity: 0,
      x: -32,
      duration: 1,
      scrollTrigger: {
        trigger: step,
        start: 'top 75%',
        once: true,
      },
    });
  });
}
