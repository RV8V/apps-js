const Interface = require('../start-patterns/interface-implementation.js')

const CommandInterface = Interface('CommandInterface', {
  execute: function() {},
  undo: function() {}
})

class LightOnCommand {
  constructor(light) {
    this.light = light
    this.name = 'LightOnCommand'
  }

  getName() {
    return this.name
  }

  execute() {
    this.light.on()
  }

  undo() {
    this.light.off()
  }
}

class LightOffCommand {
  constructor(light) {
    this.light = light
    this.name = 'LightOffCommand'
  }

  getName() {
    return this.name
  }

  execute() {
    this.light.off()
  }

  undo() {
    this.light.on()
  }
}

class GarageDoorOpenCommand {
  constructor(door) {
    this.door = door
    this.name = 'GarageDoorOpenCommand'
  }

  getName() {
    return this.name
  }

  execute() {
    this.door.open()
  }

  undo() {
    this.door.close()
  }
}

class GarageDoorCloseCommand {
  constructor(door) {
    this.door = door
    this.name = 'GarageDoorCloseCommand'
  }

  getName() {
    return this.name
  }

  execute() {
    this.door.close()
  }

  undo() {
    this.door.open()
  }
}

class Light {
  constructor(name) {}
  on() { console.log(`${this.name} light is on`) }
  off() { console.log(`${this.name} light is off`) }
}

class Door {
  constructor(name) {}
  open() { console.log(`${this.name} door is open`) }
  close() { console.log(`${this.name} door is close`) }
}

class NoCommand {
  constructor() {}
  execute() {}
  undo() {}
}

class RemoteControl {
  constructor(buttonCount) {
    this.onCommands = []
    this.offCommands = []
    this.buttonCount = buttonCount

    const noCommand = new NoCommand()
    for (let i = 0; i < this.buttonCount; ++i) {
      this.onCommands[i] = noCommand
      this.offCommands[i] = noCommand
    }
  }

  setCommand(button, onCommand, offCommand) {
    this.onCommands[button] = onCommand
    this.offCommands[button] = offCommand
  }

  onButtonWasPressed(button) {
    this.onCommands[button].execute()
  }

  offButtonWasPressed(button) {
    this.offCommands[button].execute()
  }

  toString() {
    let string = 'RemoteControl: '
    for (let i = 0; i < this.buttonCount; ++i) {
      string += this.onCommands[i].getName() + '\n' + this.offCommands[i].getName() + ' '
    }
    return string
  }
}

const BUTTON_COUNT = 2

const light = new Light('living room')
const door = new Door('garage door')

const garageDoorOpenCommand = new GarageDoorOpenCommand(door)
const garageDoorCloseCommand = new GarageDoorCloseCommand(door)
const lightOnCommand = new LightOnCommand(light)
const lightOffCommand = new LightOffCommand(light)

const noCommand = new NoCommand()

const remoteControl = new RemoteControl(BUTTON_COUNT)

Interface.implement(lightOnCommand, CommandInterface)
Interface.implement(garageDoorOpenCommand, CommandInterface)
Interface.implement(noCommand, CommandInterface)

remoteControl.setCommand(0, lightOnCommand, lightOffCommand)
remoteControl.setCommand(1, garageDoorOpenCommand, garageDoorCloseCommand)

const string = remoteControl.toString()

console.log({ string })
