const { ref, join } = require('cloudfriend');

module.exports = {
  Condition: 'CreateHostedZone',
  Type: 'AWS::Route53::HostedZone',
  Properties: {
    Name: join([ref('ProjectDomain'), '.']),
  },
};
