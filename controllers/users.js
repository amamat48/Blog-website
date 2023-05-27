const express = require('express')
const router = express.Router()

// INDUCES

// Delete
router.delete('/:id', (req, res) => {
    res.send('Deleted')
})

// Update
router.put('/:id', (req, res) => {
    res.send('Updated')
})

// Create, handled by react as my sign up form

// Show
router.get('/:id')

module.exports = router