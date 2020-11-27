'use strict';

// example 1
const readline = require('readline')
const fs = require('fs')
/*
const rl0 = readline.createInterface({
  input: process.stdin, // fs.createReadStream(path)
  output: process.stdout // null undefined
})
*/
/*
rl.on('line', input => {
  console.log(`Received: ${input}`)
})
*/

/*
rl.question('What do you think of Node.js  ', answer => {
  console.log(`Thank you for your valuable feedback: ${answer}`)

rl.close()
})
*/
/*
rl.question('Hello ?', data => {
  process.stdout.write(Buffer.from(data))
  //console.log(process.stdin.read(), 'read')
})
*/

//rl.prompt(0)

// example 2
/*
const rl = readline.createInterface({
  input: process.stdin, // fs.createReadStream(path)
  output: process.stdout // null undefined
})

rl.question('Would you like to see what cars are availalbe?\nPlease, print yes or no  ', answer => {
  answer === 'yes' ? process.stdout.write(process.stdin.read()) : rl.question('What ?', answer => {
    process.stdout.write(' Ok\n'); rl.close()
  })
})
*/
// example 3

//const readline = require('readline')

const rl_1 = readline.createInterface({
  input: process.stdin, // fs.createReadStream(path)
  output: process.stdout // null undefined
})

const question = str => new Promise(resolve => rl_1.question(str, resolve))

const steps = {
  start: async () => steps.seeCars(),
  seeCars: async () => {
    const seeCars = await question('Would you like to see what cars are availalbe?\nPlease, print yes or no ')
    if (seeCars === 'no') return steps.locationSearch()
    if (seeCars === 'yes') return steps.showCars()
    console.log('No warries, have a nice day!')
    return steps.end()
  },
  showCars: async () => (console.log('Showing cars...'), steps.end()),
  locationSearch: async () => {
    const longlat = await question('What do you want? ')
    return steps.end()
  },
  end: async() => rl_1.close()
}

steps.start()
