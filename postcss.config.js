/* eslint-disable @typescript-eslint/no-var-requires */

const presetEnv = require('postcss-preset-env');
const fontMagician = require('postcss-font-magician')({
  // this is required due to a weird bug where if we let PFM use the `//` protocol Webpack style-loader
  // thinks it's a relative URL and won't load the font when sourceMaps are also enabled
  protocol: 'https:',
  display: 'swap',
  formats: 'woff2',
});

module.exports = {
  plugins: [fontMagician, presetEnv],
};
