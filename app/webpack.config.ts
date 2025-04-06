import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

import config from '../config';

const HASH_DIGEST_LENGTH = 20;

export default (env: Record<string, unknown> = {}, { mode }: { mode?: string } = {}) => {
  const nodeEnv = process.env.NODE_ENV || 'unknown';
  const isProd = env.production || ['production', 'staging'].includes(nodeEnv) || mode === 'production';
  const swEnable = process.env.SW_ENABLE === 'true' || isProd;

  if (isProd) {
    process.env.BABEL_ENV = 'production';
  }

  return {
    entry: {
      main: path.join(__dirname, './src/index.tsx'),
    },
    mode: isProd ? 'production' : 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: isProd ? '[name].[chunkhash].js' : '[name].js',
      publicPath: isProd ? '/' : 'http://localhost:8080/',
      hashDigestLength: HASH_DIGEST_LENGTH,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?[a-z0-9=]+)?$/,
          type: 'asset',
        },
        {
          test: /\.[jt]sx?$/,
          include: path.join(__dirname, 'src'),
          use: [
            'babel-loader',
            {
              loader: '@wyw-in-js/webpack-loader',
              options: {
                sourceMap: !isProd,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.html\.tsx$/,
          use: [{ loader: '@bjacobel/vhtml-loader' }],
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
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.GITHUB_SHA': JSON.stringify(process.env.GITHUB_SHA || 'unreleased'),
        'process.env.SW_ENABLE': JSON.stringify(swEnable),
        __SENTRY_DEBUG__: !isProd,
        __SENTRY_TRACING__: !isProd,
        process: undefined,
        projectConfig: JSON.stringify(config),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html.tsx'),
        title: config.ProjectName,
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, './src/assets/images/favicon.svg'),
        favicons: {
          appName: config.ProjectName,
          appShortName: config.ProjectName,
          background: '#ddd',
          theme_color: '#333',
        },
      }),
      swEnable &&
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          exclude: [/\.map$/, /\.LICENSE.txt$/],
          dontCacheBustURLsMatching: new RegExp(`\\.[a-z0-9]{${HASH_DIGEST_LENGTH}}\\.`),
          directoryIndex: 'index.html',
          runtimeCaching: [
            {
              urlPattern: /images/,
              handler: 'CacheFirst',
            },
            {
              urlPattern: /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
              handler: 'CacheFirst',
            },
            {
              urlPattern: /.*/,
              handler: 'NetworkFirst',
            },
          ],
        }),
    ].filter(Boolean),
    ignoreWarnings: [/GenerateSW/],
    devServer: {
      hot: !isProd,
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
