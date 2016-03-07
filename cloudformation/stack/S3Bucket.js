const { ref } = require('cloudfriend');

module.exports = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: ref('ProjectFullDomain'),
    WebsiteConfiguration: {
      IndexDocument: 'index.html',
      ErrorDocument: 'error.html',
    },
    AccessControl: 'PublicRead',
    VersioningConfiguration: {
      Status: 'Suspended',
    },
  },
};
