const mongoose = require('mongoose')
const Category = require('../category')
const SEED_CATEGORY = require('./categorys.json')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('categorySeeder connected!')
  for (let i = 0; i < SEED_CATEGORY.categorys.length; i++) {
    Category.create({
      name: SEED_CATEGORY.categorys[i].name,
      icon: SEED_CATEGORY.categorys[i].icon
    })
  }
  console.log('Generate categories by seeder DONE!')
})
