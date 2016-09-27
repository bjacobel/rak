const { ref, equals } = require('cloudfriend');
const HostedZone = require('./stack/HostedZone');
const DNSRecordSet = require('./stack/DNSRecordSet');
const CloudFrontDistribution = require('./stack/CloudFrontDistribution');
const ACMCertificate = require('./stack/ACMCertificate');
const S3Bucket = require('./stack/S3Bucket');
const S3BucketPolicy = require('./stack/S3BucketPolicy');

/**
 * This CloudFormation template supports both apps hosted at the root domain (e.g., https://react-redux-boilerplate.com)
 * and apps hosted on a subdomain (what is configured below, https://react-redux-boilerplate.bjacobel.com).
 * Note that setting the ProjectDomain and ProjectFQDomain to the same value will trigger config for the root domain
 * case, and will add extra resources (an additional A record and SAN for www.ProjectDomain).
 * You still need both values even if they are the same.
 */
const params = {
  // Give a common name for your project.
  ProjectName: 'react-redux-boilerplate',

  // Give the root domain that your project will live at.
  ProjectDomain: 'bjacobel.com',

  // If project will live on a subdomain, give the fully qualified domain here. Otherwise use the same value as above.
  ProjectFQDomain: 'react-redux-boilerplate.bjacobel.com',
};

const template = {
  Description: `CloudFormation stack for ${params.ProjectName} project`,
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

module.exports = {
  template: JSON.stringify(template),
  params,
};
