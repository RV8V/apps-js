const { Router } = require('express')
const api = require('../../config/api.json')

const router = new Router()

router.get('/', (req, res) => {
  res.json({
    data: {
      version: api.version
    }
  })
})

module.exports = router
