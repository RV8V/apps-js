const jwt = require('jsonwebtoken')

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const [, token] = req.headers.authorization.split(' ')

      if (!token) {
        res.status(401).json({
          message: 'token not provided'
        })
      }

      const user = jwt.verify(token, process.env.JWT_SECRET_KEY)

      let access = false

      user.roles.forEach(role => {
        if (roles.includes(role)) access = true
      })

      if (!access) {
        res.status(401).json({
          message: 'access denied'
        })
      }

      next()
    } catch(err) {

    }
  }
}
