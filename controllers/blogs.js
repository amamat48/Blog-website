const express = require('express')
const router = express.Router()

const Blogs = require('../models/Blogs')
const Comment = require('../models/Comments')

// INDUCES

// Index
router.get('/', async (req, res) => {
    try {

        const allBlogs = await Blogs.find({})

        const blogsWithComments = []

        for (let i = 0; i < allBlogs.length; i++){

            const blog = allBlogs[i]

            const comments = []

            console.log(`This is the blog ${blog}`)

            for (let j = 0; j < blog.comments.length; j++){

            const commentId = blog.comments[j]

            const foundComment = await Comment.findById(commentId)

            console.log(`This is the found comments ${foundComment}`)
            console.log(`These are the ids ${commentId}`)

            comments.push(foundComment)
            }
            const blogWithComments = {
                 blog,
                 comments
            }
            blogsWithComments.push(blogWithComments)
        }



        res.json(blogsWithComments)

    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const blogId = req.params.id
        const { title, entry } = req.body

        const blog = await Blogs.findByIdAndUpdate(
            blogId,
            { title, entry },
            { new: true }
        )
        res.json(blog)
    } catch (err) {
        res.status(500).json(err)
    }
})

//New handled by react

// Delete

router.delete('/:id', async (req, res) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id)
        res.json({ message: 'Successfully deleted the blog' })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// Update

router.put('/:id', async (req, res) => {
    try {
        const blogId = req.params.id
        const { entry } = req.body

        const newComment = await Comment.create({ entry })

        const blog = await Blogs.findByIdAndUpdate(
            blogId,
            { $push: { comments: newComment._id } }, // pushes the new destination to the array in the database
            { new: true }
            )
        console.log(`This is the blog data ${blog}`)
        res.json(blog)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blogs.create(req.body)
        res.json(newBlog)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Edit handdled by react

// Show
router.get('/:id', async (req, res) => {
    try {
        const Blog = await Blogs.findById(req.params.id)
        const comments = []
        for (let i = 0; i < Blog.comments.length; i ++) {
            const comment = await Comment.findById(Blog.comments[i])
            console.log(comment)
            comments.push(comment)
        }
        res.json({  Blog, comments })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})

module.exports = router

