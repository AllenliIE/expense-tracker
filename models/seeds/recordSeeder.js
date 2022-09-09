const mongoose = require('mongoose')
const Record = require('../record')
const SEED_RECORD = require('./records.json')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('recordSeeder connected!')
  for (let i = 0; i < SEED_RECORD.records.length; i++) {
    Record.create({
      name: SEED_RECORD.records[i].name,
      date: SEED_RECORD.records[i].date,
      amount: SEED_RECORD.records[i].amount
    })
  }
  console.log('Generate records by seeder DONE!')
})
