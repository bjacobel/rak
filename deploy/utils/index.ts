import invalidate from './invalidate';
import launch from './launch';
import bucketExists from './bucketExists';

const utilName = process.argv[2];
(() => {
  if (!utilName) {
    console.log('invalidate | launch | bucketExists');
    return null;
  }
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
