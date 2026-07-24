/**
 * Visualiseur 3D produit REMOLUX — three.js vanilla, encapsulé (voir three.md).
 *
 * Une scène, un renderer, une caméra. Charge les modèles GLB à la demande (cache).
 * Fond transparent : l'objet flotte sur la page. Éclairage studio par IBL
 * (RoomEnvironment via PMREM) atténué pour un rendu sombre premium, clé blanche
 * neutre (couleurs de matériaux fidèles) et liseré rouge de marque ; ombre de
 * contact douce (ShadowMaterial) pour ancrer l'objet sans le mettre en boîte.
 * Chaque objet a sa pose et ses bornes de zoom (mallette bridée pour ne pas
 * exposer les petits marquages). Rotation d'accueil unique à l'affichage.
 * OrbitControls bornés en rotation verticale. Boucle suspendue hors viewport.
 *
 * Interface stable : createProductViewer(container, models) -> { setModel, dispose }.
 * Aucun autre module ne manipule les objets three.js internes.
 */
import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
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
}

export interface ProductViewer {
  setModel(key: ModelKey): Promise<void>;
  dispose(): void;
}

const INTRO_MS = 1100;
const INTRO_FROM = -0.5; // rad : l'objet s'installe depuis ~-29° jusqu'à sa pose de repos
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function createProductViewer(
  container: HTMLElement,
  models: Record<ModelKey, ModelConfig>,
): ProductViewer {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  // --- Scene + éclairage studio (IBL) ---
  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture; // reflets sur métal/verre
  // IBL atténué : on garde les reflets, on baisse la lumière diffuse pour le thème sombre.
  scene.environmentIntensity = 0.55;

  // Clé blanche neutre : restitue fidèlement les couleurs d'albédo (plastique, métal).
  const keyLight = new DirectionalLight(0xffffff, 1.1);
  keyLight.position.set(2.5, 4, 3);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.normalBias = 0.02;
  // Liseré rouge de marque : accentue les arêtes sans teinter les matériaux.
  const rimLight = new DirectionalLight(0xff1e2d, 0.45);
  rimLight.position.set(-3.5, 1.5, -4);
  scene.add(keyLight, rimLight);

  // Ombre de contact : un plan invisible qui ne rend que l'ombre (ancrage doux).
  const ground = new Mesh(new PlaneGeometry(12, 12), new ShadowMaterial({ opacity: 0.32 }));
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
  let introT0 = 0; // horodatage de la rotation d'accueil (0 = inactive)

  /** Centre le modèle, place la caméra à sa pose, borne le zoom, cale l'ombre. */
  function frame(object: Group, cfg: ModelConfig): void {
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
  }

  async function setModel(key: ModelKey): Promise<void> {
    if (key === activeKey) return;
    activeKey = key;

    let group = cache.get(key);
    if (!group) {
      const cfg = models[key];
      if (!cfg) return;
      const gltf = await loader.loadAsync(cfg.url);
      group = gltf.scene;
      group.traverse((obj) => {
        if ((obj as Mesh).isMesh) (obj as Mesh).castShadow = true;
      });
      cache.set(key, group);
    }
    if (activeKey !== key) return; // une sélection plus récente a pris le dessus

    current.clear();
    current.rotation.y = 0;
    current.add(group);
    frame(group, models[key]);

    // Rotation d'accueil : signale l'interactivité (une seule fois, pas de boucle).
    introT0 = reducedMotion ? 0 : performance.now();
  }

  // --- Boucle de rendu, suspendue hors du viewport ---
  let rafId = 0;
  let visible = false;
  const tick = () => {
    if (introT0) {
      const p = Math.min((performance.now() - introT0) / INTRO_MS, 1);
      current.rotation.y = INTRO_FROM * (1 - easeOutCubic(p));
      if (p >= 1) introT0 = 0;
    }
    controls.update();
    renderer.render(scene, camera);
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

    // Libère toutes les ressources GPU des modèles chargés (three.md §9).
    for (const group of cache.values()) {
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
