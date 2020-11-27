import * as path from 'path'
import nedb from 'nedb'

export default abstract class DataProvider {
  static readonly DATABASE_STORE = path.normalize(__dirname + '../../db/')

  protected dbStore: nedb
  protected abstract onLoadStore(err: any): void

  constructor(dbStoreName = 'data') {
    this.dbStore = new nedb({
      filename: DataProvider.DATABASE_STORE + dbStoreName + '.db'
    })

    this.dbStore.loadDatabase(err => {
      this.onLoadStore(err)
    })
  }
}
