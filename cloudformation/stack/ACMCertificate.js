const { ref } = require('cloudfriend');

module.exports = {
  Type: 'AWS::CertificateManager::Certificate',
  Properties: {
    DomainName: ref('ProjectFullDomain'),
    DomainValidationOptions: [
      {
        DomainName: ref('ProjectFullDomain'),
        ValidationDomain: ref('ProjectFullDomain'),
      },
    ],
  },
};
