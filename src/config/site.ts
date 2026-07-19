/**
 * Configuration globale du site — REMOLUX
 * Toutes les valeurs "business" vivent ici (jamais en dur dans les composants).
 */
export const SITE = {
  name: 'REMOLUX',
  domain: 'https://www.remolux.com', // TODO : confirmer le domaine final (remolux.com ou remolux.eu — LWS)
  locale: 'fr',
  /** Lien fiche produit Amazon (ASIN B0H5DX7S5V) */
  amazonUrl: 'https://www.amazon.fr/dp/B0H5DX7S5V',
  email: 'contact@remolux.eu',
  product: {
    name: 'Kit feux LED de remorque sans fil REMOLUX',
    sku: 'RLX-WTL-01',
  },
  /** Entité juridique éditrice du site — utilisée par les pages légales */
  legal: {
    companyName: 'GRYCO',
    companyForm: 'SASU (société par actions simplifiée unipersonnelle)',
    president: 'Glodi Nzazu',
    siren: '104 955 950',
    siret: '104 955 950 00019',
    /** TODO : compléter avec le capital social exact (obligation légale) */
    shareCapital: '[capital social à compléter]',
    address: '8 Place Roger Salengro, 31000 Toulouse, France',
    host: {
      name: 'Vercel Inc.',
      address: '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
      website: 'https://vercel.com',
    },
  },
} as const;
