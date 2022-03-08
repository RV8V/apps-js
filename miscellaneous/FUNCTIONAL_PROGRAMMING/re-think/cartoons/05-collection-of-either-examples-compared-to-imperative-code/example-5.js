const { Either, toEither } = require('../03-ramda-fantasy');
const { toEitherSafe } = require('../to-either');
const { prop, compose, curry, chain, lensProp, set, always } = require('ramda');

const fs = require('fs');

/********************example-5************************* */

const example = {
  previewPath: './example-5.js',
};

{
  const wrapExamples = (example) => {
    if (example.previewPath) {
      try {
        example.preview = fs.readFileSync(example.previewPath);
      } catch (err) {
        return err;
      }
    }
    return example;
  };

  console.log({ wrapExamples: wrapExamples(example) });
  console.log({ wrapExamples: wrapExamples({}) });
}

const tag = (x) => (console.log({ x }), x);

{
  const toEncoding = curry((encoding, buffer) => buffer.toString(encoding));

  const safe = toEitherSafe(Either.Left, Either.Right);
  const readSafe = compose(safe, prop('readFileSync'));

  const safeProp = curry(
    compose(toEither(`previewPath should be not null`), prop)
  );

  const safeRead = compose(safe, toEncoding);

  const wrapExamples = compose(
    chain(safeRead('utf-8')),
    chain(readSafe(fs)),
    safeProp('previewPath')
  );

  const onPreviewOk = (ok) => {
    const lens = lensProp('preview');
    return set(lens, ok, example);
  };

  const flow = Either.either(always(example), onPreviewOk);
  const run = compose(flow, wrapExamples);

  console.log({ success: run(example), fail: run(null) });
}
