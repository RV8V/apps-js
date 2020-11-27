'use strict';
/*
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/mydb', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
  .then(() => console.log('MongoBD has started'))
  .catch(e => console.error(e))


// ----------------------------------

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  age: Number
})

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true })

const User = mongoose.model('User', userSchema)
const user = new User({
  name: 'Bill',
  age: 41
})



user.save(err => {
  mongoose.disconnect()
  if (err) return console.log(err)
  console.log('saved object', user)
})

user.save(err => (mongoose.disconnect(), err ? console.log('end') :
  console.log(`user saved ${user}`)))


// another variant of .save
user.save()
  .then(data => {
    mongoose.disconnect();
    console.log({ data })
  })
  .catch(err => {
    console.log(err)
    mongoose.disconnect()
  })


// ----------------------------------












//                     DOCUMENTATION

// getting started
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })

//mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', () => process.stderr.write('connection error_______'))
db.on('error', () => console.error.bind(console, 'connection error_______'))

db.once('open', () => {   /* we are connected */
/*  console.log('opened\n') // everything down (69-104) we can put into event 'open'
})

const kittySchema = new mongoose.Schema({
  name: String
})
// model is a class

kittySchema.methods.speak = function() {
  const greeting = this.name ? `Meow name is ${this.name}` : 'I do not have a name'
  console.log(greeting)
}

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({ name: 'silence' })
const fluffy = new Kitten({ name: 'fluffy' })

console.log(silence.name)
fluffy.speak()

fluffy.save((err, fluffy) => {
  if (err) return console.error(err)
  fluffy.speak()
})

silence.save((err, silence) => err ? process.stderr.write(err.name) : silence.speak())

Kitten.find((err, kittens) => {
  if (err) return process.stderr.write(err)
  console.log({ kittens })
})

Kitten.find({ name: /^fluff/ }, (err, data) => {
  err ? console.error.bind(console, err.name) : console.log({ data })
})



// schemas examples ------

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({ // defining our schema
  title: String, // String is a shorthand for {type: String}
  author: { type: String },
  comments: [{ body: String, data: Date }],
  data: { type:  Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number, // Schematypes of fields in object
    favs: Number
  }
})

const Blog = mongoose.model('Blog', blogSchema)

// define a schema
const animalSchema = new Schema({ name: String, type: String })

animalSchema.methods.findSimilarTypes = function(callback) {
  return this.model('Animal').find({ type: this.type }, callback)
}

const Animal = mongoose.model('Animal', animalSchema)
const dog = new Animal({ type: 'dog' })
const dog1 = new Animal({ type: 'dog' })

dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs)
})


// statics functions || schema.statics --- Schena#static()
animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') })
}

animalSchema.static('findByBreed', function(breed) {
  return this.find({ breed })
})

const Animal = mongoose.model('Animal', animalSchema)
let animals = await Animal.findByName('fido')
animls = animals.concat(await Animal.findByBreed('Poodle'))



// query helpers
animalSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') })
}

const Animal = mongoose.model('Animal', animalSchema)
//                        DOCUMENTATION










    OTHER SOURCES
var db = mongoose.createConnection('mongodb://localhost/test');
*/
//общий синтаксис метода createConnection выглядит слудеющим образом:
//mongoose.connect('mongodb://username:password@host:port/database').



/*
//                 YOUTUBE
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/usersdb'

// first

MongoClient.connect(url, function(err, client) {
  if (err) return console.log('error')
  console.log('Connection established')
  client.close()
})


// second
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  const db = client.db('usersdb')
  const collection = db.collection('users')
  const user = { name: 'Gog', age: 40, hasCar: true }

  collection.insertOne(user, function(err, result) {
    err ? process.stderr.write(err) : (
    console.log.bind(console, result.ops)(), client.close())

  })
})


// three
const insertDocuments = function(db, callback) {
  const collection = db.collection('users')
  collection.insertMany([ {a: 1}, {a: 2}, {a: 3}],
    function(err, data) {
    err ? process.stderr.write(err) : (
    console.log.call(console, '3 inserted'),
    callback(data)
  )
  })
}

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  const db = client.db('users')
  console.log.apply(console, ['Connected successfully'])
  insertDocuments(db, function() { client.close() })
})

const findDocuments = (db, callback) => {
  const collection = db.collection('users')
  collection.find({ }).toArray((err, docs) =>
    err ? console.error.bind(console, err.name) : (
      console.log({ docs }), callback(docs)
    )
  )
}

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  const db = client.db('users')
  console.log.apply(console, ['Connected successfully'])
  insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close()
    })
  })
})


const findDocsWithFilter = function(db, callback) {
  const collection = db.collection('users')
  //console.log({ array: collection.find().toArray().then(console.log) })
  collection.find({ 'a': 3 }).toArray(function(err, docs) {
    err ? console.error.bind(console, err.name) : (
      console.log({ docs }, "Found the following records"), callback(docs)
    )
  })
}

const updateDocument = function(db, callback) {
  const collection = db.collection('users')
  collection.updateOne({a: 2}), { $set: {b: 1} }, function(err, data) {
    err ? console.error.bind(console, err.name) : (
      console.log({ docs }, 'Updated the document with the field a equals to 2'),
      callback(data)
    )
  }
}

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  const db = client.db('users')
  console.log.apply(console, ['Connected successfully'])
  insertDocuments(db, function() {
    findDocsWithFilter(db, function() {
      client.close()
    })
  })
})


const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
}*/

// -----------------
/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => process.stderr.write('connection error_______'))

db.once('open', () => console.log('opened\n'))


//        HABR
//   1. Именование коллекций
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  data: {
    birthday: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'unactive']
    },
    mix: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }
})

const User = mongoose.model('User', userSchema)
const user = new User({ email: 'test@gmail.com', password: '1234' })

user.save((err, user) => err ? process.stderr.write(err.name) : console.log(user.email))


//     2. Переопределение метода toJSON()
User.findOne({ email: 'test@gmail.com' }, function(user) {
  user.someArea = 'custom value';
  console.log(user.someArea)
  console.log({ user })
})
*/

/*
//  3. Сравнение _id
User.findOne({ password: '1234' }, (err, user1) => {
  User.findOne({ password: '1234' }, (err, user2) => {
    console.log(user1._id === user2._id) // different references
    console.log(user1._id.equals(user2._id))
    console.log(user1._id.toString() == user2._id,toString())
  })
})

//  4. Сохранение mixed-полей
User.findOne({ password: '1234' }, (err, user) => {
  user.data.mix = { msg: 'hello world' }
  user.save((err, user) => console.log('ok success'))
}) // changes will pass to database, ok --- we change field that has already exists in our schema

User.findOne({email: 'test@gmail.com.com'}, (err, user) => {
	user.data.mix.msg = 'Good bye';
  user.markModified('data.mix');
  user.save((err, user) => console.log('without success'))
}); // changes will not pass to db --- we can not add new fields ---- only can change existing
*/
/*
//  6. Отключение автоматического построения индексов
var user_ = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String
}, {
	autoIndex: process.env('mode') == 'development'
});
*/
//  6. autoIndex можно отключать при подключении начиная с версии 3.9.5:
//mongoose.connect('mongodb://localhost/myapp', {autoIndex: process.env.NODE_ENV !== 'production'});


// Введение в Mongoose для MongoDB и Node.js
// Проверка данных перед сохранением

const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: String
  },
  biography: String,
  twitter: {
    type: String,
    validate: {
      validator: function(text) {
        return text.indexOf('https://twitter.com/') === 0
      },
      message: 'Twitter handle must start with https://twitter.com/'
    }
  },
  facebook: {
    type: String,
    validate: {
      validator: function(text) {
        return text.indexOf('https://www.facebook.com/') === 0
      },
      message: 'Facebook must start with https://www.facebook.com/'
    }
  },
  profilePicture: Buffer,
  created: {
    type: Date,
    default: Date.now
  }
})

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  summary: String,
  isbn: String,
  thumbnail: Buffer,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  ratings: [{
    summary: String,
    detail: String,
    numberOfStays: Number,
  }],
  created: {
    type: Date,
    default: Date.now
  }
})*/

mongoose.connect('mongodb://localhost/mongoose_basics', function(err) {
  if (err) throw err
  console.log('Successfully connected')

  const jamieAuthor = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: 'Jamie',
      lastName: 'Munro'
    },
    biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
    twitter: 'https://twitter.com/endyourif',
    facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
  })

  jamieAuthor.save(function(err) {
    if (err) throw err
    console.log('Author successfully saved')

    const mvcBook = new Book({
      _id: new mongoose.Types.ObjectId(),
      title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
      author: jamieAuthor._id,
      ratings: [{
        summary: 'Great read'
      }]
    })

    mvcBook.save(function(err) {
      if (err) throw err
      console.log('Book successfully saved')
    })

    const knockoutBook = new Book({
      _id: new mongoose.Types.ObjectId(),
      title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
      author: jamieAuthor._id
    });

    knockoutBook.save(function(err) {
      if (err) throw err
      console.log('Book successfully saved')
    })
  })
})



var mongoose = require('mongoose');

var Author = require('./author');
var Book = require('./book');

mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
    if (err) throw err;

    console.log('Successfully connected');

    Book.find({
        title: /mvc/i
    }).sort('-created')
    .limit(5)
    .exec(function(err, books) {
        if (err) throw err;

        console.log(books);
    });

    Author.findById('59b31406beefa1082819e72f', function(err, author) {
        if (err) throw err;

        author.linkedin = 'https://www.linkedin.com/in/jamie-munro-8064ba1a/';

        author.save(function(err) {
            if (err) throw err;

            console.log('Author updated successfully');
        });
    });

    Author.findByIdAndUpdate('59b31406beefa1082819e72f', { linkedin: 'https://www.linkedin.com/in/jamie-munro-8064ba1a/' }, function(err, author) {
        if (err) throw err;

        console.log(author);
    });
});
