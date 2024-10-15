import { ref, join, getAtt } from '@mapbox/cloudfriend';

export default {
  Type: 'AWS::S3::BucketPolicy',
  Properties: {
    Bucket: ref('ProjectFQDomain'),
    PolicyDocument: {
      Version: '2012-10-17',
      Id: 'Policy1453859091536',
      Statement: [
        {
          Sid: 'AllowCloudFrontServicePrincipalReadOnly',
          Effect: 'Allow',
          Principal: {
            Service: 'cloudfront.amazonaws.com',
          },
          Action: ['s3:GetObject', 's3:ListBucket'],
          Resource: [
            join(['arn:aws:s3:::', ref('ProjectFQDomain')]),
            join(['arn:aws:s3:::', ref('ProjectFQDomain'), '/*']),
          ],
          Condition: {
            StringEquals: {
              'AWS:SourceArn': join([
                'arn:aws:cloudfront::',
                ref('AWS::AccountId'),
                ':distribution/',
                getAtt('CloudFrontDistribution', 'Id'),
              ]),
            },
          },
        },
      ],
    },
  },
};
