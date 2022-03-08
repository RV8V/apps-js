/**
 * @fold is chain
 */

const box = (x) => ({
  map: (f) => box(f(x)),
  inspect: () => `box(${x})`,
  fold: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
});

{
  const moneyToFloat = (str) => parseFloat(str.replace(/\$/g, ''));

  const percentToFloat = (str) => {
    const replaced = str.replace(/\%/g, '');
    const number = parseFloat(replaced);
    return number * 0.01;
  };

  const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
  };

  const result = applyDiscount('$5.00', '20%');
  console.log({ result });
}

{
  /**
   * @what box does?
   * it does not too much. It captures something in a context
   * and we can keep mapping and folding, composing different ways around id
   */
  const moneyToFloat = (str) =>
    box(str)
      .map((s) => s.replace(/\$/g, ''))
      .map((s) => parseFloat(s));

  const percentToFloat = (str) =>
    box(str)
      .map((s) => s.replace(/\%/g, ''))
      .map((s) => parseFloat(s))
      .map((n) => n * 0.01);

  const applyDiscount = (price, discount) =>
    moneyToFloat(price).fold((cost) =>
      percentToFloat(discount).fold((savings) => cost - cost * savings)
    );
  //   .inspect();

  /**
   * @if have nested boxes: .fold.map === .map.fold
   * @as above
   */

  /**
   * const applyDiscount = (price, discount) =>
   *   moneyToFloat(price)
   *     .map((cost) =>
   *       percentToFloat(discount)
   *         .fold((savings) => cost - cost * savings)
   *     )
   *     .inspect();
   *
   * const applyDiscount = (price, discount) =>
   *   moneyToFloat(price)
   *     .fold((cost) =>
   *       percentToFloat(discount)
   *         .map((savings) => cost - cost * savings)
   *      )
   *      .inspect();
   */

  console.log({
    moneyToFloat: moneyToFloat('$50.0'),
    percentToFloat: percentToFloat('20%'),
    applyDiscount: applyDiscount('$5.00', '20%'),
  });
}

{
  const moneyToFloat = (str) =>
    box(str)
      .map((s) => s.replace(/\$/g, ''))
      .map((s) => parseFloat(s));

  const percentToFloat = (str) =>
    box(str)
      .map((s) => s.replace(/\%/g, ''))
      .map((s) => parseFloat(s))
      .map((n) => n * 0.01);

  const applyDiscount = (cost) => (savings) => cost - cost * savings;

  const calculate = (price, discount) =>
    box(applyDiscount).ap(moneyToFloat(price)).ap(percentToFloat(discount));

  console.log({
    moneyToFloat: moneyToFloat('$50.0'),
    percentToFloat: percentToFloat('20%'),
    applyDiscount: calculate('$5.00', '20%').fold((x) => x),
  });
}
