'use strict'

const copy = dataset => {
  return dataset.map(record => {
    record.name = record.name.toUpperCase()
    return record
  })
}

const copyObjectAssing = dataset => {
  return dataset.map(record => {
    return Object.assign({}, record, { name: record.name.toUpperCase() })
  })
}

const copySpread = dataset => {
  return dataset.map(record => {
    return { ...record, name: record.name.toUpperCase() }
  })
}

const dataset = [
  { name: 'jake', age: 20 },
  { name: 'jane', age: 22 },
]

console.log({
  spead: copySpread(dataset),
  assign: copyObjectAssing(dataset),
  copy: copy(dataset)
})
