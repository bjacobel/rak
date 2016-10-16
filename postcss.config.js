const autoprefixer = require('autoprefixer');
const precss = require('precss');
const stylelint = require('stylelint');

module.exports = {
  plugins: [
    stylelint,
    precss,
    autoprefixer,
  ],
};
