const cherio = require('cherio');
const $ = cherio.load('<h2 class="title">Hello world</h2>');

const title = $('h2.title').text('replace test inside');
const addClass = $('h2').addClass('welcome');

//console.log({ html: $.html() });

const html = ' \
  <ul id="fruits"> \
    <li class="apple">Apple</li> \
    <li class="orange">Orange</li> \
    <li class="pear">Pear</li> \
  </ul> \
';

const ch = cherio.load(html);
