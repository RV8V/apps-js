'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initializePassport = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (!user) return done(null, false, { message: `No user with that email: ${email}` })
    try {
      if (await bcrypt.compare(password, user.password)) return done(null, user)
      return done(null, false, { message: `Password incorrect: ${user.password}` })
    } catch(error) { return done(error) }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)) )
}

module.exports = initializePassport
