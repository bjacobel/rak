module.exports = () => ({
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
        useBuiltIns: true,
        modules: false,
        exclude: ['transform-regenerator'],
      },
    ],
    'react',
  ],
  plugins: ['@babel/plugin-transform-object-rest-spread'],
  env: {
    test: {
      presets: [['env', { modules: 'commonjs' }]],
    },
    development: {
      plugins: ['@babel/plugin-transform-react-jsx-source'],
    },
  },
});
