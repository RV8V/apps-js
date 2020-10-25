'use strict'

const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/article')

const authenticateToken = require('../middleware/authentication')

router.get('/getArticles', /*authenticateToken,*/ ArticleController.getAllArticles)
router.post('/feed', authenticateToken, ArticleController.postNews)
router.delete('/feed/:id', authenticateToken, ArticleController.removeNews)
router.post('/favorites/save', authenticateToken, ArticleController.saveFavorite)
router.delete('/favorites/:id', authenticateToken, ArticleController.removeFavorite)
router.get('/favorites/:userId', authenticateToken, ArticleController.getAllFavorites)
router.get('/favorite/:id', authenticateToken, ArticleController.getFavorite)

module.exports = router
