'use strict'
// @flow

class User {}
class Owner extends User {}
class Admin extends Owner {}

class BaseProcessor {
  getRelatedUser(owner: Owner): Owner {
    return owner
  }
}

class ChildProcessor extends BaseProcessor {
  // input:  User <+-- Owner --!> Admin // covariance
  // output: User <!-- Owner --+> Admin // contvariance
  //         User <!-- Owner --!> Admin // invariance

  getRelatedUser(owner: User): Admin {
    declare var o: Admin
    return o
  }
}


// next
const logger = (entity: { +name: ?string }) => console.log(entity.name)

type Entity = { name: string }

const foo: Entity = { name: 'John' }

logger(foo)

// next

type Entity_ = {
  process: (x: string) => number
}

const r: Entity_ = {
  //process(x: mixed): (number | string) {
  //  return 5
  //}
}
