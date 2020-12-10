'use strict'

const workersCount = 10
const defaultElementsByTask = 1

function chunkArray(arr, elementsByPart, clientsCount) {
  //console.log({ arr }, 'from chunkArray')
  const tasks = []
  var needWorkers = arr.length/elementsByPart
  if (needWorkers <= clientsCount) {}
  else {
    console.log(needWorkers+'-'+elementsByPart)
    while (needWorkers > clientsCount) {
      elementsByPart++
      needWorkers = arr.length/elementsByPart
      console.log(needWorkers+'-'+elementsByPart)
    }
  }
  var i = 0
  while (arr.length > 0) {
    tasks.push(arr.splice(0, elementsByPart))
  }
  return tasks
}

module.exports.chunkArray = chunkArray
