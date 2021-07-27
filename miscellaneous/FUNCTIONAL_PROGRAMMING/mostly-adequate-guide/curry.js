const R = require('ramda')

const match = R.curry((what, string) => string.match(what))
const replace = R.curry((what, replacement, string) => string.replace(what, replacement))
const filter = R.curry((f, xs) => xs.filter(f))
const map = R.curry((f, xs) => xs.map(f))

const matchR = match(/r/g, 'hello, world')
const hasLetterR = match(/r/g)

const ramda = hasLetterR('ramda')
const other = hasLetterR('asd')

const filteredArray = filter(hasLetterR, ['new arr', 'arr'])

const removeStringsWithoutRLetter = filter(hasLetterR)
const strings = removeStringsWithoutRLetter(['new arr', 'data'])

const upper = el => el.toUpperCase()

const mapArrElements = map(upper)
const mapped = mapArrElements(['11', 'as'])

const mapArrElementsImp = arr => map(upper, arr)

console.log({ matchR, hasLetterR, ramda, other, filteredArray, strings, mapped })

/***********************@Exercises***********************/

const split = R.curry((separator, s) => s.split(separator))

const words = str => split(' ', str);
const partialApplication = split(' ')

console.log({ words, words: words('hello o'), partialApplication: partialApplication('hello o') })

/*******************************************************/

const REQ_EXP = /q/i

const filterQsImp = xs => filter(x => match(/q/i, x), xs);
const filterQs = filter(match(REQ_EXP))

console.log({ filterQs: filterQs(['q', 'w', 'a']), filterQsImp: filterQsImp(['q', 'w', 'a']) })

/*******************************************************/

const reduce = R.curry((f, acc, xs) => xs.reduce(f, acc))

const keepHighest = (x, y) => (x >= y ? x : y);
const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);

const maxValue = reduce(keepHighest)(-Infinity)

console.log({ max: max([1, 2, 3, 4]), maxValue: maxValue([1, 2, 3, 4]) })
