class Storage {
  constructor() {
    this.events = {}
  }

  setValue(key, value) {
    this.events[key] = value;
  }

  getValue(key) {
    return this.events[key];
  }
}

module.exports = new Storage();
