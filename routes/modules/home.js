const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//Setting record to render
router.get('/', (req, res) => {
  const userId = req.user._id //add userId
  Record.find({ userId }) //add userId
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

module.exports = router