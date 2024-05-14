const { S3Client, HeadBucketCommand } = require('@aws-sdk/client-s3');

const config = require('../../config');

module.exports = async () => {
  const s3 = new S3Client({ region: config.Region });
  const cmd = new HeadBucketCommand({ Bucket: config.ProjectFQDomain });

  try {
    await s3.send(cmd);
    console.log('true');
  } catch {
    console.log('false');
  }
};
