'use strict';

const { Pool } = require('pg');
const config = require('../config/database');

const pool = new Pool(config);

const saveTodatabase = async dataset => {
  let counter = 0;
  try {
    for (let i = 0, { length } = dataset; i < length; i++) {
      const { language, authorname, date, title, publishername, licenseRights, subjects } = dataset[i];
      let input; counter++;
      if (!subjects) input = subjects;
      else {
        const escapedSubjects = subjects.map(escape);
        input = escapedSubjects.join(',');
      }

      await pool.query('BEGIN');

      const sql1 = `INSERT INTO Book (Title, Subjects) VALUES ('${title}', '{${input}}');`;
      const sql2 = `INSERT INTO Author (AuthorName) VALUES ('${authorname}');`;
      const sql3 = `INSERT INTO Publisher (PublisherName, License_rights, Data) VALUES ('${publishername}', '${licenseRights}', ${date}');`;
      const sql4 = `INSERT INTO Languages (Language) VALUES ('${language}');`;

      await pool.query(sql1);
      await pool.query(sql2);
      await pool.query(sql3);
      await pool.query(sql4);

      await pool.query('COMMIT');
    }
  } catch (err) {
    await pool.query('ROLLBACK');
    console.log(`Something wrong happend ${err}`);
  } finally {
    console.log({ counter, length: dataset.length });
    if (counter === dataset.length) pool.end();
    console.log('Client disconnected successfuly ');
  }
};

module.exports = { saveTodatabase };
