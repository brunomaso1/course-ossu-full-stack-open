const mongoose = require('mongoose')
const { Schema } = mongoose

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)