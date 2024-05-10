const invalidate = require('./invalidate');
const launch = require('./launch');
const bucketExists = require('./bucketExists');

const utilName = process.argv[2];
(() => {
  switch (utilName) {
    case 'invalidate':
      return invalidate();
    case 'launch':
      return launch();
    case 'bucketExists':
      return bucketExists();
    default:
      return console.error(`Error: No such util "${utilName}"`);
  }
})();
