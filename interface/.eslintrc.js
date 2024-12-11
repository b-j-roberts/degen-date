/* eslint-env node */

const { node: restrictedImports } = require('@uniswap/eslint-config/restrictedImports')
require('@uniswap/eslint-config/load')

module.exports = {
  root: true,
  extends: ['@uniswap/eslint-config/react'],

  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          restrictedImports,
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector: ':matches(ExportAllDeclaration)',
            message: 'Barrel exports bloat the bundle size by preventing tree-shaking.',
          },
        ],
      },
    },
  ],
}
