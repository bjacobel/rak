import { ref } from '@mapbox/cloudfriend';

export default {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: ref('ProjectFQDomain'),
    PublicAccessBlockConfiguration: {
      BlockPublicPolicy: 'FALSE',
    },
    VersioningConfiguration: {
      Status: 'Suspended',
    },
  },
};
