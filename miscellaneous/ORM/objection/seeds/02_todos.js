exports.seed = async function(knex) {
  await knex.raw('truncate table todos cascade')

  return knex('todos').del()
    .then(function() {
      return knex('todos').insert([
        { id: 1, title: 'go home', user_id: 3 },
        { id: 2, title: 'go shopping', user_id: 2 },
        { id: 3, title: 'make lessons', user_id: 1 }
      ]);
    });
};
