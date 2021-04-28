const Router = require('express').Router
const check = require('express-validator').check

const AuthController = require('../controllers/auth.controller.js')

const router = new Router()
const authController = new AuthController()

router.post('/register', [
  check('username', 'username should not be empty').notEmpty(),
  check('password', 'password should be valid').isLength({ min: 4, max: 255 }),
], authController.register)

router.post('/login', authController.login)

module.exports = router
