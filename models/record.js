const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, required: true, trim: true, maxLength: 100 },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  //required check
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: false },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', index: true, required: false }
})

module.exports = mongoose.model('Record', recordSchema)