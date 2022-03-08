const box = (x) => ({
  map: (f) => box(f(x)),
  inspect: () => `box(${x})`,
  fold: (f) => f(x),
});

/**
 * @fold is trigger for lazyBox
 */

const lazyBox = (g) => ({
  map: (f) => lazyBox(() => f(g())),
  fold: (f) => f(g()),
  inspect: () => `lazyBox(${g})`,
});

/**
 * @difference between box and lazy box is:
 * - initial value:
 *   > box     - just value
 *   > lazybox - fn
 * - flow:
 *   > box     - starts at once
 *   > lazybox - should call method fold that call init fn and map all next fns
 */

const b = box(1)
  .map((x) => x + 1)
  .map((x) => x + 2)
  .inspect();

// const l = lazyBox(() => 1)
//   .map((x) => x + 1)
//   .map((x) => x + 2)
//   //   .inspect()
//   .fold((x) => x);

const l = lazyBox((init) => {
  console.log({ g: 'init', init });
  return 1;
})
  .map((x) => {
    console.log({ f: 'x + 1', x });
    return x + 1;
  })
  .map((x) => {
    console.log({ f: 'x + 2', x });
    return x + 2;
  })
  //   .inspect()
  .fold((x) => {
    console.log({ fold: 'inside fold', x });
    return x;
  });

console.log({ b, l });
