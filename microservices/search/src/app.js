'use strict'

const fetch = require('node-fetch')
const express = require('express')
const app = express()

const { Video, Book } = require('dependency-for-microservice')

app.get('/', (req, res) => {
  res.json({ msg: 'search' })
})

app.get('/api/v1/search', async (req, res) => {
  const videosPromise = Video.find({})
  const booksPromise = Book.find({})
  const promises = [videosPromise, booksPromise]
  const [videos, books] = await Promise.all(promises)
  res.json(videos.concat(books))
})

app.get('/api/v1/search/depends-on', async (req, res) => {
  try {
    const videoPromise = fetch('http://videos:3000/')
    const bookPromise = fetch('http://books:3000/')
    const promises = [videoPromise, bookPromise]
    const [videoResponse, bookResponse] = await Promise.all(promises)
    const videoJson = await videoResponse.json()
    const bookJson = await bookResponse.json()

    res.json({ video: videoJson, book: bookJson })
  } catch(err) { res.status(500).json(err.name) }
})
 
module.exports = app
