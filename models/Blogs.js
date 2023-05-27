const mongoose = reuire('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const blogSchema = new Schema(
    {
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
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    }
)

const Blogs = model('Blogs', blogSchema)

module.exports = Blogs