'use strict'

const axios = require('axios')
const { CronJob } = require('cron')

const { saveArticles } = require('../services/article')

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL

const saveAllArticles = async () => {
  try {
    const url = `${API_URL}?country=us&apiKey=${API_KEY}`
    const response = await axios.get(url)
    const arr = response.data.articles
    await saveArticles(arr)
    console.log('saved with success')
  } catch (err) { console.log('Error while saving') }
}

new CronJob('0 */2 * * *', function() {
  saveAllArticles()
}).start()
