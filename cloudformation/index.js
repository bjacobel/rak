const HostedZone = require('./stack/HostedZone');
const DNSRecordSet = require('./stack/DNSRecordSet');
const CloudFrontDistribution = require('./stack/CloudFrontDistribution');
const ACMCertificate = require('./stack/ACMCertificate');
const S3Bucket = require('./stack/S3Bucket');
const S3BucketPolicy = require('./stack/S3BucketPolicy');

const template = {
  Description: 'CloudFormation stack for project set up with react-redux-boilerplate',
  AWSTemplateFormatVersion: '2010-09-09',
  Parameters: {
    ProjectName: {
      Type: 'String',
      Default: 'react-redux-boilerplate',
    },
    ProjectDomain: {
      Type: 'String',
      Default: 'bjacobel.com',
    },
    ProjectFullDomain: {
      Type: 'String',
      Default: 'react-redux-boilerplate.bjacobel.com',
    },
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

console.log(JSON.stringify(template, null, 2));
