/**
 * i18n — infrastructure prête pour le multilingue.
 * Aujourd'hui : FR uniquement. Pour ajouter une langue :
 *   1. Créer src/i18n/en.ts (même structure que fr.ts, typée par `Dictionary`)
 *   2. L'ajouter à `dictionaries`
 *   3. Créer les pages sous src/pages/en/
 * Aucun refactoring nécessaire.
 */
import { fr } from './fr';

export type Locale = 'fr';
export type Dictionary = typeof fr;

export const defaultLocale: Locale = 'fr';

const dictionaries: Record<Locale, Dictionary> = { fr };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
