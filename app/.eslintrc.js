module.exports = {
  extends: [
    'eslint-config-airbnb',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-else-return': 0,
    'no-console': 0,
    'max-classes-per-file': 0,
    'default-param-last': 0,
    'import/prefer-default-export': 0,
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
    'react/require-default-props': 0,
    'jsx-a11y/anchor-is-valid': [2, { specialLink: ['to'] }],
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
