const chevrotaine = require('chevrotain');

const createToken = chevrotaine.createToken;

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ });
const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const GreaterThan = createToken({ name: 'GreaterThan', pattern: />/ });
const LessThan = createToken({ name: 'LessThan', pattern: /</ });

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: chevrotaine.Lexer.SKIPPED,
});

const From = createToken({
  name: 'From',
  pattern: /FROM/,
  longer_alt: Identifier,
});
const Select = createToken({
  name: 'Select',
  pattern: /SELECT/,
  longer_alt: Identifier,
});
const Where = createToken({
  name: 'Where',
  pattern: /WHERE/,
  longer_alt: Identifier,
});

const allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Comma,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  GreaterThan,
  LessThan,
];
const selectLexer = new chevrotaine.Lexer(allTokens);

const tokenVocabulary = {};

allTokens.forEach((tokenType) => {
  tokenVocabulary[tokenType.name] = tokenType;
});

module.exports = {
  tokenVocabulary: tokenVocabulary,

  lex: function (inputText) {
    const lexingResult = selectLexer.tokenize(inputText);

    if (lexingResult.errors.length > 0) {
      throw Error('Sad Sad Panda, lexing errors detected');
    }

    return lexingResult;
  },
};
