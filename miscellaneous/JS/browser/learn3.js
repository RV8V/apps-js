var user = {
  name: 'test name',
  age: 30
};

var clone = {};

for (var key in user) {
  clone[key] = user[key];
}

var clone = Object.assign({}, user);

var user = { name: 'ivan' };

var permission1 = { canView: true };
var permission2 = { canEdit: true };

Object.assign(user, permission1, permission2);

var deepClone = function(obj) {
  if (obj === null || typeof obj !== 'object') {
    return Object.assign({}, obj);
  } else if (obj instanceof Array) {
    var result = [];
    for (var element of obj) {
      result.push(deepClone(element))
    }
    return result;
  } else {
    var result = {};
    for (var key in Object.keys(obj)) {
      result[key] = deepClone(obj[key]);
    }
    return result;
  }
};

var obj = {
  name: 'test',
  city: {
    name: 'test city'
  },
  language: {
    name: 'english',
    property: 'test property'
  }
};

var clone = deepClone(obj);
delete clone.language;


var errors = [
  {
    property: 'email',
    constainst: [
      'email must be an email',
      'email must be more than 10 chars'
    ]
  },
  { property: 'name' },
  {
     property: 'password',
     constainst: [
       'password must be an password',
       'password must be more than 10 chars'
     ],
     children: {}
   }
];

var validErrors = [
  {
        "statusCode": 400,
        "error": "Bad Request",
        "message":
        [
          {
            "target": {},
            "property": "email",
            "children": [],
            "constraints": {
              "isEmail": "email must be an email",
              "lessChars": "email must be more than 10 chars"
            }
          },
          {
            "target": {},
            "property": "password",
            "children": [],
            "constraints": {
              "isEmail": "password must be an password",
              "lessChars": "password must be more than 10 chars"
            }
          },
        ]
  }
];

const parseErrors = function(errors) {
  return errors.map(({ property, constainst, children }) => {
    return Object.assign(
      { property },
      constraints && { constraints: Object.keys(constraints) },
      children.length && { children: errorParser(children) },
    );
  })
}

var obj = {
  x: 10,
  [Symbol.toPrimitive]: function(hint) {
    return hint === 'string'
      ? JSON.stringify(this)
      : this.x
  },

  toString: function() {
    return JSON.stringify(this);
  },

  valueOf: function() {
    return this.x;
  }
}


console.log({ result: obj + '' })
