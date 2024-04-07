module.exports = {
  root: true,
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
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
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.html.jsx', '.tsx'] }],
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/anchor-is-valid': [2, { specialLink: ['to'] }],
    '@typescript-eslint/no-non-null-assertion': 0,
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
