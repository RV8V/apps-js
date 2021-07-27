const { lift, curry } = require('ramda')
const { Future } = require('ramda-fantasy')

/** @: homePage :: User -> [Posts] -> Html */
const homePage = curry((user, posts) => `
    someJsx:
      users=${JSON.stringify(user)}
      posts=${JSON.stringify(posts)}
`)

/** @: lifted :: Apply f => f User -> f [Posts] -> f Html */
const lifted = lift(homePage)

/** @: userFuture :: Future Error User */
const userFuture = Future.of({ id: 1, handle: 'user-1' })

/** @: postsFuture :: Future Error [Post] */
const postsFuture = Future.of([
  { id: 12, title: 'async parallel operations with Applicative functors' }
])

/** @: Application Boundry */
lifted(userFuture, postsFuture).fork(
  err => console.log({ err }),
  data => console.log({ data })
)
