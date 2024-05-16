const { ref, getAtt, join } = require('@mapbox/cloudfriend');

module.exports = {
  Type: 'AWS::Route53::RecordSet',
  Properties: {
    HostedZoneName: join([ref('ProjectDomain'), '.']),
    Name: join([ref('ProjectFQDomain'), '.']),
    Type: 'A',
    AliasTarget: {
      HostedZoneId: 'Z2FDTNDATAQYW2', // default Cloudfront distro hosted zone
      DNSName: getAtt('CloudFrontDistribution', 'DomainName'),
    },
  },
};
