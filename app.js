//Setting Server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//Setting express-session
const session = require('express-session')
//Setting body-parser
const bodyParser = require('body-parser')
//Setting passport
const usePassport = require('./config/passport')
//Setting method-override
const methodOverride = require('method-override')
//Setting connect-flash
const flash = require('connect-flash')
//Setting routes
const routes = require('./routes')
//Use handlebars to template engine setting
const exphbs = require('express-handlebars')
//Setting exphbs and parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//Open handlebars
app.set('view engine', 'hbs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})