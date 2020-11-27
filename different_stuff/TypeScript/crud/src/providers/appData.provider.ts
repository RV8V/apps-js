import DataProvider from './data.provider'
import UserDataProvider from './user.provider'

export default class ApplicationDataProvider {
  private storage: DataProvider[]

  constructor() {
    this.storage = this.getProviders().map(provider => new provider())
  }

  public getInstanceProvider(type: any): any | null {
    const items = this.storage.filter(provider => {
      if (provider instanceof type) return provider
    })
    return items.length > 0 ? items[0] : null
  }

  public get user(): UserDataProvider {
    return this.getInstanceProvider(UserDataProvider)
  }

  private getProviders(): any[] {
    return [UserDataProvider]
  }
}
