;function delay(ms) {
  return new Promise(function(resolve, reject) {
    global.setTimeout(function() {
      return resolve()
    }, ms)
  })
}

delay(2000).then(function() {
  console.log('\n2 seconds passed\n')
})

var url = 'https://jsonplaceholder.typicode.com/todos'

function _fetch() {
  return delay(2000).then(function() {
    return fetch(url).then(function(res) {
      return res.json()
    })
  })
}

_fetch()
  .then(function(data) {
    console.log({ data })
  })
  .catch(function(err) {
    console.err(err)
  })

async function _fetch_async() {
  try {
    await delay(2000)
    var res = await fetch(url)
    var data = await res.json()
    console.log({ data })
  } catch(err) {
    console.error(err)
  } finally {
    console.log('done')
  }
}

_fetch_async();
