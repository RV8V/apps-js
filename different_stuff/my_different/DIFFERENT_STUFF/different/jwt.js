'use strict'

const base64url = require('base64-url')

function encode(header_0, payload_0) {
   const header = base64url.encode(JSON.stringify(header_0));
   const payload = base64url.encode(JSON.stringify(payload_0));
   console.log({ header, payload })
   return `${header}.${payload}`
}

function decode(jwt) {
  console.log({ jwt })
   const [headerB64, payloadB64] = jwt.split('.');
   const headerStr = base64url.decode(headerB64);
   const payloadStr = base64url.decode(payloadB64);
   return {
       header: JSON.parse(headerStr),
       payload: JSON.parse(payloadStr)
   }
}

const dataEncoded = encode('sha-255', 'Hello')
const dataDecoded = decode(dataEncoded)
console.log({ dataDecoded, dataEncoded })

// example
const jwt = require('jsonwebtoken');
const secret = 'shhhhh';
// шифрование
const token = jwt.sign({ foo: 'bar' }, secret) // serialized form
console.log({ token })
// проверка и расшифровка
const decoded = jwt.verify(token, secret) // deserialized form
console.log({ decoded })
console.log(decoded.foo) // bar

console.log({ jwt })
