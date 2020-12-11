'use strict'

const workerTask = message => {
  const { task } = message
  console.log({ task })

  const newarr = task.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  //console.log({ res })
  process.send(res)
  //process.exit(0)
}

module.exports = { workerTask }




















/*
process.on('message', message => {
  const { task } = message
  console.log({ task })

  const newarr = task.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  //console.log({ res })
  process.send(res)
  process.exit(0)
})
*/
