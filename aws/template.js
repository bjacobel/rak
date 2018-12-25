const { ref, equals } = require('@mapbox/cloudfriend');

const HostedZone = require('./stack/HostedZone');
const DNSRecord = require('./stack/DNSRecord');
const DNSRecordWWW = require('./stack/DNSRecordWWW');
const CloudFrontDistribution = require('./stack/CloudFrontDistribution');
const S3Bucket = require('./stack/S3Bucket');
const S3BucketPolicy = require('./stack/S3BucketPolicy');
const ValidatedCertificate = require('./stack/ValidatedCertificate');
const config = require('../config');

const template = {
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
    HostedZone,
    S3Bucket,
    S3BucketPolicy,
    ...ValidatedCertificate,
  },
};

module.exports = {
  template: JSON.stringify(template),
  parameters: Object.keys(template.Parameters),
};
