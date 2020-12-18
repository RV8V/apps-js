'use strict'
// @flow

// first
type Foo = { name: string }
type Bar = { name: string }

declare var a: Foo
const b: Bar = a

// second
class Foo_ {
  render() { return 30 }
}

class Bar_ {
  render() { return 30 }
}

declare var s: Foo_
//const b_: Bar_ = s


// third
class Base {}
class First extends Base {}
class Second extends Base {}

declare var first: First
//const second: Base = first
//const t: Second = second
