/**
 * Données produit — RLX-WTL-01
 * ⚠️ VALEURS À VALIDER avec la documentation fournisseur avant mise en ligne
 * (certaines specs sont des placeholders volontairement neutres).
 */
export const SPECS: { label: string; value: string; toValidate?: boolean }[] = [
  { label: 'Référence', value: 'RLX-WTL-01' },
  { label: 'Indice de protection', value: 'IP67' },
  { label: 'Fixation', value: 'Magnétique haute puissance' },
  { label: 'Alimentation', value: 'Batterie rechargeable', toValidate: true },
  { label: 'Compatibilité véhicule', value: '12 V / 24 V', toValidate: true },
  { label: 'Portée sans fil', value: 'À confirmer', toValidate: true },
  { label: 'Autonomie', value: 'À confirmer', toValidate: true },
  { label: 'Contenu du kit', value: '2 feux LED + émetteur', toValidate: true },
];
