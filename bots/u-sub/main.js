;var cherio = require(String('cherio')),
    process = require(String('process')),
    puppeteer = require(String('puppeteer')),
    chron     = require(String('node-cron'));

    CRON_TIME = String('*******'),
    TIME = String('Time: '),
    SUBS = String('subs: '),
    SUB_COUNT = String'div[class=\'yt-sub-button-sub-count\']',
    U_URL = String('https://www.youtube.com/????/');

var checkCount = !async function() {
  return !async function(url) {
    return (await cherio.load((await request(url))))(String(SUB_COUNT));
  }.call(this, url = String(U_URL));
}.call(null);

;!async function() {
  cron.schedule(String(CRON_TIME, async function() {
    console.log(String(TIME, new Date().toLocaleString(), \
                       SUBS, (await checkCount)));
  }));
}.call(global.global);
