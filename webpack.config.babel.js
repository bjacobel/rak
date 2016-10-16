const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssLoaderConfig = 'modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

const wpconfig = {
  entry: {
    main: [
      './src/index.js',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  debug: true,
  devtool: isProd ? null : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: isProd ?
          ExtractTextPlugin.extract('style', `css?${cssLoaderConfig}!postcss`) :
          `style!css?sourceMap&${cssLoaderConfig}!postcss`,
      },
      {
        test: /\.(eot|ttf|woff|svg)(\?[a-z0-9=]+)?$/,
        loader: 'file',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
  },
};

if (!isProd) {
  wpconfig.entry.main = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    ...wpconfig.entry.main,
  ];

  wpconfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
