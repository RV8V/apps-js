{
  /**
   * @normal control flow
   */

  const nextCharForNumberString = (str) => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
  };

  const result = nextCharForNumberString(' 64');
  console.log({ result });
}

{
  /**
   * @fp control flow
   */

  const nextCharForNumberString = (str) =>
    String.fromCharCode(parseInt(str.trim()) + 1);

  const result = nextCharForNumberString(' 64');
  console.log({ result });
}

{
  /**
   * @pass string in a box
   * @we capture each assignment in minimal context(each function in map)
   */

  const nextCharForNumberString = (str) =>
    [str]
      .map((s) => s.trim())
      .map((s) => parseInt(s))
      .map((n) => n + 1)
      .map((n) => String.fromCharCode(n));

  const result = nextCharForNumberString(' 64');
  console.log({ result });
}

{
  /**
   * @box is identity functor
   */

  const box = (x) => ({
    map: (f) => box(f(x)),
    inspect: () => `box(${x})`,
    fold: (f) => f(x),
  });

  const nextCharForNumberString = (str) =>
    box(str)
      .map((s) => s.trim())
      .map((s) => parseInt(s))
      .map((n) => n + 1)
      .map((n) => String.fromCharCode(n))
      .fold((c) => c);

  const result = nextCharForNumberString(' 64');
  console.log({ result });
}
