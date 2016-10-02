const { ref, join } = require('cloudfriend');

module.exports = {
  Type: 'AWS::CertificateManager::Certificate',
  Properties: {
    DomainName: ref('ProjectFQDomain'),
    SubjectAlternativeNames: [
      join('.', ['*', ref('ProjectFQDomain')]),
    ],
    DomainValidationOptions: [
      {
        DomainName: ref('ProjectFQDomain'),
        ValidationDomain: ref('ProjectFQDomain'),
      },
    ],
  },
};
