import {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand,
  UpdateStackCommand,
} from '@aws-sdk/client-cloudformation';

import { StackDefinition } from '../template';
import config from '../../config';

export default async () => {
  const client = new CloudFormationClient(config);
  const describeCommand = new DescribeStacksCommand({
    StackName: config.ProjectName,
  });
  let command: CreateStackCommand | UpdateStackCommand;
  try {
    await client.send(describeCommand);
    command = new UpdateStackCommand(StackDefinition);
  } catch (e) {
    if ((e as Error).name !== 'ValidationError') {
      command = new CreateStackCommand(StackDefinition);
    }
  }
  try {
    const response = await client.send(command!);
    console.log(
      `View your launch results:
    \rhttps://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/stackinfo?stackId=${response.StackId}`,
    );
  } catch (e) {
    console.error('Error launching stack:', e);
  }
};
