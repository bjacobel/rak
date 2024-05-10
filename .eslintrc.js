module.exports = {
  root: true,
  globals: {
    projectConfig: 'readonly',
  },
  extends: ['eslint-config-prettier', 'plugin:@typescript-eslint/recommended'],
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
};
