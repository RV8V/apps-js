'use strict'

'C13 = 9303 % 13 = 8'

const AirPlane = class {
  constructor(
    size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance
  ) {
    this.size = size
    this.minTurningRadius = minTurningRadius
    this.minCirclingRadius = minCirclingRadius
    this.speed = speed
    this.weight = weight
    this.capacity = capacity
    this.fuelSpillage = fuelSpillage
    this.lifting = lifting
    this.distance = distance
  }
}

const Airline = class {
  constructor(planes) {
    this.planes = planes
    this.capacity = 0
    this.lifting = 0
  }

  calculateCapacityAndLifting() {
    return [
      {
        capacity: this.calculateOveralCapacity(),
        lifting: this.calculateOveralLifting()
      },
      this
    ]
  }

  calculateOveralCapacity() {
    return this.capacity = this.planes.reduce((acc, value) => acc + value.capacity, 0)
  }

  calculateOveralLifting() {
    return this.lifting = this.planes.reduce((acc, value) => acc + value.lifting, 0)
  }

  sortByDistance() {
    return this.planes.sort((a, b) => a.distance - b.distance)
  }

  getByRange(min, max) {
    return this.planes.filter(plane => {
      return min <= plane.fuelSpillage && plane.fuelSpillage < max
    })
  }
}

const FighterPlaine = class extends AirPlane {
  constructor(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance) {
    super(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance)
  }

  getCapacity() {
    return this.capacity
  }

  getLifting() {
    return this.lifting
  }
}

const TorpedoBomber = class extends AirPlane {
  constructor(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance) {
    super(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance)
  }

  getCapacity() {
    return this.capacity
  }

  getLifting() {
    return this.lifting
  }
}

const PassengerPlane = class extends AirPlane {
  constructor(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance) {
    super(size, minTurningRadius, minCirclingRadius, speed, capacity, fuelSpillage, weight, lifting, distance)
  }

  getCapacity() {
    return this.capacity
  }

  getLifting() {
    return this.lifting
  }
}

const inputAirPlane = {
  size: 100,
  minTurningRadius: 200,
  minCirclingRadius: 300,
  speed: 400,
  capacity: 500,
  fuelSpillage: 600,
  weight: 700,
  lifting: 800,
  distance: 900
}

const inputPassengerPlane = {
  size: 101,
  minTurningRadius: 201,
  minCirclingRadius: 301,
  speed: 401,
  capacity: 501,
  fuelSpillage: 601,
  weight: 701,
  lifting: 801,
  distance: 901
}

const inputTorpedoBomber = {
  size: 102,
  minTurningRadius: 202,
  minCirclingRadius: 302,
  speed: 402,
  capacity: 502,
  fuelSpillage: 602,
  weight: 702,
  lifting: 802,
  distance: 902
}

const inputFighterPlaine = {
  size: 103,
  minTurningRadius: 203,
  minCirclingRadius: 303,
  speed: 403,
  capacity: 503,
  fuelSpillage: 603,
  weight: 703,
  lifting: 803,
  distance: 903
}

const airPlane = new AirPlane(
  inputAirPlane.size,
  inputAirPlane.minTurningRadius,
  inputAirPlane.minCirclingRadius,
  inputAirPlane.speed,
  inputAirPlane.capacity,
  inputAirPlane.fuelSpillage,
  inputAirPlane.weight,
  inputAirPlane.lifting,
  inputAirPlane.distance
)

const fighterPlaine = new FighterPlaine(
  inputFighterPlaine.size,
  inputFighterPlaine.minTurningRadius,
  inputFighterPlaine.minCirclingRadius,
  inputFighterPlaine.speed,
  inputFighterPlaine.capacity,
  inputFighterPlaine.fuelSpillage,
  inputFighterPlaine.weight,
  inputFighterPlaine.lifting,
  inputFighterPlaine.distance
)

const torpedoBomber = new TorpedoBomber(
  inputTorpedoBomber.size,
  inputTorpedoBomber.minTurningRadius,
  inputTorpedoBomber.minCirclingRadius,
  inputTorpedoBomber.speed,
  inputTorpedoBomber.capacity,
  inputTorpedoBomber.fuelSpillage,
  inputTorpedoBomber.weight,
  inputTorpedoBomber.lifting,
  inputTorpedoBomber.distance
)

const passengerPlane = new PassengerPlane(
  inputPassengerPlane.size,
  inputPassengerPlane.minTurningRadius,
  inputPassengerPlane.minCirclingRadius,
  inputPassengerPlane.speed,
  inputPassengerPlane.capacity,
  inputPassengerPlane.fuelSpillage,
  inputPassengerPlane.weight,
  inputPassengerPlane.lifting,
  inputPassengerPlane.distance
)

const [data, airline] = new Airline([airPlane, fighterPlaine, torpedoBomber, passengerPlane])
  .calculateCapacityAndLifting()

const range = airline.getByRange(1, 3)

console.log({ airline, range })
