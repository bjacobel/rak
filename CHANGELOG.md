### v0.6.0

- Upgrade to React 19
- Remove react-helmet (see: [Support for Document Metadata](https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags))
- Upgrade to Node 22

### v0.5.1

- Fix install.js script

### v0.5.0

- Replace react-router with wouter
- Replace Sentry with @micro-sentry
- Implement react-helmet
- Improvements for mobile / PWA installation
- Additional Typescript conversion including Cloudformation stack

### v0.4.0

- Add TypeScript support
- Move most source to TypeScript
- Remove custom PostCSS setup (modules / precss-ish)
- Add [Linaria](https://github.com/callstack/linaria)
- Add CSS minification

### v0.3.0

- Update to Webpack 5
- Update to Node 16
- Update to React 18 and `createRoot` API
- Migrate to Testing Library from Enzyme
- Update most other components

### v0.2.0

- Implement [module/nomodule pattern](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) for better code size in browsers that support ES2015
- Externalize a number of features (performance testing scripts, etc)
- Support writing index.html templates with JSX
- Use Terser for minification
- Implement `@babel/plugin-transform-runtime`
- Support (encourage) Node 12
- Add configuration file for [Renovate](https://renovatebot.com/)

### v0.1.0

- Upgrade to React 16
- Upgrade to Webpack 4
- Many, many other package upgrades [see here for more](https://github.com/bjacobel/rak/pull/173/files#diff-b9cfc7f2cdf78a7f4b91a753d10865a2)
- Refactor test folder structure
- Shrink bundle size significantly

### v0.0.5

- Refactor with Prettier

### v0.0.4

- Upgrade to Webpack 2.2 final (& ecosystem dependencies)

### v0.0.3

- Upgrade to Webpack 2 (RC 4) & other necessary plugins
- Update handling of index.html and favicon.ico using [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
- Restructure Webpack to split code into a separate first-party and vendor bundle
- Undertake other performance work (cache headers, hashing/invalidation)
- Optimize SVG for logo

### v0.0.2 (10/20/2016)

- Added React Router. ([#18](https://github.com/bjacobel/rak/issues/18))
- Added ability to use an existing Route53 hosted zone ([#20](https://github.com/bjacobel/rak/issues/20))
- Implemented CSS Modules ([#27](https://github.com/bjacobel/rak/issues/27))
- Switched to Yarn as the main package manager ([#34](https://github.com/bjacobel/rak/issues/34))

---

### v0.0.1 (10/15/2016)

- Added ability to set the project up in a new directory with a single command. ([#7](https://github.com/bjacobel/rak/issues/7))

---

### v0.0.0 (10/03/2016)

- First public release.
