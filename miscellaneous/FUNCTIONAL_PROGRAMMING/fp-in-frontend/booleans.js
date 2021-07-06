'use strict'

const returnYes = true && 'yes' || 'no'

const returnFirst = a => b => a
const returnSecond = a => b => b

const applyOne = f => x => f(x)
const applyTwo = f => x => f(f(x))

const lambdaResultFirst = returnFirst('yes')('no')
const lambdaResultSecond = returnSecond('yes')('no')
const one = applyOne(returnFirst)(returnYes)

console.log({ lambdaResultFirst, lambdaResultSecond, returnYes, one })
