

export default (req, res) => {

    // AWS.config.update({ region: 'asia-pacific' });

    // s3 = new AWS.s3({ apiVersion: '2006-03-01' });

    // s3.listBuckets(function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data.Buckets);
    //     }
    // });

    var AWS = require('aws-sdk');

    // Set the region 
    AWS.config.update({ region: 'ap-south-1' });

    // Create S3 service object
    var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    // Call S3 to list the buckets
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Buckets);
        }
    });

}