const chevrotaine = require('chevrotain');

const createToken = chevrotaine.createToken;

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ });

/**
 * @longer_alt means - take longer world from proposed.
 * @example for foreing
 * - without longer_alt -> ['for', 'for', 'eign'] not correct
 * - with longer_alt    -> ['for', 'foreing']         correct
 */

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: chevrotaine.Lexer.SKIPPED,
});

const For = createToken({
  name: 'For',
  pattern: /for/,
  longer_alt: Identifier,
});
const Formal = createToken({
  name: 'Formal',
  pattern: /formal/,
  longer_alt: Identifier,
});
const Fornil = createToken({
  name: 'Fornil',
  pattern: /fornil/,
  longer_alt: Identifier,
});

const selectLexer = new chevrotaine.Lexer([
  WhiteSpace,
  Formal,
  Fornil,
  For,
  Identifier,
]);

const input = 'for formal title foreign';
const text = 'do while';

const vectorOfTokens = selectLexer.tokenize(text);

if (vectorOfTokens.errors.length > 0) {
  throw new Error('sad sad panda lexing errors detected');
}

console.dir({ vectorOfTokens }, { depth: 4 });
