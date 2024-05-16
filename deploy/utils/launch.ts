import { template, parameters } from '../template';
import config from '../../config';

// Required because cloudformer-node sets up its region config as a import-time side effect (ugh)
process.env.AWS_DEFAULT_REGION = config.Region;
// eslint-disable-next-line import/order, import/first
import Stack from '@bjacobel/cloudformer-node';

export default () => {
  const stack = new Stack(config.ProjectName);
  stack.apply(
    template,
    {
      Parameters: Object.keys(config)
        .filter(x => parameters.includes(x))
        .reduce((prev, curr) => ({ ...prev, [curr]: config[curr] }), {}),
      Tags: {
        Name: config.ProjectName,
      },
      Capabilities: ['CAPABILITY_IAM'],
    },
    result => console.log(result),
  );
  console.log(`Check on the progress of the stack in the AWS console:
    \rhttps://console.aws.amazon.com/cloudformation/home#/stacks?filter=active\n
    \rLeaving this process running will tail CloudFormation stack events to the console as well.\n`);
};
