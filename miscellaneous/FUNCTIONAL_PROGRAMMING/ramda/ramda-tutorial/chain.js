const R = require('ramda')

/**
 * @R.chain maps a function over a list and concatinates the results. Also know as flatMap
 * @Array.prototype.flatMap === map + flat with depth 1 === R.pipe(R.map, R.flatten) === R.reduce(R.concat, [], R.map(function, arr))
 * @R,head returns first element in list of string = .first()
 * @R.last returns the last element of the given list or string.
 * @R.tail returns a list of string without first item of symbol
 * @R,init returns a list of string without last item of symbol
 * @R.flatten pull each item out of list - all levels of deapth
 * @R.reduce, parameters(function, initial-value, list)
 *
 * chain(f, g)(x) is equivalent to f(g(x), x) -> if g is function
 */

const l = R.bind(console.log, console)
const duplicate = x => [x, x]

const arr = [1, 2, 3, 4]

l({
  map: arr.map(x => [x * 2]),
  flatMap: arr.flatMap(x => [x * 2]),
  flatMapDeep: arr.flatMap(x => [[x * 2]]),
  duplicate: duplicate(10),
  chain: R.chain(duplicate, [1, 2, 3]),
  rMap: R.map(duplicate, [1, 2, 3]),
  aMap: [1, 2, 3].map(duplicate),
  flatten: R.flatten([1, 2, 3, [4, [5]]]),
  ownChain: R.pipe(R.map(duplicate, R.__), R.flatten)([1, 2, 3]), /* concatination of every result === chain */
  too: R.flatten(R.map(duplicate, [1, 2, 3])),
  reduce: R.reduce(R.concat, [], R.map(duplicate, [1, 2, 3])),    /* concatination of every result === chain */
  headTailLastInit: {
    aHead: R.head(['one', 'two']),
    sHead: R.head('str'),
    aTail: R.tail(['one', 'two', 'three']),
    sTail: R.tail('str'),
    aLast: R.last(['one', 'two']),
    sLast: R.last('str'),
    aInit: R.init(['one', 'two']),
    sInit: R.init('str'),
  },
  chainSecond: R.chain(R.append, R.head)([1, 2, 3]),              /* R.append(R.head([1, 2, 3]), [1, 2, 3]) */
  theSame: R.append(R.head([1, 2, 3]), [1, 2, 3]),
  same: R.pipe(R.head, R.append)([1, 2, 3])([1, 2, 3])
})
