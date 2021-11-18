const Interface = require('../start-patterns/interface-implementation.js')

const SubjectInterface = Interface('SubjectInterface', {
  registerObserver: function(observer) {},
  removeObserver: function(observer) {},
  notifyObservers: function() {}
})

const ObserverInterface = Interface('ObserverInterface', {
  update: function(temp, humidity, pressure) {}
})

const DisplayInterface = Interface('DisplayInterface', {
  display: function() {}
})

class WeatherData {
  constructor() {
    this.observers = new Array()
    this.temperature = null
    this.humidity = null
    this.pressure = null
  }

  registerObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer)
    if (index >= 0) {
      this.observers = this.observers.slice(index, 1)
    }
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure)
    }
  }

  measurementsChanged() {
    this.notifyObservers()
  }

  setMeasurementsChanged(temperature, humidity, pressure) {
    this.temperature = temperature
    this.humidity = humidity
    this.pressure = pressure
    this.measurementsChanged()
  }
}

class CurrentConditionsDisplay {
  constructor(subjectWeatherData) {
    this.temperature = null
    this.humidity = null
    this.pressure = null

    this.subjectWeatherData = subjectWeatherData
    this.subjectWeatherData.registerObserver(this)
  }

  update(temperature, humidity, pressure) {
    this.temperature = temperature
    this.humidity = humidity
    this.pressure = pressure
    this.display()
  }

  display() {
    console.log(`\x1b[36m currentConditions: temperature - ${this.temperature}, humidity - ${this.humidity}, pressure - ${this.pressure}`)
  }
}

class ForecaseDisplay {
  constructor(subjectWeatherData) {
    this.temperature = null
    this.humidity = null
    this.pressure = null

    this.subjectWeatherData = subjectWeatherData
    this.subjectWeatherData.registerObserver(this)
  }

  update(temperature, humidity, pressure) {
    this.temperature = temperature
    this.humidity = humidity
    this.pressure = pressure
    this.display()
  }

  display() {
    console.log(`\x1B[31m forecaseDisplay: temperature - ${this.temperature}, humidity - ${this.humidity}, pressure - ${this.pressure}`)
  }
}

const weatherData = new WeatherData()
const currentConditionsDisplay = new CurrentConditionsDisplay(weatherData)
const forecaseDisplay = new ForecaseDisplay(weatherData)

Interface.implement(weatherData, SubjectInterface)
Interface.implement(currentConditionsDisplay, ObserverInterface)
Interface.implement(currentConditionsDisplay, DisplayInterface)
Interface.implement(forecaseDisplay, ObserverInterface)
Interface.implement(forecaseDisplay, DisplayInterface)

weatherData.setMeasurementsChanged(80, 65, 30)
weatherData.setMeasurementsChanged(42, 15, 34)

weatherData.removeObserver(currentConditionsDisplay)
weatherData.setMeasurementsChanged(20, 82, 12)
