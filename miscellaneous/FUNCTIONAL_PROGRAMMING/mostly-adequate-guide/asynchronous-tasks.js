/**
 * @Callbacks are spiral staircase to hell
 * @There is a much more useful tool for composing asynchronous code.
 * @Data.Task (before – Data.Future. Folktale
 *
 * @: map(Task-Future) analog of then(Promise)
 */

const Task = require('data.task')
const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe

const fs = require('fs')

const head = xs => xs[0]
const split = R.curry((separator, s) => s.split(separator))
const map = R.curry((f, functor) => functor.map(f))
const add = R.curry((a, b) => a + b)
const safeProp = R.curry((prop, obj) => Maybe.of(obj[prop]))
const trace = R.curry((tag, x) => (console.log({ tag, x }), x))

const readFile = filename => new Task((reject, resolve) => {
  fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data))
})

readFile('compose')
  .map(split('\n'))
  .map(head)
  .fork(
    err => console.log({ err }),
    data => console.log({ data })
  )

/** @Exercises */

const incValueInFunctor = R.curry((f, functor) => functor.map(f))
const incFunctor = map(add(1));

console.log({
  incValueInFunctor: incValueInFunctor(R.add(1), [1, 2]),
  incFunctor: incFunctor([1, 2])
})

/*******************************************************/

const user = { id: 2, name: 'Albert', active: true };
const initial = R.compose(map(head), safeProp('name'))

console.log({ initial: initial(user) })
