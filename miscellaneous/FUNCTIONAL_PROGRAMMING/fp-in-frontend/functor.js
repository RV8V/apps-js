'use strict'

const functor = ['one', 'two', 'three']
const anotherFunctor = functor.map(item => item.length)

const maybe = x => f => x && f && maybe(f(x)) || maybe(null)
const map = fn => maybe(x ? fn(x) : null);

maybe(10)(x => x + 3)(console.log)

/**
 * u.map(x => x) === u - identity
 * u.map(f).map(g) === u.map(x => g(f(x))) - composition
 */
