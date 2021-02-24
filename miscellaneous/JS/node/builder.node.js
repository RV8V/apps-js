'use strict'

const CarBuilder = class {
  constructor() {
    this.car = new Car()
  }

  addAutoPilot(autoPilot) {
    this.car.autoPilot = autoPilot;
    return this;
  }

  addPowerfulEngine(newEngine) {
    this.car.newEngine = newEngine;
    return this;
  }

  addSignal(signal) {
    this.car.signal = signal;
    return this;
  }

  build() {
    return this.car;
  }
}

const Car = class {
  constructor() {}
}


const car = new CarBuilder()
  .addAutoPilot(true)
  .addSignal(true)
  .addPowerfulEngine('v8')
  .build()
