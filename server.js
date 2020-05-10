const express = require('express')

const {connectDb} = require('./config/db')
const {userRouter} = require('./routes/api/users')
const {authRouter} = require('./routes/api/auth')
const {profileRouter} = require('./routes/api/profile')
const {postRouter} = require('./routes/api/posts')

const app = express()

connectDb()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('API running')
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/posts', postRouter)

const port = process.env.PORT || 5000

app.listen(port)
