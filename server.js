const express = require('express')

const {connectDb} = require('./config/db')

const app = express()

connectDb()

app.get('/', (req, res) => {
  res.send('API running')
})

const port = process.env.PORT || 3000

app.listen(port)
