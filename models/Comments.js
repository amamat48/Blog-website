const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const commentSchema = new Schema(
    {
        entry: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }

    }, {
        timestamps: true
    }
)

const Comments = model('Comments', commentSchema)

module.exports = Comments