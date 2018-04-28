module.exports = {
  extends: ['eslint-config-airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-else-return': 0,
    'no-console': 0,
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/order': [
      2,
      {
        groups: [['builtin', 'external']],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': [
      2,
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        printWidth: 120,
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': [2, { specialLink: ['to'] }],
  },
  parserOptions: {
    ecmaVersion: 8,
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
    'import/resolver': 'webpack',
  },
};
