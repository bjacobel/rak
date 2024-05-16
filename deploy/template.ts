import { ref, equals } from '@mapbox/cloudfriend';

import HostedZone from './stack/HostedZone';
import DNSRecord from './stack/DNSRecord';
import DNSRecordWWW from './stack/DNSRecordWWW';
import DNSRecordCAA from './stack/DNSRecordCAA';
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
