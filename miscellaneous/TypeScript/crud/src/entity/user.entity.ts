export default class User {
  _id!: string 
  name!: string
  email!: string
  password!: string
  created: string
  lastVisit: string

  constructor() {
    const date = Date.now().toString()
    this.created = date
    this.lastVisit = date
  }
}
