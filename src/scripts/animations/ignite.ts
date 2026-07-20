/**
 * Allumage LED au scroll : quand une scène entre dans le viewport, les feux
 * REMOLUX « prennent vie » — un halo rouge éclot brièvement puis se stabilise,
 * évoquant la connexion magnétique qui s'établit.
 *
 * Déclenché une seule fois par scène (jamais en boucle — motion.md §14 « silence »).
 * transform/opacity uniquement (GPU). Sous prefers-reduced-motion : les halos
 * sont posés directement à leur état stable, sans animation d'éclosion.
 *
 * Prototype : appliqué à une seule scène pour validation du placement et du ton
 * sur preview réelle avant extension aux autres univers (voir roadmap.md §10).
 */
import { gsap, ScrollTrigger, prefersReducedMotion } from '../core/motion';

/** Opacité stable du halo une fois « allumé ». */
const SETTLED_OPACITY = 0.42;

export function initIgnite(): void {
  document.querySelectorAll<HTMLElement>('[data-ignite-group]').forEach((group) => {
    const glows = group.querySelectorAll<HTMLElement>('[data-ignite]');
    if (!glows.length) return;

    if (prefersReducedMotion()) {
      gsap.set(glows, { opacity: SETTLED_OPACITY, scaleX: 1, scaleY: 1 });
      return;
    }

    gsap.set(glows, { opacity: 0, scaleX: 0.4, scaleY: 0.4 });

    ScrollTrigger.create({
      trigger: group,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap
          .timeline()
          // Éclosion : montée nette (l'allumage)
          .to(glows, {
            opacity: 0.9,
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 0.22,
            ease: 'power2.out',
            stagger: 0.12,
          })
          // Stabilisation : le halo se pose à son intensité de repos
          .to(
            glows,
            {
              opacity: SETTLED_OPACITY,
              scaleX: 1,
              scaleY: 1,
              duration: 0.5,
              ease: 'power2.inOut',
              stagger: 0.12,
            },
            '-=0.05',
          );
      },
    });
  });
}
