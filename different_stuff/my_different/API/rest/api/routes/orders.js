'use strict'

const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const OrdersControllers = require('../controllers/orders')

router.get('/', checkAuth, OrdersControllers.orders_get_all)
router.post('/', checkAuth, OrdersControllers.orders_create_order)
router.get('/:orderId', checkAuth, OrdersControllers.orders_get_order)
router.delete('/:orderId', checkAuth, OrdersControllers.order_delete_order)

module.exports = router
