import { ref, join } from '@mapbox/cloudfriend';

export default {
  Condition: 'CreateHostedZone',
  Type: 'AWS::Route53::HostedZone',
  Properties: {
    Name: join([ref('ProjectDomain'), '.']),
  },
};
