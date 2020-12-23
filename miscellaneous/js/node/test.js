// //const str = 'aaassdddsaa'// -> '3a2s3d1s2a'
//
// const f = str => {
//   const res = []
//   const arr = str.split('')
//
//   for (let i = 0; i < arr.length; ++i) {
//     for (let j = 0; j < arr.length; ++j) {
//       if (arr[i] !== arr[j]) {
//         console.log({ i: arr[i], j: arr[j] })
//         res.push(i)
//         res.push(arr[i])
//       }
//     }
//   }
//   console.log({ res })
//   return res.join('')
// }

//console.log({ res: f(str) })

const e = eval('1+1')

console.log({ e })

const value = eval('let i = 0; ++i');

console.log({ value })

let a = 1;
eval('a = 3');
eval('console.log(a)');

eval('var x = 3; function f1() {}');
eval('console.log(typeof x, typeof f1)');

var code = '[';
var w = 0;
for (; w < 4; ++w) {
  code += w + ',';
}
code += w + ']';
eval('console.log(code)')

const str = 'aaassdddsaa'// -> '3a2s3d1s2a'

const f = str => {
  let res = ''
  let i = 0

  while(i < str.length) {
    for (var cout = 1; str[i] === str[i + cout]; cout++) {}
    res += cout + str[i]
    i += cout
    eval('console.log(res)')
  }
  return res
}

console.log({ result: f(str) })
