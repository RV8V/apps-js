const { sumMonoid: sum, allMonoid: all } = require('./monoids');

{
  const result = sum.empty().concat(sum(1)).concat(sum(2));
  const same = sum(1).concat(sum(2));

  console.log({ result, same });
}

{
  const result = all.empty().concat(all(true)).concat(all(false));
  const same = all(true).concat(all(false));

  console.log({ result, same });
}

{
  /**
   * @here 0 and true is neutral elements for sum, all fns
   */
  const sum = (xs) => xs.reduce((acc, value) => acc + value, 0);
  const all = (xs) => xs.reduce((acc, value) => acc && value, true);
  const first = (xs) => xs.reduce((acc, value) => acc);

  console.log({ sum: sum([1, 2, 3]) });
  console.log({ sum: all([true, false, true]) });
  console.log({ sum: first([1, 2, 3]) });

  /**
   * @error not safe
   * @console.log({ sum: first([]) });
   * TypeError: Reduce of empty array with no initial value
   */
}

{
  const list = [sum(1), sum(2), sum(3)];
  const result = list.reduce((acc, value) => acc.concat(value), sum.empty());

  console.log({ result });
}
