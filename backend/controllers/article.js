const db = require('../prisma/queries.js')

async function posts(req, res) {
    try {
        const posts = await db.getAllarticles()
        if (!posts) {
            return res.status(404).json({
                message: "No posts have been found"
            })
        } 
        res.json(posts)

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function postById(req, res) {
    try {
        const id = req.params.id
        const post = await db.getarticleById(id)
        if (!post) {
            return res.status(404).json({
                message: "No post has been found"
            })
        }
        res.json(post)
            
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function commentsByArticleId(req, res) {
    try {
        const id = req.params.id
        const comments = await db.getArticleComments(id)
        if (!comments) {
            return res.status(404).json({
                message: "No comments have been found"
            })
        }
        res.json(comments)
            
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function createArticle(req, res) {
    try {
        const { title, content } = req.body
        if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to create a post"
            })
        }

        await db.createArticle(title, content, req.user.id) 
        res.json({
            message: "Article created successfully"
        })
            
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function editArticle(req, res) {
    try {
        const id = req.params.id
        const article = await db.getarticleById(id)
        const { title, content } = req.body
        if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to create a post"
            })
        } else if (article.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this Article"
            })
        }

        await db.editArticle(id, title, content)
        res.json({
            message: "Article has been updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

async function deleteArticle(req, res) {
    try {
       const id = req.params.id
       const article = await db.getarticleById(id)
       if (!req.user) {
            return res.status(401).json({
                message: "Please log in or signup to delete an Article"
            })
        } else if (article.userId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this Article"
            })
        }

        await db.deleteArticle(id)
        res.json({
            message: "Article has been deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(err)
    }
}

module.exports = {
    posts,
    postById,
    commentsByArticleId,
    createArticle,
    editArticle,
    deleteArticle
}



