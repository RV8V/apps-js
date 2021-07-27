const { IO } = require('ramda-fantasy')
const { map, pipe, chain } = require('ramda')

const logIO = log => IO(() => console.log({ log }))

const argumentsIO = IO(() => process.argv)

const logArgumentsCount = argumentsIO
  .map(args => args.length)
  .chain(logIO)
  .runIO()
