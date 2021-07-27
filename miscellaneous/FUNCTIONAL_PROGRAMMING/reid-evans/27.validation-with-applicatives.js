const Either = require('ramda-fantasy').Either
const R = require('ramda')

/** @: validation with applicatives functors */

/** @: getLocation :: a -> b -> c */
const getLocation = (city, state) => ({ city, state })

/** @: liftedGetLocation :: f a -> f b -> f c */
const liftedGetLocation = R.lift(getLocation)

/** @: stateFromCity :: String -> Eihter Error String */
const stateFromCity = city => {
  switch (city) {
    case 'city-1': return Either.Right('state-1')
    case 'city-2': return Either.Right('state-2')
    default: return Either.Left({ step: 'stateFromCity', value: city })
  }
}

/** @: locationFromCity :: String -> Either Error Location */
const locationFromCity = city => liftedGetLocation(Either.Right(city), stateFromCity(city))

console.log({
  cityOne: locationFromCity('city-1'),
  cityTwo: locationFromCity('city'),
  cityLast: locationFromCity(),
})
