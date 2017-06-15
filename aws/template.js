const { ref, equals } = require('@mapbox/cloudfriend');

const HostedZone = require('./stack/HostedZone');
const DNSRecord = require('./stack/DNSRecord');
const DNSRecordWWW = require('./stack/DNSRecordWWW');
const CloudFrontDistribution = require('./stack/CloudFrontDistribution');
const ACMCertificate = require('./stack/ACMCertificate');
const S3Bucket = require('./stack/S3Bucket');
const S3BucketPolicy = require('./stack/S3BucketPolicy');
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
    ACMCertificate,
    CloudFrontDistribution,
    DNSRecord,
    DNSRecordWWW,
    HostedZone,
    S3Bucket,
    S3BucketPolicy,
  },
};

module.exports = JSON.stringify(template);
