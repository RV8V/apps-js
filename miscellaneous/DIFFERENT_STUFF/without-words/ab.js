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

const f = (a, b, s) => new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve(a + b)
  }, s)
})

const t = async () => {
  const r = await f(1, 2, 3)
  console.log({ r })
}

t()
