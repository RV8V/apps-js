const Either = require('ramda-fantasy').Either
const R = require('ramda')

const upper = s => s.toUpperCase()

const getLocation = (city, state) => city && state ? Either.Right({ city, state }) : Either.Left('city and state must be provided')

const stateIsIn = location => location.state === 'in' ? Either.Right(location) : Either.Left('state must be in')

const capitalizeState = location => Object.assign({}, location, { state: upper(location.state) })

const processLocation = R.compose(
  R.map(capitalizeState),
  R.chain(stateIsIn),
  getLocation,
)

console.log({
  success: processLocation('1c', 'in'),
  err: processLocation('1c', 'ni'),
  errToo: processLocation()
})
