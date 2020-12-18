const { Router } = require('express')
const request = require('request')
const validate = require('validate.js')
const jwt = require('jsonwebtoken')

const { email, password } = require('../../validators/user')
const models = require('../../models')
const http = require('../../../config/http')

const router = Router();

/**
 * @api {get} [dev-]testing.hello.com/api/v1/users/:guid/password/change - change password
 * @apiDescription changing of passowd
 * @apiVersion 1.0.0
 * @apiName change-password
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiHeader {String} authorization value gotten from process of authorization
 *
 * @apiParam {String} email Email user
 * @apiParam {String} password gotten user password
 */

 modele.exports = route
