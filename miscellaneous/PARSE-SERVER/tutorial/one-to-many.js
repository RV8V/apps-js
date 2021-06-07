const Parse = require('parse/node')

Parse.initialize('OST3ZAhqAT1zjJJTTRydz6Pnx6bYg05NQmejRCME', 'gdpMc7xfEBb34MI6HwlKdEUL97NUPa2xcIQGAJY2')
Parse.serverURL = 'https://parseapi.back4app.com'

const Person = Parse.Object.extend('Person', {}, {
  create: function(name, age, livingCity, skills) {
    return new Person()
      .set('name', name)
      .set('age', age)
      .set('livingCity', livingCity)
      .set('skills', skills)
      .save()
  }
})

// const Post = Parse.Object.extend('Post', {}, {
//   create: function(name, owner) {
//     return new Post()
//       .set('name', name)
//       .set('owner', owner)
//       .save()
//   }
// })

async function run() {
  try {
    const Post = Parse.Object.extend('Post')

    const person = await Person.create('one to many', 100, 'one many', ['going'])
    const postOne = new Post()
      .set('title', 'first title')
      .set('owner', person)
    const postTwo = new Post()
      .set('title', 'second title')
      .set('owner', person)
    const postThree = new Post()
      .set('title', 'last title')
      .set('owner', person)

    postOne.save()
    postTwo.save()
    postThree.save()

  } catch(err) {
    console.log(err)
  }
}

run()
