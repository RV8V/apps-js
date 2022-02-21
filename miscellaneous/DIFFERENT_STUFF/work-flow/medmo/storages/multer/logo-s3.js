const {
  bucketLogoAccessKey,
  bucketLogoSecurityKey,
  bucketLogosName,
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

const BUCKET_LOGO_ACCESS_KEY = bucketLogoAccessKey
const BUCKET_LOGO_SECURITY_KEY = bucketLogoSecurityKey
const BUCKET_LOGOS_NAME = bucketLogosName

const LOGO_EXTENSIONS = /jpeg|jpg|png|gif/;

const s3LogoConfig = createS3Config({
  accessKeyId: BUCKET_LOGO_ACCESS_KEY,
  secretAccessKey: BUCKET_LOGO_SECURITY_KEY,
  Bucket: BUCKET_LOGOS_NAME,
  region: BUCKET_REGION
});

const multerS3LogoConfig = createMulterS3Config({
  s3: s3LogoConfig,
  bucket: BUCKET_LOGOS_NAME,
  acl: DEFAULT_BUCKET_ACL,
  createMetadata: createMetadata,
  createKey: createKey
});

const checkLogoFileType = createCheckFileType(LOGO_EXTENSIONS, 'Error: Images Only for logo(jpeg, jpg, png, gif)!');

const uploadToLogoS3 = createUploadToS3({
  multerS3Config: multerS3LogoConfig,
  fileFilter: checkLogoFileType,
});

const downloadLogoByKey = (key, cb) => {
  return s3LogoConfig.getObject({
    Key: key,
    Bucket: BUCKET_LOGOS_NAME
  }, (err, data) => {
    if (err) {
      return cb(new Error(`Error occured while trying to download Logo from S3 bucket`))
    }
    return cb(null, data.Body);
  });
};

module.exports = {
  uploadToLogoS3,
  s3LogoConfig,
  downloadLogoByKey
}
