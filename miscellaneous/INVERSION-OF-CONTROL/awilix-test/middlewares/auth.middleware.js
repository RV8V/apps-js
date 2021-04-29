const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
      res.status(401).json({
        message: 'user not registrated'
      })
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decodedUser
    next()
  } catch(err) {
    res.status(401).json({
      message: 'user not registrated'
    })
  }
}
