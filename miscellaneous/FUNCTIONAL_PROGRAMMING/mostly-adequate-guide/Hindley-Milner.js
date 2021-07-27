const R = require('ramda')
const compose = R.compose

/** @: toUpperCase :: String -> String */
const toUpperCase = s => s.toUpperCase();

/** @: toLowerCase :: String -> String */
const toLowerCase = s => s.toLowerCase();

/** @: capitalize :: String -> String */
const capitalize = s => toUpperCase(head(s)) + toLowerCase(tail(s))

/** @: strLength :: String -> Number */
const strLength = s => s.length

/** @: join :: String -> [String] -> String */
/** @: join :: String -> ([String] -> String) */
const join = R.curry((what, xs) => xs.join(what))

/** @: match :: RegExp -> String -> [String] */
/** @: match :: RegExp -> (String -> [String]) */
const match = R.curry((regExg, s) => s.match(regExg))

/** @: replace :: RegExp -> String -> String -> String */
/** @: replace :: RegExp -> (String -> (String -> String)) */
const replace = R.curry((regExp, substitution, s) => s.replace(regExg, substitution))

/** @: match :: RegExp -> String -> [String] */
/** @: onHoliday :: String -> [String] */
const onHoliday = match(/holiday/ig)

/** @: id :: a -> a */
const id = x => x

/** @: map :: (a -> b) -> [a] -> [b] */
const map = R.curry((f, xs) => xs.map(f))

/** @: head :: [a] -> a */
const head = xs => xs[0]

/** @: filter ::  (a -> Bool) -> [a] -> [a] */
const filter = R.curry((f, xs) => xs.filter(f))

/** @: reduce :: ((b, a) -> b) -> b -> [a] -> b  */
const reduce = R.curry((f, x, xs) => xs.reduce(f, x))

/**
 * @Parametric Polimorphism - ability of parameters of function to make function handle parameters of different types the same way -> execute the same code for different types
 * @: In any case, the point is that the possible behavior of a function is largely narrowed down by the polymorphism of its type.
 *
 * @Examples:
 *
 * @: head :: [a] -> a
 * @: reverse :: [a] -> [a]
 */

/** @Free Theorems */

const f = () => {}
const p = () => {}

/** @: head :: [a] -> a */
compose(f, head) === compose(head, map(f));

/** @: filter :: (a -> Bool) -> [a] -> [a] */
compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f));
