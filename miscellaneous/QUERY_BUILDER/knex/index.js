const knex = require('./db/knex')

const start = async () => {
  await knex.raw(`create table if not exists subscriptions(id serial primary key, csr_email text);`)
  await knex.raw(`create table if not exists subscription_orders(id serial primary key, sequence_id text default null, order_name text, subscription_id integer references subscriptions(id));`)
  await knex.raw(`create table if not exists subscription_work_orders(id serial primary key, sequence_id text default null, work_name text, subscription_order_id integer references subscription_orders(id));`)

  await knex.raw(`insert into subscriptions(id, csr_email) values(1, "first#gmail.com");`);
  await knex.raw(`insert into subscriptions(id, csr_email) values(2, "second#gmail.com");`);

  await knex.raw(`insert into subscription_orders(id, order_name, subscription_id) values(1, "order 1", 1);`);
  await knex.raw(`insert into subscription_orders(id, order_name, subscription_id) values(2, "order 2", 2);`);
  await knex.raw(`insert into subscription_orders(id, order_name, subscription_id) values(3, "order 3", 2);`);
  await knex.raw(`insert into subscription_orders(id, order_name, subscription_id) values(4, "order 4", 2);`);

  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(1, "work 1", 1);`);
  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(2, "work 2", 1);`);
  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(3, "work 3", 2);`);
  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(4, "work 4", 2);`);
  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(5, "work 5", 3);`);
  await knex.raw(`insert into subscription_work_orders(id, work_name, subscription_order_id) values(6, "work 6", 4);`);
}

start()
