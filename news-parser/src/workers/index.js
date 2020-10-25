'use strict'

const { Worker } = require('worker_threads')
const path = require('path')
const os = require('os')
const fs = require('fs')

const Connect = require('../connection')
const Process = require('../util/parse')
const Util = require('../util/worker')

const workerPath = path.resolve('./worker.js')
const userCPUCount = os.cpus().length

const prepareData = async (url, selector) => {
  let dataset
  try {
    const $ = await Process.getPage(url)
    const refs = Process.getRefs($, url, selector)
    const sorted = Util.sort(refs)
    const dataset = sorted.slice(-5)
    return dataset
  } catch(err) { console.log(err) }
}

const parseDataWithWorkers = async (url, selector) => {
  const dataset = await prepareData(url, selector)
  const segmentSize = Math.ceil(dataset.length / userCPUCount)
  const segments = []

  console.log({ inputLength: dataset.length, workers: userCPUCount, elementsByPart: segmentSize })

  for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
    const start = segmentIndex * segmentSize
    const end = start + segmentSize
    const segment = dataset.slice(start, end)
    segments.push(segment)
  }

  const promises = []
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, { workerData: { segment, url } })
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      })
    })
    promises[i] = promise
  }

  const array = []
  return Promise.all(promises).then(results => {
    for (let i = 0; i < results.length; i++) {
      const arr = results[i]
      array.push(...arr)
    }
    Connect.saveToDatabase(array)
  })
}

parseDataWithWorkers('https://ain.ua/', '.block-title a')
