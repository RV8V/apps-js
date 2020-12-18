'use strict'
// @flow

interface Loggable {
  log(level: string): string,
  //levelLog(str: string): string
}

class Hello {
  val: number
  constructor(val) { this.val = val }
  log(str: string) { return str }
}

const x: Hello = new Hello(10)
const p: Loggable = x

const y: Loggable = { log(str: string) { return str } }
