'use strict';
/*
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) { masterProcess() }
else { childProcess() }

function masterProcess() {
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`)
    cluster.fork()
  }
  process.exit(0)
}

function childProcess() {
   console.log(`Worker ${process.pid} started and finished`)
   process.exit(0)
}

//=============================================

const cluster = require('cluster')
const numCPUs = require('os').cpus().length
let workers = []

if (cluster.isMaster) { masterProcess() }
else { childProcess(); console.log('\n') }

function masterProcess() {
  process.nextTick(() => console.log(`Master process ${process.pid} is running`))
  for (let i = 0; i < 2; i++) { process.nextTick(() => console.log
    (`Forking process number ${i}`)); workers.push(worker = cluster.fork()) }
  worker.on('message', message => console.log('+++ '+`Master process ${process.pid} receives message: '${JSON.stringify(message)}' to worker process ${worker.process.pid}`))
  setTimeout(() => workers.forEach(worker => { console.log(`Master process ${process.pid} sends message to worker ${worker.process.pid}`);
    worker.send({message: `Message from master process ${process.pid}`}) }), 0);
  process.nextTick(() => process.exit(0))
}

function childProcess() {
  process.nextTick(() => console.log(`Forked process ${process.pid} started`))
  process.on('message', message => console.log('--- ',`Worker process ${process.pid} receives message: '${JSON.stringify(message)}' from master process`))
  process.nextTick(() => console.log(`Forked process sends message to master`))
  process.send({message: `Message from forked process ${process.pid}`})
  process.nextTick(() => console.log(`Forked process is fineshed`))
  process.nextTick(() => process.exit(0))
}

setTimeout(() => process.exit(), 2000)
*/

// process.stdin as stream
/*
process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  process.stdout.write(`${chunk}\n`)
  if (!chunk) {
    process.stdout.write(`data : ${chunk}`)
  }
})
process.stdin.on('end', () => {
  process.stdout.write('end')
})

*/

/*
process.on('exit', exitCode => {
  console.log(`About to exit with code: ${exitCode}`)
})

process.on('exit', exitCode => {
  setTimeout(() => {
    console.log('this will not run')
  }, 0)
})

process.exit()
*/

process.nextTick(() => console.log('process.nextTick'))
setTimeout(() => console.log('done'), 0)
process.on('exit', exitCode => console.log({ exitCode }))
process.exit()
