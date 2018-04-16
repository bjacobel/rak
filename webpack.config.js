const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const projectConfig = require('./config.js');

const isProd = process.env.NODE_ENV === 'production';

const cssLoaderConfig = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]___[hash:base64:5]',
};

const prodCssConfig = {
  fallbackLoader: 'style-loader',
  loader: [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      query: cssLoaderConfig,
    },
    { loader: 'postcss-loader' },
  ],
  publicPath: '/',
};

const devCssConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: Object.assign(
      {},
      { sourceMap: true },
      // This doesn't go through Babel so no ES2017 stuff
      cssLoaderConfig // eslint-disable-line comma-dangle
    ),
  },
  { loader: 'postcss-loader' },
];

const wpconfig = {
  entry: {
    main: './src/index.js',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    publicPath: isProd ? '/' : 'http://localhost:8080/',
  },
  devtool: 'source-map',
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
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.TRAVIS_COMMIT': JSON.stringify(process.env.TRAVIS_COMMIT || 'unreleased'),
    }),
    new HtmlWebpackPlugin({
      title: projectConfig.ProjectName,
      template: './src/index.html',
      favicon: './src/assets/images/favicon.ico',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    overlay: true,
  },
  performance: {
    maxAssetSize: 350000,
    maxEntrypointSize: 500000,
    hints: isProd ? 'warning' : false,
  },
};

if (!isProd) {
  wpconfig.plugins = [new webpack.HotModuleReplacementPlugin(), ...wpconfig.plugins];
} else {
  wpconfig.plugins = [
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
    }),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
