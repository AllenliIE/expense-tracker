//Setting Server
const express = require('express')
const app = express()
const port = 3000
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


//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})