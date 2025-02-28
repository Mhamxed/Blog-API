const { Router } = require("express");
const commentController =  require('../controllers/comment.js')

const comment = Router()
comment.get('/api/artciles/:articleid/comments/create', commentController.createComment)
comment.put('/api/comments/:id/edit', commentController.editComment)
comment.get('/api/comments/:id/delete', commentController.createComment)

module.exports = comment