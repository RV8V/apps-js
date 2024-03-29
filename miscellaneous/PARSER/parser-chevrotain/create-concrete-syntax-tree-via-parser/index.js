/**
 * @The grammar for our language(sql):
 * @Grammar is a rule in dsl or other language
 */

/**
 * selectStatement
   : selectClause fromClause (whereClause)?

    selectClause
   : "SELECT" Identifier ("," Identifier)*

    fromClause
   : "FROM" Identifier

    whereClause
   : "WHERE" expression

    expression
   : atomicExpression relationalOperator atomicExpression

    atomicExpression
   : Integer | Identifier

    relationalOperator
   : ">" | "<"
 */

/**
 * @Gramatics - how to write words correctly, example: in dsl(if we take sql) statament `select` should be written as `select` not `se` `lect`
 */

/**
 * @A Chevrotain Parser analyses an vector of tokens that conforms/corresponds to some grammar(sql now)
 */

/**
 * @CONSUME          - 'eat' a Token.
   @SUBRULE          - reference to another rule.
   @OR               - Alternation
   @OPTION           - optional production.
   @MANY             - repetition zero or more.
   @AT_LEAST_ONE     - repetition one or more.
   @MANY_SEP         - repetition (zero or more) with a separator between any two items
   @AT_LEAST_ONE_SEP - repetition (one or more) with a separator between any two items
 */

'use strict';
// Written Docs for this tutorial step can be found here:
// https://chevrotain.io/docs/tutorial/step2_parsing.html

// Tutorial Step 2:

// Adding a Parser (grammar only, only reads the input without any actions).
// Using the Token Vocabulary defined in the previous step.

const selectLexer = require('../create-lexer-vector-of-tokens/index');
const CstParser = require('chevrotain').CstParser;
const tokenVocabulary = selectLexer.tokenVocabulary;

// individual imports, prefer ES6 imports if supported in your runtime/transpiler...
const Select = tokenVocabulary.Select;
const From = tokenVocabulary.From;
const Where = tokenVocabulary.Where;
const Identifier = tokenVocabulary.Identifier;
const Integer = tokenVocabulary.Integer;
const GreaterThan = tokenVocabulary.GreaterThan;
const LessThan = tokenVocabulary.LessThan;
const Comma = tokenVocabulary.Comma;

// ----------------- parser -----------------
class SelectParser extends CstParser {
  constructor() {
    super(tokenVocabulary);

    // for conciseness
    const $ = this;

    $.RULE('selectStatement', () => {
      $.SUBRULE($.selectClause);
      $.SUBRULE($.fromClause);
      $.OPTION(() => {
        $.SUBRULE($.whereClause);
      });
    });

    $.RULE('selectClause', () => {
      $.CONSUME(Select);
      $.AT_LEAST_ONE_SEP({
        SEP: Comma,
        DEF: () => {
          $.CONSUME(Identifier);
        },
      });
    });

    $.RULE('fromClause', () => {
      $.CONSUME(From);
      $.CONSUME(Identifier);
    });

    $.RULE('whereClause', () => {
      $.CONSUME(Where);
      $.SUBRULE($.expression);
    });

    // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
    // to use names during CST Visitor (step 3a).
    $.RULE('expression', () => {
      $.SUBRULE($.atomicExpression, { LABEL: 'lhs' });
      $.SUBRULE($.relationalOperator);
      $.SUBRULE2($.atomicExpression, { LABEL: 'rhs' }); // note the '2' suffix to distinguish
      // from the 'SUBRULE(atomicExpression)'
      // 2 lines above.
    });

    $.RULE('atomicExpression', () => {
      $.OR([
        { ALT: () => $.CONSUME(Integer) },
        { ALT: () => $.CONSUME(Identifier) },
      ]);
    });

    $.RULE('relationalOperator', () => {
      $.OR([
        { ALT: () => $.CONSUME(GreaterThan) },
        { ALT: () => $.CONSUME(LessThan) },
      ]);
    });

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
  }
}

// We only ever need one as the parser internal state is reset for each new input.
const parserInstance = new SelectParser();

module.exports = {
  parserInstance: parserInstance,

  SelectParser: SelectParser,

  parse: function (inputText) {
    const lexResult = selectLexer.lex(inputText);

    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = lexResult.tokens;

    // No semantic actions so this won't return anything yet.
    const selectGrammar = parserInstance.selectStatement();

    console.dir({ selectGrammar, lexResult }, { depth: 4 });
    console.dir({ errors: parserInstance.errors }, { depth: 4 });

    if (parserInstance.errors.length > 0) {
      throw Error(
        'Sad sad panda, parsing errors detected!\n' +
          parserInstance.errors[0].message
      );
    }
  },
};
