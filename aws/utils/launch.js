const Stack = require('@bjacobel/cloudformer-node');

const { template, parameters } = require('../template');
const config = require('../../config');

module.exports = () => {
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
