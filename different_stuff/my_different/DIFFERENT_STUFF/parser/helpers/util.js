'use strict'

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

module.exports.chunkArray = chunkArray
