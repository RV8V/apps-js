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

const Address = Parse.Object.extend('Address', {}, {
  create: function(streetName, number, owner) {
    return new Address()
      .set('streetName', streetName)
      .set('number', number)
      .set('user', owner)
      .save()
  }
})

// const query = new Parse.Query(Person)

async function run() {
  try {
    const person = await Person.create('one to one', 22, 'one', ['swimming'])
    const address = await Address.create('one to one test', 11, person)

    // const Person = Parse.Object.extend('Person')
    // const Address = Parse.Object.extend('Address')

    // const person = new Person()
    // person.set('name', '1')
    // person.save()
    //
    // console.log({ person })

    // console.log({ p })

    // const address = new Address()
    // address.set('str', '123')
    // address.set('user', person)
    // address.save()

  } catch(err) {
    console.log(err)
  }
}

run()
