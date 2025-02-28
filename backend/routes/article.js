const { Router } = require("express");
const articleController = require('../controllers/article.js')
const article = Router()

article.get('/api/posts', articleController.posts)
article.get('/api/articles/:id/comments', articleController.commentsByArticleId)
article.get('/api/articles/:id', articleController.postById)
article.post('/api/articles/create', articleController.createArticle)
article.put('/api/articles/:id/edit', articleController.editArticle)
article.delete('/api/articles/:id/delete', articleController.deleteArticle)

module.exports = article
