# react-redux-boilerplate

Skeleton to quickly set up a project with React, Redux, Webpack, PostCSS & friends.

[![Build Status](https://travis-ci.org/bjacobel/react-redux-boilerplate.svg?branch=master)](https://travis-ci.org/bjacobel/react-redux-boilerplate) [![codecov](https://codecov.io/gh/bjacobel/react-redux-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/bjacobel/react-redux-boilerplate) [![Dependency Status](https://david-dm.org/bjacobel/react-redux-boilerplate.svg)](https://david-dm.org/bjacobel/react-redux-boilerplate)

###Contains
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
  - .travis.yml configured to lint, test, build and deploy to S3/CloudFront
  - CloudFormation template to set up those AWS resources for you
  - Other goodies

###Requires
  - Node 6
  - an AWS account
  - a Travis CI account

###Deployment
RRB includes a CloudFormation template that can create & configure all the AWS resources it needs. You'll want to create the CloudFormation stack before you push to your master branch for the first time. To do that:

1. Add AWS configuration to your environment. See the AWS doc on [configuring the command-line interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
2. Add project configuration to `cloudfomation/template.js`, including the name of your project and the domain it'll live at.
3. Build your CloudFormation stack with `npm run deploy`.

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

You can check on the progress of your CloudFormation stack by logging into the AWS console, or by running the following:

    aws cloudformation wait stack-create-complete --stack-name <your ProjectName as set in cloudfront/template.js>

Once it's reached the `CREATE_COMPLETE` status:

1. Get the nameservers for your new Route53 hosted zone, and point your domain to these nameservers in your registrar's DNS console. These changes may take a while to take effect. (If you've registered your domain through Route53, you can create a new CloudFormation resource for it and set it up to link to your hosted zone automatically if you ever need to rebuild your stack.)
2. Push or merge your code to the `master` branch. Travis will test, lint, bundle and deploy your code to S3, and you should see it at your domain shortly.
