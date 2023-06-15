const express = require('express')
const router = express.Router()

const Blogs = require('../models/Blogs')
const Comment = require('../models/Comments')
const User = require('../models/Users')

const requireAuth = require('../middleware/requireAuth')

// INDUCES

// auth middleware

router.use(requireAuth)

// Index
router.get('/', async (req, res) => {
    try {

        const allBlogs = await Blogs.find({}) // find all blogs

        const blogsWithComments = []


        for (let i = 0; i < allBlogs.length; i++){ // loop through blog array

            const blog = allBlogs[i] // get every blog

            const comments = []

            const userId = blog.user // get the id of the user that made the blog

            const user = await User.findById(userId) // get the user from userId



            for (let j = 0; j < blog.comments.length; j++){ // loop through comments arrya on blogs object

            const commentId = blog.comments[j] // get the id

            const foundComment = await Comment.findById(commentId) // find comment in database


            comments.push( // push the comment with the name of the user in the database into the comments array
                {
                comment: foundComment,
                user: user.name
                }
                )
            }
            const blogWithComments = { // initialize new object
                 blog,
                 comments,
                 user // add user object
            }
            blogsWithComments.push(blogWithComments) // push object to array
        }


        res.json(blogsWithComments) // send array with the blogs and the comments

    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})
//Updated the blog itself
router.put('/edit/:id', async (req, res) => {
    try {
        const blogId = req.params.id
        const { title, entry } = req.body

        console.log(user)
        const blog = await Blogs.findByIdAndUpdate(
            blogId,
            { title, entry, },
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
// Updating for the new comments
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

    const { user } = req.body
    console.log(user)
    try {

        const newBlog = await Blogs.create(req.body)
        await User.findByIdAndUpdate(
            user,
            { $push: {blogs: newBlog._id}},
            { new: true })

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

