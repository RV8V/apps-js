
exports.seed = async function(knex) {
  await knex('animals').del()
  await knex('persons').del()

  await knex('persons').insert([
    {
      id: 1,
      name: 'lyn',
      parent_id: 3
    },
    {
      id: 2,
      name: 'ben',
      parent_id: 1
    },
    {
      id: 3,
      name: 'hail',
      parent_id: 2
    },
  ])

  await knex('animals').insert([
    {
      id: 1,
      name: 'gog',
      person_id: 1
    },
    {
      id: 2,
      name: 'asi',
      person_id: 1
    },
    {
      id: 3,
      name: 'vom',
      person_id: 2
    },
    {
      id: 4,
      name: 'polk',
      person_id: 3
    },
  ])
};
