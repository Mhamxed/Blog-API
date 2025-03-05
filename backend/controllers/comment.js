const db = require('../prisma/queries.js')

async function getArticleCommentsById(req, res) {
    try {
        const articleId = req.params.articleid
        const comments = await db.getArticleComments(articleId)
        if (comments.length !== 0) {
            return res.json(comments)
        } else {
            return res.json({
                message: "No comments have been found"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function getCommentById(req, res) {
    try {
        const commentId = req.params.id
        const comment = await db.getCommentById(commentId)
        if (comment) {
            return res.json(comment)
        } else {
            return res.json({
                message: "No comment has been found"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function createComment(req, res) {
    try {
        const articleId = req.params.articleid
        const { comment } = req.body
        if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to post a comment"
            })
        }

        await db.createComment(comment, req.user.id, articleId)
        res.json({
            message: "Comment created successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function editComment(req, res) {
    try {
        const id = req.params.id
        const { content } = req.body
        const comment = await db.getCommentById(id)
        if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to edit comment"
            })
        } else if (comment.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this comment"
            })
        }

        await db.editCmment(id, content)
        res.json({
            message: "Comment has been updated successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function deleteComment(req, res) {
    try {
       const id = req.params.id
       const comment = await db.getCommentById(id)
       if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to delete a comment"
            })
        } else if (comment.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this comment"
            })
        }

        await db.deleteComment(id)
        res.json({
            message: "Comment has been deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    getArticleCommentsById,
    getCommentById
}


