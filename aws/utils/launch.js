const Stack = require('@bjacobel/cloudformer-node');

const template = require('../template');
const config = require('../../config');

module.exports = () => {
  const stack = new Stack(config.ProjectName);
  stack.apply(
    template,
    {
      Parameters: config,
      Tags: {
        Name: config.ProjectName,
      },
    },
    console.log
  );
  console.log(`Check on the progress of the stack in the AWS console:
    \rhttps://console.aws.amazon.com/cloudformation/home#/stacks?filter=active\n
    \rLeaving this process running will tail CloudFormation stack events to the console as well.\n`);
};
