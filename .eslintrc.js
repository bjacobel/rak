module.exports = {
  extends: 'eslint-config-airbnb',
  rules: {
    'arrow-body-style': 0,
    'comma-dangle': [2, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'func-names': 0,
    'indent': [2, 2, { SwitchCase: 0 }],
    'max-len': [2, 120, 2],
    'no-else-return': 0,
    'no-console': 0,
    'quote-props': [2, 'consistent-as-needed'],
    'import/imports-first': 0,  // doesn't play nice with Jest
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
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
    jasmine: true,
  },
};
