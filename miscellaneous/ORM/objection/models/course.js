const { Model } = require('objection')

class Course extends Model {
  static tableName = 'courses'
}

module.exports = Course
