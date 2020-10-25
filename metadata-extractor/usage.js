'use strict';

const database = require('./lib/builder');
const config = require('./config/database');

const pg = database.open(config);
// usage
pg.select('author')
  .fields(['title', 'authorname', 'data'])
  .join('publisher', 'id')
  .join('book', 'id', null, 'left')
  .limit(2, 4)
  .then(rows => {
    console.table(rows);
    pg.close();
  });
