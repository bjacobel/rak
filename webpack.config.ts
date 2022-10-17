import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import config from './config';

export default (env: Record<string, unknown> = {}, { mode }: { mode?: string } = {}) => {
  const nodeEnv = process.env.NODE_ENV || 'unknown';
  const isProd = env.production || ['production', 'staging'].includes(nodeEnv) || mode === 'production';

  if (isProd) {
    process.env.BABEL_ENV = 'production';
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        namedExport: true,
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
          type: 'asset',
        },
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          use: 'ts-loader',
        },
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
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
      extensions: ['.js', '.ts', '.tsx', '.json'],
      modules: [__dirname, path.resolve(__dirname, 'src'), 'node_modules'],
    },
    optimization: {
      emitOnErrors: false,
      splitChunks: {
        chunks: 'async',
        minChunks: 1,
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
            ecma: 2020,
            mangle: {
              keep_fnames: /Error$/,
              keep_classnames: /Error$/,
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.GITHUB_SHA': JSON.stringify(process.env.GITHUB_SHA || 'unreleased'),
        process: undefined,
        projectConfig: JSON.stringify(config),
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html.jsx',
        favicon: './src/assets/images/favicon.ico',
        title: config.ProjectName,
        inject: true,
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),
    ].filter(Boolean),
    devServer: {
      hot: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath: '/',
      },
    },
    performance: {
      maxAssetSize: 350000,
      maxEntrypointSize: 500000,
      hints: isProd ? 'warning' : false,
    },
  };
};
