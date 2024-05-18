import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

// webpack is the wrong tool for this job - I'm only using it because I refuse to let the dep list for this project grow any more
export default {
  entry: {
    main: path.resolve(__dirname, 'install.ts'),
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../lib'),
  },
  mode: 'production',
  target: 'node',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.join(__dirname, '../../'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
};
