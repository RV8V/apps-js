'use strict'

const mongoose = require('mongoose')

const Article = require('../models/article')
const User = require('../models/user')
const UserNews = require('../models/userNews')
const UserFavorites = require('../models/userFavorites')

const saveArticles = async articles => await Article.create(articles)

const deleteArticleById = async id => {
  const news = await UserNews.findOneAndRemove({ _id: id }).exec()
  return news
}

const postArticle = async body => {
  const userArr = await User.find({ name: body.username }).exec()
  const _user = userArr[0]
  const article = new Article({
    source: body.source,
    author: body.author,
    title: body.title,
    description: body.description,
    url: body.url,
    urlToImage: body.urlToImage,
    publishedAt: body.publishedAt,
    content: body.content,
    userId: _user._id
  })
  const news = new UserNews({
    _id: new mongoose.Types.ObjectId(),
    news: [article],
    userId: article.userId
  })
  await news.save()
  return news
}

const findArticleByIdAndSaveToFav = async id => {
  const recordArr = await UserNews.find({ _id: id }).exec()
  const _record = recordArr[0]
  const favorite = new UserFavorites({
    _id: new mongoose.Types.ObjectId(),
    favorites: _record.news,
    userId: _record.userId
  })
  await favorite.save()
  return favorite
}

const removeFromFavorite = async id => {
  const favorite = await UserFavorites.findOneAndRemove({ _id: id }).exec()
  return favorite
}

const getAllFavorites = async userId => {
  const favorites = await UserFavorites.find({ userId })
  return favorites
}

const getArticles = async () => {
  const articles = await Article.find()
  return articles
}

const getFavoriteById = async id => {
  const favorite = await UserFavorites.find({ _id: id })
  return favorite
}

module.exports = {
  deleteArticleById,
  findArticleByIdAndSaveToFav,
  postArticle,
  removeFromFavorite,
  getAllFavorites,
  getFavoriteById,
  getArticles,
  saveArticles
}
