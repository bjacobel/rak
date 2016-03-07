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
        Name: join([ref('ProjectFullDomain'), '.']),
        Type: 'A',
        AliasTarget: {
          HostedZoneId: 'Z2FDTNDATAQYW2',  // default Cloudfront distro hosted zone
          DNSName: getAtt('CloudFrontDistribution', 'DomainName'),
        },
      },
    ],
  },
};
