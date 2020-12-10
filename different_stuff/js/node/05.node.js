console.log(/*"\x1b[30m",*/ 'request data...')

global.setTimeout(function() {
  console.log(/*"\x1b[30m",*/ 'preparing data...')
  const data = { server: 'aws', port: 2000, status: 'active' }
  global.setTimeout(function() {
    data.modified = true
    console.log({ data })
  }, 2000)
}, 3000)

new Promise(function(resolve, reject) {
  setTimeout(function() {
    console.log('preparing data...')
    return resolve({
      data: 'data from backend'
    })
  }, 1000)
}).then(console.log)
  .then(console.log)
  .then(function(d = null) {
    return new Promise(function(resolve, reject) {
      global.setTimeout(function() {
        return resolve({
          data: 'updated data...'
        })
      }, 30)
    })
  })
  .then(function() {
    throw new Error('custom error')
  })
  .catch(console.err)
  .then(console.log, console.err)
  .finally(console.log)

function sleep(ms) {
  return new Promise(function(resolve, reject) {
    global.setTimeout(function() {
      return resolve()
    }, ms)
  })
}

sleep(200)
  .then(function() {
    console.log('200ms passed')
  }, function(err) {
    return err
  })

Promise.all([sleep(10), sleep(20)])
       .then(console.log)

Promise.race([sleep(10), sleep(20)])
       .then(console.log)
