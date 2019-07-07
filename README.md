# Using Amazon S3 Buckets

1. `npm i`

2. cd client
`npm i`



1. `node server.js` (s3 Server)
2. `yarn client` (React)




S3 Bucket Policy

{
    "Version": "2012-10-17",
    "Id": "Policy1488494182833",
    "Statement": [
        {
            "Sid": "Stmt1488493308547",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::717935067562:user/user-web-component"
            },
            "Action": [
                "s3:ListBucket",
                "s3:ListBucketVersions",
                "s3:GetBucketLocation",
                "s3:Get*",
                "s3:Put*"
            ],
            "Resource": "arn:aws:s3:::web-component-bucket"
        }
    ]
}

IAM User Policy
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
# amazon-s3-bucket

# Ref
https://medium.com/@imranhsayed/file-or-image-uploads-on-amazon-web-services-aws-using-react-node-and-express-js-aws-sdk-252742286162

https://medium.com/@imranhsayed/how-to-create-a-user-and-bucket-amazon-web-services-aws-40631416e65

