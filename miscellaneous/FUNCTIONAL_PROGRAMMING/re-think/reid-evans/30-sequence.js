const { Future } = require('ramda-fantasy');
const { sequence, lift, curry } = require('ramda');

const userFuture = new Future((reject, resolve) => resolve({ id: 1 }));
const postsFuture = new Future((reject, resolve) =>
  resolve([{ postId: 1, title: '1n' }])
);

// const userWithPostsFuture = userFuture.chain((user) =>
//   postsFuture.chain(
//     (posts) => new Future((resolve, reject) => resolve({ user, posts }))
//   )
// );

const lifted = lift((user, posts) => ({ user, posts }));

lifted(userFuture, postsFuture).fork(
  (err) => console.log({ err }),
  (data) => console.log({ data })
);

const futures = [userFuture, postsFuture];
const invertFuture = sequence(Future.of);

invertFuture(futures).fork(
  (err) => console.log({ err }),
  (data) => console.log({ data })
);

// userWithPostsFuture.fork(
//   (err) => console.log({ err }),
//   (ok) => console.log({ ok })
// );
