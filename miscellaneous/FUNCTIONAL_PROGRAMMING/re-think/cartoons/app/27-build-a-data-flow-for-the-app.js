const { traverse } = require('ramda');
const { Future } = require('ramda-fantasy');
const { relatedArtists, findArtist } = require('./spotify');

const argv = new Future((reject, resolve) => resolve(process.argv));
const names = argv.map((args) => args.slice(2));

const intersection = (xs) => ({
  xs,
  concat: ({ xs: ys }) =>
    intersection(xs.filter((x) => ys.some((y) => y === x))),
});

const related = (name) =>
  findArtist(name)
    .map((artist) => artist.track.popularity)
    .chain(relatedArtists)
    .map((artist) => artist.name);

const artistIntersection = (rels1) => (rels2) =>
  intersection([rels1]).concat(intersection([rels2])).xs;

const main = ([name1, name2]) =>
  Future.of(artistIntersection).ap(related(name1)).ap(related(name2));

// const artistIntersection = (rels) =>
//   rels.map(intersection).reduce((acc, value) => acc.concat(value));

// const main = (names) =>
//   traverse(Future.of, related, names).map(artistIntersection);

/**
 * @testing
 *
 */

// const main = (names) => {
//   const ns = [Future.of([1, 2, 3]), Future.of([1, 11])];
//   const id = (x) => x;
//   // const r = traverse(Future.of, related, names).map(artistIntersection);
//   const r = traverse(Future.of, id, ns).map(artistIntersection);
//   console.log({ r });
//   return r;
// };

names.chain(main).fork(
  (err) => console.log({ err }),
  (ok) => console.log({ ok })
);
