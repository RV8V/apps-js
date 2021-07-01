exports.up = function(knex) {
  return knex.schema
  .createTable('channels', function(table) {
    table.increments()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
  .createTable('actors', function(table) {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.integer('channel_id').references('id').inTable('channels')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
  .createTable('videos', function(table) {
    table.increments()
    table
      .string('title')
      .notNullable()
    table
      .integer('channel_id')
      .references('id')
      .inTable('channels')
    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
    table
      .timestamp('updated_at')
      .defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('actors')
    .dropTable('channels')
    .dropTable('videos')
};
