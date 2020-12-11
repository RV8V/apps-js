;var Premium = new Object({
  constructor: function(name) {
    this.name = name;
    return this;
  }
});

var Simple = new Object({
  constructor: function(name) {
    this.name = name;
    this.simple = 'simple';
    return this;
  }
});

var Factory = new Object({
  _list: new Object({
    simple: Simple,
    premium: Premium
  }),

  constructor: function() {
    this.member = '';+
    this.define = function() {
      process.stdout.write(JSON.stringify(this));
    }
    return this;
  },

  create: function(name, type = 'simple') {
    return this._list[type] ? this._list[type].constructor(name) : new this._list[simple].constructor(name);
  }
});

var Database = new Object({
  constructor: function(data) {
    Database.instance = this;
    Database.exists = true;
    this.data = data;
    return this;
  },

  return: function() {
    return this.data;
  }
});

var postgres = Database.constructor('postgres');
process.stdout.write(JSON.stringify(postgres.return()));

var Old = new Object({
  constructor: function() {
    return this;
  },

  operations: function(t1, t2, operation) {
    switch (operation) {
      case 'add':
        t1 + t2;
        break;
      default:
        return Nan;
    }
  }
});

var New = new Object({
  constructor: function() {
    return this;
  },

  add: function(t1, t2) {
    return t1 + t2;
  },

  return: function() {
    return this;
  }
});
