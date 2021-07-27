/**
 * @Common programming principles:
 * - DRY (don't repeat yourself)
 * - YAGNI (ya ain't gonna need it)
 * - Loose coupling high cohesion
 * - Principle of least surprise
 * - Single responsibility
 *
 * @. All of them are related to functional programming
 */

class Flock {
  constructor(amount) {
    this.amount = amount
  }

  conjoin(flock) {
    this.amount += flock.amount
    return this
  }

  breed(flock) {
    this.amount = this.amount * flock.amount
    return this
  }
}

const flockA = new Flock(4);
const flockB = new Flock(2);
const flockC = new Flock(0);

const result = flockA
  .conjoin(flockC)
  .breed(flockB)
  .conjoin(flockA.breed(flockB))
  .amount;

console.log({ result })

const conjoin = (flock, other) => flock + other
const breed = (flock, other) => flock * other

const flockAF = 4
const flockBF = 2
const flockCF = 0

const resultF = conjoin(breed(conjoin(flockAF, flockCF), flockBF), breed(flockAF, flockBF))

console.log({ resultF })

/******************************************/

const x = 1;
const y = 2;
const z = 3;

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

/** @Associative */

add(add(x, y), z) === add(x, add(y, z));

/** @Commutative */

add(x, y) === add(y, x)

/** @Identity */

add(x, 0) === x;

/** @Distributive */

multiply(x, add(y, z)) === add(multiply(x, y), multiply(x, z));
