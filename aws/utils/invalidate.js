const AWS = require('aws-sdk');
const config = require('../../config');

module.exports = () => {
  // Invalidate the CloudFront distro associated with this project.
  const cloudfront = new AWS.CloudFront();
  return new Promise((resolve, reject) => {
    cloudfront.listDistributions({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const distro = data.DistributionList.Items.find(x => x.Aliases.Items.includes(config.ProjectFQDomain));
        if (distro) {
          resolve(distro.Id);
        } else {
          reject(new Error('No distribution matching ProjectFQDomain found'));
        }
      }
    });
  }).then((DistributionId) => {
    return new Promise((resolve, reject) => {
      cloudfront.createInvalidation({
        DistributionId,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: 3,
            Items: [
              '/main.js',
              '/main.css',
              '/index.html',
            ],
          },
        },
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Invalidation.Id);
        }
      });
    });
  }).then((invalidationId) => {
    console.log(`Invalidation with id ${invalidationId} in progress.`);
  }).catch((err) => {
    console.error(`Error: ${err.message}\nTry invalidaing the distribution through the AWS console.`);
  });
};
