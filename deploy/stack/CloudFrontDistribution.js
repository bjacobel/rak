const { ref, join } = require('@mapbox/cloudfriend');

module.exports = {
  Type: 'AWS::CloudFront::Distribution',
  Properties: {
    DistributionConfig: {
      Aliases: [
        ref('ProjectFQDomain'),
        join('.', ['www', ref('ProjectFQDomain')]), // If we don't create the WWW route, this doesn't do any harm.
      ],
      Enabled: true,
      DefaultRootObject: 'index.html',
      PriceClass: 'PriceClass_100',
      HttpVersion: 'http2',
      DefaultCacheBehavior: {
        Compress: true,
        TargetOriginId: join(['S3-', ref('ProjectName')]),
        ViewerProtocolPolicy: 'redirect-to-https',
        AllowedMethods: ['HEAD', 'GET'],
        CachedMethods: ['HEAD', 'GET'],
        ForwardedValues: {
          Cookies: {
            Forward: 'none',
          },
          QueryString: 'false',
        },
        // Adds HSTS. See: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html#managed-response-headers-policies-security
        ResponseHeadersPolicyId: '67f7725c-6f97-4210-82d7-5512b31e9d03',
      },
      Origins: [
        {
          DomainName: join([ref('ProjectFQDomain'), '.s3.amazonaws.com']),
          Id: join(['S3-', ref('ProjectName')]),
          S3OriginConfig: {},
        },
      ],
      ViewerCertificate: {
        AcmCertificateArn: ref('IssuedCertificate'),
        SslSupportMethod: 'sni-only',
        MinimumProtocolVersion: 'TLSv1.2_2021',
      },
      // This is so pushState routing works
      CustomErrorResponses: [
        {
          ErrorCachingMinTTL: 0,
          ErrorCode: 404,
          ResponseCode: 200,
          ResponsePagePath: '/index.html',
        },
      ],
    },
  },
};
