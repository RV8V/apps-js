// // const asyncFilter = async (arr, predicate) => {
// //   const results = await Promise.all(arr.map(predicate));
// //   return arr.filter((value, index) => {});
// // };

// // const deepClone = (value) => JSON.parse(JSON.stringify(value));

// const clone = (value) => {
//   const val = {};

//   for (let i in value) {
//     if (typeof value[i] === 'object') {
//       val[i] = clone(value[i]);
//     } else {
//       val[i] = value[i];
//     }
//   }
//   return val;
// };

// const ob = { name: 'nn', age: 1, type: { value: 1 } };
// const res = clone(ob);

// console.log({ ob, res });
