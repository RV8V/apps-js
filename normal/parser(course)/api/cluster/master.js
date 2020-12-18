'use strict'

const fs = require('fs')
const os = require('os')
const cluster = require('cluster')

const Helpers = require('../helpers/util')

const cpuCount = os.cpus().length
const workers = []

for (let i = 0; i < cpuCount; i++) {
  const worker = cluster.fork()
  workers.push(worker)
}

const start = string => {
  const arr = string.split('\n')
  const total = arr.length
  const tasks = Helpers.chunkArray(arr, 2, 8)
  let counter = 0

  let results = []
  for (const worker of workers) {
    const task = tasks.pop()
    if (!task) return
    worker.send({ task })

    worker.on('exit', code => {
      console.log('Worker exited:', worker.process.pid, code)
    })

    worker.on('message', message => {
      counter++
      results.push(...message)
      console.log(results.length, '/', total)
      if (counter === workers.length) {
        const sorted = Helpers.sortAgain(results)
        console.log({ total, unique: sorted.length })
        process.emit('sorted', sorted)
      }
    })
  }
}

module.exports = { start }
