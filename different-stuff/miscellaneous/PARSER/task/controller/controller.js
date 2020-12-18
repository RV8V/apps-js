exports.processPost = (req, res, next) => {
  const files = req.files
  if (files) {
    res.send('Files uploaded')
    process.exit(0)
  }
  const error = new Error('Please upload a file')
  error.httpStatusCode = 404
  return next(error)
}
