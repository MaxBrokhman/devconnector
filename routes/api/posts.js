const express = require('express')

const postRouter = express.Router()

postRouter.get('/', (req, res) => {
  res.send('Post route')
})

module.exports = {
  postRouter,
}