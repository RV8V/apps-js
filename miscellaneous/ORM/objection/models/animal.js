const { Model } = require('objection')

class AnimalModel extends Model {
  static get tableName() {
    return 'animals'
  }

  static get relationMappings() {
    const PersonModel = require('./person.js')

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonModel,
        join: {
          from: 'animals.person_id',
          to: 'persons.id'
        }
      }
    }
  }
}

module.exports = AnimalModel
