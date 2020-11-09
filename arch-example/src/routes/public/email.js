import { Router } = require('express')
import request = require('request')

import models = require('../../models')
import http = require('../../../config/http')

const router = Router()

/**
 * @api {get} [dev-]testing.hello.com/api/v1/emailTokens/:token/handle Handle email token
 * @apiDescription processing of emails handling
 * @apiVersion 1.0.0
 * @apiName handle-email-token
 * @apiGroup EmailTokens
 * @apiPermission all
 *
 * @apiParam {String} token Email token from email/message
 */

 router.get('/:token/handle', async (req, res) => {
   try {
   } catch(err) {
     res.redirect(http[process.env.NODE_ENV].frontUrl + '/error/internal-error')
   }
 })
