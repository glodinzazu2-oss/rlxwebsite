// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

/**
 * Cette configuration traduit mécaniquement une partie des règles de
 * .claude/rules.md et .claude/architecture.md : elle ne remplace pas la
 * discipline humaine/agent décrite dans ces documents, elle en fait
 * respecter automatiquement le sous-ensemble qu'un linter peut vérifier.
 */
export default tseslint.config(
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // rules.md §1 / §16 : aucun console.log livré
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // architecture.md §7 / rules.md §4 : `any` interdit sauf exception documentée
      '@typescript-eslint/no-explicit-any': 'error',
      // architecture.md §14 : aucun import ou variable inutilisé
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // rules.md §4 : pas de suppression d'erreur de type sans justification
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description', 'ts-ignore': true },
      ],
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      // Les composants Astro utilisent `any` implicitement dans certains contextes de props ;
      // la règle stricte reste active mais peut être relâchée ponctuellement si un cas réel
      // et documenté l'exige (voir architecture.md §7).
    },
  },
  prettier
);
