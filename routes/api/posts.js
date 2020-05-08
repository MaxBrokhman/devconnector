const express = require('express')
const { check, validationResult } = require('express-validator')

const { PostModel } = require('../../models/Post')
const { UserModel } = require('../../models/User')
const { makeAuth } = require('../../middleware/auth')

const postRouter = express.Router()

postRouter.post('/', [
  makeAuth,
  check('text', 'Text is required').notEmpty(),
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    const newPost = await new PostModel({
      ...req.body,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    }).save()

    res.json({ post: newPost })
  } catch {
    res.status(500).send('Server error')
  }
})

module.exports = {
  postRouter,
}
