'use strict'

const url = 'mongodb://localhost:27017/database'

module.exports.connectServer = (url, (err, database) => {
  if (err) return process.stderr.write(err.name)
  app.listen(3000)
})

module.exports.connectAuth = (url, (err, database) => {
  if (err) return process.stderr.write(err.name)
  app.listen(4000)
})
