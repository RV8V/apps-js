module.exports = {
  debug: (obj = {}) => JSON.stringify(obj, null, 4),
  lower: str => str.toLowerCase(),
  flag: false,
  html_format: false,
  reference: false
}
