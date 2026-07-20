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
    kitAlt:
      'Kit REMOLUX complet : mallette de transport, deux feux LED, connecteurs d’attelage, câbles antivol en acier et notice d’utilisation en français.',
    showcaseCaption: 'RLX-WTL-01 — le kit complet, tel que livré.',
    hotspotsLabel: 'Découvrir les éléments du kit',
    hotspots: {
      lights: {
        label: 'Feux LED magnétiques',
        text: 'Deux feux LED à fixation magnétique — se posent et se retirent sans outil.',
      },
      plugs: {
        label: 'Connecteurs d’attelage',
        text: 'Connecteurs d’attelage inclus pour la liaison au véhicule.',
      },
      cables: {
        label: 'Câbles antivol',
        text: 'Câbles antivol en acier pour sécuriser chaque feu.',
      },
      manual: {
        label: 'Notice en français',
        text: 'Notice d’utilisation rédigée en français, incluse dans la mallette.',
      },
    },
  },
  useCases: {
    eyebrow: 'En situation',
    title: 'Un seul kit.\nTous les terrains.',
    items: [
      {
        key: 'nautisme',
        title: 'Nautisme',
        description: 'Mise à l’eau au crépuscule : la remorque reste signalée jusqu’au quai.',
        alt: 'Feux REMOLUX allumés à l’arrière d’une remorque porte-bateau, sur un port au crépuscule — visuel d’illustration.',
      },
      {
        key: 'caravaning',
        title: 'Caravaning',
        description: 'Sur la route des vacances, visible de jour comme de nuit.',
        alt: 'Feux REMOLUX allumés à l’arrière d’une caravane tractée sur une route de campagne — visuel d’illustration.',
      },
      {
        key: 'agricole',
        title: 'Agricole',
        description: 'Dans la boue des champs, la signalisation ne faiblit pas.',
        alt: 'Feux REMOLUX allumés sur une remorque agricole chargée de paille, dans un champ boueux — visuel d’illustration.',
      },
      {
        key: 'btp',
        title: 'BTP',
        description: 'Du chantier à la route, chaque transfert d’engin reste sécurisé.',
        alt: 'Feux REMOLUX allumés sur un porte-engins transportant une mini-pelle sur un chantier — visuel d’illustration.',
      },
    ],
    disclaimer: 'Mises en situation illustratives. Produit réel présenté ci-dessus.',
    realPhoto: {
      title: 'Le kit réel, sans mise en scène.',
      caption: 'RLX-WTL-01 photographié tel quel, à la sortie de sa mallette.',
      alt: 'Photo brute du kit REMOLUX réel : feux LED, connecteurs, câbles antivol, notice et packaging, posés sur un sol de parking.',
    },
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
  legalPages: {
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdated: '19 juillet 2026',
    backHome: "Retour à l'accueil",
    mentions: {
      metaTitle: 'Mentions légales — REMOLUX',
      metaDescription: 'Mentions légales du site REMOLUX, édité par la société GRYCO.',
      title: 'Mentions légales',
      intro:
        "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les informations suivantes identifient l'éditeur et l'hébergeur de ce site.",
      publisherHeading: 'Éditeur du site',
      publisherLabels: {
        company: 'Société',
        form: 'Forme juridique',
        capital: 'Capital social',
        siret: 'SIRET',
        address: 'Siège social',
        director: 'Directeur de la publication',
        contact: 'Contact',
      },
      brandNote: 'REMOLUX est une marque commercialisée par la société GRYCO.',
      hostHeading: 'Hébergement',
      hostIntro: 'Le site est hébergé par :',
      ipHeading: 'Propriété intellectuelle',
      ipBody:
        "L'ensemble des contenus de ce site (textes, visuels, logo, identité graphique) est la propriété de la société GRYCO, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      externalHeading: 'Liens externes',
      externalBody:
        "Ce site est une vitrine de présentation : l'achat du produit s'effectue sur Amazon, via des liens clairement identifiés. La société GRYCO n'est pas responsable du contenu des sites tiers vers lesquels elle renvoie. Les conditions de vente, de livraison et de retour applicables à l'achat sont celles d'Amazon.",
      lawHeading: 'Droit applicable',
      lawBody:
        'Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.',
    },
    privacy: {
      metaTitle: 'Politique de confidentialité — REMOLUX',
      metaDescription:
        'Politique de confidentialité du site REMOLUX : données collectées, cookies, droits des visiteurs.',
      title: 'Politique de confidentialité',
      intro:
        'Cette page décrit, simplement et sans jargon, les données traitées lors de votre visite sur ce site — et celles qui ne le sont pas.',
      controllerHeading: 'Responsable du traitement',
      collectHeading: 'Données collectées',
      collectBody:
        'Ce site ne comporte ni compte utilisateur, ni formulaire, ni paiement, ni outil de suivi publicitaire. La simple consultation du site ne donne lieu à aucune collecte de données personnelles par la société GRYCO.',
      contactHeading: 'Contact par email',
      contactBody:
        'Si vous nous écrivez, votre adresse email et le contenu de votre message sont utilisés uniquement pour vous répondre. Ils sont conservés le temps nécessaire au traitement de votre demande, puis supprimés. Ils ne sont ni cédés, ni utilisés à des fins commerciales.',
      cookiesHeading: 'Cookies et stockage local',
      cookiesBody:
        "Ce site n'utilise aucun cookie. Un stockage de session technique (sessionStorage) mémorise uniquement, le temps de votre visite, le fait que l'écran d'introduction a déjà été affiché. Il ne contient aucune donnée personnelle, n'est transmis à personne et disparaît à la fermeture du navigateur. Ce type de stockage strictement technique est exempté de consentement (recommandations CNIL).",
      hostingHeading: 'Hébergement',
      hostingBody:
        'Le site est hébergé par Vercel Inc. Comme tout hébergeur, Vercel traite des journaux techniques de connexion (adresses IP) à des fins de sécurité et de bon fonctionnement du service, selon sa propre politique de confidentialité, consultable sur vercel.com.',
      amazonHeading: 'Achat sur Amazon',
      amazonBody:
        "L'achat du produit s'effectue intégralement sur Amazon. À partir du moment où vous quittez ce site, la politique de confidentialité d'Amazon s'applique — nous n'avons accès à aucune donnée de votre commande.",
      rightsHeading: 'Vos droits',
      rightsBody:
        "Conformément au Règlement général sur la protection des données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur les données vous concernant. Pour l'exercer, écrivez-nous par email. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).",
    },
  },
} as const;
