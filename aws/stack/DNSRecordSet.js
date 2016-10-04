const { ref, getAtt, join } = require('cloudfriend');

module.exports = {
  Type: 'AWS::Route53::RecordSetGroup',
  DependsOn: [
    'HostedZone',
    'CloudFrontDistribution',
  ],
  Properties: {
    HostedZoneId: ref('HostedZone'),
    RecordSets: [
      {
        Name: join([ref('ProjectFQDomain'), '.']),
        Type: 'A',
        AliasTarget: {
          HostedZoneId: 'Z2FDTNDATAQYW2',  // default Cloudfront distro hosted zone
          DNSName: getAtt('CloudFrontDistribution', 'DomainName'),
        },
      },
      {
        // Only create this resource if ProjectDomain and ProjectFQDomain are the same.
        // This adds a <www.ProjectDomain> route that works equally.
        Condition: 'CreateWWW',
        Name: join(['www.', ref('ProjectDomain'), '.']),
        Type: 'A',
        AliasTarget: {
          HostedZoneId: 'Z2FDTNDATAQYW2',  // default Cloudfront distro hosted zone
          DNSName: getAtt('CloudFrontDistribution', 'DomainName'),
        },
      },
    ],
  },
};
