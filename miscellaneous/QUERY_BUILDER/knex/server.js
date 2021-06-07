const express = require('express')
const bodyParser = require('body-parser')
const knexPopulate = require('knex-populate')
const knex = require('./db/knex')

const port = process.env.PORT || 4000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const start = async () => {
  const [seqId, table] = await Promise.all([
    knex.raw(`select count(*) from todos where user_id = 1`),
    knex.raw('select * from todos left join users on todos.user_id = users.id where todos.user_id = 2')
  ])

  console.log({ seqId, table: table.rows.shift() })
  // const { rows } = await knex.raw('select * from todos left join users on todos.user_id = users.id where todos.user_id = 2')
  // console.log({ rows });
}

start()

app.get('/todos', async (req, res) => {
  knex.raw('select * from todos').then(todos => {})
  res.send(
    await knex.select().from('todos')
  )
})

app.get('/todos/:id', async (req, res) => {
  req.params.id && res.send(
    (await knex.raw(`select * from todos where id = ${req.params.id}`)).rows
  )
  const record = await knex.select().from('todos').where('id', req.params.id)
})

app.post('/todos', async (req, res) => {
  try {
    await knex.raw('insert into todos(title, user_id) values(?, ?)', ['go to play', '1'])

    await knex('todos').insert({
      title: 'some shortcut sports',
      user_id: 2
    })
  } catch(err) {
    throw new Error(err.name)
  }
  res.send(await knex.select().from('todos'))
})

app.put('/todos/:id', async (req, res) => {
  req.params.id && await knex.raw('update todos set ' + req.body.field + ' = ? ' + 'where id = ?', [req.body.value, req.params.id])
  res.send(
    await knex.select()
      .from('todos')
      .where('id', req.params.id)
  )

  res.send(
    await knex('todos').update({
      title: req.body.value
    })
      .where('id', req.params.id)
  )
})

app.get('/todos-users', async (req, res) => {
  const records = await knex.raw('select * from todos left join users on todos.user_id = users.id')
  const data = await knex.from('todos')
    .leftJoin('users', 'todos.user_id', 'users.id')

  res.send(data.map(record => ({
    id: record.id,
    title: record.title,
    completed: record.completed,
    created_at: record.created_at,
    updated_at: record.updated_at,
    user_id: record.user_id,
    user: {
      name: record.name,
      email: record.email
    }
  })))
})

app.delete('/todos/:id', async (req, res) => {
  await knex.raw('delete from todos where id = ?', req.params.id)
  await knex('todos').del().where('id', req.params.id)
})

app.get('/todos-populate', async (req, res) => {
  knexPopulate(knex, 'todos')
    .find()
    .populate('users', 'user_id')
    .exec()
  .then(records => {
    res.send(records)
  })
})

app.listen(port, () => console.log('server handling on port ' + port))
