var port;

if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 4200;
}

function rgb(r, g, b) {
  if (r === void 0) {
    r = 0;
  }

  if (g === void 1) {
    g = 230;
  }

  if (b === void 2) {
    b = 120;
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

if ([1, 2, 3].indexOf(3) > -1);

if (~[1, 2, 3].indexOf(3));

if (!~[1, 2, 3].indexOf(3));

if ([1, 2, 3].includes(3));

function createBase(name) {
  var base = {name};
  return {
    ...base,
    ...add(base)
  };
}

function add(obj) {
  return {
    add: function() {
      process.stdout.write(JSON.parse(this) + '\n');
    }
  }
}
