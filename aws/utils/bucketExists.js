const AWS = require('aws-sdk');

const config = require('../../config');

module.exports = () => {
  const s3 = new AWS.S3();
  return s3.headBucket({ Bucket: config.ProjectFQDomain }, err => {
    if (err) {
      console.log('false');
    } else {
      console.log('true');
    }
  });
};
