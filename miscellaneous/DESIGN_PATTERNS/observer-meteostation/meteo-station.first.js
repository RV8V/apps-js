class WeatherData {
  constructor() {
    this.currentConditionsDisplay = new CurrentConditionsDisplay()
    this.staticticsDisplay = new StaticticsDisplay()
    this.forecaseDisplay = new ForecaseDisplay()
  }

  getTemperature() {}
  getHumidity() {}
  getPressure() {}

  measurementsChanged() {
    const temp = this.getTemperature()
    const humidity = this.getHumidity()
    const pressure = this.getPressure()

    this.currentConditionsDisplay.update(temp, humidity, pressure)
    this.staticticsDisplay.update(temp, humidity, pressure)
    this.forecaseDisplay.update(temp, humidity, pressure)
  }
}

class CurrentConditionsDisplay {
  constructor() {}
  update() {}
}

class StaticticsDisplay {
  constructor() {}
  update() {}
}

class ForecaseDisplay {
  constructor() {}
  update() {}
}

const weatherData = new WeatherData()
weatherData.measurementsChanged()
