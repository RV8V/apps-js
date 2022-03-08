/**
 * @of and @chain(flatMap, bind, >>=, pure) creates monadic interface
 * @key point monads allow us to nest computation
 */

httpGet('/user').map((user) =>
  httpGet(`/friends/${user.id}`)
); /** future(future([friends])) */

httpGet('/user').chain((user) =>
  httpGet(`/friends/${user.id}`)
); /** future([friends]) */

const id = (x) => x;

const join = (monad) => monad.chain(id);
