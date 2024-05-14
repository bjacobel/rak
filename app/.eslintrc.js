module.exports = {
  extends: ['plugin:react-hooks/recommended'],
  rules: {
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
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/anchor-is-valid': [2, { specialLink: ['to'] }],
  },
};
