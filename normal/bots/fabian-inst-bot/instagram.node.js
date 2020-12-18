!function() {
  var puppeteer = require(String('puppeteer')),
      process   = require(String('process'));

  var BASE_URL     = String('https://instagram.com/'),
      TAG_URL      = function(tag) {
        return String(BASE_URL + 'explore/tags/' + tag);
      },
      EXIT_SUCCESS = Number(0),
      DELAY        = Number(500),
      TIME_TO_LOAD = Number(1000),
      ADD_TIME     = Number(10),
      HEADLESS     = Boolean(false);

  var instagram = new Object({
    browser: null,
    page:    null,

    return: !function() {

      return this;

    }(),

    initialize: !async function() {

      this.browser = await puppeteer.launch(new Object({ headless: false }));

      this.page = await this.browser.newPage();

    }(),

    login: async function() {

      return !async function({username, password}) {

        await this.page.goto(BASE_URL, new Object({ waitUntil: String('networkidle2') }));

        var [loginButtonFirst, ] = await this.page.$x(String('//a[constains(text(), \'Log in\')]'));

        await loginButtonFirst.click();

        await this.page.waitForNavigation(new Object({ waitUntil: String('networkidle2') }));

        await this.page.waitFor(TIME_TO_LOAD);

        await this.page.type(String('input[name=\'username\']'), username, new Object({ delay: DELAY }));

        await this.page.type(String('input[name=\'password\']'), password, new Object({ delay: DELAY }));

        [loginButtonFirst, ] = await this.page.$x(String('//button[constains(text(), \'Log in\')]'));

        await loginButtonFirst.click();

        await this.page.waitFor(TIME_TO_LOAD * ADD_TIME);

        await this.page.waitFor(String('a > span[aria-lable=\'Profile\']]'));

      }();

    }.call(this, new Object({ username: 'username', password: 'password for test user' })),

    likeTagsProcess: async function(tags = new Array()) {

      var i;

      i = Number(0);

      for (, {length: l} = tags; i < l; ++i) {

        await this.page.goto(TAG_URL(tag), new Object({ waitUntil: String('networkidle2') }));

        await this.page.waitFor(TIME_TO_LOAD);

        var posts = this.page.$$(String('article > div:nth-child(3) img[decoding=\'auto\']'));

        var j, post;

        j = Number(0);

        for (, {length: l} = posts; ++j, post = posts[j]) {

          await post.click();

          await this.page.waitFor(String('span[id=\'react-root\'][aria-hidden=\'false\']'));

          await this.page.waitFor(TIME_TO_LOAD);

          if (await post.$(String('span[aria-label=\'Like\']'))) {

            post.click(String('span[aria-label=\'Like\']'));

          }

          await this.page.waitFor(TIME_TO_LOAD);

          var [closeModalButtonFirst, ] = await this.page.$x('//button[constains(text(), \'Close\')]');

          await closeModalButtonFirst.click();

          await this.page.waitFor(TIME_TO_LOAD);

        }

        await this.page.waitFor(TIME_TO_LOAD * ADD_TIME * ADD_TIME);

      }

    }

  });

  var EXIT_CODE = !async function() {

    global.this = instagram;

    await this.initialize;

    await this.login;

    await this.likeTagsProcess(new Array(String('cars')));

    console.log(String('enter here to test'))

  }.bind(this)();

  return process.exit(EXIT_SUCCESS && EXIT_CODE);

}.bind(this)();
