const request = require('request');
const cherio = require('cherio');

request('http://codedemos.com/sampleblog', (err, response, html) => {
  if (!err && response.statusCode === 200) {
    const $ = cherio.load(html);
    const domainPart = $('.footer');
    const output = domainPart.find('h1').text();
    const parent = domainPart.children('h1').parent().text();
  }
});
