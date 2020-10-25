'use strict'

module.exports.chunkArray = (arr, elementsByPart, clientsCount) => {
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

module.exports.sort = arr =>
  arr.sort((a, b) => (a['category'] > b['category'] ? -1 : 1))
  .filter(
    (thing, index, self) => index === self.findIndex(
      t =>  t['category'] === thing['category']
    )
  )
