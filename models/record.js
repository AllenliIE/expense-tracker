const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, required: true, trim: true, maxLength: 100 },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', index: true, required: true },
  categoryName: { type: String, ref: 'Category', index: true, required: false }
})

module.exports = mongoose.model('Record', recordSchema)