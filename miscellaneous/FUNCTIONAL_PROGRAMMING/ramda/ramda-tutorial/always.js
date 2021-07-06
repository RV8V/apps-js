const R = require('ramda')

/**
 * @R.always return first its argument - used as constant value
 * @R.identity return its value
 * @R.and === &&
 * @R.any === R.flip(R.all)
 * @R.anyPass === R.flip(R.allPass)
 */

const l = console.log

'const'; x => y => x;

const getOne = R.always(1)

l(
  getOne(2),
  R.always(1)(2),
  R.identity(1),
  R.and(true)(true),
  true && true,
  R.and(1, 2),
  1 && 2,
  1 && 0,
  R.and(1, 0),
  false && 1,
  R.and(false, 1),
  R.any(R.equals(10))([10, 20]),
  R.any(
    R.propEq('name', 'Jake'),
    [
      { name: 'Jake' },
      { name: 'Jane' }
    ]
  ),
  R.any(
    R.allPass(
      [R.propEq('name', 'Jake'), R.propEq('age', 20)]
    )
  )([
    { name: 'Jake', age: 21 /* 20 */ },
    { name: 'Jane', age: 20 },
  ])
);

const makeQuery = email => ({ query: email })
const fetchMember = query => users => users.filter(user => user.email === query.query)

const dataset = [
  { email: 'email', name: 'name', surname: 'surname', password: 'password' },
  { email: 'e' }
]

l(
  makeQuery('email'),
  fetchMember({ query: 'email' })(dataset)
)

const result = R.pipe(
  makeQuery,
  fetchMember,
)('email')(dataset)

l({ result })
