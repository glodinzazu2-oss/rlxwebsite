/**
 * Visualiseur 3D produit REMOLUX — three.js vanilla, encapsulé (voir three.md).
 *
 * Une scène, un renderer, une caméra. Charge les modèles GLB à la demande (cache),
 * éclairage studio par IBL (RoomEnvironment via PMREM) pour révéler les matériaux
 * PBR et les reflets, map émissive native pour la lueur des LED. OrbitControls
 * bridés (rotation verticale + zoom) pour toujours valoriser le produit et ne
 * jamais exposer la face inférieure. Boucle de rendu suspendue hors du viewport.
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
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Object3D,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type ModelKey = string;
export interface ProductViewerModels {
  [key: ModelKey]: string; // clé -> URL du .glb
}

export interface ProductViewer {
  setModel(key: ModelKey): Promise<void>;
  dispose(): void;
}

export function createProductViewer(
  container: HTMLElement,
  models: ProductViewerModels,
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
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  // --- Scene + éclairage studio (IBL) ---
  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture; // reflets + éclairage diffus PBR

  // Lumière clé douce pour sculpter le volume par-dessus l'IBL
  const keyLight = new DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  // --- Caméra ---
  const camera = new PerspectiveCamera(
    38,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0.4, 4);

  // --- Contrôles bridés ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.8;
  // Rotation verticale bornée : jamais sous l'équateur (cache la face inférieure)
  controls.minPolarAngle = Math.PI * 0.12;
  controls.maxPolarAngle = Math.PI * 0.54;

  const loader = new GLTFLoader();
  const cache = new Map<ModelKey, Group>();
  const current = new Group();
  scene.add(current);
  let activeKey: ModelKey | null = null;

  /** Centre le modèle à l'origine et cadre la caméra + bornes de zoom. */
  function frame(object: Object3D): void {
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    object.position.sub(center); // recentre à l'origine

    const maxDim = Math.max(size.x, size.y, size.z);
    const fitDist = maxDim / (2 * Math.tan(MathUtils.degToRad(camera.fov) / 2));
    const dist = fitDist * 1.5;

    controls.target.set(0, 0, 0);
    camera.position.set(0, maxDim * 0.15, dist);
    controls.minDistance = dist * 0.6;
    controls.maxDistance = dist * 1.8;
    controls.update();
  }

  async function setModel(key: ModelKey): Promise<void> {
    if (key === activeKey) return;
    activeKey = key;

    let group = cache.get(key);
    if (!group) {
      const url = models[key];
      if (!url) return;
      const gltf = await loader.loadAsync(url);
      group = gltf.scene;
      cache.set(key, group);
    }
    if (activeKey !== key) return; // une sélection plus récente a pris le dessus

    current.clear();
    current.add(group);
    frame(group);
  }

  // --- Boucle de rendu, suspendue hors du viewport ---
  let rafId = 0;
  let visible = false;
  const tick = () => {
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

  // Suspension quand l'onglet passe en arrière-plan (batterie)
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

  // Sous prefers-reduced-motion : amortissement désactivé (arrêt net, pas de dérive)
  if (reducedMotion) {
    controls.enableDamping = false;
    controls.autoRotate = false;
  }

  function dispose(): void {
    stop();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    controls.dispose();

    // Libère toutes les ressources GPU des modèles chargés (three.md §9)
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
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setModel, dispose };
}
