const Parse = require('parse/node')

Parse.initialize('OST3ZAhqAT1zjJJTTRydz6Pnx6bYg05NQmejRCME', 'gdpMc7xfEBb34MI6HwlKdEUL97NUPa2xcIQGAJY2')
Parse.serverURL = 'https://parseapi.back4app.com'

const Person = Parse.Object.extend('Person')
const query = new Parse.Query(Person)

async function run() {
  try {
    const person = await query.get('jv0OqZjfzq')
    // console.log({ name: person.get('name'), age: person.get('age') })

    // person.addUnique('skills', 'computing')
    // person.addUnique('skills', 'computing')

    // person.remove('skills', 'computing')

    // person.unset('age')

    // person.destroy()

    person.save()

    // person.increment('age', 1)
    // person.save()
    // person.fetch()
    // console.log({ name: person.get('name'), age: person.get('age') })
  } catch(err) {
    console.log(err)
  }
}

run()

// const Person = Parse.Object.extend('Person')
//
// const person = new Person()
//
// person.set('name', 'Alex')
// person.set('age', 30)
//
// person.save()

// const Person = Parse.Object.extend('Person', {
//   isAdult: function() {
//     return this.get('age') > 18
//   },
//   initialize: function(arrtibutes, options) {
//     this.hasChildren = false
//   }
// }, {
//   create: function(livingCity) {
//     const person = new Person()
//     person.set('livingCity', livingCity)
//     return person
//   }
// })
//
// const person = Person.create('san fran')
//
// person.set('name', 'person name')
//
// person.save()
//
// console.log({ person, hasChildren: person.hasChildren, livingCity: person.get('livingCity') })
