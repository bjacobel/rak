const Stack = require('cloudformer-node');
const { params, template } = require('./template');

const main = () => {
  const stack = new Stack(params.ProjectName);
  stack.apply(template, {
    Parameters: params,
    Tags: {
      Name: params.ProjectName,
    },
  }, console.log);
  console.log(
    `Check on the progress of the stack in the AWS console:
    \rhttps://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filter=active\n`
  );
};

main();
