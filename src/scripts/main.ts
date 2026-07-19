/**
 * Point d'entrée unique du JavaScript du site.
 * Chargé une fois par BaseLayout. Chaque module est autonome et défensif
 * (ne fait rien si ses éléments cibles sont absents de la page).
 */
import { initSmoothScroll } from './core/smooth-scroll';
import { initReveals } from './animations/reveal';
import { initParallax } from './animations/parallax';
import { playHeroIntro, startLedPulse } from './animations/hero';
import { initTechnologyScroll } from './animations/technology';
import { prefersReducedMotion } from './core/motion';
import { getDictionary } from '../i18n';

/** Loader : visible uniquement à la première visite de la session */
function runLoader(onDone: () => void): void {
  const loader = document.getElementById('loader');
  if (!loader) return onDone();

  const seen = sessionStorage.getItem('rlx-loader');
  if (seen || prefersReducedMotion()) {
    loader.remove();
    return onDone();
  }

  sessionStorage.setItem('rlx-loader', '1');
  loader.classList.add('is-leaving');
  loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  // Sécurité : suppression forcée si transitionend ne se déclenche pas
  window.setTimeout(() => loader.isConnected && loader.remove(), 1600);
  window.setTimeout(onDone, 350);
}

/** Header : état compact + fond au scroll */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Menu mobile accessible */
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const t = getDictionary();

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? t.nav.menuClose : t.nav.menuOpen);
    menu.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () =>
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  );
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function init(): void {
  document.documentElement.classList.add('js');
  initSmoothScroll();
  initHeader();
  initMenu();
  initReveals();
  initParallax();
  initTechnologyScroll();
  startLedPulse();
  runLoader(playHeroIntro);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
