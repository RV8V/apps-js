// const a = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]
//
// let b = [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9],
// ];
//
// function f(a) {
//   const b = []
//   for (let i = 0; i < a.length; ++i) {
//     const tmp = []
//     for (let j = 0; j < a[i].length; ++j) {
//       console.log({ val: a[i] })
//       // const value = a[i + j][j]
//       // tmp.push(value)
//     }
//     console.log({ tmp })
//   }
//   return b
// }
//
// f(a)

// const str = 'key1=value1&key2=value2'
//
// const r = {
//   key1: 'value1',
//   key2: 'value2',
// }
//
// const s = 'key1.nested=value1&key1.q1=value2';
//
// const x = {
//   key1: {
//     nested: 'value1',
//     q1: 'value2'
//   },
// }
//
// const f = str => {
//   const t = str.split('&')
//   const o = {}
//   for (let i = 0; i < t.length; ++i) {
//     const [nested, value] = t[i].split('=')
//     const [obj, key] = nested.split('.')
//     console.log({ obj, key, value })
//     o[obj] = { [key]: value }
//   }
//   return o
// }
//
// const arr = [-1, -2, 0, 3, 5]
// const filtered = arr.filter(async val => val > 0)
//
// console.log({ filtered })

const isArray = (el) => el.__proto_.constructor === Array;

console.log("isArray():", isArray());
console.log("isArray():", isArray(1));
console.log("isArray():", isArray("1"));
console.log("isArray():", isArray(false));
console.log("isArray():", isArray({}));
console.log("isArray():", isArray([]));
