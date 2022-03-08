const { Future, Either } = require('ramda-fantasy');

const eitherToFuture = Either.either(Future.reject, Future.of);

const fake = (id) => ({
  id,
  name: 'user one',
  bestFriendId: id + 1,
});

const db = {
  find: (id) =>
    new Future((reject, resolve) => {
      return resolve(
        id > 2 ? Either.Right(fake(id)) : Either.Left('user not found')
      );
    }),
};

db.find(3) //Future(Either(user))
  .map((either) => {
    return either.map((user) => db.find(user.bestFriendId));
  })
  .fork(
    (err) => console.log(`err from out`, err),
    (either) => {
      either.map((future) => {
        future.fork(console.log, console.log);
      });
    }
  );

db.find(3) //Future(Either(user))
  .chain((either) => {
    console.log({ either });
    return Future.of(either.map((user) => db.find(user.bestFriendId)));
  }) //Either(Task(user))
  .fork(console.log, (eitherFuture) => console.log({ eitherFuture }));

db.find(3) //Future(Either(user))
  .chain(eitherToFuture) //Future(user) after chain
  .chain((user) => db.find(user.bestFriendId)) //Future(Either(user))
  .chain(eitherToFuture) //Future(user) after chain
  .fork(console.log, console.log);
