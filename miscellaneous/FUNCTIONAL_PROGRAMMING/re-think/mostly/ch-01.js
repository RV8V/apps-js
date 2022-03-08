class Flock {
  constructor(items) {
    this.items = items;
  }

  breed(flock) {
    this.items = this.items + flock.items;
    return this;
  }

  con(flock) {
    this.items = this.items * flock.items;
    return this;
  }
}

const f1 = new Flock(1);
const f2 = new Flock(2);
const f3 = new Flock(3);

const result1 = f1.con(f2).breed(f3).con(f1.breed(f3));

// console.log({ result1 });

/******************************/

// const p1 = 1;
// const p2 = 2;
// const p3 = 3;

// const con = (f1, f2) => f1 * f2;
// const breed = (f1, f2) => f1 + f2;

// const r = con(breed(p3, con(p1, p2)), breed(p1, p3));

// console.log({ r });

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const flockA = 4;
const flockB = 2;
const flockC = 0;
const result = add(
  multiply(flockB, add(flockA, flockC)),
  multiply(flockA, flockB)
);

console.log({ result });
