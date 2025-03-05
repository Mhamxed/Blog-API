const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function getAllarticles() {
    return prisma.article.findMany({
        include: {
            user: true
        }
    })
}

async function getarticleById(id) {
    return await prisma.article.findFirst({
        where: {
            id: parseInt(id)
        }
    })
}

async function  getCommentById(id) {
    return await prisma.comment.findFirst({
        where: {
            id: parseInt(id)
        }
    })
}

async function createArticle(title, content, userId) {
    await prisma.article.create({
        data: {
            title: title,
            content: content,
            created_at: new Date(),
            userId: userId
        }
    })
    await prisma.user.update({
        where: {
            id: parseInt(userId)
        },
        data: {
            isAuthor: true
        }
    })
}

async function editArticle(id, title, content) {
    await prisma.article.update({
        where: {
            id: parseInt(id)
        },
        data: {
            title: title,
            content: content,
            created_at: new Date(),
        },

    })
}

async function deleteArticle(id) {
    await prisma.article.delete({
        where: {
            id: parseInt(id)
        }
    })
}

async function getArticleComments(article_id) {
    return await prisma.comment.findMany({
        where: {
            articleId: parseInt(article_id)
        },
        include: {
            user: true
        }
    })
}

async function createComment(comment, userId, articleId) {
    await prisma.comment.create({
        data: {
            userId: parseInt(userId),
            articleId: parseInt(articleId),
            content: comment,
        }
    })
}

async function editCmment(id, content) {
    await prisma.comment.update({
        where: {
            id: parseInt(id)
        },
        data: {
            content: content
        }
    })
}

async function deleteComment(id) {
    await prisma.comment.delete({
        where: {
            id: parseInt(id)
        }
    })
}

async function getCommentById(id) {
    return await prisma.comment.findFirst({
        where: {
            id: parseInt(id)
        }
    })
}

async function createUser(fullname, username, password) {
    await prisma.user.create({
        data: {
            fullname: fullname,
            username: username,
            password: password
        }
    })
}

async function getUser(username) {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
    })
}

async function getUserById(id) {
    return await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    })
} 

module.exports = {
    getAllarticles,
    getarticleById,
    getArticleComments,
    createArticle,
    editArticle,
    deleteArticle,
    createComment,
    editCmment,
    deleteComment,
    getCommentById,
    createUser,
    getUser,
    getUserById,
    getCommentById
}