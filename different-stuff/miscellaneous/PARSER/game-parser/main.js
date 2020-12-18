var axios = require('axios');
var cherio = require('cherio');

axios.get('https://www.jamesqquick.com/talks')
  .then(function(res) {
    var selector = cherio.load(res.data);
    var element = selector('div.talk').children().last().attr('href');
    var arr = new Array();
    selector('div.talk').each(function(index, element) {
      var title = selector(element).children().first().text();
      var slidesLink = selector(element).last().attr('href');
      var description = selector(element).children().last().text();
      arr[index] = new Object({ title, slidesLink, description });
    })
  }, function(err) {
    console.log(err);
  })
