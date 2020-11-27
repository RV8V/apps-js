'use strict'
// @flow

type User = { id?: string, name: string }

const fn = ({ id }: { id: string }) => {
  console.log(id)
}

const fn_ = (entry: { +id: ?string }) => {
  console.log(entry)
  //entry.id = null
}

function ensureId(id: mixed): boolean %checks {
  return typeof id === 'string'
}

declare var user: User

if (ensureId(user.id)) {
  const { id } = user
  //fn_({ id }) // with calling this function - it invalid user.id makes it typeof of null --- probably
  user.id.includes('-')
}
