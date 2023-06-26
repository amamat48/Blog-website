const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const blogSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        title: {
            type: String,
            required: true
        },
        entry: {
            type: String,
            required: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }],
    }, {
        timestamps: true
    }
)

const Blogs = model('Blogs', blogSchema)

module.exports = Blogs