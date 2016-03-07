# react-redux-boilerplate

Skeleton to quickly set up a project with React, Redux, Webpack, PostCSS & friends.

[![Build Status](https://travis-ci.org/bjacobel/react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/bjacobel/react-redux-boilerplate) [![codecov](https://codecov.io/gh/bjacobel/react-redux-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/bjacobel/react-redux-boilerplate) [![Dependency Status](https://david-dm.org/bjacobel/react-redux-boilerplate.svg)](https://david-dm.org/bjacobel/react-redux-boilerplate)

Full contents:
  - React
  - Redux
  - Webpack
  - Webpack Hot Module Reload
  - Babel (with ES6 and React presets)
  - PostCSS (with `precss` style)
  - Autoprefixer
  - Stylelint
  - ESLint (setup with a version of Airbnb's style guide)
  - Jest
  - Enzyme
  - .travis.yml configured to lint, test, build and deploy to S3/Cloudfront
  - CloudFormation template to set up those AWS resources for you
  - Other goodies


Requires:
  - Node 6
  - a Travis CI account set up with AWS credentials (either through the web UI or by adding encrypted values to the `.travis.yml` `env` section)
