const Parse = require('parse/node')

Parse.initialize('OST3ZAhqAT1zjJJTTRydz6Pnx6bYg05NQmejRCME', 'gdpMc7xfEBb34MI6HwlKdEUL97NUPa2xcIQGAJY2')
Parse.serverURL = 'https://parseapi.back4app.com'

async function run() {
  try {
    const Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person)

    // query.equalTo('name', 'Alex')
    // query.equalTo('age', 55)

    // query.notEqualTo('age', 55)
    // query.notEqualTo('name', 'name')

    // query.equalTo()
    // query.notEqualTo()
    // query.greaterThan()
    // query.greaterThanOrEqualTo()
    // query.lessThan()
    // query.lessThanOrEqualTo()

    const result = await query.find()

    // console.log({ result })

    for (let i = 0; i < result.length; ++i) {
      const thisObject = result[i]

      console.log({ name: thisObject.get('name'), age: thisObject.get('age') })
    }

    // new Person().set('name', 'Alex').set('age', 55).save()
  } catch(err) {
    console.log(err)
  }
}

run()
