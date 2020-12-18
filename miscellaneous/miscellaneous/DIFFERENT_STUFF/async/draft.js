'use strict'
/*
const f1 = async x => x + 1
const f2 = async x => x * 2
const f3 = async x => x - 2

const compose = (...fns) => input =>
     fns.reduceRight((chain, fn) => chain.then(input), Promise.resolve(input))

const res = compose(f1, f2, f3)(2).then(res => console.log(`result: ${res}`))
*/



const pipe = (...fns) => value => {
  if (fns.length === 0) return value
  for (let i = 0; i < fns.length; i++) {
    res = fns[i](value)
  }
  return res
}

const pipe_ = (...fns) => x => {
  if (fns.length === 0) return x;
  const fn = fns.shift();
  const res = fn(x);
  if (fns.length === 0) return res;
  return pipe(...fns)(res);
}








const compose_ = (...fns) => (...args) => {
  let res = fns[arg.length - 1]
  console.log({ res })
  if (fns.length === 0) return res
  for (let i = 1; i < fns.length; i++) {
    res = fns[i](res)
  }
  return res
}

const compose_0 = (...fns) => arg => {
  let res = fns[0](arg)
  if (fns.length === 0) return res
  return pipe(...fns)(res);
}

const f1 = x => x + 1
const f2 = x => x - 2
const f3 = x => x * 10

const data = compose(f1, f2, f3)(2)
console.log({ data })
