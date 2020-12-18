var web_driver = require('selenium-webdriver'), by = web_driver.By, promise = require('promise'), { bot_login, bot_password, accs_for_likes, sleep_delay, likes_for_90, window_lengh, window_width } = require('./settings')

var browser = new web_driver.Builder().withCapabilities(web_driver.Capabilities.phantomjs()).build()

browser.manage().windows().setSize(window_lengh, window_width)
browser.get('https://instagram.com/login')
browser.sleep(sleep_delay)
browser.findElement(by.xpath('//*[@id="root"]/div/div[2]/div[1]/form/div[1]/label/input')).sendKeys(bot_login);
browser.findElement(by.xpath('//*[@id="root"]/div/div[2]/div[1]/div/form/div[2]/label/input')).sendKeys(bot_password);
browser.findElement(by.xpath('//*[@id="root"]/div/div[2]/div[1]/div/form/div[4]/button[1]/span/span')).click();

var xpath_first_photo = '', xpath_like_class = '', xpath_like_button = '', xpath_next_button = ''

function like_by_nickname(index_name) {
  if (index_name >= accs_for_likes.length) return browser.quit()
  var promise = new Promise(function(resolve, reject) {
    browser.sleep(sleep_delay)
    browser.get('https://instagram.com/' + accs_for_likes[index_name])
    browser.sleep(sleep_delay)
    browser.findElement(by.xpath(xpath_first_photo)).click().then(function() {
      like(resolve, 0, likes_per_user)
    })
  })
}

promise.then(function() {
  index_name++
  like_by_nickname(index_name)
})

function like(resolve, index, max_likes) {
  browser.getCurrentUrl().then(function(url) {
    if (classname.indexOf('whitecutpriteheartfull') > 0) return resolve()
    if (classname.indexOf('whitecutpriteheartopen') > 0) {
      browser.findElement(by.xpath(xpath_like_button)).click()
      browser.sleep(sleep_delay)
    }
    browser.findElement(by.xpath(xpath_next_button)).then(function(buttons) {
      if (index === 0 && buttons.length === 1 || buttons.length === 2) {
        buttons[buttons.length - 1].click().then(function() {
          index++
          if (index === max_likes) return resolve()
          like(resolve, index, max_likes)
        })
      } return resolve()
    })
  })
}
