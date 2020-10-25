'use strict'

const cheerio = require('cheerio')
const request = require('request')

module.exports.getRefs = ($, url, selector) => {
  const refs = []
  const data = $('.block-title a')
  for (let i = 0; i < data.length; i++) {
    const category = $(data[i]).text().replace(/\s\s+/g, '')
    const linkOnPage = $(data[i]).attr('href').replace(/\//, '')
    if (category) refs.push({ category, linkOnPage: `${url}${linkOnPage}` })
  }
  return refs
}

module.exports.getPage = async url => new Promise((resolve, reject) => {
  request(url, (err, res, body) => {
    if (err) return reject(err)
    return resolve(cheerio.load(body, { decodeEntities: false }))
  })
})
