const { curry, lift, chain, map } = require('ramda')
const { Future } = require('ramda-fantasy')

const stringify = v => JSON.stringify(v)

const homePage = curry((user, posts) => `
    someJsx:
      user  -> ${stringify(user)}
      posts -> ${stringify(posts)}
`)

const lifted = lift(homePage)

const currentUserFuture = Future.of({ id: 1 })
const userFuture = id => Future.of({ id: id, handle: 'async parallel operations with applicative functors revisited' })

const getUserFuture = currentUserFuture.chain(user => userFuture(user.id))

const postsFuture = Future.of([
  { id: 12, title: 'title for post-12' }
])

lifted(getUserFuture, postsFuture).fork(
  err => console.log({ err }),
  data => console.log({ data })
)
