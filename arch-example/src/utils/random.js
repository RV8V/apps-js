module.exports = function(length = 4) {
  let result = String.fromCharCode(48 + Math.floor((Math.random()) * 10))
  for (let i = 0; i < length; ++i) {
    let rand = Math.floor((Math.random()) * 36)
    if (rand > 9) {
      rand += 87
    } else {
      rand += 48
    }
    result += String.fromCharCode(rand)
  }
  return result
}
