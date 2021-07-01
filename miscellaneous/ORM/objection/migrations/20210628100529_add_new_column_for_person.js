
exports.up = function(knex) {
  return knex.schema.alterTable('persons', function(t) {
    t.integer('parent_id').references('persons.id').alter()
  })
};

exports.down = function(knex) {
  // return knex.schema.dropColumnIfExists('parent_id')
};
