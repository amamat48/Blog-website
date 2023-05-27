const express = require('express')
const router = express.Router()
const User = require('../models/Users')

// INDUCES

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await User.findById(req.params.id)
        res.json('Succesfully Deleted')
    } catch (err) {
        res.status(500).json('Error deleting')
        consolde.log(err)
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json('Error updating')
        console.log(err)
    }
})

// Create

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (err) {
        res.status(500).json('Error creating')
        console.log(err)
    }
})

// Show
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
    } catch (err) {
        res.status(500).json('Error finding')
        console.log(err)
    }
})

module.exports = router