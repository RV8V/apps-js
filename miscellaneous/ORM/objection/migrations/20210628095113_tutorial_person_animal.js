
exports.up = function(knex) {
  return knex.schema.createTable('persons', function(table) {
    table.increments('id').primary()
    table.string('name')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
  .createTable('animals', function(table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('person_id').references('persons.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('animals')
    .dropTableIfExists('persons')
};
