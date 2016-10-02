const { ref, join } = require('cloudfriend');

module.exports = {
  Type: 'AWS::Route53::HostedZone',
  Properties: {
    Name: join([ref('ProjectDomain'), '.']),
  },
};
