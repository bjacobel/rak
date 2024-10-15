import { ref } from '@mapbox/cloudfriend';

export default {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: ref('ProjectFQDomain'),
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: 'TRUE',
      BlockPublicPolicy: 'TRUE',
      IgnorePublicAcls: 'TRUE',
      RestrictPublicBuckets: 'TRUE',
    },
    VersioningConfiguration: {
      Status: 'Suspended',
    },
    OwnershipControls: {
      Rules: [
        {
          ObjectOwnership: 'BucketOwnerEnforced',
        },
      ],
    },
  },
};
