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

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const categoryOption = req.body.categoryOption
    const selectedCategory = await Category.findById(categoryOption).lean()
    const otherCategory = await Category.find({ _id: { $ne: categoryOption } }).lean()

    const records = await Record
      .find({ userId, categoryId: categoryOption })
      .populate('categoryId')
      .lean()
    let totalAmount = 0
    records.forEach(item => {
      totalAmount += item.amount
      item.date = dayjs(item.date).format('YYYY/MM/DD')
    })
    console.log(selectedCategory)
    res.render('index', { selectedCategory, otherCategory, records, totalAmount })
  } catch (err) {
    next(err)
  }
})

module.exports = router

  // const abc = {}
  // if (categoryOption !== '分類') {
  //   abc.categoryId = categoryOption
  //   abc.userId = userId
  // } else {
  //   abc.userId = userId
  // }
