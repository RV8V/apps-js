/**
 * @Maybe has method .ap so it is also Applicative Functor
 *
 * @How to use:
 * 1. Wrap null-values in Monad Maybe
 * 2. Curry function, that takes potentially null values
 * 3. send via .map first argument (potentially null value wrapped by Maybe). As result we will get function wrapped on Monada Maybe
 * 4. .map is not used here, use .ap
 */
