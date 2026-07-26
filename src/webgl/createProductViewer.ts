/**
 * Visualiseur 3D produit REMOLUX — three.js vanilla, encapsulé (voir three.md).
 *
 * Une scène, un renderer, une caméra. Charge les modèles GLB à la demande (cache).
 * Fond transparent : l'objet flotte sur la page. Éclairage studio par IBL
 * (RoomEnvironment via PMREM) atténué pour un rendu sombre premium, clé blanche
 * neutre (couleurs de matériaux fidèles) et liseré rouge de marque ; ombre de
 * contact douce (ShadowMaterial) pour ancrer l'objet sans le mettre en boîte.
 * Chaque objet a sa pose et ses bornes de zoom (mallette bridée pour ne pas
 * exposer les petits marquages). Changement d'objet en fondu + rotation d'accueil
 * (GSAP, cohérent avec motion.md §8). OrbitControls bornés en rotation verticale.
 * Boucle de rendu suspendue hors viewport.
 *
 * Interface stable : createProductViewer(container, models) -> { setModel, dispose }.
 * Aucun autre module ne manipule les objets three.js internes.
 */
import { gsap } from 'gsap';
import {
  Box3,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  type Material,
  NeutralToneMapping,
  type Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type ModelKey = string;

export interface ModelConfig {
  url: string;
  /** Azimut caméra (° autour de Y) — 0 = face. Donne l'angle de vue initial. */
  azimuthDeg?: number;
  /** Angle polaire caméra (° depuis Y) — 90 = horizontal, <90 = légèrement au-dessus. */
  polarDeg?: number;
  /** Multiplicateur de distance de cadrage (plus grand = plus loin). */
  distanceScale?: number;
  /** Zoom min autorisé, en fraction de la distance initiale (grand = ne peut pas s'approcher). */
  minZoomScale?: number;
  /** Zoom max autorisé, en fraction de la distance initiale. */
  maxZoomScale?: number;
  /** Angle polaire max (°) : borne la bascule vers le bas. Défaut ~97°. Baisser
   *  pour interdire de voir la face inférieure (ex. écriture d'usine du feu LED). */
  maxPolarDeg?: number;
  /** Points d'intérêt cliquables ancrés sur l'objet (voir HotspotConfig). */
  hotspots?: HotspotConfig[];
}

export interface HotspotConfig {
  /** Position sur l'objet, en fractions [-1..1] des demi-dimensions (0 = centre, 1 = bord). */
  pos: [number, number, number];
  /** Normale sortante : sert au masquage du point quand il passe derrière l'objet. */
  normal: [number, number, number];
  /** Libellé court (titre de l'info-bulle + nom accessible). */
  label: string;
  /** Phrase descriptive affichée dans l'info-bulle. */
  text: string;
}

/** Borne basse par défaut de la rotation verticale (juste sous l'horizontale). */
const DEFAULT_MAX_POLAR_DEG = 97.2; // = Math.PI * 0.54

export interface ProductViewer {
  setModel(key: ModelKey): void;
  dispose(): void;
}

const INTRO_FROM = -0.5; // rad : l'objet s'installe depuis ~-29° jusqu'à sa pose de repos
const OUT_DUR = 0.18;
const IN_FADE_DUR = 0.4;
const IN_ROT_DUR = 1.0;

/** Matériau vu comme fondable — on mémorise son opacité/transparence de base. */
type FadeMaterial = Material & { userData: { baseOpacity?: number; baseTransparent?: boolean } };

function eachMaterial(object: Object3D, fn: (m: FadeMaterial) => void): void {
  object.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) fn(m as FadeMaterial);
  });
}

function primeFade(object: Object3D): void {
  eachMaterial(object, (m) => {
    if (m.userData.baseOpacity === undefined) {
      m.userData.baseOpacity = m.opacity;
      m.userData.baseTransparent = m.transparent;
    }
  });
}

/** Applique un facteur de fondu [0..1] en préservant l'opacité de base (verre translucide inclus). */
function applyFade(object: Object3D, f: number): void {
  eachMaterial(object, (m) => {
    m.opacity = (m.userData.baseOpacity ?? 1) * f;
    const wantTransparent = f < 0.999 ? true : (m.userData.baseTransparent ?? false);
    if (m.transparent !== wantTransparent) {
      m.transparent = wantTransparent;
      m.needsUpdate = true;
    }
  });
}

export function createProductViewer(
  container: HTMLElement,
  models: Record<ModelKey, ModelConfig>,
  onReady?: () => void,
): ProductViewer {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let notifiedReady = false;

  // --- Renderer ---
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // transparent : l'objet flotte sur le fond de la page
  renderer.outputColorSpace = SRGBColorSpace;
  // Khronos PBR Neutral : restitution fidèle des couleurs et matières (pensé pour le
  // rendu produit), sans la sur-saturation « jeu vidéo » d'ACES.
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  // Rendu purement visuel : l'info produit passe par le texte/l'alt du repli.
  renderer.domElement.setAttribute('aria-hidden', 'true');

  // --- Scene + éclairage studio (IBL) ---
  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture; // reflets studio sur plastique/métal/verre
  // IBL affirmé : ce sont les reflets de l'environnement qui donnent la sensation de
  // vraie matière (plastique mat qui accroche la lumière du studio).
  scene.environmentIntensity = 0.9;

  // Éclairage studio 3 points. Clé blanche neutre, pénombre douce (softbox).
  const keyLight = new DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(2.6, 4.2, 3.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.normalBias = 0.02;
  keyLight.shadow.radius = 8; // bord d'ombre adouci (PCFSoft)
  // Fill froid : débouche les ombres et révèle le relief, sans les écraser.
  const fillLight = new DirectionalLight(0xdfe7f2, 0.45);
  fillLight.position.set(-3, 1.6, 2.6);
  // Liseré rouge de marque : accentue les arêtes sans teinter les matériaux.
  const rimLight = new DirectionalLight(0xff1e2d, 0.55);
  rimLight.position.set(-3.5, 1.8, -4);
  scene.add(keyLight, fillLight, rimLight);

  // Ombre de contact : un plan invisible qui ne rend que l'ombre (ancrage doux).
  const ground = new Mesh(new PlaneGeometry(12, 12), new ShadowMaterial({ opacity: 0.4 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // --- Caméra ---
  const camera = new PerspectiveCamera(
    38,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );

  // --- Contrôles bornés ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.8;
  // Rotation verticale bornée : jamais sous l'équateur (cache la face inférieure).
  controls.minPolarAngle = Math.PI * 0.12;
  controls.maxPolarAngle = Math.PI * 0.54;
  if (reducedMotion) controls.enableDamping = false;

  const loader = new GLTFLoader();
  const cache = new Map<ModelKey, Group>();
  const current = new Group();
  scene.add(current);

  let activeKey: ModelKey | null = null;
  let pendingKey: ModelKey | null = null;
  let busy = false;

  // --- Hotspots : marqueurs HTML ancrés en 3D, projetés à l'écran chaque frame ---
  // L'objet reste fixe (seule la caméra orbite) : la position monde de chaque point
  // est donc constante après cadrage — on ne recalcule que sa projection écran.
  const hotspotLayer = document.createElement('div');
  hotspotLayer.className = 'product3d__hotspots';
  container.appendChild(hotspotLayer);

  type ActiveHotspot = { el: HTMLButtonElement; world: Vector3; normal: Vector3 };
  let activeHotspots: ActiveHotspot[] = [];
  let hotspotsShown = false;
  const hsProj = new Vector3();
  const hsToCam = new Vector3();

  function clearHotspots(): void {
    hotspotsShown = false;
    for (const hs of activeHotspots) hs.el.remove();
    activeHotspots = [];
  }

  /** Construit les marqueurs du modèle courant (masqués tant que hotspotsShown = false). */
  function buildHotspots(cfg: ModelConfig, size: Vector3): void {
    clearHotspots();
    const list = cfg.hotspots;
    if (!list?.length) return;
    const hx = size.x / 2;
    const hy = size.y / 2;
    const hz = size.z / 2;
    for (const h of list) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'product3d__hs';
      el.setAttribute('aria-label', `${h.label} : ${h.text}`);
      el.style.opacity = '0';
      el.innerHTML =
        '<span class="product3d__hs-dot" aria-hidden="true"></span>' +
        '<span class="product3d__hs-card" aria-hidden="true">' +
        '<span class="product3d__hs-title"></span>' +
        '<span class="product3d__hs-text"></span></span>';
      (el.querySelector('.product3d__hs-title') as HTMLElement).textContent = h.label;
      (el.querySelector('.product3d__hs-text') as HTMLElement).textContent = h.text;
      el.addEventListener('click', () => el.classList.toggle('is-open'));
      hotspotLayer.appendChild(el);
      activeHotspots.push({
        el,
        world: new Vector3(h.pos[0] * hx, h.pos[1] * hy, h.pos[2] * hz),
        normal: new Vector3(h.normal[0], h.normal[1], h.normal[2]).normalize(),
      });
    }
  }

  /** Projette chaque point à l'écran et masque ceux passés derrière l'objet. */
  function updateHotspots(): void {
    if (!activeHotspots.length) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    for (const hs of activeHotspots) {
      if (!hotspotsShown) {
        hs.el.style.opacity = '0';
        hs.el.style.pointerEvents = 'none';
        continue;
      }
      hsToCam.copy(camera.position).sub(hs.world).normalize();
      const facing = hs.normal.dot(hsToCam) > 0.05;
      hsProj.copy(hs.world).project(camera);
      if (facing && hsProj.z < 1) {
        const x = (hsProj.x * 0.5 + 0.5) * w;
        const y = (-hsProj.y * 0.5 + 0.5) * h;
        hs.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        hs.el.style.opacity = '1';
        hs.el.style.pointerEvents = 'auto';
      } else {
        hs.el.style.opacity = '0';
        hs.el.style.pointerEvents = 'none';
        hs.el.classList.remove('is-open');
      }
    }
  }

  /** Centre le modèle, place la caméra à sa pose, borne le zoom, cale l'ombre. */
  function frame(object: Group, cfg: ModelConfig): Vector3 {
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    object.position.sub(center); // recentre à l'origine

    const maxDim = Math.max(size.x, size.y, size.z);
    const fitDist = maxDim / (2 * Math.tan(MathUtils.degToRad(camera.fov) / 2));
    const dist = fitDist * (cfg.distanceScale ?? 1.5);

    const phi = MathUtils.degToRad(cfg.polarDeg ?? 78);
    const theta = MathUtils.degToRad(cfg.azimuthDeg ?? 20);
    camera.position.set(
      dist * Math.sin(phi) * Math.sin(theta),
      dist * Math.cos(phi),
      dist * Math.sin(phi) * Math.cos(theta),
    );
    controls.target.set(0, 0, 0);
    controls.minDistance = dist * (cfg.minZoomScale ?? 0.6);
    controls.maxDistance = dist * (cfg.maxZoomScale ?? 1.8);
    // Borne verticale propre à l'objet (verrouille la face inférieure du feu LED).
    controls.maxPolarAngle = MathUtils.degToRad(cfg.maxPolarDeg ?? DEFAULT_MAX_POLAR_DEG);
    controls.update();

    // Ombre de contact au pied de l'objet + cadrage serré de la shadow camera.
    ground.position.y = -size.y / 2;
    const shadowCam = keyLight.shadow.camera;
    const s = maxDim * 1.3;
    shadowCam.left = -s;
    shadowCam.right = s;
    shadowCam.top = s;
    shadowCam.bottom = -s;
    shadowCam.near = 0.1;
    shadowCam.far = 20;
    shadowCam.updateProjectionMatrix();

    return size;
  }

  async function ensureLoaded(key: ModelKey): Promise<Group | null> {
    const cached = cache.get(key);
    if (cached) return cached;
    const cfg = models[key];
    if (!cfg) return null;
    const gltf = await loader.loadAsync(cfg.url);
    const group = gltf.scene;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    group.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        const m = mat as MeshStandardMaterial;
        if (!m.isMeshStandardMaterial) continue;
        // Reflets d'environnement plus présents = matière perçue plus « réelle ».
        m.envMapIntensity = 1.15;
        // Filtrage anisotrope : textures nettes même en incidence rasante (grain conservé).
        for (const tex of [m.map, m.roughnessMap, m.metalnessMap, m.normalMap]) {
          if (tex) tex.anisotropy = maxAnisotropy;
        }
        m.needsUpdate = true;
      }
    });
    cache.set(key, group);
    return group;
  }

  /** Boucle latest-wins : gère les clics rapides sans empiler les transitions. */
  async function drive(): Promise<void> {
    busy = true;
    try {
      while (pendingKey && pendingKey !== activeKey) {
        const target = pendingKey;
        const prev = current.children[0];

        // Les hotspots de l'objet sortant disparaissent dès le début de la transition.
        hotspotsShown = false;

        // Sortie : fondu de l'objet courant.
        if (prev && !reducedMotion) {
          primeFade(prev);
          await gsap.to(
            { f: 1 },
            {
              f: 0,
              duration: OUT_DUR,
              ease: 'power2.in',
              onUpdate() {
                applyFade(prev, (this.targets()[0] as { f: number }).f);
              },
            },
          );
          gsap.killTweensOf(prev.rotation);
        }

        const group = await ensureLoaded(target);
        if (!group) {
          pendingKey = null;
          break;
        }

        current.clear();
        current.rotation.y = 0;
        current.add(group);
        const size = frame(group, models[target]);
        buildHotspots(models[target], size);
        activeKey = target;

        // Le 1er modèle est à l'écran : on peut masquer l'indicateur de chargement.
        if (!notifiedReady) {
          notifiedReady = true;
          onReady?.();
        }

        // Entrée : fondu + rotation d'accueil (une fois, pas de boucle).
        if (reducedMotion) {
          applyFade(group, 1);
          hotspotsShown = activeHotspots.length > 0; // révèle les points (pas de rotation)
        } else {
          primeFade(group);
          applyFade(group, 0);
          group.rotation.y = INTRO_FROM;
          // Les hotspots n'apparaissent qu'une fois l'objet posé (fin de rotation).
          gsap.to(group.rotation, {
            y: 0,
            duration: IN_ROT_DUR,
            ease: 'power3.out',
            onComplete: () => {
              if (activeKey === target) hotspotsShown = activeHotspots.length > 0;
            },
          });
          await gsap.to(
            { f: 0 },
            {
              f: 1,
              duration: IN_FADE_DUR,
              ease: 'power2.out',
              onUpdate() {
                applyFade(group, (this.targets()[0] as { f: number }).f);
              },
              onComplete() {
                applyFade(group, 1);
              },
            },
          );
        }

        if (pendingKey === target) pendingKey = null;
      }
    } finally {
      busy = false;
    }
  }

  function setModel(key: ModelKey): void {
    pendingKey = key;
    if (!busy) void drive();
  }

  // --- Boucle de rendu, suspendue hors du viewport ---
  let rafId = 0;
  let visible = false;
  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    updateHotspots();
    rafId = requestAnimationFrame(tick);
  };
  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { threshold: 0.01 },
  );
  io.observe(container);

  // Suspension quand l'onglet passe en arrière-plan (batterie).
  const onVisibility = () => {
    if (document.hidden) stop();
    else if (visible) start();
  };
  document.addEventListener('visibilitychange', onVisibility);

  // --- Resize ---
  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);

  function dispose(): void {
    stop();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    controls.dispose();
    clearHotspots();
    hotspotLayer.remove();

    // Libère toutes les ressources GPU des modèles chargés (three.md §9).
    for (const group of cache.values()) {
      gsap.killTweensOf(group.rotation);
      group.traverse((obj) => {
        const mesh = obj as { geometry?: { dispose(): void }; material?: unknown };
        mesh.geometry?.dispose();
        const mat = mesh.material;
        const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
        for (const m of mats as Array<Record<string, unknown> & { dispose?(): void }>) {
          for (const value of Object.values(m)) {
            if (value && typeof (value as { isTexture?: boolean }).isTexture === 'boolean') {
              (value as { dispose(): void }).dispose();
            }
          }
          m.dispose?.();
        }
      });
    }
    cache.clear();
    ground.geometry.dispose();
    (ground.material as ShadowMaterial).dispose();
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setModel, dispose };
}
