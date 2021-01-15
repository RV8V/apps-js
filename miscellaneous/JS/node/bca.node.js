var bind = Function.prototype.bind || function(fn, ctx, ...rest) {
  return fn.bind(fn, ctx, ...rest);
}

bind = function(fn, ctx, ...args) {
  return function(...rest) {
    var unique = String(Date.now());
    ctx[unique] = fn;
    var result = ctx[unique](...args, ...rest);
    delete ctx[unique];
    return result;
  }
}

bind = function(fn, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function() {
    var rest = Array.prototype.slice.call(arguments);
    return fn.apply(ctx, Array.prototype.concat(args, rest));
  }
}

bind = function(fn, ctx, ...args) {
  return function(...rest) {
    return fn.call(ctx, ...args.concat(rest));
  }
}

var call = Function.prototype.call || function(fn, ctx) {
  var unique = String(Date.now());
  ctx[unique] = fn;
  var result = ctx[unique](Array.prototype.slice.call(arguments));
  delete ctx[unique];
  return result;
}

func.bind(null, 'name')('test');
