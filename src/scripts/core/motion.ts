/**
 * Noyau motion — enregistrement GSAP + respect des préférences utilisateur.
 * Toute animation du site passe par ce module.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** true si l'utilisateur préfère un mouvement réduit → aucune animation décorative */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Défauts globaux : courbe signature du site */
gsap.defaults({
  ease: 'expo.out',
  duration: 0.9,
});
