const Router = require('express').Router

const UserController = require('../controllers/user.controller.js')

const router = new Router()
const userController = new UserController()

const authMiddleware = require('../middlewares/auth.middleware.js')
const roleMiddleware = require('../middlewares/role.middleware.js')
const loggerMiddleware = require('../middlewares/logger.middleware.js')

router.get('/', loggerMiddleware, authMiddleware, roleMiddleware(['user']), userController.getAllUsers)

module.exports = router
