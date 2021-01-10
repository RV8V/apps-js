var request = require('request-promise');
var cherio = require('cherio');

!async function() {
  var url = String('https://www.imdb.com/title/tt0993846/?ref_=nv_sr_1');

  var response = await request(url);

  var selector = cherio.load(response);

  var title = selector('div[class="title_wrapper"] > h1').text();

  var anotherTitle = selector('div.title_wrapper').find('h1').text();

  var poster = selector('div[class="poster"] > a > img').attr('src');

  var anotherPoster = selector('div.poster').find('a').find('img').attr('src');

  var year = selector('#titleYear > a').text();

  var anotherUrl = String('https://dev.to/grohsfabian');

  var anotherResponse = await request(anotherUrl);

  var $ = cherio.load(anotherResponse);

  var name = $('h1[class="crayons-title fw-heavy mb-2"]').text().trim();

  var date = $('#page-content-inner > div.brand-bg > div > header > div.profile-header__details > div > span:nth-child(2) > time').text();

  var socials = new Array();

  $('span[class="profile-header__meta__item -ml-1"] > a').each(function(index, element) {
    var url = $(element).attr('href');
    socials[index] = url;
  });

  var wiki = String('https://en.wikipedia.org/wiki/List_of_mosques');

  var wikiArab = String('https://en.wikipedia.org/wiki/List_of_mosques_in_the_Arab_League');

  var wikiResponse = await request(wikiArab);

  var mosquesResponse = await request(wiki);
  var sel = cherio.load(mosquesResponse);

  var $ = cherio.load(wikiResponse);

  var mosques = new Array();
  var mosquesArab = new Array();

  /*$('tr[valign=top] > td > b > a').each(function(index, element) {
    var url = $(element).attr('href');
    var name = $(element).text();
    mosques[index] = new Object({url, name});
  });*/

/*  $('tr[valign=top] > td').each(function(index, element) {
  //  var url = $(element).attr('href');
    var name = $(element).text();
    mosques[index] = new Object({url, name});
  });*/

//  $("li:first")

/*  $('tr[valign=top] > td').each(function(index, element) {
  //  var url = $(element).attr('href');
    var name = $(element).children().first().text().trim();
    if (name) {
      mosquesArab.push(new Object({name}));
    }
  });*/

  /*$('tr[valign=top] > td').each(function(index, element) {
    //console.log({ element })
    //  var url = $(element).attr('href');
    var name = $(element).find('a').text().trim();
    if (name) {
      mosquesArab.push(new Object({name}));
    }
  });*/




  $('tr[valign=top]').each(function(index, element) {
    //console.log({ element })
    //  var url = $(element).attr('href');
    var name = $(element).first().find('a').text().trim();
    if (name) {
      mosquesArab.push(new Object({name}));
    }
  });







  /*$('tr[valign=top] > td > a').each(function(index, element) {
  //  var url = $(element).attr('href');
    var name = $(element).first().attr('title');
    mosquesArab[index] = new Object({name});
  });*/

  console.log({ title, anotherTitle, poster, anotherPoster, year, name, date, socials, mosquesArab: mosquesArab.length })
}();
