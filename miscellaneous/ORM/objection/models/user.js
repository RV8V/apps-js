const { Model } = require('objection')

class UserModel extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const TodoModel = require('./todo.js')
    return {
      todo: {
        relation: Model.HasManyRelation,
        modelClass: TodoModel,
        join: {
          from: 'users.id',
          to: 'todos.user_id'
        }
      }
    }
  }
}

module.exports = UserModel
