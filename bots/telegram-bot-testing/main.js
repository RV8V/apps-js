const telegram_bot = require('node-telegram-bot-api'), process = require('process'), fs = require('fs'), { connect, model } = require('mongoose'), geolib = require('geolib'), _ = require('lodash')
const { TOKEN, DATABASE } = require('./config'), { log_start, send_films_by_query, get_item_uuid, get_cinema_coords, show_favourite_films, change_film, show_cinemas_by_query } = require('./util'), { kb, kb_buttons } = require('./buttons'), database = require('../database.yaml'), { film_schema, cinema_schema, user_schema } = require('./model')
const film = model('films'), cinema = model('cinemas'), users = model('users')

process.env.NTBA_FIX_319 = 1; log_start()
connect(DATABASE, { useMongoClient: true }).then(() => process.stdout.write('mongo connected\n')).catch(({ message }) => process.stdout.write(message))
database.forEach(_film => new film(_film).save().catch(({ message }) => process.stdout.write(message + '\n')))
database.forEach(_cinema => new cinema(_cinema).save().catch(err => process.stdout.write(err.message + '\n')))

const bot = new telegram_bot(TOKEN, { polling: true })

bot.on('message', ({ text, chat: { id }, location, from: { id } }) => {
  switch (text) {
    case kb_buttons.film.comedy: send_films_by_query(id, { type: 'comedy' }); break
    case kb_buttons.film.action: send_films_by_query(id, { type: 'action' }); break
    case kb_buttons.film.random: send_films_by_query(id, {}); break
    case kb_buttons.home.favourite: show_favourite_films(chat_id, id); break
    case kb_buttons.home.films: bot.sendMessage(id, 'choose what u want', { reply_markup: { keyboard: kb.films } }); break
    case kb_buttons.home.cinemas: bot.sendMessage(id, 'send location', { reply_markup: { keyboard: keyboard.cinemas } }) break
    case kb_buttons.back: bot.sendMessage(id, 'what u want to see', { reply_markup: { keyboard: kb.home } }); break
  }

  location ? (process.stdout.write(JSON.stringify(location) + '\n'), get_cinema_coords(id, location)) : 'no location passed'
})

bot.onText(/\/start/, ({ from: { first_name }, chat: { id } }) => bot.sendMessage(id, 'hello, ' + first_name + '\n' + 'choose a command for starting', { reply_markup: { keyboard: kb.home } }))
bot.onText(/\/f(.+)/, ({ chat: { id } }, [source, match]) => (process.stdout.write(get_item_uuid(source)), film.findOne({ uuid: get_item_uuid(source) }).then(film => (process.stdout.write(JSON.stringify(film)), bot.sendPhoto(id, film.picture, { caption: 'name: ' + film.name + '\n' + 'year:' + film.year + '\n' + 'and other fields' }))).catch(() => 'good bye')))
bot.onText(/\/c(.+)/, ({ chat: { id } }, [source, match], uuid = undefined) => (uuid = get_item_uuid(source), cinema.findOne({ uuid }).then(cinema => (process.stdout.write(JSON.stringify(cinema) + '\n'), bot.sendMessage(id, 'cinema: ' + cinema.name, { reply_markup: { inline_keyboard: [[text: cinema.name, url: cinema.url], [text: 'show in map', callback_data: JSON.stringify(cinema.uuid)], [text: 'show current films', callback_data: JSON.stringify(cinema.films)]] } })))))
bot.on('callback_query', async ({ data, from: { id }, message: { chat: { chat_id } } }, _data = null, type = undefined) => (await _data = JSON.parse(data)).catch(err => throw new Error('data is not an object')), type = data.type, type === ACTION_TYPE.SHOW_CINEMAS_MAP ? bot.sendLocation(chat_id, { latitude } = data, { longitute } = data) : '', type === ACTION_TYPE.SHOW_CINEMAS ? show_cinemas_by_query(user_id, { uuid: '$in': data.cinemas_uuids }) : '', type === ACTION_TYPE.WHAT ? change_film(id, user_id, _data) : '', type === ACTION_TYPE.SHOW_FILMS ? send_films_by_query(user_id, { uuid: '$in': data.films_uuids }) : '')
bot.on('inline_query', ({ id }, results = null) => (film.find({}).then(films => (results = films.map(({ uuid, picture, name, year, rate, length, url, link }) => { id: uuid, type: 'photo', photo_url: picture, a_url: picture, caption: 'long description', reply_markup: { inline_keyboard: [[{ text: 'movies searching' + name, url: link }]] } }), bot.answerCallbackQuery(id, results, { cache_time: 0 })))))
