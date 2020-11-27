
namespace Util {
  export function isEmpty(data: string): boolean {
    return !data
  }
  export function isUndefined(data: string): boolean {
    return data === 'undefined'
  }
  export const PI = Math.PI
  export const EXP = Math.E
}

console.log({
  func1: Util.isEmpty,
  func2: Util.isUndefined,
  val1: Util.PI,
  val2: Util.EXP,
  val3: Math.E
})
