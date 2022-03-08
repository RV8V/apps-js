const {
  readFile,
  httpGet,
  first,
  safeParse,
  getJson,
  identity,
  eitherToFuture,
} = require('./utils');

const { Future, Either } = require('ramda-fantasy');

const spotifyArtistUrl = (name) =>
  `https://api.spotify.com/v1/search?q=${name}&type=artist`;

const spotifyRelatedArtistUrl = (id) =>
  `https://api.spotify.com/v1/artists/${id}/related-artists`;

const fileName = './cartoons/app/spotify-artists.json';
const encoding = 'utf-8';

const findArtist = (name) =>
  readFile(fileName, encoding)
    .chain(eitherToFuture)
    .map(safeParse)
    .chain(eitherToFuture)
    .map((result) => result.tracks.items)
    .map(first)
    .chain(eitherToFuture);

// const findArtist = (name) =>
//   //   httpGet(usersUrl)
//   getJson(spotifyArtistUrl(name))
//     // .map((response) => {
//     //   console.log({ response });
//     //   return response;
//     // })
//     .map((result) => result.artists.items)
//     .map(first)
//     .chain(eitherToFuture);

// const constant = compose(
//   toEither('artict id can not be nullable'),
//   call,
//   always
// );

const artists = [
  { id: 1, name: 'John' },
  { id: 2, name: 'not related' },
  { id: 6, name: 'related' },
];

const related = (id) =>
  new Future((reject, resolve) => {
    const found = artists.find((art) => art.id === id);
    if (found) return resolve(Either.Right(found));
    return reject(Either.Left(`no related artists for id: ${id}`));
  });

const relatedArtists = (id) => related(id).chain(eitherToFuture).map(identity);

// const relatedArtists = (id) =>
//   getJson(spotifyRelatedArtistUrl(id)).map((result) => result.artists);

module.exports = { findArtist, relatedArtists };
