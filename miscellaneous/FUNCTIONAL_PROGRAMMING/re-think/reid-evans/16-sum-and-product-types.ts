/**
 * @Product Types also known as Records
 */

import Maybe from 'ramda-fantasy/src/Maybe';

const productType: Record<string, string | number> = {
  number: 1,
  title: 'string',
};

const record: Record<string, Symbol | number> = {
  number: 2,
  symbol: Symbol(),
};

/**
 * @Sum Types /Discriminated Unions
 */

type bool = true | false;

type MaybeType<T> = Maybe.Just<T> | Maybe.Nothing;
