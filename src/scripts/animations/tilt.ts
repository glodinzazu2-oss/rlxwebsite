/**
 * Tilt interactif au curseur sur un élément marqué [data-tilt].
 * Le produit s'incline légèrement vers le curseur pour donner une sensation
 * de profondeur et de matière — comme si l'objet répondait au regard.
 *
 * Purement décoratif : transform uniquement (composité GPU, 60fps), amplitude
 * volontairement discrète. Désactivé au tactile (le survol n'a pas de sens sur
 * mobile) et sous prefers-reduced-motion — voir motion.md §8, §11, §12, §13.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

/** Inclinaison maximale en degrés aux bords — assez pour être ressentie, jamais spectaculaire. */
const MAX_TILT_DEG = 5;
/** Léger soulèvement au survol, cohérent avec le hover des cartes (motion.md §8). */
const LIFT_SCALE = 1.02;

export function initTilt(): void {
  if (prefersReducedMotion()) return;
  // Le tilt suit un pointeur fin (souris/trackpad) ; aucun sens au toucher.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });

    // quickTo : mises à jour lissées et performantes, sans recréer de tween à chaque frame.
    // scaleX/scaleY plutôt que le raccourci `scale` (conflit avec la propriété CSS native).
    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const scaleX = gsap.quickTo(el, 'scaleX', { duration: 0.6, ease: 'power3.out' });
    const scaleY = gsap.quickTo(el, 'scaleY', { duration: 0.6, ease: 'power3.out' });

    const setScale = (v: number) => {
      scaleX(v);
      scaleY(v);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // [-1, 1]
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      rotY(nx * MAX_TILT_DEG);
      rotX(-ny * MAX_TILT_DEG);
    };

    const onEnter = () => setScale(LIFT_SCALE);
    const onLeave = () => {
      rotX(0);
      rotY(0);
      setScale(1);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  });
}
