const { Model } = require('objection')

class Student extends Model {
  static tableName = 'students'

  static get relationMappings() {
    const Course = require('./course.js')
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'students.id',
          through: {
            from: 'enrollments.student_id',
            to: 'enrollments.course_id'
          },
          to: 'courses.id'
        }
      }
    }
  }
}

module.exports = Student
