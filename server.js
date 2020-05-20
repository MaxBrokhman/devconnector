const express = require('express')
const path = require('path')

const { connectDb } = require('./config/db')
const { userRouter } = require('./routes/api/users')
const { authRouter } = require('./routes/api/auth')
const { profileRouter } = require('./routes/api/profile')
const { postRouter } = require('./routes/api/posts')

const app = express()

connectDb()

app.use(express.json({ extended: false }))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/posts', postRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port)
