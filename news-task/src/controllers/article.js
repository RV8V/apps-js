'use strict'

const {
  saveToRedis,
  removeFromRedis,
  getFromRedis
} = require('../shared/redisTools')

const {
  deleteArticleById,
  findArticleByIdAndSaveToFav,
  postArticle,
  removeFromFavorite,
  getAllFavorites,
  getFavoriteById,
  getArticles,
} = require('../services/article')

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await getArticles()
    return res.status(200).json(articles)
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.postNews = async (req, res) => {
  try {
    const news = await postArticle(req.body)
    return res.status(200).json({
      message: 'News was saved',
      id: news._id
    })
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.removeNews = async (req, res) => {
  try {
    await deleteArticleById(req.params.id)
    return res.sendStatus(204)
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.saveFavorite = async (req, res) => {
  try {
    const favorite = await findArticleByIdAndSaveToFav(req.body.id)
    await saveToRedis(favorite)
    res.status(200).json({
      message: 'Article was added to favorites',
      id: favorite._id
    })
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.removeFavorite = async (req, res) => {
  try {
    await removeFromFavorite(req.params.id)
    await removeFromRedis(req.params.id)
    return res.status(204).json({ message: 'Article was removed from favorites' })
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.getAllFavorites = async (req, res) => {
  try {
    const redisCache = await getFromRedis(req.params.userId)
    if (redisCache) return res.status(200).json({
      message: 'from cache',
      data: redisCache
    })
    console.log('no in cache')
    const favorites = await getAllFavorites(req.params.userId)
    await saveToRedis(req.params.userId, favorites)
    return res.status(204).json({ // call this route twice to get data from cache
      message: 'not from cache',
      data: favorites // not rendered data
    })
  } catch (err) { return res.status(500).json({ error: err }) }
}

exports.getFavorite = async (req, res) => {
  try {
    const redisCache = await getFromRedis(req.params.id)
    if (redisCache) return res.status(200).json({
      message: 'from cache',
      data: redisCache
    })
    const favorite = await getFavoriteById(req.params.id)
    await saveToRedis(favorite)
    return res.status(200).json({
      message: 'not from cache',
      data: favorite
    })
  } catch (err) { return res.status(500).json({ error: err }) }
}
