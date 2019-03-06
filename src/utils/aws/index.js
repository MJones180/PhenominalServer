const AWS = require('aws-sdk');

// Create a new S3 connection
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'us-east-1',
  ACL: 'public-read',
  params: {
    Bucket: 'picture-assets',
  },
});

module.exports = {
  s3,
};
