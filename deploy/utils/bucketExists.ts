import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3';

import config from '../../config';

export default async () => {
  const s3 = new S3Client({ region: config.Region });
  const cmd = new HeadBucketCommand({ Bucket: config.ProjectFQDomain });

  try {
    await s3.send(cmd);
    console.log('true');
  } catch {
    console.log('false');
  }
};
