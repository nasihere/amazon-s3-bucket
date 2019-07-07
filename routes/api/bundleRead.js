var express = require('express');
var fs = require('fs');
const router = express.Router();


router.get('/js', function(req, res){
    // download the file via aws s3 here
    var fileKey = req.query['fileKey'];
    console.log('Trying to download file', fileKey);
    var AWS = require('aws-sdk');
    AWS.config.update(
      {
        accessKeyId: 'AKIA2OKCDYGVHU62WM3D',
        secretAccessKey: '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',
        region: 'ap-southeast-1'
      }
    );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : 'ceh-web-component-bucket',
        Key    : fileKey,
    };

    res.attachment(fileKey);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
});
// End of single bundle upload
module.exports = router;
