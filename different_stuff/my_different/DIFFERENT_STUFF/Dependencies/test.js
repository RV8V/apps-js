'use strict'

// componemts are controlling its dependencies
function Wheels() {
  this.action = () => console.log('The wheels go round and round')
}

function Pistons() {
  this.action = () => console.log('The pistons fire up and down')
}

/*function Engine() {
  this.pistons = new Pistons() // engine controls its dependencies -- pistons
  this.action = () => { // engine depemds on pistons -- what if pistons were an empty ? pistons than did not had method actions
    this.pistons.action()
    console.log('The engine goes vroom vroom')
  }
  console.log('Made an engine')
}*/

/*function Car() {
  this.wheels = new Wheels() // tigth coupling
  this.engine = new Engine() // direct dependencies
  this.action = () => {
    this.wheels.action()
    this.engine.action()
    console.log('The car drives well')
  }
  console.log('Made a car')
}

const car = new Car()
car.action()*/

// You can't easily swap out "piston" with "test piston."

/*
Let's invert that, so the components are no longer in control

Inversion of control removes the direct dependencies,
and dependency injection is how instances are passed to components.
*/

function TestPistons() {
  this.action = () => console.log('The test pistons do nothing')
  console.log('Made some test pistons')
}

function Engine(pistons) {
  /*
   Notice it depends on pistons but doesn't explicitly
   reference the implementation and simply references the label.
  */
  this.pistons = pistons
  this.action = () => {
    this.pistons.action()
    console.log('The engine goes vroom vroom')
  }
  console.log('We made an engine')
}

function Car(wheels, engine) {
  this.wheels = wheels
  this.engine = engine
  this.action = () => {
    this.wheels.action();
    this.engine.action();
    console.log("The car drives by.");
  }
  console.log("Made a car.");
}

const pistons = new Pistons()
const testPistons = new TestPistons()
const wheels = new Wheels
const engine = new Engine(pistons)
const testEngine = new Engine(testPistons)
const car = new Car(wheels, engine)
car.action()
testEngine.action()

// we solved  #3 problem --- You can't easily swap out "piston" with "test piston."

/*
1. The components depend directly on each other
2. You cannot develop components in parallel.
The tight coupling means it's not possible to have a developer working on engines while another is working on pistons.

The previous issues (#1 and #2) have not been addressed.
Notice that the objects must be created in the right order.
Including or creating them out of order will result in failure.
*/

/*
The solution is to bring in an IoC (short for Inversion of Control)
container to manage Dependency Injection
*/
