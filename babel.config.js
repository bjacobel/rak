module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: api.env('test') ? 'commonjs' : false,
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@wyw-in-js',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    api.env('development') && '@babel/plugin-transform-react-jsx-source',
  ].filter(Boolean),
});
