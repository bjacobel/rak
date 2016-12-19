const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectConfig = require('./config.js');

const isProd = process.env.NODE_ENV === 'production';
const cssLoaderConfig = 'modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

const wpconfig = {
  entry: {
    main: [
      './src/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    // See:
    // https://github.com/webpack/css-loader/issues/232
    // https://github.com/webpack/css-loader/issues/216
    // https://github.com/webpack/style-loader/issues/55
    publicPath: 'http://localhost:8080/',
    filename: '[hash].[name].js',
  },
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 64000,
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9=]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: isProd ?
          ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: `css-loader?${cssLoaderConfig}!postcss-loader`,
            publicPath: '/',
          }) :
          `style-loader!css-loader?sourceMap&${cssLoaderConfig}!postcss-loader`,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest',
      ],
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      title: projectConfig.ProjectName,
      template: './src/index.html',
    }),
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
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
