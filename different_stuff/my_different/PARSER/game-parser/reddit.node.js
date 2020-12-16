var puppeteer = require('puppeteer');

var SUBREDDIT_URL = String('https://old.reddit.com/r');

var self = new Object({
  browser: null,
  pages: null,

  initialize: async function(node) {

    this.browser = await puppeteer.launch(new Object({ headless: false }));
    this.page = await this.browser.newPage();

    await this.page.goto(SUBREDDIT_URL + String(node), new Object({ waitUntil: String('networkidle0') }));

  },

  parseResults: +async function() {

    var elements = await this.page.$$('#siteTable > div[class="thing"]');

    var results = new Array();

    for (var element of elements) {

      var title = element.$eval(('p[class="title"]'), function(node) {

        return node.innerText.trim();


      });

      console.log({ title })

      var rank = element.$eval(('p[class="rank"]'), function(node) {

        return String(node.innerText).trim();

      });

      var postTime = element.$eval(('p[class="tagline"] > time'), function(node) {


        return String(node.getAttribute('title'));


      })

      console.log({ postTime });

      console.log({ rank });


      var authorUrl = element.$eval(('p[class="tagline"] > a[class*="author"]'), function(node) {

        return String(node.getAttribute('href'));


      });


      var authorName = element.$eval(('p[class="tagline"] > a[class*="author"]'), function(node) {

        return String(node.innerText).trim();

      });

      var scoreLikes = element.$eval(('p[class="score likes"]'), function(node) {


        return String(node.innerText).trim();

      });


      var comments = element.$eval(('a[data-event-action="comments"]'), function(node) {


        return String(node.innerText).trim();

      });


      console.log({ authorUrl, authorName, scoreLikes, comments });

      results.push(new Object({
                title,
                rank,
                postTime,
                authorUrl,
                authorName,
                comments,
                scoreLikes
      }));

    }

    return results;

  }(),

  return: +function() {


    return this;
  },

  getResult: async function(number) {

    var result = new Array();

    do {

      var new_results = await this.parseResults;

      result = new Array(...result, new_results);

      if (result.length <= number) {

        var nextPageButton = await this.return.page.$('span[class="next-button"] > a[rel="follow next"]');

        if (nextPageButton) {

          await nextPageButton.click();

          await this.page.waitForNavigation(new Object({ waitUntil: String('networkidle0') }));

        } else {

          break;

        }
      }

    } while(result.length <= number);

    return result.slice(0, number);
  }


});

+async function() {

  console.log(SUBREDDIT_URL + 'node')
  await self.initialize('node')
    .catch(function(err) {
      console.log(err)
    });

  var result = await self.return.parseResults;

  console.log({ result, this: self.return });

}();
