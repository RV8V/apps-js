const cherio = require('cherio');
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const slogify = require('transliteration').slogify;

const LAUNCH_PUPPETEER_OPTS = new Object({
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1000'
  ]
});

const PAGE_PUPPETEER_OPTS = new Object({
  networkIdled2Timeout: 5000,
  waitUntil: 'networkIdled2',
  timeout: 30000000
});

const getPageContent = async url => {
  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    const page = await browser.newPage();
    await page.goto(url, PAGE_PUPPETEER_OPTS);
    const content = await page.content();
    browser.close();
    return content;
  } catch(err) {
    throw err
  }
}

const arrayFromLength = number => {
  return new Array.from(new Array(number).keys()).map(key => key + 1);
}

const site = ''
const pages = 0

(async () => {
  try {
    for (const page of arrayFromLength(pages)) {
      const url = site + page;
      const pageContent = await getPageContent(url);
      const $ = cherio.load(pageContent);
      const items = new Array();
      $('.mosaic_title').each((i, header) => {
        const url = $(header).attr('href');
        const title = $(header).text();
        items.push(new Object({
          title, url, code: slogify(title)
        }))
      })
    }
  } catch(err) {
    console.log(chalk.red('an error has occured\n'))
    console.log(err)
  }
})()
