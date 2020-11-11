module.exports = {
  debug: (obj = {}) => JSON.stringify(obj, null, 4),
  lower: str => str.toLowerCase(),
  flag: false,
  html_format: false,
  reference: false,
  inline_keyboard: [[{ text: 'forward', callback_data: 'forward' }], [{ text: 'reply', callback_data: 'reply' }], [{ text: 'edit', callback_data: 'edit' }], [{ text: 'delete', callback_data: 'delete' }]]
}
