'use strict'

const crypto = require('crypto')

/*const cipherAlgorithms = crypto.getCiphers()
const password = 'crypto@123'

// first example
const cipher = crypto.createCipher('aes128', 'a password') // instance of Cipher
//console.log({ cipher })
let encrypted = cipher.update(password, 'utf8', 'binary') // 'utf8' -- type - encoding of input_data (this is password), 'hex' -- defines a format of encrypted (output) data
encrypted = encrypted + cipher.final('binary')
console.log({ encrypted })
*/

// second example
/*const cipher = crypto.createCipher('aes128', 'a password')
let encrypted_0 = ''

cipher.on('readable', () => {
  const data = cipher.read()
  if (data) encrypted_0 += data.toString('hex')
})

cipher.on('end', () => console.log({ encrypted_0 }))

cipher.write('string that needs to be encrypted')
cipher.end()
*/

// next
const fs = require('fs')

const cipher = crypto.createCipher('aes128', 'a password')
const input = fs.createReadStream('../bcrypt.js')
const output = fs.createWriteStream('testing.enc')

input.pipe(cipher).pipe(output)

// Decryption
const encrypted_password = '3814852bc1ce8ece959afcf7da74b8c0076b1b2bb36506264c295a72711d6cd64570e5a62834f7908558669d8d897dda'
/*const decipher = crypto.createDecipher('aes128', 'a password')
let decrypted = decipher.update(encrypted_password, 'hex', 'utf8')
decrypted += decipher.final('utf8')
console.log({ decrypted })
*/
// next exapmple --- again we can use it as streams or using methods! -- decipher and cipher are both duplex streams
const decipher = crypto.createDecipher('aes128', 'a password')

let decrypted = ''
let data
decipher.on('readable', () => {
  if (data = decipher.read()) decrypted += data.toString('hex')
})

//decipher.on('end', () => console.log({ decrypted }))

decipher.write(encrypted_password, 'hex')
decipher.end()

// next
const decipher_0 = crypto.createDecipher('aes128', 'a password')
const input_0 = fs.createReadStream('testing.enc')
const output_0 = fs.createWriteStream('example.js')

input.pipe(decipher).pipe(output)


// video
/* supported hashes
console.log(crypto.getHashes(), '---')
console.log(crypto.getCiphers())
*/

// random bytes
const iv = crypto.randomBytes(16) // initialization vecror --- just random bunch of bytes
crypto.randomBytes(16, (err, buffer) => {
//  console.log({ buffer: buffer.toString(), iv: iv.toString() })
})

// create hash
const hash = crypto // we can divide the 3 steps into like const value = crypto.createHash() and so on...
      .createHash('md5') // use alogorith any of available
      .update('your message') // iv -- probably -- what you want to enrypt by use the alogorithm upper
      .digest('hex') // what type of output we want to have
//console.log({ hash }) // hahs is deterministic all the type

// aes 256-bit cipher block chaining (cbc) encryption/decryption
const secret_message = ':)'
const key = '12345678123456781234567812345678' // concrete key for concrete algorith not any another can be used

const cipher_1 = crypto.createCipheriv('aes-256-cbc', key, iv)
let encrypted = cipher_1.update(secret_message, 'utf8', 'hex')// fedding utf8 and output and output should be 'hex'
encrypted += cipher_1.final('hex') // append this and get our encrypted message
//console.log({ encrypted })

// iv is a starting point of encryption of course
const decipher_1 = crypto.createDecipheriv('aes-256-cbc', key, iv)
let decrypted_1 = decipher_1.update(encrypted, 'hex', 'utf8')
decrypted_1 += decipher_1.final('utf8')
//console.log({ decrypted_1 })

// next video
const key0 = 'secret key'
const hash0 = crypto
      .createHash('sha256', key0)
      .update('password')
      .digest('hex')
//console.log({ hash0 })

// example of encryption
const algorith = 'aes-192-cbc'
const password = 'Password used to generate key'
const key_ = crypto.scryptSync(password, 'salt', 24) // add some salt of length 24
const cipher_ = crypto.createCipher(algorith, key_)

let encrypted_ = ''
cipher_.on('readable', () => {
  console.log('_')
  let chunk
  while (null !== (chunk = cipher.read())) {
    encrypted_ += chunk.toString('hex')
  }
})
cipher_.on('end', () => console.log({ encrypted_ }))

cipher_.write('our mesage')
cipher_.end()

// decryption
const algorith = 'aes-192-cbc'
const password = 'Password used to generate key'
const key_ = crypto.scryptSync(password, 'salt', 24) // add some salt of length 24
const decipher_ = crypto.createDecipher(algorith, key_)

let decrypted_ = ''
decipher_.on('readable', () => {
  console.log('_')
  let chunk
  while (null !== (chunk = decipher.read())) {
    decrypted_ += chunk.toString('utf8')
  }
})
decipher_.on('end', () => console.log({ decrypted_ }))

const encrypted_ = 'fkhakhasjfheuPALldlpdalpdlplalplwwd93838935975379jljweoijfowej'
decipher_.write(encrypted_, 'hex')
decipher_.end()
