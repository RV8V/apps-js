const { Model } = require('objection')

class PersonModel extends Model {
  static get tableName() {
    return 'persons'
  }

  static get relationMappings() {
    const AnimalModel = require('./animal.js')

    return {
      animals: {
        relation: Model.HasManyRelation,
        modelClass: AnimalModel,
        join: {
          from: 'persons.id',
          to: 'animals.person_id'
        }
      }
    }
  }
}

module.exports = PersonModel
