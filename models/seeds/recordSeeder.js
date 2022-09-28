const db = require('../../config/mongoose')
const User = require('../users')
const Category = require('../category')
const Record = require('../record')

let SEED_RECORD = [
  {
    name: '午餐',
    date: '2022-09-28',
    amount: 60,
    userId: 1,
    categoryId: 4
  },
  {
    name: '晚餐',
    date: '2022-09-28',
    amount: 60,
    userId: 1,
    categoryId: 4
  },
  {
    name: '捷運',
    date: '2022-09-28',
    amount: 120,
    userId: 1,
    categoryId: 2
  },
  {
    name: '電影：驚奇隊長',
    date: '2022-09-28',
    amount: 220,
    userId: 2,
    categoryId: 3
  },
  {
    name: '租金',
    date: '2022-09-28',
    amount: 25000,
    userId: 1,
    categoryId: 1
  }
]

db.on('open', async () => {
  const users = await User.find().lean()
  const categories = await Category.find().lean()

  //hirosi and shinnosuke seeddata
  SEED_RECORD.forEach((record) => {
    if (record.userId === 1) return record.userId = users[0]._id
    return record.userId = users[1]._id
  })

  SEED_RECORD.forEach((record) => {
    if (record.categoryId === 1) return record.categoryId = categories[0]._id
    else if (record.categoryId === 2) return record.categoryId = categories[1]._id
    else if (record.categoryId === 3) return record.categoryId = categories[2]._id
    else if (record.categoryId === 4) return record.categoryId = categories[3]._id
    return record.categoryId = categories[4]._id
  })

  try {
    //Mogodb insertMany return all document objectId
    await Record.insertMany(SEED_RECORD, { ordered: true })
  } catch (error) {
    console.log(error)
  }
  process.exit()
})