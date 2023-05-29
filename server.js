// IMPORTS

require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('./database/database')
const mongoose = require('mongoose')

const blogsData = require('./utilities/blogsData')
const Blogs = require('./models/Blogs')

const db = mongoose.connection

const userController = require('./controllers/users')
const blogsController = require('./controllers/Blogs')

const port = process.env.PORT || 3001

const app = express()
// Connect to Database

connectDB()

db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware

app.use(logger('dev'))
app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: false }))

// Routes

app.use('/blogs', blogsController)
app.use('/user', userController)

// Seed
app.get('/seed', async (req, res) => {
    await Blogs.deleteMany({})
    await Blogs.insertMany(blogsData)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


