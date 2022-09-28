const db = require('../../config/mongoose')
const User = require('../users')
const Category = require('../category')
const bcrypt = require('bcryptjs')

let SEED_USER = [
  {
    name: '廣志',
    email: 'hirosi@kasukabe.saitama',
    password: '12345678'
  },
  {
    name: '小新',
    email: 'shinnosuke@kasukabe.saitama',
    password: '12345678'
  }
]

const SEED_CATEGORY = [
  {
    name: '家居物業',
    icon: 'fa-house'
  },
  {
    name: '交通出行',
    icon: 'fa-van-shuttle'
  },
  {
    name: '休閒娛樂',
    icon: 'fa-face-grin-beam'
  },
  {
    name: '餐飲',
    icon: 'fa-utensils'
  },
  {
    name: '其他',
    icon: 'fa-pen'
  }
]

db.once('open', () => {
  SEED_USER.forEach(user => user.password = bcrypt.hashSync(user.password, 10))
  const createSeedUser = User.insertMany(SEED_USER, { ordered: true })
  const createSeedCategory = Category.insertMany(SEED_CATEGORY, { ordered: true })
  Promise.all([createSeedUser, createSeedCategory])
    .then(() => {
      console.log('user & category created!')
    })
    .catch(error => console.log(error))
    .finally(() => process.exit())
})