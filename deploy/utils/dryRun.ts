import { CloudFormationClient, CreateChangeSetCommand } from '@aws-sdk/client-cloudformation';

import { StackDefinition } from '../template';
import config from '../../config';

export default async () => {
  const client = new CloudFormationClient(config);
  const command = new CreateChangeSetCommand({
    ChangeSetName: `dry-run-${Date.now()}`,
    ...StackDefinition,
  });
  try {
    const response = await client.send(command);
    console.log(
      `View your dry-run results:
    \rhttps://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/changesets/changes?stackId=${response.StackId}&changeSetId=${response.Id}`,
    );
  } catch (e) {
    console.error('Error creating change set:', e);
  }
};
