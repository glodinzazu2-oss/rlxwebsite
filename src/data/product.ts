/**
 * Données produit — RLX-WTL-01
 * Caractéristiques validées fournisseur (26/07/2026).
 */
/** `wide` : ligne pleine largeur, valeur alignée à gauche (listes longues, ex. contenu du kit). */
export const SPECS: { label: string; value: string; wide?: boolean }[] = [
  { label: 'Référence', value: 'RLX-WTL-01' },
  { label: 'Résistance à l’eau', value: 'Boîtier scellé étanche' },
  { label: 'Fixation', value: 'Magnétique haute puissance' },
  { label: 'Alimentation', value: 'Batterie Li-ion 2000 mAh, recharge USB-C' },
  { label: 'Compatibilité véhicule', value: '12 V / 24 V (prise 7 broches)' },
  { label: 'Portée sans fil', value: 'Jusqu’à 20 m (2.4 GHz)' },
  { label: 'Autonomie', value: '20 h par charge' },
  {
    label: 'Contenu du kit',
    value:
      '2 feux LED magnétiques, 1 émetteur 7 broches, 1 câble de charge USB-C, 2 câbles anti-chute en acier, 1 notice d’utilisation, 1 mallette de transport rigide',
    wide: true,
  },
];
