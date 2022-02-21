const HttpException = require("../../errors/HttpException");
const { INTERNAL_SERVER } = require('../../errors/errorCodes');
const {
  bucketRxAccessKey,
  bucketRxSecurityKey,
  bucketRxsName,
  bucketRegion,
  bucketAcl,
} = require('../../config/cfg');

const {
  createS3Config,
  createMulterS3Config,
  createCheckFileType,
  createUploadToS3,
  createMetadata,
  createKey
} = require('./common')

const BUCKET_REGION = bucketRegion
const DEFAULT_BUCKET_ACL = bucketAcl;

const BUCKET_RX_ACCESS_KEY = bucketRxAccessKey
const BUCKET_RX_SECURITY_KEY = bucketRxSecurityKey
const BUCKET_RXS_NAME = bucketRxsName

const PRESCRIPTION_EXTENSIONS = /msword|doc|docx|pdf|odt|txt/;

const s3RxConfig = createS3Config({
  accessKeyId: BUCKET_RX_ACCESS_KEY,
  secretAccessKey: BUCKET_RX_SECURITY_KEY,
  Bucket: BUCKET_RXS_NAME,
  region: BUCKET_REGION
});

const multerS3RxConfig = createMulterS3Config({
  s3: s3RxConfig,
  bucket: BUCKET_RXS_NAME,
  acl: DEFAULT_BUCKET_ACL,
  createMetadata: createMetadata,
  createKey: createKey
})

const checkPrescriptionFileType = createCheckFileType(PRESCRIPTION_EXTENSIONS, 'Error: Prescriptions Only(msword, doc, docx, pdf, odt, txt)!');

const uploadToRxS3 = createUploadToS3({
  multerS3Config: multerS3RxConfig,
  fileFilter: checkPrescriptionFileType,
});

const downloadRxByKey = (key, cb) => {
  return s3RxConfig.getObject({
    Key: key,
    Bucket: BUCKET_RXS_NAME
  }, (err, data) => {
    if (err) {
      return cb(new Error(`Error occured while trying to download Rx from S3 bucket`))
    }
    return cb(null, data.Body);
  });
};

const removeRxByKey = (key, cb) => {
  return s3RxConfig.deleteObject({
    Key: key,
    Bucket: BUCKET_RXS_NAME
  }, (err, data) => {
    if (err) {
      return cb(new HttpException({ ...INTERNAL_SERVER, message: `Error occured while trying to download Rx from S3 bucket: ${err.message}` }))
    }
    return cb(null, data.Body);
  });
};

module.exports = {
  uploadToRxS3,
  s3RxConfig,
  downloadRxByKey,
  removeRxByKey
}
