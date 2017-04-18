#!/usr/bin/env node

// Some funkiness here because this file is NOT run through Babel, just Node 6
/* eslint-env { parserOptions: { ecmaVersion: 6 } } */
/* eslint 'comma-dangle': [2, 'always-multiline'] */
/* eslint-disable global-require, import/no-extraneous-dependencies, import/no-dynamic-require, import/no-unresolved */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('./config');

const ignorePaths = ['.git', '.npmignore', 'install.js', 'install-test.sh', 'node_modules', 'CHANGELOG.md'].map(x =>
  path.resolve(__dirname, x)
);

const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const clean = (pDJ, projName) => {
  const blacklist = [
    'bin',
    'bugs',
    'description',
    'gitHead',
    'homepage',
    'keywords',
    'optionalDependencies',
    'readme',
    'readmeFilename',
  ];
  const newPackageJson = {};

  Object.keys(pDJ).forEach(key => {
    if (!blacklist.includes(key) && !key.startsWith('_')) {
      newPackageJson[key] = pDJ[key];
    }
  });

  delete newPackageJson.scripts.postinstall;
  newPackageJson.scripts.test = 'jest';

  newPackageJson.name = projName;

  newPackageJson.repository = Object.assign({}, newPackageJson.repository, {
    url: newPackageJson.repository.url.replace(config.ProjectName, projName),
  });

  return JSON.stringify(newPackageJson, null, 2);
};

const rreaddir = root =>
  fs.readdirSync(root).map(file => {
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

const isBin = fileAbsPath => {
  switch (path.extname(fileAbsPath)) {
    case '.ico':
      return true;
    default:
      return false;
  }
};

(() => {
  console.log("\nInstalling Rak's setup requirements...\n");
  execSync('yarn add replacestream mkdirp || npm -s install replacestream mkdirp', { stdio: [0, 1, 2] });
  const replaceStream = require('replacestream');
  const mkdirp = require('mkdirp');

  console.log("\nSetting up new Rak project's file structure...\n");
  const newProjectRoot = process.cwd();
  const newProjectName = path.parse(newProjectRoot).name;
  const copyPromises = flatten(rreaddir(__dirname)).map(srcFileAbsPath => {
    const srcFileRelFromSrcRoot = path.relative(__dirname, srcFileAbsPath);
    const dstFileAbsPath = path.join(newProjectRoot, srcFileRelFromSrcRoot);
    const dstFileSubfolder = path.parse(dstFileAbsPath).dir;

    return new Promise((resolve, reject) => {
      mkdirp.sync(dstFileSubfolder);
      const dstFile = fs.createWriteStream(dstFileAbsPath);

      if (srcFileRelFromSrcRoot === 'package.json') {
        const packageDotJson = require(srcFileAbsPath);
        dstFile.write(clean(packageDotJson, newProjectName), () => resolve());
      } else {
        fs
          .createReadStream(srcFileAbsPath)
          .pipe(isBin(srcFileAbsPath) ? () => {} : replaceStream(config.ProjectName, newProjectName))
          .pipe(dstFile)
          .on('close', resolve)
          .on('error', reject);
      }
    });
  });

  return Promise.all(copyPromises).then(() => {
    // .gitignore is never included in npm installs even if explicitly !.npmignored
    execSync('echo -e "coverage\ndist\nnode_modules" > .gitignore');

    // Will only tree if tree is installed
    execSync('command -v tree > /dev/null && tree . -aIC node_modules || true', { stdio: [0, 1, 2] });

    console.log('\nInstalling devDependencies of your new Rak project...\n');
    execSync('yarn || npm -s install --only-dev', { stdio: [0, 1, 2] });

    console.log('\nDone!');
  });
})();
