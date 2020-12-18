'use strict';

const { Client } = require('pg');

const config = require('../../config/database');
const data = require('../data');

describe('Model spec', () => {
  it('correctly serialises the model', done => {
    const client = new Client(config);
    client.connect();

    const { language, authorname, date, title, publishername, licenseRights, subject } = data;

    const sql1 = `INSERT INTO Book (Title, Subjects) VALUES ('${title}', '{${subject}}');`;
    const sql2 = `INSERT INTO Author (AuthorName) VALUES ('${authorname}');`;
    const sql3 = `INSERT INTO Publisher (PublisherName, License_rights, Data) VALUES ('${publishername}', '${licenseRights}', '${date}');`;
    const sql4 = `INSERT INTO Languages (Language) VALUES ('${language}');`;

    client.query(sql1, err => { if (err) expect(err).toBe('error'); });
    client.query(sql2, err => { if (err) expect(err).toBe('error'); });
    client.query(sql3, err => { if (err) expect(err).toBe('error'); });
    client.query(sql4, err => { if (err) expect(err).toBe('error'); });

    const sqlS = `SELECT authorname, data, title FROM Book LEFT JOIN Author ON Author.Id = Book.Id
                 LEFT JOIN Publisher ON Publisher.Id = Book.Id
                 LEFT JOIN Languages ON Languages.Id = Book.Id
                 WHERE Book.title = '${title}';`;

    client.query(sqlS, (err, dataInDatabase) => {
      const expected = {
        authorname: 'name',
        data: '1989-07-30T20:00:00.000Z',
        title: 'The King James Version of the Bible',
      };

      const expectedString = JSON.stringify(expected);
      const actual = JSON.stringify(...dataInDatabase.rows);
      expect(expectedString).toEqual(actual);
      client.end();
      done();
    });
  });
});
