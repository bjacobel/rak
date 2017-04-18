const autoprefixer = require('autoprefixer');
const precss = require('precss');
const stylelint = require('stylelint');
const fontMagician = require('postcss-font-magician')({
  // this is required due to a weird bug where if we let PFM use the `//` protocol Webpack style-loader
  // thinks it's a relative URL and won't load the font when sourceMaps are also enabled
  protocol: 'https:',
});

module.exports = {
  plugins: [stylelint, fontMagician, precss, autoprefixer],
};
