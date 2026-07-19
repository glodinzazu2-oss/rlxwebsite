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
} as const;
