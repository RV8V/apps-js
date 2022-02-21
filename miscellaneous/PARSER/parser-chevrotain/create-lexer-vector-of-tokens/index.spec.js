const lexer = require('./index');

const inputText = 'SELECT column1 FROM table2';
const lexingResult = lexer.lex(inputText);

console.dir({ lexingResult }, { depth: 4 });
