'use strict'

const { parentPort, workerData } = require('worker_threads')
const Process = require('../util/parse')

const processData = async ({ segment, url }) => {
  if (!segment) return
  const $ = await Process.getPage(url)
  const res = []
  for (let i = 0, { length } = segment; i < length; i++) {
    const { category, linkOnPage } = segment[i]
    const dollar = await Process.getPage(linkOnPage)
    const postsList = dollar('.post-link.with-labels ')
    for (let i = 0; i < 5; i++) {
      const title = $(postsList[i]).text().replace(/\s\s+/g, '')
      const page = $(postsList[i]).attr('href')
      res.push({ title, page, category })
    }
  }
  parentPort.postMessage(res)
}

processData(workerData)
