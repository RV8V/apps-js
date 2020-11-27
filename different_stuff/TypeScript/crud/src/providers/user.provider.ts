import DataProvider from './data.provider'
import User from '../entity/user.entity'

export default class UserDataProvider extends DataProvider {
  constructor() {
    super('User')
  }

  public select(where: any, onSelect: (err: any, user: User[]) => void) {
    this.dbStore.find(where, onSelect)
  }

  public findOne(where: any, onSelect: (err: any, user: User) => void) {
    this.dbStore.findOne(where, onSelect)
  }

  public create(data: User, onCreate: (err: any, newUser: User) => void) {
    this.dbStore.insert(data, onCreate)
  }

  public update(where: any, newData: User, onUpdata?: (err: any, numReplaced: number) => void) {
    this.dbStore.update(where, { $set: newData })
  }

  public delete(where: any, onDelete: (err: any, numReplaced: number) => void) {
    this.dbStore.remove(where, { multi: true }, onDelete)
  }

  protected onLoadStore(err: any): void {
    if (err) console.log(err)
  }
}
