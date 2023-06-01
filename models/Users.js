const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true
          },
          password: {
            type: String,
            trim: true,
            minLength: 5,
            required: true
          },
          comments: [{
              type: Schema.Types.ObjectId,
              ref: 'Comments'
          }]


        }, {
          toJSON: {
            transform: function(doc, ret) {
              delete ret.password;
              return ret;
            }
          }

})

const User = model('User', userSchema)

module.exports = User