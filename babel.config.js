const merge = require('babel-merge');

module.exports = api => {
  const base = {
    presets: ['@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime',
      api.env('development') && '@babel/plugin-transform-react-jsx-source',
    ].filter(Boolean),
  };

  return {
    env: {
      modern: merge(base, {
        presets: [['@babel/preset-modules', { loose: true }]],
      }),
      legacy: merge(base, {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: 3,
              modules: api.env('test') ? 'commonjs' : false,
              exclude: ['transform-regenerator'],
            },
          ],
        ],
      }),
    },
  };
};
