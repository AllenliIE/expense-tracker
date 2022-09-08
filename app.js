//Setting Server
const express = require('express')
const app = express()
const port = 3000
const Record = require('./models/record')
//Setting body-[arser
const bodyParser = require('body-parser')
//Use handlebars to template engine setting
const exphbs = require('express-handlebars')
//Setting exphbs and parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//Open handlebars
app.set('view engine', 'hbs')

//Setting Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//Connection mongoose
const db = mongoose.connection
db.on('error', () => {
  console.log('Mongodb error!')
})
db.once('open', () => {
  console.log('Mongodb connected!')
})

app.use(express.urlencoded({ extended: true }))

//Setting record to render
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, amount } = req.body

  return Record.create({ name, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})