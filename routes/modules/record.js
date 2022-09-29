const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dayjs = require('dayjs')

router.get('/category/:categoryName', (req, res) => {
  const userId = req.user._id
  const categoryName = req.params.categoryName

  Record.find({ categoryName, userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(item => {
        totalAmount += item.amount
        item.date = dayjs(item.date).format('YYYY/MM/DD')
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.get('/new', async (req, res) => {
  try {
    const category = await Category.find().lean().exec()
    return res.render('new', { category })
  } catch (err) {
    console.log(err)
  }
})

router.post('/new', (req, res) => {
  const userId = req.user._id //add userId
  const categoryName = req.params.categoryName
  const { name, date, amount, categoryId } = req.body
  console.log(categoryId, categoryName)
  return Record.create({ name, date, amount, userId, categoryId, categoryName }) //add userId
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  try {
    const record = await Record.findOne({ _id }).populate('categoryId').lean().exec()
    const category = await Category.find({ _id: { $ne: record.categoryId } }).lean().exec()
    record.date = dayjs(record.date).format('YYYY-MM-DD')
    res.render('edit', { record, category })
  } catch (error) {
    console.log(error.stack)
  }
})

router.put('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const { name, categoryId, date, amount } = req.body
  try {
    let record = await Record.findOne({ _id }).lean().exec()
    console.log(record)
    await Record.findByIdAndUpdate({ _id }, { name, categoryId, date, amount }).exec()
    res.redirect('/')
  } catch (error) {
    console.log(error.stack)
  }
})

router.delete('/:id/delete', async (req, res) => {
  const _id = req.params.id
  try {
    await Record.findByIdAndDelete({ _id }).exec()
    res.redirect('/')
  } catch (error) {
    console.log(error.stack)
  }
})

module.exports = router
