'use strict'

module.exports.databaseServiceAdd = (refreshToken, callback) => {
  db.get().collection('refreshTokens').insert(refreshToken, (err, refreshToken) => {
    callback(err, refreshToken)
  })
}

module.exports.databaseServiceOne = (token, callback) => {
  db.get().collection('refreshTokens').findOne({ token }, (err, token) => {
    callback(err, token)
  })
}

module.exports.databaseServiceDelete = (token, callback) => {
  db.get().collection('refreshTokens').deleteOne({ token }, (err, refreshToken) => {
    callback(err, refreshToken)
  })
}

module.exports.databaseServiceAddUser = (post, callback) => {
  db.get().collection('posts').insert(post, (err, object) => {
    callback(err, object)
  })
}

module.exports.databaseServiceDeletePost = (post, callback) => {
  const userName = post.userName
  db.get().collection('posts').deleteOne({ userName }, (err, userName) => {
    callback(err, userName)
  })
}
