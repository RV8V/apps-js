const multer = require('multer')

const {
  setLimits,
  createDestination
} = require('./common')

const DEFAULT_FILE_SIZE = bucketFileSize;

const storage = multer.diskStorage({
  destination: createDestination(),
  filename: createFileName
});

const uploadToLocal = multer({
  storage: storage,
  limits: setLimits(DEFAULT_FILE_SIZE),
});

module.exports = {
  uploadToLocal,
  storage
}
