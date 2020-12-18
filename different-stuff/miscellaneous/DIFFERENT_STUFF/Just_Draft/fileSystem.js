'use strict';

const fs = require('fs');
const path = require('path')
//console.log({ path })

fs.open('./codewars.js', 'r', (err, fd) => console.log({ fd }))

try {
  const fileDesciptor = fs.open('./draft.js', 'r')
  console.log({ fileDesciptor })
} catch(e) { console.log('error') }



fs.readdir(__dirname, (error, files) => {
  //console.log({ files })
  if (error) console.log({ error })
  for (let i = 0, { length } = files; i < length; i++) {
    //console.log(`File name ${files[i]}`)
  }
})



fs.readdir(__dirname, (err, data) => {
  fs.stat(__dirname, (err, stat) => {
    //console.log({ stat })
    if (stat.isFile()) console.log('true');
  /*  console.log({
      size: stat.size,
      isDirectory: stat.isDirectory(),
      isSymbolicLink: stat.isSymbolicLink()
    })  */
  })
})

const arrayOfFolders = fs.readdirSync(__dirname).map(filename => path.join(__dirname, filename))
console.log({ arrayOfFolders })


try {
  const buffer = fs.readFileSync('./codewars.js', /*'utf8'*/)
  console.log({ buffer })
} catch(e) { console.log(e) }


try {
  const writtenFile = fs.writtenFileSync('./hello.txt', 'HELLO')
  console.log('true')
} catch(e) { console.log('false))') }


const content = 'end of file'
fs.appendFile('./draft.js', content, e => {})



const dirname = path.dirname(__dirname)             // 'returns parent directory'
const notes = path.basename('codewars.js')              // 'returns name of file'
const extention = path.extname('./hello.js').substring(1)           // 'returns extention of file'
const pathResolve = path.resolve('codewars.js')     // 'returns full path'
const data = path.join(__dirname, '___hello', '555')  // joins all elements
const parse = path.parse(__dirname)

const separator = path.sep        // '/'
const delimiter = path.delimiter  // ' : '
const dirName = path.dirname(__dirname)

console.log({ separator, delimiter, dirName, parse })
console.log({ dirname, notes, extention, data, pathResolve })
