/**
 * Configuration globale du site — REMOLUX
 * Toutes les valeurs "business" vivent ici (jamais en dur dans les composants).
 */
export const SITE = {
  name: 'REMOLUX',
  domain: 'https://www.remolux.com', // TODO : domaine final
  locale: 'fr',
  /** Lien fiche produit Amazon — TODO : remplacer par l'URL réelle de la fiche FBA */
  amazonUrl: 'https://www.amazon.fr/dp/XXXXXXXXXX',
  email: 'contact@remolux.com', // TODO : email officiel
  product: {
    name: 'Kit feux LED de remorque sans fil REMOLUX',
    sku: 'RLX-WTL-01',
  },
} as const;
