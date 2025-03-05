const { Router } = require("express");
const articleController = require('../controllers/article.js')
const verifyJWT = require('../middleware/auth.js')
const article = Router()

article.get('/api/posts', articleController.posts)
article.get('/api/articles/:id/comments', verifyJWT, articleController.commentsByArticleId)
article.get('/api/articles/:id', verifyJWT, articleController.postById)
article.post('/api/articles/create', verifyJWT, articleController.createArticle)
article.put('/api/articles/:id/edit', verifyJWT, articleController.editArticle)
article.delete('/api/articles/:id/delete', verifyJWT, articleController.deleteArticle)

module.exports = article
