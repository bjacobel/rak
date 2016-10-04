const fs = require('fs');
const path = require('path');
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
  if (process.argv[1]) {
    flatten(rreaddir(__dirname)).forEach((file) => {
      fs.createReadStream(file).pipe(replaceStream(config.ProjectName, process.argv[1])).pipe(process.stdout);
    });
  } else {
    console.error('Usage: rak <projectName>');
  }
})();
