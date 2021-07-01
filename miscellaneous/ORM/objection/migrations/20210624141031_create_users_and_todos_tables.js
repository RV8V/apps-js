exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
  .createTable('todos', function(table) {
    table.increments()
    table.string('title').notNullable()
    table.boolean('completed').notNullable().defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.integer('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos').dropTable('users')
};
