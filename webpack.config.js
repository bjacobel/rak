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
    // See:
    // https://github.com/webpack/css-loader/issues/232
    // https://github.com/webpack/css-loader/issues/216
    // https://github.com/webpack/style-loader/issues/55
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: '[name].js',
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        loader: 'url?limit=64000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9=]+)?$/,
        loader: 'file',
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: isProd ?
          ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: `css?${cssLoaderConfig}!postcss` }) :
          `style!css?sourceMap&${cssLoaderConfig}!postcss`,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
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
    historyApiFallback: true,
  },
};

if (!isProd) {
  wpconfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
