const express = require('express')
const router = express.Router()

// INDUCES

// Index
router.get('/', (req, res) => {
    res.send('Hello')
})

//New handled by react

// Delete

router.delete('/:id', (req, res) => {
    res.send('Deleted')
})

// Update

router.put('/:id', (req, res) => {
    res.send('Updated')
})

// Create
router.post('/', (req, res) => {
    res.send('Created')
})

//Edit handdled by react

// Show
router.get('/:id', (req, res) => {
    res.send('Show')
})

module.exports = router

