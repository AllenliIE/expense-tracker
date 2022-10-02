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

router.get('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category_id

  Category.find()
    .lean()
    .then(category => {
      if (categoryId === 'all') {
        res.redirect('/')
      } else {
        Record.find({ userId, categoryId })
          .populate('categoryId')
          .lean()
          .then(records => {
            let totalAmount = 0
            records.forEach(item => {
              totalAmount += item.amount
              item.date = dayjs(item.date).format('YYYY/MM/DD')
            })
            category.forEach(categorys => {
              if (categoryId.toString() === (categorys._id).toString()) {
                categorys.boolean = true
              } else {
                categorys.boolean = false
              }
            })
            res.render('index', { records, category, totalAmount })
          })
      }
    })
    .catch(err => console.log(err))
})

module.exports = router
