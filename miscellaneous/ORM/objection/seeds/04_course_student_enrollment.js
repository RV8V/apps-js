
exports.seed = async function(knex) {
  await knex('enrollments').del()
  await knex('courses').del()
  await knex('students').del()

  await knex('students').insert([
    {
      id: 1,
      name: 'lyn'
    },
    {
      id: 2,
      name: 'ben'
    },
    {
      id: 3,
      name: 'hail'
    },
  ])

  await knex('courses').insert([
    {
      id: 1,
      title: 'javascript'
    },
    {
      id: 2,
      title: 'ruby'
    },
  ])

  await knex('enrollments').insert([
    {
      student_id: 1,
      course_id: 1
    },
    {
      student_id: 1,
      course_id: 2
    },
    {
      student_id: 2,
      course_id: 2
    },
    {
      student_id: 3,
      course_id: 1
    },
  ])
};
