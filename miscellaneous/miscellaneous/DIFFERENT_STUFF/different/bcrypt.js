'use strict'
const bcrypt = require('bcryptjs')
// usage-sync | first variant
/*const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync('Bcrypt/\/', salt)
console.log({ salt, hash })

const what = bcrypt.compareSync('Bcrypt/\//', hash)
console.log({ what })

// second variant
const hash0 = bcrypt.hashSync('Hello', 10)
console.log({ hash0 })
*/
// usage-async
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('MyString', salt, (err, hash) => {

    bcrypt.compare('NotMyString', hash, (err, res) => {
      //console.log({ res })
    })
  })
})

const generateRes = async () => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash('MyString', salt)
  const res = await bcrypt.compare('MyString', hash)
  console.log({ res })
}

//(async () => generateRes())()

bcrypt.genSalt(10, (err, salt) => bcrypt.hash('MyStr', salt, (err, hash) => bcrypt.compare('Hello', hash, (err, res) => console.log({ res }))))
bcrypt.compare('NotMyHello', bcrypt.hash('MyHello', bcrypt.genSalt(10, (err, salt) => salt)) )
