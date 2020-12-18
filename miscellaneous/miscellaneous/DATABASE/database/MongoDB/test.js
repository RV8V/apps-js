'use strict'
/*
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/mydb', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  refresh: String
})

const tokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //title: String,
  refresh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  payload: String
})

const User = mongoose.model('Author', userSchema)
const RefreshToken = mongoose.model('RefreshToken', tokenSchema)

const user = new User({
  _id: new mongoose.Types.ObjectId(),
  name: 'Bob',
})

const refreshToken = new RefreshToken({
  _id: new mongoose.Types.ObjectId(),
  //title: 'Title',
  refresh: user._id,
  payload: '12374.7474747.38383'
})

//user.save(err => err ? '' : console.log('author saved'))
//refreshToken.save(err => err ? '' : console.log('book saved'))

/*
const findRefreshTokenByUserId = id => {
  User.findById(id, (err, res) => {
    err ? '' : console.log({ res })
  })
}
*/
/*User.findById(refreshToken._id, (err, res) => {
  err ? '' : console.log({ res })
})*/


/*
console.log({ user, refreshToken })


const findRefreshTokenByUserId = async id => {
  const refresh = await RefreshToken.findOne({ refresh: id }).exec()
  return refresh
}

const deleteRefreshToken = async token => {
  const refreshToken = await RefreshToken.findOneAndRemove({ payload: token }).exec()
  return refreshToken
}

const findRefreshTokenByPayload = async token => {
  const refreshToken = await RefreshToken.findOne({ payload: token }).exec()
  return refreshToken
}

const fn = async id => {
  const refreshToken = await findRefreshTokenByUserId(id)
  console.log({ refreshToken })
  const refresh = await findRefreshTokenByPayload(refreshToken.payload)
  console.log({ refresh })
}

fn('5eb93747ce275436036d3cd6')

//deleteRefreshToken('ksfjfksj.sjfskfjs.')

*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/mydb', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    validate: [content => content.length < 1, 'Max post length is 200']
  },
  refresh: String
})

const User = mongoose.model('Author', userSchema)

const user = new User({
  _id: new mongoose.Types.ObjectId(),
  name: 'Bob',
})

user.save(err => {
  if (err) console.log({ err: err.errors.name.message })
  console.log('ok')
})

console.log({ user })

















//
