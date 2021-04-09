const express = require('express')
const { logger, requestTime } = require('./middlewares/index.js')
const { serverRoutes } = require('./routes/index.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(requestTime)
app.use(logger)

app.use(serverRoutes)

app.get('/', (req, res) => {
  console.log({ time: req.requestTime })
  res.send('express')
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
