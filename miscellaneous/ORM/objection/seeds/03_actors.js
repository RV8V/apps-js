exports.seed = async function(knex) {
  await knex.raw('truncate table actors cascade')
  await knex.raw('truncate table channels cascade')
  await knex.raw('truncate table videos cascade')

  await knex('channels').insert([
    { id: 1, name: 'channel 1' },
    { id: 2, name: 'channel 2' },
  ])

  await knex('actors').insert([
    { id: 1, name: 'user 1', email: 'email 1', channel_id: 1 },
    { id: 2, name: 'user 2', email: 'email 2', channel_id: 2 },
  ])

  return knex('videos').insert([
    { id: 1, title: 'title 1', channel_id: 1 },
    { id: 2, title: 'title 2', channel_id: 2 },
  ])
};
