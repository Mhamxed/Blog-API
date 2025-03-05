const { Router } = require("express");
const commentController =  require('../controllers/comment.js')
const verifyJWT = require('../middleware/auth.js')

const comment = Router()
comment.get('/api/artciles/:articleid/comments/', verifyJWT, commentController.getArticleCommentsById)
comment.get('/api/comments/:id', verifyJWT, commentController.getCommentById)
comment.post('/api/artciles/:articleid/comments/create', verifyJWT, commentController.createComment)
comment.put('/api/comments/:id/edit', verifyJWT, commentController.editComment)
comment.delete('/api/comments/:id/delete', verifyJWT, commentController.deleteComment)

module.exports = comment