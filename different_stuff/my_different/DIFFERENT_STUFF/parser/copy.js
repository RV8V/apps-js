'use strict'

const os = require('os')
const cluster = require('cluster')

const cpuCount = os.cpus().length
const workers = []

const workersCount = 8
const defaultElementsByTask = 5

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

const tasks = [
    '56;63;666;1;2.7783;5501500.82;0.3962;1',
    '56;42;666;1;2.77;6304565.8;0.3962;1',
    '42;6;666;1;1;149215.85;0.3962;1',
    '42;63;666;1.0803;1;5501500.82;0.3962;1',
    '120;42;666;1;67.1242;6304565.8;0.3962;1',
    '88;42;666;1;78.0883;6304565.8;0.3962;1',
    '160;42;666;1;374.8761;6304565.8;0.3962;1',
    '40;42;666;1;76.21;6304565.8;0.3962;1',
    '139;42;666;1;10302.9001;6304565.8;0.3962;1',
    '93;42;666;1;492251.225;6304565.8;0.3962;1',
    '42;88;666;81.7255;1;67743.12;0.3962;1',
    '42;40;666;77.9534;1;9883.92;0.3962;1',
    '42;36;666;85;1;162175.16;0.3962;1',
    '59;63;666;1.5;1;5501500.82;0.3962;1',
    '59;6;666;1.042;1;149215.85;0.3962;1',
    '60;42;666;1;2.75;6304565.8;0.3962;1',
]

const result = chunkArray(tasks, 5, 8)
const d = []

for (let i = 0; i < result.length; i++) {
  const data = result[i]
  const newarr = data.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  console.log({ res })
  d.push(...res)
}
console.log({ d })
