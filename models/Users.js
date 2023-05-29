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
          }
        }, {
          toJSON: {
            transform: function(doc, ret) {
              delete ret.password;
              return ret;
            }
          }

})

userSchema.pre('save', async function(next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  })

const User = model('User', userSchema)

module.exports = User