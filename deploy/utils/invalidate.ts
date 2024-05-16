import { CloudFrontClient, ListDistributionsCommand, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

import { getErrorMessage } from './errors';
import config from '../../config';

export default async () => {
  // Invalidate objects in the CloudFront distro associated with this project.
  const cloudfront = new CloudFrontClient({
    region: config.Region,
  });
  try {
    const { DistributionList } = await cloudfront.send(new ListDistributionsCommand({}));
    const distro = DistributionList?.Items?.find(x => x?.Aliases?.Items?.includes(config.ProjectFQDomain));
    if (distro) {
      const { Invalidation } = await cloudfront.send(
        new CreateInvalidationCommand({
          DistributionId: distro.Id,
          InvalidationBatch: {
            CallerReference: `${Date.now()}`,
            Paths: {
              Quantity: process.argv.slice(3).length,
              Items: [...process.argv.slice(3)],
            },
          },
        }),
      );
      if (Invalidation) {
        console.log(`Created invalidation request with id: ${Invalidation.Id}`);
      } else {
        throw new Error('Invalidation request failed');
      }
    } else {
      throw new Error('No distribution matching ProjectFQDomain found');
    }
  } catch (e: unknown) {
    console.error(`Error: ${getErrorMessage(e)}\nTry invalidaing the distribution through the AWS console.`);
  }
};
