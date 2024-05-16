const { ref, join } = require('@mapbox/cloudfriend');

module.exports = {
  Condition: 'CreateHostedZone',
  Type: 'AWS::Route53::HostedZone',
  Properties: {
    Name: join([ref('ProjectDomain'), '.']),
  },
};
