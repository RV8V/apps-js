const R = require('ramda')

const upper = s => s.toUpperCase()

const trace = R.curry((tag, x) => (console.log({ tag, x }), x))

/**
 * @Used for"
 * 1. Handling Control Flow
 * 2. Error Handling
 * 3. Asynchronous actions
 * 4. Handling State
 * 5. Side Effects
 */

class Container {
  constructor(x) {
    this.$value = x
  }

  map(f) {
    return Container.of(f(this.$value))
  }

  static of(x) {
    return new Container(x)
  }
}

/**
 * @What do we get if we ask our container to use functions for us?
 * @Let's get an @@@Abstraction of the function application - Functor@@@
 */

const numberInsideContainer = Container.of(3).map(three => three + 2)
const objectInsideContainer = Container.of({ name: '1n' }).map(R.prop('name'))
const containerInsideContainer = Container.of(Container.of('string')).map(c => c.map(upper))

console.log({ numberInsideContainer, objectInsideContainer, containerInsideContainer })

/*******************************************************/

class Maybe {
  constructor(x) {
    this.x = x
  }

  get isNothing() {
    return this.x === undefined || this.x === null
  }

  static of(x) {
    return new Maybe(x)
  }

  map(f) {
    return Maybe.of(this.x && f ? f(this.x) : null)
  }

  join() {
    return this.x
  }
}

const m = Maybe.of(10).map(x => x.prop).map(z => z.toUpperCase())

/*******************************************************/

/** @: map :: Functor f => (a -> b) -> f a -> f b */
const map = R.curry((f, anyFunctor) => anyFunctor.map(f))

/** @Examples */

const street1 = {
  addresses: [{ street: 'str-1', road: 'road-1' }]
}

const street2 = {
  addresses: []
}

const saveHead = xs => Maybe.of(xs[0])

const streetName = R.compose(map(R.prop('street')), saveHead, R.prop('addresses'))

console.log({
  streetName1: streetName(street1),
  streetName2: streetName(street2),
})

/*******************************************************/

/** @: withdraw :: Number -> Account -> Maybr(Account) */
const withdraw = R.curry((amount, { balance }) => {
  return Maybe.of(amount < balance ? { balance: balance - amount } : null)
})

/** @: getOrElse :: a -> Maybe(b) -> a or b */
const getOrElse = R.curry((val, functor) => functor.join() || val)

/** @: updateLedger :: Account -> Account */
const updateLedger = amount => amount

/** @: remiderBalance :: Account -> String */
const remiderBalance = ({ balance }) => `Balance is: ${balance}`

/** @: finishTransaction :: Account -> String */
const finishTransaction = R.compose(remiderBalance, updateLedger)

/** @: get20 :: Account -> Maybe(String) */
const get20 = R.compose(
  // getOrElse('Current balance is below required amount'),
  map(finishTransaction),
  withdraw(20)
)

console.log({
  just: get20({ balance: 200.00 }),
  nothing: get20({ balance: 12 }),
})

/*******************************************************/

/** @: maybe :: b -> (a -> b) -> Maybe a -> b */
const maybe = R.curry((val, fn, maybe) => {
  if (maybe.isNothing) {
    return val
  }
  return fn(val)
})

const maybeShort = R.curry((val, fn, maybe) => maybe.isNothing && val || fn(val))

const getTwenty = R.compose(
  maybeShort('error occured...', finishTransaction),
  trace('after withdraw'),
  withdraw(20)
)

console.log({
  normal: getTwenty({ balance: 100 }),
  error: getTwenty({ balance: 10 })
})

/** @Error Handling */

/**
 * @Left behaves like a teenager, he ignores our attempts to make him work with map.
 * @And Right will work exactly like Container (a.k.a Identity).
 *
 * @@@The power lies in being able to put the error message inside Left
 * @@@We can also use Maybe.Nothing to handle errors in programms, but it will be not informative. Because we can have many errors
 */

class Either {
  constructor(x) {
    this.x = x
  }

  static of(x) {
    return new Right(x)
  }
}

class Left extends Either {
  map(f) {
    return this
  }
}

class Right extends Either {
  map(f) {
    return new Right(f(this.x))
  }
}

const left = x => new Left(x)

console.log({
  Right: Either.of('rain').map(s => s + '-bow'),
  Left: left('rain').map(s => s + '-bow'),
  host: Either.of({ hostname: 'localhost', port: 3000 }).map(R.prop('hostname')),
  rollEyes: left('roll eyes...').map(R.prop('hostname'))
})

/*******************************************************/

const moment = require('moment')

/** @: getAge :: Date -> User -> Either(String, Number) */
const getAge = R.curry((now, user) => {
  const birthDate = moment(user.birthday, 'YYYY-MM-DD')
  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth Date could not be parsed...')
})

console.log({
  right: getAge(moment(), { birthday: '2003-04-12' }),
  left: getAge(moment(), 'January 2002-12')
})

/*******************************************************/

/** @: toString :: Number -> String */
const toString = n => n.toString()

/** @: concat :: String -> String -> String */
const concat = R.curry((s1, s2) => s1.concat(s2))

/** @: fortune :: Number -> String */
const fortune = R.compose(concat('If you survive, you will be '), toString, R.add(1))

/** @: zontar :: User -> Either(String, _) */
const zontar = R.compose(map(fortune), getAge(moment()))

/** @: It is similar to `throwing` errors, only it is carried out calmly, without hysterics. */
/** @: Either expresses '||' on types */

console.log({
  yes: zontar({ birthday: '2003-12-09' }),
  err: zontar({ birthday: 'hello...' }),
  too: zontar({ birthday: 'Janiary 12th' })
})

/*******************************************************/

const id = x => x

/** @: either :: (a -> c) -> (b -> c) -> Either a b -> c */
const either = R.curry((f, g, either) => {
  let result

  if (either.constructor === Left) {
    result = f(this.x)
  }
  if (either.constructor === Right) {
    result = g(this.x)
  }
  return result
})

const zoltar = R.compose(either(id, fortune), trace('constructor'), getAge(moment()));

console.log({
  right: zoltar({ birthday: '2005-12-12' }),
  left: zoltar({ birthday: 'balloons!' }),
})

/*******************************************************/

/** @: Domino effect */

/** @: Global Data in Environment */
const localStorage = {
  key: 'value is not modified'
}

/*******************************************************/

/** @: getFromStorage :: String  -> String */
/**
 * @This function has side effect: its returned result depends on Global Environment(in this case '@localStorage@')
 * @Because someone can change value on this key in localStorage
 * @So that we will get not expected result
 */
 
const getFromStorageBad = key => localStorage[key]

localStorage.key = 'someone changed value in localStorage'

console.log({ mutatedValued1: getFromStorageBad('key') })

/*******************************************************/

/** @: getFromStorage :: String -> _ -> String */
/**
 * @We return new function that returns value using passed key in localStorage.
 * @It is save and has not dependencies like global data(Environment)
 * @Because using new function we made closure which needed data is passed
 */

const getFromStorage = R.curry((localStorage, key) => localStorage[key])(localStorage)

localStorage.key = 'someone changed value in localStorage'

console.log({ mutatedValued2: getFromStorage('key') })

/*******************************************************/

/** @: getFromStorage :: String -> _ -> String */
/**
 * @If you don't put the internals of getFromS in a separate function, its return will depend on the external environment.
 * @We got the return value for the same objects.
 */

const getFromStorageGood = key => () => localStorage[key]
const getValueOnKeyNamedKey = getFromStorageGood('key')

localStorage.key = 'someone changed value in localStorage'

console.log({ mutatedValued3: getValueOnKeyNamedKey() })
