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
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    api.env('development') && '@babel/plugin-transform-react-jsx-source',
    api.env('production') && ['transform-react-remove-prop-types', { removeImport: true }],
  ].filter(Boolean),
});
