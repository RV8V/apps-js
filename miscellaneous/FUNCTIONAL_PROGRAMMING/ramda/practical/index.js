const R = require('ramda')
const fs = require('fs')

const ENCODING = 'utf-8'
const SEPARATOR_N = '\n'
const SEPARATOR_T = '\t'
const LAST_ELEMENT = 1
const COUNT_ELEMENTS = 2

const readFile = path => fs.readFileSync(path, { encoding: ENCODING })

R.pipe(
  R.map(readFile),
  R.map(R.split(SEPARATOR_N)),
  R.map(R.dropLast(LAST_ELEMENT)),
  R.map(R.map(R.split(SEPARATOR_T))),
  R.map(R.map(R.take(COUNT_ELEMENTS))),
  console.log
)(['./file.txt', './file-next.txt'])
