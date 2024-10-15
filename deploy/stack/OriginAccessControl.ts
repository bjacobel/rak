import { ref, join } from '@mapbox/cloudfriend';

export default {
  Type: 'AWS::CloudFront::OriginAccessControl',
  Properties: {
    OriginAccessControlConfig: {
      Description: join(['Access S3 origin from ', ref('ProjectFQDomain')]),
      Name: join([ref('ProjectFQDomain'), '-OriginAccessControlConfig']),
      OriginAccessControlOriginType: 's3',
      SigningBehavior: 'always',
      SigningProtocol: 'sigv4',
    },
  },
};
