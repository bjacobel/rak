const invalidate = require('./invalidate').default;
const launch = require('./launch');
const bucketExists = require('./bucketExists').default;

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
