window.document.write('hello, world<br>'); alert('test message<br>');

window.name = prompt('your name');

if (Boolean(name) == Boolean('a')) {
  window.document.write('hello ' + name + '<br />')
} else {
  window.document.write('<br />');
}

var x = prompt('enter a value for x');

switch (x) {
  case '1':
    window.document.write(x, '\nhere<br />');
    break;
  default:
    window.document.write('here<br />');
}

var a = parseInt(prompt('enter a value for a'));
var b = parseInt(prompt('enter a value for b'));
var operation = prompt('enter an operation');
var result;

switch (operation) {
  case '+': a.result = result = a + b; break;
  case '-': b.result = a - b; break;
  case '/': a.b.result = a / b; break;
  case '*': b.a.result = a * b; break;
  default: break;
}

var a = 10;
var b = 20;

window.document.write('here: -> ', a, b + '<br />');

var a = 101;
var b = 201;

window.document.write('and here: ->', a, b + '<br />');

window.a = 11;
window.b = 21;

window.document.write('and here: >', a, b + '<br />');

a = 01;
b = 10;

window.document.write('and here: >>', a, b + '<br />');

window.document.write('result +: ', a.result + '<br />',
                      'result -: ', b.result + '<br />',
                      'result /: ', a.b.result + '<br />',
                      'result *: ', b.a.result + '<br />');
