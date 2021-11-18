const Interface = require('../start-patterns/interface-implementation.js')

const DuckInterface = Interface('DuckInterface', {
  quack: function() {},
  fly: function() {}
})

const TurkeyInterface = Interface('TurkeyInterface', {
  gobble: function() {},
  fly: function() {}
})

class MallowDuck {
  quack() { console.log('quack MallowDuck') }
  fly() { console.log('fly MallowDuck') }
}

class WildTurkey {
  gobble() { console.log('gobble WildTurkey') }
  fly() { console.log('fly WildTurkey') }
}

class TurkeyAdapter {
  constructor(turkey) {
    this.turkey = turkey
  }

  quack() {
    this.turkey.gobble()
  }

  fly() {
    for (let i = 0; i < 4; ++i) {
      this.turkey.fly()
    }
  }
}

const mallowDuck = new MallowDuck()
const wildTurkey = new WildTurkey()
const turkeyAdapter = new TurkeyAdapter(wildTurkey)

Interface.implement(turkeyAdapter, DuckInterface)
Interface.implement(wildTurkey, TurkeyInterface)
Interface.implement(mallowDuck, DuckInterface)

const duckLikeEntities = [turkeyAdapter, mallowDuck]

duckLikeEntities.forEach(duck => duck.fly())
