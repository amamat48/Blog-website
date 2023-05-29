const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// INDUCES

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body
        // Check if the user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })
        // Generate a token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        res.json(token)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
        console.eroor(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        // Find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        // Check the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)
        res.json(token)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
        console.error(err)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json('Succesfully Deleted')
    } catch (err) {
        res.status(500).json('Error deleting')
        console.eroor(err)
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json('Error updating')
        console.error(err)
    }
})



// Show
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
        res.json(foundUser)
    } catch (err) {
        res.status(500).json('Error finding')
        console.log(err)
    }
})

module.exports = router