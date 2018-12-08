const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = (env = {}) => {
  const isProd = env.production || ['production', 'staging'].includes(process.env.NODE_ENV);

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      sourceMap: !isProd,
    },
  };

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
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.TRAVIS_COMMIT': JSON.stringify(process.env.TRAVIS_COMMIT || 'unreleased'),
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/images/favicon.ico',
      }),
      new ScriptExtHtmlWebpackPlugin({
        dynamicChunks: {
          preload: true,
        },
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
    wpconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    wpconfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      })
    );
  }

  return wpconfig;
};
