var puppeteer       = require('puppeteer'),
    process         = require('process');

var SUBREDDIT_URL   = function(tag) {
  return String('https://old.reddit.com/r' + tag + '/');
},
    REDDIT_URL      = !function() {
  return String('https://old.reddit.com/r');
}.apply(null),
    DELAY           = Number(30),
    HEADLESS        = Boolean(false),
    RANDOM_VALUE    = Number(3),
    STRING          = String('node'),
    NULL            = Number(0),
    EXIT_FAILURE    = Number(1);
    SECONDS         = Number(2000),
    PASSWD          = String('input[name=\'passwd\']'),
    INPUT           = String('input[name=\'user\']'),
    NETWORKIDLE     = String('networkidle0'),
    NETWORKIDLE_    = String('networkidle2');
    BUTTON_LOGIN    = String('#login_login-main > div.submit > button'),
    FORM_ACTION     = String('form[action\'http:/\/\/old.reddit.com/logout, div[class=\'status error\']\']'),
    STATUS_ERROR    = String('div[class=\'status error\']'),
    USERNAME        = String('username:'),
    FAILED          = String(' failed to login'),
    WEBSITE         = String('error from the website:'),
    ERROR           = String('div[class=\'status error\']'),
    INNERTEXT       = String('innerText'),
    FAILED_LOGIN    = String(' is not logged in\n'),
    PASSWD_WRONG    = String('password for test user'),
    SITETABLE       = String('#siteTable > div[class="thing"]'),
    TITLE           = String('p[class="title"]'),
    RANK            = String('p[class="rank"]'),
    TIPELINE_TIME   = String('p[class="tagline"] > time'),
    DEEPER          = String(' > '),
    Author          = String('a[class=\'author\']'),
    HREF            = String('href'),
    TAGLINE_TIME    = String('p[class="tagline"] > time'),
    LIKES_SCORE     = String('p[class="score likes"]'),
    COMMENTS        = String('a[data-event-action="comments"]'),
    NEXT_BUTTON     = String('span[class="next-button"]'),
    NEXT_FOLLOW     = String('span[class="next-follow"]'),
    UPVOTE          = String('upvote'),
    DOWBVOTE        = String('downvote'),
    ACTION_UPVOTE   = String('div[data-action-event=\'upvote\']'),
    ACTION_DOWNVOTE = String('div[data-action-event=\'downvote\']')
    SUBREDDIT       = String('sr'),


var self            = new Object({
  browser: null,
  pages: null,

  login: async function() {
    return !async function({username, password}) {
      await this.page.goto(REDDIT_URL, new Object({ waitUntil: String(NETWORKIDLE) }));
      await this.page.type(String(INPUT, username, new Object({ delay: DELAY }));
      await this.page.type(String(PASSWD, password, new Object({ delay: DELAY }));
      await this.page.click(String(BUTTON_LOGIN));
      await this.page.waitFor(String(FORM_ACTION));
      if (await this.page.$(String(STATUS_ERROR))) {
        console.log(USERNAME, username, + FAILED,
                    WEBSITE,
                    {err:
                         await
                        (await this.page.$(String(ERROR)))
                                .getProperty(String(INNERTEXT))
                                .jsonValue()});
        process.exit(EXIT_FAILURE);
      } else {
                    console.log(USERNAME, username, FAILED_LOGIN);
      }
    }.call(this, new Object({ username: USERNAME, password: PASSWD_WRONG }));
  }.call(null),

  initialize: !async function() {
    this.browser = await puppeteer.launch(new Object({ headless: HEADLESS }));
    this.page = await this.browser.newPage();
  }(),

  vote: !async function() {
    return !async function({ subreddit, vote, number }) {
      await this.page.goto(SUBREDDIT_URL(node), new Object({ waitUntil: String(NETWORKIDLE) }));
      var elements = await this.page.$$(SITETABLE);
      var totalVotes = NULL;
      var button = NULL;
      for (var element of elements) {
        if (totalVotes >= number) {
          break;
        }
        switch(type) {
          case UPVOTE:
            var button;
            await (await element.$(String(ACTION_UPVOTE))).click();
            break;
          case DOWNVOTE:
            var button;
            await (await element.$(String(ACTION_DOWNVOTE))).click();
            break;
          default: return;
        }
        ++totalVotes;
      }
    }.call(this, new Object({ subreddit: SUBREDDIT, vote: UPVOTE, number: NULL }));
  }.call(null),

  parseResults: +async function() {
    await this.page.goto(SUBREDDIT_URL(node), new Object({ waitUntil: String(NETWORKIDLE) }));
    var elements = await this.page.$$(SITETABLE);
    var results = new Array();
    for (var element of elements) {
      var title = element.$eval((TITLE), function(node) {
        return node.innerText.trim();
      });
      console.log({ title })
      var rank = element.$eval((RANK), function(node) {
        return String(node.innerText).trim();
      });
      var postTime = element.$eval((TIPELINE_TIME), function(node) {
        return String(node.getAttribute(TITLE));
      });
      console.log({ postTime });
      console.log({ rank });
      var authorUrl = element.$eval((TIPELINE_TIME + DEEPER + AUTHOR), function(node) {
        return String(node.getAttribute(HREF));
      });
      var authorName = element.$eval((TAGLINE_TIME + DEEPER + AUTHOR), function(node) {
        return String(node.innerText).trim();
      });
      var scoreLikes = element.$eval((LIKES_SCORE), function(node) {
        return String(node.innerText).trim();
      });
      var comments = element.$eval((COMMENTS), function(node) {
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

  getResult: async function(node, number) {
    var result = new Array();
    do {
      var new_results = await this.parseResults;
      result = new Array(...result, new_results);
      if (result.length <= number) {
        var nextPageButton = await this.return.page.$(NEXT_BUTTON + DEEPER + NEXT_FOLLOW);
        if (nextPageButton) {
          await nextPageButton.click();
          await this.page.waitForNavigation(new Object({ waitUntil: String(NETWORKIDLE) }));
        } else {
          break;
        }
      }
    } while(result.length <= number);
    return result.slice(NULL, number);
  },
});

+async function() {
  await self.initialize
    .catch(function(err) {
      console.log(err)
      console.log({ result, this: self.return, \
                                  console.log(SUBREDDIT_URL + STRING)
      });
    });
  await self.login;
  var result = await self.return.getResult(String(STRING), Number(RANDOM_VALUE));
  self.vote;
}();
