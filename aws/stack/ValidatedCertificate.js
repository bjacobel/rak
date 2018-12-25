/**
 * ACM certificates can be created via the Cfn AWS::CertificateManager::Certificate type,
 * but they require either email verification (manual, and dumb) or DNS validation.
 * This module sets up the resources needed for a custom CFN type that does DNS validation
 * on an ACM certificate (which requires responding to a creation event) and a hosted zone.
 * It piggybacks off work done by these fine folks: https://github.com/binxio/cfn-certificate-provider
 */

const { ref, join, getAtt, region, sub } = require('@mapbox/cloudfriend');

const config = require('../../config');

module.exports = {
  Certificate: {
    Type: 'Custom::Certificate',
    Properties: {
      DomainName: ref('ProjectFQDomain'),
      SubjectAlternativeNames: [join('.', ['*', ref('ProjectFQDomain')])],
      ValidationMethod: 'DNS',
      ServiceToken: getAtt('CFNCustomProvider', 'Arn'),
    },
  },
  IssuedCertificate: {
    Type: 'Custom::IssuedCertificate',
    Properties: {
      CertificateArn: ref('Certificate'),
      ServiceToken: getAtt('CFNCustomProvider', 'Arn'),
    },
  },
  CertificateDNSRecord: {
    Type: 'Custom::CertificateDNSRecord',
    Properties: {
      CertificateArn: ref('Certificate'),
      DomainName: ref('ProjectFQDomain'),
      ServiceToken: getAtt('CFNCustomProvider', 'Arn'),
    },
  },
  DomainValidationRecord: {
    Type: 'AWS::Route53::RecordSetGroup',
    Properties: {
      HostedZoneName: join([ref('ProjectDomain'), '.']),
      RecordSets: [
        {
          Name: getAtt('CertificateDNSRecord', 'Name'),
          Type: getAtt('CertificateDNSRecord', 'Type'),
          TTL: 60,
          Weight: 1,
          SetIdentifier: ref('Certificate'),
          ResourceRecords: [getAtt('CertificateDNSRecord', 'Value')],
        },
      ],
    },
  },
  LambdaPolicy: {
    Type: 'AWS::IAM::Policy',
    DependsOn: ['LambdaRole'],
    Properties: {
      PolicyName: 'CFNCertificateDomainResourceRecordProvider',
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'acm:RequestCertificate',
              'acm:DescribeCertificate',
              'acm:UpdateCertificateOptions',
              'acm:DeleteCertificate',
            ],
            Resource: ['*'],
          },
          {
            Effect: 'Allow',
            Action: ['lambda:InvokeFunction'],
            Resource: [
              join([
                sub('arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:'), // eslint-disable-line no-template-curly-in-string
                config.ProjectName,
                '-certificate-validator',
              ]),
            ],
          },
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: 'arn:aws:logs:*:*:*',
          },
        ],
      },
      Roles: [ref('LambdaRole')],
    },
  },
  LambdaRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['sts:AssumeRole'],
            Effect: 'Allow',
            Principal: {
              Service: ['lambda.amazonaws.com'],
            },
          },
        ],
      },
    },
  },
  CFNCustomProvider: {
    Type: 'AWS::Lambda::Function',
    DependsOn: ['LambdaPolicy'],
    Properties: {
      Description: 'CFN Certificate Domain Resource Record Provider',
      Code: {
        S3Bucket: join(['binxio-public', '-', region]),
        S3Key: 'lambdas/cfn-certificate-provider-0.2.1.zip',
      },
      FunctionName: join([config.ProjectName, '-certificate-validator']),
      Handler: 'provider.handler',
      MemorySize: 128,
      Role: getAtt('LambdaRole', 'Arn'),
      Runtime: 'python3.6',
      Timeout: 300,
    },
  },
};
