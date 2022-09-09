//Setting Server
const express = require('express')
const app = express()
const port = 3000
const Record = require('./models/record')
//Setting body-[arser
const bodyParser = require('body-parser')
//Setting method-override
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))

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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, amount } = req.body

  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})