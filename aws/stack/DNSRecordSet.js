const { ref, getAtt, join } = require('cloudfriend');
const cfif = require('cloudfriend').if;  // this is a very weird design choice

module.exports = {
  Type: 'AWS::Route53::RecordSetGroup',
  Properties: {
    HostedZoneId: cfif('CreateHostedZone', ref('HostedZone'), ref('ExistingHostedZone')),
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
