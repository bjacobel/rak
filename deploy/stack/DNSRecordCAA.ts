const { ref, join } = require('@mapbox/cloudfriend');

module.exports = {
  Type: 'AWS::Route53::RecordSet',
  Properties: {
    HostedZoneName: join([ref('ProjectDomain'), '.']),
    Name: join([ref('ProjectFQDomain'), '.']),
    Type: 'CAA',
    TTL: '60',
    ResourceRecords: [
      '0 issue "amazon.com"',
      '0 issue "amazontrust.com"',
      '0 issue "awstrust.com"',
      '0 issue "amazonaws.com"',
    ],
  },
};
