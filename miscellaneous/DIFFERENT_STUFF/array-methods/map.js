'use strict'

Array.prototype.mymap = Array.prototype.mymap || function(callback) {
  const arr = []
  for (let i = 0; i < this.length; ++i) {
    arr[i] = callback(this[i], i, this)
  }
  return arr
}

Array.prototype.asyncmap = Array.prototype.asyncmap || async function(callback) {
  const arr = []
  for (let i = 0; i < this.length; ++i) {
    arr.push(await callback(this[i], i, this))
  }
  return arr
}

{
  (async () => {
    const arr = [1, 2, 3]
    const map = await arr.asyncmap(async item => item + 1)

    console.log({ arr, asyncmap: map })
  })()
}

{
  const arr = [1, 2, 3]
  const map = arr.map(item => item + 1)

  console.log({ arr, map })
}

{
  const arr = [1, 2, 3]
  const map = arr.mymap(item => item + 1)

  console.log({ arr, map })
}
