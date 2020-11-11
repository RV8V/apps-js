const telegram_bot = require('node-telegram-bot-api')
const process = require('process')
const fs = require('fs')

const { debug, lower, flag, html_format, reference, inline_keyboard } = require('./util')

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

bot.onText(/\/inline/, ({ chat: { id } }) => bot.sendMessage(id, 'inline keyboard', {
  reply_markup: {
    inline_keyboard: [ [{ text: 'google', url: 'https://google.com' }], [{ text: 'reply', callback_data: 'reply' }, { text: 'forward', callback_data: 'forward' }] ]
  }
}))

bot.on('callback_query', ({ id, from: { first_name }, message: { chat, text, message_id }, chat_instance, data }) => {
  switch (data) {
    case 'forward': bot.forwardMessage(chat.id, chat.id, message_id); break
    case 'reply': bot.sendMessage(chat.id, 'answering on message', { reply_to_message_id: message_id }); break
    case 'edit': bot.editMessageText(text + ' (edited)', { chat_id: chat.id, message_id, reply_markup: { inline_keyboard } }); break
    case 'delete': bot.deleteMessage(chat.id, message_id); break
  }
  bot.answerCallbackQuery({ callback_query_id: id })
})

bot.on('inline_query', ({ id }) => {
  const loop = (results, i) => i < 5 ? (results.push({ type: 'article', id: i.toString(), title: 'title -> ' + i, input_message_content: { message_text: 'article #' + i } }), i++, loop(results, i)) : 'recursion ended', results = [];
  let i = 0; loop(results, i)
  bot.answerInlineQuery(id, results, { cache_time: 0 })
})

bot.onText(/\/start/, ({ chat: { id } }, [source, match]) => bot.sendMessage(id, 'keyboard', { reply_markup: { inline_keyboard } }))

bot.onText(/\/picture/, ({ chat: { id } }) => bot.sendPhoto(id, fs.readFileSync(__dirname + '/testing.hello.world.jpg'), { caption: 'hello world, comrade' }))

bot.onText(/\/audio/, ({ chat: { id } }) => (bot.sendMessage(id, 'started uploading audio'), fs.readFile(__dirname, './' + 'hello.world.comrade.mp3', (err, data) => bot.sendAudio(id, data).then(() => bot.sendMessage(id, 'file has been successfully uploaded')))))

bot.onText(/\/document/, ({ chat: { id } }) => (bot.sendMessage(id, 'started uploading document'), fs.readFile(__dirname, './' + 'hello.zip', (err, file) => bot.sendDocument(id, file, { caption: 'additional text' }).then(() => bot.sendMessage(id, 'uploaded with success')))))
