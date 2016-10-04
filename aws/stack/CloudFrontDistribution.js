const { ref, join } = require('cloudfriend');

module.exports = {
  Type: 'AWS::CloudFront::Distribution',
  DependsOn: [
    'S3Bucket',
    'ACMCertificate',
  ],
  Properties: {
    DistributionConfig: {
      Aliases: [
        ref('ProjectFQDomain'),
        join('.', ['www', ref('ProjectFQDomain')]),  // If we don't create the WWW route, this doesn't do any harm.
      ],
      Enabled: true,
      DefaultRootObject: 'index.html',
      PriceClass: 'PriceClass_100',
      DefaultCacheBehavior: {
        TargetOriginId: join(['S3-', ref('ProjectName')]),
        ViewerProtocolPolicy: 'redirect-to-https',
        MinTTL: 0,
        AllowedMethods: [
          'HEAD',
          'GET',
        ],
        CachedMethods: [
          'HEAD',
          'GET',
        ],
        ForwardedValues: {
          Cookies: {
            Forward: 'none',
          },
          QueryString: 'false',
        },
      },
      Origins: [
        {
          DomainName: join([ref('ProjectFQDomain'), '.s3.amazonaws.com']),
          Id: join(['S3-', ref('ProjectName')]),
          CustomOriginConfig: {
            OriginProtocolPolicy: 'https-only',
          },
        },
      ],
      ViewerCertificate: {
        AcmCertificateArn: ref('ACMCertificate'),
        SslSupportMethod: 'sni-only',
      },
      // This is so pushState routing works
      CustomErrorResponses: [{
        ErrorCachingMinTTL: 0,
        ErrorCode: 404,
        ResponseCode: 200,
        ResponsePagePath: '/index.html',
      }],
    },
  },
};
