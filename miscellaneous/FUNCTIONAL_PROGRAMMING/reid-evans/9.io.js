const IO = require('ramda-fantasy').IO
const moment = require('moment')

/** @: Making the impure pure, or discovering IO */

/** @: createMoment :: () -> Moment */
const createMoment = () => moment()

/** @: momentIO :: IO Moment */
const momentIO = IO(moment)

/** @: formattedIO :: IO String */
const formattedIO = momentIO.map(x => x.format())

/** @: Benefit of doing it is a specific runIO - set boundries of your application */
/** @: IO just chain different i/o operations that we need to have. It a collection of out impure functions composed inside one container */
/** @: So that we can make boundries for out application impure functions - side effects */

/** @: IO a -> a */
console.log({
  pureFormattedIO: formattedIO.runIO(),
  pureIO: momentIO.runIO(),
})

/** @: Not pure function */

console.log({
  moment: moment(),
  momentFormat: moment().format()
})
