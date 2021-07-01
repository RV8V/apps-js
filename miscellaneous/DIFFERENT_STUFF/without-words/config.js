'use strict'

const passport = require('passport') // passport is oriented on session
const LocalStrategy = require('passport-local').Strategy // LocalStrategy is user and password

const userFake = { id: 1, email: 'testing@gmail.com', password: '123' } // fake user account

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  console.log(`Deserialization: ${id}`)
  const user = userFake.id === id ? userFake : 'not found'
  done(null, user)
})

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
    if (email === userFake.email && password === userFake.password) return done(null, userFake)
    return done(null, false) // we do not pass authentication
  })
)
