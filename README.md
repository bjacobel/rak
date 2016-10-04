# Rak

[![Build Status](https://travis-ci.org/bjacobel/rak.svg?branch=master)](https://travis-ci.org/bjacobel/rak) [![codecov](https://codecov.io/gh/bjacobel/rak/branch/master/graph/badge.svg)](https://codecov.io/gh/bjacobel/rak) [![Dependency Status](https://david-dm.org/bjacobel/rak.svg)](https://david-dm.org/bjacobel/rak)

Rak (React App Kit) is an opinionated skeleton to quickly set up a project with React, Redux, Webpack & friends.



###What's inside
Rak includes and configures the following components to help you build a rock-solid, scalable app with best practices and zero configuration.

  - [React](https://facebook.github.io/react/)
  - [Redux](http://redux.js.org/)
  - [Webpack](https://webpack.github.io/) (with [HMR](https://webpack.github.io/docs/hot-module-replacement.html))
  - [Babel](https://babeljs.io/) (with [ES2015](http://babeljs.io/docs/plugins/preset-es2015/) and [React](http://babeljs.io/docs/plugins/preset-react/) presets)
  - [PostCSS](http://postcss.org/) (with [CSS Modules](https://github.com/css-modules/css-modules) and [precss](https://github.com/jonathantneal/precss) syntax)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [Stylelint](http://stylelint.io/) (with [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard))
  - [ESLint](http://eslint.org/) (with [Airbnb's style guide](http://airbnb.io/javascript/))
  - [Jest](https://facebook.github.io/jest/)
  - [Enzyme](http://airbnb.io/enzyme/)
  - [.travis.yml](https://docs.travis-ci.com/user/customizing-the-build) configured to lint, test, build and deploy to S3/CloudFront
  - [CloudFormation](https://aws.amazon.com/cloudformation/) template to set up those AWS resources for you

###Using it in a project
Rak requires Node 6. In addition, to use the automatic AWS deployment features, you'll need both an AWS account and a Travis CI account.

###Deployment
Rak includes a CloudFormation template that can create & configure all the AWS resources it needs. You'll want to create the CloudFormation stack before you push to your master branch for the first time. To do that:

1. Add AWS configuration to your environment. See the AWS doc on [configuring the command-line interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
2. Add project configuration to `./config.js`, including the name of your project and the domain it'll live at.
3. Build your CloudFormation stack with `npm run awsUtils -- launch`.

CloudFormation will create the following resources:

- an S3 bucket to host static files
- a CloudFront distribution to serve as a CDN
- an AWS Certificate Manager SSL certificate, so the site can be served over HTTPS
- A Route53 hosted domain, which contains DNS routes for your domain
- A Route53 DNS record for your site
- Another Route53 DNS record for www.<yoursite>, if your site sits at a domain apex

This will take about 30 minutes. While it's going:

1. Set up [Travis CI](https://travis-ci.org) for your repo.
  - Add your `AWS_ACCESS_TOKEN_ID` and `AWS_SECRET_ACCESS_TOKEN` to Travis CI, either using their web interface or [their Ruby gem and the `travis encrypt` command](https://docs.travis-ci.com/user/environment-variables/).
  - Update the badge at the top of the readme to point to your new Travis SVG
2. Set up [Codecov](https://codecov.io) for your repo (Optional but recommended)
  - Update the badge at the top of the readme to point to your new Codecov SVG
3. Update the readme to remove all the stuff about the boilerplate and to say a bit about your new project!

Leaving the `npm run awsUtils -- launch` process running will tail CloudFormation events to your console. You can also log into the [AWS Management Console](https://console.aws.amazon.com/cloudformation/home#/stacks?filter=active) to track the progress of your stack. Once it's reached the `CREATE_COMPLETE` status:

1. Get the nameservers (`ns-xxx.awsdns-xxx.tld`) for your new Route53 hosted zone, and point your domain to these nameservers in your registrar's DNS console. These changes may take a while to take effect.
2. Push or merge your code to the `master` branch. Travis will test, lint, bundle and deploy your code to S3, and you should see it at your domain shortly.
