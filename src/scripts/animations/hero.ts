/**
 * Allumage du hero — séquence d'entrée « ignition ».
 * Jouée après le loader : ajoute `.lit` sur le hero, ce qui déclenche la révélation
 * échelonnée (transitions CSS scoped dans Hero.astro). Sous prefers-reduced-motion,
 * le CSS pose directement l'état final — l'ajout de la classe reste sans effet visible.
 */
export function playHeroIntro(): void {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add('lit'));
}
