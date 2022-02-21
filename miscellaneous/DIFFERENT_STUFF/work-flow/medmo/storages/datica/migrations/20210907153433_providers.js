const tableName = 'providers';

exports.tableName = tableName;

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable(tableName);

  if (exists) return null;

  await knex.schema.createTable(tableName, (t) => {
      t.integer('ID').notNullable().primary();
      t.string('UserName', 45).notNullable();
      t.string('FirstName', 50).defaultTo(null);
      t.string('LastName', 50).defaultTo(null);
      t.string('PhoneNumber', 45).defaultTo(null);
      t.string('Dob', 45).defaultTo(null);
      t.string('Zip', 50).defaultTo(null);
      t.string('Password', 255).defaultTo(null);
      t.string('Token', 255).defaultTo(null);
      t.integer('UserID').notNullable();
      t.timestamp('Created').defaultTo(knex.fn.now());
      t.timestamp('Updated').defaultTo(knex.fn.now());
  });

  return knex.schema.alterTable(tableName, (t) => {
      t.specificType('ID', 'int(11) AUTO_INCREMENT').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
