const { Future } = require('ramda-fantasy');

const db = {
  find: (id) =>
    new Future((reject, resolve) =>
      setTimeout(() => resolve({ id, title: `project id: ${id}` }), 100)
    ),
};

const reportHeader = (p1, p2) => `report: ${p1.title} - ${p2.title}`;

/**
 * @sequencial here
 * @nested fn will way until first one is resolved
 */

const result = db
  .find(1)
  .chain((p1) => db.find(2).map((p2) => reportHeader(p1, p2)));

/**
 * @not sequencial
 * @and executes in the same time(find setTimeout)
 */

const ap = Future.of((p1) => (p2) => reportHeader(p1, p2))
  .ap(db.find(1))
  .ap(db.find(2));

result.fork(console.log, console.log);
ap.fork(console.log, console.log);
