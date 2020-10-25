'use strict'

exports.register = (req, res) => {
  res.render('register.ejs')
}

exports.login = (req, res) => {
  res.render('login.ejs')
}
