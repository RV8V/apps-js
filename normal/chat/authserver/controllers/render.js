'use strict'

const express = require('express')
 
exports.register = (req, res) => {
  res.render('register.ejs')
}

exports.login = (req, res) => {
  res.render('login.ejs')
}

exports.makePost = (req, res) => {
  res.render('post.ejs')
}
