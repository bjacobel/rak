const { ref, equals } = require('cloudfriend');
const HostedZone = require('./stack/HostedZone');
const DNSRecordSet = require('./stack/DNSRecordSet');
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
  },
  Conditions: {
    CreateWWW: equals(ref('ProjectDomain'), ref('ProjectFQDomain')),
  },
  Resources: {
    HostedZone,
    DNSRecordSet,
    CloudFrontDistribution,
    ACMCertificate,
    S3Bucket,
    S3BucketPolicy,
  },
};

module.exports = JSON.stringify(template);
