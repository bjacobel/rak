const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const webpack = require('webpack');
const chromeLauncher = require('chrome-launcher');
const Koa = require('koa');
const staticfiles = require('koa-static');
const compress = require('koa-compress');
const opn = require('opn');

const config = require('../webpack.config.js')({ production: true });

const webpackCompile = async () => {
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err || stats.toJson().errors);
      resolve(stats.toJson().assets);
    });
  });
};

(async () => {
  const serverPort = 8888;
  const reportPath = '/tmp/lighthouse.html';

  await webpackCompile();

  const server = new Koa();

  server.use(compress());
  server.use(
    staticfiles(path.join(__dirname, '../dist'), {
      maxage: 31536000000,
    })
  );

  await server.listen(serverPort);

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const { report } = await lighthouse(`http://localhost:${serverPort}`, {
    port: chrome.port,
    output: 'html',
  });

  await new Promise((resolve) => fs.writeFile(reportPath, report, () => resolve()));
  await opn(reportPath, { wait: false });

  await chrome.kill();
  return server;
})();
