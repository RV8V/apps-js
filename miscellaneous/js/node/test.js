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

const str = 'aaassdddsaa'// -> '3a2s3d1s2a'

const f = str => {
  let res = ''
  let i = 0

  while(i < str.length) {
    for (var cout = 1; str[i] === str[i + cout]; cout++) {}
    res += cout + str[i]
    i += cout
  }
  return res
}

console.log({ result: f(str) })
