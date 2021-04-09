const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.send({ data: 'initial data for users' })
  } catch(err) {
    res.send({ err: err.message })
  }
})

module.exports = router
