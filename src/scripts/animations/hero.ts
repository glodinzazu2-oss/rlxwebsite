/**
 * Séquence d'introduction du hero — cinématique d'entrée.
 * Jouée après le loader. Ordre : lignes du titre → sous-titre → CTA → visuel LED.
 */
import { gsap, prefersReducedMotion } from '../core/motion';

export function playHeroIntro(): void {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  if (prefersReducedMotion()) {
    gsap.set('[data-hero-line], [data-hero-fade], [data-hero-visual]', {
      opacity: 1,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.to('[data-hero-line]', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.12,
  })
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.7')
    .to('[data-hero-visual]', { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 1.4 }, '-=0.8')
    .from('[data-led-glow]', { opacity: 0, duration: 1.6, ease: 'power2.inOut' }, '-=0.9');
}

/** Pulsation continue des LED du visuel hero (boucle discrète, GPU only) */
export function startLedPulse(): void {
  if (prefersReducedMotion()) return;
  gsap.to('[data-led-glow]', {
    opacity: 0.55,
    duration: 1.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}
