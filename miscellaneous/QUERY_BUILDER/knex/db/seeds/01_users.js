exports.seed = function(knex) {
  return knex('users').del()
    .then(function() {
      return knex('users').insert([
        { id: 1, name: 'jake', email: 'jake@gmail.com' },
        { id: 2, name: 'rob', email: 'rob@gmail.com' },
        { id: 3, name: 'hok', email: 'hok@gmail.com' },
      ]);
    });
};
