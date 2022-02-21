const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const {
  bucketRegion,
  bucketAcl,
  bucketFileSize,
  localStorageDestination,
  prescriptionExt
} = require('../../config/cfg');

const { v4: uuidv4 } = require('uuid');

const DEFAULT_BUCKET_ACL = bucketAcl;
const DEFAULT_FILE_SIZE = bucketFileSize;
const DEFAULT_LOCAL_STORAGE_FOLDER = localStorageDestination;
const DEFAULT_PRESCRIPTION_EXTENSION = prescriptionExt;

const createS3Config = ({ accessKeyId, secretAccessKey, Bucket, region }) => new AWS.S3({ accessKeyId, secretAccessKey, Bucket, region });

const createDestination = (storageName = DEFAULT_LOCAL_STORAGE_FOLDER) => (req, file, cb) => cb(null, storageName);
const createFileName = (req, file, cb) => cb(null, `${uuidv4()}.${DEFAULT_PRESCRIPTION_EXTENSION}`);
const createMetadata = (req, file, cb) => cb(null, { fieldName: file.fieldname });

const createKey = (req, file, cb) => {
  const [image, ext] = file.mimetype.split('/');
  cb(null, `${uuidv4()}.${ext || DEFAULT_PRESCRIPTION_EXTENSION}`);
}

const setFileFilter = fileFilter => (req, file, cb) => fileFilter(file, cb);
const setLimits = limits => ({ fileSize: limits });

const createCheckFileType = (filetypes, message) => (file, cb) => {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  return cb(new Error(message));
}

const createUploadToS3 = ({ multerS3Config, fileFilter, limits = DEFAULT_FILE_SIZE }) => multer({
  storage: multerS3Config,
  fileFilter: setFileFilter(fileFilter),
  limits: setLimits(limits),
});

const createMulterS3Config = ({ s3, bucket, acl = DEFAULT_BUCKET_ACL, createMetadata, createKey }) => multerS3({
  s3,
  bucket,
  acl,
  metadata: createMetadata,
  key: createKey
});

const uploadReadableStream = (s3, Bucket, Key, stream) => s3.upload({ Bucket, Key, Body: stream }).promise();

module.exports = {
  uploadReadableStream,
  createMulterS3Config,
  createUploadToS3,
  createCheckFileType,
  createDestination,
  createS3Config,
  setLimits,
  setFileFilter,
  createMetadata,
  createKey
}
