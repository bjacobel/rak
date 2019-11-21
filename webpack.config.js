const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config.js');

module.exports = (env = {}, { mode } = {}) => {
  const isProd = env.production || ['production', 'staging'].includes(process.env.NODE_ENV) || mode === 'production';

  if (isProd) {
    process.env.BABEL_ENV = 'production';
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
      importLoaders: 1,
      sourceMap: !isProd,
    },
  };

  return {
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
          loaders: [
            isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            cssLoader,
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.html\.jsx$/,
          use: {
            loader: '@bjacobel/vhtml-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      modules: [__dirname, path.resolve(__dirname, 'src'), 'node_modules'],
    },
    node: {
      constants: false,
    },
    optimization: {
      noEmitOnErrors: true,
      splitChunks: {
        chunks: 'async',
        minChunks: 1,
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 8,
          },
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.TRAVIS_COMMIT': JSON.stringify(process.env.TRAVIS_COMMIT || 'unreleased'),
        process: undefined,
        projectConfig: JSON.stringify(config),
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html.jsx',
        favicon: './src/assets/images/favicon.ico',
        title: config.ProjectName,
        inject: true,
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
        preload: {
          test: /\.js$/,
          chunks: 'async',
        },
      }),
      !isProd && new webpack.HotModuleReplacementPlugin(),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),
    ].filter(Boolean),
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
};
