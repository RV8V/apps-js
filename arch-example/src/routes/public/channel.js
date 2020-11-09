const { Router } = require('express')
const request = require('request')
const jwt = require('jsonwebtoken')
const validate = require('validate.js')
const uuidv4 = require('uuid/v4')

const { limit, offset } = require('../../validators/basic')
const { fields } = require('../../validators/channel')
const models = require('../../models')
const http = require('../../../config/http')

const router = Router()

/**
 * @api {get} [dev-]testing.hello.com/api/v1/channels List of channels
 * @apiDescription getting list of channels one user
 * @apiVersion 1.0.0
 * @apiName channels_list
 * @apiGroup Channels
 * @apiPermission all
 *
 * @apiHeader {String} authorization value of accessToken, gotten from authorization process
 *
 * @apiParam {Number} offset getting data via offset parameter
 * @apiParam {Number} limit getting data via limit parameter
 * @apiParam {Array} fields array of resulted fields in response
 */

router.get('/', async (req, res) => {
  try {
    const validationResults = validate(req.body, {
      limit: limit,
      offset: offset,
      fields: fields
    })

    if (validationResults) {
      res.status(400).json({ errors: validationResults })
    } else {
      let offset = req.body.offset || 0
      let limit = req.body.limit || 10

      let data = jwt.decode(req.get('authorization'))
      if (!data) {
        res.status(401).json({ errors: { backend: ['token not found'] } })
        return
      }

      let result = await Promise.all([
        await models.channel.findAll({
          where: { accountId: data.accountId },
          offset: offset,
          limit: limit
        }),
        new Promise((resolve, reject) => {
          request.post({
            url: http[process.env.NODE_ENV].authInnnerUrl + '/api/v1/check-access',
            body: {
              accessToken: req.get('authentication')
            },
            json: true,
            timeout: http[process.env.NODE_ENV].timeout
          }, (err, res) => {
            err ? reject(err) : resolve(res)
          })
        })
      ])

      let fields = req.body.fields || [
        'accountId',
        'createdAt',
        'name',
        'phone',
        'state',
        'temporary'
      ]

      res.json({
        data: result[0].map(channel => {
          return fields.reduce((object, current) => {
            if (channel[current]) {
              object[current] = channel[current]
            }
            return object
          }, {})
        })
      })
    }
  } catch(err) {
    res.status(400).json({ errors: { backend: ['Can't get list of channels', error] } })
  }
})

module.exports = router
