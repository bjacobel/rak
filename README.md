# react-redux-boilerplate

Skeleton to quickly set up a project with React, Redux, Webpack, PostCSS & friends.

[![Build Status](https://travis-ci.org/bjacobel/react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/bjacobel/react-redux-boilerplate) [![Dependency Status](https://david-dm.org/bjacobel/react-redux-boilerplate.svg)](https://david-dm.org/bjacobel/react-redux-boilerplate)

Full contents:
  - React
  - Redux
  - `react-redux`
  - `react-router`
  - `react-router-redux`
  - `redux-devtools`
  - Webpack
  - Webpack Hot Module Reload
  - Babel (with ES6 and React presets)
  - PostCSS (with `precss` style)
  - Autoprefixer
  - Stylelint
  - ESLint (setup with a version of Airbnb's style guide)
  - Mocha
  - Chai
  - Sinon
  - Some Chai and Sinon utilities
  - .travis.yml configured to lint, test, build and deploy to S3/Cloudfront
  - Other goodies


Requires:
  - nvm, or node 5.7.0
  - a Travis CI account set up with AWS credentials (either through the web UI or by adding encrypted values to the `.travis.yml` `env` section)

Manual steps:
  - The Travis deploy script will create an S3 bucket automatically, but does not currently create a Cloudfront distribution automatically. You must do this yourself, as well as linking things up in S3. When you do, add the Cloudfront distribution ID to the `env` section of `travis.yml`
