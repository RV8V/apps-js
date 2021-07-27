const { prop, compose } = require('ramda')
const { Future } = require('ramda-fantasy')
const axios = require('axios')

const url = 'http://api.open-notify.org/iss-now.json'

const getFutureThenCatch = url => Future((reject, resolve) => axios(url)
  .then(res => resolve(res.data))
  .catch(err => reject(err))
)

const getFutureAwaitCatch = url => Future(async (reject, resolve) =>
  resolve(await axios(url).catch(reject))
)

getFutureThenCatch(url)
  .map(prop('iss_position'))
  .fork(
    console.log,
    console.log
  )

getFutureThenCatch(url).fork(
  console.log,
  console.log
)

getFutureAwaitCatch(url).fork(
  console.log,
  console.log
)
