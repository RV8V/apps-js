
class Test {
  constructor() {}

  async ret_promise(number) {
    return new Promise((resolve, reject) => {
      if (number == 0) {
        reject(number)
      }
      return resolve(number)
    })
  }

  async ret_default(number) {
    if (number == 0) {
      throw new Error(number)
    }
    return number
  }
}

async function test() {
  const ints = new Test();
  const value_promise = await ints.ret_promise(0);
  const value_default = await ints.ret_default(20);
  console.log({ value_promise, value_default })
}

test()
