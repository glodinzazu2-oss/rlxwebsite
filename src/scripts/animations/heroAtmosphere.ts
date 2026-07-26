/**
 * Atmosphère réactive du hero — champ lumineux en canvas.
 *
 * Couche de « peinture instantanée » : légère (~2 Ko), démarre tout de suite pour
 * donner vie au hero avant que la 3D ne s'éveille (chargement progressif, voir
 * heroProduct.ts). Un halo volumétrique + des poussières de lumière suivent le
 * curseur (ou l'inclinaison sur mobile) ; parallaxe multi-plans via variables CSS.
 *
 * Garde-fous : DPR plafonné à 2, boucle suspendue hors onglet, image fixe sous
 * prefers-reduced-motion. transform/opacity uniquement (GPU).
 */
import { prefersReducedMotion } from '../core/motion';

interface Mote {
  x: number; // position normalisée 0..1
  y: number;
  r: number; // rayon px
  d: number; // profondeur (facteur de parallaxe)
  vx: number;
  vy: number;
  c: string; // couleur "r,g,b"
  a: number; // alpha de base
}

export function initHeroAtmosphere(): void {
  const heroEl = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = heroEl?.querySelector<HTMLCanvasElement>('[data-hero-field]');
  const context = canvas?.getContext('2d');
  if (!heroEl || !canvas || !context) return;

  // Locaux non-nuls (évite les assertions dans les closures ci-dessous).
  const hero = heroEl;
  const cv = canvas;
  const ctx = context;

  const grid = hero.querySelector<HTMLElement>('[data-hero-grid]');
  const product = hero.querySelector<HTMLElement>('[data-hero-product]');
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');
  const reduce = prefersReducedMotion();

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0;
  let H = 0;
  let motes: Mote[] = [];
  // cible (tx,ty) et centre lissé (gx,gy) du halo, normalisés 0..1
  let tx = 0.66;
  let ty = 0.46;
  let gx = tx;
  let gy = ty;
  let intensity = 0; // rampe d'allumage 0..1
  let pointerActive = false;
  let raf = 0;

  const PALETTE = ['255,30,45', '255,180,84', '226,232,240'];

  function resize(): void {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    if (w === 0 || h === 0) return; // layout pas encore prêt : on ne zéro-ise pas le buffer
    W = w;
    H = h;
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function seed(): void {
    const n = Math.min(30, Math.round((W * H) / 36000));
    motes = [];
    for (let i = 0; i < n; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 1.7,
        d: 0.2 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.00006,
        vy: -0.00004 - Math.random() * 0.00006,
        c: PALETTE[(Math.random() * PALETTE.length) | 0] ?? '255,30,45',
        a: 0.14 + Math.random() * 0.46,
      });
    }
  }

  function draw(): void {
    intensity += (1 - intensity) * 0.02;
    gx += (tx - gx) * 0.06;
    gy += (ty - gy) * 0.06;

    const now = performance.now();
    const breathe = 0.5 + 0.5 * Math.sin(now / 2600);
    const cx = gx * W;
    const cy = gy * H;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // Halo volumétrique rouge (source de lumière REMOLUX)
    const R = Math.max(W, H) * (0.5 + 0.06 * breathe);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    const i2 = intensity;
    g.addColorStop(0, `rgba(255,54,68,${0.4 * i2})`);
    g.addColorStop(0.22, `rgba(255,30,45,${0.19 * i2})`);
    g.addColorStop(0.5, `rgba(120,36,54,${0.07 * i2})`);
    g.addColorStop(1, 'rgba(5,6,9,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Liseré ambré décalé (chaleur du clignotant)
    const ax = cx + W * 0.12;
    const ay = cy + H * 0.06;
    const ag = ctx.createRadialGradient(ax, ay, 0, ax, ay, R * 0.5);
    ag.addColorStop(0, `rgba(255,180,84,${0.09 * i2})`);
    ag.addColorStop(1, 'rgba(255,180,84,0)');
    ctx.fillStyle = ag;
    ctx.fillRect(0, 0, W, H);

    // Poussières de lumière + parallaxe vers le centre du halo
    const ox = gx - 0.5;
    const oy = gy - 0.5;
    for (const m of motes) {
      if (!reduce) {
        m.x += m.vx;
        m.y += m.vy;
      }
      if (m.y < -0.02) {
        m.y = 1.02;
        m.x = Math.random();
      }
      if (m.x < -0.02) m.x = 1.02;
      if (m.x > 1.02) m.x = -0.02;
      const px = (m.x - ox * m.d * 0.12) * W;
      const py = (m.y - oy * m.d * 0.12) * H;
      ctx.beginPath();
      ctx.arc(px, py, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${m.c},${m.a * i2})`;
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    // Parallaxe des plans (variables CSS lues par le style scoped du hero)
    setVar(product, -26 * ox, -18 * oy);
    setVar(content, 12 * ox, 7 * oy);
    setVar(grid, -22 * ox, -22 * oy);
  }

  function setVar(el: HTMLElement | null, x: number, y: number): void {
    if (!el) return;
    el.style.setProperty('--px', `${x.toFixed(1)}px`);
    el.style.setProperty('--py', `${y.toFixed(1)}px`);
  }

  // Effet ambiant lent : 30 i/s suffit largement et divise par ~2 le coût CPU du
  // canvas (remplissages de dégradés plein écran) — stabilise le TBT mobile.
  const FRAME_MS = 1000 / 30;
  let lastDraw = 0;
  function frame(now: number): void {
    raf = requestAnimationFrame(frame);
    if (now - lastDraw < FRAME_MS) return;
    lastDraw = now;
    draw();
  }
  function start(): void {
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function stop(): void {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width;
    ty = (e.clientY - r.top) / r.height;
    pointerActive = true;
    hero.classList.add('is-pointed');
  });

  window.addEventListener(
    'deviceorientation',
    (e) => {
      if (pointerActive || e.gamma == null) return;
      tx = 0.5 + clamp(e.gamma / 45, -1, 1) * 0.35;
      ty = 0.5 + clamp(((e.beta ?? 45) - 45) / 45, -1, 1) * 0.25;
    },
    true,
  );

  // ResizeObserver : capte le dimensionnement initial (layout/police) ET les
  // changements de viewport — plus fiable que l'événement window 'resize' seul.
  let lastW = 0;
  let lastH = 0;
  const ro = new ResizeObserver(() => {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    if (w === 0 || h === 0 || (w === lastW && h === lastH)) return;
    lastW = w;
    lastH = h;
    resize();
    seed();
    if (reduce) draw();
  });
  ro.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!reduce) start();
  });

  resize();
  seed();

  if (reduce) {
    intensity = 1;
    draw(); // une image fixe, pas de boucle
  } else {
    start();
  }
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
