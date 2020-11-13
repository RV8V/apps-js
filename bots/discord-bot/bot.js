const process = require('process'), { parsed: { WEBHOOK_ID, WEBHOOK_TOKEN, DISCORD_BOT_TOKEN } } = require('dotenv').config(), { Client, WebhookClient } = require('discord.js')
const { logger } = require('./util')

const client = new Client({ partials: ['MESSAGE', 'REACTION'] }), webhookClient = new webhookClient(WEBHOOK_ID, WEBHOOK_TOKEN), PREFIX = '#'

client.on('ready', () => logger('the bot has logged in\n' + client.user.username))

client.on('message', async ({ content: { startsWith, substring }, channel: { send }, author: { bot }, reply, guild: { members: { cache } } }, CMD_NAME, args, member) => (bot ? 'only once sending'
  : (startsWith(PREFIX) ? ([CMD_NAME, ...args: [id, _]] = content.trim().substring(PREFIX.length).split(''), logger(CMD_NAME), CMD_NAME === 'kick' ? send('kick the user')
  : CMD_NAME === 'banned' ? !args.length ? member.hasPermission('KICK_MEMBERS') ? reply('u do not have permissions to use that command') : reply('please, provide an id')
  : (member = cache.get(id), logger(member), member ? member.kick().then(message => send(member + ' was kicked')).catch(_ => send('no permissions')) : send('bann the user')) : send('that member was not found'))
  : logger(content), content === 'hello' ? channel.send(content + ', friend') : CMD_NAME === 'ban' ? member.hasPermission('BAN_MEMBERS') ? reply('u do not have permissions to use that command')
  : (!args.length ? reply('id provide please' : (user = await members.ban(id).catch(_ => (logger(_.message)), send('user was not found')), user ? send('user was banned with success') : 'unfortunately'))
  : (, send('message was not found')))))

client.on('messageReactionAdd', ({ message: { id, guild: { members: { cache } } }, emoji: { name } }, {}) => id === '39417401325701732'
  ? 'todo -> handle/manage different emoji' : 'todo -> sending answer')

client.login(parsed.DISCORD_BOT_TOKEN)
