const HttpException = require("../../errors/HttpException");
const { INTERNAL_SERVER } = require('../../errors/errorCodes');

const {
  bucketNoteAccessKey,
  bucketNoteSecurityKey,
  bucketNotesName,
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

const BUCKET_NOTE_ACCESS_KEY = bucketNoteAccessKey
const BUCKET_NOTE_SECURITY_KEY = bucketNoteSecurityKey
const BUCKET_NOTES_NAME = bucketNotesName

const NOTE_EXTENSIONS = /jpeg|jpg|png|gif/;

const s3NoteConfig = createS3Config({
  accessKeyId: BUCKET_NOTE_ACCESS_KEY,
  secretAccessKey: BUCKET_NOTE_SECURITY_KEY,
  Bucket: BUCKET_NOTES_NAME,
  region: BUCKET_REGION
});

const multerS3NoteConfig = createMulterS3Config({
  s3: s3NoteConfig,
  bucket: BUCKET_NOTES_NAME,
  acl: DEFAULT_BUCKET_ACL,
  createMetadata: createMetadata,
  createKey: createKey
});

const checkNoteFileType = createCheckFileType(NOTE_EXTENSIONS, 'Error: Images Only for notes(jpeg, jpg, png, gif)!');

const uploadToNoteS3 = createUploadToS3({
  multerS3Config: multerS3NoteConfig,
  fileFilter: checkNoteFileType,
});

const downloadNoteByKey = (key, cb) => {
  return s3NoteConfig.getObject({
    Key: key,
    Bucket: BUCKET_NOTES_NAME
  }, (err, data) => {
    if (err) {
      return cb(new Error(`Error occured while trying to download Note from S3 bucket`))
    }
    return cb(null, data.Body);
  });
};

const removeNoteByKey = (key, cb) => {
  return s3NoteConfig.deleteObject({
    Key: key,
    Bucket: BUCKET_NOTES_NAME
  }, (err, data) => {
    if (err) {
      return cb(new HttpException({ ...INTERNAL_SERVER, message: `Error occured while trying to download Note from S3 bucket: ${err.message}` }))
    }
    return cb(null, data.Body);
  });
};

module.exports = {
  uploadToNoteS3,
  s3NoteConfig,
  downloadNoteByKey,
  removeNoteByKey
}
