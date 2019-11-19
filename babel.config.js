module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: api.env('test') ? 'commonjs' : false,
        exclude: ['transform-regenerator'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    api.env('development') && '@babel/plugin-transform-react-jsx-source',
  ].filter(x => x),
});
