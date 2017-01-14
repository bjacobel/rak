const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectConfig = require('./config.js');
const packageJson = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const cssLoaderConfig = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]___[hash:base64:5]',
};

const prodCssConfig = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: [
    {
      loader: 'css-loader',
      query: cssLoaderConfig,
    },
    { loader: 'postcss-loader' },
  ],
  publicPath: '/',
});

const devCssConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: Object.assign(
      {},
      { sourceMap: true },
      // This doesn't go through Babel so no ES2017 stuff
      cssLoaderConfig  // eslint-disable-line comma-dangle
    ),
  },
  { loader: 'postcss-loader' },
];

const wpconfig = {
  entry: {
    main: './src/index.js',
    vendor: Object.keys(packageJson.dependencies),
  },
  output: {
    path: `${__dirname}/dist`,
    // See:
    // https://github.com/webpack/css-loader/issues/232
    // https://github.com/webpack/css-loader/issues/216
    // https://github.com/webpack/style-loader/issues/55
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 64000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?[a-z0-9=]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: isProd ? prodCssConfig : devCssConfig,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: projectConfig.ProjectName,
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: !isProd,
    }),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  performance: {
    hints: isProd ? false : 'warning',
    assetFilter: name => !(/(\.map|\.hot-update\.js)$/.test(name)),
  },
};

if (!isProd) {
  wpconfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new ExtractTextPlugin({
      filename: '[hash].[name].css',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest',
      ],
    }),
    new InlineManifestWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
