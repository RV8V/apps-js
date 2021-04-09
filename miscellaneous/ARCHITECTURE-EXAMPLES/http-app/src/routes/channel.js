const { Router } = require('express')

const router = new Router()

router.get('/channel/', (req, res) => {
  try {
    res.send({ data: 'initial data for channels' })
  } catch(err) {
    res.send({ err: err.message })
  }
})

module.exports = router
