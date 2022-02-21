const storage = (storage = {}) => ({
  set: (key, value) => storage[key] = value,
  get: (key) => storage[key],
  all: () => storage
});

module.exports = storage();
