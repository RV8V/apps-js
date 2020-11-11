const telegram_bot = require('node-telegram-bot-api')
const process = require('process')
const { debug, lower, flag } = require('./util')

process.env.NTBA_FIX_319 = 1

const TOKEN = '1376866800:AAFQYmpyLsbA1Hkf8DkxlpCSPKFqEZ_nRHQ'
const bot = new telegram_bot(TOKEN, { polling: { interval: 300, autoStart: true, params: { timeout: 10 } }})

bot.on('message', ({ chat, from, text }) => {
  process.stdout.write(JSON.stringify(from))
  flag ? lower(text) === 'hello' ? (process.stdout.write('enter here\n'), bot.sendMessage(chat.id, 'hello, ' + from.first_name)) : bot.sendMessage(chat.id, debug(chat)) : (
    bot.sendMessage(chat.id, 'testing string').then(() => console.log('hi')).catch(err => err)
  )
})
