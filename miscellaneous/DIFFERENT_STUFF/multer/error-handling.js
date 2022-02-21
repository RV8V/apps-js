const multer = require('multer');

const UPLOAD_SINGLE = 'single';
const UPLOAD_MANY = 'array';

const multerHandlers = {
  [UPLOAD_MANY]: (multerInst, fileName, maxAmount) => multerInst.array(fileName, maxAmount),
  [UPLOAD_SINGLE]: (multerInst, fileName, maxAmount) => multerInst.single(fileName),
}

const multerErrorHandling = (multerInst, fileName, maxAmount) => (req, res, next) => {
  return multerInst.array(fileName, maxAmount)(req, res, err => {
    if (err instanceof multer.MulterError) {
      const { name: type, message, code } = err
      next({ type, message, data: { message, code } });
    }
    next()
  })
}

const multerErrorHandlingManySingle = (multerInst, method, fileName, maxAmount) => (req, res, next) => {
  if (![UPLOAD_SINGLE, UPLOAD_MANY].includes(method)) {
    next({ message: 'Provide method .single or .array for uploading' })
  }
  return multerHandlers[method](multerInst, fileName, maxAmount)(req, res, err => {
    if (err instanceof multer.MulterError) {
      const { name: type, message, code } = err
      next({ type, message, data: { message, code } });
    }
    next()
  })
}

module.exports = multerErrorHandling;
