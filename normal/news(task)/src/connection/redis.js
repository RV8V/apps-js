'use strict'

const redis = require('redis')
const bluebird = require('bluebird')

const REDIS_URL = process.env.REDIS_URL
const state = { db: null }

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisConnect = () => new Promise((resolve, reject) => {
  const client = redis.createClient(REDIS_URL)
  client.on('connect', () => {
    state.db = client
    console.log('connected to redis')
    resolve()
  })
  client.on('error', err => {
    console.log(`Error: ${err}`)
    reject(err)
  })
})

const getClient = () => state.db

module.exports = { redisConnect, getClient }
