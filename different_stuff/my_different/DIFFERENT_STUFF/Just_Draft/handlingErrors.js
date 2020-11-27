'use strict';

//  callbacks ladder
/*
const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, files) => {
  if (err) throw new Error('hello');
  const arr = []
  for (let i = 0, { length } = files; i < length; i++) {
    arr.push(files[i])
  }
  return arr
})

const buffers = []

fs.readdir(__dirname, (err1, files) => {
  if (err1) console.log('error1');
  for (let j = 0; j < files.length; j++) {
    const file = path.join(__dirname, files[j])
    fs.stat(file, (err2, stats) => {
      if (err2) console.log('error2')
      if (stats.isFile()) {
        fs.readFile(file, (err3, data) => {
          if (err3) console.log('error3')
          buffers.push(data)
        })
      }
    })
  }
})


//      promosify

//https://habr.com/ru/company/ua-hosting/blog/304474/

//fs.readFile(file, (err, data))

function promisify(func, args) {
    return new Promise(function(resolve, reject) {

      /*  inside promise we have to call our function, as it is, but add callback
          to make our func that was синхронной и чтоби стала асинхронной  */
/*
        func.apply(null, [].concat(args, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }));
    });
}
/*
const readdir = promisify(fs.readdir, [__dirname])
readdir
       .then(files => {
         Promise.all(files.map(file => {
           const filePath = path.join(__dirname, file)
           return promisify(fs.stat, [file])
              .then(stats => {
                console.log({ stats, filePath })
                if (stats.isFile()) {
                  return promisify(fs.readFile, [filePath])
                } else {
                  throw new Error('Not a file!')
                }
              })
              .catch(e => console.error(e))
         }))
       })
       .then(buffers => {
         return buffers.filter(buffer => buffer)
       })
       .catch(error => {
         console.error(error)
       })
*/
/*
const promosify1 = (func, ...args) =>
  new Promise((resolve, reject) =>
    func.apply(null, [].concat(args, (err, data) =>
       err ? reject(err) : resolve(data)
     ))
  )

const readFile = promisify(fs.readFile, './codewars')
readFile
  .then(data => console.log(data))
  .catch(e => console.error(e))


const arr = [1,2,3,4]
const change = [].concat(arr, function() {})
console.log({ change })


const promisify2 = (func, args) => {
  return new Promise((resolve, reject) => {
    func.apply(null, [...args, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    }])
  })
}

const readdir2 = promisify2(fs.readdir, [__dirname])
readdir2
        .then(files => Promise.all(files.map(file => {
          const filePath = path.join(__dirname, file)
          return promisify2(fs.stats, [file])
            .then(stat => {
              if (stat.isFile()) {
                return promisify2(fs.readFile, [filePath])
              } else {
                throw new Error('Not a file!!!!')
              }
            })
            .catch(e => console.error)
        })))
        .then(buffers => buffers.filter(e => e))
        .then(console.log)
        .catch(console.error)

/*
import fs from "fs";
import path from "path";
*/
/*
function getFiles() {
  return promisify2(fs.readdir, [__dirname])
}

function checkFiles(files) {
  return Promise.all(files.map(file => promisify2(fs.stat, [path.join(__dirname, file)])
                 .then(stat => {
                   if (stat.isFile()) {
                     return file
                   } else {
                     throw new Error('Not a fail!')
                   }
                 })
                 .catch(console.error)
                 .then(files => {
                   console.log({ files })
                   return files.filter(file => file)
                 })
               ))
}

function readFiles(files) {
  return Promise.all(files.map(file => {
    return promisify2(fs.readFile, [file])
  }))
}

async function main() {
  return await readFiles(await checkFiles(await getFiles()))
}

main()
      .then(console.log)
      .catch(console.error)


//    handling errors using generators

      function * main() {
          return yield readFiles(yield checkItems(yield getItems()));
      }

      const generator = main();

      generator.next().value.then(items => {
          return generator.next(items).value.then(files => {
              return generator.next(files).value.then(buffers => {
                  console.log(buffers);
              });
          });
      });

*/
