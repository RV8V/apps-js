const fs = require('fs');

const readPath = './cartoons/config.json';
const writePath = './cartoons/update-config.json';
const encoding = 'utf-8';

{
  const app = () => {
    fs.readFile(readPath, encoding, (err, contents) => {
      if (err) throw err;

      const newContents = contents.replace(/8/g, '6');

      fs.writeFile(writePath, newContents, (err, result) => {
        if (err) throw err;
        console.log('success');
      });
    });
  };

  // app();
}

const { toFuture, futurify } = require('./to-future/to-future');

{
  /**
   * @example
   */

  const toReadFile = toFuture('readFile')(fs);
  const toWriteFile = toFuture('writeFile')(fs);

  const app = toReadFile(readPath, encoding)
    .map((contents) => contents.replace(/8/g, '6'))
    .chain((contents) => toWriteFile(writePath, contents));

  app.fork(
    (err) => console.log({ err }),
    (ok) => console.log({ ok })
  );
}
