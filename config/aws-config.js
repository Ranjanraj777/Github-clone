const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

const s3 = new AWS.S3();
const S3_BUCKET = "gitbucketdemo";

module.exports = { s3, S3_BUCKET };