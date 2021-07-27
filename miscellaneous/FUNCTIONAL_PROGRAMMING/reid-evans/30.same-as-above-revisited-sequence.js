const { curry, lift, chain, map, compose, sequence, of } = require('ramda')
const { Future, Maybe } = require('ramda-fantasy')

const stringify = v => JSON.stringify(v)

const homePage = arr => stringify(arr)

const currentUserFuture = Future.of({ id: 1 })
const userFuture = id => Future.of({ id: id, handle: 'async parallel operations with applicative functors revisited' })

const getUserFuture = currentUserFuture.chain(user => userFuture(user.id))

const postsFuture = Future.of([
  { id: 12, title: 'title for post-12' }
])

/** @: futures :: [Futures] */
const futures = [getUserFuture, postsFuture]

/** @: Future can be applicative */
/** @: Array can be traversable */

/** @: sequence :: (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a) */
/** @: sequenceFutureArray :: (a -> Future a) -> [Future a] -> Future [a] */

/** @: In JS Promise.all - it takes a list of Promises and return a Promise of list */
/** @Promise.all [Promise-a, Promise-b...] -> Promise [a, b...] */

/** @: invertFuture :: [Future-a, Future-b...] -> Future [a, b...] */
const invertFuture = sequence(Future.of)

let result;

invertFuture(futures).fork(
  err => console.log({ err }),
  success => result = homePage(success)
)

console.log({ result })

/*************************************/

const maybeOfArray = sequence(Maybe.of, [Maybe.Just(1), Maybe.Just(2)])
const arrayOfMaybe = sequence(Array.of, Maybe.Just([1, 2, 3]))

console.log({ maybeOfArray, arrayOfMaybe })
