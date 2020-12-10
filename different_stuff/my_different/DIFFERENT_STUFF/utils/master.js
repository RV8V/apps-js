'use strict';

const os = require('os')
const cluster = require('cluster')

const cpuCount = os.cpus().length
const workers = []

const Util2 = require('./utils/util2')

const workersCount = 8
const defaultElementsByTask = 10

/*
const tasks = [
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584720491691.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741200229.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741210807.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584741217804.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803132385.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803143172.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803150315.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803156640.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803162902.png',
    '/home/ruslan/Documents/My/DRAFT/images/avatar-1584803168099.png'
  ]
*/

const fs = require('fs')
const data = fs.readdirSync(__dirname+'/uploads')
const tasks = data.map(file => '/home/ruslan/Documents/My/DRAFT/images/' +file)


console.log({ length: tasks.length })






const divide = Util2.chunkArray(tasks, defaultElementsByTask, workersCount)
console.log({ divide })

for (let i = 0; i < cpuCount; i++) {
  const worker = cluster.fork()

  console.log('Started worker:', worker.process.pid)
  workers.push(worker)
}

const results = []

workers.forEach(worker => {

  const task = divide.pop()
  console.log('INSIDE WORKERSFOREACH - SENDING TASKS')
  if (!task) return
  console.log({ workertaskMaster: task })

  worker.send({ task })

  worker.on('exit', code => {
    //console.log('Worker exited:', worker.process.pid, code)
  })

  worker.on('message', message => {
    //console.log('END')
    //console.log('Message from worker', worker.process.pid);
    //console.log(message)
    results.push(message.result)
    if (results.length === cpuCount) {
      process.exit(0)
    }
  })

  setTimeout(() => process.exit(1), 5000)
})
