//Setting Server
const express = require('express')
const app = express()
const port = 3000

//Setting port 3000
app.listen(port, () => {
  console.log(`Expense-Tracker is running on http://localhost:${port}`)
})