const Interface = require('../start-patterns/interface-implementation.js')

class CalculatorReceiver {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value
  }

  substract(value) {
    this.result -= value
  }

  multiply(value) {
    this.result *= value
  }

  divide(value) {
    if (value === 0) {
      throw new Error("Divide by zero is forbidden");
    }
    this.result /= value
  }

  setResult(value) {
    this.result = value
  }

  getResult() {
    return this.result
  }
}

const CommandInterface = Interface('CommandInterface', {
  execute: function() {},
  undo: function() {}
})

class AddCommand {
  constructor(calculator, value) {
    this.calculator = calculator
    this.value = value
  }

  execute(value) {
    this.calculator.add(value)
  }

  undo(value) {
    this.calculator.substract(value)
  }
}

class SubstractCommand {
  constructor(calculator, value) {
    Object.assign(this, { calculator, value })
  }

  execute(value) {
    this.calculator.substract(value)
  }

  undo(value) {
    this.calculator.add(value)
  }
}

class MultiplyCommand {
  constructor(calculator, value) {
    Object.assign(this, { calculator, value })
  }

  execute(value) {
    this.calculator.multiply(value)
  }

  undo(value) {
    this.calculator.divide(value)
  }
}

class DivideCommand {
  constructor(calculator, value) {
    Object.assign(this, { calculator, value })
  }

  execute(value) {
    this.calculator.divide(value)
  }

  undo(value) {
    this.calculator.multiply(value)
  }
}

class UserInvoker {
  constructor(calculator) {
    this.calculator = calculator
    this.commands = []
    this.command = null
  }

  add(command, value) {
    this.command = command
    this.commands.push(command)
    this.command.execute()
  }

  substract(command, value) {
    this.command = command
    this.commands.push(command)
    this.command.execute()
  }

  multiply(command, value) {
    this.command = command
    this.commands.push(command)
    this.command.execute()
  }

  divide(command, value) {
    this.command = command
    this.commands.push(command)
    this.command.execute()
  }

  undo() {
    if (this.commands.length === 0) {
      throw new Error("Command stack is empty");
    }
    this.command = this.commands.pop()
    this.command.undo()
  }

  getCount() {
    return this.calculator.getResult()
  }
}

const INITIAL_VALUE = 10

const calculator = new CalculatorReceiver()
const addCommand = new AddCommand(calculator, INITIAL_VALUE)
const substractCommand = new SubstractCommand(calculator, INITIAL_VALUE)
const multiplyCommand = new MultiplyCommand(calculator, INITIAL_VALUE)
const divideCommand = new DivideCommand(calculator, INITIAL_VALUE)

Interface.implement(addCommand, CommandInterface)
Interface.implement(substractCommand, CommandInterface)
Interface.implement(multiplyCommand, CommandInterface)
Interface.implement(divideCommand, CommandInterface)

const accountent = new UserInvoker(calculator)
accountent.add(addCommand, 5)
accountent.substract(substractCommand, 4)

console.log({ result: accountent.getCount() })
