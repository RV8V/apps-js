require('dotenv').config()

const express = require('express')
const connect = require('./db.js')

const authRouter = require('./routes/auth.router.js')
const userRouter = require('./routes/user.router.js')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

(async () => {
  await connect()
  app.listen(PORT, () => console.log('server on port ' + PORT))
})()
