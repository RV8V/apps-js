const R = require('ramda')

/**
 * @R.evolve - two structures object of data and object of functions with correspondent fields in them
 */

R.bind(console.log, console)({
  1: R.evolve(
    { name: R.trim, nested: { value: R.add(2) } },
    { name: '  name', nested: { value: 1 } },
  )
})
