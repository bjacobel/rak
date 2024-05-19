module.exports = {
  root: true,
  extends: ['eslint-config-airbnb', 'eslint-config-prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-classes-per-file': 0,
    'no-else-return': 0,
    'no-console': 0,
    'default-param-last': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true, packageDir: __dirname }],
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
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: '^__' }],
    'no-underscore-dangle': 0,
  },
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
  globals: {
    projectConfig: 'readonly',
  },
};
