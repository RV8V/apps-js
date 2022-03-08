const {} = require('ramda');
const { Maybe } = require('ramda-fantasy');

/**
 * @static method of used to lift a value to a type - generic
 */

`
Maybe.of('message')  -> Maybe('message')
Either.of('message') -> Right('message')
Future.of('message') -> Future('message')
`;
