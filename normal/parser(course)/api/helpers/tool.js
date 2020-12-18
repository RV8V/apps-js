'use strict'

const dataset = ['receivedId', 'gottenId', 'companyId', 'currIn', 'currOut', 'stuff', 'key', 'key_']

const workerTask = message => {
  const { task } = message
  const newarr = task.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  const rr_ = (i = 0) => res.map(array => array.map((elem, i) => ({ [dataset[i++]]: elem })))

  const a = []
  for (let i = 0, { length } = res; i < length; i++) {
    a.push( Object.assign(...rr_()[i], {}))
  }
  process.send(a)
}

module.exports = { workerTask }
