import { Capability } from '@aws-sdk/client-cloudformation';
import { ref, equals } from '@mapbox/cloudfriend';

import HostedZone from './stack/HostedZone';
import DNSRecord from './stack/DNSRecord';
import DNSRecordWWW from './stack/DNSRecordWWW';
import DNSRecordCAA from './stack/DNSRecordCAA';
import OriginAccessControl from './stack/OriginAccessControl';
import CloudFrontDistribution from './stack/CloudFrontDistribution';
import S3Bucket from './stack/S3Bucket';
import S3BucketPolicy from './stack/S3BucketPolicy';
import ValidatedCertificate from './stack/ValidatedCertificate';
import config from '../config';

const tpl = {
  Description: `CloudFormation stack for ${config.ProjectName} project`,
  AWSTemplateFormatVersion: '2010-09-09',
  Parameters: {
    ProjectName: {
      Type: 'String',
    },
    ProjectDomain: {
      Type: 'String',
    },
    ProjectFQDomain: {
      Type: 'String',
    },
    ExistingHostedZone: {
      Type: 'String',
    },
  },
  Conditions: {
    CreateWWW: equals(ref('ProjectDomain'), ref('ProjectFQDomain')),
    CreateHostedZone: equals(ref('ExistingHostedZone'), 'false'),
  },
  Resources: {
    OriginAccessControl,
    CloudFrontDistribution,
    DNSRecord,
    DNSRecordWWW,
    DNSRecordCAA,
    HostedZone,
    S3Bucket,
    S3BucketPolicy,
    ...ValidatedCertificate,
  },
};

export const template = JSON.stringify(tpl);
export const parameters = Object.keys(tpl.Parameters);

export const StackDefinition = {
  StackName: config.ProjectName,
  TemplateBody: template,
  Parameters: (Object.entries(config) as Array<[keyof typeof config, string]>)
    .filter(([key]) => parameters.includes(key))
    .map(([key, value]) => ({ ParameterKey: key, ParameterValue: value })),
  Tags: [
    {
      Key: 'Name',
      Value: config.ProjectName,
    },
  ],
  Capabilities: ['CAPABILITY_IAM'] as Capability[],
};
