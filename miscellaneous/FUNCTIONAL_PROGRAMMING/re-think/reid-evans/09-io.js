const IO = require('ramda-fantasy').IO;
const { pipe, curry, split, join, reverse, call } = require('ramda');

const createIsoDateString = () => new Date().toISOString();

const isoDateStringIO = IO(createIsoDateString);

const getDateValue = (string) => {
  const [date] = string.split('T');
  const [year, month, day] = date.split('-');
  return `${year}-${month}-${day}`;
};

const dateValueIO = isoDateStringIO.map(getDateValue);
const dateValue = dateValueIO.runIO();

console.log({ dateValueIO, dateValue });

const tag = (x) => (console.log({ x }), x);
const nth = curry((n, xs) => xs[n]);

{
  const isoDateStringIO = IO(createIsoDateString);

  const getDateValue = pipe(
    split('T'),
    nth(0),
    split('-'),
    call(reverse),
    join('-')
  );

  const dateValueIO = isoDateStringIO.map(getDateValue);
  const dateValue = dateValueIO.runIO();

  console.log({ dateValue });
}
