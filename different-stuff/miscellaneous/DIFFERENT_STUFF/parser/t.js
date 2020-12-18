'use strict'

const fs = require('fs')
const os = require('os')
const cluster = require('cluster')

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  const workers = []

  for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork()
    workers.push(worker)
  }

  const workersCount = 8
  const defaultElementsByTask = 2

  function chunkArray(arr, elementsByPart, clientsCount) {
    const { length } = arr
    const tasks = []
    let needWorkers = length / elementsByPart
    if (needWorkers > clientsCount) {
      console.log(`${needWorkers}-${elementsByPart}`)
      while (needWorkers > clientsCount) {
        elementsByPart++
        needWorkers = length / elementsByPart
        console.log(`${needWorkers}-${elementsByPart}`)
      }
    }
    let i = 0
    while (arr.length > 0) {
      tasks.push(arr.splice(0, elementsByPart))
    }
    return tasks
  }

  const string = fs.readFileSync('./data.dat', 'utf8')
  const arr = string.split('\n')

  const t = [
      '56;63;666;1;2.7783;5501500.82;0.3962;1',
      '56;42;666;1;2.77;6304565.8;0.3962;1',
      '42;6;666;1;1;149215.85;0.3962;1',
      '42;63;666;1.0803;1;5501500.82;0.3962;1',
      '120;42;666;1;67.1242;6304565.8;0.3962;1',
      '88;42;666;1;78.0883;6304565.8;0.3962;1',
      '160;42;666;1;374.8761;6304565.8;0.3962;1',
      '40;42;666;1;76.21;6304565.8;0.3962;1',
      '139;42;666;1;10302.9001;6304565.8;0.3962;1',
      '93;42;666;1;492251.225;6304565.8;0.3962;1',
      '42;88;666;81.7255;1;67743.12;0.3962;1',
      '42;40;666;77.9534;1;9883.92;0.3962;1',
      '42;36;666;85;1;162175.16;0.3962;1',
      '59;63;666;1.5;1;5501500.82;0.3962;1',
      '59;6;666;1.042;1;149215.85;0.3962;1',
      '60;42;666;1;2.75;6304565.8;0.3962;1',
  ]

  const total = arr.length
  const tasks = chunkArray(arr, 2, 8)
  //console.log({ tasks, total })

  let counter = 0

  const results = []
  for (const worker of workers) {
    const task = tasks.pop()
    //console.log({ task, length: task.length })
    if (!task) return
    worker.send({ task })

    worker.on('exit', code => {
      console.log('Worker exited:', worker.process.pid, code)
    })

    worker.on('message', message => {
      counter++
      //console.log('Message from worker', worker.process.pid, ':', message)
      console.log({ results, length: results.length })
      console.log(results.length, '/', total)
      results.push(...message)
      console.log({ length1: results.length })
      console.log({ length3: message.length })
      console.log({ length2: workers.length })

      console.log({ counter })


      if (counter === workers.length) {
        //results.forEach(arr => results.push(...arr))
        console.log({ results }, 'END_________________END')
        process.exit(0)
      }
    })
  }
} else {
  process.on('message', message => {
    const { task } = message
    console.log({ task })

    const newarr = task.map(el => el.split(";").map(el => parseFloat(el)))
    const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
    const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
    //console.log({ res })
    process.send(res)
    //process.exit(0)
  })
}





















/*
for (let i = 0; i < result.length; i++) {
  const data = result[i]
  const newarr = data.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  console.log({ res })
  results.push(...res)
}
console.log({ results })
*/
