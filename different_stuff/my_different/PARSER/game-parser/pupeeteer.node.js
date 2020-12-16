var puppeteer = require('puppeteer');

+async function() {
  var url = String('https://www.imdb.com/title/tt0993846/?ref_=nv_sr_1');

  var browser = await puppeteer.launch(new Object({ headless: false })); /*open a new tab in browser*/

  var page = await browser.newPage();

  await page.goto(url, new Object({ waitUntil: 'networkidle2' }));

  var data = await page.evaluate(function() {

    /*
    document.querySelector('div[class="title_wrapper"] > h1').innerText
    "Вовк з Волл-стріт (2013)"
    document.querySelector('span[itemprop="ratingValue"]').innerText
    "8,2"
    document.querySelector('span[class="small"]').innerText
    "1 167 120"
    */

    var title = window.document.querySelector('div[class="title_wrapper"] > h1').innerText

    var rating = window.document.querySelector('span[itemprop="ratingValue"]').innerText

    var ratingCount = window.document.querySelector('span[class="small"]').innerText

    return new Object({
      title,
      rating,
      ratingCount
    })
  }).catch(function(err) {
    console.log(err);
  });

  console.log({ data });

  await browser.close();
}();
