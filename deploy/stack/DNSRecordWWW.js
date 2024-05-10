const { ref, getAtt, join } = require('@mapbox/cloudfriend');

module.exports = {
  // Only create this resource if ProjectDomain and ProjectFQDomain are the same.
  // This adds a www.<ProjectDomain> route that works equally.
  Condition: 'CreateWWW',
  Type: 'AWS::Route53::RecordSet',
  Properties: {
    HostedZoneName: join([ref('ProjectDomain'), '.']),
    Name: join(['www.', ref('ProjectDomain'), '.']),
    Type: 'A',
    AliasTarget: {
      HostedZoneId: 'Z2FDTNDATAQYW2', // default Cloudfront distro hosted zone
      DNSName: getAtt('CloudFrontDistribution', 'DomainName'),
    },
  },
};
