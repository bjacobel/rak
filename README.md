<img src="https://rak.bjacobel.com/logo.svg" alt="Rak" width="200px">

[![Build Status](https://github.com/bjacobel/rak/actions/workflows/frontend-ci.yaml/badge.svg)](https://github.com/bjacobel/rak/actions/workflows/frontend-ci.yaml) [![codecov](https://codecov.io/gh/bjacobel/rak/branch/master/graph/badge.svg)](https://codecov.io/gh/bjacobel/rak) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

Rak (React App Kit) is an opinionated skeleton to quickly set up a project with React, Redux, Webpack & friends.

### What's inside

Rak includes and configures the following components to help you build a rock-solid, scalable app with best practices and zero configuration.

- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [Webpack](https://webpack.github.io/) (with [HMR](https://webpack.github.io/docs/hot-module-replacement.html))
- [Babel](https://babeljs.io/) (with [babel-preset-env](https://github.com/babel/babel-preset-env) and [React](http://babeljs.io/docs/plugins/preset-react/) presets)
- [PostCSS](http://postcss.org/) (with [CSS Modules](https://github.com/css-modules/css-modules) and [precss](https://github.com/jonathantneal/precss) syntax)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Stylelint](http://stylelint.io/) (with [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard))
- [ESLint](http://eslint.org/) (with [Airbnb's style guide](http://airbnb.io/javascript/))
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)
- [Enzyme](http://airbnb.io/enzyme/)
- [GitHub Actions workflows](https://docs.github.com/en/actions/learn-github-actions) configured to lint, test, build and deploy to S3/CloudFront
- [CloudFormation](https://aws.amazon.com/cloudformation/) template to set up those AWS resources for you

### Using it in a project

Rak requires Node 16. In addition, to use the automatic AWS deployment features, you'll need both an AWS account and a GitHub account.

Start a new Project with Rak by creating an empty directory and installing `rak` into it.

    mkdir my-new-project
    cd my-new-project
    yarn add rak

Next, run the new `rak` command-line executable. It doesn't take any arguments, and will set up a project using the name of the folder you created as the project name.

    $(yarn bin)/rak

Some details about your newly created folder structure and dependencies will be printed while Rak is setting up. After it's done, you can uninstall rak if you want:

    yarn remove rak

and commit your project to git:

    git init && git add --all && git commit -m "Initial commit"

and start developing! Your next steps might include:

- Configuring project information (like domain, name and analytics/error logging IDs) in `./config.js`.
- Pushing your repo to GitHub. (Public and private repos are supported.)
- Setting up [GitHub Actions](https://github.com/features/actions) for your repo.
  - Add your `AWS_ACCESS_TOKEN_ID` and `AWS_SECRET_ACCESS_TOKEN` to the Secrets for your repo at `https://github.com/[username]/[repo]/settings/secrets`
  - Also add other optional environment variables, like `SENTRY_AUTH_TOKEN` for deploy tracking and sourcemap support in Sentry.
- Setting up [Codecov](https://codecov.io) for your repo.
  - Add a API key for Codecov to the Secrets for the repo as `CODECOV_TOKEN`
  - Coverage stats will be automatically uploaded, but you'll need to authorize Codecov against your GitHub account and add the app to the repo to get pull request comments with coverage information.
  - Make sure to update the badge at the top of the readme to point to your new Codecov SVG.
- Updating the readme to remove all the stuff about the boilerplate and to say a bit about your new project.
- Removing or modifying the example actions/reducers/services to do... whatever your new app does.

### Deployment

Rak includes a CloudFormation template that can create & configure all the AWS resources it needs. You'll want to create the CloudFormation stack before you push to your master branch for the first time. To do that:

1. Add AWS configuration to your environment. See the AWS doc on [configuring the command-line interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
2. Add project configuration to `./config.js`, including the name of your project and the domain it'll live at.
3. Build your CloudFormation stack with `yarn awsUtils launch`.

CloudFormation will create the following resources:

- an S3 bucket to host static files
- a CloudFront distribution to serve as a CDN
- an AWS Certificate Manager SSL certificate, so the site can be served over HTTPS
- A Route53 hosted domain, which contains DNS routes for your domain
- A Route53 DNS record for your site
- Another Route53 DNS record for www.<yoursite>, if your site sits at a domain apex

This will take about 30 minutes. While it's going, leaving the `yarn awsUtils launch` process running will tail CloudFormation events to your console. You can also log into the [AWS Management Console](https://console.aws.amazon.com/cloudformation/home#/stacks?filter=active) to track the progress of your stack.

Once it's reached the `CREATE_COMPLETE` status:

1. Get the nameservers (`ns-xxx.awsdns-xxx.tld`) for your new Route53 hosted zone, and point your domain to these nameservers in your registrar's DNS console. These changes may take a while to take effect.
2. Push or merge your code to the `master` branch. GitHub Actions will test, lint, bundle and deploy your code to S3, and you should see it at your domain shortly.

### Thanks to

- all the developers of all the awesome code and systems Rak is built on
- [Simon Mettler](https://thenounproject.com/search/?q=rocket&i=113198) from the [Noun Project](https://thenounproject.com/search/?q=rocket&i=113198)
