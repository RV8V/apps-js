
db.users.insertOne(
  { "name":"John", "email":"test@mail.ru", "age":23, "hasCar":true,
  "favColor": ["Black", "Green"], "child": { "name":"Jack", "age":5, "surname": "Charley" } }
)

db.users.insertOne(
  { _id: 2, "name":"John", "email":"test@mail.ru", "age":43, "hasCar":false,
  "favColor": ["Grey", "White"], "child": { "name":"Jack", "age":5, "surname": "Charley" } }
)

db.users.insertOne(
  { "name":"John", "email":"test@mail.ru", "age":23, "hasCar":true,
  "favColor": ["Black", "Green"], "password":"asdf88" }
)

db.users.insertOne(
  { "name":"George", "email":"admin@mail.ru", "age":23, "hasCar":true,
  "favColor": ["Black", "Green"], "birthday": new Date('1996-11-27') }
)

db.users.insertMany([
  { "name":"Andrey", "email":"andrey@mail.ru", "age":23, "hasCar":true,
  "favColor": ["Black", "Green"], "birthday": new Date('1996-11-27') },
  { "name":"Bob", "email":"admin@mail.ru", "age":23, "hasCar":true,
  "favColor": ["Black", "Green"], "birthday": new Date('1996-11-27') }
])

// sorting
db.users.find()

db.users.find().limit(2)

db.users.find({}, {_id: 0}).limit()

db.users.find({}, {_id: 0}).sort({age: 1}) // sort by increasing value
db.users.find({}, {_id: 0}).sort({age: -1}) // vice versa

db.users.find({}, {_id: 0}).sort({age: -1, email: 1}) // alphabet sorting

db.users.find({age: 23, _id: 2}, {_id: 0}) // alphabet sorting // both age and _id we are looking for


db.users.find({$or: [{age: 23}, {email: "andrey@mail.ru"}]}) // age or _id

db.users.find({$or: [{age: 23}, {email: "andrey@mail.ru"}]}).limit(1).sort({age: 1}) // age or _id

db.users.find({$or: [{age: {$lt: 38}}, {email: "andrey@mail.ru"}]}) // looking for all person whose age is < (lt = less then) 38 or email = "andrey"
db.users.find({$or: [{age: {$gt: 38}}, {email: "andrey@mail.ru"}]}) // looking for all person whose age is > (gt = greater then) 38 or email = "andrey"
db.users.find({$or: [{age: {$gte: 38}}, {email: "andrey@mail.ru"}]}) // looking for all person whose age is >= (gte = greater then or equal) 38 or email = "andrey"
db.users.find({$or: [{age: {$lte: 38}}, {email: "andrey@mail.ru"}]}) //

db.users.find({$or: [{age: {$eq: 38}}, {email: "andrey@mail.ru"}]}) // equals to value age = 38
db.users.find({$or: [{age: {$ne: 38}}, {email: "andrey@mail.ru"}]}) // not equals to value age != 38


db.users.find({name: {$in: ["Jack", "Bob"]}}, {_id: 0}) // looking for name ___ or in means in (inside) literaly

db.users.find({child: {$exists: true}}, {_id: 0}) // our object has field "child"

db.users.find({ favColor: {$size: 2} }, {_id: 2} ) // size of array equals 2 elements

db.users.find({ "favColor.1": "Black"}, {_id: 0} ) // "favColor.1" means element by first index = "Black"

db.users.find({ favColor: {$elemMatch: {$lte: "a"}} }, {_id: 0} ) // looking for all elements that are (lte = less then or equals "a") // can use with numbers too!


// delete and update data
db.users.updateOne({age: 23}, {$set: {age: 25}}) // change value of age equals 23 || for one object // we want age = 25

db.users.updateMany({age: 23}, {$set: {age: 25}}) // change value of age equals 23 || not for one object // we want age = 25

db.users.updateMany({age: 25}, {$set: {name: "User", email: "test@mail.ru"}}) // change value of age equals 23 || not for one object // we want age = 25
// in first object we choose filter (what objects we want to choose) ---- what we are looking for || second object ---- what we want to changr
// we change only certain field not a "full object"


db.users.replaceOne({age: 23}, /*what we want to have in new object*/ {name: "New User", hasCar: 23, password: "234", hasWife: true})
// chhose only one object that has age equals to 23 and change it (it means this choosen object) on second obkect in "replaceOne"



// deleting data (objects)
db.users.deleteMany({age: {$gt: 22}, age: {$lt: 38}}) // 22 < age < 38


// unit several requests i ndataBase || separate command writes as an object
db.users.bulkWrite([
  {
    insertOne: {
      "document": {name: "Mike", age: 45, email: "helloMe@gmail.com"}
    }
  },
  // each command represents as a concrete object
  {
    deleteOne: {
      filter: {age: 43} // if filter is an empty object ( {} ) --- we delete all objects in dataBase
    }
  },
  // we can choose only one object (updaateOne || deleteOne) not "Many" (deleteMany or updateMany...)
  {
    updateOne: {
      filter: {name: "Mike"}, // what we want to delete (all objects that contains field " name = 'Mike' ")
      update: {$set: {email: "new_email@gmail.com___"}}// and for them we want to replate (change) for example --- "email"
    }
  },
  // replace concrete object
  {
    replaceOne: {
      filter: {name: "John"},
      replacement: {name: "JOHN--JOHN", age: 55, email: "MyEmail@MyEmail.coM"}}
    }
  }
])



/* finding writings("записи в коллекции") that contain certain piece of text
 first add collection "articles" by addind elemrnt in not existing collection "articles" */

 db.articles.insertMany([
   {
     "title": "companies are growing",
     "anons": "getting new levels very fast",
     "text": "cool text, without any ideas",
     "date": new Date('2020-11-11')
   },
   {
     "title": "going better every day",
     "anons": "coll anons",
     "text": "text about text...",
     "date": new Date('2020-04-06')
   }
 ])


// index
db.articles.createIndex({title: "text", anons: "text", text: "text"}) // match what foelds we are working with
db.articles.find({ $text: {$search: "going"} }) // that writings that have concrete text
db.articles.find({ $text: {$search: "better"} })

db.articles.find({ $text: {$search: "coll better"} }) // look for all writings that have or "better" or "going"

// relevance || first the most relevant || in the end the least
db.articles.find(
  { $text: {$search: "coll better"} },
  { score: {$meta: "textScore"} } // use parameter score to sort objects
).sort({ score: {$meta: "textScore" } }) // sort by field score


// data
db.users.count({ age: 18 }) // count objects by concrete filter
db.useers.distinct("email") // want to know all emails of all objects without repeating objects


// agregation ---- uniting different data
// sum thei age || when name im one object equals name in anouther one
db.users.aggregate([
  {$match: {}}, /*{$match: {name: "John"}}*/  // match --- filter |\ {} means that filter in not here --- all objects are sorted
  {$group: {_id: "$name", age: {$sum: "$age"}}} // whow we want to group || choose field to unite all ( {_id: {"$name"}} )
  // second parameter --- what we want to do with other it`s parameters --- sum 
])
