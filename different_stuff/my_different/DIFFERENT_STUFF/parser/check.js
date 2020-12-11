'use strict'

const da = [ [1,2,3], [4,5,6] ]

const o_ = Object.assign({}, da)
const o = { ...da }

const data = ['index', 'cuurent', 'next']

const dataset = [
  [1, 2, 3],
  [6, 7, 8],
  [0, 10, 11]
]

const rr_ = (i = 0) => dataset.map(array => array.map((elem, i) => ({ [data[i++]]: elem })))

const a = []
for (let i = 0, { length } = dataset; i < length; i++) {
  a.push(Object.assign(...rr_()[i], {}))
}
//console.log({ a })
/*
const qqq = Object.assign(...rr_()[0], {})
const qqq1 = Object.assign(...rr_()[1], {})
const qqq2 = Object.assign(...rr_()[2], {})
*/
//const s = { ...(...rr_()[0]) }
//console.log({ s })

//console.log(rr_())

//console.log({ qqq, qqq1, qqq2 })
/*
const data = [
  { key: 1, value: 2 },
  { key: 2, value: 2 },
]

const d = [
  [1,2,3,4,5,6,7],
  [9,8,7,6,5,4,3]
]

const a = []
for (let i = 0; i < d.length; i++) {
  const o = {}
  const [...args] = d[i]
  o['receivedId'] = args[0]
  o['gottonId'] = args[1]
  o['companyId'] = args[2]
  o['currIn'] = args[3]
  o['currOut'] = args[4]
  o['stuff'] = args[5]
  o['bob'] = args[6]
  a.push(o)
}
//console.log(a)

const dataset = ['receivedId', 'gottonId', 'companyId', 'currIn', 'currOut', 'stuff', 'bob']
const convert = (arr, dataset) => arr
  .reduce((acc, val, i) => (acc[dataset[i]] = val[i][j]), {})

const convert_ = (arr, dataset) => {
  return arr.map(val => {
    const o = {}; let j = 0
    o[dataset[j]] = val[0]
    o[dataset[++j]] = val[1]
    o[dataset[++j]] = val[2]
    o[dataset[++j]] = val[3]
    o[dataset[++j]] = val[4]
    o[dataset[++j]] = val[5]
    o[dataset[++j]] = val[6]
    j = 0
    return o
  })
}

const con = (arr, dataset, o, res, j) => (res = [], arr.forEach(val => (j = 0, o = {},
  o[dataset[j]] = val[0], o[dataset[++j]] = val[1],
  o[dataset[++j]] = val[2], o[dataset[++j]] = val[3],
  o[dataset[++j]] = val[4], o[dataset[++j]] = val[5],
  o[dataset[++j]] = val[6], j = 0, res.push(o))), res
)

//console.log(con(d, dataset))

const c = (arr, dataset, o, res, j) => (res = [], arr.forEach((val, i) => (i = 0,j = 0, o = {},
  o[dataset[j]] = val[i], o[dataset[++i]] = val[j],
  o[dataset[++j]] = val[++i], o[dataset[++j]] = val[++i],
  o[dataset[++j]] = val[++i], o[dataset[++j]] = val[++i],
  o[dataset[++j]] = val[++i], res.push(o))), res
)

console.log({ res: c(d, dataset) })
*/
/*
const a = []
for (let i = 0; i < d.length; i++) {
  const o = {}
  const [...args] = d[i]
  console.log({ args })
  o[Symbol('receivedId')] = args[0]
  o[Symbol('gottonId')] = args[1]
  o[Symbol('companyId')] = args[2]
  o[Symbol('currIn')] = args[3]
  o[Symbol('currOut')] = args[4]
  o[Symbol('stuff')] = args[5]
  o[Symbol('bob')] = args[6]
  a.push(o)
}
*/
/*
const s = [
  '1;2;3;4;5',
  '1;2;3;4;5'
]

for (let i = 0; i < data.length; i++) {
  const { key, value } = data[i]
  const record = {
    "id": key,
    "receivedId": value,
  }


  const record = new Record({
    _id: mongoose.Types.ObjectId(),
    receivedId: key,
    gottonId: value,
    companyId: company,
    currIn:,
    currOut:,
    stuff:,
    bob:
  })
}
*/


const arr = [
  { receivedId : 129, gottonId : 88, companyId : 488, currIn : 1.07987339, currOut : 1, stuff : 12583.83, bob : 0.3771, rob : 1 },
  { receivedId : 129, gottonId : 88, companyId : 580, currIn : 1.0791, currOut : 1, stuff : 53460, bob : 0.182, rob : 1 },
  { receivedId : 129, gottonId : 88, companyId : 433, currIn : 1.087, currOut : 1, stuff : 54922.34, bob : 0.3143, rob : 1 },
  { receivedId: 93, gottonId: 64, companyId: 704, currIn: 1, currOut: 485000, stuff: 2885619.5, bob: 0.45, rob: 1 },
  { receivedId: 93, gottonId: 64, companyId: 607, currIn: 1, currOut: 481887.022, stuff: 6386251, bob: 0.2468, rob: 1 },
  { receivedId: 93, gottonId: 64, companyId: 471, currIn: 1, currOut: 488324.87206619, stuff: 10626008.88, bob: 0.606, rob: 1},
]

const sortagain = arr => {
  const first = arr.sort((o1, o2) => (o1['stuff'] > o2['stuff'] ? -1 : 1))
  const second = first.filter(([ receivedId, gottonId ], index, self) => index === self.findIndex(
    ({ receivedId, gottonId }) => receivedId === receivedId && gottonId === gottonId))
  return second
}

//const first = arr.sort(({ stuff }, { stuff_ }) => stuff > stuff_ ? -1 : 1)


console.log({ second })
