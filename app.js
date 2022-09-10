//Setting Server
const express = require('express')
const app = express()
const port = 3000
//Setting express-session
const session = require('express-session')
//Setting body-parser
const bodyParser = require('body-parser')
//Setting passport
const usePassport = require('./config/passport')
//Setting method-override
const methodOverride = require('method-override')
//Setting routes
const routes = require('./routes')
//Use handlebars to template engine setting
const exphbs = require('express-handlebars')
//Setting exphbs and parameters
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//Open handlebars
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
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