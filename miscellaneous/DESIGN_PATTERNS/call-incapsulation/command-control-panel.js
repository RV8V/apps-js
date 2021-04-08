const Interface = require('../start-patterns/interface-implementation.js')

const CommandInterface = Interface('CommandInterface', {
  execute: function() {}
})

class LightOnCommand {
  constructor(light) {
    this.light = light
  }

  execute() {
    this.light.on()
  }
}

class GarageDoorOpenCommand {
  constructor(door) {
    this.door = door
  }

  execute() {
    this.door.open()
  }
}

class Light {
  constructor() {}
  on() { console.log('light in on') }
}

class Door {
  constructor() {}
  open() { console.log('door is open') }
}

class SimpleRemoteControl {
  constructor() {
    this.button = null
  }

  setCommand(command) {
    this.button = command
  }

  buttonWasPressed() {
    this.button.execute()
  }
}

const light = new Light()
const door = new Door()
const garageDoorOpenCommand = new GarageDoorOpenCommand(door)
const lightOnCommand = new LightOnCommand(light)
const simpleRemoteControl = new SimpleRemoteControl()

Interface.implement(lightOnCommand, CommandInterface)
Interface.implement(garageDoorOpenCommand, CommandInterface)

simpleRemoteControl.setCommand(lightOnCommand)
simpleRemoteControl.buttonWasPressed()

simpleRemoteControl.setCommand(garageDoorOpenCommand)
simpleRemoteControl.buttonWasPressed()
