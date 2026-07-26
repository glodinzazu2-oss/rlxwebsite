/**
 * Section Technologie — narration au scroll.
 * La ligne de progression « allume » le circuit : chaque nœud d'étape s'illumine
 * (classe .is-lit) à son entrée dans le viewport, en écho à la ligne qui monte.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function initTechnologyScroll(): void {
  const section = document.querySelector<HTMLElement>('[data-tech-section]');
  if (!section) return;

  const steps = section.querySelectorAll<HTMLElement>('[data-tech-step]');

  // Mouvement réduit : circuit allumé d'emblée, sans animation.
  if (prefersReducedMotion()) {
    steps.forEach((step) => step.classList.add('is-lit'));
    return;
  }

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
      },
    );
  }

  steps.forEach((step) => {
    gsap.from(step, {
      opacity: 0,
      x: -32,
      duration: 1,
      scrollTrigger: {
        trigger: step,
        start: 'top 75%',
        once: true,
        onEnter: () => step.classList.add('is-lit'),
      },
    });
  });
}
