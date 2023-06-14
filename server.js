// IMPORTS

require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./database/database')
const mongoose = require('mongoose')


const blogsData = require('./utilities/blogsData')
const userData = require('./utilities/userData')

const Blogs = require('./models/Blogs')
const User = require('./models/Users')
const Comment = require('./models/Users')


const db = mongoose.connection

const userController = require('./controllers/users')
const blogsController = require('./controllers/blogs')

const PORT = process.env.PORT || 3001
// const PORT = process.env.PORT || 3030

const app = express()
// Connect to Database

connectDB()

db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware

app.use(logger('dev'))
app.use(express.json())


app.use(express.urlencoded())

app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: false }))

// Routes

app.use('/blogs', blogsController)
app.use('/user', userController)

// Seed
app.get('/seed', async (req, res) => {
    await Blogs.deleteMany({})
    await Blogs.insertMany(blogsData)
    await User.deleteMany({})
    await User.insertMany(userData)
    res.send('done')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


