//Setting Server
const express = require('express')
const app = express()
const port = 3000
//Setting body-parser
const bodyParser = require('body-parser')
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

require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})