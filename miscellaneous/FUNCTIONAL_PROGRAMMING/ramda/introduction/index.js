const R = require('ramda')
const fs = require('fs')

const read = path => fs.readFileSync(path, { encoding: 'utf8' })
const log = console.log

const readConverge = R.pipe(
  R.converge(R.concat, [
    () => 'first ',
    () => 'second'
  ])
)

R.pipe(
  R.map(readConverge),
  log
)(' ')

R.pipe(
  R.map(read),
  R.map(R.split('\n')),
  R.map(R.dropLast(1)),
  log
)(['./introduction/btc.csv', './introduction/eth.csv']);

R.pipe(
  R.map(
    R.pipe(
      read,
      R.split('\n'),
      R.dropLast(1),
    )
  ),
  log
)(['./introduction/btc.csv', './introduction/eth.csv'])
