const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dayjs = require('dayjs')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const records = await Record.find({ userId }).populate('categoryId').lean()
  const category = await Category.find().lean()
  let totalAmount = 0
  records.forEach(item => {
    totalAmount += item.amount
    item.date = dayjs(item.date).format('YYYY/MM/DD')
  })

  res.render('index', { category, records, totalAmount })
})

module.exports = router

