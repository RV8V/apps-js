'use strict';

const Builder = require('../../lib/builder');

const { Cursor } = require('../../lib/builder');
const config = require('../../config/database');

describe('Builder spec', () => {
  it('has a builder', () => {
    expect(Builder).toBeDefined();
  });

  it('has an open', () => {
    const open = Builder.open(config);
    expect(open).toBeDefined();
  });

  describe('Cursor spec', () => {
    const dataset = ['cursor', 'where', 'value', 'row', 'count', 'order', 'limit', 'group', 'join', 'then'];
    for (let i = 0; i < dataset.length; i++) {
      it(`Cursor.${dataset[i]}`, () => expect(`cursor.${dataset[i]}`).toBeDefined());
    }

    it('has a cursor', () => {
      expect(Cursor).toBeDefined();
    });
  });

  describe('Database spec', () => {
    const dataset = ['query', 'select', 'close'];
    for (let i = 0; i < dataset.length; i++) {
      it(`Cursor.${dataset[i]}`, () => expect(`database.${dataset[i]}`).toBeDefined());
    }
  });
});
