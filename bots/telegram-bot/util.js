module.exports = {
  debug: (obj = {}) => JSON.stringify(obj, null, 4),
  lower: str => str.toLowerCase(),
  flag: false
}
