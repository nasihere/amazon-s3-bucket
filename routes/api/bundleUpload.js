const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
/**
 * BUNDLE JS STORING STARTS
 */
const s3 = new aws.S3({
 accessKeyId: 'AKIA2OKCDYGVHU62WM3D',
 secretAccessKey: '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',
 Bucket: 'ceh-web-component-bucket'
});
/**
 * Single Upload
 */
const bundleJsUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'ceh-web-component-bucket',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 20000000 }, // In bytes: 20000000 bytes = 20 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('JSUpload');
/**
 * Check File Type
 * 
@param file
 * 
@param cb
 * 
@return {*}
 */
function checkFileType( file, cb ){
  // return cb( null, true );
 // Allowed ext
 const filetypes = /js|jsx|text\/javascript/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: JS Only!' );
 }
}
/**
 * 
@route POST api/bundle/js-upload
 * 
@desc Upload post image
 * 
@access public
 */
router.post( '/js-upload', ( req, res ) => {
bundleJsUpload( req, res, ( error ) => {
  // console.log( 'requestOkokok', req.file );
  // console.log( 'error', error );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const jsName = req.file.key;
    const jsLocation = req.file.location;
// Save the file name into database into js model
res.json( {
     image: jsName,
     location: jsLocation
    } );
   }
  }
 });
});
// End of single bundle upload
module.exports = router;
