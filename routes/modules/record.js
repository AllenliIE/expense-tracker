const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

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
  const { name, date, amount, categoryId } = req.body

  return Record.create({ name, date, amount, userId, categoryId }) //add userId
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  try {
    const record = await Record.findOne({ _id }).populate('categoryId').lean().exec()
    const category = await Category.find({ _id: { $ne: record.categoryId } }).lean().exec()
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
