module.exports = {
  root: true,
  globals: {
    projectConfig: 'readonly',
  },
  extends: ['eslint-config-airbnb', 'eslint-config-prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    'import/core-modules': ['path', 'stream'],
  },
  rules: {
    'no-else-return': 0,
    'no-console': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/order': [
      2,
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      2,
      'never',
      {
        css: 'always',
      },
    ],
  },
};
