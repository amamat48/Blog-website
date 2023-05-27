const mongoose = reuire('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const commentSchema = new Schema(
    {
        entry: {
            type: String,
            required: true
        },
        author: {
            type: Schema.types.ObjectId,
            ref: 'Users'
        }
    }
)

const Comments = model('Comments', commentSchema)

module.exports = Comments