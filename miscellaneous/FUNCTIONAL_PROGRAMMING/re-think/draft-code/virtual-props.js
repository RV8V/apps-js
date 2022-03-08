/**
 * @can compose len with other lenses with proxy get and set functions
 */

const {
  lensProp,
  always,
  pipe,
  flip,
  subtract,
  add,
  lens,
  view,
  set,
  over,
  compose,
} = require('ramda');

{
  const construct = lens(
    (x) => x + 1,
    (x) => x + 2
  );

  const o = {
    value: 23,
  };

  const get = view(construct, 12);
  const updated = set(construct, 12, 11);

  //   console.log({ get, updated });
}

/*****************example of composition with other lenses********************* */

{
  const dataStructure = { fahrenheit: -58 };

  // far2cel :: Number -> Number
  const far2cel = (far) => (far - 32) * (5 / 9);
  // cel2far :: Number -> Number
  const cel2far = (cel) => (cel * 9) / 5 + 32;

  const fahrenheit = lensProp('fahrenheit');
  const lcelsius = lens(far2cel, cel2far);
  const celsius = compose(fahrenheit, lcelsius);

  //   console.log({ fahrenheit, lcelsius, celsius });

  const vi = view(celsius, dataStructure); // => -50
  const se = set(celsius, -30, dataStructure); // => { fahrenheit: -22 }
  const ov = over(celsius, add(10), dataStructure); // => { fahrenheit: -40 }

  //   console.log({ vi, se, ov });
}

/******************same one but test******************** */

{
  const update = (value) => `${value} was updated`;
  const reset = (value) => `${value} was reseted`;

  const objectToTest = { value: 'new value' };

  const valueLens = lensProp('value');
  const handlerLens = lens(update, reset);
  const composedLens = compose(valueLens, handlerLens);

  const viewValueWithUpdatedState = view(composedLens, objectToTest);
  const setValueWithUpdatedState = set(composedLens, 'set v', objectToTest);
  const overValueWithState = over(
    composedLens,
    (x) => `${x} after over`,
    objectToTest
  );

  //   console.log({
  //     viewValueWithUpdatedState,
  //     setValueWithUpdatedState,
  //     overValueWithState,
  //   });
}

/******************same one but test******************** */

{
  const dataStructure = { hours: 2, minutes: 58 };

  const hours = lensProp('hours');
  const minutes = lensProp('minutes');

  const minutesInvariant = lens(view(minutes), (value, target) => {
    console.log({ value, target });

    if (value > 60) {
      return pipe(over(hours, add(1)), set(minutes, value - 60))(target);
    } else if (value < 0) {
      return pipe(
        over(hours, flip(subtract(1))),
        set(minutes, value + 60)
      )(target);
    }
    return over(minutes, always(value), target);
  });

  //   const v = view(minutesInvariant, dataStructure); // => 58
  const s = set(minutesInvariant, 62, dataStructure); // => { hours: 4, minutes: 2 }
  //   const o = over(minutesInvariant, add(59), dataStructure); // => {hours: 3, minutes: 57 }

  //   console.log({ v });
  console.log({ s });
  //   console.log({ o });
}
