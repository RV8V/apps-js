
exports.up = function(knex) {
  return knex.schema.createTable('students', function(table) {
    table.integer('id').primary()
    table.string('name')
  })
  .createTable('courses', function(table) {
    table.integer('id').primary()
    table.string('title')
  })
  .createTable('enrollments', function(table) {
    table.integer('student_id').references('id').inTable('students')
    table.integer('course_id').references('id').inTable('courses')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('enrollments')
    .dropTableIfExists('courses')
    .dropTableIfExists('students')
};
