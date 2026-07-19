/**
 * Dictionnaire FR — tout le contenu textuel du site.
 * Le contenu ne vit JAMAIS dans les composants : uniquement ici.
 */
export const fr = {
  meta: {
    title: 'REMOLUX — Feux LED de remorque sans fil. Installés en 60 secondes.',
    description:
      'Kit de feux LED de remorque sans fil premium. Fixation magnétique, étanchéité IP67, signalisation complète sans aucun câblage. Conçu pour durer.',
  },
  nav: {
    product: 'Produit',
    technology: 'Technologie',
    specs: 'Caractéristiques',
    faq: 'Support',
    cta: 'Acheter sur Amazon',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
  },
  hero: {
    eyebrow: 'Signalisation sans fil nouvelle génération',
    titleLine1: 'La lumière.',
    titleLine2: 'Sans le fil.',
    subtitle:
      'REMOLUX remplace des heures de câblage par 60 secondes d’installation. Un kit de feux LED sans fil, magnétique et étanche, pensé comme un objet premium.',
    ctaPrimary: 'Acheter sur Amazon',
    ctaSecondary: 'Découvrir la technologie',
    scrollHint: 'Défiler pour découvrir',
    stats: [
      { value: '60 s', label: 'Installation' },
      { value: 'IP67', label: 'Étanchéité' },
      { value: '0', label: 'Câble à brancher' },
    ],
  },
  product: {
    eyebrow: 'Le produit',
    title: 'Dessiné pour la route.\nConstruit pour durer.',
    body: 'Chaque détail du kit REMOLUX a été pensé pour un usage réel : remorques, plateaux, porte-engins. Une fixation magnétique puissante, des LED haute intensité et une autonomie qui tient la distance.',
  },
  features: {
    eyebrow: 'Points forts',
    title: 'Tout ce qu’un kit filaire fait.\nSans les inconvénients.',
    items: [
      {
        icon: 'magnet',
        title: 'Fixation magnétique',
        description:
          'Des aimants haute puissance plaquent chaque feu sur le châssis en une seconde. Aucun perçage, aucun outil.',
      },
      {
        icon: 'wireless',
        title: '100 % sans fil',
        description:
          'La synchronisation avec le véhicule est automatique. Clignotants, stop et feux de position répondent instantanément.',
      },
      {
        icon: 'water',
        title: 'Étanchéité IP67',
        description:
          'Pluie battante, projections, poussière : le boîtier scellé protège l’électronique dans toutes les conditions.',
      },
      {
        icon: 'battery',
        title: 'Autonomie longue durée',
        description:
          'Une charge couvre largement vos trajets, avec témoin de batterie pour ne jamais être surpris.',
      },
      {
        icon: 'led',
        title: 'LED haute intensité',
        description:
          'Visibles en plein jour comme de nuit. Une signalisation nette, immédiate, sans zone d’ombre.',
      },
      {
        icon: 'shield',
        title: 'Conçu pour la route',
        description:
          'Matériaux résistants aux chocs et aux vibrations. Testé pour un usage intensif, saison après saison.',
      },
    ],
  },
  technology: {
    eyebrow: 'Technologie',
    title: 'Une simplicité de surface.\nUne précision d’ingénierie en dessous.',
    steps: [
      {
        number: '01',
        title: 'Posez',
        description:
          'Les aimants intégrés fixent chaque feu à l’arrière de la remorque. Position parfaite en quelques secondes.',
      },
      {
        number: '02',
        title: 'Connectez',
        description:
          'L’émetteur se branche sur la prise du véhicule. La liaison sans fil s’établit automatiquement, sans appairage manuel.',
      },
      {
        number: '03',
        title: 'Roulez',
        description:
          'Clignotants, freinage, position : chaque signal est transmis instantanément. Vous êtes visible, en toute légalité.',
      },
    ],
  },
  specs: {
    eyebrow: 'Caractéristiques',
    title: 'Les chiffres qui comptent.',
    note: 'Caractéristiques détaillées disponibles sur la fiche produit Amazon.',
  },
  trust: {
    eyebrow: 'Confiance',
    title: 'Acheter sereinement.',
    items: [
      {
        title: 'Expédié par Amazon',
        description: 'Livraison rapide et retours simplifiés, gérés par Amazon.',
      },
      {
        title: 'Conformité CE',
        description: 'Produit conforme aux exigences européennes de sécurité.',
      },
      {
        title: 'Support réactif',
        description: 'Une question ? Notre équipe répond rapidement, en français.',
      },
    ],
  },
  finalCta: {
    title: 'Passez au sans fil.',
    subtitle: 'Rejoignez les conducteurs qui ont remplacé le câblage par REMOLUX.',
    cta: 'Acheter sur Amazon',
  },
  footer: {
    tagline: 'Signalisation LED sans fil premium.',
    navTitle: 'Navigation',
    legalTitle: 'Informations',
    legal: {
      mentions: 'Mentions légales',
      privacy: 'Confidentialité',
      contact: 'Contact',
    },
    copyright: 'REMOLUX. Tous droits réservés.',
  },
  a11y: {
    skipToContent: 'Aller au contenu principal',
    externalLink: '(nouvelle fenêtre)',
  },
} as const;
