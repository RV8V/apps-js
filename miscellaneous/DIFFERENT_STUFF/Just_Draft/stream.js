const { Readable } = require('stream')

class Mr extends Readable {
  constructor(option) {
    super(option)
    this.value = 1
  }
  _read() {
    const buffer = Buffer.from(`${this.value}`, 'utf8')
    console.log(`Added: ${this.value}, could be Added:`, this.push(buffer) )
    this.value += 10
  }
}

const stream = new Mr({ highWaterMark: 3 })
//console.log(`Received:`, stream.read() + '')
stream.on('data', chunk => console.log(chunk + ''))


const { Writable } = require('stream')

class Mw extends Writable {
  constructor(option) {
    super(option)
  }
  _write(chunk, encoding, callback) {
    console.log(chunk + '')
    callback()
  }
}

const stream = new Mw({ highWaterMark: 2 })

for (let i = 0; i < 24; i += 4) {
  const canWrite = stream.write(Buffer.from(`${i}`), 'utf8')
  console.log(`Can we write bunch of data? ${canWrite}`)

  if (!canWrite) { stream.on('drain', () => console.log('done')); console.log('Drain fired') }
}

//===========================

const once = f => {
  const wrapper = (...args) => {
    if (!f) return
    const callFn = f
    f = null
    callFn.apply(null, args)
  }
  return wrapper
}

const { Duplex } = require('stream')

class Md extends Duplex {
  constructor(option) {
    super(option)
    this.current = 0
    this.limit = 20
   }

  _read() {
    this.current += 4
    if (this.current > this.limit) { this.push(null) }
    else {
      const buffer = Buffer.from(`${this.current}`, 'utf8')
      console.log(`Added ${this.current}. Can we add:`, this.push(buffer))
    }
  }
  _write(chunk, encoding, callback) {
    console.log(chunk + '')
    callback()
  }
}

const md = new Md({
  readableHighWaterMark: 2,
  writableHighWaterMark: 2
})

let chunk = md.read()
while (chunk !== null) {
  const canWrite = md.write(Buffer.from(`${chunk}`, 'utf8'))
  console.log(`Can we write this bunch of data?`, canWrite)

  if (!canWrite) {
    const oneTime = once(md.on('drain'))
  }

  chunk = md.read()
}

//========================

const fs = require('fs')
const stream = require('stream')

class ToUpperCaseStream extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false
    })
    super(options)
  }

  _transform(buffer, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 encoding sources are supported'))
      callback()
    }
    this.push(buffer.toUpperCase()) //'buffering our data'
    callback()
  }

  _flush(callback) {
    this.push('=== end ===')
    callback()
  }
}

fs.createReadStream('./draft.js', 'utf8')
 .pipe(new ToUpperCaseStream())
 .pipe(fs.createWriteStream('./file.txt'))

'---------------------------------------------------'

const fs = require('fs')
const stream = require('stream')

class Mt extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false })
    super(options) }

  _transform(chunk, encoding, callback) {
    encoding !== 'utf8') ? callback(this.emit('error', new Error('Only UTF-8 encoding sources are supported')))
    : callback(null, this.push('*' + chunk.toString() + '*'))
  }
  _flush(callback) { callback(null, '+++ end of file +++') }
}

fs.createReadStream('./draft.js', 'utf8').pipe(new Mt()).pipe(fs.createWriteStream('./file.txt'))


//==============


onst Readable = require('stream').Readable
const readable = new Readable({ highWaterMark: 2 })
readable._read = function() {
  const data = this
  //console.log(this)
  console.log(typeof this)
  console.log(this instanceof Readable)
  let value = this.push('2'); console.log({value})
  this.unshift('1')
  console.dir(this, {depth: 100})
}

readable._read()
const b1 = new Uint8Array('1').fill('1')
const b2 = new Uint8Array('2').fill('2')
*/
/*const { Readable } = require('stream')

class ArrayReader extends Readable {
  constructor(opt) {
    super(opt);
    const numbers = new Array(1 + 2).fill(0).map(String);
    this.buffer = ['header', '\n\n', ...numbers];
  }
  _read(size) {

    while (this.buffer.length) {
      const chunk = this.buffer.shift();
      if (!this.buffer.length) {
        this.push(chunk);
        this.push(null);
        return true;
      }
      if (!this.push(chunk))
        return;
    }
  }
}

const arr = new ArrayReader({ highWaterMark: 3 })
console.log(arr.read().toString())
*/

//================

const Readable = require('stream').Readable;
const readable = new Readable();

let str = 'hello'
let count = 0

readable._read = function () {
    const self = this;

    setTimeout(function () {
        if (count++ < 1) self.push(Buffer.from(str));
        else self.push(Buffer.from('bye'))
    }, 1000);
};


readable.once('data', function (d) {

    console.log(d.toString(), '++');        // Outputs 1

    readable.on('data', function (d) {
        console.log(d.toString());          // Heh?! Outputs 2, how about 1?
    });

    //readable.unshift(d);                    // Put the 1 back on the stream
});
