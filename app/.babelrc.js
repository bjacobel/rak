module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.37',
        modules: api.env('test') ? 'commonjs' : false,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    '@wyw-in-js',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    api.env('development') && '@babel/plugin-transform-react-jsx-source',
  ].filter(Boolean),
});
