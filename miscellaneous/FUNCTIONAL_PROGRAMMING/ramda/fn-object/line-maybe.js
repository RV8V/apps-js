'use strict'

const maybeFunctor = x => fn => maybeFunctor(x && fn ? fn(x) : null)

maybeFunctor(10)(x => x + 4)(console.log)
maybeFunctor(20)()(console.log)
