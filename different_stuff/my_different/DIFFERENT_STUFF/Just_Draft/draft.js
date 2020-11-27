/*
const o = {
  person: 'John',
  age: 20,
  car: {
    color: 'darh',
    age: 30,
    cool: {
      cool: 'nit cool'
    }
  }
}
Object.defineProperty(o, 'heelo', {
  writable: false,
  enumerable: false,
  value: 20
})
console.dir({o}, { showHidden: true, depth: 40 })

console.time('Loop time')
for (let i = 0; i < 1000; i++) i = i++
console.timeEnd('Loop time')

const fn = (a, b) => (console.trace('trecing'), a+b)
fn(10, 5)

//==============
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter your name: ', name => {
  console.log(`Hello, ${name}!`);
  rl.close();
});

//==========

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
})

rl.prompt()

const commands = {
  help() { console.log('Commands: ', Object.keys(commands)) },
  hello() { console.log('hello') },
  exit() { rl.close() }
}

rl.on('line', line => {
  line = line.trim()
  const command = commands[line]
  if (command) command()
  else console.log('not found')
  rl.prompt()
}).on('close', () => process.exit(0))

//=======

console.log('command line parameters\n')
process.argv.forEach((val, ind) => {
  console.log(`${ind}: ${val} `)
})

console.log('\nVariable environment\n')
for (const name in process.env) {
  const val = process.env[name]
  console.log(`${name}: ${val}`)
}

//=======

const str = '  jelsj '
console.log(`${str.trimRight()}\n${str}`)
*/
//end of fileend of fileend of fileend of fileend of fileend of fileend of fileend of fileend of fileend of fileend of file
//end of fileend of fileend of fileend of fileend of fileend of fileend of fileend of file


// tast
const rooms = [['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9]]

for (const [{ length: chairs }, people] of rooms) {
  console.log({ people, chairs })
}

const arr = [ [1,2,3,4,5] ]
const a = [1,2,3]
//const { length: cool } = a
const [{ length }] = arr
console.log({ cool })
