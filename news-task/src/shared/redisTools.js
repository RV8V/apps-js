'use strict'

const redisdb = require('../connection/redis')
const { stringify, toStr, parse } = require('../shared/helpers')

const saveToRedis = async (payload, data) => {
  const client = redisdb.getClient()
  if (data) return await client.setAsync(toStr(payload), stringify(data))
  return await client.setAsync(toStr(payload._id), stringify(payload))
}

const removeFromRedis = async id => {
  const client = redisdb.getClient()
  return await client.delAsync(toStr(id))
}

const getFromRedis = async id => {
  const client = redisdb.getClient()
  return parse(await client.getAsync(toStr(id)))
}

module.exports = {
  saveToRedis,
  removeFromRedis,
  getFromRedis
}
