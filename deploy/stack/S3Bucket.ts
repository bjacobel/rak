const { ref } = require('@mapbox/cloudfriend');

module.exports = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: ref('ProjectFQDomain'),
    AccessControl: 'PublicRead',
    VersioningConfiguration: {
      Status: 'Suspended',
    },
  },
};
