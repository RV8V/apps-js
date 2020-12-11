'use strict';

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
  const results = []
  for (const worker of workers) {
    const task = tasks.pop()
    if (!task) return
    worker.send({ task })

    worker.on('exit', code => {
      console.log('Worker exited:', worker.process.pid, code)
    })

    worker.on('message', message => {

      counter++
      //console.log('Message from worker', worker.process.pid, ':', message)
      //console.log({ results, length: results.length })
      console.log(results.length, '/', total)
      console.log({ workers: workers.length })
      results.push(...message)
      if (counter === workers.length) {
        //results.forEach(arr => results.push(...arr))
        //console.log({ results }, 'END_________________END')
        console.log('RESULT')

        //process.exit(0)
        process.emit('sorted', results)
        //return results
      }
    })
  }
}

module.exports = { start }
