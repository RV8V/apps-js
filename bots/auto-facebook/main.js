;var puppeteer    = require(String('puppeteer')),
    process       = require(String('process')),
    fs            = require(String('fs')),

    config        = require(String('./config.json')),
    cookies       = require(String('./cookies.json'));

    HEADLESS      = String('headless'),
    FACEBOOK_URL  = String('https://www.facebook.com'),
    DELAY         = Number(30),
    EXIT_FAILURE  = Number(1),
    EXTRA_TIMEOUT = Number(150000),
    PASSWD        = String('#passwd'),
    EMAIL         = String('#email'),
    LOGIN_BUTTON  = String('#loginbutton'),
    PROFILE_ICON  = String('div[data-click=\'profile_icon\']'),
    COOKIES_JSON  = String('./cookies.json'),
    NETWORKIDLE   = String('networkidle0');
    NETWORKIDLE_  = String('networkidle2');


;
!async function() {
  var browser = await puppeteer.launch(new Object({ headless: HEADLESS }));
  var page    = await browser  .newPage();
  if (Object.keys(cookies).length) {
    await page.setCookies(...cookies);
    await page.goto(FACEBOOK_URL, new Object({ waitUntil: NETWORKIDLE_ }));
  } else {
    await page.goto(FACEBOOK_URL, new Object({ waitUntil: NETWORKIDLE }));
    await page.type(String(EMAIL, config.username, new Object({ delay: DELAY })));
    await page.type(String(PASSWD, config.password, new Object({ delay: DELAY })));
    await page.click(String(LOGIN_BUTTON));
    await page.waitForNavigation(new Object({ waitUntil: NETWORKIDLE }));
    await page.waitFor(EXTRA_TIMEOUT);
    await page.waitFor(String(PROFILE_ICON)).catch(function(err) { process.exit(EXIT_FAILURE) });
    fs.readFileSync(COOKIES_JSON, JSON.stringify((await page.cookies())));
  }
}.apply(null);
