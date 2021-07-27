const R = require('ramda')
const atob = require('atob')

/**
 * @Associative property:
 * (a + b) + c = a + (b + c)
 * (6 + 4) + 3 = 6 + (4 + 3)
 *          13 = 13
 *
 * @getJwtClaims1: (a, b, c, d)
 * @getJwtClaims2: ((a, b), c, d)
 * @getJwtClaims3: ((a, b), (c, d))
 */

const split = R.curry((spliter, s) => s.split(spliter))
const concat = R.curry((s1, s2) => s1.concat(s2))
const parse = v => JSON.parse(v)
const nth = R.curry((n, xs) => xs[n])

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIn0.eH9qoMvdv12LsZ3Og_K20no8uiBQFuJg6k6A7O8l06U'
const base64 = 'eyJoZWxsbyI6IndvcmxkIn0'

const getJwtClaims1 = R.compose(parse, atob, nth(1), split('.'))

const base64ToJson = R.compose(parse, atob)
const getJwtClaims2 = R.compose(base64ToJson, nth(1), split('.'))

const takeJwtPayload = R.compose(nth(1), split('.'))
const getJwtClaims3 = R.compose(base64ToJson, takeJwtPayload)

console.log({
  getJwtClaims1: getJwtClaims1(jwt),
  getJwtClaims2: getJwtClaims2(jwt),
  getJwtClaims3: getJwtClaims3(jwt),
  base64ToJson: base64ToJson(base64)
})
