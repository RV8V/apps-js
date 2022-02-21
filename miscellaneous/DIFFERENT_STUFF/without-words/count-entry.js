// // const isArray = (el) => el && el.__proto__.constructor === Array;
// const isArray = (el) => el && el.__proto__.constructor === Array;
//
// Object.prototype.toString()
//
// console.log("isArray():", isArray());
// console.log("isArray():", isArray(1));
// console.log("isArray():", isArray("1"));
// console.log("isArray():", isArray(false));
// console.log("isArray():", isArray({}));
// console.log("isArray():", isArray([]));

// const unique = (arr) => {
//   const r = []
//   arr.forEach(el => {
//     if (el instanceof Array) r.push(...el)
//     else r.push(el)
//   })
//   r.reduce((acc, val) => {
//
//     if ()
//   }, {})
//   return r
// };
//
// console.log("unique():", unique([-1, 3, 0, [2, -1, 1], 0, 5, [3, 6]]));

// const f = (a, b, s) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     return resolve(a + b)
//   }, s)
// })
//
// const t = async () => {
//   const r = await f(1, 2, 3)
//   console.log({ r })
// }
//
// t()
//
// const f = str => {
//   const chars = str.split('');
//   const res = {}
//   for (let i = 0; i < chars.length; i++) {
//     res[chars[i]] = (res[chars[i]] || 0) + 1
//   }
//   const entries = Object.entries(res);
//   const sorted = entries.sort((a, b) => b[1] - a[1])
//
//   console.log({ entries, sorted })
//   return sorted[0][0]
// }
//
// console.log({ re: f('aabsda') })
//
// const n = Math.round(0.0023 * 1000) / 1000

const string = '113jljlrw9uew0t111aaa';
const chars = string.split('')

const res = {}
const r = {}

for (let i = 0; i < chars.length; i++) {
  // console.log({ res, v: res[chars[i]] })
  // console.log({ r })

  const char = chars[i]

  console.log({ value: r[char] })

  if (r[char] === undefined) r[char] = 0
  else r[char] = r[char] + 1

  // res[chars[i]] = (res[chars[i]] || 0) + 1;
}

console.log({ r })
