'use strict';

const { Pool } = require('pg');

const where = object => {
  let clause = '';
  const values = [];
  let i = 1;
  for (const key in object) {
    const value = object[key];
    let condition;
    if (typeof value === 'string') {
      condition = `${key} = $${i}`;
    }
    i++;
    values.push(value);
    clause = clause ? `${clause} AND ${condition}` : condition;
  }
  return { clause, values };
};

const MODE_ROWS = 0;
const MODE_VALUE = 1;
const MODE_ROW = 2;
const MODE_COL = 3;
const MODE_COUNT = 4;

class Cursor {
  constructor(database, table) {
    this.database = database;
    this.table = table;
    this.cols = null;
    this.rows = null;
    this.rowCount = 0;
    this.ready = false;
    this.mode = MODE_ROWS;
    this.whereClause = undefined;
    this.columns = ['*'];
    this.values = [];
    this.groupBy = [];
    this.join_ = [];

    this.cons = {};
  }

  resolve(result) {
    const { rows, fields, rowCount } = result;
    this.rows = rows;
    this.cols = fields;
    this.rowCount = rowCount;
  }

  where(conditions) {
    const { clause, values } = where(conditions);
    this.values = values;
    this.cons['whereClause'] = clause;
    return this;
  }

  fields(columns) {
    this.columns = columns;
    return this;
  }

  value() {
    this.mode = MODE_VALUE;
    return this;
  }

  row() {
    this.mode = MODE_ROW;
    return this;
  }

  col(name) {
    this.mode = MODE_COL;
    this.columnName = name;
    return this;
  }

  count() {
    this.mode = MODE_COUNT;
    return this;
  }

  order(column, order) {
    console.log({ first: 'first' });
    order = order ? order.toUpperCase() : 'ASC';
    this.cons['orderBy'] = [column, order];
    return this;
  }

  limit(count, offset) {
    this.cons['limit'] = [count, offset];
    return this;
  }

  group(...fields) { // -
    this.groupBy.push(...fields);
    return this;
  }

  join(table, field, linkTo, type = 'INNER') {
    if (!linkTo) linkTo = `${this.table}.id`;
    const on = `(${table}.${field} = ${linkTo})`;
    this.join_.push([type, table, on]);
    this.cons['join'] = [type, table, on];
    return this;
  }

  then(callback) {
    const { mode, table, join_, values } = this;
    const fields = this.columns.join(', ');
    let sql = `SELECT ${fields} FROM ${table}`;

    const strategy = {
      join: join => {
        for (let i = 0; i < join_.length; i++) {
          const [type, table, on] = join_[i];
          sql +=  ` ${type.toUpperCase()} JOIN ${table} ON ${on}`;
        }
      },
      whereClause: whereClause => (whereClause ? sql += ` WHERE ${whereClause}` : ''),
      orderBy: orderBy => sql += ` ORDER BY ${orderBy[0]} ${orderBy[1]}`,
      limit: limit => sql += ` LIMIT ${limit[0]} OFFSET ${limit[1]}`
    };

    const keys = Object.keys(this.cons);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = this.cons[key];
      strategy[key](value);
    }

    this.database.query(sql, values,  (err, res) => {
      if (!res) return console.log(`Your request is not correct: \n${sql}`);
      this.resolve(res);
      const { rows, cols } = this;
      if (mode === MODE_VALUE) {
        const col = cols[0];
        const row = rows[0];
        callback(row[col.name]);
      } else if (mode === MODE_ROW) {
        callback(rows[0]);
      } else if (mode === MODE_COL) {
        const col = [];
        for (const row of rows) {
          col.push(row[this.columnName]);
        }
        callback(col);
      } else if (mode === MODE_COUNT) {
        callback(this.rowCount);
      } else {
        callback(rows);
      }
    });
    return this;
  }
}

class Database {
  constructor(config) {
    this.pool = new Pool(config);
    this.config = config;
  }

  query(sql, values, callback) {
    console.log({ sql });
    if (typeof values === 'function') {
      callback = values;
      values = [];
    }
    this.pool.query(sql, values, (err, res) => {
      if (callback) callback(err, res);
    });
  }

  select(table) {
    return new Cursor(this, table);
  }

  close() {
    this.pool.end();
  }
}

module.exports = {
  open: config => new Database(config),
  Database,
  Cursor
};
