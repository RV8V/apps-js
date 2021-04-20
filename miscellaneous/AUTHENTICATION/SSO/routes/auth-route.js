const route = require('express').Router()

route.get('/login', (req, res) => {
  res.render('login')
})

route.get('/logout', (req, res) => {
  res.send('logout')
})

route.get('/google', (req, res) => {
  res.send('login in with google')
})

module.exports = route
