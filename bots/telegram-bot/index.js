const telegram_bot = require('node-telegram-bot-api')
const process = require('process')
const { debug, lower, flag, html_format, reference } = require('./util')

process.env.NTBA_FIX_319 = 1

const TOKEN = '1376866800:AAFQYmpyLsbA1Hkf8DkxlpCSPKFqEZ_nRHQ'
const bot = new telegram_bot(TOKEN, { polling: { interval: 300, autoStart: true, params: { timeout: 10 } }})

bot.on('message', ({ chat, from, text }) => {
  const html = `<h2><strong>hello, ${from.first_name}</strong><i>test message</i></h2><hr /><pre>${debug(from)}</pre>`
  const markdown = `*hello, ${from.first_name}* _Italic spme testing text in md_`
  process.stdout.write(JSON.stringify(from))
  flag ? lower(text) === 'hello' ? (process.stdout.write('enter here\n'), bot.sendMessage(chat.id, 'hello, ' + from.first_name)) : bot.sendMessage(chat.id, debug(chat)) : setTimeout(() => (
    bot.sendMessage(chat.id, 'http://localhost/8008', html_format && reference ? { parse_mode: 'HTML', disable_web_page_preview: false } : { parse_mode: 'Marhdown', disable_notification: true }).then(() => process.stdout.write('\nhi\n')).catch(err => err)), 4000)


  text === 'shut down' ? bot.sendMessage(chat.id, 'closing keyboard', { reply_markup: { remove_keyboard: true } }) : 'sending keyboard once more'
  text === 'answer' ? bot.sendMessage(chat.id, 'answering', { reply_markup: { force_reply: true } }) : 'the same one'

  bot.sendMessage(chat.id, 'keyboard', {
    reply_markup: {
      keyboard: [ [{ text: 'send location', request_location: true}], ['answer', 'shut down'], [{ text: 'send contact', request_contact: true }], ['what do you want to see'] ], one_time_keyboard: true
    }
  })
})

bot.onText(/\/start/, ({ chat: { id } }) => bot.sendMessage(id, 'hello'))

bot.onText(/\/help (.+)/, ({ chat: { id }, }, [source, match]) => bot.sendMessage(id, debug(match)))
