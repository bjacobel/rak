const autoprefixer = require('autoprefixer');
const precss = require('precss');
const stylelint = require('stylelint');
const fontMagician = require('postcss-font-magician');

module.exports = {
  plugins: [
    stylelint,
    fontMagician,
    precss,
    autoprefixer,
  ],
};
