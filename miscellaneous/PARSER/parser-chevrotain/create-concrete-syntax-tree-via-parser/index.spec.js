const parser = require('./index');
const selectLexer = require('../create-lexer-vector-of-tokens/index');

const inputText = 'SELECT column1 FROM table2';
// step into the parse function to debug the full flow

try {
  parser.parse(inputText);
} catch (err) {
  console.log({ err });
}

const parse = (inputText) => {
  const lexResult = selectLexer.lex(inputText);

  // ".input" is a setter which will reset the parser's internal's state.
  parser.parserInstance.input = lexResult.tokens;

  // No semantic actions so this won't return anything yet.
  const selectGrammar = parser.parserInstance.selectClause();

  console.dir({ selectGrammar, lexResult }, { depth: 4 });
  console.dir({ errors: parser.parserInstance.errors }, { depth: 4 });

  if (parser.parserInstance.errors.length > 0) {
    throw Error(
      'Sad sad panda, parsing errors detected!\n' +
        parser.parserInstance.errors[0].message
    );
  }
};

try {
  const select = 'SELECT field, 1';
  parse(select);
} catch (err) {
  console.log({ select: err });
}
