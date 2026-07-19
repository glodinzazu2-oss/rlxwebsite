# Assets images (optimisés par Astro)

Placer ici les photos produit haute résolution (source unique, non compressée).
Les importer dans les composants via le composant `<Image />` d'Astro :

```astro
---
import { Image } from 'astro:assets';
import produit from '../assets/images/produit-hero.jpg';
---

<Image src={produit} alt="Kit REMOLUX sur remorque" widths={[480, 960, 1440]} format="avif" />
```

Astro génère automatiquement AVIF/WebP + srcset responsive au build.

Convention de nommage : `contexte-sujet-variante.jpg`
Ex. : `hero-kit-face.jpg`, `feature-aimant-detail.jpg`, `lifestyle-remorque-nuit.jpg`
