
interface Person {
  readonly name: string
  readonly username: string
}
// 1.
type PersonKeys = keyof Person // 'name' | 'username'

let username: PersonKeys = 'name'
username = 'username' // username = 'hello'

// 2.
type User = {
  _id: number
  name: string
  email: string
  createdAt: Date
}

type NotAllKeys = Exclude<keyof User, '_id' | 'createAt'> // 'name' | email
type NotAll = Pick<User, 'name' | 'email'> // 'name' | 'createAt'

let naming: NotAllKeys = 'name'
naming = 'email' // naming = 'hello world'

const attempt: NotAll = {
  name: 'name',
  email: 'email'
}
