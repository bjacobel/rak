const AWS = require('aws-sdk');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('app/config');

module.exports = () => {
  const s3 = new AWS.S3({
    region: config.Region,
  });
  return s3.headBucket({ Bucket: config.ProjectFQDomain }, err => {
    if (err) {
      console.log('false');
    } else {
      console.log('true');
    }
  });
};
