const identity = (x) => ({
  value: x,
  map: (f) => identity(f(x)),
});

const functorInst = identity(11);

console.log({ functorInst, map: functorInst.map((x) => x + 1) });

const Const = function (x) {
  return {
    value: x,
    'fantasy-land/map': function () {
      return this;
    },
  };
};

console.log(Const('Hello World'));
