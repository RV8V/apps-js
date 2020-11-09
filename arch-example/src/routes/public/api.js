const { Router } = require('express')
const api = require('../../../config/api.json')

const router = Router()

/**
 * @api {get} [dev-] testing.hello.com/api Get API Infoemation
 * @description Getting information from API
 * @apiVersion 1.0.0
 * @apiName version
 * @apiGroup API
 * @apiPermission all
 *
 * @apiSuccessExample success
 *  Http/1.1 200 OK
 *  { data: { version: 1 } }
 */

router.get('/', (req, res) => {
  res.json({
    data: {
      version: api.version
    }
  })
})

module.exports = router
