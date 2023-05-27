const express = require('express')
const router = express.Router()
const Blogs = require('../models/Blogs')

// INDUCES

// Index
router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blogs.find({})
        res.json(allBlogs)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
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
        const blog = Blogs.findByIdAndUpdate(req.params.body, req.body, { new: true })
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
        res.json(Blog)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})

module.exports = router

