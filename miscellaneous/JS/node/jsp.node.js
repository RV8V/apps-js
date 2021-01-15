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

var _Server = new Object({
  constructor: function(port, ip) {
    this.ip = ip;
    this.port = port;
    return this;
  },
  return: function() {
    return 'http://' + this.ip + this.port;
  }
});

var aws = function(server) {
  server.isAWS = true;
  server.awsInfo = function() {
    return server.url;
  };
  return server;
}

var Complaints = new Object({
  constructor: function() {
    this.complaints = new Array();
    return this;
  },
  reply: function(complaint) {
  },
  add: function(complaint) {
    this.complaints.push(complaint);
    return this.reply(complaint);
  }
});

var ProductComplaints = new Object({
  constructor: function() {
    return Complaints.constructor();
  },
  reply: function(complaint) {
    return JSON.stringify(complaint);
  }
});

var CarComplaints = new Object({
  constructor: function() {
    return Complaints.constructor();
  },
  reply: function(complaint) {
    return JSON.stringify(complaint) + '\n' + JSON.stringify(this);
  }
});

var ComplaintRegister = new Object({
  constructor: function() {
    return this;
  },
  register: function(customer, type, details) {
    var id = Date.now();
    var complaint;

    if (complaint == 'service') {
      complaint = CarComplaints.constructor();
    } else {
      complaint = ProductComplaints.constructor();
    }

    return complaint.add({ id, customer, details });
  }
});

var fetch = function(url) {
  return url + ' -> response from server';
}

var proxiedFetch = new Proxy(fetch, {
  apply(function, ctx, args) {
    var [url, ] = args;
    var cache = new Set();
    if (cache.has(url)) {
      return url + ' -> from cache';
    } else {
      cache.add(url);
      return Reflect.apply(function, ctx, args);
    }
  }
});

var generator = function*(collection) {
  var i = 0;
  
  while (i < collection.length) {
    yield collection[i++];
  }
}
