#!/usr/local/bin/node

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const replaceStream = require('replacestream');
const config = require('./config');

const ignorePaths = [
  'install.js',
  'node_modules',
  '.git',
].map(x => path.resolve(__dirname, x));

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

const rreaddir = (root) => {
  return fs.readdirSync(root).map((file) => {
    const fileAbsPath = path.join(root, file);

    if (ignorePaths.includes(fileAbsPath)) {
      // Don't explore or return this file.
      return [];
    } else if (fs.statSync(fileAbsPath).isDirectory()) {
      // Explore the node
      return rreaddir(fileAbsPath);
    } else {
      // Return the leaf
      return fileAbsPath;
    }
  });
};

(() => {
  const newProjectName = process.argv[2];
  if (newProjectName) {
    console.log(`Creating project ${newProjectName} in ${process.cwd()}`);
    const rakRoot = __dirname;

    flatten(rreaddir(rakRoot)).forEach((srcFile) => {
      const dstFileRelPath = path.relative(rakRoot, srcFile);
      const dstFileAbsPath = path.join(process.cwd(), dstFileRelPath);
      const subfolder = path.parse(dstFileAbsPath).dir;

      mkdirp.sync(subfolder);
      const dstFile = fs.createWriteStream(dstFileAbsPath);

      fs.createReadStream(srcFile).pipe(replaceStream(config.ProjectName, newProjectName))
        .on('read', (chunk) => {
          dstFile.write(chunk);
        });
    });

    // remove mkcdirp and replacestream from package.json
  } else {
    console.error('Usage: rak <projectName>');
  }
})();
