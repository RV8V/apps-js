var element, string, x, y, g, h, name;
string = 'hello, world'
element = 10;

if (x, y, 44 > 33, g, h)
  document.write(Number('12') + Number('42') + '<br />variable element = '
    + element + ', string = ' + string + '<br />');

else if (1, 3 > 2)
  document.write('enter');

document.write('<br />result -> ' + (function() {
  var result = 1;
  switch (result) {
    case 1: return 1
    default: return 2
  }
}).call(this), '<br />')

var i;
i = 0;
for (;;) {
  if (i == 10) break;
  if (i++, i % 3 && i) continue;
  else
    document.write('<br />', i)
  this.variable = i;
}

if ((function() {
  return this.variable
}).call(this)) alert('hello, world');

if ((function() {
  return confirm('are you sure?')
}).call(this)) alert('you pressed ok');

else alert('person in not sure');

alert((function() {
  switch (prompt('what is your name')) {
    case 'bob': return 'hello, bob';
    default: return 'hello, user'
  }
}).bind(this)())

var pi = Math.PI;
var e = Math.E;
var mod = Math.abs(-7);
var sin = Math.sin(0.3);
var random = Math.floor(Math.random() * 11);
var down = Math.floor(3.4);
var up = Math.ceil(3.2);

var date = new Date();
var text;
text = "year today: " + date.getFullYear();
text += "month today: " + date.getMonth();
text += "day today: " + date.getDate();
text += "hours: " + date.getHours();
text += "minutes: " + date.getMinutes();
text += "seconds: " + date.getSeconds();
